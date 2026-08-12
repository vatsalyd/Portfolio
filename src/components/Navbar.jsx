import { useState, useEffect } from 'react';
import { AnimatePresence, useScroll, motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiDownload } from 'react-icons/fi';
import VYLogo from './VYLogo';
import MentosLifeButton from './MentosLifeButton';
import { navLinks, personalInfo } from '../data/portfolioData';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
            const sections = navLinks.map(l => l.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 200) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0 24px',
                height: 70,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(139, 92, 246, 0.12)' : '1px solid transparent',
                transition: 'all 0.35s ease',
            }}
        >
            <div style={{
                maxWidth: 'var(--container-width)',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <motion.a
                    href="#"
                    whileHover={{ scale: 1.04 }}
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textDecoration: 'none' }}
                >
                    <VYLogo size={32} />
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: 'var(--text-heading)',
                        letterSpacing: '-0.02em',
                    }}>
                        Vatsal<span style={{ color: 'var(--accent-violet)' }}>.</span>
                    </span>
                </motion.a>

                {/* Desktop Nav */}
                <div className="nav-links-desktop" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(22, 22, 34, 0.5)',
                    padding: '4px 8px',
                    borderRadius: 'var(--border-radius-pill)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                }}>
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '');
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '0.84rem',
                                    fontWeight: 500,
                                    color: isActive ? '#fff' : 'var(--text-secondary)',
                                    padding: '7px 16px',
                                    borderRadius: 'var(--border-radius-pill)',
                                    position: 'relative',
                                    transition: 'color 0.25s ease',
                                    textDecoration: 'none',
                                }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: 'var(--border-radius-pill)',
                                            background: 'var(--gradient-subtle)',
                                            border: '1px solid rgba(139, 92, 246, 0.3)',
                                            boxShadow: '0 0 16px rgba(139, 92, 246, 0.15)',
                                            zIndex: -1,
                                        }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {link.name}
                            </a>
                        );
                    })}
                </div>

                {/* Resume button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="nav-right-actions">
                    <MentosLifeButton />
                    <a
                        href={personalInfo.resumeLink}
                        className="glow-btn-outline"
                        style={{ padding: '8px 18px', fontSize: '0.8rem', borderRadius: 'var(--border-radius-pill)' }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiDownload style={{ fontSize: '0.9rem' }} /> Resume
                    </a>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="nav-hamburger"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 4,
                        }}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="nav-mobile-menu"
                        style={{
                            position: 'absolute',
                            top: 70,
                            left: 0,
                            right: 0,
                            background: 'rgba(10, 10, 15, 0.96)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            padding: '24px 32px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                            borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
                            overflow: 'hidden',
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.05rem',
                                    fontWeight: 600,
                                    color: activeSection === link.href.replace('#', '') ? 'var(--accent-violet)' : 'var(--text-secondary)',
                                    padding: '8px 0',
                                    textDecoration: 'none',
                                }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll progress bar line */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    scaleX: scrollYProgress,
                    transformOrigin: 'left',
                    background: 'var(--gradient-aurora)',
                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
                }}
            />

            <style>{`
        .nav-mobile-menu { display: none; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-mobile-menu { display: flex !important; }
          .nav-right-actions .mentos-btn { display: none !important; }
        }
      `}</style>
        </motion.nav>
    );
}
