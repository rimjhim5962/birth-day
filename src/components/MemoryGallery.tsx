import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PhotoItem } from '../types';
import { Plus, Trash2, Crop, ZoomIn, ArrowRight, UploadCloud, X, Sparkles, ArrowLeft, ArrowRight as ArrowRightIcon, RefreshCw, Edit2 } from 'lucide-react';

interface MemoryGalleryProps {
  photos: PhotoItem[];
  onUploadPhotos: (files: FileList | File[]) => void;
  onDeletePhoto: (id: string) => void;
  onReplacePhoto: (id: string, file: File) => void;
  onUpdateCaption: (id: string, caption: string) => void;
  onMovePhoto: (index: number, direction: 'left' | 'right') => void;
  onOpenCrop: (photo: PhotoItem) => void;
  onNext: () => void;
  isCreatorMode: boolean;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  photos,
  onUploadPhotos,
  onDeletePhoto,
  onReplacePhoto,
  onUpdateCaption,
  onMovePhoto,
  onOpenCrop,
  onNext,
  isCreatorMode,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUploadPhotos(e.target.files);
    }
  };

  const handleReplaceFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onReplacePhoto(id, e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUploadPhotos(e.dataTransfer.files);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <span className="text-xs uppercase tracking-widest text-[#8F727B] font-semibold px-3 py-1 rounded-full bg-[#FFE2E2] border border-[#F5CBCB]/50 inline-block mb-3">
          Photo Scrapbook
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-[#4A353B] mb-3">
          Our Little Memories 📸
        </h2>
        <p className="text-sm sm:text-base text-[#6E525A] max-w-md mx-auto">
          Every picture tells a story of love, goofy smiles, and unforgettable moments.
        </p>

        {/* Creator Mode Top Action Bar */}
        {isCreatorMode && (
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <label className="py-3 px-6 rounded-full bg-[#F5CBCB] hover:bg-[#C5B3D3] text-[#4A353B] font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2 border border-[#F5CBCB]">
              <Plus className="w-5 h-5" />
              <span>+ Add More Memories 📸</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <span className="text-xs text-[#8F727B] font-medium">
              ({photos.length} photo{photos.length !== 1 ? 's' : ''} in scrapbook)
            </span>
          </div>
        )}
      </motion.div>

      {/* Drag and Drop Zone in Creator Mode */}
      {isCreatorMode && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full mb-8 p-6 rounded-2xl border-2 border-dashed text-center transition-all ${
            isDragging ? 'border-[#C5B3D3] bg-[#FFE2E2]/70 scale-[1.01]' : 'border-[#F5CBCB]/70 bg-[#FBEFEF]/50'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#6E525A]">
            <UploadCloud className="w-5 h-5 text-[#C5B3D3]" />
            <span>Drag &amp; Drop additional photos anywhere here to append them to your memory wall</span>
          </div>
        </div>
      )}

      {/* Polaroid Grid */}
      <div className="w-full mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -2 : 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
              className="bg-white p-3 rounded-2xl shadow-xl border border-[#F5CBCB]/60 relative group flex flex-col justify-between"
            >
              <div>
                <div 
                  className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FBEFEF] relative cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Memory photo'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#4A353B]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 flex-wrap p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhoto(photo);
                      }}
                      className="p-2 rounded-full bg-white/95 text-[#4A353B] shadow-md hover:scale-110 transition-transform"
                      title="View Full Photo"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    {isCreatorMode && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenCrop(photo);
                          }}
                          className="p-2 rounded-full bg-white/95 text-[#4A353B] shadow-md hover:scale-110 transition-transform"
                          title="Crop & Reposition Photo"
                        >
                          <Crop className="w-4 h-4" />
                        </button>

                        <label
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full bg-white/95 text-[#4A353B] shadow-md hover:scale-110 transition-transform cursor-pointer"
                          title="Replace Photo"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleReplaceFileChange(photo.id, e)}
                            className="hidden"
                          />
                        </label>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletePhoto(photo.id);
                          }}
                          className="p-2 rounded-full bg-white/95 text-rose-600 shadow-md hover:scale-110 transition-transform"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Caption & Reorder controls */}
                <div className="pt-3 px-1">
                  {isCreatorMode ? (
                    <div className="space-y-1">
                      {editingCaptionId === photo.id ? (
                        <input
                          type="text"
                          autoFocus
                          value={photo.caption || ''}
                          onChange={(e) => onUpdateCaption(photo.id, e.target.value)}
                          onBlur={() => setEditingCaptionId(null)}
                          className="w-full text-xs p-1.5 rounded-lg border border-[#F5CBCB] font-handwriting text-lg text-[#4A353B]"
                        />
                      ) : (
                        <div
                          onClick={() => setEditingCaptionId(photo.id)}
                          className="flex items-center justify-between cursor-pointer group/cap"
                        >
                          <p className="text-xs font-handwriting text-[#4A353B] text-lg truncate">
                            {photo.caption || 'Click to add caption...'}
                          </p>
                          <Edit2 className="w-3 h-3 text-[#8F727B] opacity-0 group-hover/cap:opacity-100 transition-opacity" />
                        </div>
                      )}

                      {/* Reorder Left/Right buttons in Creator Mode */}
                      <div className="flex items-center justify-between pt-1 border-t border-[#FBEFEF]">
                        <button
                          disabled={index === 0}
                          onClick={() => onMovePhoto(index, 'left')}
                          className="p-1 rounded bg-[#FFE2E2]/60 hover:bg-[#F5CBCB] disabled:opacity-30 text-[#4A353B] text-[10px] flex items-center gap-0.5"
                          title="Move Left"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>

                        <span className="text-[10px] font-mono text-[#8F727B]">#{index + 1}</span>

                        <button
                          disabled={index === photos.length - 1}
                          onClick={() => onMovePhoto(index, 'right')}
                          className="p-1 rounded bg-[#FFE2E2]/60 hover:bg-[#F5CBCB] disabled:opacity-30 text-[#4A353B] text-[10px] flex items-center gap-0.5"
                          title="Move Right"
                        >
                          <ArrowRightIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-handwriting text-[#4A353B] text-lg">
                        {photo.caption || 'Sweet Moment ❤️'}
                      </p>
                      <Sparkles className="w-3.5 h-3.5 text-[#C5B3D3]" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Persistent "+ Add More Memories 📸" Card in Grid for Creator Mode */}
          {isCreatorMode && (
            <motion.label
              whileHover={{ scale: 1.02 }}
              className="bg-[#FFE2E2]/40 p-6 rounded-2xl border-2 border-dashed border-[#F5CBCB] flex flex-col items-center justify-center text-center cursor-pointer min-h-[240px] group transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-[#FFE2E2] flex items-center justify-center text-[#6E525A] mb-2 group-hover:scale-110 transition-transform shadow-sm">
                <Plus className="w-7 h-7 text-[#C5B3D3]" />
              </div>
              <span className="text-sm font-bold text-[#4A353B]">+ Add More Memories 📸</span>
              <span className="text-xs text-[#8F727B] mt-1">Upload 1, 5, 10 or 20+ photos</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </motion.label>
          )}
        </div>
      </div>

      {/* Lightbox Photo Viewer Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-[#2D2130]/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 rounded-3xl max-w-3xl max-h-[85vh] flex flex-col relative shadow-2xl border border-[#F5CBCB]"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#4A353B]/50 text-white flex items-center justify-center hover:bg-[#4A353B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="rounded-2xl overflow-hidden max-h-[70vh]">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || 'Memory'}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>
              <p className="text-center font-handwriting text-2xl text-[#4A353B] mt-4">
                {selectedPhoto.caption || 'Memories with Vedant ❤️'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={onNext}
          className="py-3.5 px-8 rounded-full btn-palette-primary font-medium text-base shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Continue to Our Fights 😤</span>
          <ArrowRight className="w-5 h-5 text-[#4A353B]" />
        </button>
      </motion.div>
    </div>
  );
};
