import { useState, useMemo, useEffect, useCallback } from 'react';
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
    FiCheckCircle,
} from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import {
    landscapeEvents,
    landscapeStats,
    landscapeCategories,
} from '../data/portfolioData';

/**
 * LandscapeSessions — Creative showcase of conducted workshops, hackathons,
 * open-source sprints, and campus technical drives.
 *
 * Features:
 *   - Telemetry metric meters and audience reach counters
 *   - Dynamic category filtering across Hackathons, Workshops, Sprints & Outreach
 *   - Interactive mission ground cards with role chips & telemetry stats
 *   - Comprehensive inspection modal with curriculum breakdown & deliverables
 */
export default function LandscapeSessions() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeEvent, setActiveEvent] = useState(null);

    const openEvent = useCallback((event) => setActiveEvent(event), []);
    const closeEvent = useCallback(() => setActiveEvent(null), []);

    // Filter events by selected category
    const filteredEvents = useMemo(() => {
        if (selectedCategory === 'all') return landscapeEvents;
        return landscapeEvents.filter((ev) => ev.category === selectedCategory);
    }, [selectedCategory]);

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
                        <span className="section-label">// Event Grounds · Sessions & Workshops</span>
                        <h2 className="section-title">Technical Arena & Community Sprints</h2>
                        <p className="section-subtitle">
                            Hands-on AI agent labs, deep learning workshops, hackathon tracks, and developer sprints conducted at IIT Bhilai and across the open-source ecosystem.
                        </p>
                    </div>
                </ScrollReveal>

                {/* ── Telemetry Summary Banner ── */}
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

                {/* ── Category Filter Bar ── */}
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

                {/* ── Event Grounds Grid ── */}
                <div className="landscape-grid">
                    {filteredEvents.map((event, i) => (
                        <ScrollReveal key={event.id} delay={i * 0.08}>
                            <LandscapeEventCard
                                event={event}
                                onInspect={() => openEvent(event)}
                            />
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ── Detailed Telemetry & Curriculum Modal ── */}
            <EventInspectModal
                event={activeEvent}
                onClose={closeEvent}
            />
        </EditorialSection>
    );
}

/* ── One Landscape Event Card ── */
function LandscapeEventCard({ event, onInspect }) {
    const isFeatured = event.featured;

    return (
        <article className={`landscape-card glass-card ${isFeatured ? 'is-featured' : ''}`}>
            {/* Top Eyebrow Header */}
            <header className="landscape-card-header">
                <div className="landscape-card-meta">
                    <span className="landscape-meta-item">
                        <FiCalendar className="meta-icon" /> {event.period}
                    </span>
                    <span className="landscape-meta-item">
                        <FiMapPin className="meta-icon" /> {event.location}
                    </span>
                </div>
                <div className="landscape-attendee-badge">
                    <FiUsers className="attendee-icon" />
                    <span>{event.attendees}</span>
                </div>
            </header>

            {/* Role Chip */}
            <div className="landscape-role-strip">
                <span className="landscape-role-badge">
                    <FiAward className="role-icon" /> {event.role}
                </span>
            </div>

            {/* Event Title & Org */}
            <div className="landscape-card-heading-group">
                <h3 className="landscape-card-title">{event.title}</h3>
                <div className="landscape-card-org">{event.organization}</div>
            </div>

            {/* Tagline / Mission briefing */}
            <p className="landscape-card-tagline">{event.tagline}</p>

            {/* Mini Telemetry Metrics Row */}
            {event.metrics && event.metrics.length > 0 && (
                <div className="landscape-metrics-row">
                    {event.metrics.map((m, idx) => (
                        <div key={idx} className="landscape-metric-cell">
                            <span className="metric-cell-val">{m.value}</span>
                            <span className="metric-cell-lbl">{m.label}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Topic Tags */}
            <div className="landscape-card-tags">
                {event.tags.slice(0, 4).map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                ))}
            </div>

            {/* Action Footer */}
            <footer className="landscape-card-footer">
                <button
                    type="button"
                    className="landscape-inspect-btn"
                    onClick={onInspect}
                    aria-label={`Inspect telemetry and curriculum for ${event.title}`}
                >
                    <span className="inspect-btn-label">Inspect Session</span>
                    <FiMaximize2 className="inspect-btn-icon" />
                </button>

                {event.links && event.links.length > 0 && (
                    <div className="landscape-footer-links">
                        {event.links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="landscape-ext-link"
                                aria-label={link.label}
                                title={link.label}
                            >
                                <span className="ext-link-text">{link.label}</span>
                                <FiArrowUpRight className="ext-link-icon" />
                            </a>
                        ))}
                    </div>
                )}
            </footer>
        </article>
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
