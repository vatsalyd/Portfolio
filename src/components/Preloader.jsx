import { useState, useEffect, useRef } from 'react';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const called = useRef(false);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 18 + 8;
            if (current >= 100) {
                current = 100;
                setProgress(100);
                clearInterval(interval);
                if (!called.current) {
                    called.current = true;
                    setTimeout(() => onCompleteRef.current?.(), 400);
                }
            } else {
                setProgress(Math.floor(current));
            }
        }, 80);
        return () => clearInterval(interval);
    }, []); // run only once

    return (
        <div
            className="preloader"
            style={{
                opacity: progress >= 100 ? 0 : 1,
                transition: 'opacity 0.4s ease',
                pointerEvents: progress >= 100 ? 'none' : 'all',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <div className="preloader-logo">VY</div>
                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'rgba(195,17,12,0.6)',
                    letterSpacing: '3px',
                    marginTop: 8,
                }}>
                    AGENT SYSTEM
                </p>
            </div>

            <div className="preloader-bar">
                <div
                    className="preloader-bar-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '2px',
            }}>
                {progress < 100 ? `LOADING ${progress}%` : 'READY'}
            </p>
        </div>
    );
}
