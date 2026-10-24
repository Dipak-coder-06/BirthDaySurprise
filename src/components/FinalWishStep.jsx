import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Heart, Sparkles, RefreshCw, Share2 } from "lucide-react";
import { config, defaultBirthdayMessage, relationshipLabels } from "../config";

const finalHearts = ["❤️", "💖", "💗", "💕", "💓", "💝", "💘", "💟", "🌹", "✨"];

export default function FinalWishStep({ config, defaultBirthdayMessage, onNext, onPrev, relationshipLabels }) {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showBigHeart, setShowBigHeart] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const messageRef = useRef(null);
  
  const generateConfetti = () => {
    const colors = ['#ec4899', '#f43f5e', '#a855f7', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#ffffff', '#ff69b4', '#ff1493'];
    const pieces = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 6,
      rotation: Math.random() * 360,
      endRotation: (Math.random() - 0.5) * 1440,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 1,
      shape: Math.random() > 0.5 ? 'circle' : 'square',
    }));
    setConfettiPieces(pieces);
    setShowConfetti(true);
  };
  
  const handleReplay = () => {
    setShowAnimation(false);
    setShowBigHeart(false);
    setShowLoveMessage(false);
    setTimeout(() => {
      setShowAnimation(true);
      setTimeout(() => setShowBigHeart(true), 2000);
      setTimeout(() => {
        generateConfetti();
        setShowLoveMessage(true);
      }, 4000);
    }, 100);
  };
  
  const handleMoreLove = () => {
    generateConfetti();
    setShowBigHeart(true);
    setShowLoveMessage(true);
    setTimeout(() => setShowLoveMessage(false), 3000);
  };
  
  useEffect(() => {
    const timer1 = setTimeout(() => setShowBigHeart(true), 2000);
    const timer2 = setTimeout(() => {
      generateConfetti();
      setShowLoveMessage(true);
    }, 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  
  const birthdayMessage = config.personalMessage || defaultBirthdayMessage;
  const messageLines = birthdayMessage.split('\n').filter(line => line.trim() !== '');
  
  return (
    <motion.div
      className="w-full max-w-2xl min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 overflow-y-auto">
        <motion.div
          className="w-full max-w-xl glass-card p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-rose-400/10 via-transparent to-purple-400/10"
          />
          
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-purple-500"
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
          
          <motion.div
            className="relative z-10 text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <motion.span
              className="inline-block text-4xl md:text-5xl animate-heart-beat"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🎂
            </motion.span>
            <motion.h1
              className="font-cursive text-3xl md:text-4xl lg:text-5xl text-romance-deep mt-2 mb-2 leading-tight"
            >
              Happy Birthday, {config.recipientName}! <span className="text-rose-500">🎂❤️</span>
            </motion.h1>
            
            <motion.div
              className="flex items-center justify-center gap-2 mt-4"
            >
              <motion.div className="h-px w-8 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
              <Heart className="w-5 h-5 text-rose-500 animate-heart-beat" />
              <motion.div className="h-px w-8 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative z-10 space-y-4 text-left text-romance-deep leading-relaxed text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            ref={messageRef}
          >
            {messageLines.map((line, index) => (
              <motion.p
                key={index}
                className={`font-${index === messageLines.length - 3 || index === messageLines.length - 1 ? 'cursive' : 'sans'} ${index === messageLines.length - 3 || index === messageLines.length - 1 ? 'text-xl font-semibold' : ''} ${line.includes('I LOVE YOU') ? 'text-rose-600' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.15, ease: "easeOut" }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
          
          {showBigHeart && (
            <motion.div
              className="relative z-10 flex justify-center mt-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 150, damping: 10 }}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-rose-300/50"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute -inset-8 rounded-full border-2 border-rose-200/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                />
                <Heart className="w-20 h-20 text-rose-500 relative z-10 animate-heart-beat drop-shadow-lg" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
        
        {showLoveMessage && (
          <motion.div
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="glass-card px-6 py-3 rounded-2xl text-center max-w-xs shadow-2xl"
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
              <p className="font-cursive text-lg text-romance-deep">
                Birthday hugs and unlimited love sent your way! 🤗❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
      
      <motion.div
        className="px-4 pb-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
      >
        <motion.button
          onClick={handleReplay}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="btn-secondary group text-lg py-4 px-8 flex items-center justify-center gap-3 w-full sm:w-auto"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Read My Wish Again 💌</span>
        </motion.button>
        
        <motion.button
          onClick={handleMoreLove}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary group text-lg py-4 px-8 flex items-center justify-center gap-3 w-full sm:w-auto"
        >
          <Heart className="w-5 h-5 animate-heart-beat" />
          <span>Send You More Love ❤️</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.span>
        </motion.button>
      </motion.div>
      
      {showConfetti && (
        <motion.div className="fixed inset-0 pointer-events-none z-20">
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
    </motion.div>
  );
}