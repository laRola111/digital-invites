import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const content = {
  es: {
    title: 'Mis Padres',
    quote: 'La vida se disfruta de momentos y este momento es tan especial que queremos que ustedes sean partícipes en la celebración de los quince años de nuestros hijos Emily y Marco Jiménez, que Dios les ha regalado la oportunidad de llegar a tan hermoso momento.',
    sign: '— Con amor, la familia Jiménez López',
  },
  en: {
    title: 'Our Parents',
    quote: 'Life is made of beautiful moments, and this one is so special that we want you to share in the celebration of our children Emily and Marco Jiménez\'s quinceañera. God has blessed us with the gift of reaching this beautiful milestone together.',
    sign: '— With love, the Jiménez López family',
  },
};

const WordReveal = ({ text, startDelay = 0, style = {} }) => {
  const words = text.split(' ');
  return (
    <span style={{ display: 'inline', lineHeight: 1.9, ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: startDelay + i * 0.06,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const ParentsMessage = ({ lang = 'es', isActive = false }) => {
  const t = content[lang];

  return (
    <section
      id="parents"
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #fff9f5 0%, #fff5f0 50%, #fadadd22 100%)',
      }}
    >
      {/* Dot pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(212,175,55,0.12) 1.5px, transparent 1.5px)',
        backgroundSize: '36px 36px',
        pointerEvents: 'none',
      }} />

      {/* Ambient glow blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-15%', right: '-15%',
          width: '55vw', height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,194,194,0.35) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position: 'absolute',
          bottom: '-20%', left: '-10%',
          width: '50vw', height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 620,
          width: '90%',
          textAlign: 'center',
          padding: '3.5rem 2.5rem',
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          boxShadow: '0 20px 60px rgba(0,0,0,0.06), 0 0 100px rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.2)',
          position: 'relative',
          zIndex: 5,
          overflow: 'hidden',
        }}
      >
        {/* Shimmer on card */}
        <motion.div
          initial={{ x: '-100%' }}
          whileInView={{ x: '300%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            width: '25%',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.12), transparent)',
            transform: 'skewX(-15deg)',
            pointerEvents: 'none',
          }}
        />

        {/* Corner ornaments */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
          <div key={pos} style={{
            position: 'absolute',
            ...(pos.includes('top') ? { top: 16 } : { bottom: 16 }),
            ...(pos.includes('left') ? { left: 16 } : { right: 16 }),
            color: 'rgba(212,175,55,0.4)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-luxury)',
            lineHeight: 1,
          }}>✦</div>
        ))}

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="animate-glow"
          style={{
            fontFamily: 'var(--font-luxury)',
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            color: 'var(--color-gold)',
            fontStyle: 'italic',
            fontWeight: 300,
            marginBottom: '0.5rem',
          }}
        >
          {t.title}
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
            margin: '0 auto 2rem',
          }}
        />

        {/* Quote */}
        <p style={{
          fontFamily: 'var(--font-luxury)',
          fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'var(--color-text)',
          marginBottom: '2rem',
        }}>
          <span style={{ color: 'var(--color-gold)', fontSize: '2rem', lineHeight: 0.5, verticalAlign: 'bottom', fontFamily: 'Georgia', marginRight: 4 }}>"</span>
          <WordReveal text={t.quote} startDelay={0.4} />
          <span style={{ color: 'var(--color-gold)', fontSize: '2rem', lineHeight: 0.5, verticalAlign: 'bottom', fontFamily: 'Georgia', marginLeft: 4 }}>"</span>
        </p>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, duration: 1 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            color: 'var(--color-text)',
            fontWeight: 500,
            fontStyle: 'italic',
          }}
        >
          {t.sign}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ParentsMessage;
