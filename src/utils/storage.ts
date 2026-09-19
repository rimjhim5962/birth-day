import type { ExperienceData } from '../types';
import { DEFAULT_EXPERIENCE_DATA } from './defaultData';

const STORAGE_KEY = 'lottychoco_pie_experience_v1';
const AUDIO_DB_NAME = 'lottychoco_audio_db';
const AUDIO_STORE_NAME = 'audio_files';

export const saveExperienceData = (data: ExperienceData): void => {
  try {
    const dataToSave = {
      ...data,
      music1: { ...data.music1, blob: undefined },
      music2: { ...data.music2, blob: undefined },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (e) {
    console.error('Failed to save experience data to localStorage', e);
  }
};

export const loadExperienceData = (): ExperienceData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const savedPhotos = Array.isArray(parsed.photos) ? parsed.photos : [];
      const hasCustomPhotos = savedPhotos.some(
        (photo: { id?: string }) => !String(photo.id || '').startsWith('photo_default_'),
      );
      return {
        ...DEFAULT_EXPERIENCE_DATA,
        ...parsed,
        photos: hasCustomPhotos ? savedPhotos : DEFAULT_EXPERIENCE_DATA.photos,
        music1: { ...DEFAULT_EXPERIENCE_DATA.music1, ...parsed.music1 },
        music2: { ...DEFAULT_EXPERIENCE_DATA.music2, ...parsed.music2 },
      };
    }
  } catch (e) {
    console.error('Failed to load experience data', e);
  }
  return DEFAULT_EXPERIENCE_DATA;
};

const openAudioDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(AUDIO_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(AUDIO_STORE_NAME)) {
        db.createObjectStore(AUDIO_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveAudioBlob = async (key: string, blob: Blob): Promise<void> => {
  try {
    const db = await openAudioDB();
    const tx = db.transaction(AUDIO_STORE_NAME, 'readwrite');
    const store = tx.objectStore(AUDIO_STORE_NAME);
    store.put(blob, key);
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error(`Failed to save audio blob for key ${key}`, err);
  }
};

export const getAudioBlob = async (key: string): Promise<Blob | null> => {
  try {
    const db = await openAudioDB();
    const tx = db.transaction(AUDIO_STORE_NAME, 'readonly');
    const store = tx.objectStore(AUDIO_STORE_NAME);
    const request = store.get(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error(`Failed to retrieve audio blob for key ${key}`, err);
    return null;
  }
};

export const resetStoredData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    indexedDB.deleteDatabase(AUDIO_DB_NAME);
  } catch (e) {
    console.error('Failed to reset storage', e);
  }
};
