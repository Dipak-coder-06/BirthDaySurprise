import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Gift, Sparkles } from "lucide-react";
import { challengeOptions } from "../config";

export default function ChallengeStep({ config, onNext, onPrev }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  
  const handleSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => setShowResponse(true), 300);
  };
  
  const handleContinue = () => {
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
          className="relative w-24 h-24 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 flex items-center justify-center shadow-xl shadow-rose-300/30"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Gift className="w-12 h-12 text-white" />
          <motion.div
            className="absolute -inset-2 rounded-full border-2 border-rose-300/50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.div>
      </motion.div>
      
      <motion.h2
        className="font-cursive text-3xl md:text-4xl text-romance-deep mb-4 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        One Last Question Before Your Surprise... 🥺
      </motion.h2>
      
      <motion.p
        className="text-lg text-romance-darker mb-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        If I could give you one thing in the world, what would it be?
      </motion.p>
      
      {!showResponse ? (
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          {challengeOptions.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option)}
              disabled={selectedOption !== null}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`glass-card-hover group text-lg py-5 px-6 flex items-center justify-center gap-4 transition-all duration-300 ${
                selectedOption === option.id
                  ? "ring-4 ring-rose-400/50 bg-rose-100/50"
                  : ""
              }`}
              style={{
                transform: selectedOption === option.id ? 'scale(1.03)' : 'none',
              }}
            >
              <motion.span
                className="text-3xl"
                animate={selectedOption === option.id ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                {option.emoji}
              </motion.span>
              <span className="font-medium text-romance-deep">{option.text}</span>
              {selectedOption === option.id && (
                <motion.div
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Heart className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <>
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="relative w-28 h-28 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 flex items-center justify-center shadow-xl shadow-rose-300/30"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-14 h-14 text-white" />
              <motion.div
                className="absolute -inset-3 rounded-full border-2 border-rose-300/50"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
          
          <motion.p
            className="font-cursive text-2xl md:text-3xl text-romance-deep mb-8 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            "Correct answer: ALL OF THEM! And a lifetime supply of happiness, too. ❤️✨"
          </motion.p>
          
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary group inline-flex items-center gap-3 px-10 py-4 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Unlock Your Final Surprise 🎁
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Gift className="w-5 h-5" />
            </motion.span>
          </motion.button>
        </>
      )}
    </motion.div>
  );
}