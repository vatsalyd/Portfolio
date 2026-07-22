import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VYLogo from './VYLogo';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState('loading'); // loading → reveal → done
    const called = useRef(false);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 16 + 8;
            if (current >= 100) {
                current = 100;
                setProgress(100);
                clearInterval(interval);
                // Fast transition
                setTimeout(() => setPhase('reveal'), 200);
                setTimeout(() => {
                    setPhase('done');
                    if (!called.current) {
                        called.current = true;
                        setTimeout(() => onCompleteRef.current?.(), 400);
                    }
                }, 800);
            } else {
                setProgress(Math.floor(current));
            }
        }, 40);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99999,
                        background: '#0A0A0F',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    {/* Radial background glow */}
                    <div style={{
                        position: 'absolute',
                        width: 450,
                        height: 450,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(6,182,212,0.04) 50%, transparent 70%)',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                    }} />

                    {/* Logo reveal */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: phase === 'reveal' ? [1, 1.1, 1] : 1,
                            opacity: 1,
                        }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{ position: 'relative', zIndex: 2 }}
                    >
                        <VYLogo size={64} />
                    </motion.div>

                    {/* Progress section */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        style={{
                            marginTop: 40,
                            width: 180,
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 2,
                        }}
                    >
                        <p style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            marginBottom: 10,
                        }}>
                            {phase === 'reveal' ? 'INITIALIZED' : 'LOADING'}
                        </p>

                        {/* Sleek bar */}
                        <div style={{
                            width: '100%',
                            height: 2,
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: 1,
                            overflow: 'hidden',
                        }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                style={{
                                    height: '100%',
                                    background: 'var(--gradient-aurora)',
                                    borderRadius: 1,
                                    boxShadow: '0 0 12px rgba(139,92,246,0.6)',
                                }}
                            />
                        </div>

                        {/* Percentage */}
                        <motion.p
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                color: progress >= 100 ? 'var(--accent-cyan)' : 'var(--text-muted)',
                                letterSpacing: '1px',
                                marginTop: 8,
                            }}
                        >
                            {progress}%
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
