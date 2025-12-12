// ============================================
// VIOLIN SYNTHESIS ENGINE v2.0 - VIRTUOSO EDITION
// "Swiatlo w Ciemnosci" - Extreme Performance
// ============================================

import { sections, fullComposition, TOTAL_BEATS } from './composition.js';

let audioCtx = null;
let masterGain = null;
let reverbNode = null;
let analyser = null;
let analyserSpectrum = null;
let isPlaying = false;
let tempo = 103;
let reverbAmount = 0.7;
let brightness = 0.65;
let vibratoIntensity = 0.75;
let rosinAmount = 0.5;

let schedulerTimer = null;
let currentBeat = 0;
let nextNoteTime = 0;

const LOOKAHEAD = 0.15;
const SCHEDULE_INTERVAL = 20;

const noteFrequencies = {
    'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23,
    'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46,
    'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
    'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51, 'F6': 1396.91,
    'F#6': 1479.98, 'G6': 1567.98, 'G#6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53,
    'C7': 2093.00
};

// ============================================
// ADVANCED VIOLIN SYNTHESIS
// ============================================

function playViolinAt(frequency, velocity, duration, when, technique = 'legato') {
    if (!audioCtx) return;

    const secondsPerBeat = 60.0 / tempo;
    const actualDuration = duration * secondsPerBeat;

    // Get technique-specific parameters
    const params = getTechniqueParams(technique, velocity, frequency);

    // Special techniques that need different handling
    if (technique === 'pizzicato') {
        playPizzicato(frequency, velocity, actualDuration, when);
        return;
    }
    if (technique === 'harmonic') {
        playHarmonic(frequency, velocity, actualDuration, when);
        return;
    }
    if (technique === 'col_legno') {
        playColLegno(frequency, velocity, actualDuration, when);
        return;
    }
    if (technique === 'trill') {
        playTrill(frequency, velocity, actualDuration, when);
        return;
    }

    // Main output node for this note
    const noteGain = audioCtx.createGain();

    // ==========================================
    // HARMONIC GENERATION - Rich violin timbre
    // ==========================================
    const numHarmonics = Math.min(20, Math.floor(12000 / frequency));

    for (let n = 1; n <= numHarmonics; n++) {
        const osc = audioCtx.createOscillator();
        const harmGain = audioCtx.createGain();

        // Slight inharmonicity for realism
        const inharmonicity = 1 + (0.00002 * n * n);
        osc.frequency.value = frequency * n * inharmonicity;

        // Violin harmonic structure (sawtooth-like but modified)
        let amp = velocity * params.baseAmp / Math.pow(n, params.harmonicRolloff);

        // Violin has strong odd harmonics
        if (n % 2 === 1) amp *= 1.15;
        // Formants around 1kHz and 3kHz
        const freq = frequency * n;
        if (freq > 800 && freq < 1200) amp *= 1.3;
        if (freq > 2500 && freq < 3500) amp *= 1.2;

        // Random variation
        amp *= 0.88 + Math.random() * 0.24;

        // === VIBRATO ===
        if (params.vibrato && vibratoIntensity > 0) {
            const vibrato = audioCtx.createOscillator();
            const vibratoGain = audioCtx.createGain();
            vibrato.type = 'sine';

            // Vibrato rate varies with intensity
            vibrato.frequency.value = params.vibratoRate + Math.random() * 1;

            // Delayed onset vibrato
            const vibratoDepth = params.vibratoDepth * vibratoIntensity * (frequency / 440);
            vibratoGain.gain.setValueAtTime(0, when);
            vibratoGain.gain.linearRampToValueAtTime(
                vibratoDepth * 0.3,
                when + Math.min(params.vibratoDelay, actualDuration * 0.15)
            );
            vibratoGain.gain.linearRampToValueAtTime(
                vibratoDepth,
                when + Math.min(params.vibratoDelay * 2, actualDuration * 0.4)
            );

            vibrato.connect(vibratoGain);
            vibratoGain.connect(osc.frequency);
            vibrato.start(when);
            vibrato.stop(when + actualDuration + 1);
        }

        // Micro-detuning for each harmonic
        osc.detune.value = (Math.random() - 0.5) * 10;

        // Slow random drift (like finger movement)
        const drift = audioCtx.createOscillator();
        const driftGain = audioCtx.createGain();
        drift.type = 'sine';
        drift.frequency.value = 0.15 + Math.random() * 0.35;
        driftGain.gain.value = 2 + Math.random() * 3;
        drift.connect(driftGain);
        driftGain.connect(osc.detune);
        drift.start(when);
        drift.stop(when + actualDuration + 1);

        // === ENVELOPE based on technique ===
        harmGain.gain.setValueAtTime(0, when);

        const attackTime = params.attack;
        const decayTime = params.decay;
        const sustainLevel = params.sustain * amp;
        const releaseTime = params.release;

        // Attack shape varies by technique
        if (params.attackShape === 'bow') {
            // Gradual bow start
            harmGain.gain.linearRampToValueAtTime(amp * 0.4, when + attackTime * 0.3);
            harmGain.gain.linearRampToValueAtTime(amp, when + attackTime);
        } else if (params.attackShape === 'accent') {
            // Strong initial accent
            harmGain.gain.linearRampToValueAtTime(amp * 1.3, when + attackTime * 0.3);
            harmGain.gain.setTargetAtTime(amp, when + attackTime * 0.4, attackTime * 0.3);
        } else if (params.attackShape === 'sfz') {
            // Sforzando - explosive
            harmGain.gain.linearRampToValueAtTime(amp * 1.6, when + 0.008);
            harmGain.gain.setTargetAtTime(amp * 1.1, when + 0.015, 0.02);
        } else if (params.attackShape === 'spiccato') {
            // Bouncing bow
            harmGain.gain.linearRampToValueAtTime(amp * 1.2, when + 0.01);
            harmGain.gain.setTargetAtTime(amp * 0.3, when + 0.03, 0.02);
        } else if (params.attackShape === 'ricochet') {
            // Multiple bounces implied
            harmGain.gain.linearRampToValueAtTime(amp * 1.1, when + 0.008);
            harmGain.gain.setTargetAtTime(amp * 0.5, when + 0.02, 0.015);
        }

        // Sustain
        harmGain.gain.setTargetAtTime(sustainLevel, when + attackTime + decayTime, decayTime);

        // Release
        harmGain.gain.setTargetAtTime(0.001, when + actualDuration - releaseTime, releaseTime * 0.4);

        osc.connect(harmGain);
        harmGain.connect(noteGain);
        osc.start(when);
        osc.stop(when + actualDuration + 0.5);
    }

    // ==========================================
    // BOW NOISE - Rosin friction
    // ==========================================
    const noiseLen = actualDuration + 0.2;
    const noiseBuf = audioCtx.createBuffer(2, audioCtx.sampleRate * noiseLen, audioCtx.sampleRate);

    for (let ch = 0; ch < 2; ch++) {
        const noiseData = noiseBuf.getChannelData(ch);
        for (let i = 0; i < noiseData.length; i++) {
            // Mix of white and pink noise characteristics
            noiseData[i] = (Math.random() * 2 - 1) * 0.4;
        }
    }

    const noiseSrc = audioCtx.createBufferSource();
    noiseSrc.buffer = noiseBuf;

    // Bow noise filter chain
    const noiseHP = audioCtx.createBiquadFilter();
    noiseHP.type = 'highpass';
    noiseHP.frequency.value = 1500;
    noiseHP.Q.value = 0.5;

    const noiseBP = audioCtx.createBiquadFilter();
    noiseBP.type = 'bandpass';
    noiseBP.frequency.value = 2500 + frequency;
    noiseBP.Q.value = 1.5;

    const noiseGain = audioCtx.createGain();
    const noiseLevel = velocity * params.bowNoise * rosinAmount * 0.04;

    noiseGain.gain.setValueAtTime(0, when);
    noiseGain.gain.linearRampToValueAtTime(noiseLevel * 1.5, when + params.attack * 0.5);
    noiseGain.gain.setTargetAtTime(noiseLevel, when + params.attack, 0.1);
    noiseGain.gain.setTargetAtTime(0.001, when + actualDuration - 0.05, 0.05);

    noiseSrc.connect(noiseHP);
    noiseHP.connect(noiseBP);
    noiseBP.connect(noiseGain);
    noiseGain.connect(noteGain);
    noiseSrc.start(when);
    noiseSrc.stop(when + actualDuration + 0.3);

    // ==========================================
    // TREMOLO effect
    // ==========================================
    if (technique === 'tremolo') {
        const tremolo = audioCtx.createOscillator();
        const tremoloDepth = audioCtx.createGain();
        tremolo.type = 'sine';
        tremolo.frequency.value = 10 + Math.random() * 6; // 10-16 Hz
        tremoloDepth.gain.value = 0.35;

        const tremoloMix = audioCtx.createGain();
        tremoloMix.gain.value = 0.65;

        tremolo.connect(tremoloDepth);
        tremoloDepth.connect(noteGain.gain);
        tremolo.start(when);
        tremolo.stop(when + actualDuration + 0.2);
    }

    // ==========================================
    // BODY RESONANCE - Violin formants
    // ==========================================
    // Main air resonance ~280 Hz
    const bodyFilter1 = audioCtx.createBiquadFilter();
    bodyFilter1.type = 'peaking';
    bodyFilter1.frequency.value = 280;
    bodyFilter1.Q.value = 4;
    bodyFilter1.gain.value = 7;

    // Wood resonance ~460 Hz
    const bodyFilter2 = audioCtx.createBiquadFilter();
    bodyFilter2.type = 'peaking';
    bodyFilter2.frequency.value = 460;
    bodyFilter2.Q.value = 5;
    bodyFilter2.gain.value = 5;

    // Bridge resonance ~2800 Hz
    const bodyFilter3 = audioCtx.createBiquadFilter();
    bodyFilter3.type = 'peaking';
    bodyFilter3.frequency.value = 2800;
    bodyFilter3.Q.value = 3;
    bodyFilter3.gain.value = 4;

    // Sul ponticello boost (near bridge = harsh)
    if (technique === 'sul_ponticello') {
        bodyFilter3.gain.value = 12;
        bodyFilter3.frequency.value = 3500;
    }

    // Sul tasto (over fingerboard = mellow)
    if (technique === 'sul_tasto') {
        bodyFilter3.gain.value = -4;
        bodyFilter1.gain.value = 10;
    }

    // Brightness control
    const brightFilter = audioCtx.createBiquadFilter();
    brightFilter.type = 'highshelf';
    brightFilter.frequency.value = 2500;
    brightFilter.gain.value = -8 + brightness * 16;

    // Final warmth
    const warmthFilter = audioCtx.createBiquadFilter();
    warmthFilter.type = 'lowpass';
    warmthFilter.frequency.value = 5000 + brightness * 5000;
    warmthFilter.Q.value = 0.5;

    // Connect filter chain
    noteGain.connect(bodyFilter1);
    bodyFilter1.connect(bodyFilter2);
    bodyFilter2.connect(bodyFilter3);
    bodyFilter3.connect(brightFilter);
    brightFilter.connect(warmthFilter);
    warmthFilter.connect(masterGain);

    // Reverb send
    if (reverbNode && reverbAmount > 0) {
        const revSend = audioCtx.createGain();
        revSend.gain.value = reverbAmount * 0.55;
        warmthFilter.connect(revSend);
        revSend.connect(reverbNode);
    }

    updateVelocityMeter(velocity);
}

