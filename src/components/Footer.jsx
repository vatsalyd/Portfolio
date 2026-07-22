import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolioData';
import VYLogo from './VYLogo';

export default function Footer() {
    return (
        <footer style={{
            padding: '48px 24px 32px',
            borderTop: '1px solid rgba(139, 92, 246, 0.12)',
            background: '#07070B',
            position: 'relative',
            zIndex: 1,
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 20,
            }}>
                {/* Logo & Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <VYLogo size={28} />
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: 'var(--text-heading)',
                    }}>
                        Vatsal Yadav
                    </span>
                </div>

                {/* Copyright */}
                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    letterSpacing: 0.3,
                }}>
                    © {new Date().getFullYear()} Vatsal Yadav · Built with React, Vite & Framer Motion
                </p>

                {/* Back to top */}
                <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{
                        background: 'rgba(22, 22, 34, 0.6)',
                        border: '1px solid rgba(139, 92, 246, 0.25)',
                        borderRadius: 'var(--border-radius-sm)',
                        width: 38,
                        height: 38,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--accent-violet)',
                        fontSize: '1.1rem',
                        transition: 'all 0.25s',
                    }}
                    aria-label="Back to top"
                >
                    <FiArrowUp />
                </motion.button>
            </div>
        </footer>
    );
}
