import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiBook, FiAward, FiMapPin, FiBriefcase, FiCpu, FiCode } from 'react-icons/fi';
import { TbRobot, TbBrain, TbServer } from 'react-icons/tb';
import ScrollReveal from './ScrollReveal';
import { personalInfo, stats } from '../data/portfolioData';

function AnimatedCounter({ value, suffix = '' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = value;
        const isDecimal = value % 1 !== 0;
        const duration = 1800;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = end / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(isDecimal ? parseFloat(start.toFixed(2)) : Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
    const bentoCards = [
        {
            icon: FiBook,
            label: "University",
            value: personalInfo.university,
            subtext: `Data Science & AI · ${personalInfo.year}`,
            accent: "var(--accent-violet)",
        },
        {
            icon: FiAward,
            label: "Academic Standing",
            value: `CGPA: ${personalInfo.gpa}`,
            subtext: "IIT Bhilai B.Tech Program",
            accent: "var(--accent-cyan)",
        },
        {
            icon: FiBriefcase,
            label: "Current Industry Role",
            value: "AI & ML Intern",
            subtext: "Incrivelsoft · NUMAA.ai Platform",
            accent: "var(--accent-amber)",
        },
        {
            icon: FiMapPin,
            label: "Location",
            value: personalInfo.location,
            subtext: "India · Open to Remote",
            accent: "var(--accent-emerald)",
        },
    ];

    return (
        <section id="about" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// About Me</span>
                        <h2 className="section-title">Engineering Intelligence</h2>
                        <p className="section-subtitle">
                            Building production multi-agent systems and ML architectures from first principles
                        </p>
                    </div>
                </ScrollReveal>

                {/* Main Content Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 0.8fr',
                    gap: 28,
                    marginBottom: 40,
                }} className="about-main-grid">

                    {/* Bio Card */}
                    <ScrollReveal variant="fadeLeft" delay={0.1}>
                        <div className="glass-card" style={{ padding: 36, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                <div style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 10,
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    border: '1px solid rgba(139, 92, 246, 0.25)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--accent-violet)',
                                }}>
                                    <TbBrain style={{ fontSize: '1.2rem' }} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem' }}>Core Focus</h3>
                            </div>

                            <p style={{
                                fontSize: '1.02rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                marginBottom: 20,
                            }}>
                                I am an AI & ML Engineer pursuing my B.Tech in Data Science & Artificial Intelligence at <strong>IIT Bhilai</strong>, while building real-world multi-agent systems as an intern at <strong>Incrivelsoft</strong>.
                            </p>

                            <p style={{
                                fontSize: '0.98rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.75,
                            }}>
                                My work spans multi-agent orchestration (LangGraph, NUMAA.ai), semantic vector search (ChromaDB), Sentence-BERT fine-tuning, and scalable microservices. I focus on creating autonomous systems with strong reliability guarantees, evaluation benchmarks, and low latency.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Bento Cards 2x2 */}
                    <ScrollReveal variant="fadeRight" delay={0.2}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 16,
                        }} className="about-bento-grid">
                            {bentoCards.map((card, i) => (
                                <motion.div
                                    key={card.label}
                                    className="glass-card"
                                    whileHover={{ y: -3 }}
                                    style={{ padding: 20 }}
                                >
                                    <div style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 8,
                                        background: `${card.accent}15`,
                                        border: `1px solid ${card.accent}30`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: card.accent,
                                        marginBottom: 14,
                                    }}>
                                        <card.icon style={{ fontSize: '1rem' }} />
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.68rem',
                                        color: 'var(--text-muted)',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1,
                                        marginBottom: 4,
                                    }}>
                                        {card.label}
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        marginBottom: 4,
                                    }}>
                                        {card.value}
                                    </div>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--text-muted)',
                                    }}>
                                        {card.subtext}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>

                {/* Stats Row */}
                <ScrollReveal delay={0.3}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
                        gap: 16,
                    }} className="about-stats-grid">
                        {stats.map((stat, idx) => (
                            <div
                                key={stat.label}
                                className="glass-card"
                                style={{
                                    padding: '24px 16px',
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                    background: idx % 2 === 0 ? 'var(--gradient-aurora)' : 'var(--gradient-warm)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginBottom: 6,
                                }}>
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} />
                                </div>
                                <div style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.72rem',
                                    color: 'var(--text-muted)',
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .about-bento-grid {
            grid-template-columns: 1fr !important;
          }
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
        </section>
    );
}
