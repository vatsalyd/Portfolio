import { useState, useRef, useEffect, useCallback } from 'react';
import { FiSend, FiCpu } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import {
    chatbotResponses,
    chatbotFallback,
    chatbotSuggestions,
    personalInfo,
} from '../data/portfolioData';

function getAnswer(input) {
    const text = input.toLowerCase().trim();
    if (!text) return chatbotFallback;
    for (const entry of chatbotResponses) {
        if (entry.keywords.some((kw) => text.includes(kw))) {
            return entry.answer;
        }
    }
    return chatbotFallback;
}

function Typewriter({ text, speed = 22, onDone }) {
    const [shown, setShown] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        setShown('');
        setDone(false);
        let i = 0;
        const interval = setInterval(() => {
            i += 1;
            setShown(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(interval);
                setDone(true);
                onDone?.();
            }
        }, speed);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    return (
        <>
            {shown}
            {!done && <span className="chatbot-typing-cursor" />}
        </>
    );
}

export default function MiniChatbot() {
    const [messages, setMessages] = useState([
        {
            from: 'bot',
            text: "Heyy! 👋 I'm Vatsal's mini-bot — ask me about his stack, internship, projects, or what he's looking for. Or type your own thing.",
            typed: true, // already fully shown
        },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const threadRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        const el = threadRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, typing, scrollToBottom]);

    const send = useCallback((raw) => {
        const text = (raw ?? '').trim();
        if (!text || typing) return;
        setMessages((prev) => [...prev, { from: 'user', text }]);
        setInput('');
        setTyping(true);

        window.setTimeout(() => {
            const answer = getAnswer(text);
            setMessages((prev) => [...prev, { from: 'bot', text: answer, typed: false }]);
            setTyping(false);
        }, 480 + Math.random() * 320);
    }, [typing]);

    const handleSuggestion = (s) => send(s);

    const handleSubmit = (e) => {
        e.preventDefault();
        send(input);
    };

    const handleBotTyped = (idx) => {
        setMessages((prev) => prev.map((m, i) => (i === idx && m.from === 'bot' ? { ...m, typed: true } : m)));
    };

    return (
        <section id="chatbot" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Talk To Me</span>
                        <h2 className="section-title">Chat with the Mini-Bot</h2>
                        <p className="section-subtitle">
                            A quick way to learn about me — no broken LLM, just pattern-matched answers I hand-wrote. Try a suggestion or type your own.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <div
                        className="glass-card"
                        style={{
                            maxWidth: 720,
                            margin: '0 auto',
                            padding: 24,
                            border: '1px solid rgba(139, 92, 246, 0.18)',
                        }}
                    >
                        {/* Header row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                            <div style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'var(--gradient-aurora)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '1.1rem',
                                boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)',
                            }}>
                                <FiCpu />
                            </div>
                            <div>
                                <div style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '0.92rem',
                                    fontWeight: 600,
                                    color: 'var(--text-heading)',
                                }}>
                                    Vatsal's Mini-Bot
                                </div>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 5,
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.7rem',
                                    color: '#10B981',
                                }}>
                                    <span style={{
                                        width: 6, height: 6, borderRadius: '50%',
                                        background: '#10B981', boxShadow: '0 0 6px #10B981',
                                    }} />
                                    online · pattern-matched
                                </div>
                            </div>
                        </div>

                        {/* Suggestions */}
                        <div className="chatbot-suggestions">
                            {chatbotSuggestions.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    className="chatbot-suggestion"
                                    onClick={() => handleSuggestion(s)}
                                    disabled={typing}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Thread */}
                        <div className="chatbot-thread" ref={threadRef} style={{ marginBottom: 16 }}>
                            {messages.map((m, i) => (
                                <div key={i} className={`chatbot-bubble ${m.from}`}>
                                    {m.from === 'bot' && !m.typed
                                        ? <Typewriter text={m.text} onDone={() => handleBotTyped(i)} />
                                        : m.text}
                                </div>
                            ))}
                            {typing && (
                                <div className="chatbot-bubble bot" style={{ display: 'inline-flex', gap: 4, alignItems: 'center', padding: '14px 16px' }}>
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animation: 'mentos-pulse 1s infinite' }} />
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animation: 'mentos-pulse 1s 0.2s infinite' }} />
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animation: 'mentos-pulse 1s 0.4s infinite' }} />
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form className="chatbot-input" onSubmit={handleSubmit}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Ask me anything (or email ${personalInfo.email})`}
                                disabled={typing}
                                aria-label="Ask the chatbot"
                            />
                            <button
                                type="submit"
                                className="chatbot-send-btn"
                                disabled={!input.trim() || typing}
                                aria-label="Send message"
                            >
                                <FiSend />
                            </button>
                        </form>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
