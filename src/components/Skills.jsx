import { useRef, useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { skillCategories } from '../data/portfolioData';

// Flatten to physics skill objects. Category → accent class for color coding.
const AI = 'AI', ML = 'ML', Backend = 'Backend', Data = 'Data';
const CATEGORY_MAP = {
    'AI & Multi-Agent Engineering': AI,
    'Machine Learning & NLP': ML,
    'Backend, Cloud & MLOps': Backend,
    'Data Science & Development Tools': Data,
};

const PHYSICS = {
    gravity: 0.42,
    damping: 0.985,
    wallBounce: 0.55,
    boxBounce: 0.6,
    mouseRadius: 130,
    mouseForce: 0.85,
    floorFriction: 0.9,
};

function buildSkills() {
    const out = [];
    skillCategories.forEach((cat) => {
        const accentClass = CATEGORY_MAP[cat.name] || AI;
        cat.skills.forEach((s) => {
            out.push({ name: s.name, icon: s.icon, accentClass, w: 0, h: 0 });
        });
    });
    return out;
}

export default function Skills() {
    const containerRef = useRef(null);
    const [hint, setHint] = useState('Move your cursor through the boxes.');
    const [ready, setReady] = useState(false);

    // Physics state (refs — not React state, to avoid re-renders every frame)
    const boxesRef = useRef([]); // [{ el, x, y, vx, vy, w, h, accentClass, name, Icon }]
    const mouseRef = useRef({ x: -9999, y: -9999, active: false });
    const rafRef = useRef(0);
    const sizeRef = useRef({ w: 0, h: 0 });
    const initializedRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        if (initializedRef.current) return; // initialize once
        initializedRef.current = true;

        // Build skill elements in DOM (absolute positioned .physics-skill)
        const skillList = buildSkills();
        const boxes = skillList.map((s) => {
            const el = document.createElement('div');
            el.className = `physics-skill cat-${s.accentClass}`;
            const Icon = s.icon;
            el.innerHTML = `<span class="physics-skill-icon">${Icon ? '' : ''}</span><span class="physics-skill-name"></span>`;
            // Set text via textContent for the name (we render the icon via React component below won't work — use react-icons's rendered approach)
            // Since react-icons renders SVG components, but we're constructing DOM manually here, we'll use a unicode glyph fallback per category.
            const nameEl = el.querySelector('.physics-skill-name');
            nameEl.textContent = s.name;
            const iconEl = el.querySelector('.physics-skill-icon');
            // Category glyph (since react-icons must be JSX, use emoji-ish per accent)
            const glyph = s.accentClass === AI ? '◆'
                : s.accentClass === ML ? '∑'
                : s.accentClass === Backend ? '⌗'
                : '▤';
            iconEl.textContent = glyph;
            container.appendChild(el);

            return {
                el,
                x: Math.random() * Math.max(50, container.offsetWidth - 160),
                y: Math.random() * 80,
                vx: (Math.random() - 0.5) * 2,
                vy: 0,
                w: 0,
                h: 0,
                accentClass: s.accentClass,
                name: s.name,
            };
        });
        boxesRef.current = boxes;

        // Measure sizes after layout
        requestAnimationFrame(() => {
            boxes.forEach((b) => {
                const r = b.el.getBoundingClientRect();
                b.w = r.width;
                b.h = r.height;
            });
            setReady(true);
        });

        const measure = () => {
            const r = container.getBoundingClientRect();
            sizeRef.current = { w: r.width, h: r.height };
        };
        measure();
        window.addEventListener('resize', measure);

        const onMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };
        const onLeave = () => {
            mouseRef.current.active = false;
            mouseRef.current.x = -9999;
            mouseRef.current.y = -9999;
        };
        const onTouch = (e) => {
            if (!e.touches[0]) return;
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = e.touches[0].clientX - rect.left;
            mouseRef.current.y = e.touches[0].clientY - rect.top;
            mouseRef.current.active = true;
            // Brief ripple — deactivate after 600ms
            clearTimeout(rippleTimer);
            rippleTimer = setTimeout(() => { mouseRef.current.active = false; }, 600);
        };
        let rippleTimer = 0;

        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseleave', onLeave);
        container.addEventListener('touchmove', onTouch, { passive: true });
        container.addEventListener('touchstart', onTouch, { passive: true });

        // Main physics loop
        const tick = () => {
            const { w: W, h: H } = sizeRef.current;
            const boxes = boxesRef.current;
            const mouse = mouseRef.current;

            for (let i = 0; i < boxes.length; i++) {
                const b = boxes[i];
                if (!b.w || !b.h) continue;

                // Mouse repulsion
                if (mouse.active) {
                    const dx = b.x + b.w / 2 - mouse.x;
                    const dy = b.y + b.h / 2 - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < PHYSICS.mouseRadius && dist > 0.001) {
                        const force = (1 - dist / PHYSICS.mouseRadius) * PHYSICS.mouseForce;
                        b.vx += (dx / dist) * force;
                        b.vy += (dy / dist) * force;
                    }
                }

                // Gravity
                b.vy += PHYSICS.gravity;

                // Damping
                b.vx *= PHYSICS.damping;
                b.vy *= PHYSICS.damping;

                // Integrate
                b.x += b.vx;
                b.y += b.vy;

                // Walls
                if (b.x < 0) { b.x = 0; b.vx = -b.vx * PHYSICS.wallBounce; }
                if (b.x + b.w > W) { b.x = W - b.w; b.vx = -b.vx * PHYSICS.wallBounce; }
                if (b.y < 0) { b.y = 0; b.vy = -b.vy * PHYSICS.wallBounce; }
                // Floor
                if (b.y + b.h > H) {
                    b.y = H - b.h;
                    b.vy = -b.vy * PHYSICS.wallBounce;
                    b.vx *= PHYSICS.floorFriction;
                }
            }

            // Box-box AABB collisions (simple resolve — separate on min overlap axis)
            for (let i = 0; i < boxes.length; i++) {
                const a = boxes[i];
                if (!a.w) continue;
                for (let j = i + 1; j < boxes.length; j++) {
                    const b = boxes[j];
                    if (!b.w) continue;
                    const dx = (a.x + a.w / 2) - (b.x + b.w / 2);
                    const dy = (a.y + a.h / 2) - (b.y + b.h / 2);
                    const overlapX = (a.w + b.w) / 2 - Math.abs(dx);
                    const overlapY = (a.h + b.h) / 2 - Math.abs(dy);
                    if (overlapX > 0 && overlapY > 0) {
                        if (overlapX < overlapY) {
                            const push = overlapX / 2;
                            const dir = dx < 0 ? -1 : 1;
                            a.x += dir * push;
                            b.x -= dir * push;
                            const avg = (a.vx + b.vx) / 2;
                            a.vx = (a.vx - avg) * PHYSICS.boxBounce + avg;
                            b.vx = (b.vx - avg) * PHYSICS.boxBounce + avg;
                        } else {
                            const push = overlapY / 2;
                            const dir = dy < 0 ? -1 : 1;
                            a.y += dir * push;
                            b.y -= dir * push;
                            const avg = (a.vy + b.vy) / 2;
                            a.vy = (a.vy - avg) * PHYSICS.boxBounce + avg;
                            b.vy = (b.vy - avg) * PHYSICS.boxBounce + avg;
                        }
                    }
                }
            }

            // Apply to DOM (batched transform set)
            for (let i = 0; i < boxes.length; i++) {
                const b = boxes[i];
                if (!b.w) continue;
                b.el.style.transform = `translate3d(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px, 0)`;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        // After 3s of no movement, switch hint
        const hintTimer = setTimeout(() => setHint('Tap to scatter — your cursor is a force field.'), 4000);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', measure);
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('mouseleave', onLeave);
            container.removeEventListener('touchmove', onTouch);
            container.removeEventListener('touchstart', onTouch);
            clearTimeout(hintTimer);
            clearTimeout(rippleTimer);
            // remove skill elements
            boxes.forEach((b) => b.el?.remove());
            boxesRef.current = [];
            initializedRef.current = false;
        };
    }, []);

    // Category legend
    const legendItems = [
        { label: 'AI', class: 'cat-AI' },
        { label: 'ML', class: 'cat-ML' },
        { label: 'Backend', class: 'cat-Backend' },
        { label: 'Data', class: 'cat-Data' },
    ];

    return (
        <section id="skills" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Tech Stack · Physics Sandbox</span>
                        <h2 className="section-title">Capabilities & Tools</h2>
                        <p className="section-subtitle">
                            My skill stack, simulated with a tiny hand-written physics engine — gravity, AABB collisions, and a cursor repulsion field. Hover to scatter. On mobile? Tap.
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <div style={{ maxWidth: 960, margin: '0 auto' }}>
                        {/* Legend */}
                        <div style={{
                            display: 'flex',
                            gap: 16,
                            justifyContent: 'center',
                            marginBottom: 16,
                            flexWrap: 'wrap',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.74rem',
                            color: 'var(--text-muted)',
                        }}>
                            {legendItems.map((l) => (
                                <div key={l.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                    <span className={`physics-skill ${l.class}`} style={{ position: 'static', transform: 'none', padding: '4px 10px', fontSize: '0.7rem' }}>
                                        {l.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Physics container — boxes are appended by the effect */}
                        <div
                            ref={containerRef}
                            className="physics-container"
                            aria-label="Skills physics sandbox. Move or tap to interact."
                            role="img"
                        >
                            <div className="physics-hint" style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                                {hint}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
