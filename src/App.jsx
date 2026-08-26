import AncientMap from './components/AncientMap';
import CustomCursor from './components/CustomCursor';
import HeroChat from './components/HeroChat';
import MiniVatsalTerminal from './components/MiniVatsalTerminal';
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
      {/* Interactive adaptive custom cursor */}
      <CustomCursor />

      {/* Parchment-map navigation */}
      <AncientMap />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroChat />
        <MiniVatsalTerminal />
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
