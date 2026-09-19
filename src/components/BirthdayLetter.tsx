import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Quote } from 'lucide-react';

interface BirthdayLetterProps {
  letterText: string;
  nickname: string;
  onNext: () => void;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({ letterText, nickname, onNext }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDoneTyping, setIsDoneTyping] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < letterText.length) {
        setDisplayedText(letterText.slice(0, index + 1));
        index++;
      } else {
        setIsDoneTyping(true);
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [letterText]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="w-full max-w-2xl glass-card p-6 sm:p-12 rounded-3xl relative shadow-2xl border border-[#F5CBCB]/60"
      >
        <div className="flex items-center justify-between border-b border-[#F5CBCB]/40 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Quote className="w-6 h-6 text-[#C5B3D3] rotate-180" />
            <span className="font-serif-romantic text-lg sm:text-xl font-semibold text-[#4A353B]">
              A Note From The Heart
            </span>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#FFE2E2] text-[#4A353B] font-medium border border-[#F5CBCB]/50">
            For {nickname}
          </span>
        </div>

        <div className="whitespace-pre-line text-base sm:text-lg leading-relaxed text-[#4A353B] font-normal min-h-[220px] font-sans">
          {displayedText}
          {!isDoneTyping && (
            <span className="inline-block w-2 h-5 bg-[#F5CBCB] ml-1 animate-pulse" />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDoneTyping ? 1 : 0.6 }}
          transition={{ duration: 0.5 }}
          className="mt-10 pt-6 border-t border-[#F5CBCB]/40 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-1.5 text-xs text-[#6E525A]">
            <Heart className="w-4 h-4 text-[#F5CBCB] fill-[#F5CBCB]" />
            <span>Written with lots of love</span>
          </div>

          <button
            onClick={onNext}
            className="py-3 px-6 rounded-full btn-palette-primary font-medium text-sm shadow-md hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer ml-auto"
          >
            <span>See Our Memories 📸</span>
            <ArrowRight className="w-4 h-4 text-[#4A353B]" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
