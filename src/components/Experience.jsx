import { motion } from 'framer-motion';
import { FiBriefcase, FiBook, FiMapPin, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { experience } from '../data/portfolioData';

export default function Experience() {
    return (
        <section id="experience" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Experience & Education</span>
                        <h2 className="section-title">Industry & Academic Track</h2>
                        <p className="section-subtitle">
                            Professional AI engineering internship, campus leadership, and academic milestones. Education entries are tinted cyan to tell them apart from work experience.
                        </p>
                    </div>
                </ScrollReveal>

                <div style={{ maxWidth: 840, margin: '0 auto', position: 'relative' }}>
                    {/* Vertical Timeline Line */}
                    <div style={{
                        position: 'absolute',
                        left: 28,
                        top: 24,
                        bottom: 24,
                        width: 2,
                        background: 'linear-gradient(180deg, var(--accent-violet), var(--accent-cyan), rgba(255,255,255,0.05))',
                        borderRadius: 1,
                    }} className="timeline-spine" />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        {experience.map((item, index) => {
                            const isExp = item.type === 'experience';
                            const iconColor = isExp ? 'var(--accent-violet)' : 'var(--accent-cyan)';
                            const badgeBg = isExp ? 'rgba(139, 92, 246, 0.1)' : 'rgba(6, 182, 212, 0.1)';

                            return (
                                <ScrollReveal key={index} delay={index * 0.1}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '56px 1fr',
                                        gap: 20,
                                        alignItems: 'flex-start',
                                    }}>
                                        {/* Timeline Node */}
                                        <div style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: '50%',
                                            background: '#0A0A0F',
                                            border: `2px solid ${iconColor}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: iconColor,
                                            fontSize: '1.25rem',
                                            zIndex: 2,
                                            boxShadow: `0 0 20px ${badgeBg}`,
                                            flexShrink: 0,
                                        }}>
                                            {isExp ? <FiBriefcase /> : <FiBook />}
                                        </div>

                                        {/* Experience Card */}
                                        <div className="glass-card" style={{ padding: 28 }}>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: 8,
                                                marginBottom: 10,
                                            }}>
                                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        fontFamily: 'var(--font-mono)',
                                                        fontSize: '0.75rem',
                                                        color: iconColor,
                                                        background: badgeBg,
                                                        padding: '4px 12px',
                                                        borderRadius: 'var(--border-radius-pill)',
                                                        border: `1px solid ${iconColor}30`,
                                                    }}>
                                                        <FiCalendar /> {item.period}
                                                    </span>
                                                    <span style={{
                                                        fontFamily: 'var(--font-mono)',
                                                        fontSize: '0.66rem',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: 1,
                                                        color: iconColor,
                                                        opacity: 0.85,
                                                        border: `1px solid ${iconColor}25`,
                                                        padding: '2px 8px',
                                                        borderRadius: 'var(--border-radius-pill)',
                                                        background: 'transparent',
                                                    }}>
                                                        {isExp ? 'Work' : 'Education'}
                                                    </span>
                                                </div>
                                                {item.location && (
                                                    <span style={{
                                                        fontFamily: 'var(--font-mono)',
                                                        fontSize: '0.75rem',
                                                        color: 'var(--text-muted)',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: 4,
                                                    }}>
                                                        <FiMapPin /> {item.location}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: 4 }}>
                                                {item.title}
                                            </h3>

                                            <div style={{
                                                fontSize: '0.95rem',
                                                color: 'var(--accent-cyan)',
                                                fontWeight: 600,
                                                marginBottom: 14,
                                                fontFamily: 'var(--font-display)',
                                            }}>
                                                {item.organization}
                                            </div>

                                            <p style={{
                                                fontSize: '0.92rem',
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.75,
                                                marginBottom: 18,
                                            }}>
                                                {item.description}
                                            </p>

                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                                {item.skills.map(s => (
                                                    <span key={s} className="tag" style={{
                                                        borderColor: `${iconColor}25`,
                                                        color: iconColor,
                                                        background: `${iconColor}10`,
                                                    }}>
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 640px) {
          .timeline-spine {
            left: 20px !important;
          }
        }
      `}</style>
        </section>
    );
}
