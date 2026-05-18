import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const text = {
  es: {
    title: 'Ya falta poco',
    days: 'Días',
    hours: 'Hrs',
    minutes: 'Min',
    seconds: 'Seg',
    arrived: '¡El gran día ha llegado!',
  },
  en: {
    title: 'Counting Down',
    days: 'Days',
    hours: 'Hrs',
    minutes: 'Min',
    seconds: 'Sec',
    arrived: 'The big day is here!',
  }
};

const Countdown = ({ lang = 'es' }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);
  const t = text[lang];

  useEffect(() => {
    // Target date: July 24, 2026 at 10:00 AM
    const targetDate = new Date("July 24, 2026 10:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: '10px',
      border: '1px solid var(--color-champagne)',
      minWidth: '70px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
    }}>
      <span style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>
        {value.toString().padStart(2, '0')}
      </span>
      <span style={{ fontSize: '0.8rem', color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {label}
      </span>
    </div>
  );

  return (
    <section className="section-container bg-pink-skin" style={{ padding: '2rem 1rem' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center' }}
      >
        <h2 className="text-gold" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          {expired ? t.arrived : t.title}
        </h2>

        {!expired && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <TimeUnit value={timeLeft.days} label={t.days} />
            <TimeUnit value={timeLeft.hours} label={t.hours} />
            <TimeUnit value={timeLeft.minutes} label={t.minutes} />
            <TimeUnit value={timeLeft.seconds} label={t.seconds} />
          </div>
        )}

        {/* Event date reminder */}
        <p style={{ marginTop: '1.5rem', color: '#888', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', letterSpacing: '2px' }}>
          {lang === 'es' ? '24 · Julio · 2026' : 'July 24 · 2026'}
        </p>
      </motion.div>
    </section>
  );
};

export default Countdown;
