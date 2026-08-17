import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * EditorialSection — the Noah-styled shell every section sits inside.
 *
 * Renders three editorial devices:
 *   1. A giant Playfair "ghost" word sat behind the content (Noah's .bold).
 *   2. A rotated vertical eyebrow on the left edge: "{index} ── {label}".
 *   3. A scroll "lit" effect — when the section enters view the ghost
 *      word warms from warm-sand toward pale mentos-violet, tying Noah's
 *      ghost-letter device to the parchment-map navigation's active
 *      region (each section "lights up" as it scrolls past).
 *
 * The <section> keeps the caller-supplied id so the Ancient Map overlay's
 * click-to-scroll handler can still locate it. Content is the only value
 * callers pass; the editorial scaffolding is invisible to them.
 */
export default function EditorialSection({
    id,
    ghost,           // short word shown giant behind content (e.g. "INTRO")
    eyebrowIndex,   // "01".."09"
    eyebrowLabel,   // "INTRO" / "CHAT" / "OPEN SOURCE" …
    children,
    className = '',
    contentClassName = '',
    style = {},
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-15% 0px -15% 0px' });

    return (
        <section
            id={id}
            ref={ref}
            className={`editorial-section ${isInView ? 'is-lit' : ''} ${className}`}
            style={style}
        >
            {/* Giant ghost Playfair word behind content */}
            {ghost && (
                <span className="section-ghost" aria-hidden="true">{ghost}</span>
            )}

            {/* Rotated vertical eyebrow on the left edge */}
            {eyebrowLabel && (
                <span className="section-eyebrow" aria-hidden="true">
                    {eyebrowIndex && (
                        <span className="section-eyebrow-index">{eyebrowIndex}</span>
                    )}
                    <span className="section-eyebrow-rule" />
                    {eyebrowLabel}
                </span>
            )}

            {/* Content sits above the ghost */}
            <div className={`editorial-content ${contentClassName}`}>
                {children}
            </div>
        </section>
    );
}
