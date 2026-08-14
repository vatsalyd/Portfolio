import { useState, useEffect, useRef } from 'react';
import { FiGitPullRequest, FiStar, FiActivity, FiGithub, FiAlertTriangle } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import {
    githubUser,
    staticGithubFallback,
} from '../data/portfolioData';

const CACHE_KEY = 'vy-github-events-v1';
const CACHE_TTL = 1000 * 60 * 20;

function mapEventToPr(event) {
    if (event.type !== 'PullRequestEvent') return null;
    const pr = event.payload?.pull_request;
    if (!pr) return null;
    const state = pr.merged ? 'merged' : pr.state;
    const isMerged = pr.merged || (pr.state === 'closed' && pr.merged_at);
    return {
        repo: event.repo?.name,
        title: pr.title,
        state: isMerged ? 'merged' : state,
        createdAt: event.created_at,
        url: pr.html_url,
    };
}

function buildHeatmap(events) {
    const cells = new Array(7 * 26).fill(0);
    const today = Date.now();
    const halfYearMs = 1000 * 60 * 60 * 24 * 180;
    events.forEach((ev) => {
        const ts = new Date(ev.created_at).getTime();
        if (Number.isNaN(ts)) return;
        if (ts < today - halfYearMs) return;
        const daysAgo = Math.floor((today - ts) / (1000 * 60 * 60 * 24));
        const idx = cells.length - 1 - daysAgo;
        if (idx < 0 || idx >= cells.length) return;
        cells[idx] += 1;
    });
    const max = Math.max(1, ...cells);
    return cells.map((c) => (c === 0 ? 0 : Math.ceil((c / max) * 4)));
}

function readCache() {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.ts > CACHE_TTL) return null;
        return parsed;
    } catch {
        return null;
    }
}

