import { useRef, useEffect } from 'react';
import { FiFilm } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { favMovies } from '../data/portfolioData';

/**
 * The Taste — full-bleed continuous moving poster marquee.
 * Smoothly flows across the viewport in an endless seamless loop via RAF ticker.
 * Automatically pauses on hover so the visitor can inspect any title.
 */
function PosterCard({ movie }) {
    const posterSrc = movie.poster
        ? `${import.meta.env.BASE_URL}${movie.poster}`
        : null;

    return (
        <div className={`taste-poster-card accent-${movie.accent}`}>
            <div className="taste-poster-frame">
                {posterSrc ? (
                    <img
                        src={posterSrc}
                        alt={movie.title}
                        className="taste-poster-img"
                        loading="lazy"
                    />
                ) : (
                    <div className="taste-poster-placeholder">
                        <FiFilm className="taste-poster-icon" />
                        <span>{movie.title}</span>
                    </div>
                )}

                {/* Year tag */}
                <div className="taste-poster-tag">
                    <span>{movie.year}</span>
                </div>

                {/* Hover Reveal Card Overlay */}
                <div className="taste-poster-overlay">
                    <div className="taste-poster-overlay-top">
                        <span className="taste-poster-year">{movie.year}</span>
                        {movie.director && (
                            <span className="taste-poster-director">Dir. {movie.director}</span>
                        )}
                    </div>
                    <h3 className="taste-poster-title">{movie.title}</h3>
                    {movie.note && (
                        <p className="taste-poster-note">"{movie.note}"</p>
                    )}
                </div>
            </div>

            {/* Bottom Caption */}
            <div className="taste-poster-caption">
                <span className="taste-caption-title">{movie.title}</span>
                <span className="taste-caption-year">{movie.year}</span>
            </div>
        </div>
    );
}

export default function FavMovies() {
    const trackRef = useRef(null);
    const posRef = useRef(0);
    const isPausedRef = useRef(false);
    const animIdRef = useRef(null);

    // Duplicate list 3 times to guarantee smooth infinite seamless looping
    const repeatedMovies = [...favMovies, ...favMovies, ...favMovies];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let lastTime = performance.now();
        const speed = 48; // pixels per second (buttery smooth glide)

        const step = (time) => {
            const dt = Math.min((time - lastTime) / 1000, 0.1);
            lastTime = time;

            if (!isPausedRef.current && track) {
                // One set width is total scrollWidth divided by 3 (since duplicated 3 times)
                const singleSetWidth = track.scrollWidth / 3;
                if (singleSetWidth > 0) {
                    posRef.current += speed * dt;
                    if (posRef.current >= singleSetWidth) {
                        posRef.current -= singleSetWidth;
                    }
                    track.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
                }
            }

            animIdRef.current = requestAnimationFrame(step);
        };

        animIdRef.current = requestAnimationFrame(step);

        return () => {
            if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
        };
    }, []);

    return (
        <EditorialSection
            id="taste"
            ghost="CINEMA"
            eyebrowIndex="09"
            eyebrowLabel="THE TASTE"
        >
            {/* Alias for backward compatibility if navigated via #movies */}
            <span id="movies" style={{ position: 'absolute', top: 0 }} />

            <div className="taste-section-wrapper">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header taste-header">
                            <span className="section-label">// Cinema & Culture</span>
                            <h2 className="section-title">The Taste</h2>
                            <p className="section-subtitle">
                                Stories, characters, and aesthetics that inspire my creative & analytical thinking.
                                An endless reel of favourites — hover any poster to pause and inspect.
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
                        {repeatedMovies.map((movie, index) => (
                            <PosterCard
                                key={`${movie.title}-${index}`}
                                movie={movie}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </EditorialSection>
    );
}


