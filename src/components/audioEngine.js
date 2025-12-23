// src/utils/audioEngine.js

// =====================================================
// AUDIO STATE (Singleton)
// =====================================================

let audioCtx = null;
let droneOsc = null;
let gainNode = null;
let lfo = null;

// =====================================================
// INIT
// =====================================================

export const initAudio = () => {
  if (audioCtx) return;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();

  // --- DRONE OSCILLATOR (Background Hum) ---
  droneOsc = audioCtx.createOscillator();
  droneOsc.type = "sine";
  droneOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A

  // --- LFO (Breathing / Anxiety Wobble) ---
  lfo = audioCtx.createOscillator();
  lfo.type = "triangle";
  lfo.frequency.setValueAtTime(0.1, audioCtx.currentTime);

  const lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(20, audioCtx.currentTime);

  // --- MASTER GAIN ---
  gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);

  // --- CONNECTION GRAPH ---
  lfo.connect(lfoGain);
  lfoGain.connect(droneOsc.frequency);
  droneOsc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  droneOsc.start();
  lfo.start();
};

// =====================================================
// DRONE MODULATION
// =====================================================

export const updateDrone = (entropyLevel = 0) => {
  if (!audioCtx || !droneOsc || !gainNode || !lfo) return;

  const time = audioCtx.currentTime;

  // Pitch rises with entropy
  const baseFreq = 55 + entropyLevel * 15;
  droneOsc.frequency.cancelScheduledValues(time);
  droneOsc.frequency.linearRampToValueAtTime(baseFreq, time + 2);

  // Volume creeps up
  const volume = Math.min(0.15, 0.05 + entropyLevel * 0.01);
  gainNode.gain.cancelScheduledValues(time);
  gainNode.gain.linearRampToValueAtTime(volume, time + 2);

  // Anxiety wobble
  const wobbleSpeed = 0.1 + entropyLevel * 0.5;
  lfo.frequency.cancelScheduledValues(time);
  lfo.frequency.linearRampToValueAtTime(wobbleSpeed, time + 2);
};

// =====================================================
// ONE-SHOT EFFECTS
// =====================================================

export const playGlitch = () => {
  if (!audioCtx) initAudio();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(
    100 + Math.random() * 700,
    audioCtx.currentTime
  );

  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + 0.1
  );

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
};

export const playWarp = () => {
  if (!audioCtx) initAudio();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(100, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(
    800,
    audioCtx.currentTime + 0.5
  );

  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(
    0,
    audioCtx.currentTime + 0.5
  );

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.5);
};

// =====================================================
// ASCENSION EVENT
// =====================================================

export const playAscension = () => {
  if (!audioCtx) return;

  const time = audioCtx.currentTime;

  // --- FADE OUT CHAOS ---
  if (gainNode && droneOsc) {
    gainNode.gain.cancelScheduledValues(time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 2);

    setTimeout(() => {
      try {
        droneOsc.stop();
      } catch {}
      droneOsc = null;
    }, 2000);
  }

  // --- HEAVENLY CHORD (Cmaj7 + octave) ---
  const frequencies = [261.63, 329.63, 392.0, 493.88, 523.25];

  frequencies.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(
      0.1,
      time + 2 + i * 0.4
    );
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      time + 10
    );

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + 12);
  });
};
