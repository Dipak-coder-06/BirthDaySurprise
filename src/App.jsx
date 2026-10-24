import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, Music, Share2, Volume2, VolumeX } from "lucide-react";
import { config, relationshipLabels, defaultBirthdayMessage } from "./config";
import OpeningScreen from "./components/OpeningScreen";
import QuestionStep from "./components/QuestionStep";
import HeartfeltStep from "./components/HeartfeltStep";
import LoveButtonStep from "./components/LoveButtonStep";
import ChallengeStep from "./components/ChallengeStep";
import GiftRevealStep from "./components/GiftRevealStep";
import FinalWishStep from "./components/FinalWishStep";
import FloatingBackground from "./components/FloatingBackground";
import MusicPlayer from "./components/MusicPlayer";
import ProgressIndicator from "./components/ProgressIndicator";

const steps = [
  { id: "opening", component: OpeningScreen, label: "Opening" },
  { id: "question", component: QuestionStep, label: "Question" },
  { id: "heartfelt", component: HeartfeltStep, label: "Message" },
  { id: "loveButton", component: LoveButtonStep, label: "Love" },
  { id: "challenge", component: ChallengeStep, label: "Challenge" },
  { id: "giftReveal", component: GiftRevealStep, label: "Gift" },
  { id: "finalWish", component: FinalWishStep, label: "Wish" },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showShare, setShowShare] = useState(false);
  
  const goToStep = (stepIndex) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleShare = async () => {
    if (navigator.share && config.share.enabled) {
      try {
        await navigator.share({
          title: config.share.title,
          text: config.share.text,
          url: config.share.url,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };
  
  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowShare(true);
      setTimeout(() => setShowShare(false), 3000);
    });
  };
  
  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };
  
  const CurrentStepComponent = steps[currentStep].component;
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <FloatingBackground 
        particleCount={config.animations.particleCount}
        reducedMotion={config.animations.reducedMotion}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative z-10 min-h-screen flex flex-col"
        >
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={steps.length}
            stepLabels={steps.map(s => s.label)}
          />
          
          <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
            <CurrentStepComponent
              config={config}
              relationshipLabels={relationshipLabels}
              defaultBirthdayMessage={defaultBirthdayMessage}
              onNext={nextStep}
              onPrev={prevStep}
              currentStep={currentStep}
            />
          </main>
          
          <footer className="fixed bottom-0 left-0 right-0 px-4 py-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-4">
              {config.backgroundMusic.enabled && config.backgroundMusic.url && (
                <button
                  onClick={toggleMusic}
                  className="glass-card-hover p-2 rounded-xl transition-all"
                  aria-label={isMusicPlaying ? "Pause music" : "Play music"}
                >
                  {isMusicPlaying ? <Volume2 className="w-5 h-5 text-romance-deep" /> : <VolumeX className="w-5 h-5 text-romance-deep" />}
                </button>
              )}
              {config.share.enabled && (
                <button
                  onClick={handleShare}
                  className="glass-card-hover p-2 rounded-xl transition-all"
                  aria-label="Share this surprise"
                >
                  <Share2 className="w-5 h-5 text-romance-deep" />
                </button>
              )}
            </div>
            
            <p className="text-romance-deep/70 text-sm font-medium flex items-center gap-1">
              Made with <Heart className="w-4 h-4 animate-heart-beat text-rose-500" /> by {config.senderName}
            </p>
            
            <div className="w-10" />
          </footer>
        </motion.div>
      </AnimatePresence>
      
      {config.backgroundMusic.enabled && config.backgroundMusic.url && (
        <MusicPlayer
          src={config.backgroundMusic.url}
          isPlaying={isMusicPlaying}
          volume={config.backgroundMusic.volume}
          loop={config.backgroundMusic.loop}
        />
      )}
      
      {showShare && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-white/40 rounded-xl px-6 py-3 shadow-xl text-romance-deep text-sm font-medium z-50"
        >
          Link copied! Share the love 💕
        </motion.div>
      )}
    </div>
  );
}

export default App;