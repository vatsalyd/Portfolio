import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiDownload } from 'react-icons/fi';
import VYLogo from './VYLogo';
import { navLinks, personalInfo } from '../data/portfolioData';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = navLinks.map(l => l.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 150) {
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
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0 24px',
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: scrolled ? 'rgba(3, 3, 3, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(195,17,12,0.12)' : 'none',
                transition: 'all 0.3s ease',
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
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                    <VYLogo size={34} />
                </motion.a>

                {/* Desktop Nav */}
                <div className="nav-links-desktop" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 28,
                }}>
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                            whileHover={{ y: -1 }}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.78rem',
                                fontWeight: 500,
                                letterSpacing: '0.5px',
                                color: activeSection === link.href.replace('#', '') ? 'var(--accent-primary)' : 'var(--text-muted)',
                                position: 'relative',
                                transition: 'color 0.3s',
                                textTransform: 'uppercase',
                            }}
                        >
                            {link.name}
                            {activeSection === link.href.replace('#', '') && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    style={{
                                        position: 'absolute',
                                        bottom: -4,
                                        left: 0,
                                        right: 0,
                                        height: 1,
                                        background: 'var(--accent-primary)',
                                        boxShadow: '0 0 8px rgba(195,17,12,0.4)',
                                    }}
                                />
                            )}
                        </motion.a>
                    ))}

                    <a
                        href={personalInfo.resumeLink}
                        className="glow-btn"
                        style={{ padding: '8px 20px', fontSize: '0.75rem' }}
                        target="_blank"
                    >
                        <FiDownload /> Resume
                    </a>

                </div>

                {/* Mobile Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="nav-mobile-controls">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="nav-hamburger"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--accent-primary)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            display: 'none',
                        }}
                    >
                        {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="nav-mobile-menu"
                        style={{
                            position: 'absolute',
                            top: 64,
                            left: 0,
                            right: 0,
                            background: 'rgba(3, 3, 3, 0.97)',
                            backdropFilter: 'blur(20px)',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                            borderBottom: '1px solid rgba(195,17,12,0.12)',
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    color: activeSection === link.href.replace('#', '') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                    padding: '8px 0',
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 2,
                background: 'rgba(255,255,255,0.04)',
                overflow: 'hidden',
                pointerEvents: 'none',
            }}>
                <motion.div
                    style={{
                        height: '100%',
                        scaleX: scrollYProgress,
                        transformOrigin: 'left',
                        background: 'linear-gradient(90deg, #E6501B, #C3110C, #B8C0CC)',
                        boxShadow: '0 0 10px rgba(195,17,12,0.45)',
                    }}
                />
            </div>

            <style>{`
        .nav-mobile-controls { display: none; }
        .nav-mobile-menu { display: none; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-mobile-controls { display: flex !important; }
          .nav-mobile-controls .nav-hamburger { display: flex !important; }
          .nav-mobile-menu { display: flex !important; }
        }
      `}</style>
        </motion.nav>
    );
}
