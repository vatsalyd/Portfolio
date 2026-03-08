import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBriefcase, FiBook } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { experience } from '../data/portfolioData';

function TimelineItem({ item, index, isLeft }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const isExp = item.type === 'experience';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 60px 1fr',
                gap: 0,
                marginBottom: 32,
                alignItems: 'start',
            }}
            className="timeline-item"
        >
            {/* Left content */}
            <div style={{
                textAlign: 'right',
                paddingRight: 24,
                ...(isLeft ? {} : { visibility: 'hidden' }),
            }}>
                {isLeft && <TimelineCard item={item} isExp={isExp} />}
            </div>

            {/* Center line with node */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
            }}>
                <motion.div
                    animate={isInView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: isExp ? 'rgba(0, 240, 255, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                        border: `2px solid ${isExp ? 'var(--accent-cyan)' : 'var(--accent-violet)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isExp ? 'var(--accent-cyan)' : 'var(--accent-violet)',
                        fontSize: '1rem',
                        zIndex: 2,
                        boxShadow: isInView ? (isExp ? 'var(--shadow-glow-cyan)' : 'var(--shadow-glow-violet)') : 'none',
                        transition: 'box-shadow 0.3s',
                    }}
                >
                    {isExp ? <FiBriefcase /> : <FiBook />}
                </motion.div>
                <div style={{
                    width: 2,
                    flex: 1,
                    background: 'linear-gradient(180deg, rgba(139,92,246,0.3), rgba(0,240,255,0.1))',
                    minHeight: 40,
                }} />
            </div>

            {/* Right content */}
            <div style={{
                paddingLeft: 24,
                ...(!isLeft ? {} : { visibility: 'hidden' }),
            }}>
                {!isLeft && <TimelineCard item={item} isExp={isExp} />}
            </div>
        </motion.div>
    );
}

function TimelineCard({ item, isExp }) {
    return (
        <div className="glass-card" style={{ padding: 24, textAlign: 'left' }}>
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: isExp ? 'var(--accent-cyan)' : 'var(--accent-violet)',
                letterSpacing: 1,
            }}>
                {item.period}
            </span>
            <h3 style={{ fontSize: '1.1rem', marginTop: 8, marginBottom: 4 }}>{item.title}</h3>
            <p style={{
                fontSize: '0.9rem',
                color: 'var(--accent-violet)',
                fontWeight: 500,
                marginBottom: 8,
            }}>
                {item.organization}
            </p>
            <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: 12,
            }}>
                {item.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {item.skills.map(s => (
                    <span key={s} className="tag" style={{
                        borderColor: isExp ? 'rgba(0,240,255,0.2)' : 'rgba(139,92,246,0.2)',
                        color: isExp ? 'var(--accent-cyan)' : 'var(--accent-violet)',
                        background: isExp ? 'rgba(0,240,255,0.1)' : 'rgba(139,92,246,0.1)',
                    }}>
                        {s}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function Experience() {
    return (
        <section id="experience" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Journey</span>
                        <h2 className="section-title">Experience & Education</h2>
                        <p className="section-subtitle">
                            My academic and professional journey so far
                        </p>
                    </div>
                </ScrollReveal>

                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    {experience.map((item, i) => (
                        <TimelineItem key={i} item={item} index={i} isLeft={i % 2 === 0} />
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .timeline-item {
            grid-template-columns: 44px 1fr !important;
            gap: 0 !important;
          }
          .timeline-item > div:first-child {
            display: none !important;
          }
          .timeline-item > div:nth-child(2) {
            order: -1;
          }
          .timeline-item > div:last-child {
            visibility: visible !important;
            padding-left: 16px !important;
          }
        }
      `}</style>
        </section>
    );
}
