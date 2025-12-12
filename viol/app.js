// ============================================
// VIOLIN SYNTHESIS ENGINE - "Swiatlo w Ciemnosci"
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
let brightness = 0.6;
let vibratoIntensity = 0.7;

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
    'F#6': 1479.98, 'G6': 1567.98, 'G#6': 1661.22, 'A6': 1760.00, 'B6': 1975.53, 'C7': 2093.00
};

// ============================================
// VIOLIN SYNTHESIS
// ============================================

function playViolinAt(frequency, velocity, duration, when, technique = 'legato') {
    if (!audioCtx) return;

    const secondsPerBeat = 60.0 / tempo;
    const actualDuration = duration * secondsPerBeat;

    // Technique-specific parameters
    const techniqueParams = getTechniqueParams(technique, velocity);

    // Main tone generation - violin uses sawtooth-like waveform
    const toneGain = audioCtx.createGain();

    // Create multiple harmonics for violin timbre
    const numHarmonics = Math.min(16, Math.floor(8000 / frequency));

    for (let n = 1; n <= numHarmonics; n++) {
        const osc = audioCtx.createOscillator();
        const harmGain = audioCtx.createGain();

        osc.frequency.value = frequency * n;

        // Violin harmonic structure - odd harmonics stronger (sawtooth-like)
        let amp = velocity * 0.15 / Math.pow(n, 0.8);
        if (n === 1) amp *= 1.0;
        if (n === 2) amp *= 0.9;
        if (n === 3) amp *= 0.85; // Strong 3rd harmonic
        if (n === 4) amp *= 0.6;
        if (n === 5) amp *= 0.7; // Strong 5th harmonic

        // Random variation for natural sound
        amp *= 0.9 + Math.random() * 0.2;

        // === VIBRATO ===
        if (techniqueParams.vibrato && vibratoIntensity > 0) {
            const vibrato = audioCtx.createOscillator();
            const vibratoGain = audioCtx.createGain();
            vibrato.type = 'sine';
            // Vibrato rate: 5-7 Hz typical for violin
            vibrato.frequency.value = 5.5 + Math.random() * 1.5;

            // Vibrato depth based on technique
            let vibratoDepth = techniqueParams.vibratoDepth * vibratoIntensity;
            vibratoDepth *= (frequency / 440); // Scale with pitch
            vibratoGain.gain.value = vibratoDepth;

            // Delayed vibrato onset (like real violinist)
            vibratoGain.gain.setValueAtTime(0, when);
            vibratoGain.gain.linearRampToValueAtTime(vibratoDepth, when + Math.min(0.15, actualDuration * 0.2));

            vibrato.connect(vibratoGain);
            vibratoGain.connect(osc.frequency);
            vibrato.start(when);
            vibrato.stop(when + actualDuration + 0.5);
        }

        // Micro-detuning for natural sound
        osc.detune.value = (Math.random() - 0.5) * 8;

        // Slow random drift
        const drift = audioCtx.createOscillator();
        const driftGain = audioCtx.createGain();
        drift.type = 'sine';
        drift.frequency.value = 0.2 + Math.random() * 0.3;
        driftGain.gain.value = 2 + Math.random() * 2;
        drift.connect(driftGain);
        driftGain.connect(osc.detune);
        drift.start(when);
        drift.stop(when + actualDuration + 0.5);

        // Envelope based on technique
        harmGain.gain.setValueAtTime(0, when);

        if (techniqueParams.attack === 'bow') {
            // Bowed attack - gradual
            harmGain.gain.linearRampToValueAtTime(amp * 0.3, when + 0.02);
            harmGain.gain.linearRampToValueAtTime(amp, when + techniqueParams.attackTime);
        } else if (techniqueParams.attack === 'accent') {
            // Accented attack
            harmGain.gain.linearRampToValueAtTime(amp * 1.2, when + 0.01);
            harmGain.gain.setTargetAtTime(amp, when + 0.02, 0.05);
        } else if (techniqueParams.attack === 'sharp') {
            // Sharp martele attack
            harmGain.gain.linearRampToValueAtTime(amp * 1.4, when + 0.005);
            harmGain.gain.setTargetAtTime(amp * 0.9, when + 0.01, 0.03);
        }

        // Sustain and release
        const sustainTime = actualDuration * 0.7;
        const releaseTime = actualDuration * 0.3;
        harmGain.gain.setTargetAtTime(amp * techniqueParams.sustainLevel, when + techniqueParams.attackTime, sustainTime);
        harmGain.gain.setTargetAtTime(0.001, when + actualDuration - releaseTime, releaseTime * 0.5);

        osc.connect(harmGain);
        harmGain.connect(toneGain);
        osc.start(when);
        osc.stop(when + actualDuration + 0.5);
    }

    // === BOW NOISE ===
    const noiseLen = actualDuration + 0.1;
    const noiseBuf = audioCtx.createBuffer(1, audioCtx.sampleRate * noiseLen, audioCtx.sampleRate);
    const noiseData = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noiseSrc = audioCtx.createBufferSource();
    noiseSrc.buffer = noiseBuf;

    // Bow noise filter - high frequency content
    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 3000 + frequency * 2;
    noiseFilter.Q.value = 1;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0, when);
    noiseGain.gain.linearRampToValueAtTime(velocity * techniqueParams.bowNoise * 0.03, when + 0.02);
    noiseGain.gain.setTargetAtTime(velocity * techniqueParams.bowNoise * 0.015, when + 0.1, 0.2);
    noiseGain.gain.setTargetAtTime(0.001, when + actualDuration - 0.1, 0.1);

    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(toneGain);
    noiseSrc.start(when);
    noiseSrc.stop(when + actualDuration + 0.2);

    // === TREMOLO effect ===
    if (technique === 'tremolo') {
        const tremolo = audioCtx.createOscillator();
        const tremoloGain = audioCtx.createGain();
        tremolo.type = 'sine';
        tremolo.frequency.value = 8 + Math.random() * 4; // 8-12 Hz
        tremoloGain.gain.value = 0.3;
        tremolo.connect(tremoloGain);
        tremoloGain.connect(toneGain.gain);
        tremolo.start(when);
        tremolo.stop(when + actualDuration + 0.2);
    }

    // === BODY RESONANCE ===
    const bodyFilter = audioCtx.createBiquadFilter();
    bodyFilter.type = 'peaking';
    bodyFilter.frequency.value = 280; // Violin body resonance ~280 Hz
    bodyFilter.Q.value = 3;
    bodyFilter.gain.value = 6;

    const bodyFilter2 = audioCtx.createBiquadFilter();
    bodyFilter2.type = 'peaking';
    bodyFilter2.frequency.value = 460; // Second resonance
    bodyFilter2.Q.value = 4;
    bodyFilter2.gain.value = 4;

    // === BRIGHTNESS CONTROL ===
    const brightFilter = audioCtx.createBiquadFilter();
    brightFilter.type = 'highshelf';
    brightFilter.frequency.value = 2500;
    brightFilter.gain.value = -6 + brightness * 12; // -6 to +6 dB

    // === WARMTH (low pass) ===
    const warmthFilter = audioCtx.createBiquadFilter();
    warmthFilter.type = 'lowpass';
    warmthFilter.frequency.value = 6000 + brightness * 4000;
    warmthFilter.Q.value = 0.5;

    toneGain.connect(bodyFilter);
    bodyFilter.connect(bodyFilter2);
    bodyFilter2.connect(brightFilter);
    brightFilter.connect(warmthFilter);
    warmthFilter.connect(masterGain);

    // Reverb send
    if (reverbNode && reverbAmount > 0) {
        const revSend = audioCtx.createGain();
        revSend.gain.value = reverbAmount * 0.5;
        warmthFilter.connect(revSend);
        revSend.connect(reverbNode);
    }

    updateVelocityMeter(velocity);
}

