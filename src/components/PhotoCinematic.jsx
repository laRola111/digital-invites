import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import photo1 from '../assets/images/photo1.jpg';
import photo2 from '../assets/images/photo2.jpg';
import photo3 from '../assets/images/photo3.jpg';
import photo4 from '../assets/images/photo4.jpg';
import photo5 from '../assets/images/photo5.jpg';

const photos = [photo1, photo2, photo3, photo4, photo5];

const SLIDE_DURATION = 2200; // ms per photo

const kenBurnsVariants = [
  { initial: { scale: 1.1, x: '2%', y: '1%' }, animate: { scale: 1, x: '0%', y: '0%' } },
  { initial: { scale: 1.08, x: '-2%', y: '0%' }, animate: { scale: 1, x: '0%', y: '0%' } },
  { initial: { scale: 1.12, x: '0%', y: '2%' }, animate: { scale: 1, x: '0%', y: '0%' } },
  { initial: { scale: 1.09, x: '1%', y: '-1%' }, animate: { scale: 1.04, x: '-1%', y: '0%' } },
  { initial: { scale: 1.06, x: '-1%', y: '0%' }, animate: { scale: 1.02, x: '1%', y: '-1%' } },
];

const PhotoCinematic = ({ lang = 'es', isActive = false }) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setPrev(current);
      setCurrent(c => (c + 1) % photos.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isActive, current]);

  const kb = kenBurnsVariants[current % kenBurnsVariants.length];

  return (
    <section
      id="gallery"
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      {/* Photo layer */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, ...kb.initial }}
          animate={{ opacity: 1, ...kb.animate }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, default: { duration: SLIDE_DURATION / 1000 + 1.5, ease: 'easeOut' } }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        >
          <img
            src={photos[current]}
            alt={`Foto ${current + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic overlay gradients */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)',
      }} />
      {/* Left/right vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.2) 100%)',
      }} />

      {/* Floating glitter on top of photos */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -(Math.random() * 200 + 100)],
              x: [(Math.random() - 0.5) * 20],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              delay: Math.random() * 6,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80 + 20}%`,
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              backgroundColor: i % 3 === 0 ? 'rgba(212,175,55,0.9)' : i % 3 === 1 ? 'rgba(255,255,255,0.9)' : 'rgba(250,218,221,0.9)',
              borderRadius: i % 2 === 0 ? '50%' : '2px',
              boxShadow: '0 0 6px rgba(212,175,55,0.8)',
            }}
          />
        ))}
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        padding: '0 1.5rem 3rem',
        width: '100%',
      }}>
        {/* Photo dots indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: '1.5rem' }}>
          {photos.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === current ? 24 : 8,
                opacity: i === current ? 1 : 0.4,
              }}
              transition={{ duration: 0.4 }}
              style={{
                height: 3,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontFamily: 'var(--font-luxury)',
            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontStyle: 'italic',
          }}
        >
          {lang === 'es' ? 'Nuestros momentos' : 'Our moments'}
        </motion.p>
      </div>
    </section>
  );
};

export default PhotoCinematic;
