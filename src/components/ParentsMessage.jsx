import React from 'react';
import { motion } from 'framer-motion';

const ParentsMessage = () => {
  return (
    <section id="parents" className="section-container" style={{ backgroundColor: '#fff', position: 'relative' }}>
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(var(--color-champagne) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.3
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        style={{
          maxWidth: '600px',
          textAlign: 'center',
          padding: '3rem 2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
          border: '1px solid var(--color-champagne)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <h2 className="text-gold" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Mis Padres</h2>
        
        <p style={{ 
          fontSize: '1.2rem', 
          lineHeight: '1.8', 
          color: 'var(--color-text)',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          marginBottom: '2rem'
        }}>
          "La vida se disfruta de momentos y este momento es tan especial que queremos que ustedes sean partícipes en la celebración de los quince años de nuestros hijos."
        </p>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--color-text)',
          fontWeight: 500
        }}>
          Emily y Marco Jiménez, que Dios nos ha regalado la oportunidad de llegar a tan hermoso momento.
        </p>
      </motion.div>
    </section>
  );
};

export default ParentsMessage;
