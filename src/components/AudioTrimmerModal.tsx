import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { AudioTrack } from '../types';
import { Play, Pause, Upload, Check, X, Sliders, Volume2, RefreshCw } from 'lucide-react';

interface AudioTrimmerModalProps {
  trackKey: 'music1' | 'music2';
  trackData: AudioTrack;
  onSaveTrack: (trackKey: 'music1' | 'music2', updatedTrack: AudioTrack, fileBlob?: Blob) => void;
  onClose: () => void;
}

export const AudioTrimmerModal: React.FC<AudioTrimmerModalProps> = ({
  trackKey,
  trackData,
  onSaveTrack,
  onClose,
}) => {
  const [audioUrl, setAudioUrl] = useState<string | undefined>(trackData.url);
  const [trackName, setTrackName] = useState<string>(trackData.name || 'Custom Song.mp3');
  const [duration, setDuration] = useState<number>(trackData.duration || 180);
  const [startTime, setStartTime] = useState<number>(trackData.startTime || 0);
  const [endTime, setEndTime] = useState<number>(trackData.endTime || Math.min(180, trackData.duration || 180));
  const [volume, setVolume] = useState<number>(trackData.volume || 0.8);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [fileBlob, setFileBlob] = useState<Blob | undefined>(trackData.blob);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onloadedmetadata = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(Math.floor(audio.duration));
          if (endTime > audio.duration || endTime === 180) {
            setEndTime(Math.floor(audio.duration));
          }
        }
      };
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioUrl, endTime]);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      alert('Please upload a valid audio file (MP3, WAV, etc.)');
      return;
    }
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setTrackName(file.name);
    setFileBlob(file);
    setStartTime(0);
    setEndTime(180);
  };

  const handleTogglePreview = () => {
    if (!audioRef.current) return;
    if (isPlayingPreview) {
      audioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      audioRef.current.currentTime = startTime;
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => setIsPlayingPreview(true)).catch(() => {});

      const checkEnd = setInterval(() => {
        if (audioRef.current && audioRef.current.currentTime >= endTime) {
          audioRef.current.pause();
          setIsPlayingPreview(false);
          clearInterval(checkEnd);
        }
      }, 100);
    }
  };

  const handleResetTrim = () => {
    setStartTime(0);
    setEndTime(duration);
  };

  const handleSave = () => {
    const updated: AudioTrack = {
      ...trackData,
      name: trackName,
      url: audioUrl,
      blob: fileBlob,
      startTime,
      endTime,
      duration,
      volume,
    };
    onSaveTrack(trackKey, updated, fileBlob);
    onClose();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2130]/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card p-6 sm:p-8 rounded-3xl max-w-lg w-full bg-white relative shadow-2xl border border-[#F5CBCB] flex flex-col"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F5CBCB]/50 mb-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#6E525A]" />
            <h3 className="font-serif-romantic text-xl font-bold text-[#4A353B]">
              {trackKey === 'music1' ? 'Upload Birthday Song 🎵 (Track 1)' : 'Upload Final Song 🎵 (Track 2)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFE2E2] text-[#4A353B] flex items-center justify-center hover:bg-[#F5CBCB] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-6">
          <label className="w-full p-4 rounded-2xl bg-[#FBEFEF] border-2 border-dashed border-[#F5CBCB] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#FFE2E2]/60 transition-colors">
            <Upload className="w-8 h-8 text-[#C5B3D3] mb-2" />
            <span className="text-sm font-semibold text-[#4A353B] truncate max-w-[280px]">
              {trackName || 'Browse or Drag Audio File'}
            </span>
            <span className="text-xs text-[#8F727B] mt-0.5">MP3, WAV, M4A, OGG supported</span>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        <div className="bg-[#FBEFEF] p-4 rounded-2xl border border-[#F5CBCB]/60 mb-6">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[#4A353B]">
            <span>Trim Selection Timeline</span>
            <span className="text-[#6E525A]">
              {formatTime(startTime)} — {formatTime(endTime)} ({formatTime(endTime - startTime)})
            </span>
          </div>

          <div className="relative w-full h-8 bg-[#FFE2E2] rounded-xl overflow-hidden mb-4 flex items-center border border-[#F5CBCB]/40">
            <div
              className="absolute h-full bg-gradient-to-r from-[#F5CBCB] to-[#C5B3D3] opacity-80"
              style={{
                left: `${(startTime / duration) * 100}%`,
                width: `${((endTime - startTime) / duration) * 100}%`,
              }}
            />
            <div className="w-full flex justify-between px-2 text-[10px] text-[#4A353B] font-mono z-10 pointer-events-none">
              <span>0:00</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#6E525A] font-medium flex justify-between mb-1">
                <span>Start Time:</span>
                <span className="font-semibold text-[#4A353B]">{formatTime(startTime)}</span>
              </label>
              <input
                type="range"
                min="0"
                max={endTime - 1}
                step="1"
                value={startTime}
                onChange={(e) => setStartTime(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#FFE2E2] rounded-lg appearance-none cursor-pointer accent-[#F5CBCB]"
              />
            </div>

            <div>
              <label className="text-xs text-[#6E525A] font-medium flex justify-between mb-1">
                <span>End Time:</span>
                <span className="font-semibold text-[#4A353B]">{formatTime(endTime)}</span>
              </label>
              <input
                type="range"
                min={startTime + 1}
                max={duration}
                step="1"
                value={endTime}
                onChange={(e) => setEndTime(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#FFE2E2] rounded-lg appearance-none cursor-pointer accent-[#F5CBCB]"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F5CBCB]/50 flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-[#6E525A]" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#FFE2E2] rounded-lg appearance-none cursor-pointer accent-[#F5CBCB]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePreview}
              className="py-2.5 px-4 rounded-xl btn-palette-primary font-medium text-xs shadow-md flex items-center gap-1.5"
            >
              {isPlayingPreview ? <Pause className="w-4 h-4 text-[#4A353B]" /> : <Play className="w-4 h-4 text-[#4A353B]" />}
              <span>{isPlayingPreview ? 'Pause' : 'Preview Selection'}</span>
            </button>

            <button
              onClick={handleResetTrim}
              className="p-2.5 rounded-xl bg-[#FFE2E2] text-[#4A353B] hover:bg-[#F5CBCB] transition-colors border border-[#F5CBCB]"
              title="Reset Trim"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleSave}
            className="py-2.5 px-6 rounded-xl bg-[#F5CBCB] text-[#4A353B] font-medium text-xs shadow-md hover:bg-[#C5B3D3] transition-colors flex items-center gap-1.5 border border-[#F5CBCB]"
          >
            <Check className="w-4 h-4" />
            <span>Save Song</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