// ============================================
// SPECIAL TECHNIQUES
// ============================================

function playPizzicato(frequency, velocity, duration, when) {
    const noteGain = audioCtx.createGain();

    // Pizzicato uses plucked string model
    const numHarmonics = Math.min(12, Math.floor(6000 / frequency));

    for (let n = 1; n <= numHarmonics; n++) {
        const osc = audioCtx.createOscillator();
        const harmGain = audioCtx.createGain();

        osc.frequency.value = frequency * n;

        let amp = velocity * 0.12 / Math.pow(n, 0.6);
        amp *= 0.85 + Math.random() * 0.3;

        // Very fast attack, quick decay
        harmGain.gain.setValueAtTime(0, when);
        harmGain.gain.linearRampToValueAtTime(amp, when + 0.003);
        harmGain.gain.setTargetAtTime(amp * 0.3, when + 0.01, 0.03);
        harmGain.gain.setTargetAtTime(0.001, when + 0.1, duration * 0.3);

        osc.connect(harmGain);
        harmGain.connect(noteGain);
        osc.start(when);
        osc.stop(when + duration + 0.5);
    }

    // Pluck noise
    const pluckNoise = audioCtx.createBufferSource();
    const pluckBuf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.02, audioCtx.sampleRate);
    const pluckData = pluckBuf.getChannelData(0);
    for (let i = 0; i < pluckData.length; i++) {
        pluckData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (pluckData.length * 0.1));
    }
    pluckNoise.buffer = pluckBuf;

    const pluckFilter = audioCtx.createBiquadFilter();
    pluckFilter.type = 'bandpass';
    pluckFilter.frequency.value = frequency * 3;
    pluckFilter.Q.value = 2;

    const pluckGain = audioCtx.createGain();
    pluckGain.gain.value = velocity * 0.15;

    pluckNoise.connect(pluckFilter);
    pluckFilter.connect(pluckGain);
    pluckGain.connect(noteGain);
    pluckNoise.start(when);

    // Body resonance
    const body = audioCtx.createBiquadFilter();
    body.type = 'peaking';
    body.frequency.value = 300;
    body.Q.value = 3;
    body.gain.value = 6;

    noteGain.connect(body);
    body.connect(masterGain);

    if (reverbNode && reverbAmount > 0) {
        const revSend = audioCtx.createGain();
        revSend.gain.value = reverbAmount * 0.4;
        body.connect(revSend);
        revSend.connect(reverbNode);
    }
}

