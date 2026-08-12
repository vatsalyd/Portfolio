import { useEffect, useState, useCallback } from 'react';
import { FiX, FiChevronRight, FiChevronLeft, FiPause, FiPlay } from 'react-icons/fi';

const DEFAULT_AUTO_MS = 4000;

export default function TourOverlay({
    sections,
    index,
    onNext,
    onPrev,
    onExit,
    isPaused,
    onTogglePause,
    autoMs = DEFAULT_AUTO_MS,
}) {
    const [rect, setRect] = useState(null);
    const [countdown, setCountdown] = useState(autoMs);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Track the active section's bounding rect (recomputed on scroll & resize)
    const updateRect = useCallback(() => {
        const el = document.getElementById(sections[index]?.id);
        if (!el) { setRect(null); return; }
        const r = el.getBoundingClientRect();
        const pad = 10;
        setRect({
            top: Math.max(4, r.top - pad),
            left: Math.max(4, r.left - pad),
            width: r.width + pad * 2,
            height: r.height + pad * 2,
        });
    }, [index, sections]);

    useEffect(() => {
        let rafId = 0;
        // Defer initial measurement to next frame so we don't setState synchronously in the effect.
        rafId = requestAnimationFrame(updateRect);
        window.addEventListener('scroll', updateRect, { passive: true });
        window.addEventListener('resize', updateRect);
        // Also recompute shortly after the smooth-scroll settles
        const t1 = setTimeout(updateRect, 300);
        const t2 = setTimeout(updateRect, 700);
        const t3 = setTimeout(updateRect, 1100);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', updateRect);
            window.removeEventListener('resize', updateRect);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [updateRect]);

    // Auto-advance countdown
    useEffect(() => {
        if (isPaused) return;
        const start = Date.now();
        // Initialize via rAF to avoid setState synchronously in the effect body.
        let rafInit = requestAnimationFrame(() => setCountdown(autoMs));
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const remain = Math.max(0, autoMs - elapsed);
            setCountdown(remain);
            if (remain <= 0) {
                clearInterval(interval);
                onNext();
            }
        }, 50);
        return () => {
            cancelAnimationFrame(rafInit);
            clearInterval(interval);
        };
    }, [index, isPaused, autoMs, onNext]);

    if (!sections[index]) return null;
    const current = sections[index];
    const atStart = index === 0;
    const atEnd = index === sections.length - 1;
    const progressPct = ((index + 1) / sections.length) * 100;
    const countdownPct = isPaused ? 0 : (1 - countdown / autoMs) * 100;

    const spotlightStyle = rect
        ? {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        }
        : { display: 'none' };

    const hintTop = isMobile
        ? (rect ? rect.bottom + 12 : 'auto')
        : (rect ? Math.max(120, rect.top) : 120);
    const hintLeft = isMobile
        ? '50%'
        : (rect ? Math.max(24, Math.min(rect.right + 18, window.innerWidth - 300)) : 24);

    return (
        <>
            <div className="tour-overlay" role="dialog" aria-label="Guided tour">
                <div className="tour-spotlight" style={spotlightStyle} />
            </div>

            {/* Floating hint near spotlight */}
            <div
                className="tour-hint"
                style={{
                    top: hintTop,
                    left: hintLeft,
                    transform: isMobile ? 'translateX(-50%)' : 'none',
                    maxWidth: isMobile ? '90vw' : 280,
                }}
            >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--accent-cyan)', letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>
                    {index + 1} · {current.title}
                </div>
                {current.hint}
            </div>

            {/* Bottom progress / control panel */}
            <div className="tour-panel">
                <button className="tour-panel-btn" onClick={onTogglePause} aria-label={isPaused ? 'Resume' : 'Pause'} title={isPaused ? 'Resume auto-advance' : 'Pause auto-advance'}>
                    {isPaused ? <FiPlay /> : <FiPause />}
                </button>
                <button className="tour-panel-btn" onClick={onPrev} disabled={atStart} style={{ opacity: atStart ? 0.4 : 1, cursor: atStart ? 'not-allowed' : 'pointer' }} aria-label="Previous section">
                    <FiChevronLeft />
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 160 }}>
                    <div className="tour-section-label">
                        <span className="tour-section-count">{index + 1}</span> / {sections.length} — {current.title}
                    </div>
                    <div className="tour-progress-track">
                        <div className="tour-progress-fill" style={{ width: `${progressPct}%` }} />
                        {!isPaused && !atEnd && (
                            <div style={{
                                position: 'absolute', top: 0, left: 0, height: '100%',
                                width: '100%', borderRadius: 2,
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                                backgroundSize: '200% 100%',
                                backgroundPosition: `${countdownPct}% 0`,
                                opacity: 0.4,
                                transition: 'none',
                            }} />
                        )}
                    </div>
                </div>

                <button className="tour-panel-btn primary" onClick={onNext} disabled={atEnd} style={{ opacity: atEnd ? 0.4 : 1, cursor: atEnd ? 'not-allowed' : 'pointer' }} aria-label="Next section">
                    {atEnd ? 'End' : 'Next'} <FiChevronRight />
                </button>
                <button className="tour-panel-btn" onClick={onExit} aria-label="Exit tour">
                    <FiX /> Exit Tour
                </button>
            </div>
        </>
    );
}