function getTechniqueParams(technique, velocity) {
    const params = {
        vibrato: true,
        vibratoDepth: 4,
        attack: 'bow',
        attackTime: 0.08,
        sustainLevel: 0.85,
        bowNoise: 1.0
    };

    switch (technique) {
        case 'legato':
            params.attackTime = 0.06;
            params.sustainLevel = 0.9;
            params.vibratoDepth = 3;
            break;
        case 'detache':
            params.attack = 'accent';
            params.attackTime = 0.03;
            params.sustainLevel = 0.8;
            params.vibratoDepth = 2;
            params.bowNoise = 1.2;
            break;
        case 'martele':
            params.attack = 'sharp';
            params.attackTime = 0.015;
            params.sustainLevel = 0.7;
            params.vibratoDepth = 1;
            params.bowNoise = 1.5;
            break;
        case 'fortissimo':
            params.attack = 'accent';
            params.attackTime = 0.02;
            params.sustainLevel = 0.95;
            params.vibratoDepth = 5;
            params.bowNoise = 1.3;
            break;
        case 'vibrato_intense':
            params.vibratoDepth = 8;
            params.sustainLevel = 0.9;
            break;
        case 'vibrato_gentle':
            params.vibratoDepth = 3;
            params.attackTime = 0.1;
            params.sustainLevel = 0.85;
            params.bowNoise = 0.7;
            break;
        case 'vibrato_wide':
            params.vibratoDepth = 12;
            params.sustainLevel = 0.85;
            break;
        case 'tremolo':
            params.vibrato = false;
            params.attackTime = 0.02;
            params.sustainLevel = 0.9;
            params.bowNoise = 1.4;
            break;
        case 'morendo':
            params.vibratoDepth = 2;
            params.attackTime = 0.15;
            params.sustainLevel = 0.6;
            params.bowNoise = 0.5;
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
                    scheduleUIUpdate(noteData.note, noteData.velocity, nextNoteTime - audioCtx.currentTime);
                }
            }
        });

        currentBeat += 0.125;
        nextNoteTime += secondsPerBeat * 0.125;

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

    const emotionProgress = Math.min(100, (currentBeat / 40) * 100);
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

