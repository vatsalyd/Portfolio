import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight } from 'react-icons/fi';
import EditorialSection from './EditorialSection';
import MiniVatsalAgent from './MiniVatsalAgent';
import { heroGallery, personalInfo, socialLinks } from '../data/portfolioData';

/**
 * HeroChat — the merged Hero + Chat section.
 *
 * Left column: editorial name headline, typewriter role line, concise bio,
 * primary CTAs, and social links.
 *
 * Right column: a 2x2 gallery of transformational photo cards. Each card
 * reveals a "Mini Vatsal" prompt on hover; clicking a card opens the
 * LLM-powered Mini Vatsal agent modal that springs out from the card.
 *
 * Replaces the previous two-section Hero + MiniChatbot split.
 */
export default function HeroChat() {
    const [agentOpen, setAgentOpen] = useState(false);
    const openAgent = useCallback(() => setAgentOpen(true), []);
    const closeAgent = useCallback(() => setAgentOpen(false), []);

    const typeSequence = personalInfo.roles.flatMap((r) => [r, 2400]);

    return (
        <EditorialSection
            id="hero"
            ghost="INTRO"
            eyebrowIndex="01"
            eyebrowLabel="INTRO"
            contentClassName="hero-chat-content"
            style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 120, paddingBottom: 80 }}
        >
            <div className="container hero-chat-grid">
                {/* ── Left ── */}
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
                            Available for AI / ML Engineering Collaborations
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

                    {/* One-liner */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="hero-bio"
                    >
                        {personalInfo.bio}
                    </motion.p>

                    {/* Roles */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
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

                {/* ── Right — transformational gallery ── */}
                <div className="hero-chat-right">
                    <div className="hero-gallery">
                        {heroGallery.map((photo, i) => (
                            <PhotoCard key={photo.id} photo={photo} index={i} onOpen={openAgent} />
                        ))}
                    </div>
                    <p className="hero-gallery-hint">
                        Hover a photo. Click to open <em>Mini Vatsal</em> — the agent that talks for me.
                    </p>
                </div>
            </div>

            <MiniVatsalAgent open={agentOpen} onClose={closeAgent} />
        </EditorialSection>
    );
}

/* ── Transformational photo card ── */
function PhotoCard({ photo, index, onOpen }) {
    const [hover, setHover] = useState(false);
    const accentVar = `--accent-${photo.accent}`;

    return (
        <motion.button
            type="button"
            className={`hero-photo ${hover ? 'is-hover' : ''}`}
            style={{ '--photo-accent': `var(${accentVar})` }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onOpen}
            aria-label={`Open Mini Vatsal agent — ${photo.caption}`}
        >
            {/* Photo / placeholder frame */}
            <div className="hero-photo-frame" aria-hidden="true">
                {photo.src ? (
                    <img src={photo.src} alt="" />
                ) : (
                    <span className="hero-photo-monogram">
                        {personalInfo.initials}
                    </span>
                )}
            </div>

            {/* Caption row */}
            <div className="hero-photo-caption">
                <span className="hero-photo-label">{photo.label}</span>
                <span className="hero-photo-sub">{photo.caption}</span>
            </div>

            {/* Transformational hover overlay — reveals Mini Vatsal prompt */}
            <motion.div
                className="hero-photo-overlay"
                initial={false}
                animate={{ opacity: hover ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                aria-hidden={!hover}
            >
                <span className="hero-photo-overlay-kicker">Mini Vatsal</span>
                <span className="hero-photo-overlay-cta">Ask anything</span>
            </motion.div>
        </motion.button>
    );
}
