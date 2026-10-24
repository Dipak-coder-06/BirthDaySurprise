import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function OpeningScreen({ config, onNext }) {
  const handleClick = () => {
    onNext();
  };
  
  return (
    <motion.div
      className="w-full max-w-md text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <motion.span
          className="inline-block text-4xl md:text-5xl animate-heart-beat"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ❤️
        </motion.span>
      </motion.div>
      
      <motion.h1
        className="font-cursive text-4xl md:text-5xl lg:text-6xl text-romance-deep mb-6 leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        Hey, You! <span className="text-rose-500">❤️</span>
      </motion.h1>
      
      <motion.p
        className="text-lg md:text-xl text-romance-darker mb-10 max-w-lg mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        I made something special for you... but you have to unlock it one step at a time. 🥹💕
      </motion.p>
      
      <motion.button
        onClick={handleClick}
        className="btn-primary group inline-flex items-center gap-3 px-10 py-5 text-lg"
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      >
        Open Your Surprise ✨
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.span>
      </motion.button>
      
      <motion.div
        className="mt-8 flex items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      >
        <motion.div className="h-px w-12 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        <span className="text-romance-deep/60 text-sm font-medium uppercase tracking-wider">Tap to begin</span>
        <motion.div className="h-px w-12 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      </motion.div>
    </motion.div>
  );
}