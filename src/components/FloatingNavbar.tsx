import React from 'react';
import type { SectionPhase } from '../types';
import { Heart, Sparkles, Image, Flame, Gift, Moon, Mail, Award, Edit3 } from 'lucide-react';

interface FloatingNavbarProps {
  currentPhase: SectionPhase;
  onNavigate: (phase: SectionPhase) => void;
  onOpenStudio: () => void;
  isCreatorMode: boolean;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  currentPhase,
  onNavigate,
  onOpenStudio,
  isCreatorMode,
}) => {
  const steps: Array<{ phase: SectionPhase; label: string; icon: React.ReactNode }> = [
    { phase: 'intro', label: 'Letter', icon: <Mail className="w-4 h-4" /> },
    { phase: 'reveal', label: 'Reveal', icon: <Sparkles className="w-4 h-4" /> },
    { phase: 'letter', label: 'Note', icon: <Heart className="w-4 h-4" /> },
    { phase: 'memories', label: 'Memories', icon: <Image className="w-4 h-4" /> },
    { phase: 'fights', label: 'Fights', icon: <Flame className="w-4 h-4" /> },
    { phase: 'care', label: 'Care', icon: <Award className="w-4 h-4" /> },
    { phase: 'gifts', label: 'Gifts', icon: <Gift className="w-4 h-4" /> },
    { phase: 'final', label: 'Final', icon: <Moon className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
      <nav className="glass-pill px-3 py-2 rounded-full flex items-center gap-1 sm:gap-2 shadow-lg border border-[#F5CBCB]/60 transition-all duration-300">
        {steps.map((step) => {
          const isActive = currentPhase === step.phase;
          return (
            <button
              key={step.phase}
              onClick={() => onNavigate(step.phase)}
              aria-label={step.label}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-[#FFE2E2] to-[#F5CBCB] text-[#4A353B] font-semibold shadow-md border border-[#F5CBCB] scale-105'
                  : 'text-[#6E525A] hover:text-[#4A353B] hover:bg-[#FFE2E2]/40'
              }`}
            >
              {step.icon}
              <span className="hidden md:inline">{step.label}</span>
            </button>
          );
        })}

        {isCreatorMode && (
          <>
            <div className="w-[1px] h-4 bg-[#F5CBCB]/60 mx-1 hidden sm:block" />
            <button
              onClick={onOpenStudio}
              aria-label="Edit Experience"
              title="Edit Experience / Creator Mode"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-[#4A353B] bg-[#FFE2E2] hover:bg-[#F5CBCB]/60 border border-[#F5CBCB] transition-all hover:scale-105"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#6E525A]" />
              <span className="hidden sm:inline">Customize</span>
            </button>
          </>
        )}
      </nav>
    </div>
  );
};
