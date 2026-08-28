import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FiX,
    FiCompass,
    FiMaximize2,
    FiMapPin,
    FiNavigation,
    FiLayers,
    FiArrowRight,
    FiFilter,
    FiCheck,
    FiCornerDownRight,
} from 'react-icons/fi';
import { mapRegions, regionIndex } from '../data/portfolioData';

const CATEGORIES = [
    { id: 'all', label: 'All Districts', count: 10 },
    { id: 'systems', label: 'Systems & Agents', count: 4, ids: ['hero', 'agent', 'opensource', 'skills'] },
    { id: 'builds', label: 'Builds & Industry', count: 2, ids: ['projects', 'experience'] },
    { id: 'culture', label: 'Culture & Outreach', count: 4, ids: ['articles', 'characters', 'taste', 'contact'] },
];

export default function AncientMap() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(mapRegions[0]?.id || 'hero');
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [isPeekingHovered, setIsPeekingHovered] = useState(false);
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
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    // ESC closes; Keyboard navigation through districts
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                const curIdx = mapRegions.findIndex((r) => r.id === (hoveredRegion?.id || active));
                const nextIdx = (curIdx + 1) % mapRegions.length;
                setHoveredRegion(mapRegions[nextIdx]);
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
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

    // Smooth scroll to selected section
    const visit = useCallback((id) => {
        setOpen(false);
        window.setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }, 220);
    }, []);

    const activeRegionObj = useMemo(() => {
        return mapRegions.find((r) => r.id === active) || mapRegions[0];
    }, [active]);

    // Filtered regions based on category
    const filteredIds = useMemo(() => {
        const cat = CATEGORIES.find((c) => c.id === selectedCategory);
        return cat && cat.ids ? cat.ids : mapRegions.map((r) => r.id);
    }, [selectedCategory]);

    return (
        <>
            {/* Scroll progress hairline at very top */}
            <ScrollHairline />

            {/* ── Right-Edge Emerging Peeking Map Drawer ── */}
            <aside
                className={`peeking-map-drawer ${isPeekingHovered ? 'is-expanded' : ''}`}
                onMouseEnter={() => setIsPeekingHovered(true)}
                onMouseLeave={() => setIsPeekingHovered(false)}
                onClick={() => setOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Open Illustrated Cartography Map"
                title="Explore Illustrated Portfolio Map (Click or Hover)"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
            >
                {/* Edge Handle */}
                <div className="peeking-map-handle">
                    <span className="peeking-compass-glyph">
                        <FiCompass className="compass-spin-icon" />
                    </span>
                    <span className="peeking-vertical-label">ATLAS · MAP</span>
                    <span className="peeking-active-indicator" />
                </div>

                {/* Peeking Content Preview (reveals smoothly on hover) */}
                <div className="peeking-map-body">
                    <div className="peeking-map-mini-header">
                        <span className="peeking-kicker">Cartography Atlas</span>
                        <h4 className="peeking-title">Territories of AI</h4>
                    </div>

                    {/* Mini SVG Preview */}
                    <div className="peeking-mini-canvas">
                        <MiniMapThumbnail activeId={active} />
                    </div>

                    <div className="peeking-meta">
                        <div className="peeking-loc-row">
                            <FiMapPin className="peeking-pin-icon" />
                            <span className="peeking-loc-text">
                                Active: <strong>{activeRegionObj.name}</strong>
                            </span>
                        </div>
                        <div className="peeking-cta-row">
                            <span>Open Full Map</span>
                            <FiMaximize2 />
                        </div>
                    </div>
                </div>
            </aside>

            {/* ── Fullscreen Illustrated Vintage Cartography Modal ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="illustrated-map-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Illustrated Cartography Map"
                    >
                        <motion.div
                            className="illustrated-map-paper"
                            initial={{ scale: 0.94, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 10 }}
                            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Paper Header Strip */}
                            <div className="illustrated-map-topbar">
                                <div className="map-badge-group">
                                    <span className="map-vintage-stamp">MMXXVI</span>
                                    <div className="map-title-block">
                                        <h2 className="map-main-title">TERRITORIES OF THE PORTFOLIO</h2>
                                        <span className="map-sub-title">
                                            Illustrated Urban Cartography · Vatsal Yadav (IIT Bhilai)
                                        </span>
                                    </div>
                                </div>

                                <div className="map-topbar-actions">
                                    {/* Category Filter Pills */}
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
                                        <span>Current: <strong>{activeRegionObj.name}</strong></span>
                                    </div>

                                    <button
                                        type="button"
                                        className="map-close-button"
                                        onClick={() => setOpen(false)}
                                        aria-label="Close Map (ESC)"
                                        title="Close Map (ESC)"
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            </div>

                            {/* Main Illustrated Canvas Container */}
                            <div className="illustrated-map-canvas-wrap">
                                <IllustratedCitySVG
                                    regions={mapRegions}
                                    active={active}
                                    hoveredRegion={hoveredRegion}
                                    setHoveredRegion={setHoveredRegion}
                                    filteredIds={filteredIds}
                                    onVisit={visit}
                                />

                                {/* Interactive Hovered Card Floating Tooltip */}
                                <AnimatePresence>
                                    {hoveredRegion && (
                                        <motion.div
                                            className="map-floating-card"
                                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            <div className="card-header-row">
                                                <span className="card-district-badge">DISTRICT {hoveredRegion.index}</span>
                                                <span className="card-road-tag">📍 {hoveredRegion.road}</span>
                                            </div>
                                            <h4 className="card-title">{hoveredRegion.title}</h4>
                                            <p className="card-desc">{hoveredRegion.desc}</p>
                                            <button
                                                type="button"
                                                onClick={() => visit(hoveredRegion.id)}
                                                className="card-sail-btn"
                                            >
                                                <span>Sail to Section</span>
                                                <FiArrowRight />
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom Info Bar / Quick Jump Links */}
                            <div className="illustrated-map-infobar">
                                <div className="map-district-summary">
                                    <span className="district-tag">
                                        {hoveredRegion ? `DISTRICT ${hoveredRegion.index} · ${hoveredRegion.road}` : 'NAVIGATION TELEMETRY'}
                                    </span>
                                    <h3 className="district-title">
                                        {hoveredRegion ? hoveredRegion.title : 'Explore the Autonomous Systems Matrix'}
                                    </h3>
                                    <p className="district-desc">
                                        {hoveredRegion
                                            ? hoveredRegion.desc
                                            : 'Click any illustrated district on the map or use the chips below to smoothly sail straight to that section.'}
                                    </p>
                                </div>

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

/* ── Scroll Progress Hairline Indicator ── */
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

/* ── Mini Map Thumbnail for Peeking Drawer ── */
function MiniMapThumbnail({ activeId }) {
    return (
        <svg viewBox="0 0 100 70" className="mini-thumb-svg">
            <rect width="100" height="70" fill="#f0ece4" rx="4" />
            {/* Waterway */}
            <path d="M 0 52 Q 35 48 65 58 T 100 55 L 100 70 L 0 70 Z" fill="#d5e0e3" />
            {/* Grid roads */}
            <path d="M 10 10 L 90 25 M 25 5 L 15 65 M 45 8 L 52 60 M 80 5 L 75 55 M 5 38 L 95 38" stroke="#33383e" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 10 10 L 90 25 M 25 5 L 15 65 M 45 8 L 52 60 M 80 5 L 75 55 M 5 38 L 95 38" stroke="#fff" strokeWidth="0.8" strokeDasharray="1 1" />
            {/* Landmark Dots */}
            {mapRegions.map((r) => {
                const isActive = r.id === activeId;
                return (
                    <circle
                        key={r.id}
                        cx={r.x + 8}
                        cy={r.y + 4}
                        r={isActive ? 3.5 : 2}
                        fill={isActive ? '#e64a38' : '#33383e'}
                        stroke="#fff"
                        strokeWidth="0.7"
                    />
                );
            })}
        </svg>
    );
}

/* ── Full Illustrated City SVG Canvas ── */
function IllustratedCitySVG({ regions, active, hoveredRegion, setHoveredRegion, filteredIds, onVisit }) {
    const activeRegion = regions.find((r) => r.id === active) || regions[0];

    // Trajectory flight line coordinates from active to hovered
    const trajectoryPath = useMemo(() => {
        if (!hoveredRegion || hoveredRegion.id === active) return null;
        const x1 = (activeRegion.x / 100) * 1000;
        const y1 = (activeRegion.y / 100) * 680;
        const x2 = (hoveredRegion.x / 100) * 1000;
        const y2 = (hoveredRegion.y / 100) * 680;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2 - 35;
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
                {/* Paper texture filter */}
                <filter id="parchmentNoise" x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" />
                    <feComposite in2="SourceGraphic" in="gl" operator="in" />
                </filter>

                {/* Soft drop shadow for buildings */}
                <filter id="landmarkShadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="rgba(45, 49, 53, 0.22)" />
                </filter>
            </defs>

            {/* Base Parchment Field */}
            <rect width="1000" height="680" fill="#f4efe6" />

            {/* Waterway / Mystic River Section at bottom right */}
            <path
                d="M 120 540 C 260 520, 480 570, 680 530 C 820 500, 920 520, 1000 500 L 1000 680 L 0 680 L 0 570 Z"
                fill="#d8e3e6"
                className="river-path"
            />

            {/* River Ripples */}
            <g className="river-ripples" stroke="#b4c7cc" strokeWidth="2" fill="none" strokeLinecap="round">
                <path d="M 220 590 q 10 -4 20 0 q 10 4 20 0" className="ripple-anim" />
                <path d="M 380 620 q 12 -4 24 0 q 12 4 24 0" className="ripple-anim delay-1" />
                <path d="M 580 580 q 14 -4 28 0 q 14 4 28 0" className="ripple-anim delay-2" />
                <path d="M 800 610 q 12 -4 24 0 q 12 4 24 0" className="ripple-anim delay-3" />
                <path d="M 880 550 q 10 -3 20 0 q 10 3 20 0" className="ripple-anim" />
            </g>

            {/* Bobbing Sailboat */}
            <g className="animated-sailboat" transform="translate(420, 560)">
                <path d="M 0 16 L 26 16 L 22 23 L 4 23 Z" fill="#2d3135" />
                <path d="M 13 16 L 13 0 L 23 14 Z" fill="#e64a38" />
                <path d="M 11 16 L 11 3 L 3 14 Z" fill="#fcfaf6" />
                <text x="13" y="32" fontSize="9" fontFamily="var(--font-mono)" fill="#687278" textAnchor="middle">
                    MYSTIC RUNNER
                </text>
            </g>

            {/* Second Little Sailboat */}
            <g className="animated-sailboat-2" transform="translate(680, 585)">
                <path d="M 0 12 L 18 12 L 15 17 L 3 17 Z" fill="#2d3135" />
                <path d="M 9 12 L 9 0 L 16 10 Z" fill="#e64a38" />
            </g>

            {/* Flying Seagulls */}
            <g className="animated-seagulls" stroke="#2d3135" strokeWidth="1.8" fill="none">
                <path d="M 320 510 q 6 -6 12 0 q 6 -6 12 0" />
                <path d="M 350 495 q 5 -5 10 0 q 5 -5 10 0" />
                <path d="M 640 480 q 6 -6 12 0 q 6 -6 12 0" />
            </g>

            {/* ── Street & Highway Grid Network ── */}
            <g className="city-road-grid">
                {/* Secondary Background Streets */}
                <path
                    d="
                    M 80 120 L 920 120
                    M 60 270 L 940 270
                    M 60 450 L 940 450
                    M 180 50 L 180 530
                    M 400 50 L 400 520
                    M 620 50 L 620 520
                    M 840 50 L 840 500
                    M 180 120 L 400 270
                    M 400 270 L 620 120
                    M 620 270 L 840 450
                    M 180 450 L 400 270
                    M 400 450 L 620 270
                    M 260 50 L 320 530
                    M 500 50 L 530 520
                    M 720 50 L 750 480
                    "
                    stroke="#e4ded3"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Primary Arterial Road Network */}
                <path
                    d="
                    M 40 180 L 960 180
                    M 40 360 L 960 360
                    M 40 520 L 960 520
                    M 280 40 L 280 540
                    M 520 40 L 520 580
                    M 760 40 L 760 540
                    M 120 40 L 520 360 L 920 180
                    M 80 520 L 520 360 L 880 520
                    "
                    stroke="#32373c"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* White Center Dashes */}
                <path
                    d="
                    M 40 180 L 960 180
                    M 40 360 L 960 360
                    M 40 520 L 960 520
                    M 280 40 L 280 540
                    M 520 40 L 520 580
                    M 760 40 L 760 540
                    M 120 40 L 520 360 L 920 180
                    M 80 520 L 520 360 L 880 520
                    "
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeDasharray="8 8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </g>

            {/* ── Street Names & Signposts ── */}
            <g className="street-labels" fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill="#4d5358" letterSpacing="0.8">
                <text x="210" y="174" transform="rotate(-3, 210, 174)">BROADWAY AVE</text>
                <text x="560" y="174">SYSTEMS PKWY</text>
                <text x="570" y="354">REVERE BEACH PKWY</text>
                <text x="330" y="514">BEACHAM ST</text>
                <text x="274" y="90" transform="rotate(90, 274, 90)">MAIN ST</text>
                <text x="514" y="90" transform="rotate(90, 514, 90)">HANCOCK ST</text>
                <text x="754" y="90" transform="rotate(90, 754, 90)">FERRY ST</text>
            </g>

            {/* Route Shield Badges */}
            <RouteBadge x={130} y={174} num="99" />
            <RouteBadge x={470} y={354} num="16" />
            <RouteBadge x={890} y={174} num="93" />
            <RouteBadge x={240} y={514} num="1A" />

            {/* ── Active Navigation Trajectory Line (from Current to Hovered) ── */}
            {trajectoryPath && (
                <g className="active-trajectory-group">
                    <path
                        d={trajectoryPath}
                        stroke="#e64a38"
                        strokeWidth="3.2"
                        strokeDasharray="8 6"
                        fill="none"
                        className="trajectory-dash-flow"
                    />
                </g>
            )}

            {/* ── Animated Street Traffic (Cars, Vans, Buses) ── */}
            <g className="animated-traffic">
                {/* Red Car cruising on Broadway */}
                <g className="car-cruising-horizontal-1">
                    <rect x="0" y="-6" width="22" height="12" rx="3" fill="#e64a38" />
                    <rect x="5" y="-4" width="10" height="8" rx="1.5" fill="#2d3135" />
                    <circle cx="4" cy="7" r="2.2" fill="#1b1d1f" />
                    <circle cx="18" cy="7" r="2.2" fill="#1b1d1f" />
                    <circle cx="4" cy="-7" r="2.2" fill="#1b1d1f" />
                    <circle cx="18" cy="-7" r="2.2" fill="#1b1d1f" />
                </g>

                {/* Black Delivery Van on Revere Beach Pkwy */}
                <g className="van-cruising-horizontal-2">
                    <rect x="0" y="-7" width="28" height="14" rx="3" fill="#2d3135" />
                    <rect x="18" y="-5" width="7" height="10" rx="1" fill="#f0ece4" />
                    <circle cx="6" cy="8" r="2.4" fill="#1b1d1f" />
                    <circle cx="22" cy="8" r="2.4" fill="#1b1d1f" />
                    <circle cx="6" cy="-8" r="2.4" fill="#1b1d1f" />
                    <circle cx="22" cy="-8" r="2.4" fill="#1b1d1f" />
                </g>

                {/* Little Car on Beacham St */}
                <g className="car-cruising-horizontal-3">
                    <rect x="0" y="-5" width="18" height="10" rx="2" fill="#e64a38" />
                    <rect x="4" y="-3.5" width="8" height="7" rx="1" fill="#fdfcf9" />
                </g>
            </g>

            {/* ── Decorative Trees & Vignettes across city blocks ── */}
            <g className="city-trees">
                <PineTreeGroup x={80} y={90} />
                <PineTreeGroup x={420} y={75} />
                <PineTreeGroup x={890} y={80} />
                <PineTreeGroup x={70} y={420} />
                <PineTreeGroup x={900} y={410} />
                <PineTreeGroup x={210} y={320} />
                <PineTreeGroup x={700} y={320} />
                <ParkBench x={590} y={490} />
                <ShopperFigure x={140} y={230} />
                <TrampolineJumpers x={80} y={220} />
            </g>

            {/* ── Star Compass Rose (Bottom Left) ── */}
            <StarCompassRose x={110} y={590} />

            {/* ── Interactive Landmark Territories (10 Districts) ── */}
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
                        aria-label={`${region.title} — ${region.subtitle}`}
                    >
                        {/* Interactive Click Zone Backdrop */}
                        <rect
                            x="-65"
                            y="-60"
                            width="130"
                            height="115"
                            rx="10"
                            className="landmark-hitbox"
                        />

                        {/* Active Pulse Aura Ring */}
                        {isActive && (
                            <circle
                                cx="0"
                                cy="0"
                                r="48"
                                className="active-aura-ring"
                            />
                        )}

                        {/* District Illustrated Landmark Asset */}
                        <DistrictLandmarkGraphic
                            icon={region.icon}
                            isActive={isActive}
                            isHovered={isHovered}
                        />

                        {/* Ribbon Flag Banner */}
                        <g transform="translate(0, 36)">
                            {/* Banner Shape */}
                            <path
                                d="M -54 -10 L 54 -10 L 46 6 L -46 6 Z"
                                fill={isActive ? '#e64a38' : '#2d3135'}
                                filter="url(#landmarkShadow)"
                            />
                            <text
                                x="0"
                                y="0"
                                textAnchor="middle"
                                fill="#ffffff"
                                fontSize="8.5"
                                fontWeight="700"
                                fontFamily="var(--font-mono)"
                                letterSpacing="0.8"
                            >
                                {region.name.toUpperCase()}
                            </text>
                            <text
                                x="0"
                                y="14"
                                textAnchor="middle"
                                fill="#3d4247"
                                fontSize="7.5"
                                fontWeight="600"
                                fontFamily="var(--font-primary)"
                            >
                                {region.subtitle}
                            </text>
                        </g>

                        {/* Current Location Beacon Pin */}
                        {isActive && (
                            <g transform="translate(0, -52)" className="active-beacon-pin">
                                <path
                                    d="M 0 -14 C -7 -14 -12 -9 -12 -2 C -12 6 0 16 0 16 C 0 16 12 6 12 -2 C 12 -9 7 -14 0 -14 Z"
                                    fill="#e64a38"
                                    stroke="#ffffff"
                                    strokeWidth="1.8"
                                />
                                <circle cx="0" cy="-4" r="3.2" fill="#ffffff" />
                            </g>
                        )}
                    </g>
                );
            })}
        </svg>
    );
}

