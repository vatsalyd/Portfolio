import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer style={{
            padding: '64px 32px 40px',
            borderTop: '1px solid rgba(26, 26, 26, 0.08)',
            position: 'relative',
            zIndex: 1,
            background: 'var(--bg-secondary)',
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 20,
            }}>
                {/* VY Signature Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                        src={`${import.meta.env.BASE_URL}vy-logo.jpg`}
                        alt="Vatsal Yadav Logo"
                        style={{
                            width: 42,
                            height: 42,
                            objectFit: 'cover',
                            borderRadius: 'var(--border-radius)',
                        }}
                    />
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: 'var(--text-heading)',
                        letterSpacing: '-0.02em',
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
                        background: 'var(--bg-card)',
                        border: '1px solid rgba(26, 26, 26, 0.1)',
                        borderRadius: 'var(--border-radius-sm)',
                        width: 40,
                        height: 40,
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