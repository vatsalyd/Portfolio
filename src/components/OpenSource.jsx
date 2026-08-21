import { useState, useEffect } from 'react';
import {
    FiGitPullRequest,
    FiAlertCircle,
    FiAlertTriangle,
    FiExternalLink,
    FiGlobe,
    FiLayers,
} from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { githubUser, staticGithubFallback } from '../data/portfolioData';

/**
 * OpenSource — Live, automated feed of public Pull Requests and Issues on GitHub.
 *
 * Defaults to external/outside repositories (contributions to other open-source projects).
 * Includes a "See All" toggle to view all PRs & issues (including personal repos).
 * Every card redirects directly to the exact PR/Issue page in a new tab.
 */
function extractRepoName(item) {
    if (item.repo) return item.repo;
    if (item.repository_url) {
        const parts = item.repository_url.split('/repos/');
        if (parts.length > 1) return parts[1];
    }
    if (item.html_url) {
        const match = item.html_url.match(/github\.com\/([^/]+\/[^/]+)/);
        if (match) return match[1];
    }
    return 'open-source/repo';
}

function parseItem(item, type) {
    const repo = extractRepoName(item);
    const isMerged = item.pull_request?.merged_at ||
                     item.state === 'merged' ||
                     (type === 'pr' && item.state === 'closed' && (item.merged || item.pull_request));
    const isOutside = !repo.toLowerCase().startsWith(`${githubUser.toLowerCase()}/`);

    return {
        repo,
        title: item.title,
        state: isMerged ? 'merged' : item.state,
        createdAt: item.created_at || item.createdAt || new Date().toISOString(),
        url: item.html_url || item.url || `https://github.com/${repo}`,
        isOutside,
    };
}

