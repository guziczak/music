    // ============================================
    // MASTERPIECE AUDIO ENGINE v3 - EPIC DEVELOPMENT
    // ============================================

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
    // COMPOSITION STRUCTURE
    // ============================================

    const sections = [
        { name: 'Prelude', startBeat: 0, key: 'A minor', mood: 'Mysterious', dynamics: 'pp' },
        { name: 'Theme', startBeat: 32, key: 'A minor', mood: 'Melancholic', dynamics: 'p' },
        { name: 'Development', startBeat: 80, key: 'Modulating', mood: 'Transformative', dynamics: 'mp → ff' },
        { name: 'Variation', startBeat: 224, key: 'E minor', mood: 'Passionate', dynamics: 'f' },
        { name: 'Climax', startBeat: 272, key: 'A minor', mood: 'Triumphant', dynamics: 'ff' },
        { name: 'Recapitulation', startBeat: 304, key: 'A minor', mood: 'Nostalgic', dynamics: 'mp' },
        { name: 'Coda', startBeat: 336, key: 'A major', mood: 'Transcendent', dynamics: 'ppp' }
    ];

    // ============ PRELUDE (0-32) ============
    const prelude = [
        { note: 'A2', startBeat: 0, duration: 4, velocity: 0.22 },
        { note: 'E3', startBeat: 0.5, duration: 3.5, velocity: 0.18 },
        { note: 'A3', startBeat: 1, duration: 3, velocity: 0.2 },
        { note: 'C4', startBeat: 1.5, duration: 2.5, velocity: 0.22 },
        { note: 'E4', startBeat: 2, duration: 2, velocity: 0.25 },

        { note: 'A4', startBeat: 4, duration: 1.5, velocity: 0.32 },
        { note: 'B4', startBeat: 5.5, duration: 0.5, velocity: 0.28 },
        { note: 'C5', startBeat: 6, duration: 2, velocity: 0.35 },

        { note: 'E2', startBeat: 8, duration: 4, velocity: 0.22 },
        { note: 'B2', startBeat: 8.5, duration: 3.5, velocity: 0.18 },
        { note: 'E3', startBeat: 9, duration: 3, velocity: 0.2 },
        { note: 'G3', startBeat: 9.5, duration: 2.5, velocity: 0.22 },

        { note: 'B4', startBeat: 10, duration: 1, velocity: 0.3 },
        { note: 'A4', startBeat: 11, duration: 0.75, velocity: 0.28 },
        { note: 'G4', startBeat: 11.75, duration: 0.25, velocity: 0.22 },
        { note: 'E4', startBeat: 12, duration: 2, velocity: 0.32 },

        { note: 'A2', startBeat: 16, duration: 4, velocity: 0.25 },
        { note: 'E3', startBeat: 16, duration: 4, velocity: 0.2 },
        { note: 'A4', startBeat: 16, duration: 1, velocity: 0.35 },
        { note: 'C5', startBeat: 17, duration: 0.75, velocity: 0.38 },
        { note: 'E5', startBeat: 17.75, duration: 1.25, velocity: 0.42 },
        { note: 'D5', startBeat: 19, duration: 0.5, velocity: 0.35 },
        { note: 'C5', startBeat: 19.5, duration: 0.5, velocity: 0.32 },

        { note: 'D3', startBeat: 20, duration: 4, velocity: 0.22 },
        { note: 'F3', startBeat: 20, duration: 4, velocity: 0.2 },
        { note: 'B4', startBeat: 20, duration: 1.5, velocity: 0.32 },
        { note: 'A4', startBeat: 21.5, duration: 1, velocity: 0.3 },
        { note: 'G4', startBeat: 22.5, duration: 0.5, velocity: 0.25 },
        { note: 'F4', startBeat: 23, duration: 1, velocity: 0.28 },

        { note: 'E3', startBeat: 24, duration: 6, velocity: 0.22 },
        { note: 'B3', startBeat: 24, duration: 6, velocity: 0.2 },
        { note: 'E4', startBeat: 24, duration: 4, velocity: 0.28 },
        { note: 'G#4', startBeat: 25, duration: 3, velocity: 0.25 },
        { note: 'B4', startBeat: 26, duration: 2, velocity: 0.3 },
        { note: 'E5', startBeat: 28, duration: 3, velocity: 0.32 },
    ];

    // ============ MAIN THEME (32-80) ============
    const mainTheme = [
        { note: 'A3', startBeat: 32, duration: 4, velocity: 0.28 },
        { note: 'E4', startBeat: 32, duration: 4, velocity: 0.22 },
        { note: 'E5', startBeat: 32, duration: 1.5, velocity: 0.52 },
        { note: 'D5', startBeat: 33.5, duration: 0.5, velocity: 0.42 },
        { note: 'C5', startBeat: 34, duration: 1, velocity: 0.48 },
        { note: 'B4', startBeat: 35, duration: 0.5, velocity: 0.4 },
        { note: 'A4', startBeat: 35.5, duration: 0.5, velocity: 0.38 },

        { note: 'G3', startBeat: 36, duration: 4, velocity: 0.28 },
        { note: 'D4', startBeat: 36, duration: 4, velocity: 0.22 },
        { note: 'G4', startBeat: 36, duration: 0.75, velocity: 0.42 },
        { note: 'A4', startBeat: 36.75, duration: 0.25, velocity: 0.38 },
        { note: 'B4', startBeat: 37, duration: 1.5, velocity: 0.5 },
        { note: 'C5', startBeat: 38.5, duration: 1, velocity: 0.45 },
        { note: 'D5', startBeat: 39.5, duration: 0.5, velocity: 0.42 },

        { note: 'F3', startBeat: 40, duration: 4, velocity: 0.3 },
        { note: 'A3', startBeat: 40, duration: 4, velocity: 0.25 },
        { note: 'E5', startBeat: 40, duration: 0.75, velocity: 0.52 },
        { note: 'F5', startBeat: 40.75, duration: 0.25, velocity: 0.48 },
        { note: 'G5', startBeat: 41, duration: 1, velocity: 0.58 },
        { note: 'F5', startBeat: 42, duration: 0.5, velocity: 0.5 },
        { note: 'E5', startBeat: 42.5, duration: 0.5, velocity: 0.45 },
        { note: 'D5', startBeat: 43, duration: 1, velocity: 0.48 },

        { note: 'E3', startBeat: 44, duration: 4, velocity: 0.28 },
        { note: 'G#3', startBeat: 44, duration: 4, velocity: 0.22 },
        { note: 'C5', startBeat: 44, duration: 1.5, velocity: 0.5 },
        { note: 'B4', startBeat: 45.5, duration: 0.5, velocity: 0.42 },
        { note: 'A4', startBeat: 46, duration: 2, velocity: 0.52 },

        { note: 'A3', startBeat: 48, duration: 4, velocity: 0.3 },
        { note: 'E4', startBeat: 48, duration: 4, velocity: 0.25 },
        { note: 'C4', startBeat: 48, duration: 4, velocity: 0.2 },
        { note: 'E5', startBeat: 48, duration: 0.5, velocity: 0.55 },
        { note: 'F5', startBeat: 48.5, duration: 0.25, velocity: 0.48 },
        { note: 'E5', startBeat: 48.75, duration: 0.75, velocity: 0.52 },
        { note: 'D5', startBeat: 49.5, duration: 0.5, velocity: 0.45 },
        { note: 'C5', startBeat: 50, duration: 0.75, velocity: 0.5 },
        { note: 'D5', startBeat: 50.75, duration: 0.25, velocity: 0.42 },
        { note: 'B4', startBeat: 51, duration: 0.5, velocity: 0.45 },
        { note: 'A4', startBeat: 51.5, duration: 0.5, velocity: 0.42 },

        { note: 'G3', startBeat: 52, duration: 4, velocity: 0.3 },
        { note: 'B3', startBeat: 52, duration: 4, velocity: 0.22 },
        { note: 'D4', startBeat: 52, duration: 4, velocity: 0.2 },
        { note: 'G4', startBeat: 52, duration: 0.5, velocity: 0.45 },
        { note: 'B4', startBeat: 52.5, duration: 0.5, velocity: 0.5 },
        { note: 'D5', startBeat: 53, duration: 1, velocity: 0.55 },
        { note: 'C5', startBeat: 54, duration: 0.5, velocity: 0.48 },
        { note: 'B4', startBeat: 54.5, duration: 0.5, velocity: 0.45 },
        { note: 'C5', startBeat: 55, duration: 1, velocity: 0.5 },

        { note: 'F3', startBeat: 56, duration: 4, velocity: 0.32 },
        { note: 'A3', startBeat: 56, duration: 4, velocity: 0.28 },
        { note: 'C4', startBeat: 56, duration: 4, velocity: 0.22 },
        { note: 'E5', startBeat: 56, duration: 0.5, velocity: 0.58 },
        { note: 'G5', startBeat: 56.5, duration: 0.5, velocity: 0.62 },
        { note: 'A5', startBeat: 57, duration: 1, velocity: 0.68 },
        { note: 'G5', startBeat: 58, duration: 0.5, velocity: 0.58 },
        { note: 'F5', startBeat: 58.5, duration: 0.5, velocity: 0.52 },
        { note: 'E5', startBeat: 59, duration: 1, velocity: 0.55 },

        { note: 'E3', startBeat: 60, duration: 4, velocity: 0.3 },
        { note: 'G#3', startBeat: 60, duration: 4, velocity: 0.25 },
        { note: 'B3', startBeat: 60, duration: 4, velocity: 0.22 },
        { note: 'D5', startBeat: 60, duration: 1, velocity: 0.52 },
        { note: 'C5', startBeat: 61, duration: 0.5, velocity: 0.48 },
        { note: 'B4', startBeat: 61.5, duration: 0.5, velocity: 0.45 },
        { note: 'A4', startBeat: 62, duration: 2, velocity: 0.52 },

        { note: 'A3', startBeat: 64, duration: 8, velocity: 0.25 },
        { note: 'E4', startBeat: 64, duration: 8, velocity: 0.22 },
        { note: 'A4', startBeat: 64, duration: 2, velocity: 0.4 },
        { note: 'G4', startBeat: 66, duration: 1, velocity: 0.35 },
        { note: 'F4', startBeat: 67, duration: 1, velocity: 0.32 },
        { note: 'E4', startBeat: 68, duration: 2, velocity: 0.38 },
        { note: 'F4', startBeat: 70, duration: 0.5, velocity: 0.35 },
        { note: 'G4', startBeat: 70.5, duration: 0.5, velocity: 0.38 },
        { note: 'A4', startBeat: 71, duration: 1, velocity: 0.42 },

        { note: 'F3', startBeat: 72, duration: 8, velocity: 0.28 },
        { note: 'C4', startBeat: 72, duration: 8, velocity: 0.25 },
        { note: 'A4', startBeat: 72, duration: 1, velocity: 0.45 },
        { note: 'C5', startBeat: 73, duration: 1, velocity: 0.48 },
        { note: 'F5', startBeat: 74, duration: 2, velocity: 0.52 },
        { note: 'E5', startBeat: 76, duration: 1, velocity: 0.48 },
        { note: 'D5', startBeat: 77, duration: 1, velocity: 0.45 },
        { note: 'C5', startBeat: 78, duration: 2, velocity: 0.5 },
    ];

    // ============ EPIC DEVELOPMENT (80-224) - 144 BEATS! ============
    const development = [
        // ===============================================
        // PART 1: FUGATO (80-104) - Kontrapunkt barokowy
        // ===============================================

        // Subject exposition - Soprano
        { note: 'F3', startBeat: 80, duration: 8, velocity: 0.32 },
        { note: 'C4', startBeat: 80, duration: 8, velocity: 0.28 },
        { note: 'F5', startBeat: 80, duration: 1, velocity: 0.55 },
        { note: 'E5', startBeat: 81, duration: 0.5, velocity: 0.48 },
        { note: 'D5', startBeat: 81.5, duration: 0.5, velocity: 0.45 },
        { note: 'C5', startBeat: 82, duration: 1, velocity: 0.52 },
        { note: 'A4', startBeat: 83, duration: 0.5, velocity: 0.45 },
        { note: 'B4', startBeat: 83.5, duration: 0.5, velocity: 0.48 },
        { note: 'C5', startBeat: 84, duration: 2, velocity: 0.55 },
        { note: 'D5', startBeat: 86, duration: 1, velocity: 0.5 },
        { note: 'E5', startBeat: 87, duration: 1, velocity: 0.52 },

        // Answer - Alto (5th below)
        { note: 'C3', startBeat: 84, duration: 8, velocity: 0.3 },
        { note: 'G3', startBeat: 84, duration: 8, velocity: 0.25 },
        { note: 'C4', startBeat: 84, duration: 1, velocity: 0.42 },
        { note: 'B3', startBeat: 85, duration: 0.5, velocity: 0.38 },
        { note: 'A3', startBeat: 85.5, duration: 0.5, velocity: 0.35 },
        { note: 'G3', startBeat: 86, duration: 1, velocity: 0.4 },
        { note: 'E3', startBeat: 87, duration: 0.5, velocity: 0.35 },
        { note: 'F3', startBeat: 87.5, duration: 0.5, velocity: 0.38 },

        // Counter-subject
        { note: 'G3', startBeat: 88, duration: 4, velocity: 0.35 },
        { note: 'D4', startBeat: 88, duration: 4, velocity: 0.3 },
        { note: 'F5', startBeat: 88, duration: 0.75, velocity: 0.55 },
        { note: 'G5', startBeat: 88.75, duration: 0.25, velocity: 0.5 },
        { note: 'A5', startBeat: 89, duration: 0.5, velocity: 0.58 },
        { note: 'G5', startBeat: 89.5, duration: 0.5, velocity: 0.52 },
        { note: 'F5', startBeat: 90, duration: 0.5, velocity: 0.5 },
        { note: 'E5', startBeat: 90.5, duration: 0.5, velocity: 0.48 },
        { note: 'D5', startBeat: 91, duration: 1, velocity: 0.52 },

        // Stretto - overlapping entries
        { note: 'A3', startBeat: 92, duration: 4, velocity: 0.35 },
        { note: 'E4', startBeat: 92, duration: 4, velocity: 0.3 },
        // Voice 1
        { note: 'E5', startBeat: 92, duration: 0.75, velocity: 0.55 },
        { note: 'D5', startBeat: 92.75, duration: 0.25, velocity: 0.48 },
        { note: 'C5', startBeat: 93, duration: 0.5, velocity: 0.5 },
        // Voice 2 enters early!
        { note: 'A4', startBeat: 93, duration: 0.75, velocity: 0.42 },
        { note: 'G4', startBeat: 93.75, duration: 0.25, velocity: 0.38 },
        { note: 'F4', startBeat: 94, duration: 0.5, velocity: 0.4 },
        // Voices converge
        { note: 'B4', startBeat: 93.5, duration: 0.5, velocity: 0.45 },
        { note: 'A4', startBeat: 94, duration: 0.5, velocity: 0.48 },
        { note: 'G4', startBeat: 94.5, duration: 0.5, velocity: 0.45 },
        { note: 'E4', startBeat: 95, duration: 1, velocity: 0.5 },

        // Episode 1 - Free counterpoint
        { note: 'D3', startBeat: 96, duration: 4, velocity: 0.35 },
        { note: 'F3', startBeat: 96, duration: 4, velocity: 0.3 },
        { note: 'A3', startBeat: 96, duration: 4, velocity: 0.28 },
        { note: 'D5', startBeat: 96, duration: 0.5, velocity: 0.52 },
        { note: 'E5', startBeat: 96.5, duration: 0.5, velocity: 0.55 },
        { note: 'F5', startBeat: 97, duration: 0.75, velocity: 0.58 },
        { note: 'E5', startBeat: 97.75, duration: 0.25, velocity: 0.52 },
        { note: 'D5', startBeat: 98, duration: 0.5, velocity: 0.5 },
        { note: 'C5', startBeat: 98.5, duration: 0.5, velocity: 0.48 },
        { note: 'B4', startBeat: 99, duration: 0.5, velocity: 0.45 },
        { note: 'A4', startBeat: 99.5, duration: 0.5, velocity: 0.48 },

        // Final fugato statement
        { note: 'E3', startBeat: 100, duration: 4, velocity: 0.38 },
        { note: 'B3', startBeat: 100, duration: 4, velocity: 0.32 },
        { note: 'G#4', startBeat: 100, duration: 4, velocity: 0.28 },
        { note: 'E5', startBeat: 100, duration: 1, velocity: 0.58 },
        { note: 'D5', startBeat: 101, duration: 0.5, velocity: 0.52 },
        { note: 'C5', startBeat: 101.5, duration: 0.5, velocity: 0.48 },
        { note: 'B4', startBeat: 102, duration: 1, velocity: 0.55 },
        { note: 'A4', startBeat: 103, duration: 1, velocity: 0.52 },

        // ===============================================
        // PART 2: CATCHY HOOK SEQUENCE (104-128)
        // ===============================================

        // Super chwytliwy motyw - zapamiętywalna sekwencja!
        { note: 'F3', startBeat: 104, duration: 4, velocity: 0.4 },
        { note: 'A3', startBeat: 104, duration: 4, velocity: 0.35 },
        { note: 'C4', startBeat: 104, duration: 4, velocity: 0.3 },
        // Hook: F-G-A-C-A (super catchy!)
        { note: 'F5', startBeat: 104, duration: 0.5, velocity: 0.6 },
        { note: 'G5', startBeat: 104.5, duration: 0.5, velocity: 0.62 },
        { note: 'A5', startBeat: 105, duration: 0.75, velocity: 0.68 },
        { note: 'C6', startBeat: 105.75, duration: 0.5, velocity: 0.72 },
        { note: 'A5', startBeat: 106.25, duration: 0.75, velocity: 0.65 },
        { note: 'G5', startBeat: 107, duration: 0.5, velocity: 0.58 },
        { note: 'F5', startBeat: 107.5, duration: 0.5, velocity: 0.55 },

        // Hook odpowiedź - transpozycja w górę
        { note: 'G3', startBeat: 108, duration: 4, velocity: 0.42 },
        { note: 'B3', startBeat: 108, duration: 4, velocity: 0.38 },
        { note: 'D4', startBeat: 108, duration: 4, velocity: 0.32 },
        { note: 'G5', startBeat: 108, duration: 0.5, velocity: 0.62 },
        { note: 'A5', startBeat: 108.5, duration: 0.5, velocity: 0.65 },
        { note: 'B5', startBeat: 109, duration: 0.75, velocity: 0.7 },
        { note: 'D6', startBeat: 109.75, duration: 0.5, velocity: 0.75 },
        { note: 'B5', startBeat: 110.25, duration: 0.75, velocity: 0.68 },
        { note: 'A5', startBeat: 111, duration: 0.5, velocity: 0.6 },
        { note: 'G5', startBeat: 111.5, duration: 0.5, velocity: 0.58 },

        // Hook z ozdobnikami
        { note: 'A3', startBeat: 112, duration: 4, velocity: 0.45 },
        { note: 'C4', startBeat: 112, duration: 4, velocity: 0.4 },
        { note: 'E4', startBeat: 112, duration: 4, velocity: 0.35 },
        { note: 'A5', startBeat: 112, duration: 0.25, velocity: 0.65 },
        { note: 'G#5', startBeat: 112.25, duration: 0.25, velocity: 0.6 },
        { note: 'A5', startBeat: 112.5, duration: 0.5, velocity: 0.68 },
        { note: 'B5', startBeat: 113, duration: 0.5, velocity: 0.7 },
        { note: 'C6', startBeat: 113.5, duration: 0.75, velocity: 0.75 },
        { note: 'E6', startBeat: 114.25, duration: 0.5, velocity: 0.8 },
        { note: 'C6', startBeat: 114.75, duration: 0.5, velocity: 0.72 },
        { note: 'B5', startBeat: 115.25, duration: 0.75, velocity: 0.68 },

        // Call and response
        { note: 'F3', startBeat: 116, duration: 2, velocity: 0.42 },
        { note: 'A3', startBeat: 116, duration: 2, velocity: 0.38 },
        { note: 'A5', startBeat: 116, duration: 0.75, velocity: 0.65 },
        { note: 'G5', startBeat: 116.75, duration: 0.25, velocity: 0.58 },
        { note: 'F5', startBeat: 117, duration: 0.5, velocity: 0.6 },
        { note: 'E5', startBeat: 117.5, duration: 0.5, velocity: 0.55 },

        { note: 'E3', startBeat: 118, duration: 2, velocity: 0.42 },
        { note: 'G#3', startBeat: 118, duration: 2, velocity: 0.38 },
        { note: 'E5', startBeat: 118, duration: 0.75, velocity: 0.58 },
        { note: 'D5', startBeat: 118.75, duration: 0.25, velocity: 0.52 },
        { note: 'C5', startBeat: 119, duration: 0.5, velocity: 0.55 },
        { note: 'B4', startBeat: 119.5, duration: 0.5, velocity: 0.5 },

        // Syncopated hook variation
        { note: 'A3', startBeat: 120, duration: 4, velocity: 0.45 },
        { note: 'E4', startBeat: 120, duration: 4, velocity: 0.4 },
        // Synkopy!
        { note: 'A4', startBeat: 120, duration: 0.25, velocity: 0.55 },
        { note: 'C5', startBeat: 120.5, duration: 0.25, velocity: 0.58 },
        { note: 'E5', startBeat: 121, duration: 0.25, velocity: 0.6 },
        { note: 'A5', startBeat: 121.5, duration: 0.75, velocity: 0.68 },
        { note: 'G5', startBeat: 122.25, duration: 0.25, velocity: 0.62 },
        { note: 'A5', startBeat: 122.5, duration: 0.25, velocity: 0.65 },
        { note: 'C6', startBeat: 123, duration: 0.5, velocity: 0.72 },
        { note: 'B5', startBeat: 123.5, duration: 0.5, velocity: 0.68 },

        // Hook finale
        { note: 'D3', startBeat: 124, duration: 4, velocity: 0.45 },
        { note: 'F3', startBeat: 124, duration: 4, velocity: 0.4 },
        { note: 'A3', startBeat: 124, duration: 4, velocity: 0.35 },
        { note: 'A5', startBeat: 124, duration: 1, velocity: 0.7 },
        { note: 'F5', startBeat: 125, duration: 0.5, velocity: 0.62 },
        { note: 'D5', startBeat: 125.5, duration: 0.5, velocity: 0.58 },
        { note: 'F5', startBeat: 126, duration: 0.5, velocity: 0.6 },
        { note: 'A5', startBeat: 126.5, duration: 0.5, velocity: 0.65 },
        { note: 'D6', startBeat: 127, duration: 1, velocity: 0.75 },

        // ===============================================
        // PART 3: VIRTUOSIC ARPEGGIOS (128-152)
        // ===============================================

        // Cascading arpeggios - F major
        { note: 'F2', startBeat: 128, duration: 4, velocity: 0.45 },
        { note: 'F3', startBeat: 128, duration: 0.125, velocity: 0.42 },
        { note: 'A3', startBeat: 128.125, duration: 0.125, velocity: 0.44 },
        { note: 'C4', startBeat: 128.25, duration: 0.125, velocity: 0.46 },
        { note: 'F4', startBeat: 128.375, duration: 0.125, velocity: 0.48 },
        { note: 'A4', startBeat: 128.5, duration: 0.125, velocity: 0.5 },
        { note: 'C5', startBeat: 128.625, duration: 0.125, velocity: 0.52 },
        { note: 'F5', startBeat: 128.75, duration: 0.125, velocity: 0.55 },
        { note: 'A5', startBeat: 128.875, duration: 0.125, velocity: 0.58 },
        { note: 'C6', startBeat: 129, duration: 0.5, velocity: 0.65 },
        { note: 'A5', startBeat: 129.5, duration: 0.125, velocity: 0.55 },
        { note: 'F5', startBeat: 129.625, duration: 0.125, velocity: 0.52 },
        { note: 'C5', startBeat: 129.75, duration: 0.125, velocity: 0.5 },
        { note: 'A4', startBeat: 129.875, duration: 0.125, velocity: 0.48 },
        { note: 'F4', startBeat: 130, duration: 0.25, velocity: 0.45 },

        // G minor arpeggio
        { note: 'G2', startBeat: 131, duration: 3, velocity: 0.48 },
        { note: 'G3', startBeat: 131, duration: 0.125, velocity: 0.45 },
        { note: 'Bb3', startBeat: 131.125, duration: 0.125, velocity: 0.47 },
        { note: 'D4', startBeat: 131.25, duration: 0.125, velocity: 0.49 },
        { note: 'G4', startBeat: 131.375, duration: 0.125, velocity: 0.51 },
        { note: 'Bb4', startBeat: 131.5, duration: 0.125, velocity: 0.53 },
        { note: 'D5', startBeat: 131.625, duration: 0.125, velocity: 0.56 },
        { note: 'G5', startBeat: 131.75, duration: 0.125, velocity: 0.59 },
        { note: 'Bb5', startBeat: 131.875, duration: 0.125, velocity: 0.62 },
        { note: 'D6', startBeat: 132, duration: 0.5, velocity: 0.7 },
        { note: 'Bb5', startBeat: 132.5, duration: 0.125, velocity: 0.58 },
        { note: 'G5', startBeat: 132.625, duration: 0.125, velocity: 0.55 },
        { note: 'D5', startBeat: 132.75, duration: 0.25, velocity: 0.52 },

        // A minor arpeggio - building intensity
        { note: 'A2', startBeat: 134, duration: 4, velocity: 0.5 },
        { note: 'A3', startBeat: 134, duration: 0.125, velocity: 0.48 },
        { note: 'C4', startBeat: 134.125, duration: 0.125, velocity: 0.5 },
        { note: 'E4', startBeat: 134.25, duration: 0.125, velocity: 0.52 },
        { note: 'A4', startBeat: 134.375, duration: 0.125, velocity: 0.55 },
        { note: 'C5', startBeat: 134.5, duration: 0.125, velocity: 0.58 },
        { note: 'E5', startBeat: 134.625, duration: 0.125, velocity: 0.6 },
        { note: 'A5', startBeat: 134.75, duration: 0.125, velocity: 0.65 },
        { note: 'C6', startBeat: 134.875, duration: 0.125, velocity: 0.68 },
        { note: 'E6', startBeat: 135, duration: 0.75, velocity: 0.75 },
        { note: 'C6', startBeat: 135.75, duration: 0.125, velocity: 0.62 },
        { note: 'A5', startBeat: 135.875, duration: 0.125, velocity: 0.58 },
        { note: 'E5', startBeat: 136, duration: 0.25, velocity: 0.55 },

        // Broken chord patterns
        { note: 'D3', startBeat: 137, duration: 3, velocity: 0.48 },
        { note: 'F3', startBeat: 137, duration: 3, velocity: 0.42 },
        { note: 'D5', startBeat: 137, duration: 0.25, velocity: 0.55 },
        { note: 'A5', startBeat: 137.25, duration: 0.25, velocity: 0.58 },
        { note: 'F5', startBeat: 137.5, duration: 0.25, velocity: 0.55 },
        { note: 'D5', startBeat: 137.75, duration: 0.25, velocity: 0.52 },
        { note: 'A5', startBeat: 138, duration: 0.25, velocity: 0.58 },
        { note: 'F5', startBeat: 138.25, duration: 0.25, velocity: 0.55 },
        { note: 'D5', startBeat: 138.5, duration: 0.25, velocity: 0.52 },
        { note: 'A4', startBeat: 138.75, duration: 0.25, velocity: 0.48 },
        { note: 'F5', startBeat: 139, duration: 0.5, velocity: 0.55 },
        { note: 'D5', startBeat: 139.5, duration: 0.5, velocity: 0.52 },

        // Cross-hand arpeggio effect
        { note: 'E2', startBeat: 140, duration: 4, velocity: 0.52 },
        { note: 'B2', startBeat: 140, duration: 4, velocity: 0.48 },
        { note: 'E3', startBeat: 140, duration: 0.25, velocity: 0.45 },
        { note: 'G#4', startBeat: 140.25, duration: 0.25, velocity: 0.55 },
        { note: 'B3', startBeat: 140.5, duration: 0.25, velocity: 0.48 },
        { note: 'E5', startBeat: 140.75, duration: 0.25, velocity: 0.6 },
        { note: 'G#3', startBeat: 141, duration: 0.25, velocity: 0.5 },
        { note: 'B4', startBeat: 141.25, duration: 0.25, velocity: 0.58 },
        { note: 'E4', startBeat: 141.5, duration: 0.25, velocity: 0.52 },
        { note: 'G#5', startBeat: 141.75, duration: 0.25, velocity: 0.65 },
        { note: 'B4', startBeat: 142, duration: 0.25, velocity: 0.55 },
        { note: 'E5', startBeat: 142.25, duration: 0.25, velocity: 0.6 },
        { note: 'G#5', startBeat: 142.5, duration: 0.25, velocity: 0.65 },
        { note: 'B5', startBeat: 142.75, duration: 0.25, velocity: 0.68 },
        { note: 'E6', startBeat: 143, duration: 1, velocity: 0.75 },

        // Descending waterfall
        { note: 'A3', startBeat: 144, duration: 4, velocity: 0.5 },
        { note: 'E4', startBeat: 144, duration: 4, velocity: 0.45 },
        { note: 'A5', startBeat: 144, duration: 0.125, velocity: 0.65 },
        { note: 'G5', startBeat: 144.125, duration: 0.125, velocity: 0.62 },
        { note: 'F5', startBeat: 144.25, duration: 0.125, velocity: 0.6 },
        { note: 'E5', startBeat: 144.375, duration: 0.125, velocity: 0.58 },
        { note: 'D5', startBeat: 144.5, duration: 0.125, velocity: 0.55 },
        { note: 'C5', startBeat: 144.625, duration: 0.125, velocity: 0.52 },
        { note: 'B4', startBeat: 144.75, duration: 0.125, velocity: 0.5 },
        { note: 'A4', startBeat: 144.875, duration: 0.125, velocity: 0.48 },
        { note: 'G4', startBeat: 145, duration: 0.125, velocity: 0.45 },
        { note: 'F4', startBeat: 145.125, duration: 0.125, velocity: 0.42 },
        { note: 'E4', startBeat: 145.25, duration: 0.125, velocity: 0.4 },
        { note: 'D4', startBeat: 145.375, duration: 0.125, velocity: 0.38 },
        { note: 'C4', startBeat: 145.5, duration: 0.25, velocity: 0.42 },
        { note: 'E4', startBeat: 145.75, duration: 0.25, velocity: 0.45 },
        { note: 'A4', startBeat: 146, duration: 0.5, velocity: 0.52 },
        { note: 'C5', startBeat: 146.5, duration: 0.5, velocity: 0.55 },
        { note: 'E5', startBeat: 147, duration: 1, velocity: 0.6 },

        // Double octave run
        { note: 'F2', startBeat: 148, duration: 4, velocity: 0.55 },
        { note: 'C4', startBeat: 148, duration: 0.25, velocity: 0.5 },
        { note: 'C5', startBeat: 148, duration: 0.25, velocity: 0.55 },
        { note: 'D4', startBeat: 148.25, duration: 0.25, velocity: 0.52 },
        { note: 'D5', startBeat: 148.25, duration: 0.25, velocity: 0.58 },
        { note: 'E4', startBeat: 148.5, duration: 0.25, velocity: 0.55 },
        { note: 'E5', startBeat: 148.5, duration: 0.25, velocity: 0.6 },
        { note: 'F4', startBeat: 148.75, duration: 0.25, velocity: 0.58 },
        { note: 'F5', startBeat: 148.75, duration: 0.25, velocity: 0.62 },
        { note: 'G4', startBeat: 149, duration: 0.25, velocity: 0.6 },
        { note: 'G5', startBeat: 149, duration: 0.25, velocity: 0.65 },
        { note: 'A4', startBeat: 149.25, duration: 0.25, velocity: 0.62 },
        { note: 'A5', startBeat: 149.25, duration: 0.25, velocity: 0.68 },
        { note: 'B4', startBeat: 149.5, duration: 0.25, velocity: 0.65 },
        { note: 'B5', startBeat: 149.5, duration: 0.25, velocity: 0.7 },
        { note: 'C5', startBeat: 149.75, duration: 0.5, velocity: 0.68 },
        { note: 'C6', startBeat: 149.75, duration: 0.5, velocity: 0.75 },
        { note: 'A5', startBeat: 150.25, duration: 0.25, velocity: 0.65 },
        { note: 'F5', startBeat: 150.5, duration: 0.5, velocity: 0.62 },
        { note: 'C5', startBeat: 151, duration: 1, velocity: 0.6 },

        // ===============================================
        // PART 4: CHROMATIC PASSION (152-176)
        // ===============================================

        // Chromatic descent - dramatic
        { note: 'A3', startBeat: 152, duration: 4, velocity: 0.5 },
        { note: 'E4', startBeat: 152, duration: 4, velocity: 0.45 },
        { note: 'A5', startBeat: 152, duration: 0.5, velocity: 0.68 },
        { note: 'G#5', startBeat: 152.5, duration: 0.5, velocity: 0.65 },
        { note: 'G5', startBeat: 153, duration: 0.5, velocity: 0.62 },
        { note: 'F#5', startBeat: 153.5, duration: 0.5, velocity: 0.6 },
        { note: 'F5', startBeat: 154, duration: 0.5, velocity: 0.62 },
        { note: 'E5', startBeat: 154.5, duration: 0.5, velocity: 0.58 },
        { note: 'D#5', startBeat: 155, duration: 0.5, velocity: 0.55 },
        { note: 'D5', startBeat: 155.5, duration: 0.5, velocity: 0.58 },

        // Chromatic ascent response
        { note: 'D3', startBeat: 156, duration: 4, velocity: 0.48 },
        { note: 'F3', startBeat: 156, duration: 4, velocity: 0.42 },
        { note: 'C5', startBeat: 156, duration: 0.5, velocity: 0.55 },
        { note: 'C#5', startBeat: 156.5, duration: 0.5, velocity: 0.58 },
        { note: 'D5', startBeat: 157, duration: 0.5, velocity: 0.6 },
        { note: 'D#5', startBeat: 157.5, duration: 0.5, velocity: 0.62 },
        { note: 'E5', startBeat: 158, duration: 0.5, velocity: 0.65 },
        { note: 'F5', startBeat: 158.5, duration: 0.5, velocity: 0.68 },
        { note: 'F#5', startBeat: 159, duration: 0.5, velocity: 0.7 },
        { note: 'G5', startBeat: 159.5, duration: 0.5, velocity: 0.72 },

        // Chromatic thirds
        { note: 'G3', startBeat: 160, duration: 4, velocity: 0.52 },
        { note: 'B3', startBeat: 160, duration: 4, velocity: 0.48 },
        { note: 'G5', startBeat: 160, duration: 0.375, velocity: 0.68 },
        { note: 'B5', startBeat: 160, duration: 0.375, velocity: 0.65 },
        { note: 'F#5', startBeat: 160.375, duration: 0.375, velocity: 0.65 },
        { note: 'A#5', startBeat: 160.375, duration: 0.375, velocity: 0.62 },
        { note: 'F5', startBeat: 160.75, duration: 0.375, velocity: 0.62 },
        { note: 'A5', startBeat: 160.75, duration: 0.375, velocity: 0.6 },
        { note: 'E5', startBeat: 161.125, duration: 0.375, velocity: 0.6 },
        { note: 'G#5', startBeat: 161.125, duration: 0.375, velocity: 0.58 },
        { note: 'D#5', startBeat: 161.5, duration: 0.5, velocity: 0.58 },
        { note: 'G5', startBeat: 161.5, duration: 0.5, velocity: 0.55 },
        { note: 'D5', startBeat: 162, duration: 0.5, velocity: 0.55 },
        { note: 'F#5', startBeat: 162, duration: 0.5, velocity: 0.52 },
        { note: 'C#5', startBeat: 162.5, duration: 0.5, velocity: 0.52 },
        { note: 'F5', startBeat: 162.5, duration: 0.5, velocity: 0.5 },
        { note: 'C5', startBeat: 163, duration: 1, velocity: 0.55 },
        { note: 'E5', startBeat: 163, duration: 1, velocity: 0.52 },

        // Augmented chord drama
        { note: 'C3', startBeat: 164, duration: 4, velocity: 0.52 },
        { note: 'E3', startBeat: 164, duration: 4, velocity: 0.48 },
        { note: 'G#3', startBeat: 164, duration: 4, velocity: 0.45 },
        { note: 'C5', startBeat: 164, duration: 0.5, velocity: 0.6 },
        { note: 'E5', startBeat: 164.5, duration: 0.5, velocity: 0.62 },
        { note: 'G#5', startBeat: 165, duration: 0.5, velocity: 0.65 },
        { note: 'C6', startBeat: 165.5, duration: 1, velocity: 0.72 },
        { note: 'B5', startBeat: 166.5, duration: 0.5, velocity: 0.65 },
        { note: 'G#5', startBeat: 167, duration: 0.5, velocity: 0.6 },
        { note: 'E5', startBeat: 167.5, duration: 0.5, velocity: 0.58 },

        // Diminished tension
        { note: 'D3', startBeat: 168, duration: 4, velocity: 0.55 },
        { note: 'F3', startBeat: 168, duration: 4, velocity: 0.5 },
        { note: 'G#3', startBeat: 168, duration: 4, velocity: 0.45 },
        { note: 'B3', startBeat: 168, duration: 4, velocity: 0.42 },
        { note: 'D5', startBeat: 168, duration: 0.5, velocity: 0.62 },
        { note: 'F5', startBeat: 168.5, duration: 0.5, velocity: 0.65 },
        { note: 'G#5', startBeat: 169, duration: 0.5, velocity: 0.68 },
        { note: 'B5', startBeat: 169.5, duration: 0.5, velocity: 0.7 },
        { note: 'D6', startBeat: 170, duration: 1, velocity: 0.75 },
        { note: 'B5', startBeat: 171, duration: 0.5, velocity: 0.68 },
        { note: 'G#5', startBeat: 171.5, duration: 0.5, velocity: 0.62 },

        // Resolution preparation
        { note: 'E3', startBeat: 172, duration: 4, velocity: 0.55 },
        { note: 'B3', startBeat: 172, duration: 4, velocity: 0.5 },
        { note: 'E4', startBeat: 172, duration: 4, velocity: 0.45 },
        { note: 'G#4', startBeat: 172, duration: 4, velocity: 0.42 },
        { note: 'E5', startBeat: 172, duration: 1, velocity: 0.65 },
        { note: 'D5', startBeat: 173, duration: 0.5, velocity: 0.58 },
        { note: 'C5', startBeat: 173.5, duration: 0.5, velocity: 0.55 },
        { note: 'B4', startBeat: 174, duration: 1, velocity: 0.6 },
        { note: 'C5', startBeat: 175, duration: 0.5, velocity: 0.58 },
        { note: 'D5', startBeat: 175.5, duration: 0.5, velocity: 0.6 },

        // ===============================================
        // PART 5: HEMIOLA & POLYRHYTHM (176-200)
        // ===============================================

        // 3 against 2
        { note: 'A2', startBeat: 176, duration: 4, velocity: 0.5 },
        { note: 'E3', startBeat: 176, duration: 4, velocity: 0.45 },
        // Right hand in 3
        { note: 'E5', startBeat: 176, duration: 0.667, velocity: 0.62 },
        { note: 'C5', startBeat: 176.667, duration: 0.667, velocity: 0.58 },
        { note: 'A4', startBeat: 177.333, duration: 0.667, velocity: 0.55 },
        { note: 'E5', startBeat: 178, duration: 0.667, velocity: 0.6 },
        { note: 'C5', startBeat: 178.667, duration: 0.667, velocity: 0.55 },
        { note: 'A4', startBeat: 179.333, duration: 0.667, velocity: 0.52 },
        // Left hand in 2
        { note: 'A3', startBeat: 176, duration: 0.5, velocity: 0.42 },
        { note: 'C4', startBeat: 176.5, duration: 0.5, velocity: 0.45 },
        { note: 'E4', startBeat: 177, duration: 0.5, velocity: 0.48 },
        { note: 'A4', startBeat: 177.5, duration: 0.5, velocity: 0.45 },
        { note: 'E4', startBeat: 178, duration: 0.5, velocity: 0.42 },
        { note: 'C4', startBeat: 178.5, duration: 0.5, velocity: 0.4 },
        { note: 'A3', startBeat: 179, duration: 0.5, velocity: 0.42 },
        { note: 'E4', startBeat: 179.5, duration: 0.5, velocity: 0.45 },

        // Hemiola intensifies
        { note: 'F3', startBeat: 180, duration: 4, velocity: 0.52 },
        { note: 'A3', startBeat: 180, duration: 4, velocity: 0.48 },
        { note: 'C4', startBeat: 180, duration: 4, velocity: 0.42 },
        { note: 'F5', startBeat: 180, duration: 0.667, velocity: 0.65 },
        { note: 'D5', startBeat: 180.667, duration: 0.667, velocity: 0.62 },
        { note: 'A4', startBeat: 181.333, duration: 0.667, velocity: 0.58 },
        { note: 'F5', startBeat: 182, duration: 0.667, velocity: 0.68 },
        { note: 'D5', startBeat: 182.667, duration: 0.667, velocity: 0.65 },
        { note: 'A4', startBeat: 183.333, duration: 0.667, velocity: 0.6 },

        // Polyrhythmic climax 4:3
        { note: 'G3', startBeat: 184, duration: 4, velocity: 0.55 },
        { note: 'B3', startBeat: 184, duration: 4, velocity: 0.5 },
        { note: 'D4', startBeat: 184, duration: 4, velocity: 0.45 },
        // 4 in right hand
        { note: 'G5', startBeat: 184, duration: 0.5, velocity: 0.68 },
        { note: 'F5', startBeat: 184.5, duration: 0.5, velocity: 0.65 },
        { note: 'E5', startBeat: 185, duration: 0.5, velocity: 0.62 },
        { note: 'D5', startBeat: 185.5, duration: 0.5, velocity: 0.6 },
        { note: 'C5', startBeat: 186, duration: 0.5, velocity: 0.62 },
        { note: 'D5', startBeat: 186.5, duration: 0.5, velocity: 0.65 },
        { note: 'E5', startBeat: 187, duration: 0.5, velocity: 0.68 },
        { note: 'F5', startBeat: 187.5, duration: 0.5, velocity: 0.7 },

        // 5:4 polyrhythm - ultimate complexity
        { note: 'E3', startBeat: 188, duration: 4, velocity: 0.55 },
        { note: 'G#3', startBeat: 188, duration: 4, velocity: 0.5 },
        { note: 'B3', startBeat: 188, duration: 4, velocity: 0.45 },
        // 5 notes over 4 beats
        { note: 'E5', startBeat: 188, duration: 0.8, velocity: 0.65 },
        { note: 'G#5', startBeat: 188.8, duration: 0.8, velocity: 0.68 },
        { note: 'B5', startBeat: 189.6, duration: 0.8, velocity: 0.72 },
        { note: 'E6', startBeat: 190.4, duration: 0.8, velocity: 0.78 },
        { note: 'B5', startBeat: 191.2, duration: 0.8, velocity: 0.72 },

        // Resolution of polyrhythm
        { note: 'A2', startBeat: 192, duration: 4, velocity: 0.55 },
        { note: 'E3', startBeat: 192, duration: 4, velocity: 0.5 },
        { note: 'A3', startBeat: 192, duration: 4, velocity: 0.45 },
        { note: 'C4', startBeat: 192, duration: 4, velocity: 0.4 },
        { note: 'A5', startBeat: 192, duration: 2, velocity: 0.75 },
        { note: 'G5', startBeat: 194, duration: 0.5, velocity: 0.65 },
        { note: 'F5', startBeat: 194.5, duration: 0.5, velocity: 0.62 },
        { note: 'E5', startBeat: 195, duration: 1, velocity: 0.68 },

        // ===============================================
        // PART 6: CANON & INVERSION (196-224)
        // ===============================================

        // Canon at the octave
        { note: 'A3', startBeat: 196, duration: 8, velocity: 0.5 },
        { note: 'E4', startBeat: 196, duration: 8, velocity: 0.45 },
        // Leader
        { note: 'E5', startBeat: 196, duration: 0.75, velocity: 0.62 },
        { note: 'F5', startBeat: 196.75, duration: 0.25, velocity: 0.55 },
        { note: 'G5', startBeat: 197, duration: 0.5, velocity: 0.58 },
        { note: 'A5', startBeat: 197.5, duration: 0.5, velocity: 0.6 },
        { note: 'B5', startBeat: 198, duration: 1, velocity: 0.65 },
        { note: 'A5', startBeat: 199, duration: 0.5, velocity: 0.58 },
        { note: 'G5', startBeat: 199.5, duration: 0.5, velocity: 0.55 },
        // Follower (2 beats later, octave below)
        { note: 'E4', startBeat: 198, duration: 0.75, velocity: 0.48 },
        { note: 'F4', startBeat: 198.75, duration: 0.25, velocity: 0.42 },
        { note: 'G4', startBeat: 199, duration: 0.5, velocity: 0.45 },
        { note: 'A4', startBeat: 199.5, duration: 0.5, velocity: 0.48 },
        { note: 'B4', startBeat: 200, duration: 1, velocity: 0.52 },
        { note: 'A4', startBeat: 201, duration: 0.5, velocity: 0.48 },
        { note: 'G4', startBeat: 201.5, duration: 0.5, velocity: 0.45 },

        // Leader continues
        { note: 'F5', startBeat: 200, duration: 0.75, velocity: 0.6 },
        { note: 'E5', startBeat: 200.75, duration: 0.25, velocity: 0.55 },
        { note: 'D5', startBeat: 201, duration: 0.5, velocity: 0.52 },
        { note: 'C5', startBeat: 201.5, duration: 0.5, velocity: 0.55 },
        { note: 'B4', startBeat: 202, duration: 1, velocity: 0.58 },
        { note: 'C5', startBeat: 203, duration: 0.5, velocity: 0.55 },
        { note: 'D5', startBeat: 203.5, duration: 0.5, velocity: 0.58 },

        // Follower continues
        { note: 'F4', startBeat: 202, duration: 0.75, velocity: 0.48 },
        { note: 'E4', startBeat: 202.75, duration: 0.25, velocity: 0.42 },
        { note: 'D4', startBeat: 203, duration: 0.5, velocity: 0.4 },
        { note: 'C4', startBeat: 203.5, duration: 0.5, velocity: 0.42 },

        // Theme inversion
        { note: 'F3', startBeat: 204, duration: 4, velocity: 0.52 },
        { note: 'A3', startBeat: 204, duration: 4, velocity: 0.48 },
        { note: 'C4', startBeat: 204, duration: 4, velocity: 0.42 },
        // Original: E-D-C-B-A (down)
        // Inverted: E-F-G-A-B (up)
        { note: 'E5', startBeat: 204, duration: 1.5, velocity: 0.62 },
        { note: 'F5', startBeat: 205.5, duration: 0.5, velocity: 0.58 },
        { note: 'G5', startBeat: 206, duration: 1, velocity: 0.6 },
        { note: 'A5', startBeat: 207, duration: 0.5, velocity: 0.65 },
        { note: 'B5', startBeat: 207.5, duration: 0.5, velocity: 0.68 },

        // Inverted theme continues
        { note: 'G3', startBeat: 208, duration: 4, velocity: 0.55 },
        { note: 'B3', startBeat: 208, duration: 4, velocity: 0.5 },
        { note: 'D4', startBeat: 208, duration: 4, velocity: 0.45 },
        { note: 'C6', startBeat: 208, duration: 1, velocity: 0.72 },
        { note: 'B5', startBeat: 209, duration: 0.5, velocity: 0.65 },
        { note: 'A5', startBeat: 209.5, duration: 0.5, velocity: 0.62 },
        { note: 'G5', startBeat: 210, duration: 0.5, velocity: 0.6 },
        { note: 'F5', startBeat: 210.5, duration: 0.5, velocity: 0.58 },
        { note: 'E5', startBeat: 211, duration: 1, velocity: 0.62 },

        // Double counterpoint
        { note: 'A3', startBeat: 212, duration: 4, velocity: 0.55 },
        { note: 'E4', startBeat: 212, duration: 4, velocity: 0.5 },
        // Voice A
        { note: 'A5', startBeat: 212, duration: 0.5, velocity: 0.65 },
        { note: 'G5', startBeat: 212.5, duration: 0.5, velocity: 0.62 },
        { note: 'F5', startBeat: 213, duration: 0.5, velocity: 0.6 },
        { note: 'E5', startBeat: 213.5, duration: 0.5, velocity: 0.58 },
        // Voice B (contrary motion)
        { note: 'C4', startBeat: 212, duration: 0.5, velocity: 0.45 },
        { note: 'D4', startBeat: 212.5, duration: 0.5, velocity: 0.48 },
        { note: 'E4', startBeat: 213, duration: 0.5, velocity: 0.5 },
        { note: 'F4', startBeat: 213.5, duration: 0.5, velocity: 0.52 },
        { note: 'D5', startBeat: 214, duration: 1, velocity: 0.6 },
        { note: 'G4', startBeat: 214, duration: 1, velocity: 0.52 },
        { note: 'C5', startBeat: 215, duration: 0.5, velocity: 0.55 },
        { note: 'A4', startBeat: 215, duration: 0.5, velocity: 0.5 },
        { note: 'B4', startBeat: 215.5, duration: 0.5, velocity: 0.52 },
        { note: 'B4', startBeat: 215.5, duration: 0.5, velocity: 0.48 },

        // Final development build
        { note: 'E2', startBeat: 216, duration: 8, velocity: 0.58 },
        { note: 'B2', startBeat: 216, duration: 8, velocity: 0.52 },
        { note: 'E3', startBeat: 216, duration: 8, velocity: 0.48 },
        { note: 'G#3', startBeat: 216, duration: 8, velocity: 0.42 },
        { note: 'E5', startBeat: 216, duration: 0.25, velocity: 0.62 },
        { note: 'G#5', startBeat: 216.25, duration: 0.25, velocity: 0.65 },
        { note: 'E5', startBeat: 216.5, duration: 0.25, velocity: 0.62 },
        { note: 'G#5', startBeat: 216.75, duration: 0.25, velocity: 0.68 },
        { note: 'E5', startBeat: 217, duration: 0.25, velocity: 0.65 },
        { note: 'B5', startBeat: 217.25, duration: 0.25, velocity: 0.7 },
        { note: 'E5', startBeat: 217.5, duration: 0.25, velocity: 0.68 },
        { note: 'B5', startBeat: 217.75, duration: 0.25, velocity: 0.72 },
        { note: 'E5', startBeat: 218, duration: 0.25, velocity: 0.7 },
        { note: 'E6', startBeat: 218.25, duration: 0.25, velocity: 0.78 },
        { note: 'E5', startBeat: 218.5, duration: 0.25, velocity: 0.72 },
        { note: 'E6', startBeat: 218.75, duration: 0.25, velocity: 0.8 },
        { note: 'E6', startBeat: 219, duration: 1, velocity: 0.85 },
        { note: 'D6', startBeat: 220, duration: 0.5, velocity: 0.75 },
        { note: 'C6', startBeat: 220.5, duration: 0.5, velocity: 0.72 },
        { note: 'B5', startBeat: 221, duration: 0.5, velocity: 0.7 },
        { note: 'A5', startBeat: 221.5, duration: 0.5, velocity: 0.72 },
        { note: 'G#5', startBeat: 222, duration: 1, velocity: 0.78 },
        { note: 'A5', startBeat: 223, duration: 1, velocity: 0.82 },
    ];

    // ============ VARIATION (224-272) ============
    const variation = [
        { note: 'E2', startBeat: 224, duration: 4, velocity: 0.55 },
        { note: 'B2', startBeat: 224, duration: 4, velocity: 0.5 },
        { note: 'E3', startBeat: 224, duration: 4, velocity: 0.45 },
        { note: 'G3', startBeat: 224, duration: 4, velocity: 0.4 },
        { note: 'B4', startBeat: 224, duration: 0.25, velocity: 0.68 },
        { note: 'E5', startBeat: 224.25, duration: 0.25, velocity: 0.72 },
        { note: 'G5', startBeat: 224.5, duration: 0.5, velocity: 0.75 },
        { note: 'F#5', startBeat: 225, duration: 0.5, velocity: 0.7 },
        { note: 'E5', startBeat: 225.5, duration: 0.5, velocity: 0.68 },
        { note: 'D5', startBeat: 226, duration: 0.5, velocity: 0.65 },
        { note: 'C5', startBeat: 226.5, duration: 0.5, velocity: 0.62 },
        { note: 'B4', startBeat: 227, duration: 1, velocity: 0.68 },

        { note: 'A2', startBeat: 228, duration: 4, velocity: 0.52 },
        { note: 'E3', startBeat: 228, duration: 4, velocity: 0.48 },
        { note: 'A3', startBeat: 228, duration: 4, velocity: 0.42 },
        { note: 'C5', startBeat: 228, duration: 0.5, velocity: 0.65 },
        { note: 'D5', startBeat: 228.5, duration: 0.5, velocity: 0.68 },
        { note: 'E5', startBeat: 229, duration: 0.75, velocity: 0.72 },
        { note: 'F#5', startBeat: 229.75, duration: 0.25, velocity: 0.68 },
        { note: 'G5', startBeat: 230, duration: 1, velocity: 0.75 },
        { note: 'F#5', startBeat: 231, duration: 0.5, velocity: 0.68 },
        { note: 'E5', startBeat: 231.5, duration: 0.5, velocity: 0.65 },

        { note: 'D3', startBeat: 232, duration: 4, velocity: 0.55 },
        { note: 'F#3', startBeat: 232, duration: 4, velocity: 0.5 },
        { note: 'A3', startBeat: 232, duration: 4, velocity: 0.45 },
        { note: 'F#5', startBeat: 232, duration: 0.5, velocity: 0.72 },
        { note: 'G5', startBeat: 232.5, duration: 0.5, velocity: 0.75 },
        { note: 'A5', startBeat: 233, duration: 0.75, velocity: 0.8 },
        { note: 'B5', startBeat: 233.75, duration: 0.25, velocity: 0.78 },
        { note: 'A5', startBeat: 234, duration: 0.5, velocity: 0.75 },
        { note: 'G5', startBeat: 234.5, duration: 0.5, velocity: 0.72 },
        { note: 'F#5', startBeat: 235, duration: 1, velocity: 0.75 },

        { note: 'G3', startBeat: 236, duration: 4, velocity: 0.52 },
        { note: 'B3', startBeat: 236, duration: 4, velocity: 0.48 },
        { note: 'D4', startBeat: 236, duration: 4, velocity: 0.42 },
        { note: 'E5', startBeat: 236, duration: 1.5, velocity: 0.72 },
        { note: 'D5', startBeat: 237.5, duration: 0.5, velocity: 0.65 },
        { note: 'C5', startBeat: 238, duration: 0.75, velocity: 0.68 },
        { note: 'B4', startBeat: 238.75, duration: 0.25, velocity: 0.62 },
        { note: 'A4', startBeat: 239, duration: 1, velocity: 0.68 },

        { note: 'A3', startBeat: 240, duration: 8, velocity: 0.55 },
        { note: 'E4', startBeat: 240, duration: 8, velocity: 0.5 },
        { note: 'A4', startBeat: 240, duration: 0.5, velocity: 0.62 },
        { note: 'C5', startBeat: 240.5, duration: 0.5, velocity: 0.65 },
        { note: 'E5', startBeat: 241, duration: 0.5, velocity: 0.68 },
        { note: 'A5', startBeat: 241.5, duration: 0.5, velocity: 0.72 },
        { note: 'G5', startBeat: 242, duration: 0.5, velocity: 0.68 },
        { note: 'E5', startBeat: 242.5, duration: 0.5, velocity: 0.65 },
        { note: 'C5', startBeat: 243, duration: 0.5, velocity: 0.62 },
        { note: 'A4', startBeat: 243.5, duration: 0.5, velocity: 0.6 },
        { note: 'C5', startBeat: 244, duration: 0.5, velocity: 0.62 },
        { note: 'E5', startBeat: 244.5, duration: 0.5, velocity: 0.65 },
        { note: 'G5', startBeat: 245, duration: 0.5, velocity: 0.68 },
        { note: 'A5', startBeat: 245.5, duration: 0.5, velocity: 0.72 },
        { note: 'B5', startBeat: 246, duration: 0.5, velocity: 0.75 },
        { note: 'C6', startBeat: 246.5, duration: 1.5, velocity: 0.82 },

        { note: 'E2', startBeat: 248, duration: 8, velocity: 0.58 },
        { note: 'B2', startBeat: 248, duration: 8, velocity: 0.52 },
        { note: 'E3', startBeat: 248, duration: 8, velocity: 0.48 },
        { note: 'B5', startBeat: 248, duration: 1, velocity: 0.8 },
        { note: 'A5', startBeat: 249, duration: 0.5, velocity: 0.75 },
        { note: 'G5', startBeat: 249.5, duration: 0.5, velocity: 0.72 },
        { note: 'F#5', startBeat: 250, duration: 0.5, velocity: 0.7 },
        { note: 'E5', startBeat: 250.5, duration: 0.5, velocity: 0.72 },
        { note: 'F#5', startBeat: 251, duration: 0.5, velocity: 0.75 },
        { note: 'G5', startBeat: 251.5, duration: 0.5, velocity: 0.78 },
        { note: 'A5', startBeat: 252, duration: 1, velocity: 0.8 },
        { note: 'B5', startBeat: 253, duration: 1, velocity: 0.85 },
        { note: 'C6', startBeat: 254, duration: 1.5, velocity: 0.9 },
        { note: 'B5', startBeat: 255.5, duration: 0.5, velocity: 0.82 },

        { note: 'A2', startBeat: 256, duration: 8, velocity: 0.6 },
        { note: 'E3', startBeat: 256, duration: 8, velocity: 0.55 },
        { note: 'A3', startBeat: 256, duration: 8, velocity: 0.5 },
        { note: 'A5', startBeat: 256, duration: 0.5, velocity: 0.82 },
        { note: 'G#5', startBeat: 256.5, duration: 0.5, velocity: 0.85 },
        { note: 'A5', startBeat: 257, duration: 0.5, velocity: 0.88 },
        { note: 'B5', startBeat: 257.5, duration: 0.5, velocity: 0.9 },
        { note: 'C6', startBeat: 258, duration: 0.5, velocity: 0.92 },
        { note: 'D6', startBeat: 258.5, duration: 0.5, velocity: 0.95 },
        { note: 'E6', startBeat: 259, duration: 2, velocity: 1.0 },
        { note: 'D6', startBeat: 261, duration: 0.5, velocity: 0.88 },
        { note: 'C6', startBeat: 261.5, duration: 0.5, velocity: 0.85 },
        { note: 'B5', startBeat: 262, duration: 1, velocity: 0.88 },
        { note: 'A5', startBeat: 263, duration: 1, velocity: 0.85 },

        { note: 'E3', startBeat: 264, duration: 8, velocity: 0.58 },
        { note: 'G#3', startBeat: 264, duration: 8, velocity: 0.52 },
        { note: 'B3', startBeat: 264, duration: 8, velocity: 0.48 },
        { note: 'G#5', startBeat: 264, duration: 1, velocity: 0.85 },
        { note: 'A5', startBeat: 265, duration: 1, velocity: 0.88 },
        { note: 'B5', startBeat: 266, duration: 2, velocity: 0.92 },
        { note: 'A5', startBeat: 268, duration: 1, velocity: 0.85 },
        { note: 'G#5', startBeat: 269, duration: 1, velocity: 0.88 },
        { note: 'A5', startBeat: 270, duration: 2, velocity: 0.92 },
    ];

    // ============ CLIMAX (272-304) ============
    const climax = [
        { note: 'A1', startBeat: 272, duration: 4, velocity: 0.68 },
        { note: 'A2', startBeat: 272, duration: 4, velocity: 0.62 },
        { note: 'E3', startBeat: 272, duration: 4, velocity: 0.55 },
        { note: 'A3', startBeat: 272, duration: 4, velocity: 0.5 },
        { note: 'C4', startBeat: 272, duration: 4, velocity: 0.48 },
        { note: 'E4', startBeat: 272, duration: 4, velocity: 0.45 },
        { note: 'E5', startBeat: 272, duration: 1.5, velocity: 0.95 },
        { note: 'D5', startBeat: 273.5, duration: 0.5, velocity: 0.85 },
        { note: 'C5', startBeat: 274, duration: 1, velocity: 0.9 },
        { note: 'B4', startBeat: 275, duration: 0.5, velocity: 0.82 },
        { note: 'A4', startBeat: 275.5, duration: 0.5, velocity: 0.8 },

        { note: 'G2', startBeat: 276, duration: 4, velocity: 0.65 },
        { note: 'G3', startBeat: 276, duration: 4, velocity: 0.58 },
        { note: 'D4', startBeat: 276, duration: 4, velocity: 0.52 },
        { note: 'G4', startBeat: 276, duration: 4, velocity: 0.48 },
        { note: 'B4', startBeat: 276, duration: 4, velocity: 0.45 },
        { note: 'G4', startBeat: 276, duration: 0.75, velocity: 0.82 },
        { note: 'A4', startBeat: 276.75, duration: 0.25, velocity: 0.78 },
        { note: 'B4', startBeat: 277, duration: 1.5, velocity: 0.9 },
        { note: 'C5', startBeat: 278.5, duration: 1, velocity: 0.88 },
        { note: 'D5', startBeat: 279.5, duration: 0.5, velocity: 0.85 },

        { note: 'F2', startBeat: 280, duration: 4, velocity: 0.68 },
        { note: 'F3', startBeat: 280, duration: 4, velocity: 0.6 },
        { note: 'A3', startBeat: 280, duration: 4, velocity: 0.55 },
        { note: 'C4', startBeat: 280, duration: 4, velocity: 0.5 },
        { note: 'F4', startBeat: 280, duration: 4, velocity: 0.48 },
        { note: 'E5', startBeat: 280, duration: 0.75, velocity: 0.92 },
        { note: 'F5', startBeat: 280.75, duration: 0.25, velocity: 0.88 },
        { note: 'G5', startBeat: 281, duration: 1, velocity: 0.95 },
        { note: 'A5', startBeat: 282, duration: 1, velocity: 1.0 },
        { note: 'G5', startBeat: 283, duration: 0.5, velocity: 0.9 },
        { note: 'F5', startBeat: 283.5, duration: 0.5, velocity: 0.85 },

        { note: 'E2', startBeat: 284, duration: 4, velocity: 0.68 },
        { note: 'E3', startBeat: 284, duration: 4, velocity: 0.6 },
        { note: 'G#3', startBeat: 284, duration: 4, velocity: 0.55 },
        { note: 'B3', startBeat: 284, duration: 4, velocity: 0.5 },
        { note: 'E4', startBeat: 284, duration: 4, velocity: 0.48 },
        { note: 'E5', startBeat: 284, duration: 1.5, velocity: 0.95 },
        { note: 'D5', startBeat: 285.5, duration: 0.5, velocity: 0.85 },
        { note: 'C5', startBeat: 286, duration: 0.5, velocity: 0.88 },
        { note: 'B4', startBeat: 286.5, duration: 0.5, velocity: 0.82 },
        { note: 'A4', startBeat: 287, duration: 1, velocity: 0.9 },

        { note: 'A1', startBeat: 288, duration: 4, velocity: 0.72 },
        { note: 'A2', startBeat: 288, duration: 4, velocity: 0.65 },
        { note: 'E3', startBeat: 288, duration: 4, velocity: 0.58 },
        { note: 'A3', startBeat: 288, duration: 4, velocity: 0.52 },
        { note: 'E5', startBeat: 288, duration: 0.5, velocity: 0.95 },
        { note: 'F5', startBeat: 288.5, duration: 0.25, velocity: 0.88 },
        { note: 'E5', startBeat: 288.75, duration: 0.75, velocity: 0.92 },
        { note: 'D5', startBeat: 289.5, duration: 0.5, velocity: 0.85 },
        { note: 'C5', startBeat: 290, duration: 0.75, velocity: 0.9 },
        { note: 'D5', startBeat: 290.75, duration: 0.25, velocity: 0.85 },
        { note: 'B4', startBeat: 291, duration: 0.5, velocity: 0.88 },
        { note: 'A4', startBeat: 291.5, duration: 0.5, velocity: 0.85 },

        { note: 'F2', startBeat: 292, duration: 4, velocity: 0.72 },
        { note: 'F3', startBeat: 292, duration: 4, velocity: 0.65 },
        { note: 'A3', startBeat: 292, duration: 4, velocity: 0.58 },
        { note: 'C4', startBeat: 292, duration: 4, velocity: 0.52 },
        { note: 'A5', startBeat: 292, duration: 0.5, velocity: 0.98 },
        { note: 'B5', startBeat: 292.5, duration: 0.5, velocity: 1.0 },
        { note: 'C6', startBeat: 293, duration: 2, velocity: 1.0 },
        { note: 'B5', startBeat: 295, duration: 0.5, velocity: 0.92 },
        { note: 'A5', startBeat: 295.5, duration: 0.5, velocity: 0.88 },

        { note: 'E2', startBeat: 296, duration: 4, velocity: 0.7 },
        { note: 'E3', startBeat: 296, duration: 4, velocity: 0.62 },
        { note: 'G#3', startBeat: 296, duration: 4, velocity: 0.55 },
        { note: 'B3', startBeat: 296, duration: 4, velocity: 0.5 },
        { note: 'G5', startBeat: 296, duration: 1, velocity: 0.95 },
        { note: 'F5', startBeat: 297, duration: 0.5, velocity: 0.88 },
        { note: 'E5', startBeat: 297.5, duration: 0.5, velocity: 0.85 },
        { note: 'D5', startBeat: 298, duration: 1, velocity: 0.9 },
        { note: 'C5', startBeat: 299, duration: 0.5, velocity: 0.85 },
        { note: 'B4', startBeat: 299.5, duration: 0.5, velocity: 0.88 },
        { note: 'A4', startBeat: 300, duration: 2, velocity: 0.92 },
        { note: 'G#4', startBeat: 302, duration: 1, velocity: 0.88 },
        { note: 'A4', startBeat: 303, duration: 1, velocity: 0.9 },
    ];

    // ============ RECAPITULATION (304-336) ============
    const recapitulation = [
        { note: 'A2', startBeat: 304, duration: 4, velocity: 0.35 },
        { note: 'E3', startBeat: 304, duration: 4, velocity: 0.3 },
        { note: 'A3', startBeat: 304, duration: 4, velocity: 0.28 },
        { note: 'A4', startBeat: 304, duration: 2, velocity: 0.55 },
        { note: 'E5', startBeat: 306, duration: 1.5, velocity: 0.6 },
        { note: 'D5', startBeat: 307.5, duration: 0.5, velocity: 0.52 },

        { note: 'G2', startBeat: 308, duration: 4, velocity: 0.32 },
        { note: 'D3', startBeat: 308, duration: 4, velocity: 0.28 },
        { note: 'G3', startBeat: 308, duration: 4, velocity: 0.25 },
        { note: 'C5', startBeat: 308, duration: 1, velocity: 0.55 },
        { note: 'B4', startBeat: 309, duration: 0.5, velocity: 0.48 },
        { note: 'A4', startBeat: 309.5, duration: 0.5, velocity: 0.45 },
        { note: 'G4', startBeat: 310, duration: 1, velocity: 0.5 },
        { note: 'A4', startBeat: 311, duration: 0.5, velocity: 0.48 },
        { note: 'B4', startBeat: 311.5, duration: 0.5, velocity: 0.52 },

        { note: 'F2', startBeat: 312, duration: 4, velocity: 0.35 },
        { note: 'C3', startBeat: 312, duration: 4, velocity: 0.3 },
        { note: 'F3', startBeat: 312, duration: 4, velocity: 0.28 },
        { note: 'C5', startBeat: 312, duration: 0.75, velocity: 0.55 },
        { note: 'D5', startBeat: 312.75, duration: 0.25, velocity: 0.5 },
        { note: 'E5', startBeat: 313, duration: 1, velocity: 0.58 },
        { note: 'F5', startBeat: 314, duration: 1, velocity: 0.6 },
        { note: 'E5', startBeat: 315, duration: 0.5, velocity: 0.52 },
        { note: 'D5', startBeat: 315.5, duration: 0.5, velocity: 0.5 },

        { note: 'E2', startBeat: 316, duration: 4, velocity: 0.35 },
        { note: 'B2', startBeat: 316, duration: 4, velocity: 0.3 },
        { note: 'E3', startBeat: 316, duration: 4, velocity: 0.28 },
        { note: 'C5', startBeat: 316, duration: 1.5, velocity: 0.55 },
        { note: 'B4', startBeat: 317.5, duration: 0.5, velocity: 0.48 },
        { note: 'A4', startBeat: 318, duration: 2, velocity: 0.55 },

        { note: 'A2', startBeat: 320, duration: 8, velocity: 0.32 },
        { note: 'E3', startBeat: 320, duration: 8, velocity: 0.28 },
        { note: 'E5', startBeat: 320, duration: 0.5, velocity: 0.5 },
        { note: 'D5', startBeat: 320.5, duration: 0.5, velocity: 0.48 },
        { note: 'C5', startBeat: 321, duration: 0.5, velocity: 0.45 },
        { note: 'B4', startBeat: 321.5, duration: 0.5, velocity: 0.42 },
        { note: 'A4', startBeat: 322, duration: 1, velocity: 0.48 },
        { note: 'G4', startBeat: 323, duration: 0.5, velocity: 0.42 },
        { note: 'A4', startBeat: 323.5, duration: 0.5, velocity: 0.45 },
        { note: 'B4', startBeat: 324, duration: 0.5, velocity: 0.48 },
        { note: 'C5', startBeat: 324.5, duration: 0.5, velocity: 0.5 },
        { note: 'D5', startBeat: 325, duration: 0.5, velocity: 0.52 },
        { note: 'E5', startBeat: 325.5, duration: 1.5, velocity: 0.55 },
        { note: 'D5', startBeat: 327, duration: 1, velocity: 0.5 },

        { note: 'E3', startBeat: 328, duration: 8, velocity: 0.3 },
        { note: 'G#3', startBeat: 328, duration: 8, velocity: 0.28 },
        { note: 'B3', startBeat: 328, duration: 8, velocity: 0.25 },
        { note: 'C5', startBeat: 328, duration: 1, velocity: 0.5 },
        { note: 'B4', startBeat: 329, duration: 0.5, velocity: 0.45 },
        { note: 'A4', startBeat: 329.5, duration: 0.5, velocity: 0.42 },
        { note: 'G#4', startBeat: 330, duration: 1, velocity: 0.45 },
        { note: 'A4', startBeat: 331, duration: 1, velocity: 0.48 },
        { note: 'B4', startBeat: 332, duration: 1, velocity: 0.5 },
        { note: 'E5', startBeat: 333, duration: 1.5, velocity: 0.55 },
        { note: 'D5', startBeat: 334.5, duration: 0.5, velocity: 0.48 },
        { note: 'C5', startBeat: 335, duration: 1, velocity: 0.5 },
    ];

    // ============ CODA (336-372) ============
    const coda = [
        { note: 'A2', startBeat: 336, duration: 8, velocity: 0.3 },
        { note: 'E3', startBeat: 336, duration: 8, velocity: 0.28 },
        { note: 'A3', startBeat: 336, duration: 8, velocity: 0.25 },
        { note: 'C#4', startBeat: 336, duration: 8, velocity: 0.22 },
        { note: 'E4', startBeat: 336, duration: 4, velocity: 0.35 },
        { note: 'A4', startBeat: 337, duration: 3, velocity: 0.38 },
        { note: 'C#5', startBeat: 338, duration: 2, velocity: 0.42 },
        { note: 'E5', startBeat: 340, duration: 2, velocity: 0.45 },
        { note: 'D5', startBeat: 342, duration: 1, velocity: 0.4 },
        { note: 'C#5', startBeat: 343, duration: 1, velocity: 0.38 },

        { note: 'E3', startBeat: 344, duration: 4, velocity: 0.28 },
        { note: 'G#3', startBeat: 344, duration: 4, velocity: 0.25 },
        { note: 'B3', startBeat: 344, duration: 4, velocity: 0.22 },
        { note: 'B4', startBeat: 344, duration: 1, velocity: 0.4 },
        { note: 'A4', startBeat: 345, duration: 0.5, velocity: 0.35 },
        { note: 'G#4', startBeat: 345.5, duration: 0.5, velocity: 0.32 },
        { note: 'F#4', startBeat: 346, duration: 1, velocity: 0.35 },
        { note: 'E4', startBeat: 347, duration: 1, velocity: 0.38 },

        { note: 'A2', startBeat: 348, duration: 8, velocity: 0.28 },
        { note: 'E3', startBeat: 348, duration: 8, velocity: 0.25 },
        { note: 'A3', startBeat: 348, duration: 8, velocity: 0.22 },
        { note: 'C#5', startBeat: 348, duration: 2, velocity: 0.38 },
        { note: 'B4', startBeat: 350, duration: 1, velocity: 0.32 },
        { note: 'A4', startBeat: 351, duration: 1, velocity: 0.35 },
        { note: 'G#4', startBeat: 352, duration: 1, velocity: 0.3 },
        { note: 'A4', startBeat: 353, duration: 1, velocity: 0.32 },
        { note: 'E4', startBeat: 354, duration: 2, velocity: 0.35 },

        // Final arpeggio - A major
        { note: 'A2', startBeat: 356, duration: 16, velocity: 0.25 },
        { note: 'E3', startBeat: 356.5, duration: 15.5, velocity: 0.22 },
        { note: 'A3', startBeat: 357, duration: 15, velocity: 0.2 },
        { note: 'C#4', startBeat: 357.5, duration: 14.5, velocity: 0.22 },
        { note: 'E4', startBeat: 358, duration: 14, velocity: 0.25 },
        { note: 'A4', startBeat: 358.5, duration: 13.5, velocity: 0.28 },
        { note: 'C#5', startBeat: 359, duration: 13, velocity: 0.3 },
        { note: 'E5', startBeat: 360, duration: 12, velocity: 0.32 },
        { note: 'A5', startBeat: 361, duration: 11, velocity: 0.35 },
    ];

    const fullComposition = [
        ...prelude,
        ...mainTheme,
        ...development,
        ...variation,
        ...climax,
        ...recapitulation,
        ...coda
    ];

    const TOTAL_BEATS = 376;

    // ============================================
    // PIANO SYNTHESIS
    // ============================================

    function createRealisticString(frequency, velocity, duration) {
        const sampleRate = audioCtx.sampleRate;
        const samples = Math.round(sampleRate / frequency);
        const totalSamples = Math.round(sampleRate * (duration + 3.5));
        const buffer = audioCtx.createBuffer(1, totalSamples, sampleRate);
        const data = buffer.getChannelData(0);
        
        const hammerPos = 0.12 + (1 - frequency / 4000) * 0.08;
        
        const noiseBuffer = [];
        for (let i = 0; i < samples; i++) {
            const pos = i / samples;
            const hammerShape = Math.sin(pos * Math.PI) * Math.pow(Math.sin(pos * Math.PI * hammerPos * 10), 2);
            const brightness = 0.3 + velocity * 0.7;
            noiseBuffer[i] = (Math.random() * 2 - 1) * hammerShape * velocity * brightness;
        }
        
        let decay, brightness;
        switch(pianoType) {
            case 'steinway':
                decay = 0.9975 - (frequency / 30000) * 0.012;
                brightness = 0.45;
                break;
            case 'bosendorfer':
                decay = 0.998 - (frequency / 28000) * 0.01;
                brightness = 0.38;
                break;
            case 'yamaha':
                decay = 0.997 - (frequency / 32000) * 0.014;
                brightness = 0.52;
                break;
            default:
                decay = 0.9975;
                brightness = 0.42;
        }
        
        brightness = brightness * (1 - warmth * 0.3);
        
        for (let i = 0; i < totalSamples; i++) {
            if (i < samples) {
                data[i] = noiseBuffer[i];
            } else {
                const idx1 = i - samples;
                const idx2 = (i - samples + 1) % totalSamples;
                let avg = (data[idx1] + (idx2 < i ? data[idx2] : 0)) * 0.5 * decay;
                
                if (i > samples * 2) {
                    avg = avg * brightness + data[i - 1] * (1 - brightness);
                }
                
                if (i % (samples * 2) < samples) {
                    avg *= 1 + Math.sin(i * 0.0001) * 0.003;
                }
                
                data[i] = avg;
            }
        }
        return buffer;
    }

    function playPianoAt(frequency, velocity, duration, when) {
        if (!audioCtx) return;
        
        if (softPedal) velocity *= 0.6;
        
        const hammerLen = 0.015;
        const hammerBuf = audioCtx.createBuffer(1, audioCtx.sampleRate * hammerLen, audioCtx.sampleRate);
        const hammerData = hammerBuf.getChannelData(0);
        for (let i = 0; i < hammerData.length; i++) {
            const t = i / hammerData.length;
            hammerData[i] = (Math.random() * 2 - 1) * Math.sin(t * Math.PI) * Math.exp(-t * 5) * velocity * 0.8;
        }
        
        const hammerSrc = audioCtx.createBufferSource();
        hammerSrc.buffer = hammerBuf;
        
        const hammerFlt = audioCtx.createBiquadFilter();
        hammerFlt.type = 'bandpass';
        hammerFlt.frequency.value = Math.min(frequency * 3, 8000);
        hammerFlt.Q.value = 1.2;
        
        const hammerGain = audioCtx.createGain();
        hammerGain.gain.value = velocity * 0.08;
        
        hammerSrc.connect(hammerFlt);
        hammerFlt.connect(hammerGain);
        hammerGain.connect(masterGain);
        hammerSrc.start(when);
        
        const strBuf = createRealisticString(frequency, velocity, duration);
        const strSrc = audioCtx.createBufferSource();
        strSrc.buffer = strBuf;
        
        const voiceGain = audioCtx.createGain();
        const sustainMult = sustainPedal ? 2.5 : 1;
        const decayTime = duration * (2.2 - frequency / 3500) * sustainMult;
        
        voiceGain.gain.setValueAtTime(velocity * 0.38, when);
        voiceGain.gain.setTargetAtTime(velocity * 0.28, when, 0.15);
        voiceGain.gain.setTargetAtTime(0.001, when + 0.3, decayTime);
        
        const harmonics = [
            { ratio: 2, amp: 0.32, detune: 1.5 },
            { ratio: 3, amp: 0.15, detune: 3 },
            { ratio: 4, amp: 0.08, detune: 5 },
        ];
        
        harmonics.forEach((h, i) => {
            if (frequency * h.ratio < 10000) {
                const osc = audioCtx.createOscillator();
                const g = audioCtx.createGain();
                
                osc.type = 'sine';
                osc.frequency.value = frequency * h.ratio;
                osc.detune.value = h.detune * (frequency / 261.63);
                
                const hDecay = decayTime * (1 - i * 0.15);
                g.gain.setValueAtTime(0, when);
                g.gain.linearRampToValueAtTime(h.amp * velocity * 0.1, when + 0.01);
                g.gain.setTargetAtTime(0.001, when + 0.1, hDecay);
                
                osc.connect(g);
                g.connect(voiceGain);
                osc.start(when);
                osc.stop(when + duration + 4);
            }
        });
        
        const bodyResonance = audioCtx.createBiquadFilter();
        bodyResonance.type = 'peaking';
        bodyResonance.frequency.value = pianoType === 'bosendorfer' ? 180 : (pianoType === 'steinway' ? 220 : 250);
        bodyResonance.Q.value = 2;
        bodyResonance.gain.value = 5 + warmth * 3;
        
        const presence = audioCtx.createBiquadFilter();
        presence.type = 'peaking';
        presence.frequency.value = 2800;
        presence.Q.value = 1.5;
        presence.gain.value = pianoType === 'yamaha' ? 3 : (pianoType === 'steinway' ? 1 : -1);
        
        const highCut = audioCtx.createBiquadFilter();
        highCut.type = 'lowpass';
        highCut.frequency.value = 12000 - warmth * 4000;
        highCut.Q.value = 0.7;
        
        strSrc.connect(voiceGain);
        voiceGain.connect(bodyResonance);
        bodyResonance.connect(presence);
        presence.connect(highCut);
        highCut.connect(masterGain);
        
        if (reverbNode && reverbAmount > 0) {
            const revSend = audioCtx.createGain();
            revSend.gain.value = reverbAmount * 0.55;
            highCut.connect(revSend);
            revSend.connect(reverbNode);
        }
        
        strSrc.start(when);
        strSrc.stop(when + duration + 4);
    }

    function playPiano(frequency, velocity, duration) {
        playPianoAt(frequency, velocity, duration, audioCtx.currentTime);
        updateVelocityMeter(velocity);
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
