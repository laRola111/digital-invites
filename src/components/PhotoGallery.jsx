import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import photo1 from '../assets/images/photo1.jpg';
import photo2 from '../assets/images/photo2.jpg';
import photo3 from '../assets/images/photo3.jpg';
import photo4 from '../assets/images/photo4.jpg';
import photo5 from '../assets/images/photo5.jpg';

const images = [photo1, photo2, photo3, photo4, photo5];

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-container bg-nude" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '70vh', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <img 
              src={images[currentIndex]} 
              alt={`Gallery ${currentIndex}`} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.9)'
              }}
            />
            {/* Elegant vignette effect */}
            <div 
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none'
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          zIndex: 10
        }}>
          {images.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: currentIndex === idx ? 'var(--color-gold)' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: currentIndex === idx ? 'scale(1.5)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
