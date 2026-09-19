import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface BirthdayRevealProps {
  name: string;
  dob: string;
  onNext: () => void;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({ name, dob, onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFE2E2', '#F5CBCB', '#C5B3D3', '#FBEFEF'],
        });
      } catch (e) {
        console.log(e);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="w-full max-w-2xl glass-card p-10 sm:p-14 rounded-3xl relative shadow-2xl border border-[#F5CBCB]/70"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE2E2]/70 border border-[#F5CBCB]/60 text-[#4A353B] text-xs sm:text-sm font-medium mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#C5B3D3] fill-[#C5B3D3]" />
          <span>Special Birthday Celebration</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg sm:text-2xl font-serif-romantic tracking-wider text-[#6E525A] uppercase mb-2 font-semibold"
        >
          Happy Birthday
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 1, type: 'spring', stiffness: 80 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif-romantic font-bold text-gradient-rose mb-6 leading-tight drop-shadow-sm"
        >
          {name} <Heart className="inline w-8 h-8 sm:w-12 sm:h-12 text-[#F5CBCB] fill-[#F5CBCB]" />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="inline-block px-6 py-2 rounded-full bg-[#FBEFEF] border border-[#F5CBCB] text-[#4A353B] font-serif-romantic text-xl sm:text-2xl tracking-widest mb-10 shadow-sm"
        >
          {dob}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        >
          <button
            onClick={onNext}
            className="py-3.5 px-8 rounded-full btn-palette-primary font-medium text-base shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 group cursor-pointer"
          >
            <span>Read Your Special Letter</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#4A353B]" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
