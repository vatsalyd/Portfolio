import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState(0);
    const active = skillCategories[activeCategory];

    return (
        <section id="skills" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Tech Stack</span>
                        <h2 className="section-title">Capabilities & Tools</h2>
                        <p className="section-subtitle">
                            Core technical competencies across AI engineering, machine learning, cloud deployment, and data science
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Navigation Tabs */}
                <ScrollReveal delay={0.1}>
                    <div style={{
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'center',
                        marginBottom: 40,
                        flexWrap: 'wrap',
                    }}>
                        {skillCategories.map((cat, idx) => {
                            const Icon = cat.icon;
                            const isActive = idx === activeCategory;
                            return (
                                <motion.button
                                    key={cat.name}
                                    onClick={() => setActiveCategory(idx)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '10px 20px',
                                        borderRadius: 'var(--border-radius-pill)',
                                        border: isActive
                                            ? '1px solid rgba(139, 92, 246, 0.4)'
                                            : '1px solid rgba(255, 255, 255, 0.06)',
                                        background: isActive
                                            ? 'var(--gradient-subtle)'
                                            : 'rgba(22, 22, 34, 0.4)',
                                        color: isActive ? '#fff' : 'var(--text-secondary)',
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '0.86rem',
                                        fontWeight: isActive ? 600 : 500,
                                        cursor: 'pointer',
                                        boxShadow: isActive ? '0 0 20px rgba(139, 92, 246, 0.15)' : 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <Icon style={{ color: isActive ? 'var(--accent-violet)' : 'var(--text-muted)' }} />
                                    {cat.name}
                                </motion.button>
                            );
                        })}
                    </div>
                </ScrollReveal>

                {/* Selected Category Content Box */}
                <ScrollReveal delay={0.2}>
                    <div className="glass-card" style={{ padding: 36, position: 'relative' }}>
                        <div style={{ marginBottom: 28 }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                color: 'var(--text-heading)',
                                marginBottom: 6,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                            }}>
                                <span style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: 'var(--accent-cyan)',
                                    boxShadow: '0 0 10px var(--accent-cyan)',
                                }} />
                                {active.name}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                {active.subtitle}
                            </p>
                        </div>

                        {/* Skill Cards Grid */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.name}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                    gap: 16,
                                }}
                            >
                                {active.skills.map((skill, index) => {
                                    const SkillIcon = skill.icon;
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.04 }}
                                            whileHover={{ y: -3, borderColor: 'rgba(139, 92, 246, 0.3)' }}
                                            style={{
                                                padding: '16px 18px',
                                                borderRadius: 'var(--border-radius-sm)',
                                                background: 'rgba(10, 10, 15, 0.5)',
                                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 14,
                                                transition: 'all 0.25s ease',
                                            }}
                                        >
                                            <div style={{
                                                width: 38,
                                                height: 38,
                                                borderRadius: 10,
                                                background: 'rgba(139, 92, 246, 0.08)',
                                                border: '1px solid rgba(139, 92, 246, 0.18)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--accent-violet)',
                                                flexShrink: 0,
                                                fontSize: '1.1rem',
                                            }}>
                                                <SkillIcon />
                                            </div>
                                            <div>
                                                <div style={{
                                                    fontFamily: 'var(--font-display)',
                                                    fontSize: '0.92rem',
                                                    fontWeight: 600,
                                                    color: 'var(--text-primary)',
                                                    marginBottom: 2,
                                                }}>
                                                    {skill.name}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.68rem',
                                                    color: 'var(--accent-cyan)',
                                                    letterSpacing: 0.3,
                                                }}>
                                                    {skill.tag}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
