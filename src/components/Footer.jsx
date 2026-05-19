import React from 'react';
import { motion } from 'framer-motion';
import finalPhoto from '../assets/images/photo3.jpg';

const content = {
  es: {
    heading: '¡Los esperamos!',
    quote: '"Gracias por acompañarnos en este día tan especial."',
    date: 'Viernes · 24 de Julio · 2026',
    location: 'Austin & Bastrop, Texas',
    credit: 'Emily & Marco Jiménez · XV Años 2026',
  },
  en: {
    heading: "We can't wait to see you!",
    quote: '"Thank you for celebrating this special day with us."',
    date: 'Friday · July 24 · 2026',
    location: 'Austin & Bastrop, Texas',
    credit: 'Emily & Marco Jiménez · XV Years 2026',
  },
};

const Footer = ({ lang = 'es' }) => {
  const t = content[lang];
  return (
    <section
      id="footer"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, var(--color-champagne) 0%, var(--color-pink-skin) 60%, var(--color-curuba) 100%)',
        padding: '4rem 1.5rem',
      }}
    >
      {/* Background shine orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '70vw', height: '70vw',
          maxWidth: 500, maxHeight: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(212,175,55,0.1) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="animate-float"
        style={{
          width: 220, height: 220,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid rgba(255,255,255,0.9)',
          boxShadow: '0 15px 50px rgba(212,175,55,0.35), 0 0 80px rgba(212,175,55,0.15)',
          marginBottom: '2.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <img src={finalPhoto} alt="Emily & Marco" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
      >
        <motion.h2
          className="animate-glow"
          style={{
            fontFamily: 'var(--font-luxury)',
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            color: 'var(--color-gold)',
            fontStyle: 'italic',
            fontWeight: 300,
            marginBottom: '1rem',
          }}
        >
          {t.heading}
        </motion.h2>

        <p style={{
          fontFamily: 'var(--font-luxury)',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          color: 'var(--color-text)',
          fontStyle: 'italic',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
          maxWidth: 420,
        }}>
          {t.quote}
        </p>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)', margin: '0 auto 1.2rem' }}
        />

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--color-gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          {t.date}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
          {t.location}
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.45 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          style={{ marginTop: '3rem', fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--color-text-light)', letterSpacing: '2px' }}
        >
          {t.credit}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Footer;
