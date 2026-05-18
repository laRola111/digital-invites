import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import AudioPlayer from './components/AudioPlayer';
import ParentsMessage from './components/ParentsMessage';
import PhotoGallery from './components/PhotoGallery';
import Timeline from './components/Timeline';
import Countdown from './components/Countdown';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  const [lang, setLang] = useState('es');

  return (
    <div className="App" style={{ backgroundColor: 'var(--color-bg-light)', position: 'relative' }}>
      <ParticlesBackground />

      {/* Language Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          display: 'flex',
          gap: '4px',
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(8px)',
          borderRadius: '30px',
          padding: '4px',
          border: '1px solid var(--color-champagne)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        }}
      >
        {['es', 'en'].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: '6px 14px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              backgroundColor: lang === l ? 'var(--color-gold)' : 'transparent',
              color: lang === l ? 'white' : 'var(--color-gold)',
            }}
          >
            {l === 'es' ? '🇲🇽 ES' : '🇺🇸 EN'}
          </button>
        ))}
      </motion.div>

      <AudioPlayer lang={lang} />

      <WelcomeScreen lang={lang} />
      <ParentsMessage lang={lang} />
      <PhotoGallery />
      <Timeline lang={lang} />
      <Countdown lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}

export default App;
