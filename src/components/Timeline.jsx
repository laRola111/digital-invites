import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Church, Utensils, Music, Sparkles } from 'lucide-react';

const eventsData = {
  es: [
    { time: '10:00 AM', title: 'Misa', location: 'Santa Bárbara', address: '13713 FM 969, Austin, TX 78725', mapLink: 'https://maps.google.com/?q=13713+FM+969,+Austin,+TX+78725', icon: <Church size={22} /> },
    { time: '5:00 PM – 7:00 PM', title: 'Comida', location: 'Recepción: Salon Meres', address: '1141 FM 969 Farm-To-Market Rd, Bastrop, TX 78602', mapLink: 'https://maps.google.com/?q=1141+FM+969+Farm-To-Market+Rd,+Bastrop,+TX+78602', icon: <Utensils size={22} /> },
    { time: '7:00 PM – 8:00 PM', title: 'Presentación', location: 'Salon Meres', address: '', icon: <Sparkles size={22} /> },
    { time: '9:00 PM – 1:00 AM', title: 'Baile', location: 'Salon Meres', address: '', icon: <Music size={22} /> },
  ],
  en: [
    { time: '10:00 AM', title: 'Mass', location: 'Santa Bárbara Church', address: '13713 FM 969, Austin, TX 78725', mapLink: 'https://maps.google.com/?q=13713+FM+969,+Austin,+TX+78725', icon: <Church size={22} /> },
    { time: '5:00 PM – 7:00 PM', title: 'Dinner', location: 'Reception: Salon Meres', address: '1141 FM 969 Farm-To-Market Rd, Bastrop, TX 78602', mapLink: 'https://maps.google.com/?q=1141+FM+969+Farm-To-Market+Rd,+Bastrop,+TX+78602', icon: <Utensils size={22} /> },
    { time: '7:00 PM – 8:00 PM', title: 'Presentation', location: 'Salon Meres', address: '', icon: <Sparkles size={22} /> },
    { time: '9:00 PM – 1:00 AM', title: 'Dance Party', location: 'Salon Meres', address: '', icon: <Music size={22} /> },
  ],
};

const Timeline = ({ lang = 'es' }) => {
  const events = eventsData[lang];
  const sectionTitle = lang === 'es' ? 'Itinerario' : 'Schedule';
  const dateLabel = lang === 'es' ? 'Viernes · 24 de Julio · 2026' : 'Friday · July 24 · 2026';
  const mapLabel = lang === 'es' ? 'Ver ubicación' : 'Get directions';

  return (
    <section
      id="timeline"
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fcf9f9 0%, #fff9f5 100%)',
        padding: '5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'radial-gradient(rgba(212,175,55,0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: '3.5rem', position: 'relative', zIndex: 2 }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '3px' }}
          whileInView={{ opacity: 1, letterSpacing: '8px' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            color: 'var(--color-gold)',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: '0.6rem',
          }}
        >
          {dateLabel}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="animate-glow"
          style={{
            fontFamily: 'var(--font-luxury)',
            fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
            color: 'var(--color-gold)',
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          {sectionTitle}
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)', margin: '1rem auto 0' }}
        />
      </motion.div>

      {/* Timeline */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 560, zIndex: 2 }}>
        {/* Animated vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: 30,
            bottom: 30,
            width: 2,
            transformOrigin: 'top center',
            background: 'linear-gradient(to bottom, var(--color-gold), rgba(212,175,55,0.2))',
            opacity: 0.6,
          }}
        />

        {events.map((evt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: idx * 0.25 + 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: idx < events.length - 1 ? '2.5rem' : 0,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Icon circle */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.25 + 0.6, type: 'spring', stiffness: 200 }}
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: '#fff',
                border: '2px solid var(--color-gold)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--color-gold)',
                marginBottom: '1.2rem',
                boxShadow: '0 0 20px rgba(212,175,55,0.2), 0 4px 15px rgba(0,0,0,0.06)',
              }}
            >
              {evt.icon}
            </motion.div>

            {/* Card */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              padding: '1.8rem',
              borderRadius: 16,
              textAlign: 'center',
              width: '90%',
              boxShadow: '0 8px 30px rgba(0,0,0,0.05), 0 0 60px rgba(212,175,55,0.04)',
              border: '1px solid rgba(212,175,55,0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Card shimmer */}
              <motion.div
                initial={{ x: '-100%' }}
                whileInView={{ x: '300%' }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.25 + 0.9, duration: 1.2 }}
                style={{
                  position: 'absolute', top: 0, bottom: 0, width: '20%',
                  background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent)',
                  transform: 'skewX(-15deg)', pointerEvents: 'none',
                }}
              />

              <h3 style={{
                fontFamily: 'var(--font-luxury)',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                color: 'var(--color-text)',
                fontStyle: 'italic',
                fontWeight: 400,
                marginBottom: '0.4rem',
              }}>
                {evt.title}
              </h3>
              <p style={{
                color: 'var(--color-gold)',
                fontWeight: 500,
                marginBottom: '0.8rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                letterSpacing: '1px',
              }}>
                {evt.time}
              </p>
              <p style={{ color: 'var(--color-text)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                {evt.location}
              </p>
              {evt.address && (
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.8rem', marginBottom: '1.2rem' }}>
                  {evt.address}
                </p>
              )}
              {evt.mapLink && (
                <a href={evt.mapLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <MapPin size={14} /> {mapLabel}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
