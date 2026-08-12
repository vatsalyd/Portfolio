import { useRef } from 'react';
import { FiFilm } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { favMovies } from '../data/portfolioData';

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
        const rx = ((y - cy) / cy) * -8; // tilt X (rotateX)
        const ry = ((x - cx) / cx) * 8;  // tilt Y (rotateY)
        el.style.transform = `perspective(700px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
        // Subtle glow that follows cursor
        el.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(139,92,246,0.12), var(--bg-card) 60%)`;
    };

    const handleLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        el.style.background = '';
    };

    return (
        <ScrollReveal delay={index < 3 ? index * 0.05 : 0}>
            <div
                ref={ref}
                className={`movie-card accent-${movie.accent}`}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                style={{ transition: 'transform 0.18s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease' }}
            >
                <div className="movie-emoji">{movie.emoji}</div>
                <div>
                    <div className="movie-title">{movie.title}</div>
                    <div className="movie-year">{movie.year}</div>
                </div>
                <div className="movie-note">{movie.note}</div>
            </div>
        </ScrollReveal>
    );
}

export default function FavMovies() {
    return (
        <section id="movies" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Off-Duty</span>
                        <h2 className="section-title">Favourite Films</h2>
                        <p className="section-subtitle">
                            A little honesty before the contact form — when models aren't training, this is what I'm watching. Hover the cards to tilt them.
                        </p>
                    </div>
                </ScrollReveal>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: 18,
                    maxWidth: 900,
                    margin: '0 auto',
                }}>
                    {favMovies.map((movie, i) => (
                        <MovieCard key={movie.title} movie={movie} index={i} />
                    ))}
                </div>

                <div style={{
                    textAlign: 'center',
                    marginTop: 28,
                    display: 'inline-flex',
                    gap: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)',
                }}>
                    <FiFilm style={{ color: 'var(--accent-violet)' }} />
                    Placeholder picks — swap me out for real favourites later.
                </div>
            </div>
        </section>
    );
}
