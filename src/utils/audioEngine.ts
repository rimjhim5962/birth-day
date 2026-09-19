// Web Audio API & HTML5 Audio Engine for background music, trimming & crossfading

class AudioEngine {
  private audioContext: AudioContext | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private music1Element: HTMLAudioElement | null = null;
  private music2Element: HTMLAudioElement | null = null;
  private activeTrack: 'music1' | 'music2' | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.8;
  private synthNodes: { osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null = null;
  private checkInterval: number | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  public initTracks(music1Url?: string, music2Url?: string) {
    if (music1Url) {
      this.music1Element = new Audio(music1Url);
      this.music1Element.loop = true;
    }
    if (music2Url) {
      this.music2Element = new Audio(music2Url);
      this.music2Element.loop = true;
    }
  }

  public getActiveTrack(): 'music1' | 'music2' | null {
    return this.activeTrack;
  }

  public playTrack(
    trackType: 'music1' | 'music2',
    url?: string,
    startTime: number = 0,
    endTime?: number,
    volume: number = 0.8
  ) {
    this.masterVolume = volume;
    this.activeTrack = trackType;

    // Stop synth if playing
    this.stopSynth();

    // If custom URL provided or track element exists
    if (url || (trackType === 'music1' && this.music1Element) || (trackType === 'music2' && this.music2Element)) {
      const targetElement = url 
        ? new Audio(url)
        : (trackType === 'music1' ? this.music1Element : this.music2Element);

      if (!targetElement) {
        this.playDreamySynth();
        return;
      }

      if (trackType === 'music1') this.music1Element = targetElement;
      if (trackType === 'music2') this.music2Element = targetElement;

      // Stop previous
      if (this.currentAudioElement && this.currentAudioElement !== targetElement) {
        this.currentAudioElement.pause();
      }

      this.currentAudioElement = targetElement;
      this.currentAudioElement.volume = this.isMuted ? 0 : this.masterVolume;
      this.currentAudioElement.currentTime = startTime;

      // Monitor end time for trimming
      if (this.checkInterval) clearInterval(this.checkInterval);
      if (endTime && endTime > startTime) {
        this.checkInterval = window.setInterval(() => {
          if (this.currentAudioElement && this.currentAudioElement.currentTime >= endTime) {
            this.currentAudioElement.currentTime = startTime;
          }
        }, 200);
      }

      this.currentAudioElement.play().catch(err => {
        console.warn('Audio play request interrupted or blocked by autoplay policy:', err);
        this.playDreamySynth();
      });
    } else {
      this.playDreamySynth();
    }
  }

  public crossfadeTo(
    nextTrack: 'music2',
    nextUrl?: string,
    startTime: number = 0,
    durationMs: number = 3000
  ) {
    if (this.currentAudioElement) {
      const oldElement = this.currentAudioElement;
      const startVol = oldElement.volume;
      const steps = 30;
      const stepTime = durationMs / steps;
      let currentStep = 0;

      const fadeInterval = setInterval(() => {
        currentStep++;
        const factor = 1 - currentStep / steps;
        if (factor > 0) {
          oldElement.volume = Math.max(0, startVol * factor);
        } else {
          oldElement.pause();
          clearInterval(fadeInterval);
        }
      }, stepTime);
    }

    setTimeout(() => {
      this.playTrack(nextTrack, nextUrl, startTime, undefined, this.masterVolume);
    }, 500);
  }

  public pause() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
    }
    this.stopSynth();
  }

  public resume() {
    if (this.currentAudioElement) {
      this.currentAudioElement.play().catch(() => this.playDreamySynth());
    } else {
      this.playDreamySynth();
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.currentAudioElement) {
      this.currentAudioElement.volume = this.isMuted ? 0 : this.masterVolume;
    }
    if (this.synthNodes) {
      this.synthNodes.gain.gain.setTargetAtTime(this.isMuted ? 0 : this.masterVolume * 0.15, this.getAudioContext().currentTime, 0.1);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setVolume(this.masterVolume);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private playDreamySynth() {
    try {
      const ctx = this.getAudioContext();
      if (this.synthNodes) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(174.61, ctx.currentTime);
      osc2.frequency.setValueAtTime(220.00, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(this.isMuted ? 0 : this.masterVolume * 0.12, ctx.currentTime + 2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      this.synthNodes = { osc1, osc2, gain };
    } catch (e) {
      console.warn('Synth playback error:', e);
    }
  }

  private stopSynth() {
    if (this.synthNodes) {
      try {
        const ctx = this.getAudioContext();
        this.synthNodes.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        setTimeout(() => {
          this.synthNodes?.osc1.stop();
          this.synthNodes?.osc2.stop();
          this.synthNodes = null;
        }, 500);
      } catch (e) {
        this.synthNodes = null;
      }
    }
  }
}

export const audioEngine = new AudioEngine();
