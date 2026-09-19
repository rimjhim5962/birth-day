import { useState, useEffect } from 'react';
import type { SectionPhase, ExperienceData, PhotoItem, AudioTrack } from './types';
import { DEFAULT_EXPERIENCE_DATA } from './utils/defaultData';
import { loadExperienceData, saveExperienceData, saveAudioBlob, getAudioBlob, resetStoredData } from './utils/storage';
import { audioEngine } from './utils/audioEngine';

import { ParticleBackground } from './components/ParticleBackground';
import { FloatingNavbar } from './components/FloatingNavbar';
import { MusicController } from './components/MusicController';

import { IntroLetter } from './components/IntroLetter';
import { BirthdayReveal } from './components/BirthdayReveal';
import { BirthdayLetter } from './components/BirthdayLetter';
import { MemoryGallery } from './components/MemoryGallery';
import { FightSection } from './components/FightSection';
import { CareSection } from './components/CareSection';
import { GiftSection } from './components/GiftSection';
import { FinalReveal } from './components/FinalReveal';
import { EndScreen } from './components/EndScreen';

import { ImageCropperModal } from './components/ImageCropperModal';
import { AudioTrimmerModal } from './components/AudioTrimmerModal';
import { CreatorStudioModal } from './components/CreatorStudioModal';
import { Edit3, Check } from 'lucide-react';

