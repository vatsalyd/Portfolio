import { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
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
          {/* Fixed background layer — subtle aurora particles, z-index 0 */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <ParticleBackground />
          </div>

          <Navbar />
          <SectionMap />

          {/* Main content layer */}
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
