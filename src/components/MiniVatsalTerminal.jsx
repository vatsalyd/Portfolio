import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    FiTerminal,
    FiMaximize2,
    FiMinus,
    FiX,
    FiCornerDownLeft,
    FiCpu,
    FiHelpCircle,
    FiFolder,
    FiFileText,
    FiUser,
    FiSend,
} from 'react-icons/fi';
import EditorialSection from './EditorialSection';
import ScrollReveal from './ScrollReveal';
import {
    personalInfo,
    projects,
    skillCategories,
    socialLinks,
    chatbotResponses,
    chatbotFallback,
    miniVatsalConfig,
    buildMiniVatsalSystemPrompt,
} from '../data/portfolioData';

const SYSTEM_PROMPT = buildMiniVatsalSystemPrompt();
const HAS_API = Boolean(miniVatsalConfig.apiKey);

const INITIAL_LINES = [
    { type: 'system', text: '========================================================================' },
    { type: 'system-bold', text: 'Mini Vatsal AI Agent CLI [Version 2.4.0-release]' },
    { type: 'system', text: '(c) 2026 Vatsal Yadav (IIT Bhilai B.Tech DSAI). All rights reserved.' },
    { type: 'system-dim', text: 'Node: vatsal@iitbhilai.ac.in · Autonomous AI Agent Active' },
    { type: 'system', text: '========================================================================' },
    { type: 'info', text: "Type 'help' for built-in CLI commands, or ask any natural question directly." },
];

const SUGGESTED_COMMANDS = [
    { label: 'help', cmd: 'help' },
    { label: 'skills', cmd: 'skills' },
    { label: 'projects', cmd: 'projects' },
    { label: 'cat about.md', cmd: 'cat about.md' },
    { label: 'contact', cmd: 'contact' },
    { label: "What is your stack?", cmd: "What is your core tech stack?" },
    { label: "Are you open for roles?", cmd: "Are you open for full-time or intern roles?" },
    { label: 'clear', cmd: 'clear' },
];

