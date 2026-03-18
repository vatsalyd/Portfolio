import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { skillCategories } from '../data/portfolioData';

function CapabilityStat({ label, value, accent }) {
    return (
        <div style={{
            padding: '14px 16px',
            borderRadius: 'var(--border-radius-sm)',
            border: 'var(--border-glass)',
            background: 'var(--bg-glass)',
            textAlign: 'center',
        }}>
            <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: accent,
                marginBottom: 4,
            }}>
                {value}
            </div>
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: 1.3,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
            }}>
                {label}
            </div>
        </div>
    );
}

function CategoryRailItem({ category, isActive, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
            style={{
                width: '100%',
                textAlign: 'left',
                borderRadius: 10,
                border: isActive ? `1px solid ${category.accent}66` : '1px solid rgba(255,255,255,0.06)',
                background: isActive ? 'rgba(195,17,12,0.08)' : 'rgba(255,255,255,0.01)',
                padding: '14px 14px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {isActive && (
                <motion.div
                    layoutId="active-skill-category"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 10,
                        boxShadow: `inset 0 0 0 1px ${category.accent}44, 0 0 20px rgba(195,17,12,0.12)`,
                    }}
                />
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: isActive ? category.accent : 'var(--text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: 0.7,
                    }}>
                        {category.name}
                    </span>
                    <span style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 999,
                        padding: '2px 8px',
                    }}>
                        {category.skills.length}
                    </span>
                </div>
                <p style={{
                    marginTop: 7,
                    fontSize: '0.73rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                }}>
                    {category.subtitle}
                </p>
            </div>
        </motion.button>
    );
}

function SkillCard({ skill, index }) {
    const Icon = skill.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            style={{
                borderRadius: 12,
                border: '1px solid rgba(195,17,12,0.14)',
                background: 'rgba(10,2,1,0.55)',
                padding: '14px 14px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <motion.div
                animate={{ x: ['-120%', '150%'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', delay: index * 0.08 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: 48,
                    background: 'linear-gradient(90deg, transparent, rgba(195,17,12,0.12), transparent)',
                    pointerEvents: 'none',
                }}
            />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                marginBottom: 10,
                position: 'relative',
                zIndex: 1,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <div style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${skill.color}18`,
                        border: `1px solid ${skill.color}50`,
                        color: skill.color,
                        flexShrink: 0,
                    }}>
                        <Icon style={{ fontSize: '1rem' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{
                            fontSize: '0.86rem',
                            color: 'var(--text-primary)',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            {skill.name}
                        </div>
                    </div>
                </div>

                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: skill.color,
                    flexShrink: 0,
                }}>
                    {skill.level}%
                </span>
            </div>

            <div style={{
                width: '100%',
                height: 5,
                borderRadius: 999,
                background: 'rgba(255,255,255,0.06)',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 1,
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.06 + 0.12 }}
                    style={{
                        height: '100%',
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}AA)`,
                        boxShadow: `0 0 10px ${skill.color}55`,
                    }}
                />
            </div>

            {skill.evidence && (
                <div style={{
                    marginTop: 10,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: 0.6,
                    position: 'relative',
                    zIndex: 1,
                }}>
                    Based on: <span style={{ color: 'var(--text-secondary)' }}>{skill.evidence}</span>
                </div>
            )}
        </motion.div>
    );
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState(0);
    const active = skillCategories[activeCategory];

    const summary = useMemo(() => {
        const all = skillCategories.flatMap((cat) => cat.skills);
        const avg = Math.round(all.reduce((sum, item) => sum + item.level, 0) / all.length);
        const highest = all.reduce((best, item) => item.level > best.level ? item : best, all[0]);
        return {
            total: all.length,
            avg,
            top: highest.name,
            tracks: skillCategories.length,
        };
    }, []);

    return (
        <section id="skills" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Skills Matrix</span>
                        <h2 className="section-title">AI Engineering Capabilities</h2>
                        <p className="section-subtitle">
                            Mapped from GitHub projects and tuned for Gen AI, Data Science, and production ML roles
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.08}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                        gap: 12,
                        maxWidth: 900,
                        margin: '0 auto 28px',
                    }} className="skills-summary-grid">
                        <CapabilityStat label="Total Skills" value={summary.total} accent="#C3110C" />
                        <CapabilityStat label="Avg Proficiency" value={`${summary.avg}%`} accent="#E6501B" />
                        <CapabilityStat label="Skill Tracks" value={summary.tracks} accent="#B8C0CC" />
                        <CapabilityStat label="Top Strength" value={summary.top} accent="#FF7A4A" />
                    </div>
                </ScrollReveal>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '300px 1fr',
                    gap: 18,
                    alignItems: 'start',
                }} className="skills-layout">
                    <ScrollReveal delay={0.12} variant="fadeLeft">
                        <div style={{
                            border: '1px solid rgba(195,17,12,0.12)',
                            borderRadius: 12,
                            background: 'rgba(8,2,1,0.5)',
                            padding: 12,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                        }}>
                            {skillCategories.map((category, index) => (
                                <CategoryRailItem
                                    key={category.name}
                                    category={category}
                                    isActive={index === activeCategory}
                                    onClick={() => setActiveCategory(index)}
                                />
                            ))}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15} variant="fadeRight">
                        <div style={{
                            borderRadius: 14,
                            border: '1px solid rgba(195,17,12,0.16)',
                            background: 'rgba(10, 2, 1, 0.65)',
                            padding: 18,
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <motion.div
                                key={active.name}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.28 }}
                                style={{ marginBottom: 16, position: 'relative', zIndex: 2 }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    marginBottom: 6,
                                }}>
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5], scale: [0.92, 1.2, 0.92] }}
                                        transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            background: active.accent,
                                            boxShadow: `0 0 12px ${active.accent}`,
                                        }}
                                    />
                                    <h3 style={{
                                        fontSize: '1rem',
                                        margin: 0,
                                        color: active.accent,
                                        letterSpacing: 0.8,
                                    }}>
                                        {active.name}
                                    </h3>
                                </div>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.84rem',
                                }}>
                                    {active.subtitle}
                                </p>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                        gap: 10,
                                        position: 'relative',
                                        zIndex: 2,
                                    }}
                                    className="skills-grid-cards"
                                >
                                    {active.skills.map((skill, index) => (
                                        <SkillCard key={skill.name} skill={skill} index={index} />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <style>{`
                @media (max-width: 980px) {
                    .skills-layout {
                        grid-template-columns: 1fr !important;
                    }
                }

                @media (max-width: 768px) {
                    .skills-summary-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }

                    .skills-grid-cards {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
