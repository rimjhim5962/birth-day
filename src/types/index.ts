export interface PhotoItem {
  id: string;
  url: string;
  caption?: string;
  originalUrl?: string;
  crop?: {
    x: number;
    y: number;
    zoom: number;
    rotation: number;
    aspectRatio: number;
  };
}

export interface GiftItem {
  id: number;
  title: string;
  subtitle: string;
  message: string;
  image?: string;
  animationType: 'glowing' | 'ribbon' | 'particles' | 'cardPopup';
  isOpened?: boolean;
}

export interface CareMessage {
  id: number;
  numberStr: string;
  title: string;
  message: string;
}

export interface AudioTrack {
  id: string;
  name: string;
  url?: string;
  blob?: Blob;
  startTime: number;
  endTime: number;
  duration: number;
  volume: number;
}

export interface ExperienceData {
  recipientName: string;
  nickname: string;
  dateOfBirth: string;
  formattedDob: string;
  introGreeting: string;
  introSubtext: string;
  birthdayLetter: string;
  fightQuestion: string;
  fightOptions: string[];
  fightReconciliationIntro: string;
  fightReconciliationBody: string;
  fightReconciliationOutro: string;
  careMessages: CareMessage[];
  gifts: GiftItem[];
  finalRomanticLines: string[];
  finalLikesLines: string[];
  finalClosingLine: string;
  creatorSignature: string;
  photos: PhotoItem[];
  music1: AudioTrack;
  music2: AudioTrack;
}

export type SectionPhase = 
  | 'intro'
  | 'reveal'
  | 'letter'
  | 'memories'
  | 'fights'
  | 'care'
  | 'gifts'
  | 'final'
  | 'end';

export type AppMode = 'recipient' | 'creator';
