import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FiX,
    FiCompass,
    FiArrowRight,
    FiMap,
    FiTerminal,
    FiGitBranch,
    FiCpu,
    FiLayers,
    FiBriefcase,
    FiCalendar,
    FiFileText,
    FiFilm,
    FiSend,
    FiUser,
    FiShield,
} from 'react-icons/fi';
import { mapRegions } from '../data/portfolioData';

const CATEGORIES = [
    { id: 'all', label: 'All Sections', ids: null },
    { id: 'systems', label: 'Systems & Agent', ids: ['hero', 'agent', 'opensource', 'skills'] },
    { id: 'engineering', label: 'Engineering & Events', ids: ['projects', 'experience', 'landscape'] },
    { id: 'writing-culture', label: 'Writing & Channels', ids: ['articles', 'characters', 'taste', 'contact'] },
];

export default function AncientMap() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(mapRegions[0]?.id || 'hero');
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Track active section in viewport
    useEffect(() => {
        const onScroll = () => {
            const mid = window.innerHeight / 2;
            let best = mapRegions[0]?.id || 'hero';
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
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ESC closes; keyboard navigation
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const curIdx = mapRegions.findIndex((r) => r.id === (hoveredRegion?.id || active));
                const nextIdx = (curIdx + 1) % mapRegions.length;
                setHoveredRegion(mapRegions[nextIdx]);
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const curIdx = mapRegions.findIndex((r) => r.id === (hoveredRegion?.id || active));
                const prevIdx = (curIdx - 1 + mapRegions.length) % mapRegions.length;
                setHoveredRegion(mapRegions[prevIdx]);
            }
            if (e.key === 'Enter' && hoveredRegion) {
                visit(hoveredRegion.id);
            }
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, hoveredRegion, active]);

    // Smooth scroll to section
    const visit = useCallback((id) => {
        setOpen(false);
        window.setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }, 180);
    }, []);

    const activeRegionObj = useMemo(() => {
        return mapRegions.find((r) => r.id === active) || mapRegions[0];
    }, [active]);

    const filteredIds = useMemo(() => {
        const cat = CATEGORIES.find((c) => c.id === selectedCategory);
        return cat && cat.ids ? cat.ids : mapRegions.map((r) => r.id);
    }, [selectedCategory]);

    return (
        <>
            {/* Scroll progress bar */}
            <ScrollHairline />

            {/* ── Minimal Peeking Drawer ── */}
            <aside
                className="peeking-map-drawer"
                onClick={() => setOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Open portfolio navigation map"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
            >
                <div className="peeking-map-handle">
                    <span className="peeking-compass-glyph">
                        <FiCompass className="compass-spin-icon" />
                    </span>
                    <span className="peeking-vertical-label">MAP</span>
                    <span className="peeking-active-indicator" />
                </div>
            </aside>

            {/* ── Fullscreen Map Modal ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="illustrated-map-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Portfolio Navigation Map"
                        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
                    >
                        <motion.div
                            className="illustrated-map-paper"
                            initial={{ scale: 0.96, opacity: 0, y: 12 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.97, opacity: 0, y: 8 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Header */}
                            <div className="illustrated-map-topbar">
                                <div className="map-badge-group">
                                    <FiMap style={{ fontSize: '1.15rem', color: 'var(--accent-violet-dim)' }} />
                                    <div className="map-title-block">
                                        <h2 className="map-main-title">PORTFOLIO INDEX MAP</h2>
                                        <span className="map-sub-title">Direct teleportation across all 11 technical sections</span>
                                    </div>
                                </div>

                                <div className="map-topbar-actions">
                                    <div className="map-category-filter">
                                        {CATEGORIES.map((c) => (
                                            <button
                                                key={c.id}
                                                type="button"
                                                onClick={() => setSelectedCategory(c.id)}
                                                className={`map-cat-chip ${selectedCategory === c.id ? 'is-active' : ''}`}
                                            >
                                                {c.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="map-legend-capsule">
                                        <span className="legend-dot active-dot" />
                                        <span>Current: {activeRegionObj.name}</span>
                                    </div>

                                    <button
                                        type="button"
                                        className="map-close-button"
                                        onClick={() => setOpen(false)}
                                        aria-label="Close map"
                                        title="Close (ESC)"
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            </div>

                            {/* Map Canvas */}
                            <div className="illustrated-map-canvas-wrap">
                                <CityMapSVG
                                    regions={mapRegions}
                                    active={active}
                                    hoveredRegion={hoveredRegion}
                                    setHoveredRegion={setHoveredRegion}
                                    filteredIds={filteredIds}
                                    onVisit={visit}
                                />

                                {/* Hover tooltip */}
                                <AnimatePresence>
                                    {hoveredRegion && (
                                        <motion.div
                                            className="map-floating-card"
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 4 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <div className="card-header-row">
                                                <span className="card-district-badge">SECTION {hoveredRegion.index}</span>
                                                <span className="card-road-tag">{hoveredRegion.road}</span>
                                            </div>
                                            <h4 className="card-title">{hoveredRegion.name}</h4>
                                            <div className="card-subtitle">{hoveredRegion.subtitle}</div>
                                            <p className="card-desc">{hoveredRegion.desc}</p>
                                            <button
                                                type="button"
                                                onClick={() => visit(hoveredRegion.id)}
                                                className="card-sail-btn"
                                            >
                                                <span>Jump to Section</span>
                                                <FiArrowRight />
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Quick jump chips */}
                            <div className="illustrated-map-infobar">
                                <div className="map-quick-links-track">
                                    {mapRegions.map((r) => (
                                        <button
                                            key={r.id}
                                            type="button"
                                            onClick={() => visit(r.id)}
                                            className={`map-chip-btn ${active === r.id ? 'is-active' : ''} ${hoveredRegion?.id === r.id ? 'is-hovered' : ''}`}
                                            onMouseEnter={() => setHoveredRegion(r)}
                                            onMouseLeave={() => setHoveredRegion(null)}
                                        >
                                            <span className="chip-idx">{r.index}</span>
                                            <span className="chip-name">{r.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ── Scroll Progress Indicator ── */
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
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <div className="scroll-hairline" aria-hidden="true">
            <div className="scroll-hairline-fill" style={{ scaleX: progress }} />
        </div>
    );
}

/* ── Full City Map SVG ── */
function CityMapSVG({ regions, active, hoveredRegion, setHoveredRegion, filteredIds, onVisit }) {
    const activeRegion = regions.find((r) => r.id === active) || regions[0];

    // Trajectory line from active to hovered
    const trajectoryPath = useMemo(() => {
        if (!hoveredRegion || hoveredRegion.id === active) return null;
        const x1 = (activeRegion.x / 100) * 1000;
        const y1 = (activeRegion.y / 100) * 680;
        const x2 = (hoveredRegion.x / 100) * 1000;
        const y2 = (hoveredRegion.y / 100) * 680;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2 - 40;
        return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
    }, [activeRegion, hoveredRegion, active]);

    return (
        <svg
            viewBox="0 0 1000 680"
            className="city-map-svg"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="landmarkShadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(45, 49, 53, 0.2)" />
                </filter>
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c8d8dd" />
                    <stop offset="50%" stopColor="#d5e2e6" />
                    <stop offset="100%" stopColor="#c0d2d8" />
                </linearGradient>
            </defs>

            {/* Base Paper */}
            <rect width="1000" height="680" fill="#f4efe6" />

            {/* Waterway */}
            <path
                d="M 120 540 C 260 520, 480 570, 680 530 C 820 500, 920 520, 1000 500 L 1000 680 L 0 680 L 0 570 Z"
                fill="url(#riverGrad)"
            />

            {/* Subtle ripples */}
            <g stroke="#b4c7cc" strokeWidth="1.5" fill="none" strokeLinecap="round">
                <path d="M 220 590 q 10 -4 20 0 q 10 4 20 0" className="ripple-anim" />
                <path d="M 380 620 q 12 -4 24 0 q 12 4 24 0" className="ripple-anim delay-1" />
                <path d="M 580 580 q 14 -4 28 0 q 14 4 28 0" className="ripple-anim delay-2" />
                <path d="M 800 610 q 12 -4 24 0 q 12 4 24 0" className="ripple-anim delay-3" />
            </g>

            {/* ── Technical Road Grid ── */}
            <g className="city-road-grid">
                {/* Secondary streets */}
                <path
                    d="
                    M 80 120 L 920 120
                    M 60 270 L 940 270
                    M 60 450 L 940 450
                    M 180 50 L 180 530
                    M 400 50 L 400 520
                    M 620 50 L 620 520
                    M 840 50 L 840 500
                    "
                    stroke="#e4ded3"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* Primary technical transit routes */}
                <path
                    d="
                    M 40 180 L 960 180
                    M 40 360 L 960 360
                    M 40 520 L 960 520
                    M 280 40 L 280 540
                    M 520 40 L 520 580
                    M 760 40 L 760 540
                    "
                    stroke="#2d3135"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* Center route dashes */}
                <path
                    d="
                    M 40 180 L 960 180
                    M 40 360 L 960 360
                    M 40 520 L 960 520
                    M 280 40 L 280 540
                    M 520 40 L 520 580
                    M 760 40 L 760 540
                    "
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                    fill="none"
                />
            </g>

            {/* Decorative Trees */}
            <g className="city-trees">
                <PineTreeGroup x={80} y={90} />
                <PineTreeGroup x={420} y={75} />
                <PineTreeGroup x={890} y={80} />
                <PineTreeGroup x={70} y={420} />
                <PineTreeGroup x={900} y={410} />
            </g>

            {/* Compass Rose */}
            <StarCompassRose x={110} y={590} />

            {/* Interactive Trajectory line */}
            {trajectoryPath && (
                <path
                    d={trajectoryPath}
                    stroke="#ca82f8"
                    strokeWidth="2.5"
                    strokeDasharray="8 6"
                    fill="none"
                    className="trajectory-dash-flow"
                />
            )}

            {/* ── Landmarks ── */}
            {regions.map((region) => {
                const isHovered = hoveredRegion?.id === region.id;
                const isActive = active === region.id;
                const isFiltered = filteredIds.includes(region.id);
                const svgX = (region.x / 100) * 1000;
                const svgY = (region.y / 100) * 680;

                return (
                    <g
                        key={region.id}
                        className={`map-landmark-group ${isActive ? 'is-active-district' : ''} ${isHovered ? 'is-hovered-district' : ''} ${!isFiltered ? 'is-dimmed-district' : ''}`}
                        transform={`translate(${svgX}, ${svgY})`}
                        onClick={() => onVisit(region.id)}
                        onMouseEnter={() => setHoveredRegion(region)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${region.name} — ${region.subtitle}`}
                    >
                        {/* Hit area */}
                        <rect
                            x="-65"
                            y="-55"
                            width="130"
                            height="110"
                            rx="8"
                            className="landmark-hitbox"
                        />

                        {/* Active pulse aura */}
                        {isActive && (
                            <circle cx="0" cy="0" r="44" className="active-aura-ring" />
                        )}

                        {/* Landmark Graphic Icon */}
                        <DistrictLandmarkGraphic
                            icon={region.icon}
                            isActive={isActive}
                            isHovered={isHovered}
                        />

                        {/* High-Contrast Retentive Label Banner */}
                        <g transform="translate(0, 34)">
                            <rect
                                x="-56"
                                y="-10"
                                width="112"
                                height="18"
                                rx="3"
                                fill={isActive ? '#9d5fd0' : '#2d3135'}
                                filter="url(#landmarkShadow)"
                            />
                            {/* Section index indicator */}
                            <circle
                                cx="-44"
                                cy="-1"
                                r="5.5"
                                fill={isActive ? '#ffffff' : '#ca82f8'}
                            />
                            <text
                                x="-44"
                                y="1.5"
                                textAnchor="middle"
                                fill={isActive ? '#9d5fd0' : '#ffffff'}
                                fontSize="6.5"
                                fontWeight="800"
                                fontFamily="var(--font-mono)"
                            >
                                {region.index}
                            </text>
                            {/* Section Name */}
                            <text
                                x="4"
                                y="-1"
                                textAnchor="middle"
                                fill="#ffffff"
                                fontSize="7.5"
                                fontWeight="700"
                                fontFamily="var(--font-mono)"
                                letterSpacing="0.4"
                            >
                                {region.name.toUpperCase()}
                            </text>
                            {/* Subtitle */}
                            <text
                                x="0"
                                y="16"
                                textAnchor="middle"
                                fill="#4a5056"
                                fontSize="7"
                                fontWeight="600"
                                fontFamily="var(--font-primary)"
                            >
                                {region.subtitle}
                            </text>
                        </g>

                        {/* Active Section Location Pin */}
                        {isActive && (
                            <g transform="translate(0, -50)" className="active-beacon-pin">
                                <path
                                    d="M 0 -12 C -6 -12 -10 -8 -10 -2 C -10 5 0 14 0 14 C 0 14 10 5 10 -2 C 10 -8 6 -12 0 -12 Z"
                                    fill="#9d5fd0"
                                    stroke="#ffffff"
                                    strokeWidth="1.5"
                                />
                                <circle cx="0" cy="-3.5" r="2.8" fill="#ffffff" />
                            </g>
                        )}
                    </g>
                );
            })}
        </svg>
    );
}

/* ── Schematic Landmark Graphics ── */
function DistrictLandmarkGraphic({ icon, isActive, isHovered }) {
    const accent = '#9d5fd0';
    const teal = '#2a8c8c';
    const dark = '#2d3135';
    const light = '#f8f5ef';

    switch (icon) {
        case 'profile':
            return (
                <g filter="url(#landmarkShadow)">
                    <circle cx="0" cy="-8" r="22" fill={dark} rx="3" />
                    <circle cx="0" cy="-14" r="8" fill={accent} />
                    <path d="M -12 4 C -12 -3, 12 -3, 12 4 Z" fill={light} />
                    <circle cx="12" cy="-22" r="3" fill={teal} />
                </g>
            );

        case 'terminal':
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-24" y="-22" width="48" height="33" rx="3" fill={dark} />
                    <rect x="-20" y="-18" width="40" height="22" rx="2" fill="#14171a" />
                    <line x1="-16" y1="-12" x2="-4" y2="-12" stroke="#7ee787" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="-16" y1="-7" x2="12" y2="-7" stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="-16" y1="-2" x2="5" y2="-2" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="-7" y="11" width="14" height="3" fill={dark} />
                    <rect x="-14" y="13" width="28" height="2.5" rx="1.2" fill={accent} />
                </g>
            );

        case 'network':
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-23" y="-20" width="46" height="30" rx="3" fill={dark} />
                    <rect x="-18" y="-15" width="36" height="6" rx="1.5" fill="#1f2327" />
                    <rect x="-18" y="-6" width="36" height="6" rx="1.5" fill="#1f2327" />
                    <rect x="-18" y="3" width="36" height="6" rx="1.5" fill="#1f2327" />
                    <circle cx="-12" cy="-12" r="1.6" fill="#7ee787" className="led-blink-1" />
                    <circle cx="-7" cy="-12" r="1.6" fill={accent} className="led-blink-2" />
                    <circle cx="-12" cy="-3" r="1.6" fill="#58a6ff" className="led-blink-3" />
                    <circle cx="-7" cy="-3" r="1.6" fill="#7ee787" className="led-blink-1" />
                    <circle cx="-12" cy="6" r="1.6" fill={accent} className="led-blink-2" />
                </g>
            );

        case 'gear':
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-22" y="-14" width="44" height="28" fill={dark} rx="2" />
                    <rect x="-16" y="-8" width="32" height="16" fill="#1b1e22" rx="2" />
                    <circle cx="0" cy="0" r="6" fill={accent} />
                    <circle cx="0" cy="0" r="2.5" fill={dark} />
                    {/* Chip Pins */}
                    <line x1="-10" y1="-17" x2="-10" y2="-14" stroke={teal} strokeWidth="2" />
                    <line x1="0" y1="-17" x2="0" y2="-14" stroke={teal} strokeWidth="2" />
                    <line x1="10" y1="-17" x2="10" y2="-14" stroke={teal} strokeWidth="2" />
                    <line x1="-10" y1="14" x2="-10" y2="17" stroke={teal} strokeWidth="2" />
                    <line x1="0" y1="14" x2="0" y2="17" stroke={teal} strokeWidth="2" />
                    <line x1="10" y1="14" x2="10" y2="17" stroke={teal} strokeWidth="2" />
                </g>
            );

        case 'layers':
            return (
                <g filter="url(#landmarkShadow)">
                    <polygon points="0,-24 24,-12 0,0 -24,-12" fill={accent} />
                    <polygon points="0,-14 24,-2 0,10 -24,-2" fill={dark} opacity="0.85" />
                    <polygon points="0,-4 24,8 0,20 -24,8" fill={teal} />
                </g>
            );

        case 'briefcase':
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-22" y="-12" width="44" height="28" fill={dark} rx="3" />
                    <path d="M -9 -12 L -9 -18 L 9 -18 L 9 -12" stroke={accent} strokeWidth="2.5" fill="none" />
                    <line x1="-22" y1="0" x2="22" y2="0" stroke="#1f2327" strokeWidth="2" />
                    <rect x="-4" y="-3" width="8" height="6" fill={accent} rx="1" />
                </g>
            );

        case 'calendar':
        case 'arena':
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-22" y="-18" width="44" height="34" fill={dark} rx="3" />
                    <rect x="-22" y="-18" width="44" height="10" fill={accent} rx="2" />
                    <line x1="-12" y1="-22" x2="-12" y2="-18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="-22" x2="12" y2="-18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="-10" cy="-1" r="2.5" fill={teal} />
                    <circle cx="0" cy="-1" r="2.5" fill={light} />
                    <circle cx="10" cy="-1" r="2.5" fill={light} />
                    <circle cx="-10" cy="8" r="2.5" fill={light} />
                    <circle cx="0" cy="8" r="2.5" fill={teal} />
                    <circle cx="10" cy="8" r="2.5" fill={accent} />
                </g>
            );

        case 'press':
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-20" y="-20" width="40" height="34" fill={dark} rx="2" />
                    <polygon points="-20,-20 0,-32 20,-20" fill={accent} />
                    <rect x="-14" y="-10" width="28" height="4" fill={light} />
                    <rect x="-12" y="-3" width="24" height="4" fill={light} />
                    <rect x="-14" y="4" width="28" height="4" fill={light} />
                </g>
            );

        case 'park':
            return (
                <g filter="url(#landmarkShadow)">
                    <polygon points="0,-24 20,-12 14,14 0,22 -14,14 -20,-12" fill={dark} rx="2" />
                    <polygon points="0,-18 14,-8 10,10 0,16 -10,10 -14,-8" fill={accent} />
                    <circle cx="0" cy="-2" r="5" fill={light} />
                </g>
            );

        case 'ship':
            return (
                <g filter="url(#landmarkShadow)">
                    <circle cx="0" cy="-5" r="20" fill={dark} />
                    <circle cx="0" cy="-5" r="16" fill="#14171a" />
                    <circle cx="0" cy="-5" r="6" fill={accent} />
                    <circle cx="-9" cy="-14" r="2.5" fill={light} />
                    <circle cx="9" cy="-14" r="2.5" fill={light} />
                    <circle cx="-9" cy="4" r="2.5" fill={light} />
                    <circle cx="9" cy="4" r="2.5" fill={light} />
                </g>
            );

        case 'beacon':
        default:
            return (
                <g filter="url(#landmarkShadow)">
                    <polygon points="-10,12 10,12 5,-24 -5,-24" fill={dark} />
                    <rect x="-7" y="-30" width="14" height="7" fill={accent} rx="1" />
                    <circle cx="0" cy="-27" r="2.5" fill={light} className="beacon-lamp" />
                    <line x1="0" y1="-30" x2="0" y2="-40" stroke={dark} strokeWidth="1.8" />
                    <circle cx="0" cy="-40" r="5" stroke={accent} strokeWidth="1.2" fill="none" className="radio-wave-1" />
                    <circle cx="0" cy="-40" r="11" stroke={accent} strokeWidth="1" fill="none" className="radio-wave-2" />
                </g>
            );
    }
}

/* ── Compass Rose ── */
function StarCompassRose({ x, y }) {
    return (
        <g transform={`translate(${x}, ${y})`} className="vintage-star-compass">
            <circle cx="0" cy="0" r="28" stroke="#2d3135" strokeWidth="1.5" fill="#f8f4ec" />
            <circle cx="0" cy="0" r="24" stroke="#9d5fd0" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />

            <g className="compass-star-points">
                <polygon points="0,-24 3,-5 0,0" fill="#9d5fd0" />
                <polygon points="0,-24 -3,-5 0,0" fill="#2d3135" />
                <polygon points="0,24 -3,5 0,0" fill="#9d5fd0" />
                <polygon points="0,24 3,5 0,0" fill="#2d3135" />
                <polygon points="24,0 5,3 0,0" fill="#9d5fd0" />
                <polygon points="24,0 5,-3 0,0" fill="#2d3135" />
                <polygon points="-24,0 -5,-3 0,0" fill="#9d5fd0" />
                <polygon points="-24,0 -5,3 0,0" fill="#2d3135" />
            </g>

            <text x="0" y="-30" textAnchor="middle" fontSize="8" fontWeight="800" fontFamily="var(--font-mono)" fill="#2d3135">N</text>
            <text x="0" y="36" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="var(--font-mono)" fill="#2d3135">S</text>
            <text x="33" y="3" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="var(--font-mono)" fill="#2d3135">E</text>
            <text x="-33" y="3" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="var(--font-mono)" fill="#2d3135">W</text>
        </g>
    );
}

/* ── Tree decoration ── */
function PineTreeGroup({ x, y }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <polygon points="0,-14 -5,-5 -2,-5 -6,0 6,0 2,-5 5,-5" fill="#2d3135" />
            <polygon points="10,-10 6,-2 8,-2 5,3 15,3 12,-2 14,-2" fill="#2a8c8c" />
            <polygon points="-8,-9 -12,-2 -10,-2 -14,3 -3,3 -7,-2 -4,-2" fill="#2d3135" />
        </g>
    );
}
