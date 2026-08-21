import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiGithub,
    FiExternalLink,
    FiArrowLeft,
    FiArrowUpRight,
    FiLayers,
    FiActivity,
} from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { projects } from '../data/portfolioData';

/**
 * Projects — editorial index + in-page case study.
 *
 * Two views, both rendered inside the same section:
 *
 *   1. The Index (default) — an editorial table-of-contents grid. Each row
 *      reads like a magazine entry: oversized index numeral, category
 *      kicker, the project's headline, its one-line tagline, then a
 *      "Read case study →" CTA. Selecting a row transitions to:
 *
 *   2. The Case Study — a single-column narrative for the chosen project
 *      with Problem / Process / Outcomes / Architecture / Tech / Links
 *      blocks. A sticky top bar keeps the Back action pinned.
 *
 * Both views are intentionally in-page (not modals) so the reader's scroll
 * position and history stay on the same section.
 */
const CATEGORIES = ['All', 'AI', 'ML', 'Dev'];

// Map a project's category to an accent colour reused everywhere.
function accentFor(category) {
    return category === 'AI' ? 'violet'
        :  category === 'ML' ? 'cyan'
        :  'amber';
}

export default function Projects() {
    const [filter, setFilter] = useState('All');
    const [active, setActive] = useState(null); // project object when in case-study mode

    const filtered = useMemo(
        () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
        [filter],
    );

    if (active) {
        return (
            <EditorialSection
                id="projects"
                ghost="WORK"
                eyebrowIndex="04"
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
            eyebrowIndex="04"
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

                {/* Filter strip */}
                <ScrollReveal delay={0.08}>
                    <div className="projects-filter">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={`projects-filter-chip ${filter === cat ? 'is-active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Editorial index rows */}
                <div className="projects-rows">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, i) => (
                            <ProjectRow
                                key={p.title}
                                project={p}
                                index={i + 1}
                                onOpen={() => setActive(p)}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </EditorialSection>
    );
}

/* ── One editorial row ── */
function ProjectRow({ project, index, onOpen }) {
    const accent = accentFor(project.category);
    return (
        <motion.button
            type="button"
            className={`project-row accent-${accent} ${project.featured ? 'is-featured' : ''}`}
            onClick={onOpen}
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
            aria-label={`Open case study: ${project.title}`}
        >
            <span className="project-row-index">{String(index).padStart(2, '0')}</span>
            <span className="project-row-meta">
                <span className="project-row-kicker">{project.category} · {project.tags.slice(0, 2).join(' · ')}</span>
            </span>
            <span className="project-row-titles">
                <span className="project-row-title">{project.title}</span>
                <span className="project-row-tagline">{project.tagline}</span>
            </span>
            <span className="project-row-cta">
                <FiArrowUpRight />
                <span className="project-row-cta-label">Read case study</span>
            </span>
        </motion.button>
    );
}

/* ── Case study detail view ── */
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
