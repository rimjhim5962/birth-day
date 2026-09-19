import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';

interface FightSectionProps {
  question: string;
  options: string[];
  introText: string;
  bodyText: string;
  outroText: string;
  onNext: () => void;
}

export const FightSection: React.FC<FightSectionProps> = ({
  question,
  options,
  introText,
  bodyText,
  outroText,
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showReconciliation, setShowReconciliation] = useState(false);

  const getPlayfulResponse = (index: number) => {
    switch (index) {
      case 0:
        return "Wait, really?! You're taking the blame? 😇 (I suspect a trap... 🤭)";
      case 1:
        return "I knew you'd pick me! 😤 But let's be real... you love my dramatics! 😂❤️";
      case 2:
        return "100% facts! We are equal partners in chaotic fights & endless love 💀❤️";
      default:
        return "Haha, classic us! 😂❤️";
    }
  };

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    setTimeout(() => {
      setShowReconciliation(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-16">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="text-xs uppercase tracking-widest text-[#6E525A] font-semibold px-3 py-1 rounded-full bg-[#FFE2E2] border border-[#F5CBCB]/60 inline-flex items-center gap-1 mb-3">
            <Flame className="w-3.5 h-3.5 text-[#F5CBCB]" />
            <span>Playful Quiz</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-[#4A353B] mb-2">
            Our Little Fights 😤❤️
          </h2>
        </motion.div>

        {!showReconciliation ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 sm:p-10 rounded-3xl text-center shadow-2xl border border-[#F5CBCB]/70"
          >
            <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-[#4A353B] mb-8">
              {question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl font-medium text-base sm:text-lg border transition-all duration-300 shadow-sm ${
                    selectedOption === idx
                      ? 'bg-gradient-to-r from-[#FFE2E2] to-[#F5CBCB] text-[#4A353B] border-[#F5CBCB] shadow-md ring-2 ring-[#C5B3D3]/50'
                      : 'bg-white/80 text-[#4A353B] border-[#F5CBCB]/50 hover:bg-[#FFE2E2]/50'
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-2xl bg-[#FFE2E2]/60 border border-[#F5CBCB] text-[#4A353B] text-sm font-medium"
                >
                  {getPlayfulResponse(selectedOption)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="glass-card p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden shadow-2xl border border-[#F5CBCB]"
          >
            <Sparkles className="w-8 h-8 text-[#C5B3D3] absolute top-6 right-6 opacity-80 animate-pulse" />

            <p className="text-sm uppercase tracking-widest text-[#8F727B] font-semibold mb-4">
              {introText}
            </p>

            <blockquote className="text-lg sm:text-2xl font-serif-romantic font-medium text-[#4A353B] leading-relaxed mb-6 italic">
              "{bodyText}"
            </blockquote>

            <motion.h4
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl sm:text-3xl font-serif-romantic font-bold text-gradient-rose mb-10"
            >
              {outroText}
            </motion.h4>

            <button
              onClick={onNext}
              className="py-3.5 px-8 rounded-full btn-palette-primary font-medium text-base shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Things I Appreciate About You 🫶</span>
              <ArrowRight className="w-5 h-5 text-[#4A353B]" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
