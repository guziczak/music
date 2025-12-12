// ============================================
// MASTERPIECE AUDIO ENGINE v3 - EPIC DEVELOPMENT
// ============================================

import { sections, fullComposition, TOTAL_BEATS } from './composition.js';

let audioCtx = null;
let masterGain = null;
let reverbNode = null;
let analyser = null;
let analyserSpectrum = null;
let isPlaying = false;
let tempo = 103;
let reverbAmount = 0.65;
let warmth = 0.75;
let sustainPedal = false;
let softPedal = false;
let sostenutoPedal = false;
let pianoType = 'yamaha';

let schedulerTimer = null;
let currentBeat = 0;
let nextNoteTime = 0;

const LOOKAHEAD = 0.15;
const SCHEDULE_INTERVAL = 20;

const noteFrequencies = {
        'A1': 55.00, 'A#1': 58.27, 'B1': 61.74,
        'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31,
        'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47,
        'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61,
        'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
        'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23,
        'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
        'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46,
        'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
        'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51
    };

    // ============================================
    // PIANO SYNTHESIS
    // ============================================

function playPianoAt(frequency, velocity, duration, when) {
        if (!audioCtx) return;
        if (softPedal) velocity *= 0.6;

        const sustainMult = sustainPedal ? 2.5 : 1;

        // Piano inharmonicity coefficient (strings are slightly inharmonic)
        const B = 0.00004 * Math.pow(frequency / 261.63, 1.4);

        // Main tone with multiple harmonics
        const numHarmonics = Math.min(12, Math.floor(10000 / frequency));
        const toneGain = audioCtx.createGain();

        for (let n = 1; n <= numHarmonics; n++) {
            const osc = audioCtx.createOscillator();
            const harmGain = audioCtx.createGain();

            // Inharmonic frequency (slightly sharp for higher harmonics)
            const inharmonicFreq = frequency * n * Math.sqrt(1 + B * n * n);

            osc.type = n <= 2 ? 'triangle' : 'sine';
            osc.frequency.value = inharmonicFreq;

            // === PHASE NOISE / NATURAL VARIATION ===
            // 1. Random micro-detuning (±3 cents) - each harmonic slightly different
            const microDetune = (Math.random() - 0.5) * 6;
            osc.detune.value = microDetune;

            // 2. Subtle LFO modulation for "living" sound
            const lfo = audioCtx.createOscillator();
            const lfoGain = audioCtx.createGain();
            lfo.type = 'sine';
            lfo.frequency.value = 0.3 + Math.random() * 2.5; // 0.3-2.8 Hz random rate
            lfoGain.gain.value = 1.5 + Math.random() * 2; // 1.5-3.5 cents wobble
            lfo.connect(lfoGain);
            lfoGain.connect(osc.detune);
            lfo.start(when);
            lfo.stop(when + duration + 5);

            // Harmonic amplitude falls off, but 2nd and 3rd are strong
            // Frequency-based volume compensation (higher notes quieter like real piano)
            const freqCompensation = Math.pow(261.63 / frequency, 0.4); // C4 = reference, stronger reduction for highs
            let amp = velocity * 0.2 * freqCompensation / Math.pow(n, 0.7);
            if (n === 1) amp *= 1.2;
            if (n === 2) amp *= 1.1;
            if (n === 3) amp *= 0.9;

            // 3. Slight random amplitude variation per harmonic
            amp *= 0.92 + Math.random() * 0.16; // ±8% variation

            // Each harmonic has different decay
            const harmDecay = (duration * sustainMult) / (1 + n * 0.15);

            harmGain.gain.setValueAtTime(0, when);
            harmGain.gain.linearRampToValueAtTime(amp, when + 0.003); // Fast attack
            harmGain.gain.setTargetAtTime(amp * 0.7, when + 0.01, 0.1);
            harmGain.gain.setTargetAtTime(0.001, when + 0.15, harmDecay);

            osc.connect(harmGain);
            harmGain.connect(toneGain);
            osc.start(when);
            osc.stop(when + duration + 5);
        }

        // Hammer attack noise (percussive transient)
        const noiseLen = 0.025;
        const noiseBuf = audioCtx.createBuffer(1, audioCtx.sampleRate * noiseLen, audioCtx.sampleRate);
        const noiseData = noiseBuf.getChannelData(0);
        for (let i = 0; i < noiseData.length; i++) {
            const t = i / noiseData.length;
            noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-t * 30) * velocity;
        }

        const noiseSrc = audioCtx.createBufferSource();
        noiseSrc.buffer = noiseBuf;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = Math.min(frequency * 4, 5000);
        noiseFilter.Q.value = 2;

        const noiseGain = audioCtx.createGain();
        const freqCompensation2 = Math.pow(261.63 / frequency, 0.4); // C4 = reference
        noiseGain.gain.value = velocity * 0.1 * freqCompensation2;

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(toneGain);
        noiseSrc.start(when);

        // Body resonance filter
        const bodyFilter = audioCtx.createBiquadFilter();
        bodyFilter.type = 'peaking';
        bodyFilter.frequency.value = pianoType === 'bosendorfer' ? 180 : (pianoType === 'steinway' ? 220 : 250);
        bodyFilter.Q.value = 1.5;
        bodyFilter.gain.value = 4;

        // Brightness control
        const brightFilter = audioCtx.createBiquadFilter();
        brightFilter.type = 'highshelf';
        brightFilter.frequency.value = 3000;
        brightFilter.gain.value = pianoType === 'yamaha' ? 3 : (pianoType === 'steinway' ? 1 : -2);

        // Warmth (low pass)
        const warmthFilter = audioCtx.createBiquadFilter();
        warmthFilter.type = 'lowpass';
        warmthFilter.frequency.value = 8000 - warmth * 3000;
        warmthFilter.Q.value = 0.5;

        toneGain.connect(bodyFilter);
        bodyFilter.connect(brightFilter);
        brightFilter.connect(warmthFilter);
        warmthFilter.connect(masterGain);

        // Reverb send
        if (reverbNode && reverbAmount > 0) {
            const revSend = audioCtx.createGain();
            revSend.gain.value = reverbAmount * 0.4;
            warmthFilter.connect(revSend);
            revSend.connect(reverbNode);
        }

        updateVelocityMeter(velocity);
    }

