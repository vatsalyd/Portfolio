import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiPhone, FiMapPin, FiCheck, FiAlertCircle } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { personalInfo, socialLinks } from '../data/portfolioData';

function FloatingInput({ label, type = 'text', name, required = true, textarea = false }) {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const Component = textarea ? 'textarea' : 'input';

    return (
        <div style={{ position: 'relative', marginBottom: 20 }}>
            <Component
                type={type}
                name={name}
                required={required}
                onFocus={() => setFocused(true)}
                onBlur={(e) => { setFocused(false); setHasValue(!!e.target.value); }}
                style={{
                    width: '100%',
                    padding: '18px 16px 8px',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-primary)',
                    color: 'var(--text-primary)',
                    background: 'rgba(10, 10, 15, 0.6)',
                    border: `1px solid ${focused ? 'rgba(139, 92, 246, 0.45)' : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: 'var(--border-radius-sm)',
                    outline: 'none',
                    resize: textarea ? 'vertical' : 'none',
                    minHeight: textarea ? 130 : 'auto',
                    transition: 'all 0.25s ease',
                    boxShadow: focused ? '0 0 16px rgba(139, 92, 246, 0.15)' : 'none',
                }}
            />
            <label style={{
                position: 'absolute',
                left: 16,
                top: focused || hasValue ? 6 : 16,
                fontSize: focused || hasValue ? '0.68rem' : '0.88rem',
                fontFamily: 'var(--font-mono)',
                color: focused ? 'var(--accent-violet)' : 'var(--text-muted)',
                transition: 'all 0.2s ease',
                pointerEvents: 'none',
                textTransform: 'uppercase',
                letterSpacing: focused || hasValue ? 1 : 0,
            }}>
                {label}
            </label>
        </div>
    );
}

export default function Contact() {
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(formRef.current);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: '162d5540-23fe-4f00-8762-4abe3f29ddc4',
                    ...data,
                    from_name: data.name,
                    subject: `Portfolio Contact: ${data.subject}`,
                }),
            });

            if (response.ok) {
                setStatus('sent');
                formRef.current?.reset();
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                throw new Error('Failed to send');
            }
        } catch {
            const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name} (${data.email})\n\n${data.message}`)}`;
            window.open(mailtoLink, '_blank');
            setStatus('sent');
            formRef.current?.reset();
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const buttonContent = {
        idle: <><FiSend /> Send Message</>,
        sending: <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block' }}>⟳</motion.span> Sending...</>,
        sent: <><FiCheck /> Message Sent!</>,
        error: <><FiAlertCircle /> Try Again</>,
    };

    return (
        <section id="contact" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Reach Out</span>
                        <h2 className="section-title">Let's Talk</h2>
                        <p className="section-subtitle">
                            If any of that was interesting — the multi-agent stuff, the ML, the movies — drop a message. I read every one and reply fast.
                        </p>
                    </div>
                </ScrollReveal>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.1fr 0.9fr',
                    gap: 40,
                    maxWidth: 960,
                    margin: '0 auto',
                }} className="contact-grid">
                    {/* Form */}
                    <ScrollReveal variant="fadeLeft" delay={0.1}>
                        <form ref={formRef} onSubmit={handleSubmit} className="glass-card" style={{ padding: 32 }}>
                            <FloatingInput label="Your Name" name="name" />
                            <FloatingInput label="Your Email" name="email" type="email" />
                            <FloatingInput label="Subject" name="subject" />
                            <FloatingInput label="Message" name="message" textarea />

                            <motion.button
                                type="submit"
                                className="glow-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={status === 'sending'}
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    marginTop: 8,
                                    opacity: status === 'sending' ? 0.7 : 1,
                                    background: status === 'sent' ? 'linear-gradient(135deg, #10B981, #059669)' : undefined,
                                }}
                            >
                                {buttonContent[status]}
                            </motion.button>
                        </form>
                    </ScrollReveal>

                    {/* Contact Info Cards */}
                    <ScrollReveal variant="fadeRight" delay={0.2}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[
                                { icon: FiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                                { icon: FiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
                                { icon: FiMapPin, label: 'Location', value: personalInfo.location, href: null },
                            ].map((item) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href || '#'}
                                    className="glass-card"
                                    whileHover={{ y: -3 }}
                                    style={{
                                        padding: '20px 24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 'var(--border-radius-sm)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(139, 92, 246, 0.1)',
                                        border: '1px solid rgba(139, 92, 246, 0.2)',
                                        color: 'var(--accent-violet)',
                                        fontSize: '1.15rem',
                                        flexShrink: 0,
                                    }}>
                                        <item.icon />
                                    </div>
                                    <div>
                                        <div style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.68rem',
                                            color: 'var(--text-muted)',
                                            textTransform: 'uppercase',
                                            letterSpacing: 1,
                                            marginBottom: 3,
                                        }}>{item.label}</div>
                                        <div style={{
                                            fontSize: '0.95rem',
                                            color: 'var(--text-primary)',
                                            fontWeight: 500,
                                        }}>{item.value}</div>
                                    </div>
                                </motion.a>
                            ))}

                            {/* Social Buttons Block */}
                            <div className="glass-card" style={{ padding: 24, marginTop: 8 }}>
                                <div style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.7rem',
                                    color: 'var(--text-muted)',
                                    textTransform: 'uppercase',
                                    letterSpacing: 1.5,
                                    marginBottom: 14,
                                }}>
                                    Developer Profiles
                                </div>
                                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                    {socialLinks.map((link) => (
                                        <motion.a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -3, scale: 1.05 }}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                padding: '9px 16px',
                                                borderRadius: 'var(--border-radius-sm)',
                                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                                background: 'rgba(10, 10, 15, 0.6)',
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.85rem',
                                                fontFamily: 'var(--font-display)',
                                                textDecoration: 'none',
                                                transition: 'all 0.25s',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = 'var(--accent-cyan)';
                                                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = 'var(--text-secondary)';
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                            }}
                                        >
                                            <link.icon /> {link.name}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
