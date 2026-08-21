import { useRef, useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { favCharacters } from '../data/portfolioData';

/**
 * The Characters — full-bleed continuous moving character poster marquee.
 * Moves in the OPPOSITE direction of The Taste section (rightwards glide).
 * Automatically pauses on hover so the visitor can inspect any title.
 */
function CharacterCard({ character }) {
    const posterSrc = character.poster
        ? `${import.meta.env.BASE_URL}${character.poster}`
        : null;

    return (
        <div className={`taste-poster-card accent-${character.accent}`}>
            <div className="taste-poster-frame">
                {posterSrc ? (
                    <img
                        src={posterSrc}
                        alt={character.title}
                        className="taste-poster-img"
                        loading="lazy"
                    />
                ) : (
                    <div className="taste-poster-placeholder">
                        <FiUser className="taste-poster-icon" />
                        <span>{character.title}</span>
                    </div>
                )}

                {/* Tag */}
                <div className="taste-poster-tag">
                    <span>{character.source}</span>
                </div>

                {/* Hover Reveal Card Overlay */}
                <div className="taste-poster-overlay">
                    <div className="taste-poster-overlay-top">
                        <span className="taste-poster-year">{character.source}</span>
                        {character.subtitle && (
                            <span className="taste-poster-director">{character.subtitle}</span>
                        )}
                    </div>
                    <h3 className="taste-poster-title">{character.title}</h3>
                    {character.note && (
                        <p className="taste-poster-note">"{character.note}"</p>
                    )}
                </div>
            </div>

            {/* Bottom Caption */}
            <div className="taste-poster-caption">
                <span className="taste-caption-title">{character.title}</span>
                <span className="taste-caption-year">{character.subtitle || character.source}</span>
            </div>
        </div>
    );
}

export default function Characters() {
    const trackRef = useRef(null);
    const posRef = useRef(0);
    const isPausedRef = useRef(false);
    const animIdRef = useRef(null);

    // Duplicate list 3 times to guarantee smooth infinite seamless looping
    const repeatedCharacters = [...favCharacters, ...favCharacters, ...favCharacters];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let lastTime = performance.now();
        const speed = 48; // pixels per second (opposite direction)

        const step = (time) => {
            const dt = Math.min((time - lastTime) / 1000, 0.1);
            lastTime = time;

            if (!isPausedRef.current && track) {
                const singleSetWidth = track.scrollWidth / 3;
                if (singleSetWidth > 0) {
                    // Move in the opposite direction (decrement posRef)
                    posRef.current -= speed * dt;
                    if (posRef.current <= 0) {
                        posRef.current += singleSetWidth;
                    }
                    track.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
                }
            }

            animIdRef.current = requestAnimationFrame(step);
        };

        // Initialize posRef at singleSetWidth so it starts mid-track and scrolls backwards smoothly
        requestAnimationFrame(() => {
            if (track && track.scrollWidth > 0) {
                posRef.current = track.scrollWidth / 3;
            }
        });

        animIdRef.current = requestAnimationFrame(step);

        return () => {
            if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
        };
    }, []);

    return (
        <EditorialSection
            id="characters"
            ghost="ICONS"
            eyebrowIndex="08"
            eyebrowLabel="CHARACTERS"
        >
            <div className="taste-section-wrapper">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header taste-header">
                            <span className="section-label">// Archetypes & Icons</span>
                            <h2 className="section-title">The Characters</h2>
                            <p className="section-subtitle">
                                Iconic figures, relentless mindsets, and complex antiheroes that define great storytelling.
                                An endless reel — hover any character to pause and inspect.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Marquee Full Bleed Viewport Track */}
                <div
                    className="taste-marquee-viewport"
                    onMouseEnter={() => { isPausedRef.current = true; }}
                    onMouseLeave={() => { isPausedRef.current = false; }}
                >
                    <div className="taste-marquee-track" ref={trackRef}>
                        {repeatedCharacters.map((character, index) => (
                            <CharacterCard
                                key={`${character.title}-${index}`}
                                character={character}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </EditorialSection>
    );
}
