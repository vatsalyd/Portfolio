import { useState, useEffect } from 'react';
import { FiGitPullRequest, FiAlertCircle, FiAlertTriangle, FiGithub, FiExternalLink } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { githubUser, staticGithubFallback } from '../data/portfolioData';

/**
 * OpenSource — a two-column editorial feed of recent pull requests and issues.
 *
 * Pulls public events from the GitHub REST API every 20 minutes (per-tab
 * session cache), narrows to PullRequestEvent and IssuesEvent, and renders
 * them as two lists: PRs on the left, Issues on the right. If the API
 * rate-limits or fails, falls back to the curated `staticGithubFallback` so
 * the section never goes empty.
 *
 * The previous version shipped a contribution heatmap and a stats strip;
 * those have been removed at the author's request — only PRs and Issues now.
 */
const CACHE_KEY = 'vy-github-prs-issues-v2';
const CACHE_TTL = 1000 * 60 * 20;

function mapPr(event) {
    if (event.type !== 'PullRequestEvent') return null;
    const pr = event.payload?.pull_request;
    if (!pr) return null;
    const isMerged = pr.merged || (pr.state === 'closed' && pr.merged_at);
    return {
        repo: event.repo?.name,
        title: pr.title,
        state: isMerged ? 'merged' : pr.state,
        createdAt: event.created_at,
        url: pr.html_url,
    };
}

function mapIssue(event) {
    if (event.type !== 'IssuesEvent') return null;
    const issue = event.payload?.issue;
    if (!issue) return null;
    return {
        repo: event.repo?.name,
        title: issue.title,
        state: issue.state,
        action: event.payload?.action,
        createdAt: event.created_at,
        url: issue.html_url,
    };
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
    const cached = readCache();
    const [prs, setPrs] = useState(cached?.prs ?? []);
    const [issues, setIssues] = useState(cached?.issues ?? []);
    const [loading, setLoading] = useState(!cached);
    const [status, setStatus] = useState('ok'); // ok | rate | err

    useEffect(() => {
        let cancelled = false;
        if (cached) return () => { cancelled = true; };

        (async () => {
            try {
                const res = await fetch(`https://api.github.com/users/${githubUser}/events/public`);
                if (cancelled) return;
                if (res.status === 403 || res.status === 429) {
                    setPrs(staticGithubFallback.prs);
                    setIssues(staticGithubFallback.issues);
                    setStatus('rate');
                    setLoading(false);
                    return;
                }
                if (!res.ok) {
                    setPrs(staticGithubFallback.prs);
                    setIssues(staticGithubFallback.issues);
                    setStatus('err');
                    setLoading(false);
                    return;
                }
                const events = await res.json();
                if (cancelled) return;
                if (!Array.isArray(events)) {
                    setPrs(staticGithubFallback.prs);
                    setIssues(staticGithubFallback.issues);
                    setStatus('err');
                    setLoading(false);
                    return;
                }
                const mappedPrs = events.map(mapPr).filter(Boolean).slice(0, 6);
                const mappedIssues = events.map(mapIssue).filter(Boolean).slice(0, 6);
                const displayPrs = mappedPrs.length > 0 ? mappedPrs : staticGithubFallback.prs.slice(0, 4);
                const displayIssues = mappedIssues.length > 0 ? mappedIssues : staticGithubFallback.issues.slice(0, 3);
                setPrs(displayPrs);
                setIssues(displayIssues);
                setStatus('ok');
                setLoading(false);
                try {
                    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
                        ts: Date.now(),
                        prs: displayPrs,
                        issues: displayIssues,
                    }));
                } catch { /* quota */ }
            } catch {
                if (cancelled) return;
                setPrs(staticGithubFallback.prs);
                setIssues(staticGithubFallback.issues);
                setStatus('err');
                setLoading(false);
            }
        })();

        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <EditorialSection
            id="opensource"
            ghost="OPEN SOURCE"
            eyebrowIndex="02"
            eyebrowLabel="OPEN SOURCE"
        >
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Live from GitHub</span>
                        <h2 className="section-title">Pull Requests & Issues</h2>
                        <p className="section-subtitle">
                            A live feed of recent pull requests and issues, pulled from the GitHub REST API and cached for 20 minutes.
                        </p>
                    </div>
                </ScrollReveal>

                {(status === 'rate' || status === 'err') && (
                    <div className="os-notice">
                        <FiAlertTriangle />
                        {status === 'rate'
                            ? 'GitHub API rate-limited (no auth token). Showing curated fallback items.'
                            : "Couldn't reach GitHub right now. Showing curated fallback items."}
                    </div>
                )}

                <div className="os-grid">
                    {/* PRs column */}
                    <ScrollReveal variant="fadeLeft" delay={0.1}>
                        <div className="os-card">
                            <div className="os-card-head">
                                <FiGitPullRequest /> Pull Requests
                                <span className="os-count">{loading ? '…' : prs.length}</span>
                            </div>

                            {loading ? (
                                <div className="os-skeleton-list">
                                    <div className="os-skeleton-card" />
                                    <div className="os-skeleton-card" />
                                    <div className="os-skeleton-card" />
                                </div>
                            ) : (
                                <div className="os-list">
                                    {prs.map((pr, i) => (
                                        <OSSubItem key={`pr-${i}`} item={pr} kind="pr" />
                                    ))}
                                    {prs.length === 0 && (
                                        <p className="os-empty">No recent public pull requests.</p>
                                    )}
                                </div>
                            )}

                            {!loading && prs.length > 0 && (
                                <a
                                    href={`https://github.com/${githubUser}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glow-btn-outline os-foot-action"
                                >
                                    <FiGithub /> View GitHub Profile
                                </a>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Issues column */}
                    <ScrollReveal variant="fadeRight" delay={0.2}>
                        <div className="os-card">
                            <div className="os-card-head">
                                <FiAlertCircle /> Issues
                                <span className="os-count">{loading ? '…' : issues.length}</span>
                            </div>

                            {loading ? (
                                <div className="os-skeleton-list">
                                    <div className="os-skeleton-card" />
                                    <div className="os-skeleton-card" />
                                    <div className="os-skeleton-card" />
                                </div>
                            ) : (
                                <div className="os-list">
                                    {issues.map((issue, i) => (
                                        <OSSubItem key={`issue-${i}`} item={issue} kind="issue" />
                                    ))}
                                    {issues.length === 0 && (
                                        <p className="os-empty">No recent issues from public events.</p>
                                    )}
                                </div>
                            )}

                            {!loading && issues.length > 0 && (
                                <a
                                    href={`https://github.com/${githubUser}?tab=issues`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glow-btn-outline os-foot-action"
                                >
                                    <FiExternalLink /> Browse Issues
                                </a>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </EditorialSection>
    );
}

/* ── One PR/issue row ── */
function OSSubItem({ item, kind }) {
    const date = new Date(item.createdAt);
    const dateLabel = Number.isNaN(date.getTime())
        ? ''
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const href = item.url || `https://github.com/${item.repo}`;
    const state = item.state; // 'open' | 'closed' | 'merged'
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`os-item ${kind}`}
        >
            <div className="os-item-repo">{item.repo}</div>
            <div className="os-item-title">{item.title}</div>
            <div className="os-item-meta">
                <span className={`pr-badge ${state}`}>{state}</span>
                <span className="os-item-date">{dateLabel}</span>
            </div>
        </a>
    );
}
