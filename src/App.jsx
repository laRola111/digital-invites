import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AutoplayProvider, useAutoplay } from './context/AutoplayContext';

import ParticlesBackground from './components/ParticlesBackground';
import AudioPlayer       from './components/AudioPlayer';
import WelcomeScreen     from './components/WelcomeScreen';
import ParentsMessage    from './components/ParentsMessage';
import PhotoCinematic    from './components/PhotoCinematic';
import Timeline          from './components/Timeline';
import Countdown         from './components/Countdown';
import Footer            from './components/Footer';

// ─── Inner app: uses autoplay context ───────────────────────────────────────
const CinematicInvite = () => {
  const [lang, setLang] = useState('es');
  const { currentScene, progressPercent, registerScene, start, isPlaying, pause, resume } = useAutoplay();

  // Register section refs for scroll targeting
  const sceneEls = useRef({});
  const setRef = (index) => (el) => {
    if (el && !sceneEls.current[index]) {
      sceneEls.current[index] = el;
      registerScene(index, el);
    }
  };

  // Kick off autoplay on mount
  useEffect(() => {
    const timer = setTimeout(() => start(), 300);
    return () => clearTimeout(timer);
  }, [start]);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-light)', position: 'relative', overflowX: 'hidden' }}>

      {/* ── Cinematic progress bar ────────────────────────────────── */}
      <div
        className="cinema-progress-bar"
        style={{ width: `${progressPercent}%` }}
      />

      {/* ── Language toggle ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 16, left: 16,
          zIndex: 9500,
          display: 'flex',
          gap: 4,
          backgroundColor: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(12px)',
          borderRadius: 50,
          padding: '4px 5px',
          border: '1px solid rgba(212,175,55,0.25)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {['es', 'en'].map(l => (
          <motion.button
            key={l}
            onClick={() => setLang(l)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '5px 14px',
              borderRadius: 50,
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.3s ease',
              backgroundColor: lang === l ? 'var(--color-gold)' : 'transparent',
              color: lang === l ? '#fff' : 'var(--color-gold)',
            }}
          >
            {l === 'es' ? '🇲🇽 ES' : '🇺🇸 EN'}
          </motion.button>
        ))}
      </motion.div>

      {/* ── Pause/play autoplay ───────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={() => isPlaying ? pause() : resume()}
        title={isPlaying ? (lang === 'es' ? 'Pausar experiencia' : 'Pause experience') : (lang === 'es' ? 'Continuar' : 'Resume')}
        style={{
          position: 'fixed',
          bottom: 28, left: 28,
          zIndex: 9000,
          width: 40, height: 40,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(212,175,55,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          fontSize: '0.9rem',
          color: 'var(--color-gold)',
        }}
      >
        {isPlaying ? '⏸' : '▶'}
      </motion.button>

      {/* ── Audio ────────────────────────────────────────────────── */}
      <AudioPlayer lang={lang} />

      {/* ── Particles ────────────────────────────────────────────── */}
      <ParticlesBackground />

      {/* ═══ SCENES ══════════════════════════════════════════════ */}

      {/* Scene 0 — Welcome */}
      <div ref={setRef(0)} id="scene-welcome">
        <WelcomeScreen lang={lang} isActive={currentScene >= 0} />
      </div>

      {/* Scene 1 — Parents */}
      <div ref={setRef(1)} id="scene-parents">
        <ParentsMessage lang={lang} isActive={currentScene >= 1} />
      </div>

      {/* Scene 2 — Photos */}
      <div ref={setRef(2)} id="scene-gallery">
        <PhotoCinematic lang={lang} isActive={currentScene >= 2} />
      </div>

      {/* Scene 3 — Timeline */}
      <div ref={setRef(3)} id="scene-timeline">
        <Timeline lang={lang} />
      </div>

      {/* Scene 4 — Countdown */}
      <div ref={setRef(4)} id="scene-countdown">
        <Countdown lang={lang} />
      </div>

      {/* Scene 5 — Footer */}
      <div ref={setRef(5)} id="scene-footer">
        <Footer lang={lang} />
      </div>

    </div>
  );
};

// ─── Root ────────────────────────────────────────────────────────────────────
function App() {
  return (
    <AutoplayProvider>
      <CinematicInvite />
    </AutoplayProvider>
  );
}

export default App;