function scheduleUIUpdate(note, velocity, delay) {
    setTimeout(() => {
        if (isPlaying) {
            document.getElementById('noteDisplay').textContent = note;
            highlightString(note);
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
// REVERB
// ============================================

function createReverb() {
    const sr = audioCtx.sampleRate;
    const len = sr * 3.5;
    const imp = audioCtx.createBuffer(2, len, sr);

    for (let ch = 0; ch < 2; ch++) {
        const d = imp.getChannelData(ch);

        // Early reflections
        const earlyCount = 15;
        for (let i = 0; i < earlyCount; i++) {
            const pos = Math.floor(sr * (0.008 + Math.random() * 0.06));
            const amp = 0.35 * Math.pow(0.88, i);
            if (pos < len) d[pos] += (Math.random() * 2 - 1) * amp;
        }

        // Diffuse tail
        for (let i = Math.floor(sr * 0.08); i < len; i++) {
            const t = i / len;
            const decay = Math.exp(-3 * t);
            d[i] += (Math.random() * 2 - 1) * decay * 0.35;
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

    const stringNames = ['G', 'D', 'A', 'E'];
    const stringColors = ['#8B4513', '#A0522D', '#CD853F', '#DEB887'];

    stringNames.forEach((name, index) => {
        const stringWrapper = document.createElement('div');
        stringWrapper.className = 'string-wrapper';

        const string = document.createElement('div');
        string.className = 'violin-string';
        string.id = 'string-' + name;
        string.style.background = `linear-gradient(90deg, ${stringColors[index]}, #FFD700, ${stringColors[index]})`;

        const label = document.createElement('div');
        label.className = 'string-label';
        label.textContent = name;

        stringWrapper.appendChild(label);
        stringWrapper.appendChild(string);
        stringsContainer.appendChild(stringWrapper);
    });
}

function highlightString(note) {
    document.querySelectorAll('.violin-string').forEach(s => s.classList.remove('active', 'vibrating'));

    if (note) {
        const noteName = note.replace(/[0-9]/g, '');
        const octave = parseInt(note.match(/[0-9]/)[0]);

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
            setTimeout(() => stringEl.classList.remove('vibrating'), 150);
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

        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.15)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            const y = (canvas.height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Waveform
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#CD853F';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#DEB887';
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

        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barCount = 32;
        const barWidth = canvas.width / barCount - 2;

        for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.floor((i / barCount) * bufLen * 0.6);
            const value = data[dataIndex];
            const barHeight = (value / 255) * canvas.height * 0.9;

            // Warm wood-like colors
            const hue = 25 + (i / barCount) * 20;
            const saturation = 60 + (value / 255) * 30;
            const lightness = 30 + (value / 255) * 30;

            ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            ctx.fillRect(
                i * (barWidth + 2) + 1,
                canvas.height - barHeight,
                barWidth,
                barHeight
            );
        }

        requestAnimationFrame(draw);
    }
    draw();
}

function updateVelocityMeter(v) {
    document.getElementById('velocityMeter').style.width = (v * 100) + '%';
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
        masterGain.gain.value = 0.8;

        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;

        analyserSpectrum = audioCtx.createAnalyser();
        analyserSpectrum.fftSize = 256;

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

window.onload = () => {
    createStrings();
    const totalSeconds = (TOTAL_BEATS / tempo) * 60;
    document.getElementById('durationDisplay').textContent = '~' + formatTime(totalSeconds);
    document.getElementById('totalTime').textContent = formatTime(totalSeconds);
};

// Expose functions to window
window.togglePlay = togglePlay;
window.stopMelody = stopMelody;
window.updateTempo = updateTempo;
window.updateReverb = updateReverb;
window.updateBrightness = updateBrightness;
window.updateVibrato = updateVibrato;
