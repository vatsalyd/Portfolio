import { useState, useEffect } from 'react';
import { tourSections } from '../data/portfolioData';

export default function SectionMap() {
    const [active, setActive] = useState(tourSections[0]?.id || '');

    useEffect(() => {
        const onScroll = () => {
            const viewportMid = window.innerHeight / 2;
            let best = tourSections[0]?.id || '';
            let bestDist = Infinity;
            tourSections.forEach((s) => {
                const el = document.getElementById(s.id);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const center = rect.top + rect.height / 2;
                const dist = Math.abs(center - viewportMid);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = s.id;
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

    const handleClick = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="section-map" aria-label="Section navigation map">
            <div className="section-map-line" />
            {tourSections.map((s) => (
                <button
                    key={s.id}
                    type="button"
                    className={`section-map-node ${active === s.id ? 'active' : ''}`}
                    onClick={() => handleClick(s.id)}
                    aria-label={`Go to ${s.name} section`}
                    aria-current={active === s.id ? 'true' : undefined}
                >
                    <span className="section-map-dot" />
                    <span className="section-map-tooltip">{s.name}</span>
                </button>
            ))}
        </div>
    );
}
