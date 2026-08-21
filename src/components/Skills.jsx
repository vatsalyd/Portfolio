import { useState, useEffect, useRef, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { skillCategories } from '../data/portfolioData';
import { FiRefreshCw, FiArrowDown, FiZap } from 'react-icons/fi';

const CATEGORY_ACCENTS = {
    'Autonomous Agent Development': { name: 'violet', hex: '#CA82F8' },
    'Next-Gen AI Infrastructure': { name: 'amber', hex: '#E8922B' },
    'AI Engineering & MLOps': { name: 'cyan', hex: '#2A8C8C' },
    'Core Languages & Systems': { name: 'emerald', hex: '#3FA373' },
};

export default function Skills() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [gravityMode, setGravityMode] = useState('down'); // 'down', 'zero', 'up'
    const containerRef = useRef(null);
    const animRef = useRef(null);
    const bodiesRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });
    const draggedBodyRef = useRef(null);
    const dragOffsetRef = useRef({ x: 0, y: 0 });
    const lastMouseRef = useRef({ x: 0, y: 0, t: 0 });
    const [physicsBodies, setPhysicsBodies] = useState([]);

    // Flatten skills with category info
    const allSkills = useMemo(() => skillCategories.flatMap((cat) =>
        cat.skills.map((s) => ({
            ...s,
            categoryName: cat.name,
            accent: CATEGORY_ACCENTS[cat.name] || { name: 'violet', hex: '#CA82F8' },
        }))
    ), []);

    // Filter skills based on selected category chip
    const filteredSkills = useMemo(() => selectedCategory === 'All'
        ? allSkills
        : allSkills.filter((s) => s.categoryName === selectedCategory), [selectedCategory, allSkills]);

    // Build physics bodies array whenever filteredSkills change
    useEffect(() => {
        const boundsWidth = containerRef.current?.clientWidth || 800;
        let currX = 20;
        let currY = 20;
        let rowHeight = 44;

        const initialBodies = filteredSkills.map((skill) => {
            const bodyWidth = Math.max(110, Math.min(270, Math.round(skill.name.length * 7.5 + 46)));
            const bodyHeight = 40;

            if (currX + bodyWidth > boundsWidth - 20) {
                currX = 20;
                currY += rowHeight + 12;
            }

            const startX = currX;
            const startY = currY;
            currX += bodyWidth + 12;

            return {
                id: skill.name,
                skill,
                x: startX,
                y: startY,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 2,
                width: bodyWidth,
                height: bodyHeight,
                el: null,
            };
        });

        bodiesRef.current = initialBodies;
        setPhysicsBodies(initialBodies);
    }, [filteredSkills]);

    // Reset physics function
    const resetPhysics = () => {
        const boundsWidth = containerRef.current?.clientWidth || 800;
        let currX = 20;
        let currY = 20;
        let rowHeight = 44;

        bodiesRef.current.forEach((b) => {
            if (currX + b.width > boundsWidth - 20) {
                currX = 20;
                currY += rowHeight + 12;
            }
            b.x = currX;
            b.y = currY;
            currX += b.width + 12;

            b.vx = (Math.random() - 0.5) * 2;
            b.vy = Math.random() * 2;
            if (b.el) {
                b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0px)`;
            }
        });
    };

    // Physics Animation Loop
    useEffect(() => {
        let lastTime = performance.now();

        const step = (time) => {
            const dt = Math.min((time - lastTime) / 1000, 0.033);
            lastTime = time;

            if (!containerRef.current) {
                animRef.current = requestAnimationFrame(step);
                return;
            }

            const boundsWidth = containerRef.current.clientWidth;
            const boundsHeight = containerRef.current.clientHeight;

            // Gravity force
            let gX = 0;
            let gY = 0;
            if (gravityMode === 'down') gY = 120;
            else if (gravityMode === 'up') gY = -120;
            else if (gravityMode === 'zero') { gY = 0; gX = 0; }

            const mouse = mouseRef.current;
            const dragged = draggedBodyRef.current;
            const bodies = bodiesRef.current;

            for (let i = 0; i < bodies.length; i++) {
                const b = bodies[i];

                if (b === dragged) {
                    continue;
                }

                // Apply gravity
                b.vx += gX * dt;
                b.vy += gY * dt;

                // Strong friction / damping to keep boxes calm and settle quickly
                b.vx *= 0.88;
                b.vy *= 0.88;

                // Stop micro-movements when nearly still
                if (Math.abs(b.vx) < 0.02) b.vx = 0;
                if (Math.abs(b.vy) < 0.02) b.vy = 0;

                // Mouse Repulsion Force ONLY when mouse is actively inside container
                if (mouse.active) {
                    const centerX = b.x + b.width / 2;
                    const centerY = b.y + b.height / 2;
                    const dx = centerX - mouse.x;
                    const dy = centerY - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    const repelRadius = 140;

                    if (distSq < repelRadius * repelRadius && distSq > 0.01) {
                        const dist = Math.sqrt(distSq);
                        const force = (1 - dist / repelRadius) * 220;
                        b.vx += (dx / dist) * force * dt * 10;
                        b.vy += (dy / dist) * force * dt * 10;
                    }
                }

                // Move body smoothly
                b.x += b.vx;
                b.y += b.vy;

                // Container Boundaries Collision
                const rest = 0.3;

                if (b.x < 10) {
                    b.x = 10;
                    b.vx = -b.vx * rest;
                } else if (b.x + b.width > boundsWidth - 10) {
                    b.x = boundsWidth - b.width - 10;
                    b.vx = -b.vx * rest;
                }

                if (b.y < 10) {
                    b.y = 10;
                    b.vy = -b.vy * rest;
                } else if (b.y + b.height > boundsHeight - 10) {
                    b.y = boundsHeight - b.height - 10;
                    b.vy = -b.vy * rest;
                    b.vx *= 0.7; // Floor friction
                }

                // Inter-body collision separation (no artificial energy injection)
                for (let j = i + 1; j < bodies.length; j++) {
                    const b2 = bodies[j];
                    if (b2 === dragged) continue;

                    const dx = (b2.x + b2.width / 2) - (b.x + b.width / 2);
                    const dy = (b2.y + b2.height / 2) - (b.y + b.height / 2);
                    const minDistX = (b.width + b2.width) / 2;
                    const minDistY = (b.height + b2.height) / 2;

                    if (Math.abs(dx) < minDistX && Math.abs(dy) < minDistY) {
                        const overlapX = minDistX - Math.abs(dx);
                        const overlapY = minDistY - Math.abs(dy);

                        if (overlapX < overlapY) {
                            const sign = dx > 0 ? 1 : -1;
                            b.x -= (overlapX / 2) * sign;
                            b2.x += (overlapX / 2) * sign;
                            b.vx *= 0.5;
                            b2.vx *= 0.5;
                        } else {
                            const sign = dy > 0 ? 1 : -1;
                            b.y -= (overlapY / 2) * sign;
                            b2.y += (overlapY / 2) * sign;
                            b.vy *= 0.5;
                            b2.vy *= 0.5;
                        }
                    }
                }

                // Update DOM transform
                if (b.el) {
                    b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0px)`;
                }
            }

            animRef.current = requestAnimationFrame(step);
        };

        animRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animRef.current);
    }, [gravityMode]);

    // Mouse/Touch handlers
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        mouseRef.current = { x: mouseX, y: mouseY, active: true };

        if (draggedBodyRef.current) {
            const b = draggedBodyRef.current;
            const now = performance.now();
            const dt = (now - lastMouseRef.current.t) / 1000 || 0.016;

            const nextX = mouseX - dragOffsetRef.current.x;
            const nextY = mouseY - dragOffsetRef.current.y;

            b.vx = (nextX - b.x) / dt * 0.15;
            b.vy = (nextY - b.y) / dt * 0.15;

            b.x = nextX;
            b.y = nextY;

            if (b.el) {
                b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0px)`;
            }

            lastMouseRef.current = { x: mouseX, y: mouseY, t: now };
        }
    };

    const handleMouseLeave = () => {
        mouseRef.current.active = false;
        draggedBodyRef.current = null;
    };

    const handlePointerDown = (body, e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        draggedBodyRef.current = body;
        dragOffsetRef.current = { x: mouseX - body.x, y: mouseY - body.y };
        lastMouseRef.current = { x: mouseX, y: mouseY, t: performance.now() };
    };

    const handlePointerUp = () => {
        draggedBodyRef.current = null;
    };

    // Shake container impulse
    const handleShake = () => {
        bodiesRef.current.forEach((b) => {
            b.vx += (Math.random() - 0.5) * 450;
            b.vy -= Math.random() * 350 + 150;
        });
    };

    return (
        <EditorialSection
            id="skills"
            ghost="SKILLS"
            eyebrowIndex="03"
            eyebrowLabel="SKILLS"
        >
            <div className="container skills-container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Technical Toolkit</span>
                        <h2 className="section-title">Capabilities & Infrastructure</h2>
                        <p className="section-subtitle">
                            The engine room: autonomous agent frameworks, cloud infrastructure, low-latency deployment, and systems programming.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Toolbar Controls */}
                <div className="skills-physics-toolbar">
                    <div className="skills-category-chips">
                        {['All', ...skillCategories.map((c) => c.name)].map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={`skills-chip ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat === 'All' ? 'All Skills' : cat}
                            </button>
                        ))}
                    </div>

                    <div className="skills-physics-controls">
                        <button
                            type="button"
                            className="skills-action-btn"
                            onClick={handleShake}
                            title="Shake container & toss boxes"
                        >
                            <FiZap /> Shake Box
                        </button>
                        <button
                            type="button"
                            className={`skills-action-btn ${gravityMode === 'down' ? 'active' : ''}`}
                            onClick={() => setGravityMode(gravityMode === 'down' ? 'zero' : 'down')}
                            title="Toggle Gravity"
                        >
                            <FiArrowDown /> {gravityMode === 'down' ? 'Gravity: ON' : 'Zero Gravity'}
                        </button>
                        <button
                            type="button"
                            className="skills-action-btn"
                            onClick={resetPhysics}
                            title="Reset positions"
                        >
                            <FiRefreshCw /> Reset
                        </button>
                    </div>
                </div>

                {/* Big Physics Container Box */}
                <div
                    ref={containerRef}
                    className="skills-physics-sandbox"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onPointerUp={handlePointerUp}
                >
                    <div className="skills-sandbox-badge">
                        <span>⚡ Physics Playground</span>
                        <span className="skills-sandbox-hint">Hover to displace • Drag to throw</span>
                    </div>

                    {physicsBodies.map((body) => {
                        const Icon = body.skill.icon;
                        const accent = body.skill.accent.name;
                        return (
                            <div
                                key={body.id}
                                ref={(el) => (body.el = el)}
                                className={`skill-physics-pill accent-${accent}`}
                                style={{
                                    transform: `translate3d(${body.x}px, ${body.y}px, 0px)`,
                                    width: `${body.width}px`,
                                    height: `${body.height}px`,
                                }}
                                onPointerDown={(e) => handlePointerDown(body, e)}
                            >
                                <div className="skill-pill-icon">
                                    {Icon ? <Icon /> : <span>●</span>}
                                </div>
                                <div className="skill-pill-text">
                                    <span className="skill-pill-name">{body.skill.name}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </EditorialSection>
    );
}
