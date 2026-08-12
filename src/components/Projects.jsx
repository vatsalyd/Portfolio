import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiLayers, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { projects } from '../data/portfolioData';

const categories = ['All', 'AI', 'ML', 'Dev'];

function ProjectCard({ project, index, onClick }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className="glass-card"
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
            <div style={{
                height: 3,
                background: project.featured ? 'var(--gradient-aurora-wide)' : 'var(--gradient-subtle)',
                transition: 'all 0.3s ease',
            }} />

            <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
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

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                    {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: 14, marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.82rem',
                        color: 'var(--accent-violet)',
                        fontFamily: 'var(--font-mono)',
                    }}>
                        <FiLayers /> View details
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ProjectDetail({ project, onBack }) {
    // Build a simple text-based "architecture diagram"
    const arch = buildArchDiagram(project);

    const bullets = buildProjectBullets(project);

    return (
        <motion.div
            className="project-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
            <button
                onClick={onBack}
                className="glow-btn-outline"
                style={{ marginBottom: 24, padding: '8px 18px', fontSize: '0.82rem' }}
            >
                <FiArrowLeft /> Back to Projects
            </button>

            <div className="glass-card" style={{ padding: 36 }}>
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
                    <FiLayers /> {project.category} Project
                </div>

                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 16, color: '#fff' }}>
                    {project.title}
                </h2>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28, fontSize: '0.98rem' }}>
                    {project.description}
                </p>

                {/* Bullet highlights */}
                {bullets.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {bullets.map((b, i) => (
                            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                                <FiCheckCircle style={{ color: 'var(--accent-violet)', marginTop: 4, flexShrink: 0 }} />
                                <span style={{ lineHeight: 1.6 }}>{b}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Tech stack breakdown */}
                <div style={{ marginBottom: 28 }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        color: 'var(--accent-cyan)',
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                        marginBottom: 12,
                    }}>
                        Tech Stack
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {project.tags.map(tag => (
                            <span key={tag} className="tag" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Architecture diagram (text-based, ASCII-ish) */}
                {arch && (
                    <div style={{ marginBottom: 28 }}>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.74rem',
                            color: 'var(--accent-cyan)',
                            textTransform: 'uppercase',
                            letterSpacing: 1.5,
                            marginBottom: 12,
                        }}>
                            Architecture
                        </div>
                        <pre className="project-detail-arch">{arch}</pre>
                    </div>
                )}

                {/* Action links */}
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
            </div>
        </motion.div>
    );
}

function buildProjectBullets(project) {
    // Derive bullets from description tags + known projects
    const tagBullets = {
        'LangGraph': 'State machines across multiple agents with explicit handoffs',
        'Llama-3.3-70b': 'LLM served via Groq for low-latency inference',
        'ChromaDB': 'Semantic vector search with Sentence-Transformers embeddings',
        'SSE': 'Server-Sent Events for real-time streaming responses',
        'XGBoost': 'Gradient-boosted model trained on 10 custom feature metrics',
        'Sentence-BERT': 'Fine-tuned dual-encoder for resume-JD semantic matching',
        'AWS EC2': 'Production deployment on AWS EC2 (t3.small) via Docker',
        'ReAct': 'Autonomous Thought → Action → Observation loop',
    };
    const seen = new Set();
    const bullets = [];
    project.tags.forEach((t) => {
        if (tagBullets[t] && !seen.has(t)) {
            seen.add(t);
            bullets.push(tagBullets[t]);
        }
    });
    if (project.featured) bullets.push('Featured project — shipped and documented.');
    return bullets.slice(0, 6);
}

function buildArchDiagram(project) {
    const lines = [];
    lines.push('┌────────────┐    ┌────────────────────┐    ┌──────────────┐');
    lines.push('│   Input    │ →  │   Processing Core  │ →  │   Response   │');
    lines.push('│  (client)  │    │   (agent pipeline) │    │  (streaming) │');
    lines.push('└────────────┘    └────────────────────┘    └──────────────┘');
    if (project.tags.includes('ChromaDB')) {
        lines.push('                          ↑');
        lines.push('                  ┌───────────────┐');
        lines.push('                  │   ChromaDB    │  ← semantic recall');
        lines.push('                  └───────────────┘');
    }
    if (project.tags.includes('Docker') || project.tags.includes('AWS EC2')) {
        lines.push('                     [ Docker container → AWS EC2 ]');
    }
    return lines.join('\n');
}

export default function Projects() {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="section">
            <div className="container">
                {selectedProject ? (
                    <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
                ) : (
                    <>
                        <ScrollReveal>
                            <div className="section-header">
                                <span className="section-label">// Portfolio</span>
                                <h2 className="section-title">Featured Engineering</h2>
                                <p className="section-subtitle">
                                    Architected systems across multi-agent orchestration, RAG pipelines, ML classifiers, and real-time microservices. Click any card to open the detail page.
                                </p>
                            </div>
                        </ScrollReveal>

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
                                        onClick={() => {
                                            setSelectedProject(project);
                                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
}
