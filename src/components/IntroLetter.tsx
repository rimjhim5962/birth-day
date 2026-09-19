import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MailOpen, Music } from 'lucide-react';

interface IntroLetterProps {
  greeting: string;
  subtext: string;
  onOpen: () => void;
  onOpenMusicUpload: () => void;
  isCreatorMode: boolean;
}

export const IntroLetter: React.FC<IntroLetterProps> = ({
  greeting,
  subtext,
  onOpen,
  onOpenMusicUpload,
  isCreatorMode,
}) => {
  const [isOpenClicked, setIsOpenClicked] = useState(false);

  const handleOpen = () => {
    setIsOpenClicked(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 sm:p-10 rounded-3xl text-center relative overflow-hidden shadow-2xl border border-[#F5CBCB]/60">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FFE2E2]/60 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#C5B3D3]/40 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            animate={isOpenClicked ? { rotateY: 180, scale: 1.1 } : { y: [0, -8, 0] }}
            transition={isOpenClicked ? { duration: 0.8 } : { repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-[#FFE2E2] via-[#FBEFEF] to-[#C5B3D3]/40 flex items-center justify-center shadow-lg border border-[#F5CBCB] relative"
          >
            <MailOpen className="w-12 h-12 text-[#6E525A] stroke-[1.5]" />
            <Sparkles className="w-5 h-5 text-[#C5B3D3] absolute -top-1 -right-1 animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-widest text-[#8F727B] font-semibold mb-2"
          >
            A Private Surprise
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-4xl font-serif-romantic font-bold text-[#4A353B] mb-3"
          >
            {greeting}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base sm:text-lg text-[#6E525A] font-light mb-8"
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={handleOpen}
              disabled={isOpenClicked}
              className="w-full py-4 px-8 rounded-2xl btn-palette-primary font-medium text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{isOpenClicked ? 'Opening...' : 'Open Me 💌'}</span>
              <Heart className="w-5 h-5 text-[#6E525A] fill-[#F5CBCB] group-hover:scale-125 transition-transform" />
            </button>

            {isCreatorMode && (
              <button
                onClick={onOpenMusicUpload}
                className="text-xs text-[#8F727B] hover:text-[#4A353B] flex items-center justify-center gap-1.5 py-1 transition-colors"
              >
                <Music className="w-3.5 h-3.5 text-[#C5B3D3]" />
                <span>Upload Birthday Song 🎵 (Optional)</span>
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
