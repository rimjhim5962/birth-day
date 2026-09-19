import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GiftItem } from '../types';
import { Gift, Sparkles, Heart, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GiftBoxProps {
  gift: GiftItem;
  onOpenGift: (id: number) => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ gift, onOpenGift }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleBoxClick = () => {
    onOpenGift(gift.id);
    setIsOpenModal(true);
    
    try {
      if (gift.animationType === 'particles') {
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 }, colors: ['#FFE2E2', '#F5CBCB', '#C5B3D3'] });
      } else if (gift.animationType === 'glowing') {
        confetti({ particleCount: 40, spread: 60, colors: ['#C5B3D3', '#FFE2E2'] });
      } else if (gift.animationType === 'ribbon') {
        confetti({ particleCount: 50, spread: 70, colors: ['#F5CBCB', '#FFE2E2'] });
      } else {
        confetti({ particleCount: 60, spread: 80, colors: ['#C5B3D3', '#F5CBCB', '#FBEFEF'] });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderBoxVisual = () => {
    switch (gift.animationType) {
      case 'glowing':
        return (
          <motion.div
            animate={{ scale: [1, 1.05, 1], filter: ['drop-shadow(0 0 10px rgba(197,179,211,0.4))', 'drop-shadow(0 0 25px rgba(197,179,211,0.8))', 'drop-shadow(0 0 10px rgba(197,179,211,0.4))'] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FFE2E2] to-[#C5B3D3]/70 flex items-center justify-center text-[#4A353B] shadow-xl border border-[#F5CBCB] relative"
          >
            <Gift className="w-10 h-10 text-[#4A353B]" />
            <Sparkles className="w-5 h-5 text-[#C5B3D3] absolute -top-2 -right-2 animate-pulse" />
          </motion.div>
        );
      case 'ribbon':
        return (
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#F5CBCB] to-[#FFE2E2] flex items-center justify-center text-[#4A353B] shadow-xl relative overflow-hidden border border-[#F5CBCB]"
          >
            <div className="absolute inset-0 bg-white/30 w-4 mx-auto" />
            <div className="absolute inset-0 bg-white/30 h-4 my-auto" />
            <Gift className="w-10 h-10 text-[#4A353B] relative z-10" />
          </motion.div>
        );
      case 'particles':
        return (
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#C5B3D3] to-[#F5CBCB] flex items-center justify-center text-[#4A353B] shadow-xl relative border border-[#C5B3D3]"
          >
            <Gift className="w-10 h-10 text-[#4A353B]" />
            <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-[#FFE2E2] animate-ping" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#C5B3D3] animate-ping" />
          </motion.div>
        );
      case 'cardPopup':
      default:
        return (
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FFE2E2] via-[#F5CBCB] to-[#C5B3D3] flex items-center justify-center text-[#4A353B] shadow-2xl relative border-2 border-[#F5CBCB]"
          >
            <Heart className="w-10 h-10 text-[#4A353B] fill-[#F5CBCB]" />
            <Sparkles className="w-5 h-5 text-[#C5B3D3] absolute -top-2 -right-2 animate-bounce" />
          </motion.div>
        );
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleBoxClick}
        className={`glass-card p-6 rounded-3xl flex flex-col items-center text-center cursor-pointer transition-all duration-300 relative border ${
          gift.isOpened ? 'border-[#F5CBCB] bg-[#FFE2E2]/40' : 'border-[#F5CBCB]/60 hover:border-[#C5B3D3]'
        }`}
      >
        {gift.isOpened && (
          <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#F5CBCB] text-[#4A353B] flex items-center justify-center text-xs shadow-md border border-[#F5CBCB]">
            <Check className="w-3.5 h-3.5" />
          </span>
        )}

        <div className="mb-4">{renderBoxVisual()}</div>

        <span className="text-xs uppercase tracking-widest text-[#8F727B] font-semibold mb-1">
          {gift.subtitle}
        </span>
        <h3 className="text-lg font-serif-romantic font-bold text-[#4A353B]">
          {gift.title}
        </h3>
        <p className="text-xs text-[#6E525A] mt-2 font-medium">
          {gift.isOpened ? 'Opened ✨ Click to read again' : 'Click to Unwrap 🎁'}
        </p>
      </motion.div>

      <AnimatePresence>
        {isOpenModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpenModal(false)}
            className="fixed inset-0 z-50 bg-[#2D2130]/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 sm:p-10 rounded-3xl max-w-lg w-full text-center relative shadow-2xl border border-[#F5CBCB] bg-white/95"
            >
              <button
                onClick={() => setIsOpenModal(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFE2E2] text-[#4A353B] flex items-center justify-center hover:bg-[#F5CBCB] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFE2E2] flex items-center justify-center text-[#4A353B] border border-[#F5CBCB]">
                <Gift className="w-8 h-8 text-[#6E525A]" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#8F727B] font-semibold mb-1 block">
                {gift.subtitle}
              </span>
              <h3 className="text-2xl font-serif-romantic font-bold text-[#4A353B] mb-4">
                {gift.title}
              </h3>

              {gift.image && (
                <div className="mb-4 max-h-48 rounded-2xl overflow-hidden bg-[#FBEFEF] border border-[#F5CBCB]/60">
                  <img src={gift.image} alt={gift.title} className="w-full h-full object-cover" />
                </div>
              )}

              <p className="text-base sm:text-lg text-[#4A353B] leading-relaxed font-sans bg-[#FFE2E2]/50 p-5 rounded-2xl border border-[#F5CBCB]/60 mb-6 font-normal">
                "{gift.message}"
              </p>

              <button
                onClick={() => setIsOpenModal(false)}
                className="py-3 px-8 rounded-full btn-palette-primary font-medium text-sm shadow-md"
              >
                Close Surprise ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
