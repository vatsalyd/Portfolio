import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiStar, FiLayers } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { projects } from '../data/portfolioData';

const categories = ['All', 'AI', 'ML', 'Dev'];

function ProjectCard({ project, index, onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className="glass-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
            }}
        >
            {/* Top Aurora Shimmer Line */}
            <div style={{
                height: 3,
                background: project.featured ? 'var(--gradient-aurora-wide)' : 'var(--gradient-subtle)',
                transition: 'all 0.3s ease',
            }} />

            <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                    <h3 style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-heading)',
                        fontWeight: 700,
                        lineHeight: 1.3,
                    }}>
                        {project.title}
                    </h3>
                    {project.featured && (
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            padding: '3px 9px',
                            fontSize: '0.65rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--accent-amber)',
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.25)',
                            borderRadius: 'var(--border-radius-pill)',
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            flexShrink: 0,
                        }}>
                            <FiStar style={{ fontSize: '0.7rem' }} /> Featured
                        </span>
                    )}
                </div>

                {/* Description */}
                <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: 20,
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {project.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                    {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

                {/* Footer Action Links */}
                <div style={{ display: 'flex', gap: 14, marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    {project.github && (
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: '0.82rem',
                                color: 'var(--text-secondary)',
                                fontFamily: 'var(--font-mono)',
                                textDecoration: 'none',
                            }}
                        >
                            <FiGithub /> Code
                        </motion.a>
                    )}
                    {project.live && (
                        <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: '0.82rem',
                                color: 'var(--accent-cyan)',
                                fontFamily: 'var(--font-mono)',
                                textDecoration: 'none',
                            }}
                        >
                            <FiExternalLink /> Live API / Demo
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function ProjectModal({ project, onClose }) {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(5, 5, 10, 0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
            }}
        >
            <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card"
                style={{
                    maxWidth: 640,
                    width: '100%',
                    padding: 36,
                    position: 'relative',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        width: 34,
                        height: 34,
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        transition: 'all 0.2s',
                    }}
                >
                    <FiX />
                </button>

                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent-cyan)',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginBottom: 10,
                }}>
                    <FiLayers /> {project.category} Project Architecture
                </div>

                <h2 style={{ fontSize: '1.6rem', marginBottom: 16, color: '#fff' }}>
                    {project.title}
                </h2>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24, fontSize: '0.98rem' }}>
                    {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                    {project.tags.map(tag => (
                        <span key={tag} className="tag" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>{tag}</span>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="glow-btn-outline" style={{ padding: '11px 22px' }}>
                            <FiGithub /> View Repository
                        </a>
                    )}
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="glow-btn" style={{ padding: '11px 22px' }}>
                            <FiExternalLink /> Open Live Demo / Docs
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Portfolio</span>
                        <h2 className="section-title">Featured Engineering</h2>
                        <p className="section-subtitle">
                            Architected systems across multi-agent orchestration, RAG pipelines, ML classifiers, and real-time microservices
                        </p>
                    </div>
                </ScrollReveal>

                {/* Filter Buttons */}
                <ScrollReveal delay={0.1}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 10,
                        marginBottom: 44,
                        flexWrap: 'wrap',
                    }}>
                        {categories.map(cat => (
                            <motion.button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: '8px 22px',
                                    borderRadius: 'var(--border-radius-pill)',
                                    border: filter === cat ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: filter === cat ? 600 : 500,
                                    fontSize: '0.86rem',
                                    cursor: 'pointer',
                                    background: filter === cat ? 'var(--gradient-subtle)' : 'rgba(22, 22, 34, 0.4)',
                                    color: filter === cat ? '#fff' : 'var(--text-secondary)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Projects Grid */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
                        gap: 24,
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={i}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Project Modal Detail */}
                <AnimatePresence>
                    {selectedProject && (
                        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
