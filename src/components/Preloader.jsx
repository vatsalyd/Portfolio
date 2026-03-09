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
            current += Math.random() * 12 + 4;
            if (current >= 100) {
                current = 100;
                setProgress(100);
                clearInterval(interval);
                // Phase transition: loading → reveal → done
                setTimeout(() => setPhase('reveal'), 300);
                setTimeout(() => {
                    setPhase('done');
                    if (!called.current) {
                        called.current = true;
                        setTimeout(() => onCompleteRef.current?.(), 600);
                    }
                }, 1200);
            } else {
                setProgress(Math.floor(current));
            }
        }, 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99999,
                        background: '#0A0201',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    {/* Ambient glow rings */}
                    <div style={{
                        position: 'absolute',
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(195,17,12,0.08) 0%, transparent 70%)',
                        animation: 'preloader-pulse 2s ease-in-out infinite',
                    }} />
                    <div style={{
                        position: 'absolute',
                        width: 600,
                        height: 600,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(230,80,27,0.04) 0%, transparent 70%)',
                        animation: 'preloader-pulse 2s ease-in-out infinite 0.5s',
                    }} />

                    {/* Rotating orbital ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            border: '1px solid rgba(195,17,12,0.1)',
                            borderTopColor: 'rgba(195,17,12,0.5)',
                        }}
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            width: 260,
                            height: 260,
                            borderRadius: '50%',
                            border: '1px solid rgba(230,80,27,0.06)',
                            borderBottomColor: 'rgba(230,80,27,0.3)',
                        }}
                    />

                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                            scale: phase === 'reveal' ? [1, 1.15, 1] : 1,
                            opacity: 1,
                        }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{ position: 'relative', zIndex: 2 }}
                    >
                        <VYLogo size={72} />
                    </motion.div>

                    {/* Progress section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            marginTop: 48,
                            width: 200,
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 2,
                        }}
                    >
                        {/* Loading text */}
                        <p style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6rem',
                            color: 'rgba(195,17,12,0.5)',
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                            marginBottom: 12,
                        }}>
                            {phase === 'reveal' ? 'INITIALIZING' : 'LOADING SYSTEMS'}
                        </p>

                        {/* Progress bar */}
                        <div style={{
                            width: '100%',
                            height: 2,
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: 1,
                            overflow: 'hidden',
                        }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #740A03, #C3110C, #E6501B)',
                                    borderRadius: 1,
                                    boxShadow: '0 0 12px rgba(195,17,12,0.6)',
                                }}
                            />
                        </div>

                        {/* Percentage */}
                        <motion.p
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                color: progress >= 100 ? '#C3110C' : 'rgba(184,192,204,0.4)',
                                letterSpacing: '2px',
                                marginTop: 8,
                            }}
                        >
                            {progress < 100 ? `${progress}%` : '● READY'}
                        </motion.p>
                    </motion.div>

                    {/* Reveal flash */}
                    {phase === 'reveal' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.15, 0] }}
                            transition={{ duration: 0.8 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'radial-gradient(circle at center, rgba(195,17,12,0.3), transparent 60%)',
                                zIndex: 1,
                            }}
                        />
                    )}

                    <style>{`
                        @keyframes preloader-pulse {
                            0%, 100% { transform: scale(1); opacity: 0.5; }
                            50% { transform: scale(1.15); opacity: 1; }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