function playHarmonic(frequency, velocity, duration, when) {
    // Harmonics are pure, ethereal tones
    const noteGain = audioCtx.createGain();

    // Primarily fundamental with very little harmonics
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = frequency;

    // Very gentle vibrato
    if (vibratoIntensity > 0) {
        const vib = audioCtx.createOscillator();
        const vibGain = audioCtx.createGain();
        vib.type = 'sine';
        vib.frequency.value = 4 + Math.random();
        vibGain.gain.value = 2 * vibratoIntensity;
        vib.connect(vibGain);
        vibGain.connect(osc.frequency);
        vib.start(when);
        vib.stop(when + duration + 1);
    }

    const amp = velocity * 0.2;

    noteGain.gain.setValueAtTime(0, when);
    noteGain.gain.linearRampToValueAtTime(amp * 0.5, when + 0.05);
    noteGain.gain.linearRampToValueAtTime(amp, when + 0.15);
    noteGain.gain.setTargetAtTime(amp * 0.85, when + 0.3, duration * 0.3);
    noteGain.gain.setTargetAtTime(0.001, when + duration - 0.1, 0.15);

    // Add slight 2nd harmonic
    const osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = frequency * 2;
    const harm2Gain = audioCtx.createGain();
    harm2Gain.gain.value = amp * 0.15;

    osc.connect(noteGain);
    osc2.connect(harm2Gain);
    harm2Gain.connect(noteGain);

    // High-pass to make it ethereal
    const hpFilter = audioCtx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.value = 400;

    noteGain.connect(hpFilter);
    hpFilter.connect(masterGain);

    if (reverbNode) {
        const revSend = audioCtx.createGain();
        revSend.gain.value = reverbAmount * 0.8; // More reverb for harmonics
        hpFilter.connect(revSend);
        revSend.connect(reverbNode);
    }

    osc.start(when);
    osc2.start(when);
    osc.stop(when + duration + 0.5);
    osc2.stop(when + duration + 0.5);
}

