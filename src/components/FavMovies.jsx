import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { favMovies } from '../data/portfolioData';

/**
 * FavMovies — off-duty picks with a 3D tilt on hover.
 *
 * Each card surfaces the title, year, and a one-line note. When `poster`
 * is set the poster image is shown; until the files arrive a typographic
 * monogram derived from the title is rendered instead. There are no
 * emoji glyphs here — the design language stays editorial across every
 * section of the portfolio.
 */
function MovieCard({ movie, index }) {
    const ref = useRef(null);

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -8;
        const ry = ((x - cx) / cx) * 8;
        el.style.transform =
            `perspective(700px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
    };

    const handleLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    };

    // Two-letter monogram from the title for the no-poster cover.
    const monogram = movie.title
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    return (
        <ScrollReveal delay={index < 3 ? index * 0.05 : 0}>
            <div
                ref={ref}
                className={`movie-card accent-${movie.accent}`}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                style={{ transition: 'transform 0.18s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease' }}
            >
                <div className="movie-poster">
                    {movie.poster ? (
                        <img src={movie.poster} alt="" />
                    ) : (
                        <span className="movie-monogram">{monogram}</span>
                    )}
                </div>
                <div className="movie-body">
                    <div className="movie-title">{movie.title}</div>
                    <div className="movie-year">{movie.year}</div>
                    <div className="movie-note">{movie.note}</div>
                </div>
            </div>
        </ScrollReveal>
    );
}

export default function FavMovies() {
    return (
        <EditorialSection
            id="movies"
            ghost="REELS"
            eyebrowIndex="07"
            eyebrowLabel="REELS"
        >
            <div className="container movies-container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Off-Duty</span>
                        <h2 className="section-title">Favourite Films</h2>
                        <p className="section-subtitle">
                            A little honesty before the contact form — when models aren't training, this is what I'm watching. Hover a card to tilt it.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="movies-grid">
                    {favMovies.map((movie, i) => (
                        <MovieCard key={movie.title} movie={movie} index={i} />
                    ))}
                </div>
            </div>
        </EditorialSection>
    );
}
