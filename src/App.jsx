import { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import SectionMap from './components/SectionMap';
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
          <Navbar />
          <SectionMap />

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
