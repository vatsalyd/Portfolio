import { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Preloader from './components/Preloader';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import DataShowcase from './components/DataShowcase';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          {/* Fixed background layer — stars/particles, z-index -1, no layout impact */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <ParticleBackground />
          </div>

          <Navbar />
          <CommandPalette />

          {/* Main content layer — sits above particles */}
          <main style={{ position: 'relative', zIndex: 1 }}>
            <Hero />
            <About />
            <Skills />
            <DataShowcase />
            <Projects />
            <Experience />
            <Contact />
          </main>

        </>
      )}
    </>
  );
}