export default function MiniVatsalTerminal() {
    const [lines, setLines] = useState(INITIAL_LINES);
    const [inputVal, setInputVal] = useState('');
    const [history, setHistory] = useState([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const [isStreaming, setIsStreaming] = useState(false);
    const [activeTab, setActiveTab] = useState('terminal');

    const terminalBodyRef = useRef(null);
    const inputRef = useRef(null);
    const abortRef = useRef(null);

    // Auto scroll to bottom
    const scrollToBottom = useCallback(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [lines, isStreaming, scrollToBottom]);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    // Helper to append a line
    const addLine = (type, text, extra = null) => {
        setLines((prev) => [...prev, { type, text, extra }]);
    };

    // Helper for streaming assistant output in terminal
    const streamAssistantText = async (userText) => {
        setIsStreaming(true);

        if (HAS_API) {
            try {
                const response = await fetch(`${miniVatsalConfig.baseURL}/chat/completions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${miniVatsalConfig.apiKey}`,
                    },
                    body: JSON.stringify({
                        model: miniVatsalConfig.model,
                        temperature: miniVatsalConfig.temperature,
                        stream: true,
                        messages: [
                            { role: 'system', content: SYSTEM_PROMPT },
                            { role: 'user', content: userText },
                        ],
                    }),
                });

                if (!response.ok || !response.body) {
                    throw new Error('API response not ok');
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                let fullText = '';

                // Add empty assistant line first
                setLines((prev) => [...prev, { type: 'agent', text: '' }]);

                let reading = true;
                let buf = '';
                while (reading) {
                    const { value, done } = await reader.read();
                    if (done) { reading = false; break; }
                    buf += decoder.decode(value, { stream: true });
                    const rawLines = buf.split('\n');
                    buf = rawLines.pop();
                    for (const line of rawLines) {
                        const trimmed = line.trim();
                        if (!trimmed.startsWith('data:')) continue;
                        const data = trimmed.slice(5).trim();
                        if (data === '[DONE]') continue;
                        try {
                            const json = JSON.parse(data);
                            const delta = json.choices?.[0]?.delta?.content ?? '';
                            if (delta) {
                                fullText += delta;
                                setLines((prev) => {
                                    const next = [...prev];
                                    next[next.length - 1] = { type: 'agent', text: fullText };
                                    return next;
                                });
                            }
                        } catch { /* ignore */ }
                    }
                }
            } catch {
                await fallbackStreamInTerminal(userText);
            }
        } else {
            await fallbackStreamInTerminal(userText);
        }

        setIsStreaming(false);
    };

    const fallbackStreamInTerminal = (userText) => new Promise((resolve) => {
        const text = userText.toLowerCase().trim();
        let answer = chatbotFallback;
        for (const entry of chatbotResponses) {
            if (entry.keywords.some((kw) => text.includes(kw))) {
                answer = entry.answer;
                break;
            }
        }
        const clean = answer.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim() || chatbotFallback;

        // Add empty assistant line
        setLines((prev) => [...prev, { type: 'agent', text: '' }]);

        let i = 0;
        const timer = setInterval(() => {
            i += 3;
            const currentSlice = clean.slice(0, i);
            setLines((prev) => {
                const next = [...prev];
                next[next.length - 1] = { type: 'agent', text: currentSlice };
                return next;
            });
            if (i >= clean.length) {
                clearInterval(timer);
                resolve();
            }
        }, 16);

        abortRef.current = { abort: () => { clearInterval(timer); resolve(); } };
    });

    const handleCommand = async (rawCmd) => {
        const cmd = rawCmd.trim();
        if (!cmd) return;

        // Add command line echo
        addLine('prompt', cmd);
        setHistory((prev) => [...prev, cmd]);
        setHistoryIdx(-1);
        setInputVal('');

        const lower = cmd.toLowerCase();

        if (lower === 'clear' || lower === 'cls') {
            setLines([]);
            return;
        }

        if (lower === 'help' || lower === 'man' || lower === '--help' || lower === '-h') {
            addLine('output-table', 'AVAILABLE CLI COMMANDS:', [
                { cmd: 'help', desc: 'Display this command manual' },
                { cmd: 'about / bio', desc: 'View Vatsal\'s background, education & AI focus' },
                { cmd: 'skills / stack', desc: 'List categorized technical infrastructure stack' },
                { cmd: 'projects / ls-p', desc: 'Display featured engineering builds with stats' },
                { cmd: 'contact / links', desc: 'Get direct email, phone & social profiles' },
                { cmd: 'ls [-la]', desc: 'List files in current working directory' },
                { cmd: 'cat <file>', desc: 'Read file contents (e.g. cat about.md, cat resume.pdf)' },
                { cmd: 'whoami', desc: 'Print active terminal session user identity' },
                { cmd: 'clear / cls', desc: 'Reset terminal display buffer' },
                { cmd: '<any question>', desc: 'Ask Mini Vatsal anything in natural language' },
            ]);
            return;
        }

        if (lower === 'whoami') {
            addLine('output', `guest@vatsal-portfolio [Authorized Viewer · IP: ${window.location.hostname}]`);
            return;
        }

        if (lower === 'date') {
            addLine('output', new Date().toString());
            return;
        }

        if (lower === 'pwd') {
            addLine('output', '/home/vatsal/workspace/portfolio');
            return;
        }

        if (lower === 'ls' || lower === 'ls -l' || lower === 'ls -la' || lower === 'dir') {
            addLine('file-list', 'Directory contents: /home/vatsal/workspace/portfolio', [
                { name: 'about.md', type: 'file', size: '1.8 KB', desc: 'Biography & Engineering Philosophy' },
                { name: 'skills.json', type: 'file', size: '4.2 KB', desc: 'Infrastructure, Agents & Systems Matrix' },
                { name: 'projects/', type: 'dir', size: '4096 B', desc: 'HelixDesk, FinSight AI, Neural-KV, etc.' },
                { name: 'contact.sh', type: 'file', size: '512 B', desc: 'Direct Communication Endpoints' },
                { name: 'resume.pdf', type: 'file', size: '128 KB', desc: 'IIT Bhilai Verified Resume' },
                { name: 'architecture.yaml', type: 'file', size: '2.1 KB', desc: 'Multi-Agent State Machine Specs' },
            ]);
            return;
        }

        if (lower === 'cat about.md' || lower === 'cat bio.md' || lower === 'about' || lower === 'bio') {
            addLine('output-multiline', `${personalInfo.name} — ${personalInfo.headline}\n\n${personalInfo.bio}\n\nEducation: ${personalInfo.university} (${personalInfo.degree}, CGPA: ${personalInfo.gpa})`);
            return;
        }

        if (lower === 'cat resume.pdf' || lower === 'resume') {
            addLine('output-link', 'Resume document available for download:', {
                label: '📄 Download Vatsal Yadav Resume (PDF)',
                url: `${import.meta.env.BASE_URL}resume.pdf`,
            });
            return;
        }

        if (lower === 'skills' || lower === 'stack' || lower === 'matrix' || lower === 'cat skills.json') {
            addLine('skills-matrix', 'TECHNICAL TOOLKIT MATRIX:', skillCategories);
            return;
        }

        if (lower === 'projects' || lower === 'ls-p' || lower === 'cat projects/' || lower === 'ls projects') {
            addLine('projects-list', 'FEATURED ENGINEERING BUILDS:', projects);
            return;
        }

        if (lower === 'contact' || lower === 'links' || lower === 'socials' || lower === 'cat contact.sh') {
            addLine('contact-card', 'COMMUNICATION & PROFILES:', {
                email: personalInfo.email,
                phone: personalInfo.phone,
                location: personalInfo.location,
                socials: socialLinks,
            });
            return;
        }

        if (lower.startsWith('sudo')) {
            addLine('error', '[sudo] password for guest: Permission denied. Vatsal is the sole root administrator.');
            return;
        }

        // Natural query — run through agent engine
        await streamAssistantText(cmd);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(inputVal);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length === 0) return;
            const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
            setHistoryIdx(nextIdx);
            setInputVal(history[nextIdx]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIdx === -1) return;
            const nextIdx = historyIdx + 1;
            if (nextIdx >= history.length) {
                setHistoryIdx(-1);
                setInputVal('');
            } else {
                setHistoryIdx(nextIdx);
                setInputVal(history[nextIdx]);
            }
        }
    };

    return (
        <EditorialSection
            id="agent"
            ghost="TERMINAL"
            eyebrowIndex="02"
            eyebrowLabel="MINI VATSAL AGENT"
            className="terminal-section"
        >
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Autonomous Stand-in CLI</span>
                        <h2 className="section-title">Mini Vatsal · Live Terminal</h2>
                        <p className="section-subtitle">
                            An open live interactive terminal connected to my digital stand-in. Type any Unix commands like <code className="term-code-inline">help</code>, <code className="term-code-inline">skills</code>, <code className="term-code-inline">projects</code>, <code className="term-code-inline">cat about.md</code>, or ask any technical question directly.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Terminal Window Frame */}
                <ScrollReveal delay={0.15}>
                    <div className="term-window" onClick={focusInput}>
                        {/* Title Bar & Tabs */}
                        <div className="term-header">
                            <div className="term-tabs">
                                <button
                                    type="button"
                                    className={`term-tab ${activeTab === 'terminal' ? 'active' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); setActiveTab('terminal'); }}
                                >
                                    <FiTerminal className="term-tab-icon" />
                                    <span>vatsal@iitbhilai:~</span>
                                </button>
                                <button
                                    type="button"
                                    className={`term-tab ${activeTab === 'info' ? 'active' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); setActiveTab('info'); }}
                                >
                                    <FiCpu className="term-tab-icon" />
                                    <span>agent-status.json</span>
                                </button>
                            </div>

                            <div className="term-title-text">
                                vatsal@iitbhilai: ~ (bash / zsh)
                            </div>

                            {/* Window Controls (Red / Yellow / Green dots) */}
                            <div className="term-controls">
                                <span className="term-btn term-btn-min"><FiMinus /></span>
                                <span className="term-btn term-btn-max"><FiMaximize2 /></span>
                                <span className="term-btn term-btn-close" onClick={(e) => { e.stopPropagation(); setLines(INITIAL_LINES); }}><FiX /></span>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="term-body" ref={terminalBodyRef}>
                            {activeTab === 'terminal' ? (
                                <>
                                    {lines.map((line, idx) => (
                                        <div key={idx} className={`term-line term-line-${line.type}`}>
                                            {line.type === 'prompt' && (
                                                <div className="term-prompt-echo">
                                                    <span className="term-user">vatsal</span>
                                                    <span className="term-at">@</span>
                                                    <span className="term-host">iitbhilai</span>
                                                    <span className="term-path">:~</span>
                                                    <span className="term-dollar">$ </span>
                                                    <span className="term-cmd-text">{line.text}</span>
                                                </div>
                                            )}

                                            {line.type === 'agent' && (
                                                <div className="term-agent-response">
                                                    <span className="term-agent-kicker">[Mini Vatsal]:</span>
                                                    <div className="term-agent-body">{line.text}</div>
                                                </div>
                                            )}

                                            {(line.type === 'system' || line.type === 'system-bold' || line.type === 'system-dim' || line.type === 'info' || line.type === 'output' || line.type === 'error') && (
                                                <div className="term-text-line">{line.text}</div>
                                            )}

                                            {line.type === 'output-multiline' && (
                                                <pre className="term-pre">{line.text}</pre>
                                            )}

                                            {line.type === 'output-link' && (
                                                <div className="term-link-box">
                                                    <div className="term-text-line">{line.text}</div>
                                                    <a
                                                        href={line.extra.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="term-action-link"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {line.extra.label}
                                                    </a>
                                                </div>
                                            )}

                                            {line.type === 'output-table' && (
                                                <div className="term-table-wrapper">
                                                    <div className="term-table-head">{line.text}</div>
                                                    <div className="term-table">
                                                        {line.extra.map((item, i) => (
                                                            <div key={i} className="term-table-row">
                                                                <span
                                                                    className="term-table-cmd"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleCommand(item.cmd);
                                                                    }}
                                                                >
                                                                    {item.cmd}
                                                                </span>
                                                                <span className="term-table-desc">{item.desc}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {line.type === 'file-list' && (
                                                <div className="term-files-wrapper">
                                                    <div className="term-table-head">{line.text}</div>
                                                    <div className="term-files-grid">
                                                        {line.extra.map((f, i) => (
                                                            <div
                                                                key={i}
                                                                className={`term-file-item ${f.type}`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (f.type === 'file') handleCommand(`cat ${f.name}`);
                                                                    else handleCommand(`ls ${f.name}`);
                                                                }}
                                                            >
                                                                {f.type === 'dir' ? <FiFolder className="term-file-icon" /> : <FiFileText className="term-file-icon" />}
                                                                <span className="term-file-name">{f.name}</span>
                                                                <span className="term-file-size">{f.size}</span>
                                                                <span className="term-file-desc">{f.desc}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {line.type === 'skills-matrix' && (
                                                <div className="term-skills-wrapper">
                                                    <div className="term-table-head">{line.text}</div>
                                                    {line.extra.map((cat, i) => (
                                                        <div key={i} className="term-skill-category">
                                                            <div className="term-skill-cat-title">✦ {cat.name}</div>
                                                            <div className="term-skill-pills">
                                                                {cat.skills.map((s, si) => (
                                                                    <span key={si} className="term-skill-badge">
                                                                        {s.name} {s.tag ? `[${s.tag}]` : ''}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {line.type === 'projects-list' && (
                                                <div className="term-projects-wrapper">
                                                    <div className="term-table-head">{line.text}</div>
                                                    <div className="term-projects-list">
                                                        {line.extra.map((p, i) => (
                                                            <div key={i} className="term-proj-item">
                                                                <div className="term-proj-top">
                                                                    <span className="term-proj-title">{p.title}</span>
                                                                    <span className="term-proj-cat">{p.category}</span>
                                                                </div>
                                                                <div className="term-proj-desc">{p.subtitle || p.description}</div>
                                                                {p.github && (
                                                                    <a
                                                                        href={p.github}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="term-proj-link"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        → GitHub Repo: {p.github}
                                                                    </a>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {line.type === 'contact-card' && (
                                                <div className="term-contact-wrapper">
                                                    <div className="term-table-head">{line.text}</div>
                                                    <div className="term-contact-grid">
                                                        <div className="term-contact-row">
                                                            <span className="term-c-label">Email:</span>
                                                            <a href={`mailto:${line.extra.email}`} className="term-c-val" onClick={(e) => e.stopPropagation()}>{line.extra.email}</a>
                                                        </div>
                                                        <div className="term-contact-row">
                                                            <span className="term-c-label">Phone:</span>
                                                            <span className="term-c-val">{line.extra.phone}</span>
                                                        </div>
                                                        <div className="term-contact-row">
                                                            <span className="term-c-label">Location:</span>
                                                            <span className="term-c-val">{line.extra.location}</span>
                                                        </div>
                                                    </div>
                                                    <div className="term-socials-row">
                                                        {line.extra.socials.map((s, i) => (
                                                            <a
                                                                key={i}
                                                                href={s.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="term-social-btn"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <s.icon /> {s.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Active Interactive Input Line */}
                                    <div className="term-prompt-line">
                                        <span className="term-user">vatsal</span>
                                        <span className="term-at">@</span>
                                        <span className="term-host">iitbhilai</span>
                                        <span className="term-path">:~</span>
                                        <span className="term-dollar">$ </span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputVal}
                                            onChange={(e) => setInputVal(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            disabled={isStreaming}
                                            className="term-input"
                                            autoComplete="off"
                                            autoCorrect="off"
                                            autoCapitalize="off"
                                            spellCheck="false"
                                            placeholder={isStreaming ? 'Streaming response...' : 'Type a command (help, skills, projects) or any question...'}
                                        />
                                        <button
                                            type="button"
                                            className="term-send-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCommand(inputVal);
                                            }}
                                            disabled={!inputVal.trim() || isStreaming}
                                        >
                                            <FiCornerDownLeft />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                /* Status Tab */
                                <div className="term-info-panel">
                                    <pre className="term-pre">
{`{
  "agent": "Mini Vatsal AI",
  "version": "2.4.0",
  "host": "IIT Bhilai (DSAI)",
  "status": "Online · Autonomous Stand-in",
  "capabilities": [
    "AI Infrastructure & Systems Querying",
    "Workflow & State Machine Architecture",
    "Model Deployment & Optimization Consultation",
    "Interactive Portfolio Navigation"
  ],
  "latency": "~1.8s Sub-Second Execution",
  "uptime": "99.9%",
  "connectedEndpoints": {
    "github": "https://github.com/vatsalyd",
    "x_twitter": "https://x.com/fixedbyvatsal",
    "leetcode": "https://leetcode.com/u/vatsalyd/",
    "medium": "https://medium.com/@vatsal.y.official",
    "linkedin": "https://www.linkedin.com/in/vatsal-yadav"
  }
}`}
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Quick Command Suggestions Footer */}
                        <div className="term-quick-bar">
                            <span className="term-quick-label">Suggestions:</span>
                            <div className="term-quick-chips">
                                {SUGGESTED_COMMANDS.map((item) => (
                                    <button
                                        key={item.label}
                                        type="button"
                                        className="term-chip"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCommand(item.cmd);
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </EditorialSection>
    );
}
