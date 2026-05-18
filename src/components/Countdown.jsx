import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const labels = {
  es: { title: 'Ya falta poco', days: 'Días', hours: 'Hrs', minutes: 'Min', seconds: 'Seg', arrived: '¡El gran día ha llegado!' },
  en: { title: 'Counting Down', days: 'Days', hours: 'Hrs', minutes: 'Min', seconds: 'Sec', arrived: 'The big day is here!' },
};

// Animated flip-style number unit
const TimeUnit = ({ value, label, delay = 0 }) => {
  const [prev, setPrev] = useState(value);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setIsChanging(true);
      const t = setTimeout(() => { setPrev(value); setIsChanging(false); }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, type: 'spring', stiffness: 150, damping: 12 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.2rem 1rem',
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)',
        borderRadius: 16,
        border: '1px solid rgba(212,175,55,0.2)',
        minWidth: 78,
        boxShadow: '0 8px 25px rgba(0,0,0,0.05), 0 0 30px rgba(212,175,55,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow behind number */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Number */}
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: -15, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 15, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="animate-glow"
          style={{
            fontFamily: 'var(--font-luxury)',
            fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
            color: 'var(--color-gold)',
            fontWeight: 300,
            lineHeight: 1,
            fontStyle: 'italic',
          }}
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
      </AnimatePresence>

      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.65rem',
        color: 'var(--color-text-light)',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginTop: '0.5rem',
      }}>
        {label}
      </span>
    </motion.div>
  );
};

const Countdown = ({ lang = 'es' }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);
  const t = labels[lang];

  useEffect(() => {
    const targetDate = new Date('July 24, 2026 10:00:00').getTime();
    const tick = () => {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) { setExpired(true); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #fadadd 0%, #f4c2c2 40%, #f7e7ce 100%)',
        padding: '4rem 1.5rem',
      }}
    >
      {/* Ambient radial glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '80vw', height: '80vw',
          maxWidth: 600, maxHeight: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating ornament rings */}
      {[1, 2, 3].map(i => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1 + i * 0.07, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i }}
          style={{
            position: 'absolute',
            width: `${40 + i * 20}vw`, height: `${40 + i * 20}vw`,
            maxWidth: 200 + i * 100, maxHeight: 200 + i * 100,
            borderRadius: '50%',
            border: '1px solid rgba(212,175,55,0.3)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: '2.5rem', zIndex: 2 }}
      >
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.72rem',
          color: 'rgba(212,175,55,0.9)',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          marginBottom: '0.8rem',
        }}>
          Emily &amp; Marco Jiménez
        </p>
        <h2
          className="animate-glow"
          style={{
            fontFamily: 'var(--font-luxury)',
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            color: 'var(--color-gold)',
            fontStyle: 'italic',
            fontWeight: 300,
          }}
        >
          {expired ? t.arrived : t.title}
        </h2>
      </motion.div>

      {/* Countdown boxes */}
      {!expired && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', zIndex: 2 }}>
          <TimeUnit value={timeLeft.days}    label={t.days}    delay={0.1} />
          <TimeUnit value={timeLeft.hours}   label={t.hours}   delay={0.2} />
          <TimeUnit value={timeLeft.minutes} label={t.minutes} delay={0.3} />
          <TimeUnit value={timeLeft.seconds} label={t.seconds} delay={0.4} />
        </div>
      )}

      {/* Date below */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 1 }}
        style={{
          marginTop: '2rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          color: 'var(--color-text)',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          zIndex: 2,
        }}
      >
        {lang === 'es' ? '24 · Julio · 2026' : 'July 24 · 2026'}
      </motion.p>
    </section>
  );
};

export default Countdown;