function playColLegno(frequency, velocity, duration, when) {
    // Playing with wood of bow - percussive, dry
    const noteGain = audioCtx.createGain();

    // Mostly noise with pitch hint
    const noiseBuf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.1, audioCtx.sampleRate);
    const noiseData = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseData.length * 0.15));
    }

    const noiseSrc = audioCtx.createBufferSource();
    noiseSrc.buffer = noiseBuf;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = frequency;
    noiseFilter.Q.value = 5;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.value = velocity * 0.3;

    // Very faint pitched component
    const osc = audioCtx.createOscillator();
    osc.frequency.value = frequency;
    const oscGain = audioCtx.createGain();
    oscGain.gain.setValueAtTime(velocity * 0.05, when);
    oscGain.gain.setTargetAtTime(0.001, when + 0.05, 0.05);

    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(noteGain);
    osc.connect(oscGain);
    oscGain.connect(noteGain);

    noteGain.connect(masterGain);

    noiseSrc.start(when);
    osc.start(when);
    osc.stop(when + 0.2);
}

function playTrill(frequency, velocity, duration, when) {
    // Rapid alternation between two notes
    const trillInterval = 1.0594630943592953; // Semitone up
    const trillRate = 12 + Math.random() * 4; // 12-16 Hz

    const noteGain = audioCtx.createGain();
    noteGain.gain.value = 1;

    const numCycles = Math.floor(duration * trillRate);

    for (let i = 0; i < numCycles; i++) {
        const t = when + (i / trillRate);
        const freq = (i % 2 === 0) ? frequency : frequency * trillInterval;

        // Mini-note for each trill cycle
        const osc = audioCtx.createOscillator();
        const harmGain = audioCtx.createGain();

        osc.frequency.value = freq;

        const amp = velocity * 0.12;
        const noteDur = 1 / trillRate;

        harmGain.gain.setValueAtTime(0, t);
        harmGain.gain.linearRampToValueAtTime(amp, t + 0.005);
        harmGain.gain.setTargetAtTime(amp * 0.7, t + 0.01, noteDur * 0.3);
        harmGain.gain.setTargetAtTime(0.001, t + noteDur * 0.8, noteDur * 0.1);

        // Add harmonics
        for (let n = 2; n <= 6; n++) {
            const harmOsc = audioCtx.createOscillator();
            const hGain = audioCtx.createGain();
            harmOsc.frequency.value = freq * n;
            hGain.gain.value = amp / Math.pow(n, 0.8) * 0.5;
            harmOsc.connect(hGain);
            hGain.connect(noteGain);
            harmOsc.start(t);
            harmOsc.stop(t + noteDur + 0.02);
        }

        osc.connect(harmGain);
        harmGain.connect(noteGain);
        osc.start(t);
        osc.stop(t + noteDur + 0.02);
    }

    // Body resonance
    const body = audioCtx.createBiquadFilter();
    body.type = 'peaking';
    body.frequency.value = 300;
    body.Q.value = 3;
    body.gain.value = 5;

    noteGain.connect(body);
    body.connect(masterGain);

    if (reverbNode) {
        const revSend = audioCtx.createGain();
        revSend.gain.value = reverbAmount * 0.5;
        body.connect(revSend);
        revSend.connect(reverbNode);
    }
}

