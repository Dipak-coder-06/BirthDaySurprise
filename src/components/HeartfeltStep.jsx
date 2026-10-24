import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, ArrowRight } from "lucide-react";

const lines = [
  "Some people make you smile.",
  "Some people make your day better.",
  "And then there&apos;s you...",
  "You make everything feel a little more beautiful. ❤️",
];

export default function HeartfeltStep({ config, onNext, onPrev }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const typeLines = async () => {
      setIsTyping(true);
      
      for (let i = 0; i < lines.length; i++) {
        setCurrentLineIndex(i);
        const line = lines[i];
        
        for (let j = 0; j <= line.length; j++) {
          setVisibleLines(prev => {
            const newLines = [...prev];
            newLines[i] = line.slice(0, j);
            return newLines;
          });
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        await new Promise(resolve => setTimeout(resolve, 400));
      }
      
      setIsTyping(false);
      setShowButton(true);
    };
    
    const timer = setTimeout(typeLines, 500);
    return () => clearTimeout(timer);
  }, []);
  
  const handleNext = () => {
    onNext();
  };
  
  return (
    <motion.div
      className="w-full max-w-md text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="mb-8 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="relative w-28 h-28 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 flex items-center justify-center shadow-xl shadow-rose-300/30"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 3, -3, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-14 h-14 text-white animate-heart-beat" />
          <motion.div
            className="absolute -inset-3 rounded-full border-2 border-rose-300/50"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute -inset-6 rounded-full border-2 border-rose-200/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="min-h-[200px] flex flex-col items-center justify-center gap-3 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {lines.map((line, index) => (
          <motion.p
            key={index}
            className="font-cursive text-2xl md:text-3xl text-romance-deep leading-relaxed text-center max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: visibleLines[index] !== undefined ? 1 : 0, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {visibleLines[index] || (isTyping && index === currentLineIndex ? "▋" : "")}
          </motion.p>
        ))}
      </motion.div>
      
      {showButton && (
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary group inline-flex items-center gap-3 px-10 py-4 text-lg mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          There&apos;s More... 🥹
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.span>
        </motion.button>
      )}
    </motion.div>
  );
}