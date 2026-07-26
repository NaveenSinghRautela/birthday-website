import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedBackground from './components/background/AnimatedBackground';
import MusicPlayer from './components/player/MusicPlayer';
import HeroGiftSection from './sections/HeroGiftSection';
import SecretCodeSection from './sections/SecretCodeSection';
import CakeSection from './sections/CakeSection';
import GallerySection from './sections/GallerySection';
import WishesSection from './sections/WishesSection';
import PuzzleSection from './sections/PuzzleSection';
import LoveLetterSection from './sections/LoveLetterSection';
import FinaleSection from './sections/FinaleSection';

// The site plays out as a sequence of full-screen chapters rather than
// a long scroll — add new ids here as each chapter section is built.
const CHAPTERS = ['hero', 'code', 'cake', 'gallery', 'wishes', 'puzzle',  'letter', 'finale'] as const;
type Chapter = (typeof CHAPTERS)[number];

export default function App() {
  const [chapter, setChapter] = useState<Chapter>('hero');
  const goTo = (c: Chapter) => setChapter(c);

  return (
    <div className="relative min-h-screen w-full">
      <AnimatedBackground />
      <MusicPlayer />
      <main>
        <AnimatePresence mode="wait">
          {chapter === 'hero' && (
            <motion.div key="hero" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <HeroGiftSection onContinue={() => goTo('code')} />
            </motion.div>
          )}
          {chapter === 'code' && (
            <motion.div key="code" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <SecretCodeSection onContinue={() => goTo('cake')} />
            </motion.div>
          )}
          {chapter === 'cake' && (
            <motion.div key="cake" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <CakeSection onContinue={() => goTo('gallery')} />
            </motion.div>
          )}
          {chapter === 'gallery' && (
            <motion.div key="gallery" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <GallerySection onContinue={() => goTo('wishes')} />
            </motion.div>
          )}
          {chapter === 'wishes' && (
            <motion.div key="wishes" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <WishesSection onContinue={() => goTo('puzzle')} />
            </motion.div>
          )}
          {chapter === 'puzzle' && (
            <motion.div key="puzzle" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <PuzzleSection onContinue={() => goTo('letter')} />
            </motion.div>
          )}
          {chapter === 'letter' && (
            <motion.div key="letter" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <LoveLetterSection onContinue={() => goTo('finale')} />
            </motion.div>
          )}
          {chapter === 'finale' && (
            <motion.div key="finale" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <FinaleSection onRestart={() => goTo('hero')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