// ============================================
// TECHNIQUE PARAMETERS
// ============================================

function getTechniqueParams(technique, velocity, frequency) {
    const params = {
        baseAmp: 0.13,
        harmonicRolloff: 0.75,
        vibrato: true,
        vibratoRate: 5.5,
        vibratoDepth: 5,
        vibratoDelay: 0.12,
        attack: 0.06,
        decay: 0.1,
        sustain: 0.85,
        release: 0.08,
        attackShape: 'bow',
        bowNoise: 1.0
    };

    switch (technique) {
        case 'legato':
            params.attack = 0.05;
            params.vibratoDelay = 0.1;
            break;

        case 'detache':
            params.attackShape = 'accent';
            params.attack = 0.025;
            params.vibratoDepth = 3;
            params.bowNoise = 1.3;
            break;

        case 'martele':
            params.attackShape = 'accent';
            params.attack = 0.012;
            params.sustain = 0.7;
            params.vibratoDepth = 2;
            params.bowNoise = 1.5;
            break;

        case 'spiccato':
            params.attackShape = 'spiccato';
            params.attack = 0.01;
            params.sustain = 0.4;
            params.release = 0.03;
            params.vibrato = false;
            params.bowNoise = 1.4;
            break;

        case 'ricochet':
            params.attackShape = 'ricochet';
            params.attack = 0.008;
            params.sustain = 0.35;
            params.release = 0.025;
            params.vibrato = false;
            params.bowNoise = 1.3;
            break;

        case 'flying_staccato':
            params.attackShape = 'accent';
            params.attack = 0.006;
            params.sustain = 0.3;
            params.release = 0.02;
            params.vibrato = false;
            params.bowNoise = 1.2;
            break;

        case 'bariolage':
            params.attackShape = 'bow';
            params.attack = 0.015;
            params.sustain = 0.6;
            params.vibrato = false;
            params.bowNoise = 1.1;
            break;

        case 'sforzando':
            params.attackShape = 'sfz';
            params.baseAmp = 0.18;
            params.attack = 0.008;
            params.vibratoDepth = 6;
            params.vibratoDelay = 0.05;
            params.bowNoise = 1.6;
            break;

        case 'fortissimo':
            params.attackShape = 'accent';
            params.baseAmp = 0.16;
            params.attack = 0.015;
            params.sustain = 0.95;
            params.vibratoDepth = 7;
            params.bowNoise = 1.4;
            break;

        case 'vibrato_intense':
            params.vibratoDepth = 10;
            params.vibratoRate = 6;
            params.vibratoDelay = 0.08;
            break;

        case 'vibrato_gentle':
            params.vibratoDepth = 3;
            params.vibratoRate = 5;
            params.vibratoDelay = 0.15;
            params.bowNoise = 0.6;
            break;

        case 'vibrato_wide':
            params.vibratoDepth = 15;
            params.vibratoRate = 5.5;
            break;

        case 'tremolo':
            params.vibrato = false;
            params.attack = 0.02;
            params.sustain = 0.9;
            params.bowNoise = 1.5;
            break;

        case 'sul_ponticello':
            params.harmonicRolloff = 0.5; // More harmonics
            params.baseAmp = 0.11;
            params.vibratoDepth = 4;
            params.bowNoise = 1.8;
            break;

        case 'sul_tasto':
            params.harmonicRolloff = 1.0; // Fewer harmonics
            params.baseAmp = 0.14;
            params.attack = 0.1;
            params.vibratoDepth = 4;
            params.bowNoise = 0.5;
            break;

        case 'portamento':
            params.attack = 0.08;
            params.vibratoDelay = 0.2;
            break;

        case 'glissando':
            params.attack = 0.01;
            params.vibrato = false;
            break;

        case 'grace':
            params.attack = 0.005;
            params.sustain = 0.5;
            params.vibrato = false;
            break;

        case 'double_stop':
            params.attackShape = 'accent';
            params.baseAmp = 0.11;
            params.bowNoise = 1.3;
            break;

        case 'morendo':
            params.vibratoDepth = 2;
            params.vibratoRate = 4;
            params.attack = 0.15;
            params.sustain = 0.5;
            params.release = 0.3;
            params.bowNoise = 0.4;
            break;
    }

    return params;
}

// ============================================
// SCHEDULER
// ============================================

