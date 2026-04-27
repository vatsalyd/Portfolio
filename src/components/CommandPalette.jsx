import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCommand } from 'react-icons/fi';
import { navLinks } from '../data/portfolioData';

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    // Ctrl+K / Cmd+K
    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const allItems = [
        ...navLinks.map(l => ({ ...l, type: 'section' })),
        { name: 'Go to Top', href: '#hero', type: 'action' },
        { name: 'Download Resume', href: '/Portfolio/resume.pdf', type: 'action' },
    ];

    const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    const navigate = (item) => {
        setIsOpen(false);
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else if (item.href === '#hero') window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Konami code easter egg
    useEffect(() => {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let index = 0;

        const handler = (e) => {
            if (e.key === konamiCode[index]) {
                index++;
                if (index === konamiCode.length) {
                    // Easter egg: party mode
                    document.body.style.transition = 'filter 0.5s';
                    document.body.style.filter = 'hue-rotate(90deg)';
                    setTimeout(() => {
                        document.body.style.filter = 'hue-rotate(180deg)';
                    }, 500);
                    setTimeout(() => {
                        document.body.style.filter = 'hue-rotate(270deg)';
                    }, 1000);
                    setTimeout(() => {
                        document.body.style.filter = 'hue-rotate(360deg)';
                    }, 1500);
                    setTimeout(() => {
                        document.body.style.filter = 'none';
                    }, 2000);
                    index = 0;
                }
            } else {
                index = 0;
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
        <>
            {/* Trigger hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    background: 'var(--bg-card)',
                    border: 'var(--border-glass)',
                    borderRadius: 50,
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                }}
            >
                <FiCommand /> Ctrl+K
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 99999,
                            background: 'rgba(0,0,0,0.6)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingTop: '20vh',
                            backdropFilter: 'blur(4px)',
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card"
                            style={{
                                width: '100%',
                                maxWidth: 500,
                                overflow: 'hidden',
                                margin: '0 16px',
                            }}
                        >
                            {/* Search input */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '16px 20px',
                                borderBottom: 'var(--border-glass)',
                            }}>
                                <FiSearch style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem', flexShrink: 0 }} />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search sections, actions..."
                                    style={{
                                        flex: 1,
                                        background: 'none',
                                        border: 'none',
                                        outline: 'none',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'var(--font-primary)',
                                        fontSize: '1rem',
                                    }}
                                />
                                <kbd style={{
                                    padding: '2px 8px',
                                    fontSize: '0.7rem',
                                    fontFamily: 'var(--font-mono)',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: 'var(--border-glass)',
                                    borderRadius: 4,
                                    color: 'var(--text-muted)',
                                }}>
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <div style={{ padding: '8px 0', maxHeight: 300, overflow: 'auto' }}>
                                {filtered.length === 0 && (
                                    <p style={{
                                        padding: '12px 20px',
                                        color: 'var(--text-muted)',
                                        fontSize: '0.9rem',
                                    }}>
                                        No results found.
                                    </p>
                                )}
                                {filtered.map((item, i) => (
                                    <motion.button
                                        key={item.name}
                                        onClick={() => navigate(item)}
                                        whileHover={{ x: 4 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 12,
                                            width: '100%',
                                            padding: '12px 20px',
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-primary)',
                                            fontFamily: 'var(--font-primary)',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                    >
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.7rem',
                                            color: 'var(--accent-cyan)',
                                            padding: '2px 8px',
                                            background: 'rgba(0,240,255,0.1)',
                                            borderRadius: 4,
                                        }}>
                                            {item.type === 'section' ? '§' : '⚡'}
                                        </span>
                                        {item.name}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
