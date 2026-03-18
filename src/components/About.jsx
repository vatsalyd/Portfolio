import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiMapPin, FiBook, FiAward } from 'react-icons/fi';
import { TbRobot } from 'react-icons/tb';
import ScrollReveal from './ScrollReveal';
import { personalInfo, stats } from '../data/portfolioData';
import VYLogo from './VYLogo';

function AnimatedCounter({ value, suffix = '' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = value;
        const isDecimal = value % 1 !== 0;
        const duration = 2000;
        const step = duration / (end * (isDecimal ? 10 : 1));

        const timer = setInterval(() => {
            start += isDecimal ? 0.1 : 1;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
            }
        }, step);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
    return (
        <section id="about" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// About Me</span>
                        <h2 className="section-title">Engineering Intelligence</h2>
                        <p className="section-subtitle">
                            Building autonomous AI systems that reason, plan, and execute
                        </p>
                    </div>
                </ScrollReveal>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '300px 1fr',
                    gap: 48,
                    alignItems: 'start',
                }} className="about-grid">
                    {/* Avatar */}
                    <ScrollReveal variant="fadeLeft" delay={0.1}>
                        <div style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <div style={{
                                width: 220,
                                height: 220,
                                borderRadius: '50%',
                                position: 'relative',
                            }}>
                                {/* Rotating gradient border */}
                                <div style={{
                                    position: 'absolute',
                                    inset: -3,
                                    borderRadius: '50%',
                                    background: 'conic-gradient(from 0deg, #C3110C, #E6501B, #740A03, #C3110C)',
                                    animation: 'spin-slow 6s linear infinite',
                                    opacity: 0.6,
                                }} />
                                {/* Avatar inner */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 3,
                                    borderRadius: '50%',
                                    background: 'var(--bg-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <VYLogo size={100} />
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Content */}
                    <ScrollReveal variant="fadeRight" delay={0.2}>
                        <div>
                            <p style={{
                                fontSize: '1rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                marginBottom: 32,
                            }}>
                                {personalInfo.bio}
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 16,
                                marginBottom: 32,
                            }}>
                                {[
                                    { icon: FiBook, label: 'University', value: personalInfo.university },
                                    { icon: FiAward, label: 'Degree', value: personalInfo.degree },
                                    { icon: TbRobot, label: 'Focus', value: 'Gen AI & Data Science' },
                                    { icon: FiMapPin, label: 'Location', value: personalInfo.location },
                                ].map((item) => (
                                    <div key={item.label} style={{
                                        padding: '12px 16px',
                                        borderRadius: 'var(--border-radius-sm)',
                                        border: 'var(--border-glass)',
                                        background: 'var(--bg-glass)',
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            marginBottom: 4,
                                        }}>
                                            <item.icon style={{ color: 'var(--accent-primary)', fontSize: '0.85rem' }} />
                                            <span style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.7rem',
                                                color: 'var(--accent-primary)',
                                                textTransform: 'uppercase',
                                                letterSpacing: 1,
                                            }}>{item.label}</span>
                                        </div>
                                        <span style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--text-primary)',
                                            fontWeight: 500,
                                        }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Stats */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: 16,
                            }}>
                                {stats.map((stat) => (
                                    <div key={stat.label} style={{
                                        textAlign: 'center',
                                        padding: '16px 8px',
                                        borderRadius: 'var(--border-radius-sm)',
                                        border: 'var(--border-glass)',
                                        background: 'var(--bg-glass)',
                                    }}>
                                        <div style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.5rem',
                                            fontWeight: 800,
                                            background: 'var(--gradient-accent)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}>
                                            <AnimatedCounter value={stat.value} suffix={stat.label === 'GPA' ? '' : '+'} />
                                        </div>
                                        <div style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.65rem',
                                            color: 'var(--text-muted)',
                                            textTransform: 'uppercase',
                                            letterSpacing: 1,
                                            marginTop: 4,
                                        }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid > div:first-child {
            justify-self: center;
          }
        }
      `}</style>
        </section>
    );
}
