import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParticlesBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      zIndex: 5,
      overflow: 'hidden'
    }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            opacity: 0, 
            x: `${p.x}vw`, 
            y: `${p.y + 10}vh` 
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            y: [`${p.y + 10}vh`, `${p.y - 10}vh`]
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            repeat: Infinity,
            ease: "linear" 
          }}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: 'var(--color-gold)',
            borderRadius: '50%',
            filter: 'blur(1px)',
            boxShadow: '0 0 10px var(--color-gold)'
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
