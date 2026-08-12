import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiTerminal, FiZap } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolioData';

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
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 14px',
                        borderRadius: 'var(--border-radius-pill)',
                        background: 'rgba(139, 92, 246, 0.08)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        marginBottom: 28,
                    }}
                >
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
                </motion.div>

                {/* Big Name Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        marginBottom: 12,
                        lineHeight: 1.02,
                        fontSize: 'clamp(2.8rem, 9vw, 6rem)',
                        letterSpacing: '-0.04em',
                    }}
                >
                    {personalInfo.name.split(' ')[0]}{' '}
                    <span style={{
                        background: 'var(--gradient-aurora-wide)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        {personalInfo.name.split(' ')[1]}
                    </span>
                </motion.h1>

                {/* One-liner Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    style={{
                        fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
                        color: 'var(--text-secondary)',
                        maxWidth: 580,
                        marginBottom: 22,
                        lineHeight: 1.55,
                        fontFamily: 'var(--font-primary)',
                    }}
                >
                    <FiZap style={{ color: 'var(--accent-amber)', marginRight: 6, verticalAlign: '-2px' }} />
                    {personalInfo.bio}
                </motion.p>

                {/* Animated Roles */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    style={{
                        fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
                        marginBottom: 36,
                        minHeight: 38,
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                    }}
                >
                    <span style={{ color: 'var(--text-muted)' }}>{'>'}</span>
                    <TypeAnimation
                        sequence={typeSequence}
                        speed={50}
                        deletionSpeed={40}
                        repeat={Infinity}
                        style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}
                    />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}
                >
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
                        href="#chatbot"
                        className="glow-btn-outline"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => { e.preventDefault(); document.querySelector('#chatbot')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                        <FiTerminal /> Ask the Mini-Bot
                    </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                    style={{ display: 'flex', gap: 14, alignItems: 'center' }}
                >
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
                </motion.div>
            </div>
        </section>
    );
}
