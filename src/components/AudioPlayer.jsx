import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

import audioFile from '../assets/audio/a-thousand-years.mp3';

const AudioPlayer = ({ lang = 'es' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(audioFile);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    // Fade-in volume function
    const fadeIn = () => {
      let vol = 0;
      clearInterval(fadeRef.current);
      fadeRef.current = setInterval(() => {
        if (audioRef.current && vol < 0.65) {
          vol = Math.min(vol + 0.02, 0.65);
          audioRef.current.volume = vol;
        } else {
          clearInterval(fadeRef.current);
        }
      }, 80);
    };

    // Try immediate autoplay
    audio.play()
      .then(() => { setIsPlaying(true); fadeIn(); })
      .catch(() => {
        // Fallback: play on first interaction
        const onInteract = () => {
          audio.play().then(() => { setIsPlaying(true); fadeIn(); }).catch(() => {});
          document.removeEventListener('click', onInteract);
          document.removeEventListener('touchstart', onInteract);
        };
        document.addEventListener('click', onInteract, { once: true });
        document.addEventListener('touchstart', onInteract, { once: true });
      });

    return () => {
      clearInterval(fadeRef.current);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const label = isPlaying
    ? (lang === 'es' ? 'Pausar música' : 'Pause music')
    : (lang === 'es' ? 'Reproducir música' : 'Play music');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6, type: 'spring', stiffness: 180 }}
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {/* Pulse ring when playing */}
      {isPlaying && (
        <>
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 52, height: 52,
              borderRadius: '50%',
              border: '1.5px solid var(--color-gold)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.9, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'absolute',
              width: 52, height: 52,
              borderRadius: '50%',
              border: '1px solid rgba(212,175,55,0.4)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      <motion.button
        onClick={togglePlay}
        title={label}
        aria-label={label}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        style={{
          width: 50, height: 50,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-champagne), var(--color-nude))',
          border: '1px solid var(--color-gold)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(212,175,55,0.35), 0 0 40px rgba(212,175,55,0.1)',
          color: 'var(--color-gold)',
          position: 'relative',
        }}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>

      <motion.span
        animate={isPlaying ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.4 }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          fontSize: '0.6rem',
          color: 'var(--color-gold)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {isPlaying ? '♪ ♫ ♪' : '—'}
      </motion.span>
    </motion.div>
  );
};

export default AudioPlayer;
