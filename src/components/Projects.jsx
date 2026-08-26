import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    FiGithub,
    FiExternalLink,
    FiArrowLeft,
    FiArrowUpRight,
    FiLayers,
    FiActivity,
    FiChevronLeft,
    FiChevronRight,
    FiCpu,
    FiBarChart2,
    FiCode,
} from 'react-icons/fi';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { projects } from '../data/portfolioData';

/**
 * Projects — Center-focused Looping Splide Carousel with dynamic drag-scaling + Case Study.
 *
 * Carousel Specifications:
 *   - perPage: 3 (Desktop), 1 (Mobile <= 767px)
 *   - perMove: 1
 *   - type: 'loop'
 *   - focus: 'center'
 *   - Real-time continuous card scaling as cards are dragged / moved across the track
 *   - Custom .prev-splide & .next-splide controls
 *   - "DRAG" interactive cursor state
 */
const CATEGORIES = ['All', 'AI', 'ML', 'Dev'];

function accentFor(category) {
    return category === 'AI' ? 'violet'
        :  category === 'ML' ? 'cyan'
        :  'amber';
}

function iconForCategory(category) {
    return category === 'AI' ? FiCpu
        :  category === 'ML' ? FiBarChart2
        :  FiCode;
}

export default function Projects() {
    const [filter, setFilter] = useState('All');
    const [active, setActive] = useState(null); // project object when in case-study mode
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const splideRef = useRef(null);
    const splideInstance = useRef(null);
    const animFrameRef = useRef(null);
    const isDraggingRef = useRef(false);

    const filtered = useMemo(
        () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
        [filter],
    );

    // Continuous dynamic 3D convex arc card scaling based on distance to track center
    const updateCardScales = useCallback(() => {
        if (!splideRef.current) return;
        const track = splideRef.current.querySelector('.splide__track');
        if (!track) return;

        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;
        const maxDist = (trackRect.width / 2) || 450;

        const slides = splideRef.current.querySelectorAll('.splide__slide');
        slides.forEach((slide) => {
            const rect = slide.getBoundingClientRect();
            const slideCenter = rect.left + rect.width / 2;
            const diff = slideCenter - trackCenter; // negative for left, positive for right
            const norm = Math.min(Math.max(diff / maxDist, -1.2), 1.2);
            const absNorm = Math.abs(norm);
            const factor = Math.min(absNorm, 1);

            // 3D Convex calculation:
            // Center is pushed forward (translateZ: +25px), outer edges curve backwards into the scene (translateZ: down to -85px)
            const translateZ = 25 - (factor * 95);

            // Left slides tilt right (+Y), right slides tilt left (-Y) along the convex cylinder arc
            const rotateY = -norm * 22;

            // Dynamic scale: 1.06 at dead center down to 0.85 at outer edges
            const scale = 1.06 - (factor * 0.21);

            // Opacity: 1.0 at center down to 0.52 at outer edges
            const opacity = 1.0 - (factor * 0.48);

            const card = slide.querySelector('.project-slide-card');
            if (card) {
                card.style.transform = `perspective(1000px) translateZ(${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
                card.style.opacity = `${opacity.toFixed(3)}`;
            }
        });
    }, []);

    // RAF loop during active dragging for buttery-smooth scaling
    const startDragScaleLoop = useCallback(() => {
        const loop = () => {
            updateCardScales();
            if (isDraggingRef.current) {
                animFrameRef.current = requestAnimationFrame(loop);
            }
        };
        isDraggingRef.current = true;
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(loop);
    }, [updateCardScales]);

    const stopDragScaleLoop = useCallback(() => {
        isDraggingRef.current = false;
        cancelAnimationFrame(animFrameRef.current);
        // Run a few settled frames as momentum settles
        let settledFrames = 0;
        const settle = () => {
            updateCardScales();
            settledFrames++;
            if (settledFrames < 25) {
                requestAnimationFrame(settle);
            }
        };
        requestAnimationFrame(settle);
    }, [updateCardScales]);

    // Initialize and mount Splide slider
    useEffect(() => {
        if (!splideRef.current || filtered.length === 0) return;

        // Destroy previous instance
        if (splideInstance.current) {
            splideInstance.current.destroy(true);
            splideInstance.current = null;
        }

        const splide = new Splide(splideRef.current, {
            type: filtered.length > 2 ? 'loop' : 'slide',
            perPage: 3,
            perMove: 1,
            focus: 'center',
            gap: '24px',
            speed: 550,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            arrows: false,
            pagination: false,
            drag: true,
            dragMinThreshold: 6,
            flickPower: 600,
            flickMaxPages: 1,
            keyboard: 'focused',
            trimSpace: false,
            updateOnMove: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                    gap: '18px',
                    focus: 'center',
                },
                767: {
                    perPage: 1,
                    gap: '14px',
                    focus: 'center',
                },
            },
        });

        splide.on('mounted', () => {
            setActiveSlideIndex(splide.index);
            updateCardScales();
        });

        splide.on('move', () => {
            setActiveSlideIndex(splide.index);
            updateCardScales();
        });

        splide.on('moved', () => {
            setActiveSlideIndex(splide.index);
            updateCardScales();
        });

        splide.on('drag', () => {
            startDragScaleLoop();
        });

        splide.on('dragged', () => {
            stopDragScaleLoop();
        });

        splide.on('scroll', () => {
            updateCardScales();
        });

        splide.on('scrolled', () => {
            updateCardScales();
        });

        splide.on('resized', () => {
            updateCardScales();
        });

        splide.mount();
        splideInstance.current = splide;

        // Initial paint scale
        setTimeout(updateCardScales, 80);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            if (splideInstance.current) {
                splideInstance.current.destroy(true);
                splideInstance.current = null;
            }
        };
    }, [filtered, updateCardScales, startDragScaleLoop, stopDragScaleLoop]);

    const handlePrev = () => {
        if (splideInstance.current) {
            splideInstance.current.go('<');
        }
    };

    const handleNext = () => {
        if (splideInstance.current) {
            splideInstance.current.go('>');
        }
    };

    if (active) {
        return (
            <EditorialSection
                id="projects"
                ghost="WORK"
                eyebrowIndex="05"
                eyebrowLabel="WORK"
            >
                <ProjectCaseStudy
                    project={active}
                    onBack={() => {
                        setActive(null);
                        window.setTimeout(
                            () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                            60,
                        );
                    }}
                />
            </EditorialSection>
        );
    }

    return (
        <EditorialSection
            id="projects"
            ghost="WORK"
            eyebrowIndex="05"
            eyebrowLabel="WORK"
        >
            <div className="container projects-index">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Systems & Autonomous Agents</span>
                        <h2 className="section-title">Featured Engineering</h2>
                        <p className="section-subtitle">
                            Practical implementations across autonomous agent state machines, low-latency microservices, cloud infrastructure, and predictive ML.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Toolbar: Category Filters (Left) + Slider Controls (Right) */}
                <ScrollReveal delay={0.08}>
                    <div className="projects-toolbar">
                        <div className="projects-filter">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`projects-filter-chip ${filter === cat ? 'is-active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat}
                                    <span className="projects-filter-count">
                                        {cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="projects-slider-controls">
                            <span className="projects-slider-counter">
                                <span className="current-num">{String((activeSlideIndex % filtered.length) + 1).padStart(2, '0')}</span>
                                <span className="divider">/</span>
                                <span className="total-num">{String(filtered.length).padStart(2, '0')}</span>
                            </span>

                            <div className="projects-slider-nav">
                                <button
                                    type="button"
                                    className="prev-splide slider-nav-btn"
                                    onClick={handlePrev}
                                    aria-label="Previous project slide"
                                    title="Previous slide"
                                >
                                    <FiChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    className="next-splide slider-nav-btn"
                                    onClick={handleNext}
                                    aria-label="Next project slide"
                                    title="Next slide"
                                >
                                    <FiChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Splide Slider with "DRAG" Cursor Trigger */}
                <div className="projects-carousel-wrapper" data-cursor="drag">
                    <div ref={splideRef} className="splide projects-splide">
                        <div className="splide__track">
                            <ul className="splide__list">
                                {filtered.map((project, idx) => (
                                    <li
                                        key={project.title}
                                        className="splide__slide"
                                        onClick={() => {
                                            if (splideInstance.current && (activeSlideIndex % filtered.length) !== idx) {
                                                splideInstance.current.go(idx);
                                            }
                                        }}
                                    >
                                        <ProjectSlideCard
                                            project={project}
                                            index={idx + 1}
                                            onOpen={() => setActive(project)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Navigation Hint */}
                    <div className="projects-slider-hint">
                        <span>← Drag or use arrow keys to navigate projects →</span>
                    </div>
                </div>
            </div>
        </EditorialSection>
    );
}

/* ── Individual Project Slide Card ── */
function ProjectSlideCard({ project, index, onOpen }) {
    const accent = accentFor(project.category);
    const CategoryIcon = iconForCategory(project.category);

    return (
        <div className={`project-slide-card accent-${accent} ${project.featured ? 'is-featured' : ''}`}>
            {/* Card Header Strip */}
            <div className="project-card-header">
                <div className="project-card-badge-group">
                    <span className="project-category-badge">
                        <CategoryIcon className="category-icon" />
                        {project.category}
                    </span>
                    {project.featured && (
                        <span className="project-featured-pill">Featured</span>
                    )}
                </div>
                <span className="project-card-index">
                    {String(index).padStart(2, '0')}
                </span>
            </div>

            {/* Main Content Area */}
            <div className="project-card-body">
                <h3 className="project-card-title" onClick={onOpen}>
                    {project.title}
                </h3>
                {project.tagline && (
                    <p className="project-card-tagline">{project.tagline}</p>
                )}
                <p className="project-card-desc">{project.description}</p>
            </div>

            {/* Tags / Technologies Strip */}
            <div className="project-card-tags">
                {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="project-tag-pill">{tag}</span>
                ))}
                {project.tags.length > 4 && (
                    <span className="project-tag-pill more-tag">+{project.tags.length - 4}</span>
                )}
            </div>

            {/* Card Footer Actions */}
            <div className="project-card-footer">
                <button
                    type="button"
                    className="project-open-case-btn"
                    onClick={onOpen}
                >
                    <span>Case Study</span>
                    <FiArrowUpRight />
                </button>

                <div className="project-external-links">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-icon-link"
                            aria-label={`GitHub repository for ${project.title}`}
                            title="View Repository"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FiGithub />
                        </a>
                    )}
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-icon-link"
                            aria-label={`Live demo for ${project.title}`}
                            title="Live Demo"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FiExternalLink />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── In-Page Case Study Narrative View ── */
function ProjectCaseStudy({ project, onBack }) {
    const accent = accentFor(project.category);
    const cs = project.caseStudy;

    return (
        <motion.div
            className={`project-case accent-${accent}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Sticky back bar + section line */}
            <div className="project-case-bar">
                <button
                    type="button"
                    className="glow-btn-outline project-case-back"
                    onClick={onBack}
                >
                    <FiArrowLeft /> Back to all projects
                </button>
                <span className="project-case-stripe" />
            </div>

            {/* Header */}
            <header className="project-case-head">
                <span className="project-case-kicker">{project.category} Project · {project.featured ? 'Featured' : 'Lab'}</span>
                <h2 className="project-case-title">{project.title}</h2>
                {project.tagline && <p className="project-case-tagline">{project.tagline}</p>}
            </header>

            {/* Overview */}
            <section className="project-case-block">
                <h4 className="project-case-block-label"><FiLayers /> Overview</h4>
                <p className="project-case-prose">{project.description}</p>
            </section>

            {/* Problem */}
            {cs?.problem && (
                <section className="project-case-block">
                    <h4 className="project-case-block-label"><FiActivity /> Problem</h4>
                    <p className="project-case-prose">{cs.problem}</p>
                </section>
            )}

            {/* Process */}
            {cs?.process?.length > 0 && (
                <section className="project-case-block">
                    <h4 className="project-case-block-label">Process</h4>
                    <ol className="project-case-steps">
                        {cs.process.map((step, i) => (
                            <li key={i}>
                                <span className="project-case-step-num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="project-case-step-text">{step}</span>
                            </li>
                        ))}
                    </ol>
                </section>
            )}

            {/* Outcomes */}
            {cs?.outcomes?.length > 0 && (
                <section className="project-case-block">
                    <h4 className="project-case-block-label">Outcomes</h4>
                    <ul className="project-case-outcomes">
                        {cs.outcomes.map((o, i) => (
                            <li key={i}>
                                <span className="project-case-outcome-dot" />
                                <span>{o}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Architecture */}
            {cs?.architecture && (
                <section className="project-case-block">
                    <h4 className="project-case-block-label">Architecture</h4>
                    <pre className="project-case-arch">{cs.architecture}</pre>
                </section>
            )}

            {/* Tech stack */}
            <section className="project-case-block">
                <h4 className="project-case-block-label">Tech Stack</h4>
                <div className="project-case-tags">
                    {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </section>

            {/* Links */}
            <section className="project-case-block">
                <h4 className="project-case-block-label">Links</h4>
                <div className="project-case-links">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="glow-btn-outline">
                            <FiGithub /> Repository
                        </a>
                    )}
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="glow-btn">
                            <FiExternalLink /> Live Demo / Docs
                        </a>
                    )}
                </div>
            </section>
        </motion.div>
    );
}
