import React from 'react';
import { motion } from 'framer-motion';

import finalPhoto from '../assets/images/photo5.jpg';

const text = {
  es: {
    heading: '¡Te espero!',
    quote: '"Gracias por acompañarnos en este día tan especial."',
    date: 'Viernes · 24 de Julio · 2026',
    location: 'Austin & Bastrop, TX',
  },
  en: {
    heading: "We can't wait to see you!",
    quote: '"Thank you for celebrating this special day with us."',
    date: 'Friday · July 24 · 2026',
    location: 'Austin & Bastrop, TX',
  }
};

const Footer = ({ lang = 'es' }) => {
  const t = text[lang];

  return (
    <section className="section-container bg-champagne" style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '500px',
          zIndex: 10
        }}
      >
        <div style={{
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid white',
          boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)',
          marginBottom: '2rem'
        }}>
          <img
            src={finalPhoto}
            alt="Christina"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <h2 className="text-gold" style={{ fontSize: '2.2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
          {t.heading}
        </h2>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--color-text)',
          fontStyle: 'italic',
          fontFamily: 'var(--font-serif)',
          lineHeight: '1.6'
        }}>
          {t.quote}
        </p>

        <p style={{ marginTop: '1.5rem', color: 'var(--color-gold)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {t.date}
        </p>

        <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          {t.location}
        </p>

        <div style={{ marginTop: '3rem', width: '50px', height: '1px', backgroundColor: 'var(--color-gold)' }} />

        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#aaa', letterSpacing: '1px' }}>
          Christina XV Años · 2026
        </p>
      </motion.div>
    </section>
  );
};

export default Footer;
