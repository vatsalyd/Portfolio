import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiFileText,
    FiZap,
    FiPlay,
    FiPause,
    FiSkipForward,
    FiSkipBack,
    FiX,
    FiCheck,
    FiExternalLink,
} from 'react-icons/fi';

const TOUR_SECTIONS = [
    { id: 'hero', name: 'Identity & Intro', duration: 4200 },
    { id: 'agent', name: 'Mini Vatsal Terminal', duration: 5200 },
    { id: 'opensource', name: 'Open Source & GitHub', duration: 4200 },
    { id: 'skills', name: 'Technical Infrastructure', duration: 4500 },
    { id: 'projects', name: '3D Projects Carousel', duration: 5800 },
    { id: 'experience', name: 'Incrivelsoft & Track', duration: 4500 },
    { id: 'landscape', name: 'Technical Arena & Events', duration: 4800 },
    { id: 'articles', name: 'Published Notes', duration: 4200 },
    { id: 'taste', name: 'Curated Cinema Roster', duration: 3800 },
    { id: 'characters', name: 'Iconic Archetypes', duration: 3600 },
    { id: 'contact', name: 'Reach Out Endpoints', duration: 5000 },
];

export default function TopNavActions() {
    const [isTourActive, setIsTourActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const stepTimerRef = useRef(null);
    const animFrameRef = useRef(null);
    const startTimeRef = useRef(null);
    const pausedTimeRef = useRef(0);

    // Scroll to section with smooth easing and offset
    const scrollToSection = useCallback((id) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 30;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }, []);

    // Stop Tour
    const stopTour = useCallback(() => {
        setIsTourActive(false);
        setIsPaused(false);
        setProgress(0);
        if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }, []);

    // Next Step
    const nextStep = useCallback(() => {
        setCurrentStep((prev) => {
            const next = prev + 1;
            if (next >= TOUR_SECTIONS.length) {
                stopTour();
                return 0;
            }
            scrollToSection(TOUR_SECTIONS[next].id);
            return next;
        });
        setProgress(0);
        startTimeRef.current = performance.now();
    }, [scrollToSection, stopTour]);

    // Prev Step
    const prevStep = useCallback(() => {
        setCurrentStep((prev) => {
            const next = Math.max(0, prev - 1);
            scrollToSection(TOUR_SECTIONS[next].id);
            return next;
        });
        setProgress(0);
        startTimeRef.current = performance.now();
    }, [scrollToSection]);

    // Start Tour
    const startTour = () => {
        setIsTourActive(true);
        setIsPaused(false);
        setCurrentStep(0);
        setProgress(0);
        scrollToSection(TOUR_SECTIONS[0].id);
        startTimeRef.current = performance.now();
    };

    // Toggle Pause
    const togglePause = () => {
        setIsPaused((prev) => !prev);
    };

    // Progress and Section auto-advance loop
    useEffect(() => {
        if (!isTourActive || isPaused) return;

        const currentDuration = TOUR_SECTIONS[currentStep]?.duration || 4500;
        startTimeRef.current = performance.now() - (progress / 100) * currentDuration;

        const tick = (now) => {
            const elapsed = now - startTimeRef.current;
            const pct = Math.min((elapsed / currentDuration) * 100, 100);
            setProgress(pct);

            if (pct >= 100) {
                nextStep();
            } else {
                animFrameRef.current = requestAnimationFrame(tick);
            }
        };

        animFrameRef.current = requestAnimationFrame(tick);

        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [isTourActive, isPaused, currentStep, nextStep]);

    // ESC key stops tour
    useEffect(() => {
        if (!isTourActive) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') stopTour();
            if (e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                togglePause();
            }
            if (e.key === 'ArrowRight') nextStep();
            if (e.key === 'ArrowLeft') prevStep();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isTourActive, stopTour, nextStep, prevStep]);

    return (
        <>
            {/* Top Right Floating Action Group */}
            <div className="top-nav-actions-wrapper">
                {/* Resume Button */}
                <a
                    href={`${import.meta.env.BASE_URL}resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="top-nav-btn top-nav-resume-btn"
                    aria-label="Open Vatsal's Resume (PDF)"
                    title="View & Download Resume PDF"
                >
                    <FiFileText className="top-nav-btn-icon" />
                    <span>Resume</span>
                </a>

                {/* Spoonfeeding (Recruiter Mode) Button */}
                <button
                    type="button"
                    onClick={isTourActive ? stopTour : startTour}
                    className={`top-nav-btn top-nav-spoonfeeding-btn ${isTourActive ? 'is-active' : ''}`}
                    aria-label="Toggle Spoonfeeding Recruiter Auto-Tour Mode"
                    title="Recruiters mode: Hands-free automated tour through all portfolio sections"
                >
                    <span className="spoonfeeding-pulse-dot" />
                    <FiZap className="top-nav-btn-icon zap-icon" />
                    <span className="spoonfeeding-label">Spoonfeeding</span>
                    <span className="spoonfeeding-badge">Recruiter Mode</span>
                </button>
            </div>

            {/* Active Spoonfeeding Tour Controller Bar */}
            <AnimatePresence>
                {isTourActive && (
                    <motion.div
                        className="tour-controller-bar"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Progress Line */}
                        <div
                            className="tour-progress-fill"
                            style={{ width: `${progress}%` }}
                        />

                        <div className="tour-controller-content">
                            {/* Section indicator */}
                            <div className="tour-section-info">
                                <span className="tour-mode-tag">🥄 Spoonfeeding Mode</span>
                                <div className="tour-section-name">
                                    <span className="tour-step-count">
                                        {currentStep + 1}/{TOUR_SECTIONS.length}
                                    </span>
                                    <span className="tour-step-title">
                                        {TOUR_SECTIONS[currentStep]?.name}
                                    </span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="tour-controls-group">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className="tour-ctrl-btn"
                                    title="Previous Section (← Arrow)"
                                >
                                    <FiSkipBack />
                                </button>

                                <button
                                    type="button"
                                    onClick={togglePause}
                                    className={`tour-ctrl-btn play-pause ${isPaused ? 'paused' : ''}`}
                                    title={isPaused ? 'Resume Auto-Tour (Space)' : 'Pause Auto-Tour (Space)'}
                                >
                                    {isPaused ? <FiPlay /> : <FiPause />}
                                </button>

                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="tour-ctrl-btn"
                                    title="Next Section (→ Arrow)"
                                >
                                    <FiSkipForward />
                                </button>

                                <button
                                    type="button"
                                    onClick={stopTour}
                                    className="tour-ctrl-btn close-btn"
                                    title="Exit Tour (ESC)"
                                >
                                    <FiX />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
