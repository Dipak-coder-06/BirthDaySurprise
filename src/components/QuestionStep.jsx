import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";

export default function QuestionStep({ config, onNext, onPrev }) {
  const [showResponse, setShowResponse] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  
  const handleAnswer = (answer) => {
    setSelectedButton(answer);
    setShowResponse(true);
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
      {!showResponse ? (
        <>
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
              <Heart className="w-12 h-12 text-white" />
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-rose-300/50"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
          
          <motion.h2
            className="font-cursive text-3xl md:text-4xl text-romance-deep mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Before we begin... do you know how special you are to me?
          </motion.h2>
          
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <motion.button
              onClick={() => handleAnswer("ofcourse")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary group text-lg py-4 flex items-center justify-center gap-3"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                🥰
              </motion.span>
              <span>Of course!</span>
            </motion.button>
            
            <motion.button
              onClick={() => handleAnswer("tellme")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary group text-lg py-4 flex items-center justify-center gap-3"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                👀
              </motion.span>
              <span>Tell me!</span>
            </motion.button>
          </motion.div>
        </>
      ) : (
        <>
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
              <Sparkles className="w-12 h-12 text-white" />
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-rose-300/50"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
          
          <motion.p
            className="font-cursive text-2xl md:text-3xl text-romance-deep mb-8 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            "You&apos;re not just special... you&apos;re the kind of person who makes ordinary moments feel magical. ❤️"
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
            Tell Me More 💗
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-5 h-5" />
            </motion.span>
          </motion.button>
        </>
      )}
    </motion.div>
  );
}