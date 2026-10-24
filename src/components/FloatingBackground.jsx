import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const heartTypes = ["❤️", "💖", "💗", "💕", "💓", "💝", "🌹", "✨", "💘", "💟"];
const particleColors = [
  "rgba(236, 72, 153, 0.6)",
  "rgba(244, 63, 94, 0.5)",
  "rgba(168, 85, 247, 0.5)",
  "rgba(255, 107, 107, 0.5)",
  "rgba(255, 182, 193, 0.6)",
];

export default function FloatingBackground({ particleCount = 30, reducedMotion = false }) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = reducedMotion || prefersReducedMotion;
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 6,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      type: heartTypes[Math.floor(Math.random() * heartTypes.length)],
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      isHeart: Math.random() > 0.3,
    }));
    
    setParticles(newParticles);
  }, [particleCount, shouldReduceMotion]);
  
  if (shouldReduceMotion) {
    return (
      <div 
        ref={containerRef}
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-romance-pink via-romance-peach to-romance-lavender animate-gradient-shift" />
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-romance-pink via-romance-peach to-romance-lavender animate-gradient-shift" />
      
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute select-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            color: particle.isHeart ? undefined : particle.color,
            width: particle.isHeart ? 'auto' : `${particle.size}px`,
            height: particle.isHeart ? 'auto' : `${particle.size}px`,
            borderRadius: particle.isHeart ? '0' : '50%',
            background: particle.isHeart ? 'none' : particle.color,
          }}
          initial={false}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {particle.isHeart ? particle.type : null}
        </motion.div>
      ))}
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.1)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(168,85,247,0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(244,63,94,0.1)_0%,_transparent_50%)]" />
    </div>
  );
}