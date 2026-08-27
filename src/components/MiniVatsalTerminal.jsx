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
    FiExternalLink,
    FiDownload,
    FiCheck,
    FiKey,
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
    getStoredApiKey,
} from '../data/portfolioData';

const INITIAL_LINES = [
    { type: 'system', text: '========================================================================' },
    { type: 'system-bold', text: 'Mini Vatsal AI Agent CLI [Version 2.5.0-release]' },
    { type: 'system', text: '(c) 2026 Vatsal Yadav (IIT Bhilai B.Tech DSAI). All rights reserved.' },
    { type: 'system-dim', text: 'Persona: Nonchalant · Quirky · Sarcastic · AI Systems Engineer' },
    { type: 'system', text: '========================================================================' },
    { type: 'info', text: "Type 'help' for built-in Unix commands, or ask any technical/personal question." },
];

const SUGGESTED_COMMANDS = [
    { label: 'help', cmd: 'help' },
    { label: 'skills', cmd: 'skills' },
    { label: 'projects', cmd: 'projects' },
    { label: 'status', cmd: 'status' },
    { label: 'cat about.md', cmd: 'cat about.md' },
    { label: 'resume', cmd: 'resume' },
    { label: 'Why Context Pager?', cmd: 'Why did you build Context Pager?' },
    { label: 'Are you hiring-ready?', cmd: 'Are you open for full-time or intern roles?' },
    { label: 'clear', cmd: 'clear' },
];

const AUTOCOMPLETE_LIST = [
    'help', 'about', 'bio', 'skills', 'stack', 'projects', 'ls', 'ls -la', 'dir', 'tree',
    'cat about.md', 'cat skills.json', 'cat resume.pdf', 'cat contact.sh', 'cat architecture.yaml',
    'contact', 'links', 'socials', 'resume', 'cv', 'status', 'top', 'whoami', 'pwd', 'date',
    'theme toggle', 'theme dark', 'theme light', 'clear', 'cls', 'history',
    'open projects', 'open skills', 'open articles', 'open experience', 'open contact', 'open hero',
    'config', 'config clear',
];

