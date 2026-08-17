import { useState } from 'react';
import Preloader from './components/Preloader';
import AncientMap from './components/AncientMap';
import Hero from './components/Hero';
import MiniChatbot from './components/MiniChatbot';
import OpenSource from './components/OpenSource';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Articles from './components/Articles';
import FavMovies from './components/FavMovies';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          {/* Cream-paper background: subtle grain + faint warm radial come
              from body::before / body::after in index.css — no aurora blobs,
              they clash with the editorial light palette. */}

          {/* Parchment-map navigation replaces the conventional header. A
              single corner glyph (compass) opens a full-screen aged-paper
              map of every section. A scroll progress hairline at the very
              top of the viewport keeps a sense of position on the page. */}
          <AncientMap />

          <main style={{ position: 'relative', zIndex: 1 }}>
            <Hero />
            <MiniChatbot />
            <OpenSource />
            <Skills />
            <Projects />
            <Experience />
            <Articles />
            <FavMovies />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
