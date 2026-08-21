import AncientMap from './components/AncientMap';
import HeroChat from './components/HeroChat';
import OpenSource from './components/OpenSource';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Articles from './components/Articles';
import FavMovies from './components/FavMovies';
import Characters from './components/Characters';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
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
        <HeroChat />
        <OpenSource />
        <Skills />
        <Projects />
        <Experience />
        <Articles />
        <FavMovies />
        <Characters />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

