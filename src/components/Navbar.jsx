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
    const [activeSection, setActiveSection] = useState('hero');
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
                padding: '0 32px',
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                borderBottom: scrolled ? '1px solid rgba(26, 26, 26, 0.08)' : '1px solid transparent',
                transition: 'border-color 0.3s ease',
            }}
        >
            <div style={{
                maxWidth: 'var(--container-width)',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Boxed VY Logo — Noah style */}
                <motion.a
                    href="#"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textDecoration: 'none' }}
                >
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 38,
                        height: 38,
                        background: 'var(--text-heading)',
                        color: 'var(--bg-primary)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--text-heading)',
                        boxShadow: '0 2px 8px rgba(26,26,26,0.12)',
                        transition: 'all 0.2s ease',
                    }}>
                        VY
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: 'var(--text-heading)',
                        letterSpacing: '-0.02em',
                    }}>
                        Vatsal Yadav
                    </span>
                </motion.a>

                {/* Desktop Nav — plain editorial links */}
                <div className="nav-links-desktop" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 32,
                }}>
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '');
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: '0.78rem',
                                    fontWeight: isActive ? 700 : 400,
                                    letterSpacing: '0.5px',
                                    textTransform: 'uppercase',
                                    color: isActive ? 'var(--accent-violet-dim)' : 'var(--text-secondary)',
                                    padding: '6px 0 8px',
                                    borderBottom: isActive ? '2px solid var(--accent-violet)' : '2px solid transparent',
                                    textDecoration: 'none',
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </div>

                {/* Right actions: Mentos Life + Resume */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="nav-right-actions">
                    <MentosLifeButton />
                    <a
                        href={personalInfo.resumeLink}
                        className="glow-btn-outline"
                        style={{ padding: '10px 20px', fontSize: '0.7rem' }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiDownload style={{ fontSize: '0.8rem', marginRight: 6 }} /> RESUME
                    </a>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="nav-hamburger"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '1.4rem',
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
                            top: 72,
                            left: 0,
                            right: 0,
                            background: 'var(--bg-card)',
                            borderBottom: '1px solid rgba(26, 26, 26, 0.08)',
                            padding: '28px 32px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20,
                            overflow: 'hidden',
                            boxShadow: '0 12px 32px rgba(26,26,26,0.08)',
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
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    color: activeSection === link.href.replace('#', '')
                                        ? 'var(--accent-violet-dim)'
                                        : 'var(--text-primary)',
                                    padding: '6px 0',
                                    textDecoration: 'none',
                                    borderBottom: activeSection === link.href.replace('#', '')
                                        ? '2px solid var(--accent-violet)'
                                        : 'none',
                                }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll progress bar line — mentos violet */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    scaleX: scrollYProgress,
                    transformOrigin: 'left',
                    background: 'var(--accent-violet)',
                    boxShadow: '0 0 10px rgba(202, 130, 248, 0.4)',
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