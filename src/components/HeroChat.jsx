import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiTerminal } from 'react-icons/fi';
import EditorialSection from './EditorialSection';
import { heroGallery, personalInfo, socialLinks } from '../data/portfolioData';

/**
 * HeroChat — Editorial Intro & Vertical Photography Reel Showcase.
 *
 * Left column: editorial name, headline, sub-headline, pillar badges, CTAs, socials.
 * Right column: independent vertical reel cycling through photography + brand artwork.
 * Bottom: 4-column quick-fact summary strip anchoring the page.
 */


export default function HeroChat() {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);

    const typeSequence = personalInfo.roles.flatMap((r) => [r, 2400]);

    // Cycle through photos every 3.8 seconds
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % heroGallery.length);
        }, 3800);
        return () => clearInterval(intervalRef.current);
    }, []);

    const activePhoto = heroGallery[activeIndex];
    const photoSrc = activePhoto?.src ? `${import.meta.env.BASE_URL}${activePhoto.src}` : null;

    return (
        <EditorialSection
            id="hero"
            ghost="INTRO"
            eyebrowIndex="01"
            eyebrowLabel="INTRO"
            contentClassName="hero-chat-content"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                paddingTop: 'clamp(90px, 11vh, 120px)',
                paddingBottom: 'clamp(40px, 6vh, 60px)',
            }}
        >
            <div className="hero-chat-container">
                {/* Main Hero 2-Column Grid */}
                <div className="hero-chat-grid">
                    {/* ── Left Column: Editorial Bio & Content ── */}
                    <div className="hero-chat-left">
                        {/* Status chip */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
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
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="hero-name-stack"
                        >
                            <h1 className="hero-name-line italic">{personalInfo.firstName}</h1>
                            <h1 className="hero-name-line bold">
                                {personalInfo.lastName}<span className="hero-name-dot">.</span>
                            </h1>
                        </motion.div>

                        {/* Typewriter Terminal Role */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
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
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="hero-headline"
                        >
                            {personalInfo.headline}
                        </motion.h2>

                        {/* Sub-headline / Bio */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.32 }}
                            className="hero-bio"
                        >
                            {personalInfo.subheadline}
                        </motion.p>



                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.44 }}
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

                            <motion.a
                                href="#agent"
                                className="glow-btn-outline"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#agent')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <FiTerminal /> Open Terminal Agent
                            </motion.a>
                        </motion.div>

                        {/* Socials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.52 }}
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
                                    title={link.name}
                                >
                                    <link.icon />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Right Column: Independent Vertical Reel Showcase ── */}
                    <div className="hero-chat-right">
                        <motion.div
                            className={`hero-showcase accent-${activePhoto.accent}`}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            {/* Slide Counter Pill */}
                            <div className="hero-showcase-badge">
                                <span className="hero-showcase-badge-dot" />
                                <span>Visual Archive · {activeIndex + 1} / {heroGallery.length}</span>
                            </div>

                            {/* Photo frame with smooth vertical sliding transition */}
                            <div className="hero-showcase-frame">
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={activePhoto.id}
                                        className="hero-showcase-slide"
                                        initial={{ y: '100%', opacity: 0 }}
                                        animate={{ y: '0%', opacity: 1 }}
                                        exit={{ y: '-100%', opacity: 0 }}
                                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {photoSrc ? (
                                            <img
                                                src={photoSrc}
                                                alt={activePhoto.label}
                                                className="hero-showcase-img"
                                            />
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
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <span className="hero-showcase-label">{activePhoto.label}</span>
                                        <span className="hero-showcase-sub">{activePhoto.caption}</span>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Dot indicators */}
                                <div className="hero-showcase-dots">
                                    {heroGallery.map((_, i) => (
                                        <span
                                            key={i}
                                            className={`hero-showcase-dot ${i === activeIndex ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveIndex(i);
                                            }}
                                            title={`Go to slide ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>


            </div>
        </EditorialSection>
    );
}
