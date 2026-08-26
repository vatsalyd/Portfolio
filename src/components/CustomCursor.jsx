import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * CustomCursor — High-performance floating cursor with adaptive modes.
 *
 * Modes:
 *   - 'default': minimal refined dot + smooth outer follower ring
 *   - 'pointer': expanded magnetic ring when hovering interactive elements
 *   - 'drag': floating capsule pill displaying "DRAG" when hovering carousel / draggable sections
 *   - 'dragging': compressed "DRAGGING" pill while actively holding & dragging
 */
export default function CustomCursor() {
    const [cursorType, setCursorType] = useState('default'); // 'default' | 'pointer' | 'drag' | 'dragging'
    const [isVisible, setIsVisible] = useState(false);
    const isMouseDown = useRef(false);

    // Mouse coordinates with spring smoothing for buttery 60/120fps motion
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const smoothOptions = { damping: 28, stiffness: 350, mass: 0.5 };
    const cursorX = useSpring(mouseX, smoothOptions);
    const cursorY = useSpring(mouseY, smoothOptions);

    useEffect(() => {
        // Disable on touch-only devices
        if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
            return;
        }

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Check if cursor is over a draggable section (Projects Splide or data-cursor="drag")
            const target = e.target;
            const isDragArea = target.closest('.projects-carousel-wrapper, .projects-splide, [data-cursor="drag"]');
            const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], .project-open-case-btn, .project-icon-link');

            if (isDragArea && !isInteractive) {
                setCursorType(isMouseDown.current ? 'dragging' : 'drag');
            } else if (isInteractive) {
                setCursorType('pointer');
            } else {
                setCursorType('default');
            }
        };

        const handleMouseDown = () => {
            isMouseDown.current = true;
            setCursorType((prev) => (prev === 'drag' ? 'dragging' : prev));
        };

        const handleMouseUp = () => {
            isMouseDown.current = false;
            setCursorType((prev) => (prev === 'dragging' ? 'drag' : prev));
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <div className="custom-cursor-container" aria-hidden="true">
            {/* Minimal Leading Center Dot */}
            {cursorType !== 'drag' && cursorType !== 'dragging' && (
                <motion.div
                    className="custom-cursor-dot"
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                />
            )}

            {/* Smooth Floating Outer Follower / Drag Pill */}
            <motion.div
                className={`custom-cursor-follower mode-${cursorType}`}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: cursorType === 'dragging' ? 0.94 : 1,
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
                {(cursorType === 'drag' || cursorType === 'dragging') && (
                    <span className="cursor-drag-text">
                        {cursorType === 'dragging' ? 'DRAGGING' : 'DRAG ↔'}
                    </span>
                )}
            </motion.div>
        </div>
    );
}