function playPiano(frequency, velocity, duration) {
        playPianoAt(frequency, velocity, duration, audioCtx.currentTime);
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
                        const noteDuration = noteData.duration * secondsPerBeat;
                        playPianoAt(freq, noteData.velocity, noteDuration, nextNoteTime);
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
        
        const emotionProgress = Math.min(100, (currentBeat / 200) * 100);
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
                highlightKey(note);
                updateVelocityMeter(velocity);
                updateIntensityMeter(velocity);
                
                setTimeout(() => {
                    const el = document.getElementById('key-' + note);
                    if (el) el.classList.remove('active');
                }, 100);
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
        document.getElementById('emotionFill').style.width = '50%';
        highlightKey(null);
        
        for (let i = 0; i < sections.length; i++) {
            const marker = document.getElementById('marker-' + i);
            if (marker) marker.classList.remove('active');
        }
        
        document.getElementById('keyDisplay').textContent = 'A minor';
        document.getElementById('moodDisplay').textContent = 'Mysterious';
        document.getElementById('dynamicsDisplay').textContent = 'pp';
    }

    // ============================================
    // REVERB
    // ============================================
    
function createReverb() {
        const sr = audioCtx.sampleRate;
        const len = sr * 4;
        const imp = audioCtx.createBuffer(2, len, sr);
        
        for (let ch = 0; ch < 2; ch++) {
            const d = imp.getChannelData(ch);
            
            const earlyCount = 20;
            for (let i = 0; i < earlyCount; i++) {
                const pos = Math.floor(sr * (0.01 + Math.random() * 0.08));
                const amp = 0.4 * Math.pow(0.85, i);
                if (pos < len) d[pos] += (Math.random() * 2 - 1) * amp;
            }
            
            for (let i = Math.floor(sr * 0.1); i < len; i++) {
                const t = i / len;
                const decay = Math.exp(-2.5 * t);
                d[i] += (Math.random() * 2 - 1) * decay * 0.4;
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
    // KEYBOARD
    // ============================================
    
function createKeyboard() {
        const keyboard = document.getElementById('keyboard');
        keyboard.innerHTML = '';
        
        const octaves = [2, 3, 4, 5];
        const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const blackNotePositions = { 'C': true, 'D': true, 'E': false, 'F': true, 'G': true, 'A': true, 'B': false };
        
        const whiteKeyWidth = 30;
        const blackKeyWidth = 18;
        let whiteKeyIndex = 0;
        
        octaves.forEach(octave => {
            whiteNotes.forEach(noteName => {
                const fullNote = noteName + octave;
                const key = document.createElement('div');
                key.className = 'white-key';
                key.id = 'key-' + fullNote;
                if (noteName === 'C') {
                    key.innerHTML = `<span class="label">C${octave}</span>`;
                }
                key.onmousedown = (e) => {
                    e.preventDefault();
                    initAudio();
                    playPiano(noteFrequencies[fullNote], 0.7, 1.5);
                    highlightKey(fullNote);
                    document.getElementById('noteDisplay').textContent = fullNote;
                };
                key.onmouseup = () => key.classList.remove('active');
                key.onmouseleave = () => key.classList.remove('active');
                keyboard.appendChild(key);
                whiteKeyIndex++;
            });
        });
        
        const c6Key = document.createElement('div');
        c6Key.className = 'white-key';
        c6Key.id = 'key-C6';
        c6Key.innerHTML = `<span class="label">C6</span>`;
        c6Key.onmousedown = (e) => {
            e.preventDefault();
            initAudio();
            playPiano(noteFrequencies['C6'], 0.7, 1.5);
            highlightKey('C6');
            document.getElementById('noteDisplay').textContent = 'C6';
        };
        c6Key.onmouseup = () => c6Key.classList.remove('active');
        c6Key.onmouseleave = () => c6Key.classList.remove('active');
        keyboard.appendChild(c6Key);
        
        let currentWhitePos = 0;
        octaves.forEach(octave => {
            whiteNotes.forEach((noteName) => {
                if (blackNotePositions[noteName]) {
                    const sharpNote = noteName + '#' + octave;
                    const blackKey = document.createElement('div');
                    blackKey.className = 'black-key';
                    blackKey.id = 'key-' + sharpNote;
                    const pos = (currentWhitePos + 1) * (whiteKeyWidth + 2) - blackKeyWidth / 2 - 2;
                    blackKey.style.left = pos + 'px';
                    blackKey.onmousedown = (e) => {
                        e.preventDefault();
                        initAudio();
                        playPiano(noteFrequencies[sharpNote], 0.7, 1.5);
                        highlightKey(sharpNote);
                        document.getElementById('noteDisplay').textContent = sharpNote;
                    };
                    blackKey.onmouseup = () => blackKey.classList.remove('active');
                    blackKey.onmouseleave = () => blackKey.classList.remove('active');
                    keyboard.appendChild(blackKey);
                }
                currentWhitePos++;
            });
        });
    }

function highlightKey(note) {
        document.querySelectorAll('.white-key, .black-key').forEach(k => k.classList.remove('active'));
        if (note) {
            const el = document.getElementById('key-' + note);
            if (el) el.classList.add('active');
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
            
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = 'rgba(201, 169, 98, 0.1)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 5; i++) {
                const y = (canvas.height / 4) * i;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#c9a962';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#c9a962';
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
            
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const barCount = 24;
            const barWidth = canvas.width / barCount - 2;
            
            for (let i = 0; i < barCount; i++) {
                const dataIndex = Math.floor((i / barCount) * bufLen * 0.5);
                const value = data[dataIndex];
                const barHeight = (value / 255) * canvas.height * 0.9;
                
                const hue = 35 + (i / barCount) * 15;
                const saturation = 50 + (value / 255) * 30;
                const lightness = 40 + (value / 255) * 20;
                
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
            masterGain.gain.value = 0.75;
            
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

function updateWarmth(v) {
        warmth = v / 100;
        const labels = ['Bright', 'Clear', 'Balanced', 'Rich', 'Dark'];
        document.getElementById('warmthValue').textContent = labels[Math.min(Math.floor(v / 25), 4)];
    }

function setPianoType(type) {
        pianoType = type;
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        const typeMap = { 'steinway': 'typeSteinway', 'bosendorfer': 'typeBosendorfer', 'yamaha': 'typeYamaha' };
        document.getElementById(typeMap[type]).classList.add('active');
    }

document.addEventListener('keydown', e => {
        if (e.code === 'Space' && !sustainPedal) {
            e.preventDefault();
            sustainPedal = true;
            document.getElementById('sustainLight').classList.add('active');
        }
        if (e.code === 'KeyS' && !softPedal) {
            softPedal = true;
            document.getElementById('softLight').classList.add('active');
        }
        if (e.code === 'KeyD' && !sostenutoPedal) {
            sostenutoPedal = true;
            document.getElementById('sostenutoLight').classList.add('active');
        }
    });
    
document.addEventListener('keyup', e => {
        if (e.code === 'Space') {
            sustainPedal = false;
            document.getElementById('sustainLight').classList.remove('active');
        }
        if (e.code === 'KeyS') {
            softPedal = false;
            document.getElementById('softLight').classList.remove('active');
        }
        if (e.code === 'KeyD') {
            sostenutoPedal = false;
            document.getElementById('sostenutoLight').classList.remove('active');
        }
    });

window.onload = () => {
        createKeyboard();
        const totalSeconds = (TOTAL_BEATS / tempo) * 60;
        document.getElementById('durationDisplay').textContent = '~' + formatTime(totalSeconds);
        document.getElementById('totalTime').textContent = formatTime(totalSeconds);
    };

// Expose functions to window for HTML onclick handlers
window.togglePlay = togglePlay;
window.stopMelody = stopMelody;
window.updateTempo = updateTempo;
window.updateReverb = updateReverb;
window.updateWarmth = updateWarmth;
window.setPianoType = setPianoType;
