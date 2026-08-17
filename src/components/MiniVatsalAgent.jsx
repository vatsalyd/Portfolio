import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSend, FiX, FiCpu } from 'react-icons/fi';
import {
    miniVatsalConfig,
    buildMiniVatsalSystemPrompt,
    chatbotResponses,
    chatbotFallback,
} from '../data/portfolioData';

/**
 * MiniVatsalAgent — the LLM-powered chat agent for the merged Hero+Chat
 * section, opened from a gallery photo and rendered as a transformational
 * modal (framer-motion `layoutId` morphs it out of the photo that was
 * clicked, so the photo "becomes" the conversation).
 *
 * Streaming model:
 *   - If `VITE_LLM_API_KEY` is set, calls an OpenAI-compatible
 *     `/chat/completions` endpoint with `stream: true` and renders the
 *     assistant message token-by-token as the SSE deltas land.
 *   - If no key is set, falls back to the pattern-matched
 *     `chatbotResponses` so the deployed site never breaks. The fallback
 *     still renders character-by-character via the same sink.
 *
 * The conversation history is held in state; only the most recent
 * `miniVatsalConfig.historyLimit` user/assistant pairs are sent for context.
 */

const SYSTEM_PROMPT = buildMiniVatsalSystemPrompt();
const HAS_API = Boolean(miniVatsalConfig.apiKey);

export default function MiniVatsalAgent({ open, onClose }) {
    const [messages, setMessages] = useState([
        {
            from: 'bot',
            text: "I'm Mini Vatsal — Vatsal's digital stand-in. Ask me about his work, his stack, or what he's building next, and I'll answer as him.",
            done: true,
        },
    ]);
    const [input, setInput] = useState('');
    const [busy, setBusy] = useState(false);
    const threadRef = useRef(null);
    const abortRef = useRef(null);

    // Keep the latest tail pinned to view.
    const scrollToBottom = useCallback(() => {
        const el = threadRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, []);
    useEffect(scrollToBottom, [messages, busy, scrollToBottom]);

    // ESC + scroll-lock while open.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            abortRef.current?.abort?.();
        };
    }, [open, onClose]);

    // Progressively replace the last assistant bubble's text as tokens arrive.
    const appendDelta = (delta) => {
        setMessages((prev) => {
            const next = prev.slice();
            const last = next[next.length - 1];
            next[next.length - 1] = { ...last, text: delta, done: false };
            return next;
        });
    };
    const finalizeAssistant = () => {
        setMessages((prev) => {
            const next = prev.slice();
            const last = next[next.length - 1];
            next[next.length - 1] = { ...last, done: true };
            return next;
        });
    };

    /* ── Pattern-matched fallback stream (declared first; also used as
       degraded path when the live API errors out). ── */
    const fallbackStream = (userText, suppressLeading = false) => new Promise((resolve) => {
        const text = userText.toLowerCase().trim();
        let answer = chatbotFallback;
        for (const entry of chatbotResponses) {
            if (entry.keywords.some((kw) => text.includes(kw))) {
                answer = entry.answer;
                break;
            }
        }
        // Strip emojis for the editorial cream aesthetic.
        const clean = answer.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim() || chatbotFallback;
        const lead = suppressLeading ? '(offline) ' : '';
        let i = 0;
        const timer = setInterval(() => {
            i += 2;
            appendDelta((lead + clean).slice(0, i));
            if (i >= clean.length + lead.length) {
                clearInterval(timer);
                finalizeAssistant();
                resolve();
            }
        }, 16);
        abortRef.current = { abort: () => { clearInterval(timer); resolve(); } };
    });

    /* ── Live LLM stream ── */
    const streamFromAPI = async (userText) => {
        // Build a compact message window from history + system prompt.
        const history = messages
            .filter((m) => m.done)
            .slice(-miniVatsalConfig.historyLimit)
            .map((m) => ({ role: m.from === 'bot' ? 'assistant' : 'user', content: m.text }));
        const payload = {
            model: miniVatsalConfig.model,
            temperature: miniVatsalConfig.temperature,
            stream: true,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...history,
                { role: 'user', content: userText },
            ],
        };

        const ctrl = new AbortController();
        abortRef.current = ctrl;
        try {
            const res = await fetch(`${miniVatsalConfig.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${miniVatsalConfig.apiKey}`,
                },
                body: JSON.stringify(payload),
                signal: ctrl.signal,
            });
            if (!res.ok || !res.body) {
                throw new Error(`HTTP ${res.status}`);
            }
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buf = '';
            let reading = true;
            while (reading) {
                const { value, done } = await reader.read();
                if (done) { reading = false; break; }
                buf += decoder.decode(value, { stream: true });
                const lines = buf.split('\n');
                buf = lines.pop();
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed.startsWith('data:')) continue;
                    const data = trimmed.slice(5).trim();
                    if (data === '[DONE]') continue;
                    try {
                        const json = JSON.parse(data);
                        const delta = json.choices?.[0]?.delta?.content ?? '';
                        if (delta) appendDelta(delta);
                    } catch { /* swallow partial keep-alive lines */ }
                }
            }
            finalizeAssistant();
        } catch (err) {
            if (err.name === 'AbortError') return;
            // Network / config failure — degrade to the pattern-matched
            // fallback so the visitor still gets an answer.
            await fallbackStream(userText, true);
        }
    };

    const send = async (raw) => {
        const text = (raw ?? '').trim();
        if (!text || busy) return;
        setInput('');
        setBusy(true);

        // Optimistically append the user bubble + an empty assistant bubble
        // we will progressively fill as tokens stream in.
        setMessages((prev) => [
            ...prev,
            { from: 'user', text, done: true },
            { from: 'bot', text: '', done: false },
        ]);

        if (HAS_API) {
            await streamFromAPI(text);
        } else {
            await fallbackStream(text);
        }
        setBusy(false);
    };

    const handleSubmit = (e) => { e.preventDefault(); send(input); };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="mini-vatsal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mini Vatsal agent"
                    onClick={onClose}
                >
                    <motion.div
                        className="mini-vatsal-panel"
                        initial={{ scale: 0.85, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 16 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="mini-vatsal-head">
                            <div className="mini-vatsal-avatar">
                                <FiCpu />
                            </div>
                            <div className="mini-vatsal-meta">
                                <div className="mini-vatsal-name">Mini Vatsal</div>
                                <div className="mini-vatsal-status">
                                    <span className="mini-vatsal-status-dot" />
                                    {HAS_API ? `online · ${miniVatsalConfig.model}` : 'offline · pattern-matched'}
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mini-vatsal-close"
                                onClick={onClose}
                                aria-label="Close agent"
                            >
                                <FiX />
                            </button>
                        </div>

                        {/* Thread */}
                        <div className="mini-vatsal-thread" ref={threadRef}>
                            {messages.map((m, i) => (
                                <div key={i} className={`chatbot-bubble ${m.from}`}>
                                    {m.text}
                                    {m.from === 'bot' && !m.done && (
                                        <span className="chatbot-typing-cursor" />
                                    )}
                                </div>
                            ))}
                            {busy && messages[messages.length - 1]?.from === 'user' && (
                                <div className="chatbot-bubble bot mini-vatsal-typing">
                                    <span /><span /><span />
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form className="chatbot-input mini-vatsal-input" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask Mini Vatsal anything…"
                                aria-label="Message Mini Vatsal"
                                disabled={busy}
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="chatbot-send-btn"
                                disabled={!input.trim() || busy}
                                aria-label="Send message"
                            >
                                <FiSend />
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
