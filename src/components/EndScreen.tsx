import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Edit3, Trash2 } from 'lucide-react';

interface EndScreenProps {
  signatureText: string;
  onReplay: () => void;
  onReset: () => void;
  onOpenStudio: () => void;
  isCreatorMode: boolean;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  signatureText,
  onReplay,
  onReset,
  onOpenStudio,
  isCreatorMode,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 text-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="glass-card p-10 sm:p-14 rounded-3xl max-w-xl w-full relative shadow-2xl border border-[#F5CBCB]"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[#FFE2E2] via-[#F5CBCB] to-[#C5B3D3] flex items-center justify-center text-[#4A353B] shadow-xl border border-[#F5CBCB]">
          <Heart className="w-10 h-10 fill-[#F5CBCB] text-[#4A353B]" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-[#4A353B] mb-4">
          Happy Birthday!
        </h2>

        <p className="text-lg sm:text-xl font-handwriting text-[#6E525A] mb-8 text-3xl">
          {signatureText}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onReplay}
            className="w-full py-4 px-8 rounded-2xl btn-palette-primary font-medium text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-[#4A353B]" />
            <span>Experience It Again ↻</span>
          </button>

          {isCreatorMode && (
            <>
              <button
                onClick={onOpenStudio}
                className="w-full py-3 px-6 rounded-2xl bg-[#FFE2E2]/60 hover:bg-[#FFE2E2] text-[#4A353B] border border-[#F5CBCB] font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4 text-[#6E525A]" />
                <span>Edit Messages & Uploads ✏️</span>
              </button>

              <button
                onClick={onReset}
                className="text-xs text-[#8F727B] hover:text-[#4A353B] flex items-center justify-center gap-1 py-2 transition-colors mt-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Experience to Default</span>
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
