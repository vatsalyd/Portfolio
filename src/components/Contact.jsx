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
                    padding: '16px 14px 6px',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-primary)',
                    color: 'var(--text-primary)',
                    background: 'rgba(5,5,5,0.6)',
                    border: `1px solid ${focused ? 'rgba(195,17,12,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 'var(--border-radius-sm)',
                    outline: 'none',
                    resize: textarea ? 'vertical' : 'none',
                    minHeight: textarea ? 120 : 'auto',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxShadow: focused ? '0 0 12px rgba(195,17,12,0.08)' : 'none',
                }}
            />
            <label style={{
                position: 'absolute',
                left: 14,
                top: focused || hasValue ? 6 : 14,
                fontSize: focused || hasValue ? '0.65rem' : '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: focused ? 'var(--accent-primary)' : 'var(--text-muted)',
                transition: 'all 0.2s',
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
            // Use Web3Forms — free, no signup needed for basic usage
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'YOUR_ACCESS_KEY', // User needs to replace this
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
        } catch (err) {
            // Fallback: open mailto link
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
                        <span className="section-label">// Get in Touch</span>
                        <h2 className="section-title">Let's Connect</h2>
                        <p className="section-subtitle">
                            Have an AI project in mind or want to collaborate? I'd love to hear from you.
                        </p>
                    </div>
                </ScrollReveal>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 48,
                    maxWidth: 900,
                    margin: '0 auto',
                }} className="contact-grid">
                    {/* Form */}
                    <ScrollReveal variant="fadeLeft" delay={0.1}>
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <FloatingInput label="Name" name="name" />
                            <FloatingInput label="Email" name="email" type="email" />
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
                                    background: status === 'sent' ? 'linear-gradient(135deg, #0a6e2a, #15803d)' : undefined,
                                }}
                            >
                                {buttonContent[status]}
                            </motion.button>
                        </form>
                    </ScrollReveal>

                    {/* Contact Info */}
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
                                    whileHover={{ y: -2 }}
                                    style={{
                                        padding: '16px 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 14,
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 4,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(195,17,12,0.05)',
                                        border: '1px solid rgba(195,17,12,0.1)',
                                        color: 'var(--accent-primary)',
                                        fontSize: '1rem',
                                    }}>
                                        <item.icon />
                                    </div>
                                    <div>
                                        <div style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.65rem',
                                            color: 'var(--text-muted)',
                                            textTransform: 'uppercase',
                                            letterSpacing: 1,
                                            marginBottom: 2,
                                        }}>{item.label}</div>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--text-primary)',
                                            fontWeight: 500,
                                        }}>{item.value}</div>
                                    </div>
                                </motion.a>
                            ))}

                            {/* Social links */}
                            <div style={{
                                display: 'flex',
                                gap: 12,
                                marginTop: 16,
                            }}>
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -3 }}
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 4,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid rgba(195,17,12,0.08)',
                                            background: 'var(--bg-glass)',
                                            color: 'var(--text-muted)',
                                            fontSize: '1.1rem',
                                            transition: 'all 0.3s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = 'var(--accent-primary)';
                                            e.currentTarget.style.borderColor = 'rgba(195,17,12,0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = 'var(--text-muted)';
                                            e.currentTarget.style.borderColor = 'rgba(195,17,12,0.08)';
                                        }}
                                        aria-label={link.name}
                                    >
                                        <link.icon />
                                    </motion.a>
                                ))}
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
