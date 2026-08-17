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

/* ── One article card ── */
function ArticleCard({ article, published }) {
    const Wrapper = published ? 'a' : 'div';
    const wrapperProps = published
        ? { href: article.url, target: '_blank', rel: 'noopener noreferrer' }
        : { 'aria-label': `Draft: ${article.title}` };

    return (
        <Wrapper
            {...wrapperProps}
            className="article-card"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <div className="article-cover">
                {article.coverImage ? (
                    <img src={article.coverImage} alt="" />
                ) : (
                    <span className="article-cover-glyph" aria-hidden="true">
                        <FiFileText />
                    </span>
                )}
                {!published && <span className="article-draft-pill">Draft</span>}
            </div>

            <div className="article-body">
                <span className="article-tag">{article.tag}</span>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>

                <div className="article-meta">
                    <span>{article.date}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        {published ? (
                            <FiExternalLink style={{ fontSize: '0.78rem' }} />
                        ) : null}
                        <FiClock style={{ fontSize: '0.74rem' }} /> {article.readTime}
                    </span>
                </div>
            </div>
        </Wrapper>
    );
}
