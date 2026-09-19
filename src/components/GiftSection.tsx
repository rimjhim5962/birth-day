import React from 'react';
import { motion } from 'framer-motion';
import type { GiftItem } from '../types';
import { GiftBox } from './GiftBox';
import { Gift, ArrowRight } from 'lucide-react';

interface GiftSectionProps {
  gifts: GiftItem[];
  onOpenGift: (id: number) => void;
  onNext: () => void;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ gifts, onOpenGift, onNext }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <span className="text-xs uppercase tracking-widest text-[#8F727B] font-semibold px-3 py-1 rounded-full bg-[#FFE2E2] border border-[#F5CBCB]/60 inline-flex items-center gap-1 mb-3">
          <Gift className="w-3.5 h-3.5 text-[#C5B3D3]" />
          <span>Interactive Mystery Boxes</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-[#4A353B] mb-3">
          Okay… I still have 4 surprises left. 🎁
        </h2>
        <p className="text-sm sm:text-base text-[#6E525A] max-w-md mx-auto">
          Tap each box to open your personalized birthday surprises!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-12">
        {gifts.map((gift) => (
          <GiftBox key={gift.id} gift={gift} onOpenGift={onOpenGift} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={onNext}
          className="py-4 px-10 rounded-full btn-palette-primary font-medium text-lg shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
        >
          <span>The Final Surprise 🌙</span>
          <ArrowRight className="w-5 h-5 text-[#4A353B]" />
        </button>
      </motion.div>
    </div>
  );
};
