import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';

import mainPhoto from '../assets/images/photo1.jpg'; // Assuming photo1 is the main photo

const WelcomeScreen = () => {
  return (
    <section id="welcome" className="section-container bg-pink-skin" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      {/* Background glow and subtle parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(250, 218, 221, 0.4) 0%, rgba(244, 194, 194, 0.1) 100%)',
        }}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center w-full max-w-md mx-auto"
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            maxWidth: '450px',
            margin: '0 auto',
            gap: '1.5rem'
        }}
      >
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
        >
            <h2 className="text-gold" style={{ fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Nuestros XV Años</h2>
        </motion.div>

        <motion.div 
          className="gold-border"
          style={{ 
            width: '280px', 
            height: '380px', 
            borderRadius: '150px 150px 10px 10px', 
            overflow: 'hidden',
            padding: '8px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        >
          <img 
            src={mainPhoto} 
            alt="Quinceañera" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              borderRadius: '142px 142px 6px 6px' 
            }} 
          />
        </motion.div>

        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
        >
            <h1 style={{ fontSize: '3rem', color: 'var(--color-text)', margin: '1rem 0', lineHeight: 1 }}>Emily & Marco</h1>
            <p style={{ fontSize: '1rem', color: '#666', letterSpacing: '2px', fontFamily: 'var(--font-sans)' }}>18 . MAYO . 2026</p>
        </motion.div>

        <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2, duration: 1 }}
             style={{ marginTop: '2rem' }}
        >
            <Link to="parents" smooth={true} duration={800}>
                <button className="btn-elegant" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Abrir Invitación
                    <ChevronDown size={18} />
                </button>
            </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WelcomeScreen;
