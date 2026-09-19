import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ExperienceData } from '../types';
import { Edit3, X, Heart, Music, Gift, Award, Save, Sparkles } from 'lucide-react';

interface CreatorStudioModalProps {
  data: ExperienceData;
  onSaveData: (updated: ExperienceData) => void;
  onOpenAudioTrimmer: (trackKey: 'music1' | 'music2') => void;
  onClose: () => void;
}

export const CreatorStudioModal: React.FC<CreatorStudioModalProps> = ({
  data,
  onSaveData,
  onOpenAudioTrimmer,
  onClose,
}) => {
  const [formData, setFormData] = useState<ExperienceData>({ ...data });
  const [activeTab, setActiveTab] = useState<'general' | 'letter' | 'care' | 'gifts' | 'final'>('general');

  const handleChangeField = (field: keyof ExperienceData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCareChange = (index: number, key: 'title' | 'message', val: string) => {
    const updated = [...formData.careMessages];
    updated[index] = { ...updated[index], [key]: val };
    setFormData((prev) => ({ ...prev, careMessages: updated }));
  };

  const handleGiftChange = (index: number, key: 'title' | 'message', val: string) => {
    const updated = [...formData.gifts];
    updated[index] = { ...updated[index], [key]: val };
    setFormData((prev) => ({ ...prev, gifts: updated }));
  };

  const handleSave = () => {
    onSaveData(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2130]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-card max-w-3xl w-full max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#F5CBCB] flex flex-col overflow-hidden"
      >
        <div className="p-4 sm:p-6 bg-[#FBEFEF] border-b border-[#F5CBCB]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-[#6E525A]" />
            <h3 className="font-serif-romantic text-xl font-bold text-[#4A353B]">
              Creator Customization Studio
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFE2E2] text-[#4A353B] flex items-center justify-center hover:bg-[#F5CBCB] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex border-b border-[#F5CBCB]/50 overflow-x-auto p-2 bg-[#FBEFEF]/50 gap-1">
          {[
            { id: 'general', label: 'Basic Info', icon: <Heart className="w-3.5 h-3.5" /> },
            { id: 'letter', label: 'Birthday Note', icon: <Edit3 className="w-3.5 h-3.5" /> },
            { id: 'care', label: 'Care Cards', icon: <Award className="w-3.5 h-3.5" /> },
            { id: 'gifts', label: 'Gifts', icon: <Gift className="w-3.5 h-3.5" /> },
            { id: 'final', label: 'Final Reveal', icon: <Sparkles className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#F5CBCB] text-[#4A353B] shadow-sm font-bold border border-[#F5CBCB]'
                  : 'text-[#6E525A] hover:bg-[#FFE2E2]/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-[#4A353B] font-sans">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="font-semibold block mb-1">Recipient Full Name</label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) => handleChangeField('recipientName', e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#F5CBCB] focus:outline-none focus:ring-2 focus:ring-[#C5B3D3] bg-white"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Nickname (e.g. Lottychoco Pie)</label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleChangeField('nickname', e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#F5CBCB] focus:outline-none focus:ring-2 focus:ring-[#C5B3D3] bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Date of Birth</label>
                  <input
                    type="text"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChangeField('dateOfBirth', e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#F5CBCB] focus:outline-none focus:ring-2 focus:ring-[#C5B3D3] bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Formatted DOB</label>
                  <input
                    type="text"
                    value={formData.formattedDob}
                    onChange={(e) => handleChangeField('formattedDob', e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#F5CBCB] focus:outline-none focus:ring-2 focus:ring-[#C5B3D3] bg-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#F5CBCB]/40 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onOpenAudioTrimmer('music1')}
                  className="py-2.5 px-4 rounded-xl bg-[#FFE2E2] hover:bg-[#F5CBCB] text-[#4A353B] font-semibold flex items-center gap-2 transition-colors border border-[#F5CBCB]"
                >
                  <Music className="w-4 h-4 text-[#6E525A]" />
                  <span>Configure Music 1 (Intro Track)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAudioTrimmer('music2')}
                  className="py-2.5 px-4 rounded-xl bg-[#FFE2E2] hover:bg-[#F5CBCB] text-[#4A353B] font-semibold flex items-center gap-2 transition-colors border border-[#F5CBCB]"
                >
                  <Music className="w-4 h-4 text-[#6E525A]" />
                  <span>Configure Music 2 (Final Track)</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="font-semibold block mb-1">Secret Letter Message</label>
                <textarea
                  rows={8}
                  value={formData.birthdayLetter}
                  onChange={(e) => handleChangeField('birthdayLetter', e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#F5CBCB] focus:outline-none focus:ring-2 focus:ring-[#C5B3D3] bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-4">
              {formData.careMessages.map((card, idx) => (
                <div key={card.id} className="p-4 rounded-2xl bg-[#FFE2E2]/40 border border-[#F5CBCB] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#F5CBCB] text-[#4A353B] flex items-center justify-center text-xs font-bold border border-[#F5CBCB]">
                      {card.numberStr}
                    </span>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleCareChange(idx, 'title', e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#F5CBCB] font-semibold bg-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={card.message}
                    onChange={(e) => handleCareChange(idx, 'message', e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#F5CBCB] bg-white"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gifts' && (
            <div className="space-y-4">
              {formData.gifts.map((gift, idx) => (
                <div key={gift.id} className="p-4 rounded-2xl bg-[#FFE2E2]/40 border border-[#F5CBCB] space-y-2">
                  <span className="text-xs uppercase font-bold text-[#8F727B]">{gift.subtitle}</span>
                  <input
                    type="text"
                    value={gift.title}
                    onChange={(e) => handleGiftChange(idx, 'title', e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#F5CBCB] font-semibold bg-white"
                  />
                  <textarea
                    rows={3}
                    value={gift.message}
                    onChange={(e) => handleGiftChange(idx, 'message', e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#F5CBCB] bg-white"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'final' && (
            <div className="space-y-4">
              <div>
                <label className="font-semibold block mb-1">Creator Signature</label>
                <input
                  type="text"
                  value={formData.creatorSignature}
                  onChange={(e) => handleChangeField('creatorSignature', e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#F5CBCB] bg-white"
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#FBEFEF] border-t border-[#F5CBCB]/60 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-[#FFE2E2] text-[#4A353B] font-medium hover:bg-[#F5CBCB] transition-colors border border-[#F5CBCB]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-2.5 px-6 rounded-xl btn-palette-primary font-medium shadow-md flex items-center gap-1.5"
          >
            <Save className="w-4 h-4 text-[#4A353B]" />
            <span>Save Customizations</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