export default function MiniVatsalTerminal() {
    const [lines, setLines] = useState(INITIAL_LINES);
    const [inputVal, setInputVal] = useState('');
    const [history, setHistory] = useState([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const [isStreaming, setIsStreaming] = useState(false);
    const [activeTab, setActiveTab] = useState('terminal');
    const [apiKeyStatus, setApiKeyStatus] = useState(() => Boolean(getStoredApiKey()));

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

    // Helper for streaming assistant output in terminal with ReAct Thought Trace
    const streamAssistantText = async (userText) => {
        setIsStreaming(true);
        const apiKey = miniVatsalConfig.apiKey;

        if (apiKey) {
            // Live LLM Mode (Groq / OpenAI / Gemini)
            try {
                // Add initial thought trace
                addLine('thought', `[🧠 Thought] Formulating response via ${miniVatsalConfig.model} with Vatsal's sarcastic persona...`);

                const response = await fetch(`${miniVatsalConfig.baseURL}/chat/completions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: miniVatsalConfig.model,
                        temperature: miniVatsalConfig.temperature,
                        stream: true,
                        messages: [
                            { role: 'system', content: buildMiniVatsalSystemPrompt() },
                            { role: 'user', content: userText },
                        ],
                    }),
                });

                if (!response.ok || !response.body) {
                    throw new Error(`API error: ${response.status}`);
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                let fullText = '';

                // Add empty assistant line
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
            } catch (err) {
                // Fallback to local heuristic engine with funny message
                addLine('system-dim', `[API Notice] Remote stream returned (${err.message || 'error'}). Falling back to local neural store.`);
                await simulateThoughtAndStream(userText);
            }
        } else {
            // Local State Machine Mode with ReAct Loop
            await simulateThoughtAndStream(userText);
        }

        setIsStreaming(false);
    };

    // Simulated ReAct loop (Thought -> Tool Call -> Observation -> Answer)
    const simulateThoughtAndStream = async (userText) => {
        const text = userText.toLowerCase().trim();
        let matchedTopic = 'general engineering';
        let answer = chatbotFallback;

        for (const entry of chatbotResponses) {
            if (entry.keywords.some((kw) => text.includes(kw))) {
                answer = entry.answer;
                matchedTopic = entry.keywords[0];
                break;
            }
        }

        // Add LangGraph Thought & Tool trace
        addLine('thought', `[🧠 Thought] Analyzing intent: "${userText}" → Routing to domain [${matchedTopic}]`);
        addLine('thought', `[⚡ Tool] query_portfolio_neural_store("${matchedTopic}")`);
        addLine('thought', `[📝 Observation] Found verified facts & system context with 0.98 confidence.`);

        // Stream answer
        setLines((prev) => [...prev, { type: 'agent', text: '' }]);

        await new Promise((resolve) => {
            let i = 0;
            const step = 4;
            const timer = setInterval(() => {
                i += step;
                const currentSlice = answer.slice(0, i);
                setLines((prev) => {
                    const next = [...prev];
                    next[next.length - 1] = { type: 'agent', text: currentSlice };
                    return next;
                });
                if (i >= answer.length) {
                    clearInterval(timer);
                    resolve();
                }
            }, 14);

            abortRef.current = { abort: () => { clearInterval(timer); resolve(); } };
        });
    };

    const handleCommand = async (rawCmd) => {
        const cmd = rawCmd.trim();
        if (!cmd) return;

        // Add command line echo
        addLine('prompt', cmd);
        setHistory((prev) => [...prev, cmd]);
        setHistoryIdx(-1);
        setInputVal('');

        const lower = cmd.toLowerCase();
        const tokens = cmd.split(/\s+/);
        const primary = tokens[0].toLowerCase();

        // 1. Clear buffer
        if (lower === 'clear' || lower === 'cls') {
            setLines([]);
            return;
        }

        // 2. Help / Manual
        if (lower === 'help' || lower === 'man' || lower === '--help' || lower === '-h' || lower === '?') {
            addLine('output-table', 'AVAILABLE UNIX & AGENT COMMANDS (Click any command to execute):', [
                { cmd: 'help', desc: 'Display this interactive manual' },
                { cmd: 'about', desc: 'View Vatsal\'s background, IIT Bhilai details & engineering philosophy' },
                { cmd: 'skills', desc: 'Interactive breakdown of categorized infrastructure & agent skills' },
                { cmd: 'projects', desc: 'List all 14 engineering builds with live links & case studies' },
                { cmd: 'cat <file>', desc: 'Read file contents (e.g. cat about.md, cat resume.pdf, cat contact.sh)' },
                { cmd: 'ls [-la]', desc: 'List working directory files & interactive nodes' },
                { cmd: 'tree', desc: 'Display visual hierarchical tree of portfolio components' },
                { cmd: 'open <section>', desc: 'Smooth-scroll to section (projects, skills, articles, contact)' },
                { cmd: 'resume', desc: 'Download official verified IIT Bhilai resume (PDF)' },
                { cmd: 'contact', desc: 'Get direct email, phone, location & verified socials' },
                { cmd: 'status', desc: 'Display live agent memory, latency, and LangGraph system health' },
                { cmd: 'config [args]', desc: 'Manage custom Groq/OpenAI API keys in localStorage' },
                { cmd: 'theme [dark|light]', desc: 'Toggle or set portfolio theme' },
                { cmd: 'whoami', desc: 'Print active guest user identity' },
                { cmd: 'clear / cls', desc: 'Reset terminal display buffer' },
                { cmd: '<any question>', desc: 'Ask Mini Vatsal anything in natural language' },
            ]);
            return;
        }

        // 3. Whoami, Date, Pwd
        if (lower === 'whoami') {
            addLine('output', `guest@vatsal-portfolio [Authorized Visitor · Session: Active · IP: ${window.location.hostname || 'localhost'}]`);
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

        // 4. Directory Listing (ls / dir)
        if (lower === 'ls' || lower === 'ls -l' || lower === 'ls -la' || lower === 'dir') {
            addLine('file-list', 'Directory contents: /home/vatsal/workspace/portfolio (Click any item to view):', [
                { name: 'about.md', type: 'file', size: '2.1 KB', desc: 'Biography & Engineering Persona' },
                { name: 'skills.json', type: 'file', size: '5.4 KB', desc: 'AI Infra & Agent Toolkit Matrix' },
                { name: 'projects/', type: 'dir', size: '14 Items', desc: 'Context Pager, HelixDesk, FinSight AI...' },
                { name: 'architecture.yaml', type: 'file', size: '3.2 KB', desc: 'Multi-Agent LangGraph State Machine Specs' },
                { name: 'resume.pdf', type: 'file', size: '138 KB', desc: 'Verified Resume document' },
                { name: 'contact.sh', type: 'file', size: '512 B', desc: 'Direct Communication Endpoints' },
                { name: 'experience.log', type: 'file', size: '1.6 KB', desc: 'Incrivelsoft AI Intern & Projects Track' },
            ]);
            return;
        }

        // 5. Tree
        if (lower === 'tree') {
            const treeOutput = `portfolio/
├── about.md
├── skills.json
├── architecture.yaml
├── contact.sh
├── resume.pdf
├── experience.log
└── projects/
    ├── context_pager (AI Virtual Memory Layer)
    ├── helixdesk (3-Agent LangGraph Support)
    ├── finsight_ai (166ms Financial Streams)
    ├── claimsure_ai (Healthcare Pre-Submission)
    ├── influencer_search (React 19 + Framer Motion)
    ├── jobfit_ai (13k+ Pairs Stacked Ensemble)
    ├── rawaccel_studio (ML Mouse Curve Predictor)
    ├── ai_ocr_receipt (OpenCV + NER Extractor)
    ├── react_paper (ReAct Loop from Scratch)
    └── shift_sync (React Native + State Sync)`;
            addLine('output-multiline', treeOutput);
            return;
        }

        // 6. Cat commands
        if (primary === 'cat') {
            const file = tokens[1]?.toLowerCase();
            if (!file) {
                addLine('error', 'Usage: cat <filename> (e.g. cat about.md, cat resume.pdf, cat skills.json)');
                return;
            }

            if (file === 'about.md' || file === 'bio.md' || file === 'about') {
                addLine('output-multiline', `${personalInfo.name} — ${personalInfo.headline}\n\n${personalInfo.bio}\n\nEducation: ${personalInfo.university} (${personalInfo.degree}, CGPA: ${personalInfo.gpa})\nFocus: Next-Gen AI Infrastructure, Multi-Agent State Machines, Token Optimization.`);
                return;
            }

            if (file === 'skills.json' || file === 'skills') {
                addLine('skills-matrix', 'TECHNICAL TOOLKIT MATRIX:', skillCategories);
                return;
            }

            if (file === 'resume.pdf' || file === 'resume') {
                addLine('output-link', 'Resume document available for download:', {
                    label: '📄 Download Vatsal Yadav Resume (PDF)',
                    url: `${import.meta.env.BASE_URL}resume.pdf`,
                });
                return;
            }

            if (file === 'contact.sh' || file === 'contact') {
                addLine('contact-card', 'COMMUNICATION & PROFILES:', {
                    email: personalInfo.email,
                    phone: personalInfo.phone,
                    location: personalInfo.location,
                    socials: socialLinks,
                });
                return;
            }

            if (file === 'architecture.yaml' || file === 'architecture') {
                const yamlOutput = `# LangGraph Multi-Agent Architecture
state_machine:
  nodes:
    - triage_node: "Llama-3.3-70b confidence-gated classifier"
    - retrieval_node: "Sentence-Transformers + ChromaDB semantic vector search"
    - resolution_node: "Citation-backed contextual response synthesizer"
  fail_safe: "Auto-escalate to human queue if confidence < 0.85"
  latency_target: "< 2000ms"

context_pager_mcp:
  mode: "Virtual Memory for Large Contexts"
  stages: [ "Semantic Chunk Index", "On-Demand Page Retrieval", "Dynamic Compression", "Recalled Memory Cache" ]
  token_reduction: "4x to 10x"`;
                addLine('output-multiline', yamlOutput);
                return;
            }

            if (file === 'experience.log' || file === 'experience') {
                addLine('output-multiline', `[2026-Present] AI & ML Intern @ Incrivelsoft\n- Owning Nutrition Agent on NUMAA.ai multi-agent platform.\n- Designing deterministic state handoffs, prompt guardrails & latency reductions.\n\n[2024-Present] B.Tech in Data Science & Artificial Intelligence @ IIT Bhilai (CGPA 7.61)\n- Deep dive in Distributed Systems, MLOps, ML/DL Theory & Graph Architectures.`);
                return;
            }

            addLine('error', `cat: ${tokens[1]}: No such file. Type 'ls' to see available files.`);
            return;
        }

        // 7. Direct Shortcuts: about, skills, projects, resume, contact
        if (lower === 'about' || lower === 'bio') {
            addLine('output-multiline', `${personalInfo.name} — ${personalInfo.headline}\n\n${personalInfo.bio}\n\nEducation: ${personalInfo.university} (${personalInfo.degree}, CGPA: ${personalInfo.gpa})`);
            return;
        }

        if (lower === 'skills' || lower === 'stack' || lower === 'matrix') {
            addLine('skills-matrix', 'TECHNICAL TOOLKIT MATRIX:', skillCategories);
            return;
        }

        if (lower === 'projects' || lower === 'ls-p' || lower === 'cat projects/' || lower === 'ls projects') {
            addLine('projects-list', 'FEATURED ENGINEERING BUILDS (14 Projects):', projects);
            return;
        }

        if (lower === 'contact' || lower === 'links' || lower === 'socials') {
            addLine('contact-card', 'COMMUNICATION & PROFILES:', {
                email: personalInfo.email,
                phone: personalInfo.phone,
                location: personalInfo.location,
                socials: socialLinks,
            });
            return;
        }

        if (lower === 'resume' || lower === 'cv') {
            addLine('output-link', 'Resume document available for download:', {
                label: '📄 Download Vatsal Yadav Resume (PDF)',
                url: `${import.meta.env.BASE_URL}resume.pdf`,
            });
            return;
        }

        // 8. Open Section (smooth scroll)
        if (primary === 'open' || primary === 'goto') {
            const target = tokens[1]?.toLowerCase();
            const validTargets = {
                projects: 'projects',
                work: 'projects',
                skills: 'skills',
                stack: 'skills',
                articles: 'articles',
                blog: 'articles',
                experience: 'experience',
                contact: 'contact',
                hero: 'hero',
                top: 'hero',
                about: 'about',
            };

            const sectionId = validTargets[target];
            if (sectionId) {
                const el = document.getElementById(sectionId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    addLine('output', `✓ Navigating viewport to section: #${sectionId}`);
                } else {
                    addLine('error', `Section #${sectionId} not currently mounted in DOM.`);
                }
            } else {
                addLine('error', `Usage: open <section> (Valid options: projects, skills, articles, experience, contact, hero)`);
            }
            return;
        }

        // 9. Status & Top
        if (lower === 'status' || lower === 'top' || lower === 'agent-status') {
            const keyPresent = Boolean(getStoredApiKey());
            addLine('output-multiline', `========================================
MINI VATSAL AGENT — TELEMETRY STATUS
========================================
Node Host         : IIT Bhilai (DSAI Cluster)
Architecture      : Multi-Agent LangGraph State Machine
Status            : Active & Serving
Inference Mode    : ${keyPresent ? `Live API Active (${miniVatsalConfig.model})` : 'Local Heuristic Neural Engine (Zero-Config)'}
Average Latency   : ~1.8s (Confidence-gated)
Memory Paging     : Context Pager Enabled (4x-10x Token Savings)
Primary Uptime    : 99.98%
Total Builds      : 14 Shipped Projects
Contact Node      : ${personalInfo.email}
========================================`);
            return;
        }

        // 10. Config (API Key setup)
        if (primary === 'config') {
            const sub = tokens[1]?.toLowerCase();
            const val = tokens.slice(2).join(' ').trim();

            if (!sub) {
                const curKey = getStoredApiKey();
                addLine('output-multiline', `Config Status:
- API Key : ${curKey ? `${curKey.slice(0, 7)}...${curKey.slice(-4)} (Configured in localStorage)` : 'None (Running local heuristic engine)'}
- Base URL: ${miniVatsalConfig.baseURL}
- Model   : ${miniVatsalConfig.model}

Commands:
- config api_key <your_groq_or_openai_key>
- config clear`);
                return;
            }

            if (sub === 'api_key' || sub === 'key') {
                if (!val) {
                    addLine('error', 'Usage: config api_key <your_groq_or_openai_key>');
                    return;
                }
                try {
                    localStorage.setItem('minivatsal_api_key', val);
                    setApiKeyStatus(true);
                    addLine('output', `✓ API Key successfully configured and saved to browser localStorage! Live inference is now active.`);
                } catch {
                    addLine('error', 'Could not write to localStorage.');
                }
                return;
            }

            if (sub === 'clear' || sub === 'reset') {
                try {
                    localStorage.removeItem('minivatsal_api_key');
                    localStorage.removeItem('minivatsal_base_url');
                    localStorage.removeItem('minivatsal_model');
                    setApiKeyStatus(false);
                    addLine('output', '✓ Cleared custom API keys. Reverted to local zero-config neural heuristic engine.');
                } catch {
                    addLine('error', 'Could not clear localStorage.');
                }
                return;
            }

            addLine('error', 'Usage: config [api_key <key> | clear]');
            return;
        }

        // 11. Theme toggle
        if (primary === 'theme') {
            const arg = tokens[1]?.toLowerCase();
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme') || 'dark';

            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            if (arg === 'dark') newTheme = 'dark';
            if (arg === 'light') newTheme = 'light';

            html.setAttribute('data-theme', newTheme);
            addLine('output', `✓ Theme switched to: ${newTheme.toUpperCase()}`);
            return;
        }

        // 12. History command
        if (lower === 'history') {
            if (history.length === 0) {
                addLine('output', 'No command history recorded in current session.');
            } else {
                addLine('output-multiline', history.map((h, i) => `${String(i + 1).padStart(3, ' ')}  ${h}`).join('\n'));
            }
            return;
        }

        // 13. Sudo prank
        if (lower.startsWith('sudo')) {
            addLine('error', '[sudo] password for guest: Permission denied. Vatsal is the sole root administrator.');
            return;
        }

        // 14. Echo
        if (primary === 'echo') {
            addLine('output', tokens.slice(1).join(' '));
            return;
        }

        // 15. Natural query — run through agent engine
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
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const current = inputVal.trim().toLowerCase();
            if (!current) return;
            const match = AUTOCOMPLETE_LIST.find((cmd) => cmd.startsWith(current));
            if (match) {
                setInputVal(match);
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
                            An open live interactive terminal connected to my digital stand-in. Type Unix commands like <code className="term-code-inline">help</code>, <code className="term-code-inline">skills</code>, <code className="term-code-inline">projects</code>, <code className="term-code-inline">cat about.md</code>, or ask any technical question directly.
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
                                vatsal@iitbhilai: ~ (bash / zsh) · {apiKeyStatus ? 'Live LLM Active' : 'Heuristic Neural Engine'}
                            </div>

                            {/* Window Controls (Red / Yellow / Green dots) */}
                            <div className="term-controls">
                                <span className="term-btn term-btn-min" title="Minimize"><FiMinus /></span>
                                <span className="term-btn term-btn-max" title="Maximize"><FiMaximize2 /></span>
                                <span className="term-btn term-btn-close" title="Reset Buffer" onClick={(e) => { e.stopPropagation(); setLines(INITIAL_LINES); }}><FiX /></span>
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

                                            {line.type === 'thought' && (
                                                <div className="term-thought-line">
                                                    <span>{line.text}</span>
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
                                                        download
                                                        className="term-action-link"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <FiDownload /> {line.extra.label}
                                                    </a>
                                                </div>
                                            )}

                                            {line.type === 'output-table' && (
                                                <div className="term-table-wrapper">
                                                    <div className="term-table-head">{line.text}</div>
                                                    <div className="term-table">
                                                        {line.extra.map((item, i) => (
                                                            <div key={i} className="term-table-row">
                                                                <button
                                                                    type="button"
                                                                    className="term-table-cmd"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleCommand(item.cmd);
                                                                    }}
                                                                >
                                                                    {item.cmd}
                                                                </button>
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
                                                                <div className="term-proj-desc">{p.tagline || p.description}</div>
                                                                <div className="term-proj-actions">
                                                                    {p.github && (
                                                                        <a
                                                                            href={p.github}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="term-proj-link"
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <FiExternalLink /> GitHub Repo
                                                                        </a>
                                                                    )}
                                                                    <button
                                                                        type="button"
                                                                        className="term-proj-action-btn"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleCommand(`open projects`);
                                                                        }}
                                                                    >
                                                                        View in 3D Carousel →
                                                                    </button>
                                                                </div>
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
                                            placeholder={isStreaming ? 'Mini Vatsal is streaming...' : 'Type a Unix command (help, skills, projects, cat about.md) or ask any question...'}
                                        />
                                        <button
                                            type="button"
                                            className="term-send-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCommand(inputVal);
                                            }}
                                            disabled={!inputVal.trim() || isStreaming}
                                            aria-label="Send terminal command"
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
  "version": "2.5.0",
  "persona": "Nonchalant, Quirky, Sarcastic & Witty AI Systems Engineer",
  "host": "IIT Bhilai (DSAI Cluster)",
  "status": "Online · Autonomous Stand-in Active",
  "capabilities": [
    "AI Infrastructure & Token Optimization Consulting",
    "Multi-Agent LangGraph State Machine Architecture",
    "Model Context Protocol (MCP) & Context Pager Virtual Memory",
    "Interactive Terminal Unix Navigation"
  ],
  "latency": "~1.8s Sub-Second Execution",
  "uptime": "99.98%",
  "inferenceEngine": "${apiKeyStatus ? `Live LLM Provider (${miniVatsalConfig.model})` : 'Local Heuristic ReAct Engine'}",
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
                            <span className="term-quick-label">Quick Suggestions:</span>
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
