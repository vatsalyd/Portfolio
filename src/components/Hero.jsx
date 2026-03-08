import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiChevronDown, FiTerminal } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolioData';
import { useEffect, useState } from 'react';

/* ── Glitch Text ── */
function GlitchText({ text }) {
    return (
        <span style={{ position: 'relative', display: 'inline-block' }}>
            <span>{text}</span>
            <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', color: '#C3110C', opacity: 0.75, animation: 'glitch 3s infinite linear', clipPath: 'inset(0)' }}>{text}</span>
            <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', color: '#E6501B', opacity: 0.55, animation: 'glitch 3s infinite linear reverse', clipPath: 'inset(0)' }}>{text}</span>
        </span>
    );
}

/* ── Terminal Block ── */
function TerminalBlock() {
    const [lines, setLines] = useState([]);
    const allLines = [
        { text: '> sys.boot("vatsal_agent_v2")', delay: 100, color: 'var(--text-muted)' },
        { text: '> loading LLM backbone ━━━━━━━━━━ 100%', delay: 400, color: '#C3110C' },
        { text: '> tools: [search, analyze, code, deploy]', delay: 700, color: 'var(--text-secondary)' },
        { text: '> memory: vector_store [ACTIVE]', delay: 1000, color: 'var(--text-secondary)' },
        { text: '> agent.status = AUTONOMOUS', delay: 1300, color: '#E6501B' },
        { text: '> ready to execute', delay: 1600, color: '#fff' },
    ];

    useEffect(() => {
        const timeouts = [];
        setLines([]);
        allLines.forEach((line) => {
            const t = setTimeout(() => {
                setLines(prev => {
                    if (prev.some(p => p.text === line.text)) return prev;
                    return [...prev, line];
                });
            }, line.delay);
            timeouts.push(t);
        });
        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div style={{
            background: 'rgba(10, 2, 1, 0.94)',
            border: '1px solid rgba(195,17,12,0.2)',
            borderTop: '1px solid rgba(184,192,204,0.1)',
            borderRadius: 8,
            padding: '16px 20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            lineHeight: 1.9,
            maxWidth: 460,
            margin: '0 auto 32px',
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(195,17,12,0.08)',
        }}>
            <motion.div
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(195,17,12,0.25), transparent)', pointerEvents: 'none' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(195,17,12,0.08)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C3110C', boxShadow: '0 0 6px rgba(195,17,12,0.7)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E6501B', boxShadow: '0 0 6px rgba(230,80,27,0.7)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#B8C0CC', boxShadow: '0 0 6px rgba(184,192,204,0.5)' }} />
                <span style={{ marginLeft: 8, color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: 0.5 }}>agent_core.py — zsh</span>
            </div>
            {lines.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} style={{ color: line.color }}>
                    {line.text}
                    {i === lines.length - 1 && <span style={{ animation: 'terminal-blink 1s infinite', marginLeft: 2, color: '#C3110C' }}>█</span>}
                </motion.div>
            ))}
        </div>
    );
}

/* ── Hero Section ── */
export default function Hero() {
    const typeSequence = personalInfo.roles.flatMap(role => [role, 2500]);

    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 80,     /* navbar height + spacing */
            paddingBottom: 60,
            paddingLeft: 24,
            paddingRight: 24,
        }}>
            {/* Content */}
            <div style={{ textAlign: 'center', maxWidth: 820, width: '100%' }}>

                <TerminalBlock />

                <h1 style={{
                    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                    fontWeight: 900,
                    marginBottom: 16,
                    letterSpacing: '0.05em',
                    color: '#fff',
                    textShadow: '0 0 40px rgba(195,17,12,0.25)',
                }}>
                    <GlitchText text={personalInfo.name} />
                </h1>

                <p style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    maxWidth: 500,
                    margin: '0 auto 8px',
                    lineHeight: 1.6,
                }}>
                    Building autonomous AI systems that think, reason, and act.
                </p>

                <div style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                    marginBottom: 32,
                    minHeight: 36,
                    fontFamily: 'var(--font-mono)',
                }}>
                    <span style={{ color: 'var(--text-muted)' }}>{'// '}</span>
                    <TypeAnimation
                        sequence={typeSequence}
                        speed={50}
                        deletionSpeed={40}
                        repeat={Infinity}
                        style={{ color: '#E6501B', fontWeight: 500 }}
                    />
                </div>

                {/* Status */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginBottom: 36, flexWrap: 'wrap' }}>
                    {[
                        { label: 'STATUS', value: 'ONLINE', color: '#C3110C' },
                        { label: 'AGENTS', value: '12 ACTIVE', color: '#E6501B' },
                        { label: 'UPTIME', value: '99.97%', color: '#B8C0CC' },
                    ].map((item) => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: 1 }}>
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.2, 0.9] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}` }}
                            />
                            <span style={{ color: 'var(--text-muted)' }}>{item.label}:</span>
                            <span style={{ color: item.color, fontWeight: 600 }}>{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
                    <motion.a href="#projects" className="glow-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        View Projects <FiArrowRight />
                    </motion.a>
                    <motion.a href="#contact" className="glow-btn-outline" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        <FiTerminal /> Get In Touch
                    </motion.a>
                </div>

                {/* Socials */}
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                    {socialLinks.map((link) => (
                        <motion.a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                            whileHover={{ y: -4, scale: 1.15 }}
                            style={{
                                width: 42, height: 42, borderRadius: 6,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'rgba(195,17,12,0.04)',
                                border: '1px solid rgba(195,17,12,0.15)',
                                color: 'var(--text-muted)',
                                fontSize: '1.15rem',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#C3110C';
                                e.currentTarget.style.borderColor = 'rgba(195,17,12,0.45)';
                                e.currentTarget.style.background = 'rgba(195,17,12,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--text-muted)';
                                e.currentTarget.style.borderColor = 'rgba(195,17,12,0.15)';
                                e.currentTarget.style.background = 'rgba(195,17,12,0.04)';
                            }}
                            aria-label={link.name}
                        >
                            <link.icon />
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute', bottom: 30, left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                color: 'var(--text-muted)', cursor: 'pointer', opacity: 0.5,
            }}
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</span>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <FiChevronDown style={{ fontSize: '1rem' }} />
                </motion.div>
            </div>
        </section>
    );
}
