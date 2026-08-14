import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiTerminal, FiZap } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolioData';
import EditorialSection from './EditorialSection';

export default function Hero() {
    const typeSequence = personalInfo.roles.flatMap(role => [role, 2400]);

    return (
        <EditorialSection
            id="hero"
            ghost="INTRO"
            eyebrowIndex="01"
            eyebrowLabel="INTRO"
            contentClassName="hero-content"
            style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 80 }}
        >
            <div className="container" style={{ width: '100%' }}>
                {/* Status Badge — blush chip */}
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
                        background: 'var(--blush)',
                        border: '1px solid rgba(26, 26, 26, 0.1)',
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

                {/* Big Name Headline — Playfair giant split, stacked */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginBottom: 16, lineHeight: 1.05 }}
                >
                    <motion.h1
                        style={{
                            marginBottom: 4,
                            lineHeight: 1.0,
                            fontSize: 'clamp(3rem, 10vw, 7rem)',
                            letterSpacing: '-0.04em',
                            fontStyle: 'italic',
                            fontWeight: 400,
                        }}
                    >
                        {personalInfo.name.split(' ')[0]}
                    </motion.h1>
                    <motion.h1
                        style={{
                            lineHeight: 1.0,
                            fontSize: 'clamp(3rem, 10vw, 7rem)',
                            letterSpacing: '-0.04em',
                            fontStyle: 'italic',
                            fontWeight: 700,
                        }}
                    >
                        {personalInfo.name.split(' ')[1]}<span style={{ fontStyle: 'normal', fontWeight: 400, color: 'var(--accent-violet)' }}>.</span>
                    </motion.h1>
                </motion.div>

                {/* One-liner Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    style={{
                        fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
                        color: 'var(--text-secondary)',
                        maxWidth: 580,
                        marginBottom: 28,
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-primary)',
                    }}
                >
                    <FiZap style={{ color: 'var(--accent-amber)', marginRight: 8, verticalAlign: '-2px' }} />
                    {personalInfo.bio}
                </motion.p>

                {/* Animated Roles */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    style={{
                        fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
                        marginBottom: 40,
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
                    style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}
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

                {/* Social Links — editorial white icons */}
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
                                width: 40,
                                height: 40,
                                borderRadius: 'var(--border-radius)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--bg-card)',
                                border: '1px solid rgba(26,26,26,0.08)',
                                color: 'var(--text-secondary)',
                                fontSize: '1.15rem',
                                transition: 'all 0.25s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--accent-violet)';
                                e.currentTarget.style.borderColor = 'var(--accent-violet)';
                                e.currentTarget.style.background = 'var(--blush)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--text-secondary)';
                                e.currentTarget.style.borderColor = 'rgba(26,26,26,0.08)';
                                e.currentTarget.style.background = 'var(--bg-card)';
                            }}
                            aria-label={link.name}
                        >
                            <link.icon />
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </EditorialSection>
    );
}