function scheduler() {
    const secondsPerBeat = 60.0 / tempo;

    while (nextNoteTime < audioCtx.currentTime + LOOKAHEAD) {
        const beatInLoop = currentBeat;

        fullComposition.forEach(noteData => {
            if (Math.abs(noteData.startBeat - beatInLoop) < 0.001) {
                const freq = noteFrequencies[noteData.note];
                if (freq) {
                    playViolinAt(freq, noteData.velocity, noteData.duration, nextNoteTime, noteData.technique);
                    scheduleUIUpdate(noteData.note, noteData.velocity, nextNoteTime - audioCtx.currentTime, noteData.technique);
                }
            }
        });

        currentBeat += 0.03125; // 32nd note resolution for fast passages
        nextNoteTime += secondsPerBeat * 0.03125;

        if (currentBeat >= TOTAL_BEATS) {
            setTimeout(() => stopMelody(), 100);
            return;
        }
    }

    const progress = (currentBeat / TOTAL_BEATS) * 100;
    document.getElementById('progressBar').style.width = progress + '%';

    const currentSeconds = (currentBeat / tempo) * 60;
    const totalSeconds = (TOTAL_BEATS / tempo) * 60;
    document.getElementById('currentTime').textContent = formatTime(currentSeconds);
    document.getElementById('totalTime').textContent = formatTime(totalSeconds);

    updateCurrentSection(currentBeat);

    // Emotion meter based on section
    let emotionProgress;
    if (currentBeat < 8) {
        emotionProgress = (currentBeat / 8) * 30; // Build-up: 0-30%
    } else if (currentBeat < 40) {
        emotionProgress = 30 + ((currentBeat - 8) / 32) * 70; // Climax: 30-100%
    } else {
        emotionProgress = 100 - ((currentBeat - 40) / 36) * 60; // Recap: 100-40%
    }
    document.getElementById('emotionFill').style.width = emotionProgress + '%';
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateCurrentSection(beat) {
    let currentSection = sections[0];
    let sectionIndex = 0;

    for (let i = sections.length - 1; i >= 0; i--) {
        if (beat >= sections[i].startBeat) {
            currentSection = sections[i];
            sectionIndex = i;
            break;
        }
    }

    document.getElementById('sectionDisplay').textContent = currentSection.name;
    document.getElementById('keyDisplay').textContent = currentSection.key;
    document.getElementById('moodDisplay').textContent = currentSection.mood;
    document.getElementById('dynamicsDisplay').textContent = currentSection.dynamics;

    for (let i = 0; i < sections.length; i++) {
        const marker = document.getElementById('marker-' + i);
        if (marker) {
            marker.classList.toggle('active', i === sectionIndex);
        }
    }
}

function scheduleUIUpdate(note, velocity, delay, technique) {
    setTimeout(() => {
        if (isPlaying) {
            document.getElementById('noteDisplay').textContent = note;
            document.getElementById('techniqueDisplay').textContent = technique || 'legato';
            highlightString(note, velocity);
            updateVelocityMeter(velocity);
            updateIntensityMeter(velocity);
        }
    }, Math.max(0, delay * 1000));
}

// ============================================
// PLAYBACK
// ============================================

function startMelody() {
    initAudio();
    isPlaying = true;
    currentBeat = 0;
    nextNoteTime = audioCtx.currentTime + 0.1;
    document.getElementById('playBtn').classList.add('active');
    document.getElementById('playBtn').textContent = '⏸ Pause';
    schedulerTimer = setInterval(scheduler, SCHEDULE_INTERVAL);
}

function togglePlay() {
    if (isPlaying) {
        pauseMelody();
    } else {
        if (currentBeat > 0 && currentBeat < TOTAL_BEATS) {
            resumeMelody();
        } else {
            startMelody();
        }
    }
}

function resumeMelody() {
    initAudio();
    isPlaying = true;
    nextNoteTime = audioCtx.currentTime + 0.1;
    document.getElementById('playBtn').classList.add('active');
    document.getElementById('playBtn').textContent = '⏸ Pause';
    schedulerTimer = setInterval(scheduler, SCHEDULE_INTERVAL);
}

function pauseMelody() {
    isPlaying = false;
    if (schedulerTimer) {
        clearInterval(schedulerTimer);
        schedulerTimer = null;
    }
    document.getElementById('playBtn').classList.remove('active');
    document.getElementById('playBtn').textContent = '▶ Resume';
    document.getElementById('sectionDisplay').textContent = 'Paused';
}

function stopMelody() {
    isPlaying = false;
    if (schedulerTimer) {
        clearInterval(schedulerTimer);
        schedulerTimer = null;
    }
    currentBeat = 0;
    document.getElementById('playBtn').classList.remove('active');
    document.getElementById('playBtn').textContent = '▶ Play';
    document.getElementById('sectionDisplay').textContent = 'Ready to Play';
    document.getElementById('noteDisplay').textContent = '♪';
    document.getElementById('techniqueDisplay').textContent = '-';
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('currentTime').textContent = '0:00';
    document.getElementById('emotionFill').style.width = '0%';
    highlightString(null);

    for (let i = 0; i < sections.length; i++) {
        const marker = document.getElementById('marker-' + i);
        if (marker) marker.classList.remove('active');
    }

    document.getElementById('keyDisplay').textContent = 'A minor';
    document.getElementById('moodDisplay').textContent = 'Intensifying';
    document.getElementById('dynamicsDisplay').textContent = 'mf → ff';
}

// ============================================
// REVERB - Concert Hall
// ============================================

function createReverb() {
    const sr = audioCtx.sampleRate;
    const len = sr * 4;
    const imp = audioCtx.createBuffer(2, len, sr);

    for (let ch = 0; ch < 2; ch++) {
        const d = imp.getChannelData(ch);

        // Early reflections
        const earlyCount = 25;
        for (let i = 0; i < earlyCount; i++) {
            const pos = Math.floor(sr * (0.005 + Math.random() * 0.07));
            const amp = 0.4 * Math.pow(0.85, i);
            if (pos < len) d[pos] += (Math.random() * 2 - 1) * amp;
        }

        // Diffuse tail with modulation
        for (let i = Math.floor(sr * 0.08); i < len; i++) {
            const t = i / len;
            const decay = Math.exp(-2.8 * t);
            const mod = 1 + 0.02 * Math.sin(i * 0.0001);
            d[i] += (Math.random() * 2 - 1) * decay * 0.4 * mod;
        }
    }

    reverbNode = audioCtx.createConvolver();
    reverbNode.buffer = imp;

    const reverbGain = audioCtx.createGain();
    reverbGain.gain.value = 1;
    reverbNode.connect(reverbGain);
    reverbGain.connect(masterGain);
}

// ============================================
// STRINGS VISUALIZATION
// ============================================

function createStrings() {
    const stringsContainer = document.getElementById('strings');
    stringsContainer.innerHTML = '';

    const stringData = [
        { name: 'G', color: '#654321', thickness: 4 },
        { name: 'D', color: '#8B4513', thickness: 3 },
        { name: 'A', color: '#A0522D', thickness: 2.5 },
        { name: 'E', color: '#CD853F', thickness: 2 }
    ];

    stringData.forEach((str) => {
        const stringWrapper = document.createElement('div');
        stringWrapper.className = 'string-wrapper';

        const string = document.createElement('div');
        string.className = 'violin-string';
        string.id = 'string-' + str.name;
        string.style.height = str.thickness + 'px';
        string.style.background = `linear-gradient(90deg, ${str.color}, #FFD700, ${str.color})`;

        const label = document.createElement('div');
        label.className = 'string-label';
        label.textContent = str.name;

        stringWrapper.appendChild(label);
        stringWrapper.appendChild(string);
        stringsContainer.appendChild(stringWrapper);
    });
}

function highlightString(note, velocity = 0.5) {
    document.querySelectorAll('.violin-string').forEach(s => {
        s.classList.remove('active', 'vibrating');
        s.style.boxShadow = '';
    });

    if (note) {
        const noteName = note.replace(/[0-9]/g, '');
        const octave = parseInt(note.match(/[0-9]/)?.[0] || '4');

        let stringName;
        if (octave <= 3 || (octave === 4 && ['C', 'C#', 'D', 'D#'].includes(noteName))) {
            stringName = 'G';
        } else if (octave === 4 && ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#'].includes(noteName)) {
            stringName = 'D';
        } else if ((octave === 4 && noteName === 'B') || (octave === 5 && ['C', 'C#', 'D', 'D#', 'E'].includes(noteName))) {
            stringName = 'A';
        } else {
            stringName = 'E';
        }

        const stringEl = document.getElementById('string-' + stringName);
        if (stringEl) {
            stringEl.classList.add('active', 'vibrating');
            const glowIntensity = Math.floor(velocity * 30);
            stringEl.style.boxShadow = `0 0 ${glowIntensity}px rgba(255, 215, 0, ${velocity})`;
            setTimeout(() => {
                stringEl.classList.remove('vibrating');
            }, 80);
        }
    }
}

// ============================================
// VISUALIZERS
// ============================================

function setupOscilloscope() {
    const canvas = document.getElementById('oscilloscope');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;

    function draw() {
        if (!analyser) {
            requestAnimationFrame(draw);
            return;
        }

        const bufLen = analyser.frequencyBinCount;
        const data = new Uint8Array(bufLen);
        analyser.getByteTimeDomainData(data);

        ctx.fillStyle = '#0a0805';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.12)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            const y = (canvas.height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Waveform with glow
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#DEB887';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FFD700';
        ctx.beginPath();

        const slice = canvas.width / bufLen;
        let x = 0;
        for (let i = 0; i < bufLen; i++) {
            const v = data[i] / 128.0;
            const y = v * canvas.height / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            x += slice;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        requestAnimationFrame(draw);
    }
    draw();
}

function setupSpectrum() {
    const canvas = document.getElementById('spectrum');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;

    function draw() {
        if (!analyserSpectrum) {
            requestAnimationFrame(draw);
            return;
        }

        const bufLen = analyserSpectrum.frequencyBinCount;
        const data = new Uint8Array(bufLen);
        analyserSpectrum.getByteFrequencyData(data);

        ctx.fillStyle = '#0a0805';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barCount = 40;
        const barWidth = canvas.width / barCount - 2;

        for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.floor((i / barCount) * bufLen * 0.5);
            const value = data[dataIndex];
            const barHeight = (value / 255) * canvas.height * 0.9;

            // Warm gradient
            const hue = 20 + (i / barCount) * 25;
            const saturation = 55 + (value / 255) * 35;
            const lightness = 25 + (value / 255) * 35;

            ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            ctx.shadowBlur = value > 200 ? 10 : 0;
            ctx.shadowColor = '#FFD700';
            ctx.fillRect(
                i * (barWidth + 2) + 1,
                canvas.height - barHeight,
                barWidth,
                barHeight
            );
        }
        ctx.shadowBlur = 0;

        requestAnimationFrame(draw);
    }
    draw();
}

function updateVelocityMeter(v) {
    const meter = document.getElementById('velocityMeter');
    meter.style.width = (v * 100) + '%';
    if (v > 0.9) {
        meter.style.background = 'linear-gradient(90deg, #8B4513, #CD853F, #FFD700, #FF6347)';
    } else {
        meter.style.background = 'linear-gradient(90deg, #5C3317, #8B4513, #CD853F)';
    }
}

function updateIntensityMeter(v) {
    document.getElementById('intensityMeter').style.width = (v * 100) + '%';
}

// ============================================
// AUDIO INIT
// ============================================

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.85;

        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;

        analyserSpectrum = audioCtx.createAnalyser();
        analyserSpectrum.fftSize = 512;

        masterGain.connect(analyser);
        masterGain.connect(analyserSpectrum);
        analyser.connect(audioCtx.destination);

        createReverb();
        setupOscilloscope();
        setupSpectrum();

        const totalSeconds = (TOTAL_BEATS / tempo) * 60;
        document.getElementById('durationDisplay').textContent = '~' + formatTime(totalSeconds);
        document.getElementById('totalTime').textContent = formatTime(totalSeconds);
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

// ============================================
// CONTROLS
// ============================================

function updateTempo(v) {
    tempo = parseInt(v);
    document.getElementById('tempoValue').textContent = tempo + ' BPM';

    const totalSeconds = (TOTAL_BEATS / tempo) * 60;
    document.getElementById('durationDisplay').textContent = '~' + formatTime(totalSeconds);
    document.getElementById('totalTime').textContent = formatTime(totalSeconds);
}

function updateReverb(v) {
    reverbAmount = v / 100;
    const labels = ['Dry', 'Room', 'Chamber', 'Concert Hall', 'Cathedral'];
    document.getElementById('reverbValue').textContent = labels[Math.min(Math.floor(v / 25), 4)];
}

function updateBrightness(v) {
    brightness = v / 100;
    const labels = ['Dark', 'Warm', 'Balanced', 'Bright', 'Brilliant'];
    document.getElementById('brightnessValue').textContent = labels[Math.min(Math.floor(v / 25), 4)];
}

function updateVibrato(v) {
    vibratoIntensity = v / 100;
    const labels = ['None', 'Subtle', 'Normal', 'Expressive', 'Intense'];
    document.getElementById('vibratoValue').textContent = labels[Math.min(Math.floor(v / 25), 4)];
}

function updateRosin(v) {
    rosinAmount = v / 100;
    const labels = ['Smooth', 'Light', 'Normal', 'Gritty', 'Raw'];
    document.getElementById('rosinValue').textContent = labels[Math.min(Math.floor(v / 25), 4)];
}

window.onload = () => {
    createStrings();
    const totalSeconds = (TOTAL_BEATS / tempo) * 60;
    document.getElementById('durationDisplay').textContent = '~' + formatTime(totalSeconds);
    document.getElementById('totalTime').textContent = formatTime(totalSeconds);
};

// Expose functions
window.togglePlay = togglePlay;
window.stopMelody = stopMelody;
window.updateTempo = updateTempo;
window.updateReverb = updateReverb;
window.updateBrightness = updateBrightness;
window.updateVibrato = updateVibrato;
window.updateRosin = updateRosin;
