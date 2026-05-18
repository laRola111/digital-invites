import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Church, Utensils, Music, Sparkles } from 'lucide-react';

const events = [
  {
    time: "10:00 AM",
    title: "Misa",
    location: "Santa Bárbara",
    address: "13713 FM 969, Austin, TX 78725",
    mapLink: "https://maps.google.com/?q=13713+FM+969,+Austin,+TX+78725",
    icon: <Church size={24} />
  },
  {
    time: "5:00 PM - 7:00 PM",
    title: "Comida",
    location: "Recepción: Salon Meres",
    address: "1141 FM 969 Farm-To-Market Rd, Bastrop, TX 78602",
    mapLink: "https://maps.google.com/?q=1141+FM+969+Farm-To-Market+Rd,+Bastrop,+TX+78602",
    icon: <Utensils size={24} />
  },
  {
    time: "7:00 PM - 8:00 PM",
    title: "Presentación",
    location: "Salon Meres",
    address: "",
    icon: <Sparkles size={24} />
  },
  {
    time: "9:00 PM - 1:00 AM",
    title: "Baile",
    location: "Salon Meres",
    address: "",
    icon: <Music size={24} />
  }
];

const Timeline = () => {
  return (
    <section className="section-container bg-bg-light" style={{ padding: '2rem 1rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
      >
        <h2 className="text-gold" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>Itinerario</h2>

        <div style={{ position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            width: '2px', 
            height: '100%', 
            background: 'linear-gradient(to bottom, var(--color-gold), var(--color-champagne))',
            opacity: 0.5 
          }} />

          {events.map((evt, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '2rem',
                position: 'relative',
                zIndex: 2
              }}
            >
              {/* Icon */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-bg-light)',
                border: '2px solid var(--color-gold)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--color-gold)',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)'
              }}>
                {evt.icon}
              </div>

              {/* Card */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center',
                width: '90%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid var(--color-pink-skin)'
              }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>{evt.title}</h3>
                <p style={{ color: 'var(--color-gold)', fontWeight: '500', marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>{evt.time}</p>
                <p style={{ color: 'var(--color-text)', marginBottom: '0.5rem' }}>{evt.location}</p>
                {evt.address && <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{evt.address}</p>}
                
                {evt.mapLink && (
                  <a href={evt.mapLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    <MapPin size={16} /> Ver ubicación
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Timeline;
