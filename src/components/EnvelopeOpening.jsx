import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Glitter particle component
const GlitterParticle = ({ x, y, size, duration, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, x, y, scale: 0, rotate: 0 }}
    animate={{
      opacity: [0, 1, 0.8, 0],
      y: [y, y - 200 - Math.random() * 300],
      x: [x, x + (Math.random() - 0.5) * 200],
      scale: [0, 1, 0.8, 0],
      rotate: [0, Math.random() * 720],
    }}
    transition={{ duration, delay, ease: 'easeOut' }}
    style={{
      position: 'absolute',
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      pointerEvents: 'none',
      zIndex: 20,
      boxShadow: `0 0 ${size * 2}px ${color}`,
    }}
  />
);

// Word-by-word text reveal
const WordReveal = ({ text, delay = 0, style = {}, className = '' }) => {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline', ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: delay + i * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const EnvelopeOpening = ({ lang = 'es', onComplete }) => {
  const [phase, setPhase] = useState('idle');
  // phases: idle → glow → lidOpen → contentReveal → textReveal → done
  const [glitterParts, setGlitterParts] = useState([]);
  const containerRef = useRef(null);

  const colors = [
    'rgba(212,175,55,0.9)',
    'rgba(250,218,221,0.9)',
    'rgba(244,194,194,0.9)',
    'rgba(255,255,255,0.9)',
    'rgba(227,194,176,0.9)',
  ];

  useEffect(() => {
    const t0 = setTimeout(() => setPhase('glow'), 400);
    const t1 = setTimeout(() => setPhase('lidOpen'), 1400);
    const t2 = setTimeout(() => {
      setPhase('contentReveal');
      // spawn glitter
      const parts = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 300,
        y: 0,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setGlitterParts(parts);
    }, 2800);
    const t3 = setTimeout(() => setPhase('textReveal'), 3600);
    const t4 = setTimeout(() => { setPhase('done'); onComplete?.(); }, 5400);
    return () => [t0, t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  const envelopeW = Math.min(340, window.innerWidth * 0.85);
  const envelopeH = envelopeW * 0.65;

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'radial-gradient(ellipse at center, #fff5f0 0%, #fadadd 40%, #f4c2c2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient light pulse */}
      <motion.div
        animate={phase === 'glow' || phase === 'lidOpen' || phase === 'contentReveal'
          ? { opacity: [0, 0.5, 0.3], scale: [0.8, 1.2, 1] }
          : {}}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          maxWidth: 500,
          maxHeight: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Glitter particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {glitterParts.map(p => <GlitterParticle key={p.id} {...p} />)}
      </div>

      {/* Envelope assembly */}
      <div
        className="envelope-wrapper"
        style={{ position: 'relative', zIndex: 10, width: envelopeW }}
      >
        {/* Envelope Lid (top flap) */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={
            phase === 'lidOpen' || phase === 'contentReveal' || phase === 'textReveal' || phase === 'done'
              ? { rotateX: -165 }
              : { rotateX: 0 }
          }
          transition={{ duration: 1.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            width: '100%',
            height: envelopeH * 0.55,
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <div
            className="envelope-lid"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px 8px 0 0',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: `linear-gradient(160deg, #f5e6d3, #e8d5bc)`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            }}
          />
          {/* Wax seal on lid */}
          <motion.div
            animate={phase === 'glow' ? { boxShadow: '0 0 20px rgba(212,175,55,0.8)' } : {}}
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37, #c49a2a)',
              boxShadow: '0 2px 10px rgba(212,175,55,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
          >
            ✦
          </motion.div>
        </motion.div>

        {/* Envelope Body */}
        <motion.div
          initial={{ opacity: 0.4, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="envelope-body"
          style={{
            width: '100%',
            height: envelopeH,
            borderRadius: '0 0 12px 12px',
            marginTop: -2,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '1.5rem',
          }}
        >
          {/* Decorative lines on envelope */}
          <div style={{ position: 'absolute', inset: 10, border: '1px solid rgba(201,168,124,0.3)', borderRadius: 8, pointerEvents: 'none' }} />

          {/* Inner card that slides up out of envelope */}
          <AnimatePresence>
            {(phase === 'contentReveal' || phase === 'textReveal' || phase === 'done') && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: -envelopeH * 0.4, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'linear-gradient(160deg, #fffaf6 0%, #fff5ee 100%)',
                  borderRadius: 12,
                  border: '1px solid rgba(212,175,55,0.3)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1), 0 0 60px rgba(212,175,55,0.1)',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '0.8rem',
                  minWidth: envelopeW * 0.85,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Shimmer sweep on card */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '300%' }}
                  transition={{ delay: 0.8, duration: 1.2, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: 0, bottom: 0,
                    width: '30%',
                    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)',
                    transform: 'skewX(-15deg)',
                    pointerEvents: 'none',
                  }}
                />

                {/* MIS XV */}
                {(phase === 'textReveal' || phase === 'done') && (
                  <>
                    <motion.p
                      initial={{ opacity: 0, letterSpacing: '2px' }}
                      animate={{ opacity: 1, letterSpacing: '10px' }}
                      transition={{ duration: 1.2, delay: 0.1 }}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.7rem',
                        color: 'var(--color-gold)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                      }}
                    >
                      {lang === 'es' ? 'Con alegría celebramos' : 'Joyfully celebrating'}
                    </motion.p>

                    <motion.h1
                      initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="animate-glow"
                      style={{
                        fontFamily: 'var(--font-luxury)',
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        color: 'var(--color-gold)',
                        lineHeight: 1,
                        fontStyle: 'italic',
                        fontWeight: 300,
                      }}
                    >
                      {lang === 'es' ? 'Mis XV' : 'My XV'}
                    </motion.h1>

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ duration: 1, delay: 0.9 }}
                      style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
                    />

                    <motion.h2
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 1.0 }}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                        color: 'var(--color-text)',
                        fontWeight: 400,
                        lineHeight: 1.2,
                      }}
                    >
                      Emily &amp; Marco
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.3 }}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-light)',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Jiménez López
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.72rem',
                        color: 'var(--color-gold)',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        marginTop: '0.3rem',
                      }}
                    >
                      {lang === 'es' ? '24 · Julio · 2026' : 'July 24 · 2026'}
                    </motion.p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom decorative text */}
      {(phase === 'textReveal' || phase === 'done') && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: 40,
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--color-text-light)',
          }}
        >
          {lang === 'es' ? '↓ Desliza para continuar' : '↓ Scroll to continue'}
        </motion.p>
      )}
    </div>
  );
};

export default EnvelopeOpening;
