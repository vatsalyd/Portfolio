import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiTerminal, FiChevronDown, FiZap } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolioData';

/* Ambient Aurora Gradient Mesh */
function AuroraOrbMesh() {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            maxWidth: 420,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* Outer animated gradient ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, rgba(139,92,246,0.25), rgba(6,182,212,0.3), rgba(245,158,11,0.2), rgba(139,92,246,0.25))',
                    filter: 'blur(30px)',
                    opacity: 0.7,
                }}
            />

            {/* Inner glass orb container */}
            <div style={{
                position: 'relative',
                width: '82%',
                height: '82%',
                borderRadius: '50%',
                background: 'rgba(18, 18, 26, 0.7)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 32,
                boxShadow: 'inset 0 0 30px rgba(139, 92, 246, 0.15), 0 20px 50px rgba(0,0,0,0.5)',
            }}>
                <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ textAlign: 'center' }}
                >
                    <div style={{
                        width: 52,
                        height: 52,
                        borderRadius: 16,
                        background: 'var(--gradient-aurora)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        color: '#fff',
                        fontSize: '1.5rem',
                        boxShadow: '0 8px 24px rgba(139,92,246,0.4)',
                    }}>
                        <FiZap />
                    </div>

                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--accent-cyan)',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        marginBottom: 6,
                    }}>
                        IIT BHILAI & INCRIVELSOFT
                    </div>

                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: 12,
                    }}>
                        Multi-Agent Systems & LLMs
                    </div>

                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 12px',
                        borderRadius: 999,
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#10B981',
                    }}>
                        <span style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#10B981',
                            boxShadow: '0 0 8px #10B981',
                        }} />
                        Building NUMAA.ai & HelixDesk
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function Hero() {
    const typeSequence = personalInfo.roles.flatMap(role => [role, 2400]);

    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            paddingTop: 100,
            paddingBottom: 60,
        }}>
            <div className="container" style={{ width: '100%' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.1fr 0.9fr',
                    gap: 48,
                    alignItems: 'center',
                }} className="hero-grid">
                    {/* Left Column: Headline & Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Status Badge */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '6px 14px',
                            borderRadius: 'var(--border-radius-pill)',
                            background: 'rgba(139, 92, 246, 0.08)',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            marginBottom: 24,
                        }}>
                            <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    width: 7,
                                    height: 7,
                                    borderRadius: '50%',
                                    background: 'var(--accent-violet)',
                                    boxShadow: '0 0 10px var(--accent-violet)',
                                }}
                            />
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                color: 'var(--text-primary)',
                                fontWeight: 500,
                            }}>
                                Available for AI / ML Engineering Collaborations
                            </span>
                        </div>

                        {/* Name Headline */}
                        <h1 style={{
                            marginBottom: 16,
                            lineHeight: 1.05,
                        }}>
                            Architecting <br />
                            <span style={{
                                background: 'var(--gradient-aurora-wide)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                Autonomous AI
                            </span>
                        </h1>

                        {/* Animated Roles */}
                        <div style={{
                            fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                            marginBottom: 20,
                            minHeight: 36,
                            fontFamily: 'var(--font-mono)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}>
                            <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
                            <TypeAnimation
                                sequence={typeSequence}
                                speed={50}
                                deletionSpeed={40}
                                repeat={Infinity}
                                style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}
                            />
                        </div>

                        {/* Bio */}
                        <p style={{
                            fontSize: '1.05rem',
                            color: 'var(--text-secondary)',
                            maxWidth: 520,
                            marginBottom: 32,
                            lineHeight: 1.7,
                        }}>
                            {personalInfo.bio}
                        </p>

                        {/* CTA Buttons */}
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
                            <motion.a
                                href="#projects"
                                className="glow-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                            >
                                View Featured Work <FiArrowRight />
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="glow-btn-outline"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                            >
                                <FiTerminal /> Get In Touch
                            </motion.a>
                        </div>

                        {/* Social Links */}
                        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: 1.5,
                                marginRight: 4,
                            }}>
                                Connect:
                            </span>
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    style={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: 'var(--border-radius-sm)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(22, 22, 34, 0.6)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        color: 'var(--text-secondary)',
                                        fontSize: '1.1rem',
                                        transition: 'all 0.25s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'var(--accent-violet)';
                                        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                    }}
                                    aria-label={link.name}
                                >
                                    <link.icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Visual Mesh */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-mesh-col"
                    >
                        <AuroraOrbMesh />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div style={{
                position: 'absolute',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                color: 'var(--text-muted)',
                cursor: 'pointer',
                opacity: 0.6,
                transition: 'opacity 0.2s',
            }}
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <FiChevronDown style={{ fontSize: '1.2rem' }} />
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            display: flex;
            flexDirection: column;
            align-items: center;
          }
          .hero-mesh-col {
            order: -1;
          }
        }
      `}</style>
        </section>
    );
}