/* ── Individual Illustrated District Graphics ── */
function DistrictLandmarkGraphic({ icon, isActive, isHovered }) {
    const accent = isActive || isHovered ? '#e64a38' : '#e64a38';
    const dark = '#2d3135';
    const light = '#f8f5ef';

    switch (icon) {
        case 'castle': // Citadel / Hero
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-24" y="-22" width="48" height="38" fill={dark} rx="2" />
                    <polygon points="-28,-22 0,-42 28,-22" fill={accent} />
                    <rect x="-18" y="-12" width="10" height="12" fill={light} />
                    <rect x="8" y="-12" width="10" height="12" fill={light} />
                    <rect x="-6" y="2" width="12" height="14" fill={light} rx="6" />
                    <line x1="0" y1="-42" x2="0" y2="-52" stroke={dark} strokeWidth="1.8" />
                    <polygon points="0,-52 14,-46 0,-40" fill={accent} className="flag-flutter" />
                </g>
            );

        case 'terminal': // Mini Vatsal Terminal
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-26" y="-24" width="52" height="36" rx="4" fill={dark} />
                    <rect x="-22" y="-20" width="44" height="24" rx="2" fill="#14171a" />
                    <line x1="-18" y1="-14" x2="-4" y2="-14" stroke="#7ee787" strokeWidth="2" strokeLinecap="round" />
                    <line x1="-18" y1="-8" x2="14" y2="-8" stroke="#58a6ff" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="-18" y1="-2" x2="6" y2="-2" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
                    <rect x="-8" y="12" width="16" height="4" fill={dark} />
                    <rect x="-16" y="15" width="32" height="3" rx="1.5" fill={accent} />
                    <g transform="translate(22, -26)">
                        <path d="M 0 0 A 8 8 0 0 1 12 12" stroke={dark} strokeWidth="2.2" fill="none" />
                        <line x1="6" y1="6" x2="12" y2="0" stroke={accent} strokeWidth="1.8" />
                    </g>
                </g>
            );

        case 'network': // Matrix / Open Source
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-25" y="-22" width="50" height="34" rx="4" fill={dark} />
                    <rect x="-20" y="-17" width="40" height="7" rx="1.5" fill="#1f2327" />
                    <rect x="-20" y="-7" width="40" height="7" rx="1.5" fill="#1f2327" />
                    <rect x="-20" y="3" width="40" height="7" rx="1.5" fill="#1f2327" />
                    <circle cx="-14" cy="-13.5" r="1.8" fill="#7ee787" className="led-blink-1" />
                    <circle cx="-8" cy="-13.5" r="1.8" fill={accent} className="led-blink-2" />
                    <circle cx="-14" cy="-3.5" r="1.8" fill="#58a6ff" className="led-blink-3" />
                    <circle cx="-8" cy="-3.5" r="1.8" fill="#7ee787" className="led-blink-1" />
                    <circle cx="-14" cy="6.5" r="1.8" fill={accent} className="led-blink-2" />
                </g>
            );

        case 'gear': // Foundry / Skills
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-24" y="-14" width="48" height="28" fill={dark} rx="2" />
                    <polygon points="-28,-14 -14,-26 0,-14 14,-26 28,-14" fill={accent} />
                    <rect x="12" y="-36" width="8" height="14" fill={dark} />
                    <circle cx="16" cy="-42" r="3.5" fill="#b0bac2" className="smoke-puff-1" />
                    <circle cx="18" cy="-48" r="5" fill="#cbd4dc" className="smoke-puff-2" />
                    <g transform="translate(-6, 0)" className="rotating-gear">
                        <circle cx="0" cy="0" r="10" fill={accent} />
                        <circle cx="0" cy="0" r="4" fill={dark} />
                    </g>
                </g>
            );

        case 'city': // Downtown Everett / Projects
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-28" y="-38" width="22" height="52" fill={dark} rx="2" />
                    <rect x="-24" y="-32" width="6" height="6" fill={accent} />
                    <rect x="-14" y="-32" width="6" height="6" fill={light} />
                    <rect x="-24" y="-22" width="6" height="6" fill={light} />
                    <rect x="-14" y="-22" width="6" height="6" fill={accent} />
                    <rect x="-24" y="-12" width="6" height="6" fill={light} />
                    <rect x="-14" y="-12" width="6" height="6" fill={light} />
                    <rect x="-3" y="-48" width="30" height="62" fill={accent} rx="2" />
                    <polygon points="-3,-48 12,-58 27,-48" fill={dark} />
                    <rect x="3" y="-42" width="7" height="6" fill={light} />
                    <rect x="15" y="-42" width="7" height="6" fill={light} />
                    <rect x="3" y="-32" width="7" height="6" fill={dark} />
                    <rect x="15" y="-32" width="7" height="6" fill={light} />
                    <rect x="3" y="-22" width="7" height="6" fill={light} />
                    <rect x="15" y="-22" width="7" height="6" fill={dark} />
                    <rect x="3" y="-12" width="7" height="6" fill={light} />
                    <rect x="15" y="-12" width="7" height="6" fill={light} />
                </g>
            );

        case 'factory': // Production Plant / Experience
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-26" y="-18" width="52" height="32" fill={dark} rx="2" />
                    <polygon points="-26,-18 -10,-30 6,-18 22,-30 26,-18" fill={accent} />
                    <rect x="-18" y="-6" width="10" height="10" fill={light} />
                    <rect x="8" y="-6" width="10" height="10" fill={light} />
                    <path d="M 26 -2 C 34 -2, 34 10, 40 10" stroke={accent} strokeWidth="3" fill="none" />
                </g>
            );

        case 'press': // Publishing Row / Articles
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-24" y="-20" width="48" height="34" fill={dark} rx="2" />
                    <polygon points="-27,-20 0,-34 27,-20" fill={accent} />
                    <rect x="-16" y="-10" width="32" height="5" fill={light} />
                    <rect x="-14" y="-3" width="28" height="5" fill={light} />
                    <rect x="-16" y="4" width="32" height="5" fill={light} />
                </g>
            );

        case 'park': // Archetypes / Characters
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-18" y="0" width="36" height="14" fill={dark} rx="2" />
                    <rect x="-12" y="-12" width="24" height="12" fill={accent} />
                    <circle cx="0" cy="-22" r="6" fill={dark} />
                    <path d="M -6 -16 L 6 -16 L 9 -6 L -9 -6 Z" fill={dark} />
                    <path d="M -12 -18 Q -16 -10 -10 -4" stroke={accent} strokeWidth="2" fill="none" />
                    <path d="M 12 -18 Q 16 -10 10 -4" stroke={accent} strokeWidth="2" fill="none" />
                </g>
            );

        case 'ship': // Mystic Brewery / Taste
            return (
                <g filter="url(#landmarkShadow)">
                    <rect x="-24" y="-32" width="20" height="42" rx="4" fill={accent} />
                    <polygon points="-24,-32 -14,-42 -4,-32" fill={dark} />
                    <g transform="translate(10, -12)">
                        <path d="M -6 0 L 8 0 L 8 6" stroke={dark} strokeWidth="2.5" fill="none" />
                        <path d="M 8 6 L 8 18" stroke={accent} strokeWidth="2.5" strokeDasharray="3 2" className="pouring-stream" />
                        <path d="M 2 12 L 14 12 L 12 24 L 4 24 Z" fill={light} stroke={dark} strokeWidth="1.5" />
                        <path d="M 3 15 L 13 15 L 11 23 L 5 23 Z" fill={accent} />
                    </g>
                </g>
            );

        case 'beacon': // Signal Beacon / Contact
        default:
            return (
                <g filter="url(#landmarkShadow)">
                    <polygon points="-12,14 12,14 6,-26 -6,-26" fill={dark} />
                    <rect x="-8" y="-34" width="16" height="8" fill={accent} rx="1" />
                    <circle cx="0" cy="-30" r="3" fill={light} className="beacon-lamp" />
                    <line x1="0" y1="-34" x2="0" y2="-46" stroke={dark} strokeWidth="2" />
                    <circle cx="0" cy="-46" r="6" stroke={accent} strokeWidth="1.5" fill="none" className="radio-wave-1" />
                    <circle cx="0" cy="-46" r="13" stroke={accent} strokeWidth="1.2" fill="none" className="radio-wave-2" />
                </g>
            );
    }
}

