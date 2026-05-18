import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SHAPES = ['circle', 'diamond', 'star', 'circle', 'circle'];

const Particle = ({ x, y, size, duration, delay, opacity, shape, color }) => {
  const shapeStyle =
    shape === 'diamond'
      ? { borderRadius: '2px', transform: 'rotate(45deg)' }
      : shape === 'star'
      ? { borderRadius: '2px', clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' }
      : { borderRadius: '50%' };

  return (
    <motion.div
      initial={{ opacity: 0, x: `${x}vw`, y: `${y}vh`, scale: 0 }}
      animate={{
        opacity: [0, opacity, opacity * 0.6, 0],
        y: [`${y}vh`, `${y - 30}vh`],
        x: [`${x}vw`, `${x + (Math.random() - 0.5) * 5}vw`],
        scale: [0, 1, 0.8, 0],
        rotate: [0, shape === 'circle' ? 0 : 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2.5}px ${color}`,
        ...shapeStyle,
      }}
    />
  );
};

const ParticlesBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const palette = [
      'rgba(212, 175, 55, 0.8)',
      'rgba(250, 218, 221, 0.9)',
      'rgba(244, 194, 194, 0.7)',
      'rgba(255, 255, 255, 0.85)',
      'rgba(227, 194, 176, 0.7)',
      'rgba(247, 231, 206, 0.9)',
    ];

    const newParticles = Array.from({ length: 55 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1.5,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.5 + 0.2,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: palette[Math.floor(Math.random() * palette.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {particles.map(p => <Particle key={p.id} {...p} />)}
    </div>
  );
};

export default ParticlesBackground;
