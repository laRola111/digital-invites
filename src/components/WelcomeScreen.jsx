import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';

import mainPhoto from '../assets/images/photo1.jpg';

const labels = {
  es: { subtitle: 'Mis XV Años', date: '24 · JULIO · 2026', cta: 'Continuar' },
  en: { subtitle: 'My Quinceañera', date: 'JULY 24 · 2026', cta: 'Continue' },
};

// Blur-reveal word by word
const WordReveal = ({ text, delay = 0, style = {}, as: Tag = 'span' }) => (
  <Tag style={{ display: 'block', ...style }}>
    {text.split(' ').map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: delay + i * 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'inline-block', marginRight: '0.3em' }}
      >
        {word}
      </motion.span>
    ))}
  </Tag>
);

const WelcomeScreen = ({ lang = 'es', isActive = false }) => {
  const t = labels[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(t);
    }
    setVisible(false);
  }, [isActive]);

  return (
    <section
      id="welcome"
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Full-bleed Ken Burns photo background */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 1 } : { scale: 1.08, opacity: 0 }}
        transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src={mainPhoto}
          alt="Emily & Marco Jiménez López"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            animation: visible ? 'kenBurns 10s ease-out forwards' : 'none',
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(252,249,249,0.95) 100%)',
        }} />
      </motion.div>

      {/* Light leak effect */}
      {visible && (
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '400%', opacity: [0, 0.3, 0] }}
          transition={{ delay: 0.5, duration: 2.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            width: '15%',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)',
            transform: 'skewX(-15deg)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        marginTop: '20vh',
      }}>
        {/* Subtitle */}
        {visible && (
          <motion.p
            initial={{ opacity: 0, letterSpacing: '2px' }}
            animate={{ opacity: 1, letterSpacing: '8px' }}
            transition={{ delay: 0.3, duration: 1.5 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'rgba(212,175,55,0.9)',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginBottom: '1.2rem',
              textShadow: '0 0 20px rgba(212,175,55,0.5)',
            }}
          >
            {t.subtitle}
          </motion.p>
        )}

        {/* Main names */}
        {visible && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.7, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="animate-glow"
            style={{
              fontFamily: 'var(--font-luxury)',
              fontSize: 'clamp(3rem, 10vw, 5.5rem)',
              color: '#fff',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1,
              textShadow: '0 2px 30px rgba(0,0,0,0.3), 0 0 60px rgba(212,175,55,0.2)',
              marginBottom: '0.3rem',
            }}
          >
            Emily &amp; Marco
          </motion.h1>
        )}

        {visible && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1rem, 3vw, 1.4rem)',
              color: '#fff',
              letterSpacing: '4px',
              marginBottom: '0.5rem',
            }}
          >
            Jiménez López
          </motion.p>
        )}

        {/* Divider */}
        {visible && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 1.4, duration: 1.2 }}
            style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)',
              margin: '1rem 0',
            }}
          />
        )}

        {/* Date */}
        {visible && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1.7, duration: 1 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              textShadow: '0 0 15px rgba(212,175,55,0.4)',
              marginBottom: '2.5rem',
            }}
          >
            {t.date}
          </motion.p>
        )}

        {/* CTA */}
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <Link to="parents" smooth={true} duration={1000}>
              <button className="btn-elegant" style={{ display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(4px)' }}>
                {t.cta}
                <ChevronDown size={16} />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WelcomeScreen;
