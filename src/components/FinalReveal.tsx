import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, ArrowRight, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalRevealProps {
  nickname: string;
  dob: string;
  romanticLines: string[];
  likesLines: string[];
  closingLine: string;
  onNext: () => void;
  onOpenMusicUpload: () => void;
  isCreatorMode: boolean;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({
  nickname,
  dob,
  romanticLines,
  likesLines,
  closingLine,
  onNext,
  onOpenMusicUpload,
  isCreatorMode,
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const totalSteps = romanticLines.length + likesLines.length + 3;
    if (stepIndex < totalSteps) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, stepIndex === 0 ? 2500 : stepIndex > 8 ? 3200 : 2200);
      return () => clearTimeout(timer);
    } else {
      try {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#FFE2E2', '#F5CBCB', '#C5B3D3', '#FBEFEF'],
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [stepIndex, romanticLines, likesLines]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-16 text-center text-[#FBEFEF] select-none">
      <div className="max-w-2xl w-full glass-card-dark p-8 sm:p-14 rounded-3xl relative shadow-2xl border border-[#C5B3D3]/30">
        
        <div className="flex items-center justify-center gap-2 mb-6 text-[#C5B3D3]">
          <Moon className="w-5 h-5 fill-[#C5B3D3]" />
          <span className="text-xs uppercase tracking-widest font-semibold text-[#E2D5ED]">Under The Stars</span>
        </div>

        <div className="space-y-4 mb-10 min-h-[320px] flex flex-col items-center justify-center">
          {romanticLines.map((line, idx) => (
            <AnimatePresence key={idx}>
              {stepIndex >= idx + 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2 }}
                  className={`text-lg sm:text-2xl font-serif-romantic ${
                    idx === 0
                      ? 'text-[#C5B3D3] font-semibold italic mb-4'
                      : 'text-[#FFE2E2] font-normal'
                  }`}
                >
                  {line}
                </motion.p>
              )}
            </AnimatePresence>
          ))}

          {likesLines.map((line, idx) => {
            const lineStep = romanticLines.length + idx + 1;
            return (
              <AnimatePresence key={`like-${idx}`}>
                {stepIndex >= lineStep && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9 }}
                    className={`text-base sm:text-xl font-sans ${
                      idx === 0
                        ? 'text-[#C5B3D3] font-serif-romantic text-xl sm:text-2xl mt-6 mb-2 font-semibold'
                        : 'text-[#FBEFEF] font-light'
                    }`}
                  >
                    {line}
                  </motion.p>
                )}
              </AnimatePresence>
            );
          })}

          <AnimatePresence>
            {stepIndex >= romanticLines.length + likesLines.length + 1 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="text-[#C5B3D3] font-serif-romantic text-xl sm:text-2xl mt-6 italic"
              >
                Aur sabse zyada…
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stepIndex >= romanticLines.length + likesLines.length + 2 && (
              <motion.h3
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, type: 'spring' }}
                className="text-3xl sm:text-5xl font-serif-romantic font-bold text-gradient-lavender my-4"
              >
                {closingLine}
              </motion.h3>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stepIndex >= romanticLines.length + likesLines.length + 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="pt-6 border-t border-[#C5B3D3]/30 mt-6 w-full"
              >
                <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-[#FBEFEF] mb-2">
                  Happy Birthday, {nickname}
                </h2>
                <p className="text-xl sm:text-2xl font-serif-romantic tracking-widest text-[#C5B3D3] font-medium">
                  {dob} ✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onNext}
            className="w-full sm:w-auto py-3.5 px-8 rounded-full btn-palette-primary font-medium text-base shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Finish Experience ❤️</span>
            <ArrowRight className="w-5 h-5 text-[#4A353B]" />
          </button>

          {isCreatorMode && (
            <button
              onClick={onOpenMusicUpload}
              className="text-xs text-[#C5B3D3] hover:text-[#FBEFEF] flex items-center gap-1.5 py-2 transition-colors"
            >
              <Music className="w-3.5 h-3.5 text-[#C5B3D3]" />
              <span>Upload Final Song 🎵</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
