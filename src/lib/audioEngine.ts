// Warm acoustic marimba & soft harp Web Audio API engine
// Properly unlocks audio on iOS Safari & Android Chrome on first user gesture.

class AdventureAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private muted: boolean = false;
  private unlocked: boolean = false;
  private bgmInterval: number | null = null;
  private step = 0;

  // Cozy F-major / D-minor acoustic storybook melody (frequencies in Hz, 0 = rest)
  private readonly melody: number[] = [
    349.23, 440.0, 523.25, 0, 587.33, 523.25, 440.0, 392.0,
    349.23, 392.0, 440.0, 523.25, 440.0, 0, 392.0, 0,
    329.63, 392.0, 440.0, 523.25, 587.33, 0, 523.25, 440.0,
    392.0, 440.0, 349.23, 0, 293.66, 349.23, 440.0, 0,
  ];

  // Warm acoustic plucked bass progression (F -> C -> Dm -> Bb -> C)
  private readonly bass: number[] = [
    174.61, 0, 0, 0, 130.81, 0, 0, 0,
    146.83, 0, 0, 0, 116.54, 0, 130.81, 0,
    174.61, 0, 0, 0, 146.83, 0, 0, 0,
    116.54, 0, 130.81, 0, 174.61, 0, 0, 0,
  ];

  // Soft accompanying arpeggio harmony
  private readonly harmony: number[] = [
    0, 0, 261.63, 0, 0, 0, 261.63, 0,
    0, 0, 293.66, 0, 0, 233.08, 0, 261.63,
    0, 0, 261.63, 0, 0, 293.66, 0, 0,
    0, 233.08, 0, 261.63, 0, 0, 261.63, 0,
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.muted = localStorage.getItem('mila_muted') === '1';
      } catch {
        this.muted = false;
      }
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public unlock(): void {
    if (typeof window === 'undefined') return;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.muted ? 0 : 1;
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = 0.24;
      this.bgmGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.65;
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    // iOS Safari silent buffer unlock trick
    if (!this.unlocked && this.ctx) {
      try {
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);
        this.unlocked = true;
      } catch {
        // ignore
      }
    }

    this.startBgmLoop();
  }

  public setMuted(mute: boolean): void {
    this.muted = mute;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mila_muted', mute ? '1' : '0');
      } catch {
        // ignore storage restrictions
      }
    }
    if (!mute) {
      this.unlock();
    }
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(mute ? 0 : 1, now, 0.03);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  private startBgmLoop(): void {
    if (this.bgmInterval !== null || typeof window === 'undefined') return;
    this.bgmInterval = window.setInterval(() => {
      if (this.muted || !this.ctx || this.ctx.state !== 'running') return;
      const idx = this.step % this.melody.length;
      const m = this.melody[idx];
      const b = this.bass[idx];
      const h = this.harmony[idx];

      if (m > 0) {
        this.playMarimbaNote(m, 0.48, 0.16, this.bgmGain!);
      }
      if (b > 0) {
        this.playWarmPluck(b, 0.95, 0.22, this.bgmGain!);
      }
      if (h > 0) {
        this.playMarimbaNote(h, 0.52, 0.08, this.bgmGain!);
      }

      this.step++;
    }, 360);
  }

  /** Soft wooden marimba sound: fundamental sine + gentle 2nd/4th harmonic decay through lowpass */
  private playMarimbaNote(
    freq: number,
    duration: number,
    volume: number,
    destination: AudioNode,
    delay = 0,
  ): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + delay;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 4.5, 2800), t);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.4, 420), t + duration);

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, t);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, t);

    const gain1 = this.ctx.createGain();
    gain1.gain.setValueAtTime(0.0001, t);
    gain1.gain.linearRampToValueAtTime(volume, t + 0.012);
    gain1.gain.exponentialRampToValueAtTime(0.0006, t + duration);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.0001, t);
    gain2.gain.linearRampToValueAtTime(volume * 0.22, t + 0.008);
    gain2.gain.exponentialRampToValueAtTime(0.0005, t + duration * 0.45);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + duration + 0.03);
    osc2.stop(t + duration + 0.03);
  }

  /** Warm acoustic harp/bass pluck */
  private playWarmPluck(
    freq: number,
    duration: number,
    volume: number,
    destination: AudioNode,
    delay = 0,
  ): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + delay;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, t);
    filter.frequency.exponentialRampToValueAtTime(260, t + duration);

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0006, t + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(t);
    osc.stop(t + duration + 0.04);
  }

  /** Subtle UI tap click */
  public playTap(): void {
    this.unlock();
    if (this.muted || !this.ctx || !this.sfxGain) return;
    this.playMarimbaNote(587.33, 0.11, 0.14, this.sfxGain);
  }

  /** Crisp melodic crystalline chime when finding a hidden item */
  public playFound(comboIndex = 0): void {
    this.unlock();
    if (this.muted || !this.ctx || !this.sfxGain) return;
    const shift = Math.min(comboIndex, 5) * 0.04;
    const mult = 1 + shift;
    this.playMarimbaNote(523.25 * mult, 0.24, 0.26, this.sfxGain, 0);
    this.playMarimbaNote(659.25 * mult, 0.28, 0.26, this.sfxGain, 0.075);
    this.playMarimbaNote(783.99 * mult, 0.36, 0.28, this.sfxGain, 0.15);
    this.playMarimbaNote(1046.5 * mult, 0.52, 0.22, this.sfxGain, 0.22);
  }

  /** Soft muted wooden thud on miss-click */
  public playMiss(): void {
    this.unlock();
    if (this.muted || !this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, t);

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(145, t);
    osc.frequency.exponentialRampToValueAtTime(72, t + 0.13);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.24, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  /** Magical shimmering arpeggio for Hints */
  public playHint(): void {
    this.unlock();
    if (this.muted || !this.ctx || !this.sfxGain) return;
    const notes = [587.33, 698.46, 880.0, 1046.5, 1396.91];
    notes.forEach((freq, i) => {
      this.playMarimbaNote(freq, 0.45, 0.18, this.sfxGain!, i * 0.065);
    });
  }

  /** Festive warm celebratory chord fanfare on Victory */
  public playVictory(): void {
    this.unlock();
    if (this.muted || !this.ctx || !this.sfxGain) return;
    const sequence = [
      { f: 349.23, d: 0.0 },
      { f: 440.0, d: 0.09 },
      { f: 523.25, d: 0.18 },
      { f: 698.46, d: 0.28 },
      // Warm final Fmaj9 celebratory chord
      { f: 349.23, d: 0.44 },
      { f: 440.0, d: 0.46 },
      { f: 523.25, d: 0.48 },
      { f: 659.25, d: 0.5 },
      { f: 783.99, d: 0.52 },
      { f: 1046.5, d: 0.56 },
    ];
    for (const n of sequence) {
      this.playMarimbaNote(n.f, 0.85, 0.22, this.sfxGain, n.d);
    }
  }
}

export const audioEngine = new AdventureAudioEngine();