export default function OpenSource() {
    const initial = readCache();
    const [prs, setPrs] = useState(initial?.prs ?? []);
    const [heatmap, setHeatmap] = useState(initial?.heatmap ?? []);
    const [loading, setLoading] = useState(!initial);
    const [err, setErr] = useState(false);
    const [rateLimited, setRateLimited] = useState(false);
    const [eventCount, setEventCount] = useState(initial?.eventCount ?? 0);
    const fallbackRef = useRef(false);

    const applyFallback = (reason) => {
        fallbackRef.current = true;
        setPrs(staticGithubFallback.prs);
        setHeatmap(staticGithubFallback.heatmap);
        setEventCount(staticGithubFallback.prs.length);
        setLoading(false);
        if (reason === 'rate') setRateLimited(true);
        else setErr(true);
    };

    useEffect(() => {
        let cancelled = false;

        if (initial) {
            return () => { cancelled = true; };
        }

        (async () => {
            try {
                const res = await fetch(`https://api.github.com/users/${githubUser}/events/public`);
                if (cancelled) return;
                if (res.status === 403 || res.status === 429) {
                    applyFallback('rate');
                    return;
                }
                if (!res.ok) {
                    applyFallback('http');
                    return;
                }
                const events = await res.json();
                if (cancelled) return;
                if (!Array.isArray(events)) {
                    applyFallback('shape');
                    return;
                }
                const mapped = events
                    .map(mapEventToPr)
                    .filter(Boolean)
                    .slice(0, 6);
                const heat = buildHeatmap(events);
                const displayPrs = mapped.length > 0 ? mapped : staticGithubFallback.prs.slice(0, 4);
                setPrs(displayPrs);
                setHeatmap(heat.length ? heat : staticGithubFallback.heatmap);
                setEventCount(events.length);
                setLoading(false);
                try {
                    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
                        ts: Date.now(),
                        prs: displayPrs,
                        heatmap: heat,
                        eventCount: events.length,
                    }));
                } catch { /* quota */ }
            } catch {
                if (!cancelled) applyFallback('network');
            }
        })();

        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <EditorialSection
            id="opensource"
            ghost="OPEN SOURCE"
            eyebrowIndex="03"
            eyebrowLabel="OPEN SOURCE"
        >
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Live from GitHub</span>
                        <h2 className="section-title">Open Source Activity</h2>
                        <p className="section-subtitle">
                            Self-updating feed of recent pull requests and contribution heat — pulled live from the GitHub REST API. Cached for 20 minutes.
                        </p>
                    </div>
                </ScrollReveal>

                {(rateLimited || err) && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        maxWidth: 720,
                        margin: '0 auto 28px',
                        padding: '12px 16px',
                        borderRadius: 'var(--border-radius-sm)',
                        background: 'rgba(232, 146, 43, 0.1)',
                        border: '1px solid rgba(232, 146, 43, 0.3)',
                        color: 'var(--accent-amber)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                    }}>
                        <FiAlertTriangle style={{ flexShrink: 0 }} />
                        {rateLimited
                            ? "GitHub API rate-limited (no auth token). Showing cached / static fallback data."
                            : "Couldn't reach GitHub API right now. Showing static fallback data."}
                    </div>
                )}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 32,
                    maxWidth: 960,
                    margin: '0 auto',
                    alignItems: 'stretch',
                }} className="os-grid">
                    {/* Left: recent PRs */}
                    <ScrollReveal variant="fadeLeft" delay={0.1}>
                        <div className="glass-card" style={{ padding: 24, height: '100%' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                marginBottom: 18,
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.74rem',
                                color: 'var(--accent-cyan)',
                                textTransform: 'uppercase',
                                letterSpacing: 1.5,
                            }}>
                                <FiGitPullRequest /> Recent Pull Requests
                            </div>

                            {loading ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <div className="os-skeleton-card" />
                                    <div className="os-skeleton-card" />
                                    <div className="os-skeleton-card" />
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {prs.map((pr, i) => {
                                        const date = new Date(pr.createdAt);
                                        const dateLabel = Number.isNaN(date.getTime())
                                            ? ''
                                            : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                                        return (
                                            <a
                                                key={i}
                                                href={pr.url || `https://github.com/${pr.repo}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 6,
                                                    padding: '14px 16px',
                                                    borderRadius: 'var(--border-radius-sm)',
                                                    background: 'var(--bg-secondary)',
                                                    border: '1px solid rgba(26,26,26,0.08)',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.25s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(202,130,248,0.4)';
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(26,26,26,0.08)';
                                                    e.currentTarget.style.transform = 'none';
                                                }}
                                            >
                                                <div style={{
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '0.7rem',
                                                    color: 'var(--text-muted)',
                                                    wordBreak: 'break-all',
                                                }}>
                                                    {pr.repo}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'var(--font-display)',
                                                    fontSize: '0.9rem',
                                                    color: 'var(--text-primary)',
                                                    fontWeight: 600,
                                                    lineHeight: 1.4,
                                                }}>
                                                    {pr.title}
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                                                    <span className={`pr-badge ${pr.state}`}>{pr.state}</span>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                                        {dateLabel}
                                                    </span>
                                                </div>
                                            </a>
                                        );
                                    })}
                                    {prs.length === 0 && (
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', padding: '12px 4px' }}>
                                            No recent public PRs found — but you can browse the repos directly.
                                        </p>
                                    )}
                                </div>
                            )}

                            {prs.length > 0 && !loading && (
                                <a
                                    href={`https://github.com/${githubUser}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glow-btn-outline"
                                    style={{ marginTop: 18, padding: '9px 18px', fontSize: '0.8rem' }}
                                >
                                    <FiGithub /> View GitHub Profile
                                </a>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Right: stats + heatmap */}
                    <ScrollReveal variant="fadeRight" delay={0.2}>
                        <div className="glass-card" style={{ padding: 24, height: '100%' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                marginBottom: 18,
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.74rem',
                                color: 'var(--accent-cyan)',
                                textTransform: 'uppercase',
                                letterSpacing: 1.5,
                            }}>
                                <FiActivity /> Contribution Heat
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                                <div style={{
                                    padding: 14,
                                    borderRadius: 'var(--border-radius-sm)',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid rgba(26,26,26,0.08)',
                                }}>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.66rem',
                                        color: 'var(--text-muted)',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1,
                                        marginBottom: 4,
                                    }}>Recent Events</div>
                                    <div style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        color: 'var(--accent-violet)',
                                    }}>
                                        {loading ? '…' : eventCount}
                                    </div>
                                </div>
                                <div style={{
                                    padding: 14,
                                    borderRadius: 'var(--border-radius-sm)',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid rgba(26,26,26,0.08)',
                                }}>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.66rem',
                                        color: 'var(--text-muted)',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1,
                                        marginBottom: 4,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 4,
                                    }}><FiStar /> Repos</div>
                                    <div style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        color: 'var(--accent-cyan)',
                                    }}>
                                        {staticGithubFallback.repos}
                                    </div>
                                </div>
                            </div>

                            {/* Heatmap */}
                            <div className="heatmap-grid" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)' }}>
                                {(loading ? staticGithubFallback.heatmap : heatmap).map((level, i) => (
                                    <div
                                        key={i}
                                        className={`heatmap-cell ${level > 0 ? `l${level}` : ''}`}
                                        title={level > 0 ? `${level} contributions` : 'No activity'}
                                    />
                                ))}
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: 6,
                                marginTop: 10,
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.66rem',
                                color: 'var(--text-muted)',
                            }}>
                                Less
                                <div className="heatmap-cell" />
                                <div className="heatmap-cell l1" />
                                <div className="heatmap-cell l2" />
                                <div className="heatmap-cell l3" />
                                <div className="heatmap-cell l4" />
                                More
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                <style>{`
                    @media (max-width: 820px) {
                        .os-grid { grid-template-columns: 1fr !important; }
                    }
                `}</style>
            </div>
        </EditorialSection>
    );
}