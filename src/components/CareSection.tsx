import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CareMessage } from '../types';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface CareSectionProps {
  careMessages: CareMessage[];
  onNext: () => void;
}

export const CareSection: React.FC<CareSectionProps> = ({ careMessages, onNext }) => {
  const [activeCardId, setActiveCardId] = useState<number>(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <span className="text-xs uppercase tracking-widest text-[#8F727B] font-semibold px-3 py-1 rounded-full bg-[#FFE2E2] border border-[#F5CBCB]/60 inline-block mb-3">
          Deep Appreciation
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-[#4A353B] mb-3">
          Things I Appreciate About You 🫶
        </h2>
        <p className="text-sm sm:text-base text-[#6E525A] max-w-md mx-auto">
          Five little things that make you so incredibly special to me.
        </p>
      </motion.div>

      <div className="w-full space-y-4 mb-12">
        {careMessages.map((card, index) => {
          const isOpen = activeCardId === card.id;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`rounded-3xl transition-all duration-300 overflow-hidden cursor-pointer ${
                isOpen
                  ? 'glass-card border-[#F5CBCB] shadow-xl ring-2 ring-[#C5B3D3]/40 scale-[1.01]'
                  : 'bg-white/70 hover:bg-white/90 border border-[#F5CBCB]/40 shadow-sm'
              }`}
              onClick={() => setActiveCardId(card.id)}
            >
              <div className="p-5 sm:p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-[#FFE2E2] flex items-center justify-center font-serif-romantic font-bold text-[#4A353B] text-lg border border-[#F5CBCB]/50">
                    {card.numberStr}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif-romantic font-bold text-[#4A353B]">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#8F727B] font-medium">Click to reveal note</p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#FFE2E2]/60 flex items-center justify-center text-[#6E525A]">
                  {isOpen ? <Sparkles className="w-4 h-4 fill-[#C5B3D3] text-[#C5B3D3]" /> : <Heart className="w-4 h-4 text-[#F5CBCB]" />}
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-6 pt-2 border-t border-[#F5CBCB]/40"
                  >
                    <p className="text-base sm:text-lg text-[#4A353B] leading-relaxed font-sans font-normal bg-[#FFE2E2]/40 p-4 rounded-2xl border border-[#F5CBCB]/60">
                      "{card.message}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={onNext}
          className="py-3.5 px-8 rounded-full btn-palette-primary font-medium text-base shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Unwrap 4 Mystery Gifts 🎁</span>
          <ArrowRight className="w-5 h-5 text-[#4A353B]" />
        </button>
      </motion.div>
    </div>
  );
};
