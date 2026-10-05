import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUsers,
    FiCalendar,
    FiMapPin,
    FiAward,
    FiTerminal,
    FiLayers,
    FiArrowUpRight,
    FiExternalLink,
    FiX,
    FiActivity,
    FiMaximize2,
    FiChevronLeft,
    FiChevronRight,
    FiPlay,
    FiPause,
    FiImage,
    FiCheckCircle,
} from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import {
    landscapeEvents,
    landscapeStats,
    landscapeCategories,
} from '../data/portfolioData';

const SLIDE_DURATION = 6000; // ms per slide in auto-advance mode

/**
 * LandscapeSessions — Professional Slideshow & Telemetry Showcase
 * for Hackathons, Workshops, Open-Source Sprints, and Campus Drives.
 */
export default function LandscapeSessions() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeEvent, setActiveEvent] = useState(null);
    const [imageErrors, setImageErrors] = useState({});

    const timerRef = useRef(null);
    const progressStartRef = useRef(Date.now());
    const [progressPct, setProgressPct] = useState(0);

    // Filter events by selected category
    const filteredEvents = useMemo(() => {
        if (selectedCategory === 'all') return landscapeEvents;
        return landscapeEvents.filter((ev) => ev.category === selectedCategory);
    }, [selectedCategory]);

    // Ensure currentIndex stays within bounds when filter changes
    useEffect(() => {
        setCurrentIndex(0);
        setProgressPct(0);
        progressStartRef.current = Date.now();
    }, [selectedCategory]);

    const currentEvent = filteredEvents[currentIndex] || filteredEvents[0] || landscapeEvents[0];
    const totalSlides = filteredEvents.length;

    // Navigation functions
    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
        setProgressPct(0);
        progressStartRef.current = Date.now();
    }, [totalSlides]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        setProgressPct(0);
        progressStartRef.current = Date.now();
    }, [totalSlides]);

    const goToIndex = useCallback((idx) => {
        setCurrentIndex(idx);
        setProgressPct(0);
        progressStartRef.current = Date.now();
    }, []);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    // Autoplay & Progress ticker
    useEffect(() => {
        if (!isPlaying || totalSlides <= 1) return;

        progressStartRef.current = Date.now() - (progressPct / 100) * SLIDE_DURATION;
        let animationFrame;

        const updateTicker = () => {
            const elapsed = Date.now() - progressStartRef.current;
            const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
            setProgressPct(pct);

            if (pct >= 100) {
                goToNext();
            } else {
                animationFrame = requestAnimationFrame(updateTicker);
            }
        };

        animationFrame = requestAnimationFrame(updateTicker);
        return () => cancelAnimationFrame(animationFrame);
    }, [isPlaying, totalSlides, currentIndex, goToNext, progressPct]);

    // Handle Image Error fallback
    const handleImgError = useCallback((id) => {
        setImageErrors((prev) => ({ ...prev, [id]: true }));
    }, []);

    // Open/Close Modal
    const openInspectModal = useCallback((event) => {
        setIsPlaying(false);
        setActiveEvent(event);
    }, []);

    const closeInspectModal = useCallback(() => {
        setActiveEvent(null);
    }, []);

    return (
        <EditorialSection
            id="landscape"
            ghost="ARENA"
            eyebrowIndex="07"
            eyebrowLabel="LANDSCAPE"
        >
            <div className="container landscape-container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Event Grounds · Telemetry Slideshow</span>
                        <h2 className="section-title">Technical Arena & Community Sprints</h2>
                        <p className="section-subtitle">
                            Curated showcase of technical hackathons, autonomous agent workshops, deep learning labs, and developer sprints conducted at IIT Bhilai and across the open-source ecosystem.
                        </p>
                    </div>
                </ScrollReveal>

                {/* ── Top Metric Summary Ribbon ── */}
                <ScrollReveal delay={0.1}>
                    <div className="landscape-telemetry-banner glass-card">
                        <div className="telemetry-banner-grid">
                            {landscapeStats.map((stat, idx) => (
                                <div key={idx} className="telemetry-banner-item">
                                    <span className="telemetry-banner-val">{stat.value}</span>
                                    <span className="telemetry-banner-label">{stat.label}</span>
                                    <span className="telemetry-banner-sub">{stat.sub}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* ── Category Filter Pills ── */}
                <ScrollReveal delay={0.15}>
                    <div className="landscape-filter-bar" role="tablist" aria-label="Filter events by category">
                        {landscapeCategories.map((cat) => {
                            const count = cat.id === 'all'
                                ? landscapeEvents.length
                                : landscapeEvents.filter((e) => e.category === cat.id).length;
                            const isActive = selectedCategory === cat.id;

                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`landscape-filter-chip ${isActive ? 'is-active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    <span className="filter-chip-label">{cat.label}</span>
                                    <span className="filter-chip-count">{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </ScrollReveal>

                {/* ── Cinematic Event Slideshow Stage ── */}
                <ScrollReveal delay={0.2}>
                    <div
                        className="arena-slideshow-deck glass-card"
                        onMouseEnter={() => setIsPlaying(false)}
                        onMouseLeave={() => setIsPlaying(true)}
                    >
                        {/* Autoplay Progress Line */}
                        <div className="slideshow-progress-line-track" aria-hidden="true">
                            <div
                                className="slideshow-progress-line-fill"
                                style={{ width: `${progressPct}%` }}
                            />
                        </div>

                        {/* Top Deck Control Header */}
                        <header className="slideshow-deck-topbar">
                            <div className="deck-counter-badge">
                                <span className="deck-stage-id">{currentEvent.stageCode || `STAGE-0${currentIndex + 1}`}</span>
                                <span className="deck-counter-sep">/</span>
                                <span className="deck-index-numbers">
                                    {String(currentIndex + 1).padStart(2, '0')} of {String(totalSlides).padStart(2, '0')}
                                </span>
                            </div>

                            <div className="deck-action-controls">
                                <button
                                    type="button"
                                    className="deck-ctrl-btn"
                                    onClick={togglePlayPause}
                                    aria-label={isPlaying ? "Pause auto-advance" : "Play auto-advance"}
                                    title={isPlaying ? "Pause slideshow" : "Play slideshow"}
                                >
                                    {isPlaying ? <FiPause /> : <FiPlay />}
                                </button>
                                <button
                                    type="button"
                                    className="deck-ctrl-btn"
                                    onClick={goToPrev}
                                    aria-label="Previous event slide"
                                    title="Previous (Left Arrow)"
                                >
                                    <FiChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    className="deck-ctrl-btn"
                                    onClick={goToNext}
                                    aria-label="Next event slide"
                                    title="Next (Right Arrow)"
                                >
                                    <FiChevronRight />
                                </button>
                            </div>
                        </header>

                        {/* Slide Content Frame with Animated Switch */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentEvent.id}
                                className="arena-slide-body"
                                initial={{ opacity: 0, x: 18 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -18 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Left Side: Visual Media Stage Screen */}
                                <div className="arena-media-viewport">
                                    <StageMediaDisplay
                                        event={currentEvent}
                                        hasImgError={!!imageErrors[currentEvent.id]}
                                        onImgError={() => handleImgError(currentEvent.id)}
                                        onInspect={() => openInspectModal(currentEvent)}
                                    />
                                </div>

                                {/* Right Side: Engineering Telemetry Panel */}
                                <div className="arena-telemetry-panel">
                                    <div className="arena-panel-meta">
                                        <span className="arena-cat-pill">{currentEvent.category}</span>
                                        <span className="arena-meta-period">
                                            <FiCalendar /> {currentEvent.period}
                                        </span>
                                        <span className="arena-meta-location">
                                            <FiMapPin /> {currentEvent.location}
                                        </span>
                                    </div>

                                    <div className="arena-role-strip">
                                        <span className="arena-role-pill">
                                            <FiAward className="role-icon" /> {currentEvent.role}
                                        </span>
                                    </div>

                                    <h3 className="arena-event-title">{currentEvent.title}</h3>
                                    <div className="arena-event-org">{currentEvent.organization}</div>

                                    <p className="arena-event-tagline">{currentEvent.tagline}</p>

                                    {/* Telemetry Metrics Bar */}
                                    {currentEvent.metrics && (
                                        <div className="arena-metrics-grid">
                                            {currentEvent.metrics.map((m, i) => (
                                                <div key={i} className="arena-metric-cell">
                                                    <span className="arena-m-val">{m.value}</span>
                                                    <span className="arena-m-lbl">{m.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Highlights Preview */}
                                    {currentEvent.highlights && currentEvent.highlights.length > 0 && (
                                        <div className="arena-highlights-box">
                                            <div className="arena-highlights-label">
                                                <FiCheckCircle className="label-icon" /> Key Technical Deliverables
                                            </div>
                                            <ul className="arena-highlights-list">
                                                {currentEvent.highlights.slice(0, 2).map((hl, i) => (
                                                    <li key={i} className="arena-highlight-item">
                                                        <span className="highlight-dot">{i + 1}</span>
                                                        <span>{hl}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Action Footers */}
                                    <footer className="arena-panel-footer">
                                        <button
                                            type="button"
                                            className="glow-btn arena-inspect-btn"
                                            onClick={() => openInspectModal(currentEvent)}
                                        >
                                            <span>Inspect Deep-Dive Telemetry</span>
                                            <FiMaximize2 />
                                        </button>

                                        {currentEvent.links && currentEvent.links.length > 0 && (
                                            <div className="arena-ext-links">
                                                {currentEvent.links.map((lnk, i) => (
                                                    <a
                                                        key={i}
                                                        href={lnk.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="arena-link-affordance"
                                                        title={lnk.label}
                                                    >
                                                        <span>{lnk.label}</span>
                                                        <FiArrowUpRight />
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </footer>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Bottom Stage Thumbnail Selector Bar */}
                        <div className="arena-thumbnails-bar" role="tablist" aria-label="Select event slide">
                            {filteredEvents.map((ev, idx) => {
                                const isCurrent = idx === currentIndex;
                                return (
                                    <button
                                        key={ev.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={isCurrent}
                                        className={`arena-thumb-chip ${isCurrent ? 'is-active' : ''}`}
                                        onClick={() => goToIndex(idx)}
                                    >
                                        <span className="thumb-chip-idx">{String(idx + 1).padStart(2, '0')}</span>
                                        <span className="thumb-chip-name">{ev.shortTitle || ev.title}</span>
                                        <span className="thumb-chip-category">{ev.category}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* ── Deep-Dive Telemetry Modal ── */}
            <EventInspectModal
                event={activeEvent}
                onClose={closeInspectModal}
            />
        </EditorialSection>
    );
}

/* ── Stage Media Display (Real Photo or High-Tech Procedural Fallback) ── */
function StageMediaDisplay({ event, hasImgError, onImgError, onInspect }) {
    const imgSrc = event.image && !hasImgError
        ? `${import.meta.env.BASE_URL}${event.image}`
        : null;

    return (
        <div className="stage-media-card">
            {imgSrc ? (
                <div className="stage-real-photo-wrap">
                    <img
                        src={imgSrc}
                        alt={event.title}
                        className="stage-photo-img"
                        onError={onImgError}
                        loading="lazy"
                    />
                    <div className="stage-photo-overlay-gradient" />
                    {event.caption && (
                        <div className="stage-photo-caption-bar">
                            <span className="stage-caption-tag">Live Session</span>
                            <span className="stage-caption-text">{event.caption}</span>
                        </div>
                    )}
                </div>
            ) : (
                /* High-End Technical Architectural Blueprint Graphic */
                <div className="stage-blueprint-fallback" onClick={onInspect}>
                    <div className="blueprint-grid-overlay" />

                    <div className="blueprint-stage-header">
                        <div className="blueprint-radar-ring">
                            <span className="radar-pulse" />
                            <FiActivity className="radar-icon" />
                        </div>
                        <span className="blueprint-tag">{event.stageCode || "STAGE ARCHIVE"}</span>
                        <span className="blueprint-attendees"><FiUsers /> {event.attendees}</span>
                    </div>

                    <div className="blueprint-center-matrix">
                        <div className="matrix-icon-housing">
                            <FiTerminal className="matrix-icon" />
                        </div>
                        <h4 className="matrix-title">{event.shortTitle || event.title}</h4>
                        <span className="matrix-subtitle">{event.organization}</span>

                        <div className="matrix-photo-slot-indicator">
                            <FiImage className="photo-slot-icon" />
                            <span>Photo Archive Slot Ready</span>
                        </div>
                    </div>

                    <div className="blueprint-footer-telemetry">
                        <span className="blueprint-coord">// LAT: IIT BHILAI · 21.1889° N, 81.2856° E</span>
                        <span className="blueprint-date">{event.period}</span>
                    </div>
                </div>
            )}

            {/* Quick Inspect Button Badge */}
            <button
                type="button"
                className="stage-media-inspect-badge"
                onClick={onInspect}
                aria-label="Inspect session details"
                title="Inspect session"
            >
                <FiMaximize2 />
            </button>
        </div>
    );
}

/* ── Event Inspection Modal ── */
function EventInspectModal({ event, onClose }) {
    useEffect(() => {
        if (!event) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [event, onClose]);

    return (
        <AnimatePresence>
            {event && (
                <motion.div
                    className="landscape-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Telemetry & Curriculum for ${event.title}`}
                    onClick={onClose}
                >
                    <motion.div
                        className="landscape-modal-panel glass-card"
                        initial={{ scale: 0.92, opacity: 0, y: 16 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <header className="landscape-modal-header">
                            <div className="landscape-modal-title-group">
                                <div className="landscape-modal-eyebrow">
                                    <span className="landscape-modal-cat-pill">{event.category}</span>
                                    <span className="landscape-modal-period"><FiCalendar /> {event.period}</span>
                                    <span className="landscape-modal-loc"><FiMapPin /> {event.location}</span>
                                </div>
                                <h3 className="landscape-modal-title">{event.title}</h3>
                                <div className="landscape-modal-org">{event.organization}</div>
                            </div>

                            <button
                                type="button"
                                className="landscape-modal-close-btn"
                                onClick={onClose}
                                aria-label="Close details"
                            >
                                <FiX />
                            </button>
                        </header>

                        {/* Modal Body */}
                        <div className="landscape-modal-body">
                            {/* Mission Briefing */}
                            <section className="landscape-modal-section">
                                <h4 className="landscape-modal-sec-title">
                                    <FiTerminal className="sec-icon" /> Mission & Architectural Scope
                                </h4>
                                <p className="landscape-modal-summary-text">{event.summary}</p>
                            </section>

                            {/* Telemetry Metrics */}
                            {event.metrics && event.metrics.length > 0 && (
                                <section className="landscape-modal-section">
                                    <h4 className="landscape-modal-sec-title">
                                        <FiActivity className="sec-icon" /> Verified Telemetry & Impact
                                    </h4>
                                    <div className="landscape-modal-metrics-grid">
                                        {event.metrics.map((m, idx) => (
                                            <div key={idx} className="modal-metric-card">
                                                <span className="modal-metric-val">{m.value}</span>
                                                <span className="modal-metric-lbl">{m.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Key Highlights */}
                            {event.highlights && event.highlights.length > 0 && (
                                <section className="landscape-modal-section">
                                    <h4 className="landscape-modal-sec-title">
                                        <FiCheckCircle className="sec-icon" /> Core Highlights & Engineering Deliverables
                                    </h4>
                                    <ul className="landscape-modal-highlights-list">
                                        {event.highlights.map((hl, idx) => (
                                            <li key={idx} className="modal-highlight-item">
                                                <span className="highlight-bullet">{idx + 1}</span>
                                                <span className="highlight-text">{hl}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Step Curriculum */}
                            {event.curriculum && event.curriculum.length > 0 && (
                                <section className="landscape-modal-section">
                                    <h4 className="landscape-modal-sec-title">
                                        <FiLayers className="sec-icon" /> Curriculum & Stage Breakdown
                                    </h4>
                                    <div className="landscape-modal-curriculum-flow">
                                        {event.curriculum.map((curr, idx) => (
                                            <div key={idx} className="modal-curriculum-node">
                                                <div className="curr-node-index">{curr.step}</div>
                                                <div className="curr-node-content">
                                                    <h5 className="curr-node-title">{curr.title}</h5>
                                                    <p className="curr-node-desc">{curr.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <footer className="landscape-modal-footer">
                            <div className="landscape-modal-tags">
                                {event.tags.map((tag, idx) => (
                                    <span key={idx} className="tag">{tag}</span>
                                ))}
                            </div>

                            {event.links && event.links.length > 0 && (
                                <div className="landscape-modal-actions">
                                    {event.links.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="glow-btn"
                                        >
                                            <span>{link.label}</span>
                                            <FiExternalLink />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </footer>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
