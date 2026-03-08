import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaKaggle } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolioData';
import VYLogo from './VYLogo';

export default function Footer() {
    return (
        <footer style={{
            padding: '40px 24px',
            borderTop: '1px solid rgba(195,17,12,0.06)',
            position: 'relative',
            zIndex: 1,
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
            }}>
                {/* Logo */}
                <VYLogo size={28} />

                {/* Social links */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    {socialLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2 }}
                            style={{
                                color: 'var(--text-muted)',
                                fontSize: '0.95rem',
                                transition: 'color 0.3s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                            aria-label={link.name}
                        >
                            <link.icon />
                        </motion.a>
                    ))}
                </div>

                {/* Copyright */}
                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: 0.5,
                }}>
                    © {new Date().getFullYear()} {personalInfo.name}
                </p>

                {/* Back to top */}
                <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(195,17,12,0.12)',
                        borderRadius: 4,
                        width: 36,
                        height: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--accent-primary)',
                    }}
                    aria-label="Back to top"
                >
                    <FiArrowUp />
                </motion.button>
            </div>
        </footer>
    );
}
