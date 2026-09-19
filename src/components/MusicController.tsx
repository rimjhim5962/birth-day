import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sliders } from 'lucide-react';
import type { AudioTrack } from '../types';

interface MusicControllerProps {
  currentTrack: 'music1' | 'music2';
  trackData: AudioTrack;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
  onVolumeChange: (vol: number) => void;
  onOpenTrimmer: (track: 'music1' | 'music2') => void;
  isCreatorMode: boolean;
}

export const MusicController: React.FC<MusicControllerProps> = ({
  currentTrack,
  trackData,
  isPlaying,
  onTogglePlay,
  onToggleMute,
  isMuted,
  onVolumeChange,
  onOpenTrimmer,
  isCreatorMode,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="glass-pill px-3 py-2 rounded-full flex items-center gap-2 shadow-xl border border-[#F5CBCB]/80 transition-all duration-300 hover:scale-105">
        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFE2E2] to-[#F5CBCB] text-[#4A353B] flex items-center justify-center shadow-md hover:scale-105 transition-all border border-[#F5CBCB]"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-[#4A353B]" /> : <Play className="w-4 h-4 ml-0.5 text-[#4A353B]" />}
        </button>

        <div className="hidden sm:flex flex-col text-xs max-w-[120px] truncate">
          <span className="font-semibold text-[#4A353B] flex items-center gap-1">
            <Music className="w-3 h-3 text-[#C5B3D3] animate-spin" style={{ animationDuration: '4s' }} />
            {currentTrack === 'music1' ? 'Track 1' : 'Track 2'}
          </span>
          <span className="text-[10px] text-[#6E525A] truncate">{trackData.name || 'Birthday Song'}</span>
        </div>

        <div 
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="p-1.5 rounded-full text-[#6E525A] hover:bg-[#FFE2E2]/60 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#8F727B]" /> : <Volume2 className="w-4 h-4 text-[#6E525A]" />}
          </button>

          {showVolumeSlider && (
            <div className="absolute bottom-10 right-0 glass-pill p-2 rounded-xl shadow-lg flex items-center gap-2 border border-[#F5CBCB]">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : trackData.volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-20 h-1.5 bg-[#FFE2E2] rounded-lg appearance-none cursor-pointer accent-[#F5CBCB]"
              />
            </div>
          )}
        </div>

        {isCreatorMode && (
          <button
            onClick={() => onOpenTrimmer(currentTrack)}
            aria-label="Audio Trimmer & Uploader"
            title="Trim & Upload Song"
            className="p-1.5 rounded-full text-[#6E525A] hover:bg-[#FFE2E2]/60 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
