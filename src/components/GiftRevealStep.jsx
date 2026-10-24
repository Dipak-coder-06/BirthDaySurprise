import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Gift, Heart, Sparkles } from "lucide-react";

export default function GiftRevealStep({ config, onNext, onPrev }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  
  const generateConfetti = () => {
    const colors = ['#ec4899', '#f43f5e', '#a855f7', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#ffffff'];
    const pieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 6,
      rotation: Math.random() * 360,
      endRotation: (Math.random() - 0.5) * 1080,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.5,
      shape: Math.random() > 0.5 ? 'circle' : 'square',
    }));
    setConfettiPieces(pieces);
    setShowConfetti(true);
  };
  
  const handleOpenGift = () => {
    setIsOpened(true);
    generateConfetti();
    
    setTimeout(() => {
      setShowMessage(true);
    }, 800);
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };
  
  const handleNext = () => {
    onNext();
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
        There&apos;s one last thing waiting for you... 🎁
      </motion.h2>
      
      <motion.div
        className="relative mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        {!isOpened ? (
          <>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="relative w-48 h-48"
              >
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-24 bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 rounded-t-2xl border-4 border-amber-700/50 shadow-2xl"
                />
                
                <motion.div
                  className="absolute bottom-24 left-1/2 -translate-x-1/2 w-44 h-28 bg-gradient-to-b from-amber-500 to-amber-600 rounded-b-xl border-4 border-amber-700/50 border-t-0 shadow-xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full border-2 border-amber-700/50 shadow-inner" />
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-14 bg-gradient-to-b from-amber-300 to-amber-500" />
                </motion.div>
                
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-6 bg-gradient-to-r from-amber-700 to-amber-800 rounded-full opacity-50 blur"
                />
                
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 3, -3, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  🎁
                </motion.div>
                
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl"
                  animate={{ 
                    y: [-4, -12, -4],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.button
              onClick={handleOpenGift}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary relative z-10 mt-40 inline-flex items-center gap-3 px-10 py-4 text-lg"
            >
              Open Your Gift 💝
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </>
        ) : (
          <>
            <motion.div
              className="relative w-48 h-48"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-24 bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 rounded-t-2xl border-4 border-amber-700/50 shadow-2xl"
                animate={{ scaleY: [1, 0.3, 0.3, 1] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              
              <motion.div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 w-44 h-28 bg-gradient-to-b from-amber-500 to-amber-600 rounded-b-xl border-4 border-amber-700/50 border-t-0 shadow-xl"
                animate={{ 
                  y: [0, -60, -60],
                  opacity: [1, 1, 0]
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full border-2 border-amber-700/50 shadow-inner" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-14 bg-gradient-to-b from-amber-300 to-amber-500" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-6 bg-gradient-to-r from-amber-700 to-amber-800 rounded-full opacity-50 blur"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8 }}
              />
              
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 text-8xl"
                animate={{ 
                  y: [0, -100],
                  rotate: [0, 720],
                  scale: [1, 2],
                  opacity: [1, 0]
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                🎁
              </motion.div>
              
              <motion.div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 text-6xl"
                animate={{ 
                  y: [0, -80],
                  scale: [1, 3],
                  opacity: [1, 0]
                }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                🎂
              </motion.div>
              
              <motion.div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 text-5xl"
                animate={{ 
                  y: [0, -60],
                  scale: [1, 2],
                  opacity: [1, 0]
                }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                🎈
              </motion.div>
              
              <motion.div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 text-4xl"
                animate={{ 
                  y: [0, -50],
                  scale: [1, 2],
                  opacity: [1, 0]
                }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              >
                💖
              </motion.div>
            </motion.div>
            
            {showConfetti && (
              <motion.div className="fixed inset-0 pointer-events-none z-30">
                {confettiPieces.map((piece) => (
                  <motion.div
                    key={piece.id}
                    className="absolute"
                    style={{
                      left: `${piece.x}%`,
                      top: `${piece.y}%`,
                      width: `${piece.size}px`,
                      height: `${piece.size}px`,
                      backgroundColor: piece.color,
                      borderRadius: piece.shape === 'circle' ? '50%' : '0',
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 1, scale: 1, rotate: piece.rotation }}
                    animate={{
                      y: window.innerHeight + 100,
                      rotate: piece.endRotation,
                      scale: [1, 0.5, 0],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: piece.duration,
                      delay: piece.delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
            
            {showMessage && (
              <motion.div
                className="mt-10 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              >
                <motion.p
                  className="font-cursive text-3xl md:text-4xl text-romance-deep mb-6"
                  animate={{ 
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Happy Birthday, {config.recipientName}! 🎂❤️
                </motion.p>
                
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary group inline-flex items-center gap-3 px-10 py-4 text-lg"
                >
                  Read Your Wish 💌
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}