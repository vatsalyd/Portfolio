import { FiExternalLink, FiClock, FiFileText } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { articles } from '../data/portfolioData';

export default function Articles() {
    return (
        <section id="articles" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Writing</span>
                        <h2 className="section-title">Articles & Notes</h2>
                        <p className="section-subtitle">
                            Things I've written about multi-agent systems, ML, and what I've learned shipping each project. Placeholder URLs for now — real ones coming.
                        </p>
                    </div>
                </ScrollReveal>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 22,
                    maxWidth: 1000,
                    margin: '0 auto',
                }}>
                    {articles.map((article, i) => (
                        <ScrollReveal key={article.title} delay={i < 3 ? i * 0.05 : 0}>
                            <a
                                href={article.url === '#' ? undefined : article.url}
                                target={article.url === '#' ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                className="article-card"
                                style={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: 14,
                                }}>
                                    <div style={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: 'var(--border-radius-sm)',
                                        background: 'rgba(139, 92, 246, 0.08)',
                                        border: '1px solid rgba(139, 92, 246, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--accent-violet)',
                                        fontSize: '1.1rem',
                                    }}>
                                        <FiFileText />
                                    </div>
                                    {article.url !== '#' && (
                                        <FiExternalLink style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }} />
                                    )}
                                </div>

                                <span className="article-tag">{article.tag}</span>
                                <h3 className="article-title">{article.title}</h3>
                                <p className="article-excerpt">{article.excerpt}</p>

                                <div className="article-meta">
                                    <span>{article.date}</span>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                                        <FiClock style={{ fontSize: '0.74rem' }} /> {article.readTime}
                                    </span>
                                </div>
                            </a>
                        </ScrollReveal>
                    ))}
                </div>

                {articles.every((a) => a.url === '#') && (
                    <p style={{
                        textAlign: 'center',
                        marginTop: 32,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                    }}>
                        These are placeholders — real article URLs will land here soon.
                    </p>
                )}
            </div>
        </section>
    );
}