/* ── Route Shield Badge Component ── */
function RouteBadge({ x, y, num }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <path
                d="M -9 -10 L 9 -10 L 9 2 C 9 8 0 12 0 12 C 0 12 -9 8 -9 2 Z"
                fill="#e64a38"
                stroke="#ffffff"
                strokeWidth="1.2"
            />
            <text
                x="0"
                y="3"
                textAnchor="middle"
                fontSize="7.5"
                fontWeight="800"
                fontFamily="var(--font-mono)"
                fill="#ffffff"
            >
                {num}
            </text>
        </g>
    );
}

/* ── Star Compass Rose (N - E - S - W) ── */
function StarCompassRose({ x, y }) {
    return (
        <g transform={`translate(${x}, ${y})`} className="vintage-star-compass">
            <circle cx="0" cy="0" r="32" stroke="#2d3135" strokeWidth="2" fill="#f8f4ec" />
            <circle cx="0" cy="0" r="28" stroke="#e64a38" strokeWidth="1" strokeDasharray="2 2" fill="none" />

            <g className="compass-star-points">
                <polygon points="0,-28 4,-6 0,0" fill="#e64a38" />
                <polygon points="0,-28 -4,-6 0,0" fill="#2d3135" />
                <polygon points="0,28 -4,6 0,0" fill="#e64a38" />
                <polygon points="0,28 4,6 0,0" fill="#2d3135" />
                <polygon points="28,0 6,4 0,0" fill="#e64a38" />
                <polygon points="28,0 6,-4 0,0" fill="#2d3135" />
                <polygon points="-28,0 -6,-4 0,0" fill="#e64a38" />
                <polygon points="-28,0 -6,4 0,0" fill="#2d3135" />

                <polygon points="18,-18 3,-3 0,0" fill="#e64a38" opacity="0.8" />
                <polygon points="-18,-18 -3,-3 0,0" fill="#2d3135" opacity="0.8" />
                <polygon points="18,18 3,3 0,0" fill="#2d3135" opacity="0.8" />
                <polygon points="-18,18 -3,3 0,0" fill="#e64a38" opacity="0.8" />
            </g>

            <text x="0" y="-34" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="var(--font-mono)" fill="#2d3135">N</text>
            <text x="0" y="42" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="var(--font-mono)" fill="#2d3135">S</text>
            <text x="38" y="3" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="var(--font-mono)" fill="#2d3135">E</text>
            <text x="-38" y="3" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="var(--font-mono)" fill="#2d3135">W</text>
        </g>
    );
}

