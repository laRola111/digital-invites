import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

import audioFile from '../assets/audio/a-thousand-years.mp3';

const AudioPlayer = ({ lang = 'es' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(audioFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    // Auto-play on first user interaction (browsers require it)
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(() => {});
      }
    };

    // Try immediate autoplay
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setHasInteracted(true);
    }).catch(() => {
      // Fallback: play on first click/touch anywhere
      document.addEventListener('click', handleFirstInteraction, { once: true });
      document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  const label = lang === 'es'
    ? (isPlaying ? 'Pausar música' : 'Reproducir música')
    : (isPlaying ? 'Pause music' : 'Play music');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {/* Pulse ring when playing */}
      {isPlaying && (
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid var(--color-gold)',
            pointerEvents: 'none',
          }}
        />
      )}
      <button
        onClick={togglePlay}
        title={label}
        aria-label={label}
        className="glow-effect"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-champagne)',
          border: '1px solid var(--color-gold)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
          color: 'var(--color-gold)',
          position: 'relative',
        }}
      >
        {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>
      <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.8 }}>
        {isPlaying ? '♪ ♫' : '—'}
      </span>
    </motion.div>
  );
};

export default AudioPlayer;