export default function OpenSource() {
    const initialPrs = staticGithubFallback?.allPrs || [];
    const initialIssues = staticGithubFallback?.allIssues || [];

    const [allPrs, setAllPrs] = useState(initialPrs);
    const [allIssues, setAllIssues] = useState(initialIssues);
    const [scope, setScope] = useState('outside'); // 'outside' (default) | 'all'
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('ok'); // 'ok' | 'rate' | 'err'

    // Automatically fetch live GitHub data whenever the component loads
    useEffect(() => {
        let isMounted = true;

        async function fetchGitHubFeed() {
            setLoading(true);
            try {
                const [prRes, issueRes] = await Promise.all([
                    fetch(`https://api.github.com/search/issues?q=author:${githubUser}+type:pr&sort=created&order=desc&per_page=30`),
                    fetch(`https://api.github.com/search/issues?q=author:${githubUser}+type:issue&sort=created&order=desc&per_page=30`),
                ]);

                if (!isMounted) return;

                if (prRes.status === 403 || prRes.status === 429 || issueRes.status === 403 || issueRes.status === 429) {
                    setStatus('rate');
                    setAllPrs(staticGithubFallback.allPrs);
                    setAllIssues(staticGithubFallback.allIssues);
                    setLoading(false);
                    return;
                }

                if (!prRes.ok && !issueRes.ok) {
                    setStatus('err');
                    setAllPrs(staticGithubFallback.allPrs);
                    setAllIssues(staticGithubFallback.allIssues);
                    setLoading(false);
                    return;
                }

                const prData = prRes.ok ? await prRes.json() : { items: [] };
                const issueData = issueRes.ok ? await issueRes.json() : { items: [] };

                if (!isMounted) return;

                const parsedPrs = (prData.items || []).map((item) => parseItem(item, 'pr'));
                const parsedIssues = (issueData.items || []).map((item) => parseItem(item, 'issue'));

                setAllPrs(parsedPrs.length > 0 ? parsedPrs : staticGithubFallback.allPrs);
                setAllIssues(parsedIssues.length > 0 ? parsedIssues : staticGithubFallback.allIssues);
                setStatus('ok');
                setLoading(false);
            } catch {
                if (!isMounted) return;
                setAllPrs(staticGithubFallback.allPrs);
                setAllIssues(staticGithubFallback.allIssues);
                setStatus('err');
                setLoading(false);
            }
        }

        fetchGitHubFeed();

        return () => {
            isMounted = false;
        };
    }, []);

    // Filter by outside repos vs all repos
    const displayPrs = scope === 'outside'
        ? allPrs.filter((p) => p.isOutside || !p.repo.toLowerCase().startsWith(`${githubUser.toLowerCase()}/`))
        : allPrs;

    const displayIssues = scope === 'outside'
        ? allIssues.filter((i) => i.isOutside || !i.repo.toLowerCase().startsWith(`${githubUser.toLowerCase()}/`))
        : allIssues;

    const outsideCount = allPrs.filter((p) => p.isOutside || !p.repo.toLowerCase().startsWith(`${githubUser.toLowerCase()}/`)).length +
                         allIssues.filter((i) => i.isOutside || !i.repo.toLowerCase().startsWith(`${githubUser.toLowerCase()}/`)).length;
    const totalCount = allPrs.length + allIssues.length;

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
                        <span className="section-label">// Live Open Source Contributions</span>
                        <h2 className="section-title">Pull Requests & Issues</h2>
                        <p className="section-subtitle">
                            Live feed of my open-source work across outside repositories. Click any card to open the exact pull request or issue directly on GitHub.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Scope Switcher Toolbar */}
                <div className="os-toolbar">
                    <div className="os-scope-toggle">
                        <button
                            type="button"
                            className={`os-scope-btn ${scope === 'outside' ? 'active' : ''}`}
                            onClick={() => setScope('outside')}
                        >
                            <FiGlobe /> Outside Repositories
                            <span className="os-scope-count">{outsideCount}</span>
                        </button>

                        <button
                            type="button"
                            className={`os-scope-btn ${scope === 'all' ? 'active' : ''}`}
                            onClick={() => setScope('all')}
                        >
                            <FiLayers /> See All (Including Own Repos)
                            <span className="os-scope-count">{totalCount}</span>
                        </button>
                    </div>
                </div>

                {/* Rate limit / offline warning notice if applicable */}
                {(status === 'rate' || status === 'err') && (
                    <div className="os-notice">
                        <FiAlertTriangle />
                        {status === 'rate'
                            ? 'GitHub API rate-limited unauthenticated traffic. Showing verified contribution history.'
                            : "Could not reach GitHub live right now. Showing verified contribution history."}
                    </div>
                )}

                <div className="os-grid">
                    {/* PRs column */}
                    <ScrollReveal variant="fadeLeft" delay={0.1}>
                        <div className="os-card">
                            <div className="os-card-head">
                                <div className="os-head-title">
                                    <FiGitPullRequest /> Pull Requests
                                </div>
                                <span className="os-count">{loading ? '…' : displayPrs.length}</span>
                            </div>

                            {loading ? (
                                <div className="os-skeleton-list">
                                    <div className="os-skeleton-card" />
                                    <div className="os-skeleton-card" />
                                    <div className="os-skeleton-card" />
                                </div>
                            ) : (
                                <div className="os-list">
                                    {displayPrs.map((pr, i) => (
                                        <OSSubItem key={`pr-${i}-${pr.url}`} item={pr} kind="pr" />
                                    ))}
                                    {displayPrs.length === 0 && (
                                        <p className="os-empty">No pull requests found for this filter.</p>
                                    )}
                                </div>
                            )}

                            {!loading && (
                                <a
                                    href={`https://github.com/pulls?q=is%3Apr+author%3A${githubUser}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glow-btn-outline os-foot-action"
                                >
                                    <FiExternalLink /> View All PRs on GitHub
                                </a>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Issues column */}
                    <ScrollReveal variant="fadeRight" delay={0.2}>
                        <div className="os-card">
                            <div className="os-card-head">
                                <div className="os-head-title">
                                    <FiAlertCircle /> Issues
                                </div>
                                <span className="os-count">{loading ? '…' : displayIssues.length}</span>
                            </div>

                            {loading ? (
                                <div className="os-skeleton-list">
                                    <div className="os-skeleton-card" />
                                    <div className="os-skeleton-card" />
                                    <div className="os-skeleton-card" />
                                </div>
                            ) : (
                                <div className="os-list">
                                    {displayIssues.map((issue, i) => (
                                        <OSSubItem key={`issue-${i}-${issue.url}`} item={issue} kind="issue" />
                                    ))}
                                    {displayIssues.length === 0 && (
                                        <p className="os-empty">No issues found for this filter.</p>
                                    )}
                                </div>
                            )}

                            {!loading && (
                                <a
                                    href={`https://github.com/issues?q=is%3Aissue+author%3A${githubUser}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glow-btn-outline os-foot-action"
                                >
                                    <FiExternalLink /> View All Issues on GitHub
                                </a>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </EditorialSection>
    );
}

/* ── Interactive PR / Issue Card with direct redirect link in new tab ── */
function OSSubItem({ item, kind }) {
    const date = new Date(item.createdAt);
    const dateLabel = Number.isNaN(date.getTime())
        ? ''
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const href = item.url || `https://github.com/${item.repo}`;
    const state = item.state || 'open'; // 'open' | 'closed' | 'merged'

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`os-item ${kind}`}
            title={`Open ${item.title} on GitHub (new tab)`}
        >
            <div className="os-item-top">
                <div className="os-item-repo">{item.repo}</div>
                <FiExternalLink className="os-item-ext-icon" />
            </div>
            <div className="os-item-title">{item.title}</div>
            <div className="os-item-meta">
                <span className={`pr-badge ${state}`}>{state}</span>
                {dateLabel && <span className="os-item-date">{dateLabel}</span>}
            </div>
        </a>
    );
}
