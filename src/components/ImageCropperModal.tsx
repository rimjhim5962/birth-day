import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { PhotoItem } from '../types';
import { ZoomIn, ZoomOut, RotateCw, RefreshCw, Check, X, Crop } from 'lucide-react';

interface ImageCropperModalProps {
  photo: PhotoItem;
  onSaveCrop: (photoId: string, croppedUrl: string) => void;
  onClose: () => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  photo,
  onSaveCrop,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(photo.crop?.zoom || 1);
  const [rotation, setRotation] = useState(photo.crop?.rotation || 0);
  const [offset, setOffset] = useState({ x: photo.crop?.x || 0, y: photo.crop?.y || 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = photo.originalUrl || photo.url;
    img.onload = () => {
      setImageObj(img);
    };
  }, [photo]);

  useEffect(() => {
    if (!imageObj || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 320;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);
    ctx.save();

    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.translate(offset.x, offset.y);

    const aspect = imageObj.width / imageObj.height;
    let drawWidth = size;
    let drawHeight = size;
    if (aspect > 1) {
      drawWidth = size * aspect;
    } else {
      drawHeight = size / aspect;
    }

    ctx.drawImage(imageObj, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    ctx.restore();
  }, [imageObj, zoom, rotation, offset]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    const croppedUrl = canvasRef.current.toDataURL('image/jpeg', 0.9);
    onSaveCrop(photo.id, croppedUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2130]/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card p-6 rounded-3xl max-w-md w-full bg-white relative shadow-2xl border border-[#F5CBCB] flex flex-col items-center"
      >
        <div className="w-full flex items-center justify-between pb-3 border-b border-[#F5CBCB]/50 mb-4">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-[#6E525A]" />
            <h3 className="font-serif-romantic text-xl font-bold text-[#4A353B]">Crop & Reposition</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFE2E2] text-[#4A353B] flex items-center justify-center hover:bg-[#F5CBCB] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-2xl overflow-hidden bg-[#FBEFEF] shadow-inner border-2 border-dashed border-[#F5CBCB] cursor-grab active:cursor-grabbing relative flex items-center justify-center mb-6 touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <canvas ref={canvasRef} className="max-w-full max-h-full rounded-xl pointer-events-none" />
          <span className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded bg-[#4A353B]/70 text-white pointer-events-none">
            Drag to pan
          </span>
        </div>

        <div className="w-full space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <ZoomOut className="w-4 h-4 text-[#8F727B]" />
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#FFE2E2] rounded-lg appearance-none cursor-pointer accent-[#F5CBCB]"
            />
            <ZoomIn className="w-4 h-4 text-[#6E525A]" />
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="py-2 px-4 rounded-xl bg-[#FFE2E2] hover:bg-[#F5CBCB] text-[#4A353B] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#F5CBCB]"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rotate</span>
            </button>

            <button
              onClick={handleReset}
              className="py-2 px-4 rounded-xl bg-[#FFE2E2] hover:bg-[#F5CBCB] text-[#4A353B] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#F5CBCB]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-2xl bg-[#FBEFEF] text-[#6E525A] font-medium text-sm hover:bg-[#FFE2E2] transition-colors border border-[#F5CBCB]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-1/2 py-3 rounded-2xl btn-palette-primary font-medium text-sm shadow-md flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4 text-[#4A353B]" />
            <span>Use Photo</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
