import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiBriefcase,
    FiBook,
    FiMapPin,
    FiCalendar,
    FiX,
    FiArrowUpRight,
} from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { experience } from '../data/portfolioData';

/**
 * Experience — vertical timeline of professional and academic entries, each
 * with an optional "Work Done" tab that opens a popup listing the tangible
 * deliverables for that role.
 *
 * The timeline is preserved from the original design: a vertical spine with
 * accent-coloured nodes (violet for experience, cyan for education). On
 * any entry that exposes a `workDone` array, a "Work Done · N items" tab
 * sits at the bottom of the card; clicking it opens a centered popup
 * listing every deliverable under a hairline index header.
 */
export default function Experience() {
    const [activeItem, setActiveItem] = useState(null);

    const openItem = useCallback((item) => setActiveItem(item), []);
    const closeItem = useCallback(() => setActiveItem(null), []);

    return (
        <EditorialSection
            id="experience"
            ghost="EXPERIENCE"
            eyebrowIndex="05"
            eyebrowLabel="EXPERIENCE"
        >
            <div className="container experience-container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Experience · Education</span>
                        <h2 className="section-title">Industry & Academic Track</h2>
                        <p className="section-subtitle">
                            Professional AI engineering work, campus leadership, and academic milestones. Entries with a Work Done tab open a popup listing what was actually shipped.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="timeline">
                    {/* Spine */}
                    <div className="timeline-spine" aria-hidden="true" />

                    <div className="timeline-rows">
                        {experience.map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <TimelineRow item={item} onOpen={() => openItem(item)} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>

            <WorkDonePopup item={activeItem} onClose={closeItem} />
        </EditorialSection>
    );
}

/* ── One timeline row ── */
function TimelineRow({ item, onOpen }) {
    const isExp = item.type === 'experience';
    const work = item.workDone || [];

    return (
        <article className={`timeline-row ${isExp ? 'is-work' : 'is-edu'} ${work.length ? 'has-work' : ''}`}>
            <span className="timeline-node" aria-hidden="true">
                {isExp ? <FiBriefcase /> : <FiBook />}
            </span>

            <div className="timeline-card glass-card">
                <header className="timeline-card-head">
                    <div className="timeline-card-eyebrow">
                        <span className="timeline-period"><FiCalendar /> {item.period}</span>
                        <span className="timeline-type">{isExp ? 'Work' : 'Education'}</span>
                    </div>
                    {item.location && (
                        <span className="timeline-location"><FiMapPin /> {item.location}</span>
                    )}
                </header>

                <h3 className="timeline-card-title">{item.title}</h3>
                <div className="timeline-card-org">{item.organization}</div>

                <p className="timeline-card-desc">{item.description}</p>

                <div className="timeline-card-skills">
                    {item.skills.map((s) => (
                        <span key={s} className="tag">{s}</span>
                    ))}
                </div>

                {work.length > 0 && (
                    <button
                        type="button"
                        className="timeline-work-tab"
                        onClick={onOpen}
                        aria-haspopup="dialog"
                    >
                        <span className="timeline-work-tab-label">Work Done</span>
                        <span className="timeline-work-tab-count">{work.length}</span>
                        <FiArrowUpRight className="timeline-work-tab-icon" />
                    </button>
                )}
            </div>
        </article>
    );
}

/* ── Work-done popup ── */
function WorkDonePopup({ item, onClose }) {
    useEffect(() => {
        if (!item) return;
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [item, onClose]);

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    className="work-done-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Work done at ${item.organization}`}
                    onClick={onClose}
                >
                    <motion.div
                        className="work-done-panel"
                        initial={{ scale: 0.85, opacity: 0, y: 18 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 12 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="work-done-head">
                            <div>
                                <span className="work-done-kicker">{item.type === 'experience' ? 'Work' : 'Academic'} · {item.period}</span>
                                <h3 className="work-done-title">{item.title}</h3>
                                <p className="work-done-org">{item.organization}</p>
                            </div>
                            <button
                                type="button"
                                className="work-done-close"
                                onClick={onClose}
                                aria-label="Close work done"
                            >
                                <FiX />
                            </button>
                        </header>

                        <ol className="work-done-list">
                            {item.workDone?.map((w, i) => (
                                <li key={i} className="work-done-item">
                                    <span className="work-done-item-num">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="work-done-item-body">
                                        <div className="work-done-item-label">{w.label}</div>
                                        <div className="work-done-item-text">{w.body}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <footer className="work-done-foot">
                            {item.skills.map((s) => (
                                <span key={s} className="tag">{s}</span>
                            ))}
                        </footer>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
