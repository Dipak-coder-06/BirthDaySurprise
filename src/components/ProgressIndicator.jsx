import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function ProgressIndicator({ currentStep, totalSteps, stepLabels }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-20 px-4 py-3 bg-gradient-to-b from-white/20 to-transparent backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-romance-deep/70 text-sm font-medium">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-romance-deep/70 text-sm font-medium">
            {stepLabels[currentStep]}
          </span>
        </div>
        <div className="relative h-2 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-between px-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <motion.div
                key={i}
                className="relative z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
              >
                <Heart
                  className={`w-4 h-4 transition-all ${
                    i <= currentStep
                      ? "text-rose-500 fill-rose-500"
                      : "text-white/50"
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}