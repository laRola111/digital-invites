import React from 'react';
import { motion } from 'framer-motion';

import finalPhoto from '../assets/images/photo5.jpg';

const Footer = () => {
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
            alt="Emily Final" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        <h2 className="text-gold" style={{ fontSize: '2.2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
          ¡Te espero!
        </h2>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'var(--color-text)', 
          fontStyle: 'italic', 
          fontFamily: 'var(--font-serif)',
          lineHeight: '1.6' 
        }}>
          "Gracias por acompañarnos en este día tan especial."
        </p>

        <div style={{ marginTop: '3rem', width: '50px', height: '1px', backgroundColor: 'var(--color-gold)' }} />
      </motion.div>
    </section>
  );
};

export default Footer;
