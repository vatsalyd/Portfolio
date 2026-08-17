import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiCompass } from 'react-icons/fi';
import { mapRegions, regionIndex } from '../data/portfolioData';

/**
 * AncientMap — the parchment navigation map.
 *
 * A fixed corner-glyph (compass) opens a full-screen aged-paper overlay where
 * each section of the portfolio is drawn as an ink territory. Clicking a
 * territory smooth-scrolls to that section and closes the map.
 *
 * The map replaces the conventional header/navbar. It is rendered globally,
 * above all content. A faint scroll progress hairline at the very top of the
 * viewport is preserved so the reader keeps a sense of position on the page.
 */
export default function AncientMap() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(mapRegions[0]?.id || '');

    // Track which section is in view so its territory glows on the map.
    useEffect(() => {
        const onScroll = () => {
            const mid = window.innerHeight / 2;
            let best = mapRegions[0]?.id || '';
            let bestDist = Infinity;
            mapRegions.forEach((r) => {
                const el = document.getElementById(r.id);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const dist = Math.abs(rect.top + rect.height / 2 - mid);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = r.id;
                }
            });
            setActive(best);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    // ESC closes; lock scroll while open.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open]);

    const visit = useCallback((id) => {
        setOpen(false);
        window.setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 220);
    }, []);

    return (
        <>
            {/* Scroll progress hairline — sole persistent top indicator */}
            <ScrollHairline />

            {/* Corner glyph trigger */}
            <motion.button
                type="button"
                onClick={() => setOpen(true)}
                className="map-trigger"
                aria-label="Open the map"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
            >
                <span className="map-trigger-glyph">
                    <FiCompass />
                </span>
                <span className="map-trigger-label">Map</span>
            </motion.button>

            {/* Parchment overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="ancient-map-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Parchment map of sections"
                    >
                        <div className="ancient-map-paper">
                            {/* Decorative torn edges + compass rose */}
                            <div className="ancient-map-compass" aria-hidden="true">N</div>
                            <button
                                type="button"
                                className="ancient-map-close"
                                onClick={() => setOpen(false)}
                                aria-label="Close the map"
                            >
                                <FiX />
                            </button>

                            <header className="ancient-map-header">
                                <span className="ancient-map-kicker">Cartographer's Note</span>
                                <h2 className="ancient-map-title">Territories of the Portfolio</h2>
                                <p className="ancient-map-lede">
                                    Eight regions, one map. Tap a territory to set sail for that section.
                                </p>
                            </header>

                            {/* The map itself — scalable parchment with ink regions */}
                            <div className="ancient-map-canvas">
                                <ParchmentSVG
                                    regions={mapRegions}
                                    active={active}
                                    onVisit={visit}
                                />
                            </div>

                            <footer className="ancient-map-footer">
                                <span>Vatsal Yadav · MMXXVI</span>
                                <span className="ancient-map-legend">
                                    <span className="dot" /> Current region
                                </span>
                            </footer>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ── Scroll progress hairline ── */
function ScrollHairline() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement;
            const max = doc.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? window.scrollY / max : 0);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);
    return (
        <div className="scroll-hairline" aria-hidden="true">
            <div className="scroll-hairline-fill" style={{ scaleX: progress }} />
        </div>
    );
}

/* ── Parchment SVG ── */
// A 100x70 viewBox parchment. Regions are ink blobs positioned by data;
// clicking a blob's group triggers the visit handler. The hand-drawn wobble
// is achieved with slightly perturbed quadratic paths.
function ParchmentSVG({ regions, active, onVisit }) {
    return (
        <svg
            className="parchment-svg"
            viewBox="0 0 100 70"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="inkRough" x="-5%" y="-5%" width="110%" height="110%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
                    <feDisplacementMap in="SourceGraphic" in2="n" scale="0.6" />
                </filter>
                <radialGradient id="ageVignette" cx="50%" cy="50%" r="65%">
                    <stop offset="60%" stopColor="rgba(120,80,40,0)" />
                    <stop offset="100%" stopColor="rgba(120,80,40,0.18)" />
                </radialGradient>
            </defs>

            {/* Subtle aged vignette */}
            <rect x="0" y="0" width="100" height="70" fill="url(#ageVignette)" />

            {/* Decorative dotted routes connecting regions in order */}
            <RouteLines regions={regions} />

            {regions.map((r) => {
                const cx = r.x + r.w / 2;
                const cy = r.y + r.h / 2;
                const isActive = active === r.id;
                return (
                    <g
                        key={r.id}
                        className={`parchment-region ${isActive ? 'is-active' : ''}`}
                        onClick={() => onVisit(r.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onVisit(r.id);
                            }
                        }}
                        aria-label={`${r.name} — ${r.subtitle}`}
                    >
                        <path
                            d={blobPath(r.x, r.y, r.w, r.h)}
                            className="parchment-region-blob"
                            filter="url(#inkRough)"
                        />
                        <text
                            x={cx}
                            y={cy - 1.5}
                            textAnchor="middle"
                            className="parchment-region-index"
                        >
                            {regionIndex(r)}
                        </text>
                        <text
                            x={cx}
                            y={cy + 2.4}
                            textAnchor="middle"
                            className="parchment-region-name"
                        >
                            {r.name.toUpperCase()}
                        </text>
                        <text
                            x={cx}
                            y={cy + 5.4}
                            textAnchor="middle"
                            className="parchment-region-sub"
                        >
                            {r.subtitle}
                        </text>
                        {isActive && (
                            <circle
                                cx={cx}
                                cy={cy - 6.5}
                                r="0.8"
                                className="parchment-region-pin"
                            />
                        )}
                    </g>
                );
            })}
        </svg>
    );
}

/* Hand-drawn blob path: a rounded rectangle whose corners are perturbed. */
function blobPath(x, y, w, h) {
    const r = Math.min(w, h) * 0.28;
    const j = 0.8; // jitter amount
    const p = (n) => n + (Math.sin(n * 9.7) * j); // deterministic wobble
    const x2 = x + w, y2 = y + h;
    return [
        `M ${p(x + r)} ${p(y)}`,
        `Q ${p(x)} ${p(y)} ${p(x)} ${p(y + r)}`,
        `L ${p(x)} ${p(y2 - r)}`,
        `Q ${p(x)} ${p(y2)} ${p(x + r)} ${p(y2)}`,
        `L ${p(x2 - r)} ${p(y2)}`,
        `Q ${p(x2)} ${p(y2)} ${p(x2)} ${p(y2 - r)}`,
        `L ${p(x2)} ${p(y + r)}`,
        `Q ${p(x2)} ${p(y)} ${p(x2 - r)} ${p(y)}`,
        'Z',
    ].join(' ');
}

function RouteLines({ regions }) {
    if (regions.length < 2) return null;
    const pts = regions.map((r) => `${r.x + r.w / 2},${r.y + r.h / 2}`);
    return (
        <polyline
            points={pts.join(' ')}
            className="parchment-route"
            pathLength={1}
        />
    );
}
