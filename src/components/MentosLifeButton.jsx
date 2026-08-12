import { useState, useCallback, useRef, useEffect } from 'react';
import { FiPlay } from 'react-icons/fi';
import TourOverlay from './TourOverlay';
import { tourSections } from '../data/portfolioData';

export default function MentosLifeButton() {
    const [touring, setTouring] = useState(false);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    // When user scrolls manually during tour, sync index to closest section.
    // To avoid fighting user scroll, we only sync if the current section's
    // center is far off-screen (>60% of viewport).
    const lastIndexRef = useRef(0);
    const isAnimatingScrollRef = useRef(false);

    const scrollToIndex = useCallback((i) => {
        const target = tourSections[i];
        if (!target) return;
        const el = document.getElementById(target.id);
        if (!el) return;
        isAnimatingScrollRef.current = true;
        // For the first section, scroll to top to fully show hero.
        if (i === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Give the smooth scroll time to settle before releasing the flag
        setTimeout(() => { isAnimatingScrollRef.current = false; }, 900);
    }, []);

    const start = useCallback(() => {
        setTouring(true);
        setIndex(0);
        setPaused(false);
        // Slight delay so overlay mounts before scroll
        setTimeout(() => scrollToIndex(0), 120);
    }, [scrollToIndex]);

    const exit = useCallback(() => {
        setTouring(false);
        setPaused(false);
    }, []);

    const next = useCallback(() => {
        setIndex((prev) => {
            const n = Math.min(prev + 1, tourSections.length - 1);
            scrollToIndex(n);
            return n;
        });
    }, [scrollToIndex]);

    const prev = useCallback(() => {
        setIndex((p) => {
            const n = Math.max(p - 1, 0);
            scrollToIndex(n);
            return n;
        });
    }, [scrollToIndex]);

    const togglePause = useCallback(() => setPaused((p) => !p), []);

    // Allow Esc to exit tour
    useEffect(() => {
        if (!touring) return;
        const handler = (e) => {
            if (e.key === 'Escape') exit();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [touring, exit, next, prev]);

    // Lock body horizontal overflow when touring (overlay handles dim)
    useEffect(() => {
        if (!touring) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'auto'; // keep scroll enabled, but ensure not 'hidden'
        return () => { document.body.style.overflow = prevOverflow; };
    }, [touring]);

    useEffect(() => {
        lastIndexRef.current = index;
    }, [index]);

    return (
        <>
            <button
                className="mentos-btn"
                onClick={start}
                aria-label="Start guided Mentos Life tour"
                title="Start the guided tour through every section"
            >
                <FiPlay className="mentos-play" />
                Mentos Life
            </button>

            {touring && (
                <TourOverlay
                    sections={tourSections}
                    index={index}
                    onNext={next}
                    onPrev={prev}
                    onExit={exit}
                    isPaused={paused}
                    onTogglePause={togglePause}
                />
            )}
        </>
    );
}
