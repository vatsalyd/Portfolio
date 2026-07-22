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
        if (item.href === '#hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const el = document.querySelector(item.href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Trigger hint button */}
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
                    background: 'rgba(22, 22, 34, 0.85)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    borderRadius: 'var(--border-radius-pill)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}
            >
                <FiCommand style={{ color: 'var(--accent-violet)' }} /> Ctrl+K
            </motion.div>

            {/* Command Palette Modal */}
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
                            background: 'rgba(5, 5, 10, 0.75)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingTop: '18vh',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: -10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: -10 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card"
                            style={{
                                width: '100%',
                                maxWidth: 520,
                                overflow: 'hidden',
                                margin: '0 16px',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                            }}
                        >
                            {/* Search Input Bar */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '16px 20px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            }}>
                                <FiSearch style={{ color: 'var(--accent-violet)', fontSize: '1.15rem', flexShrink: 0 }} />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search sections or commands..."
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
                                    padding: '3px 8px',
                                    fontSize: '0.68rem',
                                    fontFamily: 'var(--font-mono)',
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 4,
                                    color: 'var(--text-muted)',
                                }}>
                                    ESC
                                </kbd>
                            </div>

                            {/* Search Results List */}
                            <div style={{ padding: '8px 0', maxHeight: 320, overflowY: 'auto' }}>
                                {filtered.length === 0 && (
                                    <p style={{
                                        padding: '16px 20px',
                                        color: 'var(--text-muted)',
                                        fontSize: '0.9rem',
                                    }}>
                                        No matching commands found.
                                    </p>
                                )}
                                {filtered.map((item) => (
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
                                            fontSize: '0.92rem',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                    >
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.72rem',
                                            color: 'var(--accent-cyan)',
                                            padding: '2px 8px',
                                            background: 'rgba(6, 182, 212, 0.1)',
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
