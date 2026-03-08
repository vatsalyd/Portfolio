import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { certifications } from '../data/portfolioData';

function CertCard({ cert, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass-card"
            style={{
                padding: 24,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
            }}
        >
            {/* Shimmer effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                animation: 'shimmer 3s infinite',
                pointerEvents: 'none',
            }} />

            {/* Color accent bar */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: cert.color,
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${cert.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: cert.color,
                    fontSize: '1.2rem',
                    flexShrink: 0,
                }}>
                    <FiAward />
                </div>
                <div>
                    <h3 style={{ fontSize: '0.95rem', marginBottom: 4, lineHeight: 1.4 }}>{cert.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cert.issuer}</p>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: cert.color,
                        marginTop: 6,
                        display: 'inline-block',
                    }}>
                        {cert.year}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default function Certifications() {
    return (
        <section id="certifications" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Credentials</span>
                        <h2 className="section-title">Certifications & Badges</h2>
                        <p className="section-subtitle">
                            Continuous learning is my competitive advantage
                        </p>
                    </div>
                </ScrollReveal>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 20,
                    maxWidth: 960,
                    margin: '0 auto',
                }}>
                    {certifications.map((cert, i) => (
                        <CertCard key={cert.name} cert={cert} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