/* ── Tiny Illustrated Environment Vignettes ── */
function PineTreeGroup({ x, y }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <polygon points="0,-16 -6,-6 -2,-6 -7,0 7,0 2,-6 6,-6" fill="#2d3135" />
            <polygon points="12,-12 7,-3 10,-3 6,3 18,3 14,-3 17,-3" fill="#e64a38" />
            <polygon points="-10,-10 -15,-2 -12,-2 -16,3 -4,3 -8,-2 -5,-2" fill="#2d3135" />
        </g>
    );
}

function ParkBench({ x, y }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <rect x="-12" y="-4" width="24" height="4" rx="1" fill="#e64a38" />
            <line x1="-8" y1="0" x2="-8" y2="6" stroke="#2d3135" strokeWidth="2" />
            <line x1="8" y1="0" x2="8" y2="6" stroke="#2d3135" strokeWidth="2" />
        </g>
    );
}

function ShopperFigure({ x, y }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <circle cx="0" cy="-14" r="3.5" fill="#2d3135" />
            <polygon points="0,-10 -6,0 6,0" fill="#e64a38" />
            <line x1="-3" y1="0" x2="-3" y2="8" stroke="#2d3135" strokeWidth="1.8" />
            <line x1="3" y1="0" x2="3" y2="8" stroke="#2d3135" strokeWidth="1.8" />
            <rect x="-10" y="-2" width="4" height="6" fill="#e64a38" />
            <rect x="6" y="-2" width="4" height="6" fill="#e64a38" />
        </g>
    );
}

function TrampolineJumpers({ x, y }) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <rect x="-16" y="0" width="32" height="4" rx="2" fill="#2d3135" />
            <line x1="-12" y1="4" x2="-12" y2="10" stroke="#2d3135" strokeWidth="1.8" />
            <line x1="12" y1="4" x2="12" y2="10" stroke="#2d3135" strokeWidth="1.8" />
            <g transform="translate(-6, -16)" className="jumper-bounce-1">
                <circle cx="0" cy="0" r="3" fill="#e64a38" />
                <line x1="0" y1="3" x2="0" y2="9" stroke="#2d3135" strokeWidth="1.8" />
                <line x1="-5" y1="5" x2="5" y2="3" stroke="#2d3135" strokeWidth="1.5" />
            </g>
            <g transform="translate(6, -20)" className="jumper-bounce-2">
                <circle cx="0" cy="0" r="3" fill="#2d3135" />
                <line x1="0" y1="3" x2="0" y2="9" stroke="#e64a38" strokeWidth="1.8" />
                <line x1="-4" y1="2" x2="5" y2="6" stroke="#e64a38" strokeWidth="1.5" />
            </g>
        </g>
    );
}
