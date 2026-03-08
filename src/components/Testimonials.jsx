import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { RiDoubleQuotesL } from 'react-icons/ri';
import ScrollReveal from './ScrollReveal';
import { testimonials } from '../data/portfolioData';

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const go = (dir) => {
        setDirection(dir);
        setCurrent(prev => {
            const next = prev + dir;
            if (next < 0) return testimonials.length - 1;
            if (next >= testimonials.length) return 0;
            return next;
        });
    };

    const t = testimonials[current];

    return (
        <section className="section" style={{ overflow: 'hidden' }}>
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Testimonials</span>
                        <h2 className="section-title">What People Say</h2>
                        <p className="section-subtitle">
                            Kind words from mentors, colleagues, and peers
                        </p>
                    </div>
                </ScrollReveal>

                <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            initial={{ opacity: 0, x: direction * 100, rotateY: direction * 15 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -direction * 100, rotateY: -direction * 15 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="glass-card"
                            style={{
                                padding: '40px 32px',
                                textAlign: 'center',
                                position: 'relative',
                            }}
                        >
                            <RiDoubleQuotesL style={{
                                fontSize: '3rem',
                                color: 'var(--accent-violet)',
                                opacity: 0.3,
                                marginBottom: 16,
                            }} />

                            <p style={{
                                fontSize: '1.1rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.9,
                                fontStyle: 'italic',
                                marginBottom: 24,
                            }}>
                                "{t.text}"
                            </p>

                            {/* Avatar / initials */}
                            <div style={{
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                background: 'var(--gradient-main)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 12px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                color: '#fff',
                            }}>
                                {t.name.split(' ').map(n => n[0]).join('')}
                            </div>

                            <h4 style={{ fontSize: '1rem', color: 'var(--text-heading)' }}>{t.name}</h4>
                            <p style={{
                                fontSize: '0.85rem',
                                color: 'var(--accent-cyan)',
                                fontFamily: 'var(--font-mono)',
                            }}>
                                {t.role}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 16,
                        marginTop: 24,
                        alignItems: 'center',
                    }}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => go(-1)}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'var(--bg-card)',
                                border: 'var(--border-glass)',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1rem',
                            }}
                        >
                            <FiChevronLeft />
                        </motion.button>

                        <div style={{ display: 'flex', gap: 8 }}>
                            {testimonials.map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        width: i === current ? 24 : 8,
                                        background: i === current ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)',
                                    }}
                                    style={{
                                        height: 8,
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => go(1)}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'var(--bg-card)',
                                border: 'var(--border-glass)',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1rem',
                            }}
                        >
                            <FiChevronRight />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
