import { motion } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { Heart, Sparkles, Zap } from "lucide-react";
import { loveMessages } from "../config";

const explosionHearts = ["❤️", "💖", "💗", "💕", "💓", "💝", "💘", "💟", "🌹", "✨", "💞", "💌"];

export default function LoveButtonStep({ config, onNext, onPrev, relationshipLabels }) {
  const [loveCount, setLoveCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("Can you handle a little extra love? ❤️");
  const [showExplosion, setShowExplosion] = useState(false);
  const [explosionParticles, setExplosionParticles] = useState([]);
  const [showBigMessage, setShowBigMessage] = useState(false);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const clickCount = useRef(0);
  
  const generateExplosion = useCallback((intensity = 1) => {
    const count = 30 * intensity;
    const particles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 60,
      y: 50 + (Math.random() - 0.5) * 40,
      size: Math.random() * 24 + 16,
      endX: (Math.random() - 0.5) * 200 * intensity,
      endY: (Math.random() - 0.5) * 200 * intensity - 100 * intensity,
      rotation: Math.random() * 360,
      endRotation: (Math.random() - 0.5) * 720,
      type: explosionHearts[Math.floor(Math.random() * explosionHearts.length)],
      delay: Math.random() * 0.2,
      duration: 0.8 + Math.random() * 0.6,
    }));
    setExplosionParticles(particles);
    setShowExplosion(true);
    
    setTimeout(() => {
      setShowExplosion(false);
      setExplosionParticles([]);
    }, 1500);
  }, []);
  
  const handleLoveClick = (intensity = 1) => {
    clickCount.current += 1;
    const newCount = clickCount.current;
    setLoveCount(newCount);
    
    generateExplosion(intensity);
    
    if (newCount <= loveMessages.length) {
      setCurrentMessage(loveMessages[newCount - 1]);
    } else {
      const randomMsg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
      setCurrentMessage(randomMsg);
    }
    
    if (!showBigMessage) {
      setShowBigMessage(true);
      setTimeout(() => setShowBigMessage(false), 2000);
    }
    
    if (newCount === 5) {
      setShowSpecialMessage(true);
      setTimeout(() => setShowSpecialMessage(false), 3000);
    }
    
    if (newCount === 10) {
      generateExplosion(2);
      setCurrentMessage("Okay, that&apos;s enough... just kidding! MORE LOVE! 😂❤️");
    }
  };
  
  return (
    <motion.div
      className="w-full max-w-md text-center relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="font-cursive text-3xl md:text-4xl text-romance-deep mb-4 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        One Tiny Thing I Need to Tell You... 👀
      </motion.h2>
      
      <motion.p
        className="text-lg text-romance-darker mb-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        {currentMessage}
      </motion.p>
      
      <motion.div
        className="relative mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 rounded-2xl blur-2xl opacity-30 animate-pulse"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.button
          onClick={() => handleLoveClick(1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="btn-love relative z-10 w-full max-w-xs mx-auto px-12 py-8 text-2xl md:text-3xl font-cursive flex items-center justify-center gap-4"
          style={{
            boxShadow: `
              0 0 30px rgba(236, 72, 153, 0.5),
              0 0 60px rgba(244, 63, 94, 0.3),
              0 20px 40px rgba(236, 72, 153, 0.4)
            `
          }}
        >
          <motion.span
            className="relative z-10"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            I LOVE YOU ❤️
          </motion.span>
          <motion.span
            className="relative z-10"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-8 h-8" />
          </motion.span>
        </motion.button>
        
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl pointer-events-none"
            style={{
              left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 70}%`,
              top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 70}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {explosionHearts[i % explosionHearts.length]}
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.span
          className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-white/40 rounded-full px-6 py-3 text-romance-deep font-semibold shadow-lg"
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 10px 30px rgba(236, 72, 153, 0.3)",
              "0 15px 40px rgba(236, 72, 153, 0.5)",
              "0 10px 30px rgba(236, 72, 153, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-5 h-5 text-rose-500 animate-heart-beat" />
          Love sent: {loveCount} ❤️
        </motion.span>
      </motion.div>
      
      <motion.button
        onClick={() => handleLoveClick(0.7)}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="btn-secondary group text-lg py-4 flex items-center justify-center gap-3 w-full max-w-xs mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      >
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          💕
        </motion.span>
        <span>Send Me More Love</span>
        <motion.span
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-5 h-5" />
        </motion.span>
      </motion.button>
      
      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary group text-lg py-4 flex items-center justify-center gap-3 w-full max-w-xs mx-auto mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
      >
        <span>Continue to Surprise</span>
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.span>
      </motion.button>
      
      {showBigMessage && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="text-center px-6"
            animate={{ 
              y: [0, -30, -60],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <motion.div
              className="text-4xl md:text-5xl mb-4 animate-heart-beat"
            >
              ❤️
            </motion.div>
            <motion.p
              className="font-cursive text-2xl md:text-3xl text-romance-deep text-shadow-lg"
            >
              I LOVE YOU SOOO MUCH! ❤️🥹
            </motion.p>
          </motion.div>
        </motion.div>
      )}
      
      {showSpecialMessage && (
        <motion.div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="glass-card px-8 py-4 rounded-2xl text-center max-w-xs"
            animate={{ 
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 10px 30px rgba(236, 72, 153, 0.3)",
                "0 20px 50px rgba(236, 72, 153, 0.5)",
                "0 10px 30px rgba(236, 72, 153, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="font-cursive text-xl text-romance-deep">
              Okay, that&apos;s enough... just kidding! MORE LOVE! 😂❤️
            </p>
          </motion.div>
        </motion.div>
      )}
      
      {showExplosion && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {explosionParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute select-none text-3xl"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 1, scale: 1, rotate: 0 }}
              animate={{
                x: particle.endX,
                y: particle.endY,
                scale: [1, 1.5, 0],
                rotate: particle.endRotation,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut",
              }}
            >
              {particle.type}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}