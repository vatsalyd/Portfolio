import { FiExternalLink, FiClock, FiFileText, FiPenTool } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { articles, mediumUser } from '../data/portfolioData';

/**
 * Articles — a cleaning-sensitive grid of writing entries.
 *
 * Each article card supports three states:
 *   1. `url` set -> rendered as an outbound anchor that opens the article
 *      (usually a Medium post) in a new tab.
 *   2. `url` null -> rendered as a "draft" card with a Draft pill in place
 *      of the external-link affordance, so it's visually clear which
 *      pieces are published yet.
 *   3. `coverImage` set -> the article cover uses the image instead of a
 *      typographic glyph.
 *
 * The card grid uses the shared `.article-card` styles from index.css so
 * the layout stays consistent with everything else in the design system.
 */
export default function Articles() {
    const published = articles.filter((a) => a.url);
    const drafts = articles.filter((a) => !a.url);

    return (
        <EditorialSection
            id="articles"
            ghost="NOTES"
            eyebrowIndex="06"
            eyebrowLabel="NOTES"
        >
            <div className="container articles-container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Writing</span>
                        <h2 className="section-title">Articles & Notes</h2>
                        <p className="section-subtitle">
                            Long-form writing on multi-agent systems, ML engineering, and what I learned shipping each project. Pieces marked Draft are queued for publication on Medium.
                        </p>
                    </div>
                </ScrollReveal>

                {published.length > 0 && (
                    <div className="articles-grid">
                        {published.map((article, i) => (
                            <ScrollReveal key={article.title} delay={i < 3 ? i * 0.05 : 0}>
                                <ArticleCard article={article} published />
                            </ScrollReveal>
                        ))}
                    </div>
                )}

                {drafts.length > 0 && (
                    <>
                        {published.length > 0 && (
                            <div className="articles-divider">
                                <span className="articles-divider-label">Drafts · {drafts.length}</span>
                                <span className="articles-divider-line" />
                            </div>
                        )}
                        <div className="articles-grid">
                            {drafts.map((article, i) => (
                                <ScrollReveal key={article.title} delay={i < 3 ? i * 0.05 : 0}>
                                    <ArticleCard article={article} published={false} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </>
                )}

                {mediumUser && (
                    <a
                        href={`https://medium.com/@${mediumUser}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glow-btn-outline articles-medium-cta"
                    >
                        <FiPenTool /> Read more on Medium
                    </a>
                )}
            </div>
        </EditorialSection>
    );
}

/* ── One article card with rich hover preview ── */
function ArticleCard({ article, published }) {
    const Wrapper = published ? 'a' : 'div';
    const wrapperProps = published
        ? { href: article.url, target: '_blank', rel: 'noopener noreferrer' }
        : { 'aria-label': `Draft: ${article.title}` };

    return (
        <Wrapper
            {...wrapperProps}
            className={`article-card ${published ? 'is-published' : 'is-draft'}`}
        >
            {/* Title Image Cover Container */}
            <div className="article-cover">
                {article.coverImage ? (
                    <img src={`${import.meta.env.BASE_URL}${article.coverImage}`} alt={article.title} className="article-cover-img" />
                ) : (
                    <div className="article-cover-placeholder">
                        <span className="article-cover-glyph" aria-hidden="true">
                            <FiFileText />
                        </span>
                        <span className="article-cover-tag">{article.tag}</span>
                    </div>
                )}

                {published ? (
                    <span className="article-medium-badge">
                        Medium ↗
                    </span>
                ) : (
                    <span className="article-draft-pill">Upcoming</span>
                )}
            </div>

            {/* Main Card Body */}
            <div className="article-body">
                <div className="article-tag-row">
                    <span className="article-tag">{article.tag}</span>
                    <span className="article-readtime"><FiClock style={{ fontSize: '0.72rem' }} /> {article.readTime}</span>
                </div>

                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>

                <div className="article-meta">
                    <span>{article.date}</span>
                    {published && (
                        <span className="article-read-link">
                            Read on Medium <FiExternalLink style={{ fontSize: '0.78rem' }} />
                        </span>
                    )}
                </div>
            </div>

            {/* Interactive Hover Preview Drawer */}
            {published && (
                <div className="article-hover-preview">
                    <div className="article-preview-header">
                        <span className="article-preview-kicker">// ARTICLE PREVIEW</span>
                        <span className="article-preview-badge">Medium</span>
                    </div>
                    <h4 className="article-preview-title">{article.title}</h4>
                    <p className="article-preview-excerpt">{article.excerpt}</p>
                    {article.highlights && article.highlights.length > 0 && (
                        <ul className="article-preview-highlights">
                            {article.highlights.map((h, idx) => (
                                <li key={idx}>⚡ {h}</li>
                            ))}
                        </ul>
                    )}
                    <div className="article-preview-action">
                        <span>Click to read on Medium</span>
                        <FiExternalLink />
                    </div>
                </div>
            )}
        </Wrapper>
    );
}
