import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { projects } from '../data/portfolioData';

const categories = ['All', 'AI', 'ML', 'DL'];

function ProjectCard({ project, index, onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="project-card glass-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                transform: hovered ? 'perspective(1000px) rotateY(2deg) rotateX(-2deg)' : 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: hovered ? 'var(--shadow-glow-green)' : 'var(--shadow-card)',
            }}
        >
            {/* Gradient top bar */}
            <div style={{
                height: 4,
                background: 'var(--gradient-main)',
                backgroundSize: '200% 200%',
                animation: hovered ? 'gradient-shift 2s ease infinite' : 'none',
            }} />

            {/* Featured badge */}
            {project.featured && (
                <div style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    padding: '4px 10px',
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: '#fff',
                    background: 'var(--gradient-warm)',
                    borderRadius: 20,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    zIndex: 2,
                }}>
                    ★ Featured
                </div>
            )}

            <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>{project.title}</h3>
                <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                    marginBottom: 16,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    {project.github && (
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)',
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
                            whileHover={{ scale: 1.1 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: '0.85rem',
                                color: 'var(--accent-primary)',
                            }}
                        >
                            <FiExternalLink /> Live Demo
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
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                backdropFilter: 'blur(8px)',
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card"
                style={{
                    maxWidth: 600,
                    width: '100%',
                    padding: 32,
                    position: 'relative',
                    maxHeight: '80vh',
                    overflow: 'auto',
                }}
            >
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '1.3rem',
                        cursor: 'pointer',
                    }}
                >
                    <FiX />
                </motion.button>

                <div style={{ height: 4, background: 'var(--gradient-main)', borderRadius: 2, marginBottom: 24 }} />
                <h2 style={{ fontSize: '1.5rem', marginBottom: 12 }}>{project.title}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
                    {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                    {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: 16 }}>
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="glow-btn-outline" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                            <FiGithub /> View Code
                        </a>
                    )}
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="glow-btn" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                            <FiExternalLink /> Live Demo
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
                        <h2 className="section-title">Featured Projects</h2>
                        <p className="section-subtitle">
                            A selection of my data science and AI projects
                        </p>
                    </div>
                </ScrollReveal>

                {/* Filter Buttons */}
                <ScrollReveal delay={0.1}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 8,
                        marginBottom: 48,
                        flexWrap: 'wrap',
                    }}>
                        {categories.map(cat => (
                            <motion.button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: 50,
                                    border: filter === cat ? 'none' : 'var(--border-glass)',
                                    fontFamily: 'var(--font-primary)',
                                    fontWeight: 500,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    background: filter === cat ? 'var(--gradient-main)' : 'transparent',
                                    color: filter === cat ? '#fff' : 'var(--text-secondary)',
                                    transition: 'all 0.3s',
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
                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
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

                {/* Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                    )}
                </AnimatePresence>
            </div>

            <style>{`
        @media (max-width: 768px) {
          #projects .container > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