export function App() {
  const [data, setData] = useState<ExperienceData>(() => loadExperienceData());
  const [currentPhase, setCurrentPhase] = useState<SectionPhase>('intro');
  const [activeMusicTrack, setActiveMusicTrack] = useState<'music1' | 'music2'>('music1');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMutedMusic, setIsMutedMusic] = useState(false);

  // Detect mode: Recipient (default /) vs Creator mode (/edit or ?mode=edit)
  const [isCreatorMode, setIsCreatorMode] = useState<boolean>(() => {
    return window.location.search.includes('mode=edit') || window.location.pathname === '/edit';
  });

  // Modals state
  const [cropPhotoTarget, setCropPhotoTarget] = useState<PhotoItem | null>(null);
  const [trimmerTargetTrack, setTrimmerTargetTrack] = useState<'music1' | 'music2' | null>(null);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Restore audio blobs from IndexedDB if available
  useEffect(() => {
    const restoreAudio = async () => {
      const b1 = await getAudioBlob('music1_blob');
      const b2 = await getAudioBlob('music2_blob');
      if (b1) {
        const u1 = URL.createObjectURL(b1);
        setData((prev) => ({ ...prev, music1: { ...prev.music1, url: u1, blob: b1 } }));
      }
      if (b2) {
        const u2 = URL.createObjectURL(b2);
        setData((prev) => ({ ...prev, music2: { ...prev.music2, url: u2, blob: b2 } }));
      }
    };
    restoreAudio();
  }, []);

  const updateData = (newData: ExperienceData) => {
    setData(newData);
    saveExperienceData(newData);
  };

  const handleNavigatePhase = (nextPhase: SectionPhase) => {
    setCurrentPhase(nextPhase);

    if (nextPhase === 'final' && activeMusicTrack === 'music1') {
      setActiveMusicTrack('music2');
      audioEngine.crossfadeTo(
        'music2',
        data.music2.url,
        data.music2.startTime,
        3000
      );
    }
  };

  const handleOpenEnvelope = () => {
    setIsPlayingMusic(true);
    audioEngine.playTrack(
      'music1',
      data.music1.url,
      data.music1.startTime,
      data.music1.endTime,
      data.music1.volume
    );
    handleNavigatePhase('reveal');
  };

  const handleTogglePlayMusic = () => {
    if (isPlayingMusic) {
      audioEngine.pause();
      setIsPlayingMusic(false);
    } else {
      audioEngine.resume();
      setIsPlayingMusic(true);
    }
  };

  const handleToggleMuteMusic = () => {
    const muted = audioEngine.toggleMute();
    setIsMutedMusic(muted);
  };

  const handleVolumeChange = (vol: number) => {
    audioEngine.setVolume(vol);
    const trackKey = activeMusicTrack;
    updateData({
      ...data,
      [trackKey]: { ...data[trackKey], volume: vol },
    });
  };

  // Convert uploaded files to base64 Data URLs and APPEND to existing photos array
  const handleUploadPhotos = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    let loadedCount = 0;
    const newPhotos: PhotoItem[] = [];

    fileArray.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        newPhotos.push({
          id: `photo_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 7)}`,
          url: url || URL.createObjectURL(file),
          originalUrl: url || URL.createObjectURL(file),
          caption: file.name.replace(/\.[^/.]+$/, ''),
        });
        loadedCount++;

        if (loadedCount === fileArray.length) {
          setData((prev) => {
            const updatedPhotos = [...prev.photos, ...newPhotos];
            const updatedData = { ...prev, photos: updatedPhotos };
            saveExperienceData(updatedData);
            return updatedData;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleReplacePhoto = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setData((prev) => {
        const updatedPhotos = prev.photos.map((p) =>
          p.id === id ? { ...p, url, originalUrl: url } : p
        );
        const updatedData = { ...prev, photos: updatedPhotos };
        saveExperienceData(updatedData);
        return updatedData;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUpdatePhotoCaption = (id: string, caption: string) => {
    setData((prev) => {
      const updatedPhotos = prev.photos.map((p) => (p.id === id ? { ...p, caption } : p));
      const updatedData = { ...prev, photos: updatedPhotos };
      saveExperienceData(updatedData);
      return updatedData;
    });
  };

  const handleMovePhoto = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.photos.length) return;

    setData((prev) => {
      const newPhotos = [...prev.photos];
      const temp = newPhotos[index];
      newPhotos[index] = newPhotos[targetIndex];
      newPhotos[targetIndex] = temp;
      const updatedData = { ...prev, photos: newPhotos };
      saveExperienceData(updatedData);
      return updatedData;
    });
  };

  const handleDeletePhoto = (id: string) => {
    updateData({
      ...data,
      photos: data.photos.filter((p) => p.id !== id),
    });
  };

  const handleSaveCrop = (photoId: string, croppedUrl: string) => {
    updateData({
      ...data,
      photos: data.photos.map((p) => (p.id === photoId ? { ...p, url: croppedUrl } : p)),
    });
  };

  const handleSaveAudioTrack = async (
    trackKey: 'music1' | 'music2',
    updatedTrack: AudioTrack,
    blob?: Blob
  ) => {
    if (blob) {
      await saveAudioBlob(`${trackKey}_blob`, blob);
    }
    updateData({
      ...data,
      [trackKey]: updatedTrack,
    });
  };

  const handleResetExperience = () => {
    if (confirm('Reset custom uploaded photos, music, and messages to defaults?')) {
      resetStoredData();
      setData(DEFAULT_EXPERIENCE_DATA);
      setCurrentPhase('intro');
    }
  };

  const handleSaveBirthdayExperience = () => {
    saveExperienceData(data);
    alert(`Birthday Experience Saved Successfully! ❤️\n\nTotal Photos in Gallery: ${data.photos.length}\nVedant will now see all your photos and messages when opening the link.`);
    window.history.pushState({}, '', '/');
    setIsCreatorMode(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      <ParticleBackground theme={currentPhase === 'final' ? 'nightSky' : 'romantic'} />

      <FloatingNavbar
        currentPhase={currentPhase}
        onNavigate={handleNavigatePhase}
        onOpenStudio={() => setIsStudioOpen(true)}
        isCreatorMode={isCreatorMode}
      />

      {isCreatorMode && (
        <div className="fixed top-2 left-2 z-50 flex items-center gap-2">
          <div className="bg-[#FFE2E2] border border-[#F5CBCB] px-3 py-1.5 rounded-full text-xs font-semibold text-[#4A353B] shadow-md flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-[#6E525A]" />
            <span>CREATOR MODE</span>
          </div>

          <button
            onClick={handleSaveBirthdayExperience}
            className="bg-[#F5CBCB] hover:bg-[#C5B3D3] text-[#4A353B] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-1 cursor-pointer border border-[#F5CBCB]"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Birthday Experience ❤️ ({data.photos.length} Photos)</span>
          </button>
        </div>
      )}

      <MusicController
        currentTrack={activeMusicTrack}
        trackData={activeMusicTrack === 'music1' ? data.music1 : data.music2}
        isPlaying={isPlayingMusic}
        onTogglePlay={handleTogglePlayMusic}
        onToggleMute={handleToggleMuteMusic}
        isMuted={isMutedMusic}
        onVolumeChange={handleVolumeChange}
        onOpenTrimmer={(track) => setTrimmerTargetTrack(track)}
        isCreatorMode={isCreatorMode}
      />

      <main className="relative z-10">
        {currentPhase === 'intro' && (
          <IntroLetter
            greeting={data.introGreeting}
            subtext={data.introSubtext}
            onOpen={handleOpenEnvelope}
            onOpenMusicUpload={() => setTrimmerTargetTrack('music1')}
            isCreatorMode={isCreatorMode}
          />
        )}

        {currentPhase === 'reveal' && (
          <BirthdayReveal
            name={data.recipientName}
            dob={data.formattedDob}
            onNext={() => handleNavigatePhase('letter')}
          />
        )}

        {currentPhase === 'letter' && (
          <BirthdayLetter
            letterText={data.birthdayLetter}
            nickname={data.nickname}
            onNext={() => handleNavigatePhase('memories')}
          />
        )}

        {currentPhase === 'memories' && (
          <MemoryGallery
            photos={data.photos}
            onUploadPhotos={handleUploadPhotos}
            onDeletePhoto={handleDeletePhoto}
            onReplacePhoto={handleReplacePhoto}
            onUpdateCaption={handleUpdatePhotoCaption}
            onMovePhoto={handleMovePhoto}
            onOpenCrop={(photo) => setCropPhotoTarget(photo)}
            onNext={() => handleNavigatePhase('fights')}
            isCreatorMode={isCreatorMode}
          />
        )}

        {currentPhase === 'fights' && (
          <FightSection
            question={data.fightQuestion}
            options={data.fightOptions}
            introText={data.fightReconciliationIntro}
            bodyText={data.fightReconciliationBody}
            outroText={data.fightReconciliationOutro}
            onNext={() => handleNavigatePhase('care')}
          />
        )}

        {currentPhase === 'care' && (
          <CareSection
            careMessages={data.careMessages}
            onNext={() => handleNavigatePhase('gifts')}
          />
        )}

        {currentPhase === 'gifts' && (
          <GiftSection
            gifts={data.gifts}
            onOpenGift={(id) => {
              const updated = data.gifts.map((g) => (g.id === id ? { ...g, isOpened: true } : g));
              updateData({ ...data, gifts: updated });
            }}
            onNext={() => handleNavigatePhase('final')}
          />
        )}

        {currentPhase === 'final' && (
          <FinalReveal
            nickname={data.nickname}
            dob={data.formattedDob}
            romanticLines={data.finalRomanticLines}
            likesLines={data.finalLikesLines}
            closingLine={data.finalClosingLine}
            onNext={() => handleNavigatePhase('end')}
            onOpenMusicUpload={() => setTrimmerTargetTrack('music2')}
            isCreatorMode={isCreatorMode}
          />
        )}

        {currentPhase === 'end' && (
          <EndScreen
            signatureText={data.creatorSignature}
            onReplay={() => handleNavigatePhase('intro')}
            onReset={handleResetExperience}
            onOpenStudio={() => setIsStudioOpen(true)}
            isCreatorMode={isCreatorMode}
          />
        )}
      </main>

      {cropPhotoTarget && (
        <ImageCropperModal
          photo={cropPhotoTarget}
          onSaveCrop={handleSaveCrop}
          onClose={() => setCropPhotoTarget(null)}
        />
      )}

      {trimmerTargetTrack && (
        <AudioTrimmerModal
          trackKey={trimmerTargetTrack}
          trackData={data[trimmerTargetTrack]}
          onSaveTrack={handleSaveAudioTrack}
          onClose={() => setTrimmerTargetTrack(null)}
        />
      )}

      {isStudioOpen && (
        <CreatorStudioModal
          data={data}
          onSaveData={updateData}
          onOpenAudioTrimmer={(t) => setTrimmerTargetTrack(t)}
          onClose={() => setIsStudioOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
