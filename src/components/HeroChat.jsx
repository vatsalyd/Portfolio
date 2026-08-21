import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight } from 'react-icons/fi';
import EditorialSection from './EditorialSection';
import MiniVatsalAgent from './MiniVatsalAgent';
import { heroGallery, personalInfo, socialLinks } from '../data/portfolioData';

/**
 * HeroChat — the merged Hero + Chat section.
 *
 * Left column (60%): editorial name headline, typewriter role line, concise bio,
 * primary CTAs, and social links. Generous whitespace for an editorial feel.
 *
 * Right column (40%): a single large photo card that cycles through the gallery
 * photos with an upward-scrolling transition. Clicking opens the Mini Vatsal
 * agent modal.
 */
export default function HeroChat() {
    const [agentOpen, setAgentOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const openAgent = useCallback(() => setAgentOpen(true), []);
    const closeAgent = useCallback(() => setAgentOpen(false), []);
    const intervalRef = useRef(null);

    const typeSequence = personalInfo.roles.flatMap((r) => [r, 2400]);

    // Cycle through photos every 3.5 seconds
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % heroGallery.length);
        }, 3500);
        return () => clearInterval(intervalRef.current);
    }, []);

    const activePhoto = heroGallery[activeIndex];

    return (
        <EditorialSection
            id="hero"
            ghost="INTRO"
            eyebrowIndex="01"
            eyebrowLabel="INTRO"
            contentClassName="hero-chat-content"
            style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 120, paddingBottom: 80 }}
        >
            <div className="hero-chat-container hero-chat-grid">
                {/* ── Left — editorial name block ── */}
                <div className="hero-chat-left">
                    {/* Status chip */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hero-status-chip"
                    >
                        <motion.span
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="hero-status-dot"
                        />
                        <span className="hero-status-text">
                            Available for AI Infrastructure & Autonomous Agent Roles
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-name-stack"
                    >
                        <h1 className="hero-name-line italic">{personalInfo.firstName}</h1>
                        <h1 className="hero-name-line bold">
                            {personalInfo.lastName}<span className="hero-name-dot">.</span>
                        </h1>
                    </motion.div>

                    {/* Roles */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="hero-roles"
                    >
                        <span className="hero-roles-prompt">{'>'}</span>
                        <TypeAnimation
                            sequence={typeSequence}
                            speed={50}
                            deletionSpeed={40}
                            repeat={Infinity}
                            className="hero-roles-text"
                        />
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="hero-headline"
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)',
                            fontWeight: 700,
                            color: 'var(--text-heading)',
                            lineHeight: 1.3,
                            marginTop: 18,
                            marginBottom: 12,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {personalInfo.headline}
                    </motion.h2>

                    {/* Sub-headline / Bio */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.38 }}
                        className="hero-bio"
                        style={{
                            lineHeight: 1.65,
                            fontSize: '0.98rem',
                            color: 'var(--text-secondary)',
                            marginBottom: 24,
                        }}
                    >
                        {personalInfo.subheadline}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="hero-ctas"
                    >
                        <motion.a
                            href="#projects"
                            className="glow-btn"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            View Featured Work <FiArrowRight />
                        </motion.a>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        className="hero-socials"
                    >
                        <span className="hero-socials-label">Connect:</span>
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3 }}
                                className="hero-social"
                                aria-label={link.name}
                            >
                                <link.icon />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* ── Right — single cycling photo card ── */}
                <div className="hero-chat-right">
                    <motion.button
                        type="button"
                        className="hero-showcase"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        onClick={openAgent}
                        aria-label="Open Mini Vatsal agent"
                    >
                        {/* Photo frame with upward scroll transition */}
                        <div className="hero-showcase-frame">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={activePhoto.id}
                                    className="hero-showcase-slide"
                                    style={{
                                        '--photo-accent': `var(--accent-${activePhoto.accent})`,
                                    }}
                                    initial={{ y: '100%', opacity: 0 }}
                                    animate={{ y: '0%', opacity: 1 }}
                                    exit={{ y: '-100%', opacity: 0 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {activePhoto.src ? (
                                        <img src={activePhoto.src} alt="" />
                                    ) : (
                                        <span className="hero-showcase-monogram">
                                            {personalInfo.initials}
                                        </span>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Caption row */}
                        <div className="hero-showcase-caption">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activePhoto.id}
                                    className="hero-showcase-caption-inner"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <span className="hero-showcase-label">{activePhoto.label}</span>
                                    <span className="hero-showcase-sub">{activePhoto.caption}</span>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Dot indicators */}
                        <div className="hero-showcase-dots">
                            {heroGallery.map((_, i) => (
                                <span
                                    key={i}
                                    className={`hero-showcase-dot ${i === activeIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>

                        {/* Hover overlay */}
                        <div className="hero-showcase-overlay">
                            <span className="hero-photo-overlay-kicker">Mini Vatsal</span>
                            <span className="hero-photo-overlay-cta">Ask anything</span>
                        </div>
                    </motion.button>

                    <p className="hero-gallery-hint">
                        Click to open <em>Mini Vatsal</em> — the agent that talks for me.
                    </p>
                </div>
            </div>

            <MiniVatsalAgent open={agentOpen} onClose={closeAgent} />
        </EditorialSection>
    );
}

