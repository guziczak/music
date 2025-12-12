// ============================================
// COMPOSITION DATA - "Swiatlo w Ciemnosci"
// ============================================

export const sections = [
    { name: 'Prelude', startBeat: 0, key: 'A minor', mood: 'Mysterious', dynamics: 'pp' },
    { name: 'Theme', startBeat: 32, key: 'A minor', mood: 'Melancholic', dynamics: 'p' },
    { name: 'Development', startBeat: 80, key: 'Modulating', mood: 'Transformative', dynamics: 'mp → ff' },
    { name: 'Variation', startBeat: 224, key: 'E minor', mood: 'Passionate', dynamics: 'f' },
    { name: 'Climax', startBeat: 272, key: 'A minor', mood: 'Triumphant', dynamics: 'ff' },
    { name: 'Recapitulation', startBeat: 304, key: 'A minor', mood: 'Nostalgic', dynamics: 'mp' },
    { name: 'Coda', startBeat: 336, key: 'A major', mood: 'Transcendent', dynamics: 'ppp' }
];

export const TOTAL_BEATS = 376;

// ============ PRELUDE (0-32) ============
export const prelude = [
    { note: 'A2', startBeat: 0, duration: 4, velocity: 0.22 },
    { note: 'A1', startBeat: 0, duration: 4, velocity: 0.18 },
    { note: 'E3', startBeat: 0.5, duration: 3.5, velocity: 0.18 },
    { note: 'A3', startBeat: 1, duration: 3, velocity: 0.2 },
    { note: 'C4', startBeat: 1.5, duration: 2.5, velocity: 0.22 },
    { note: 'E4', startBeat: 2, duration: 2, velocity: 0.25 },
    { note: 'G4', startBeat: 2.5, duration: 1.5, velocity: 0.2 },
    { note: 'E5', startBeat: 3, duration: 0.5, velocity: 0.35 },
    { note: 'A5', startBeat: 3.5, duration: 0.5, velocity: 0.4 },
    { note: 'A4', startBeat: 4, duration: 1.5, velocity: 0.32 },
    { note: 'C4', startBeat: 4, duration: 1.5, velocity: 0.25 },
    { note: 'E4', startBeat: 4.5, duration: 1, velocity: 0.28 },
    { note: 'B4', startBeat: 5.5, duration: 0.5, velocity: 0.28 },
    { note: 'C5', startBeat: 6, duration: 2, velocity: 0.35 },
    { note: 'G4', startBeat: 6, duration: 2, velocity: 0.3 },
    { note: 'E4', startBeat: 6.5, duration: 1.5, velocity: 0.25 },
    { note: 'A5', startBeat: 7, duration: 0.75, velocity: 0.42 },
    { note: 'G5', startBeat: 7.75, duration: 0.25, velocity: 0.38 },
    { note: 'E2', startBeat: 8, duration: 4, velocity: 0.22 },
    { note: 'E1', startBeat: 8, duration: 4, velocity: 0.18 },
    { note: 'B2', startBeat: 8.5, duration: 3.5, velocity: 0.18 },
    { note: 'E3', startBeat: 9, duration: 3, velocity: 0.2 },
    { note: 'G3', startBeat: 9.5, duration: 2.5, velocity: 0.22 },
    { note: 'B3', startBeat: 9.5, duration: 2.5, velocity: 0.2 },
    { note: 'B4', startBeat: 10, duration: 1, velocity: 0.3 },
    { note: 'E4', startBeat: 10, duration: 1, velocity: 0.25 },
    { note: 'G4', startBeat: 10, duration: 1, velocity: 0.22 },
    { note: 'A4', startBeat: 11, duration: 0.75, velocity: 0.28 },
    { note: 'G4', startBeat: 11.75, duration: 0.25, velocity: 0.22 },
    { note: 'E4', startBeat: 12, duration: 2, velocity: 0.32 },
    { note: 'B3', startBeat: 12, duration: 2, velocity: 0.28 },
    { note: 'G3', startBeat: 12.5, duration: 1.5, velocity: 0.25 },
    { note: 'B5', startBeat: 13, duration: 0.5, velocity: 0.4 },
    { note: 'A5', startBeat: 13.5, duration: 0.5, velocity: 0.38 },
    { note: 'G5', startBeat: 14, duration: 1, velocity: 0.35 },
    { note: 'A2', startBeat: 16, duration: 4, velocity: 0.25 },
    { note: 'A1', startBeat: 16, duration: 4, velocity: 0.2 },
    { note: 'E3', startBeat: 16, duration: 4, velocity: 0.2 },
    { note: 'C3', startBeat: 16, duration: 4, velocity: 0.18 },
    { note: 'A4', startBeat: 16, duration: 1, velocity: 0.35 },
    { note: 'C4', startBeat: 16, duration: 1, velocity: 0.28 },
    { note: 'C5', startBeat: 17, duration: 0.75, velocity: 0.38 },
    { note: 'E5', startBeat: 17.75, duration: 1.25, velocity: 0.42 },
    { note: 'A5', startBeat: 18, duration: 0.5, velocity: 0.45 },
    { note: 'G5', startBeat: 18.5, duration: 0.5, velocity: 0.42 },
    { note: 'D5', startBeat: 19, duration: 0.5, velocity: 0.35 },
    { note: 'C5', startBeat: 19.5, duration: 0.5, velocity: 0.32 },
    { note: 'D3', startBeat: 20, duration: 4, velocity: 0.22 },
    { note: 'D2', startBeat: 20, duration: 4, velocity: 0.18 },
    { note: 'F3', startBeat: 20, duration: 4, velocity: 0.2 },
    { note: 'A3', startBeat: 20, duration: 4, velocity: 0.18 },
    { note: 'B4', startBeat: 20, duration: 1.5, velocity: 0.32 },
    { note: 'D4', startBeat: 20, duration: 1.5, velocity: 0.25 },
    { note: 'A4', startBeat: 21.5, duration: 1, velocity: 0.3 },
    { note: 'F4', startBeat: 21.5, duration: 1, velocity: 0.25 },
    { note: 'G4', startBeat: 22.5, duration: 0.5, velocity: 0.25 },
    { note: 'F4', startBeat: 23, duration: 1, velocity: 0.28 },
    { note: 'D5', startBeat: 23, duration: 0.5, velocity: 0.35 },
    { note: 'F5', startBeat: 23.5, duration: 0.5, velocity: 0.38 },
    { note: 'E3', startBeat: 24, duration: 6, velocity: 0.22 },
    { note: 'E2', startBeat: 24, duration: 6, velocity: 0.18 },
    { note: 'B3', startBeat: 24, duration: 6, velocity: 0.2 },
    { note: 'G#3', startBeat: 24, duration: 6, velocity: 0.18 },
    { note: 'E4', startBeat: 24, duration: 4, velocity: 0.28 },
    { note: 'G#4', startBeat: 25, duration: 3, velocity: 0.25 },
    { note: 'D4', startBeat: 25, duration: 1, velocity: 0.22 },
    { note: 'B4', startBeat: 26, duration: 2, velocity: 0.3 },
    { note: 'D5', startBeat: 26, duration: 2, velocity: 0.28 },
    { note: 'F5', startBeat: 26.5, duration: 0.5, velocity: 0.35 },
    { note: 'E5', startBeat: 28, duration: 3, velocity: 0.32 },
    { note: 'B4', startBeat: 28, duration: 3, velocity: 0.28 },
    { note: 'G#4', startBeat: 28.5, duration: 2.5, velocity: 0.25 },
    { note: 'B5', startBeat: 29, duration: 0.5, velocity: 0.42 },
    { note: 'A5', startBeat: 29.5, duration: 0.5, velocity: 0.4 },
    { note: 'G#5', startBeat: 30, duration: 1, velocity: 0.38 },
    { note: 'E5', startBeat: 31, duration: 1, velocity: 0.35 },
];

export const mainTheme = [
    { note: 'A3', startBeat: 32, duration: 4, velocity: 0.38 },
    { note: 'A2', startBeat: 32, duration: 4, velocity: 0.32 }, // Octave bass doubling
    { note: 'E4', startBeat: 32, duration: 4, velocity: 0.32 },
    { note: 'C4', startBeat: 32, duration: 4, velocity: 0.28 }, // Added chord tone
    { note: 'E5', startBeat: 32, duration: 1.5, velocity: 0.67 },
    { note: 'A4', startBeat: 32, duration: 1.5, velocity: 0.35 }, // Added chord tone
    { note: 'D5', startBeat: 33.5, duration: 0.5, velocity: 0.42 },
    { note: 'C5', startBeat: 34, duration: 1, velocity: 0.48 },
    { note: 'G4', startBeat: 34, duration: 1, velocity: 0.35 }, // Added chord tone
    { note: 'E5', startBeat: 34, duration: 0.25, velocity: 0.85 }, // Sforzando accent
    { note: 'B4', startBeat: 35, duration: 0.5, velocity: 0.4 },
    { note: 'A4', startBeat: 35.5, duration: 0.5, velocity: 0.38 },
    { note: 'C6', startBeat: 35.5, duration: 0.25, velocity: 0.55 }, // Dramatic high leap

    { note: 'G3', startBeat: 36, duration: 4, velocity: 0.40 },
    { note: 'G2', startBeat: 36, duration: 4, velocity: 0.34 }, // Octave bass doubling
    { note: 'D4', startBeat: 36, duration: 4, velocity: 0.34 },
    { note: 'B3', startBeat: 36, duration: 4, velocity: 0.30 }, // Added chord tone
    { note: 'G4', startBeat: 36, duration: 0.75, velocity: 0.55 },
    { note: 'D4', startBeat: 36, duration: 0.75, velocity: 0.32 }, // Added chord tone
    { note: 'A4', startBeat: 36.75, duration: 0.25, velocity: 0.38 },
    { note: 'B4', startBeat: 37, duration: 1.5, velocity: 0.5 },
    { note: 'G4', startBeat: 37, duration: 1.5, velocity: 0.35 }, // Added chord tone
    { note: 'D5', startBeat: 37.5, duration: 0.5, velocity: 0.45 }, // Dramatic leap
    { note: 'C5', startBeat: 38.5, duration: 1, velocity: 0.45 },
    { note: 'A4', startBeat: 38.5, duration: 1, velocity: 0.32 }, // Added chord tone
    { note: 'D5', startBeat: 39.5, duration: 0.5, velocity: 0.42 },
    { note: 'G5', startBeat: 39.5, duration: 0.25, velocity: 0.55 }, // Dramatic high leap

    { note: 'F3', startBeat: 40, duration: 4, velocity: 0.42 },
    { note: 'F2', startBeat: 40, duration: 4, velocity: 0.36 }, // Octave bass doubling
    { note: 'A3', startBeat: 40, duration: 4, velocity: 0.37 },
    { note: 'C4', startBeat: 40, duration: 4, velocity: 0.32 }, // Added chord tone
    { note: 'E5', startBeat: 40, duration: 0.75, velocity: 0.65 },
    { note: 'C5', startBeat: 40, duration: 0.75, velocity: 0.38 }, // Added chord tone
    { note: 'F5', startBeat: 40.75, duration: 0.25, velocity: 0.48 },
    { note: 'G5', startBeat: 41, duration: 1, velocity: 0.58 },
    { note: 'C5', startBeat: 41, duration: 1, velocity: 0.4 }, // Added chord tone
    { note: 'E5', startBeat: 41, duration: 1, velocity: 0.45 }, // Added chord tone
    { note: 'A5', startBeat: 41.5, duration: 0.5, velocity: 0.65 }, // Dramatic high leap
    { note: 'F5', startBeat: 42, duration: 0.5, velocity: 0.5 },
    { note: 'G5', startBeat: 42, duration: 0.25, velocity: 0.88 }, // Sforzando accent
    { note: 'E5', startBeat: 42.5, duration: 0.5, velocity: 0.45 },
    { note: 'D5', startBeat: 43, duration: 1, velocity: 0.48 },
    { note: 'A4', startBeat: 43, duration: 1, velocity: 0.35 }, // Added chord tone
    { note: 'F4', startBeat: 43, duration: 1, velocity: 0.32 }, // Added chord tone

    { note: 'E3', startBeat: 44, duration: 4, velocity: 0.40 },
    { note: 'E2', startBeat: 44, duration: 4, velocity: 0.34 }, // Octave bass doubling
    { note: 'G#3', startBeat: 44, duration: 4, velocity: 0.34 },
    { note: 'B3', startBeat: 44, duration: 4, velocity: 0.30 }, // Added chord tone
    { note: 'C5', startBeat: 44, duration: 1.5, velocity: 0.62 },
    { note: 'E4', startBeat: 44, duration: 1.5, velocity: 0.35 }, // Added chord tone
    { note: 'G#4', startBeat: 44, duration: 1.5, velocity: 0.38 }, // Added chord tone
    { note: 'B4', startBeat: 45.5, duration: 0.5, velocity: 0.42 },
    { note: 'E5', startBeat: 45.5, duration: 0.5, velocity: 0.55 }, // Dramatic leap
    { note: 'A4', startBeat: 46, duration: 2, velocity: 0.52 },
    { note: 'E4', startBeat: 46, duration: 2, velocity: 0.35 }, // Added chord tone
    { note: 'C4', startBeat: 46.5, duration: 1.5, velocity: 0.32 }, // Added chord tone
    { note: 'A5', startBeat: 47, duration: 0.5, velocity: 0.58 }, // Dramatic high leap

    { note: 'A3', startBeat: 48, duration: 4, velocity: 0.42 },
    { note: 'A2', startBeat: 48, duration: 4, velocity: 0.36 }, // Octave bass doubling
    { note: 'E4', startBeat: 48, duration: 4, velocity: 0.37 },
    { note: 'C4', startBeat: 48, duration: 4, velocity: 0.32 },
    { note: 'E5', startBeat: 48, duration: 0.5, velocity: 0.68 },
    { note: 'A4', startBeat: 48, duration: 0.5, velocity: 0.38 }, // Added chord tone
    { note: 'F5', startBeat: 48.5, duration: 0.25, velocity: 0.48 },
    { note: 'E5', startBeat: 48.75, duration: 0.75, velocity: 0.52 },
    { note: 'D5', startBeat: 49.5, duration: 0.5, velocity: 0.45 },
    { note: 'C5', startBeat: 50, duration: 0.75, velocity: 0.5 },
    { note: 'A4', startBeat: 50, duration: 0.75, velocity: 0.35 }, // Added chord tone
    { note: 'E4', startBeat: 50, duration: 0.75, velocity: 0.32 }, // Added chord tone
    { note: 'A5', startBeat: 50, duration: 0.25, velocity: 0.9 }, // Sforzando accent
    { note: 'D5', startBeat: 50.75, duration: 0.25, velocity: 0.42 },
    { note: 'B4', startBeat: 51, duration: 0.5, velocity: 0.45 },
    { note: 'A4', startBeat: 51.5, duration: 0.5, velocity: 0.42 },
    { note: 'E5', startBeat: 51.5, duration: 0.5, velocity: 0.52 }, // Dramatic leap

    { note: 'G3', startBeat: 52, duration: 4, velocity: 0.3 },
    { note: 'G2', startBeat: 52, duration: 4, velocity: 0.24 }, // Octave bass doubling
    { note: 'B3', startBeat: 52, duration: 4, velocity: 0.22 },
    { note: 'D4', startBeat: 52, duration: 4, velocity: 0.2 },
    { note: 'G4', startBeat: 52, duration: 0.5, velocity: 0.45 },
    { note: 'D4', startBeat: 52, duration: 0.5, velocity: 0.32 }, // Added chord tone
    { note: 'B4', startBeat: 52.5, duration: 0.5, velocity: 0.5 },
    { note: 'D5', startBeat: 53, duration: 1, velocity: 0.55 },
    { note: 'B4', startBeat: 53, duration: 1, velocity: 0.4 }, // Added chord tone
    { note: 'G4', startBeat: 53, duration: 1, velocity: 0.38 }, // Added chord tone
    { note: 'G5', startBeat: 53.5, duration: 0.5, velocity: 0.62 }, // Dramatic leap
    { note: 'C5', startBeat: 54, duration: 0.5, velocity: 0.48 },
    { note: 'B4', startBeat: 54.5, duration: 0.5, velocity: 0.45 },
    { note: 'C5', startBeat: 55, duration: 1, velocity: 0.5 },
    { note: 'G4', startBeat: 55, duration: 1, velocity: 0.35 }, // Added chord tone
    { note: 'E4', startBeat: 55, duration: 1, velocity: 0.32 }, // Added chord tone

    { note: 'F3', startBeat: 56, duration: 4, velocity: 0.44 },
    { note: 'F2', startBeat: 56, duration: 4, velocity: 0.38 }, // Octave bass doubling
    { note: 'A3', startBeat: 56, duration: 4, velocity: 0.40 },
    { note: 'C4', startBeat: 56, duration: 4, velocity: 0.34 },
    { note: 'E5', startBeat: 56, duration: 0.5, velocity: 0.70 },
    { note: 'A4', startBeat: 56, duration: 0.5, velocity: 0.42 }, // Added chord tone
    { note: 'C5', startBeat: 56, duration: 0.5, velocity: 0.45 }, // Added chord tone
    { note: 'G5', startBeat: 56.5, duration: 0.5, velocity: 0.62 },
    { note: 'A5', startBeat: 57, duration: 1, velocity: 0.68 },
    { note: 'F5', startBeat: 57, duration: 1, velocity: 0.5 }, // Added chord tone
    { note: 'C5', startBeat: 57, duration: 1, velocity: 0.45 }, // Added chord tone
    { note: 'C6', startBeat: 57.5, duration: 0.5, velocity: 0.72 }, // Dramatic high leap
    { note: 'G5', startBeat: 58, duration: 0.5, velocity: 0.58 },
    { note: 'C6', startBeat: 58, duration: 0.25, velocity: 0.92 }, // Sforzando accent
    { note: 'F5', startBeat: 58.5, duration: 0.5, velocity: 0.52 },
    { note: 'E5', startBeat: 59, duration: 1, velocity: 0.55 },
    { note: 'C5', startBeat: 59, duration: 1, velocity: 0.4 }, // Added chord tone
    { note: 'A4', startBeat: 59, duration: 1, velocity: 0.38 }, // Added chord tone

    { note: 'E3', startBeat: 60, duration: 4, velocity: 0.3 },
    { note: 'E2', startBeat: 60, duration: 4, velocity: 0.24 }, // Octave bass doubling
    { note: 'G#3', startBeat: 60, duration: 4, velocity: 0.25 },
    { note: 'B3', startBeat: 60, duration: 4, velocity: 0.22 },
    { note: 'D5', startBeat: 60, duration: 1, velocity: 0.52 },
    { note: 'B4', startBeat: 60, duration: 1, velocity: 0.38 }, // Added chord tone
    { note: 'G#4', startBeat: 60, duration: 1, velocity: 0.35 }, // Added chord tone
    { note: 'C5', startBeat: 61, duration: 0.5, velocity: 0.48 },
    { note: 'B4', startBeat: 61.5, duration: 0.5, velocity: 0.45 },
    { note: 'A4', startBeat: 62, duration: 2, velocity: 0.52 },
    { note: 'E4', startBeat: 62, duration: 2, velocity: 0.35 }, // Added chord tone
    { note: 'C4', startBeat: 62, duration: 2, velocity: 0.32 }, // Added chord tone
    { note: 'E5', startBeat: 62.5, duration: 0.5, velocity: 0.58 }, // Dramatic leap
    { note: 'A5', startBeat: 63, duration: 0.5, velocity: 0.62 }, // Dramatic high leap

    { note: 'A3', startBeat: 64, duration: 8, velocity: 0.37 },
    { note: 'A2', startBeat: 64, duration: 8, velocity: 0.32 }, // Octave bass doubling
    { note: 'E4', startBeat: 64, duration: 8, velocity: 0.34 },
    { note: 'C4', startBeat: 64, duration: 8, velocity: 0.30 }, // Added chord tone
    { note: 'A4', startBeat: 64, duration: 2, velocity: 0.52 },
    { note: 'E4', startBeat: 64, duration: 2, velocity: 0.28 }, // Added chord tone
    { note: 'C4', startBeat: 64, duration: 2, velocity: 0.25 }, // Added chord tone
    { note: 'E5', startBeat: 65, duration: 0.5, velocity: 0.48 }, // Dramatic leap
    { note: 'G4', startBeat: 66, duration: 1, velocity: 0.35 },
    { note: 'F4', startBeat: 67, duration: 1, velocity: 0.32 },
    { note: 'E4', startBeat: 68, duration: 2, velocity: 0.38 },
    { note: 'A3', startBeat: 68, duration: 2, velocity: 0.28 }, // Added chord tone
    { note: 'C4', startBeat: 68, duration: 2, velocity: 0.25 }, // Added chord tone
    { note: 'A4', startBeat: 69, duration: 0.5, velocity: 0.45 }, // Dramatic leap
    { note: 'F4', startBeat: 70, duration: 0.5, velocity: 0.35 },
    { note: 'G4', startBeat: 70.5, duration: 0.5, velocity: 0.38 },
    { note: 'A4', startBeat: 71, duration: 1, velocity: 0.42 },
    { note: 'E4', startBeat: 71, duration: 1, velocity: 0.32 }, // Added chord tone
    { note: 'C4', startBeat: 71, duration: 1, velocity: 0.28 }, // Added chord tone

    { note: 'F3', startBeat: 72, duration: 8, velocity: 0.40 },
    { note: 'F2', startBeat: 72, duration: 8, velocity: 0.34 }, // Octave bass doubling
    { note: 'C4', startBeat: 72, duration: 8, velocity: 0.37 },
    { note: 'A3', startBeat: 72, duration: 8, velocity: 0.32 }, // Added chord tone
    { note: 'A4', startBeat: 72, duration: 1, velocity: 0.58 },
    { note: 'F4', startBeat: 72, duration: 1, velocity: 0.32 }, // Added chord tone
    { note: 'C4', startBeat: 72, duration: 1, velocity: 0.28 }, // Added chord tone
    { note: 'C5', startBeat: 73, duration: 1, velocity: 0.48 },
    { note: 'A4', startBeat: 73, duration: 1, velocity: 0.35 }, // Added chord tone
    { note: 'F5', startBeat: 74, duration: 2, velocity: 0.52 },
    { note: 'C5', startBeat: 74, duration: 2, velocity: 0.38 }, // Added chord tone
    { note: 'A4', startBeat: 74, duration: 2, velocity: 0.35 }, // Added chord tone
    { note: 'A5', startBeat: 75, duration: 0.5, velocity: 0.62 }, // Dramatic high leap
    { note: 'E5', startBeat: 76, duration: 1, velocity: 0.48 },
    { note: 'D5', startBeat: 77, duration: 1, velocity: 0.45 },
    { note: 'C5', startBeat: 78, duration: 2, velocity: 0.5 },
    { note: 'A4', startBeat: 78, duration: 2, velocity: 0.38 }, // Added chord tone
    { note: 'F4', startBeat: 78, duration: 2, velocity: 0.35 }, // Added chord tone
    { note: 'F5', startBeat: 79, duration: 0.5, velocity: 0.58 }, // Dramatic leap
    { note: 'E5', startBeat: 79.5, duration: 0.5, velocity: 0.55 }, // Sustained high
];
export const development = [
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
export const variation = [
    // VARIATION 1: Rapid-fire arpeggios (224-232)
    { note: 'A2', startBeat: 224, duration: 8, velocity: 0.55 },
    { note: 'E3', startBeat: 224, duration: 8, velocity: 0.5 },
    // Crazy fast arpeggio UP
    { note: 'A4', startBeat: 224, duration: 0.125, velocity: 0.65 },
    { note: 'C5', startBeat: 224.125, duration: 0.125, velocity: 0.68 },
    { note: 'E5', startBeat: 224.25, duration: 0.125, velocity: 0.72 },
    { note: 'A5', startBeat: 224.375, duration: 0.125, velocity: 0.78 },
    { note: 'C6', startBeat: 224.5, duration: 0.25, velocity: 0.85 },
    // Down
    { note: 'A5', startBeat: 224.75, duration: 0.125, velocity: 0.75 },
    { note: 'E5', startBeat: 224.875, duration: 0.125, velocity: 0.7 },
    { note: 'C5', startBeat: 225, duration: 0.125, velocity: 0.65 },
    { note: 'A4', startBeat: 225.125, duration: 0.125, velocity: 0.6 },
    // SFORZANDO accent!
    { note: 'E5', startBeat: 225.25, duration: 0.5, velocity: 0.95 },
    { note: 'C5', startBeat: 225.25, duration: 0.5, velocity: 0.9 },
    { note: 'A4', startBeat: 225.25, duration: 0.5, velocity: 0.85 },
    // Syncopated continuation
    { note: 'D5', startBeat: 225.75, duration: 0.25, velocity: 0.7 },
    { note: 'E5', startBeat: 226.25, duration: 0.25, velocity: 0.72 },
    { note: 'F5', startBeat: 226.5, duration: 0.25, velocity: 0.75 },
    { note: 'E5', startBeat: 226.75, duration: 0.25, velocity: 0.72 },
    { note: 'D5', startBeat: 227, duration: 0.25, velocity: 0.7 },
    { note: 'C5', startBeat: 227.25, duration: 0.75, velocity: 0.78 },

    // More arpeggios with octave jumps
    { note: 'F2', startBeat: 228, duration: 4, velocity: 0.52 },
    { note: 'C3', startBeat: 228, duration: 4, velocity: 0.48 },
    { note: 'F5', startBeat: 228, duration: 0.125, velocity: 0.7 },
    { note: 'A5', startBeat: 228.125, duration: 0.125, velocity: 0.75 },
    { note: 'C6', startBeat: 228.25, duration: 0.25, velocity: 0.85 },
    { note: 'A4', startBeat: 228.5, duration: 0.125, velocity: 0.6 }, // Octave drop!
    { note: 'C5', startBeat: 228.625, duration: 0.125, velocity: 0.65 },
    { note: 'F5', startBeat: 228.75, duration: 0.125, velocity: 0.7 },
    { note: 'A5', startBeat: 228.875, duration: 0.125, velocity: 0.75 },
    { note: 'F6', startBeat: 229, duration: 0.5, velocity: 0.92 }, // High peak!
    { note: 'E6', startBeat: 229.5, duration: 0.25, velocity: 0.85 },
    { note: 'D6', startBeat: 229.75, duration: 0.25, velocity: 0.8 },
    { note: 'C6', startBeat: 230, duration: 0.25, velocity: 0.78 },
    { note: 'B5', startBeat: 230.25, duration: 0.25, velocity: 0.75 },
    { note: 'A5', startBeat: 230.5, duration: 0.25, velocity: 0.72 },
    { note: 'G5', startBeat: 230.75, duration: 0.25, velocity: 0.7 },
    { note: 'F5', startBeat: 231, duration: 1, velocity: 0.78 },

    // VARIATION 2: Tremolo madness (232-240)
    { note: 'D3', startBeat: 232, duration: 4, velocity: 0.55 },
    { note: 'A3', startBeat: 232, duration: 4, velocity: 0.5 },
    // Tremolo between two notes
    { note: 'D5', startBeat: 232, duration: 0.125, velocity: 0.72 },
    { note: 'F5', startBeat: 232.125, duration: 0.125, velocity: 0.75 },
    { note: 'D5', startBeat: 232.25, duration: 0.125, velocity: 0.72 },
    { note: 'F5', startBeat: 232.375, duration: 0.125, velocity: 0.75 },
    { note: 'D5', startBeat: 232.5, duration: 0.125, velocity: 0.78 },
    { note: 'F5', startBeat: 232.625, duration: 0.125, velocity: 0.8 },
    { note: 'D5', startBeat: 232.75, duration: 0.125, velocity: 0.82 },
    { note: 'F5', startBeat: 232.875, duration: 0.125, velocity: 0.85 },
    // Tremolo climax
    { note: 'D5', startBeat: 233, duration: 0.125, velocity: 0.88 },
    { note: 'A5', startBeat: 233, duration: 0.125, velocity: 0.88 }, // Add octave!
    { note: 'F5', startBeat: 233.125, duration: 0.125, velocity: 0.9 },
    { note: 'D5', startBeat: 233.25, duration: 0.125, velocity: 0.88 },
    { note: 'A5', startBeat: 233.25, duration: 0.125, velocity: 0.88 },
    { note: 'F5', startBeat: 233.375, duration: 0.125, velocity: 0.92 },
    // Release into melody
    { note: 'G5', startBeat: 233.5, duration: 0.5, velocity: 0.85 },
    { note: 'F5', startBeat: 234, duration: 0.25, velocity: 0.78 },
    { note: 'E5', startBeat: 234.25, duration: 0.25, velocity: 0.75 },
    { note: 'D5', startBeat: 234.5, duration: 0.5, velocity: 0.72 },
    { note: 'C5', startBeat: 235, duration: 1, velocity: 0.78 },

    // Bass tremolo with melody
    { note: 'E2', startBeat: 236, duration: 0.25, velocity: 0.58 },
    { note: 'B2', startBeat: 236.25, duration: 0.25, velocity: 0.55 },
    { note: 'E2', startBeat: 236.5, duration: 0.25, velocity: 0.58 },
    { note: 'B2', startBeat: 236.75, duration: 0.25, velocity: 0.55 },
    { note: 'E2', startBeat: 237, duration: 0.25, velocity: 0.6 },
    { note: 'B2', startBeat: 237.25, duration: 0.25, velocity: 0.58 },
    { note: 'E2', startBeat: 237.5, duration: 0.25, velocity: 0.62 },
    { note: 'B2', startBeat: 237.75, duration: 0.25, velocity: 0.6 },
    // Melody over tremolo
    { note: 'E5', startBeat: 236, duration: 1, velocity: 0.8 },
    { note: 'G#5', startBeat: 237, duration: 0.5, velocity: 0.82 },
    { note: 'B5', startBeat: 237.5, duration: 1.5, velocity: 0.88 },
    { note: 'A5', startBeat: 239, duration: 0.5, velocity: 0.8 },
    { note: 'G#5', startBeat: 239.5, duration: 0.5, velocity: 0.78 },

    // VARIATION 3: Cross-rhythm chaos (240-248)
    { note: 'A2', startBeat: 240, duration: 8, velocity: 0.55 },
    { note: 'E3', startBeat: 240, duration: 8, velocity: 0.5 },
    { note: 'A3', startBeat: 240, duration: 8, velocity: 0.45 },
    // 3 against 4 polyrhythm!
    // Right hand in triplets
    { note: 'E5', startBeat: 240, duration: 0.333, velocity: 0.75 },
    { note: 'A5', startBeat: 240.333, duration: 0.333, velocity: 0.78 },
    { note: 'C6', startBeat: 240.666, duration: 0.333, velocity: 0.82 },
    { note: 'E5', startBeat: 241, duration: 0.333, velocity: 0.78 },
    { note: 'A5', startBeat: 241.333, duration: 0.333, velocity: 0.8 },
    { note: 'C6', startBeat: 241.666, duration: 0.333, velocity: 0.85 },
    // Left hand counter-rhythm
    { note: 'C4', startBeat: 240, duration: 0.5, velocity: 0.55 },
    { note: 'E4', startBeat: 240.5, duration: 0.5, velocity: 0.58 },
    { note: 'A4', startBeat: 241, duration: 0.5, velocity: 0.6 },
    { note: 'C4', startBeat: 241.5, duration: 0.5, velocity: 0.55 },
    // EXPLOSION!
    { note: 'E6', startBeat: 242, duration: 0.5, velocity: 1.0 },
    { note: 'C6', startBeat: 242, duration: 0.5, velocity: 0.95 },
    { note: 'A5', startBeat: 242, duration: 0.5, velocity: 0.9 },
    { note: 'E5', startBeat: 242, duration: 0.5, velocity: 0.85 },
    // Cascade down
    { note: 'D6', startBeat: 242.5, duration: 0.125, velocity: 0.85 },
    { note: 'C6', startBeat: 242.625, duration: 0.125, velocity: 0.82 },
    { note: 'B5', startBeat: 242.75, duration: 0.125, velocity: 0.8 },
    { note: 'A5', startBeat: 242.875, duration: 0.125, velocity: 0.78 },
    { note: 'G5', startBeat: 243, duration: 0.125, velocity: 0.75 },
    { note: 'F5', startBeat: 243.125, duration: 0.125, velocity: 0.72 },
    { note: 'E5', startBeat: 243.25, duration: 0.125, velocity: 0.7 },
    { note: 'D5', startBeat: 243.375, duration: 0.125, velocity: 0.68 },
    { note: 'C5', startBeat: 243.5, duration: 0.5, velocity: 0.72 },
    // Build again
    { note: 'D5', startBeat: 244, duration: 0.25, velocity: 0.7 },
    { note: 'E5', startBeat: 244.25, duration: 0.25, velocity: 0.72 },
    { note: 'F5', startBeat: 244.5, duration: 0.25, velocity: 0.75 },
    { note: 'G5', startBeat: 244.75, duration: 0.25, velocity: 0.78 },
    { note: 'A5', startBeat: 245, duration: 0.25, velocity: 0.8 },
    { note: 'B5', startBeat: 245.25, duration: 0.25, velocity: 0.82 },
    { note: 'C6', startBeat: 245.5, duration: 0.25, velocity: 0.85 },
    { note: 'D6', startBeat: 245.75, duration: 0.25, velocity: 0.88 },
    { note: 'E6', startBeat: 246, duration: 2, velocity: 0.95 },

    // VARIATION 4: Dramatic octaves (248-256)
    { note: 'E2', startBeat: 248, duration: 4, velocity: 0.6 },
    { note: 'E3', startBeat: 248, duration: 4, velocity: 0.55 },
    // Octave melody - POWERFUL
    { note: 'E4', startBeat: 248, duration: 0.5, velocity: 0.75 },
    { note: 'E5', startBeat: 248, duration: 0.5, velocity: 0.85 },
    { note: 'F#4', startBeat: 248.5, duration: 0.5, velocity: 0.78 },
    { note: 'F#5', startBeat: 248.5, duration: 0.5, velocity: 0.88 },
    { note: 'G4', startBeat: 249, duration: 0.5, velocity: 0.8 },
    { note: 'G5', startBeat: 249, duration: 0.5, velocity: 0.9 },
    { note: 'A4', startBeat: 249.5, duration: 0.5, velocity: 0.82 },
    { note: 'A5', startBeat: 249.5, duration: 0.5, velocity: 0.92 },
    { note: 'B4', startBeat: 250, duration: 1, velocity: 0.85 },
    { note: 'B5', startBeat: 250, duration: 1, velocity: 0.95 },
    { note: 'A4', startBeat: 251, duration: 0.5, velocity: 0.8 },
    { note: 'A5', startBeat: 251, duration: 0.5, velocity: 0.9 },
    { note: 'G#4', startBeat: 251.5, duration: 0.5, velocity: 0.78 },
    { note: 'G#5', startBeat: 251.5, duration: 0.5, velocity: 0.88 },

    { note: 'A2', startBeat: 252, duration: 4, velocity: 0.62 },
    { note: 'E3', startBeat: 252, duration: 4, velocity: 0.58 },
    // Dramatic leap up!
    { note: 'A3', startBeat: 252, duration: 0.25, velocity: 0.7 },
    { note: 'E6', startBeat: 252.25, duration: 0.75, velocity: 1.0 }, // HUGE JUMP!
    { note: 'D6', startBeat: 253, duration: 0.5, velocity: 0.9 },
    { note: 'C6', startBeat: 253.5, duration: 0.5, velocity: 0.88 },
    { note: 'B5', startBeat: 254, duration: 0.5, velocity: 0.85 },
    { note: 'A5', startBeat: 254.5, duration: 0.5, velocity: 0.82 },
    { note: 'G5', startBeat: 255, duration: 0.5, velocity: 0.8 },
    { note: 'F5', startBeat: 255.5, duration: 0.5, velocity: 0.78 },

    // VARIATION 5: Final frenzy (256-272)
    { note: 'D2', startBeat: 256, duration: 4, velocity: 0.65 },
    { note: 'D3', startBeat: 256, duration: 4, velocity: 0.6 },
    { note: 'F3', startBeat: 256, duration: 4, velocity: 0.55 },
    // Rapid chromatic
    { note: 'D5', startBeat: 256, duration: 0.125, velocity: 0.75 },
    { note: 'D#5', startBeat: 256.125, duration: 0.125, velocity: 0.78 },
    { note: 'E5', startBeat: 256.25, duration: 0.125, velocity: 0.8 },
    { note: 'F5', startBeat: 256.375, duration: 0.125, velocity: 0.82 },
    { note: 'F#5', startBeat: 256.5, duration: 0.125, velocity: 0.85 },
    { note: 'G5', startBeat: 256.625, duration: 0.125, velocity: 0.88 },
    { note: 'G#5', startBeat: 256.75, duration: 0.125, velocity: 0.9 },
    { note: 'A5', startBeat: 256.875, duration: 0.125, velocity: 0.92 },
    { note: 'A#5', startBeat: 257, duration: 0.125, velocity: 0.95 },
    { note: 'B5', startBeat: 257.125, duration: 0.125, velocity: 0.98 },
    { note: 'C6', startBeat: 257.25, duration: 0.75, velocity: 1.0 },
    // Syncopated accents
    { note: 'G5', startBeat: 258, duration: 0.25, velocity: 0.92 },
    { note: 'C6', startBeat: 258, duration: 0.25, velocity: 0.92 },
    { note: 'E5', startBeat: 258.5, duration: 0.25, velocity: 0.85 },
    { note: 'A5', startBeat: 258.5, duration: 0.25, velocity: 0.85 },
    { note: 'F5', startBeat: 259, duration: 0.25, velocity: 0.88 },
    { note: 'A5', startBeat: 259, duration: 0.25, velocity: 0.88 },
    { note: 'D5', startBeat: 259.5, duration: 0.5, velocity: 0.82 },
    { note: 'F5', startBeat: 259.5, duration: 0.5, velocity: 0.82 },

    { note: 'E2', startBeat: 260, duration: 4, velocity: 0.68 },
    { note: 'B2', startBeat: 260, duration: 4, velocity: 0.62 },
    { note: 'G#3', startBeat: 260, duration: 4, velocity: 0.58 },
    // More fury
    { note: 'E5', startBeat: 260, duration: 0.25, velocity: 0.88 },
    { note: 'G#5', startBeat: 260, duration: 0.25, velocity: 0.88 },
    { note: 'B5', startBeat: 260, duration: 0.25, velocity: 0.88 },
    { note: 'F5', startBeat: 260.25, duration: 0.25, velocity: 0.85 },
    { note: 'A5', startBeat: 260.25, duration: 0.25, velocity: 0.85 },
    { note: 'E5', startBeat: 260.5, duration: 0.25, velocity: 0.9 },
    { note: 'G#5', startBeat: 260.5, duration: 0.25, velocity: 0.9 },
    { note: 'B5', startBeat: 260.5, duration: 0.25, velocity: 0.9 },
    { note: 'D5', startBeat: 260.75, duration: 0.25, velocity: 0.85 },
    { note: 'F5', startBeat: 260.75, duration: 0.25, velocity: 0.85 },
    // Crescendo to climax
    { note: 'E5', startBeat: 261, duration: 0.5, velocity: 0.92 },
    { note: 'G#5', startBeat: 261, duration: 0.5, velocity: 0.92 },
    { note: 'B5', startBeat: 261, duration: 0.5, velocity: 0.92 },
    { note: 'E6', startBeat: 261.5, duration: 0.5, velocity: 0.98 },
    { note: 'D6', startBeat: 262, duration: 0.5, velocity: 0.95 },
    { note: 'B5', startBeat: 262.5, duration: 0.5, velocity: 0.92 },
    { note: 'G#5', startBeat: 263, duration: 1, velocity: 0.9 },

    // Final approach to climax
    { note: 'A2', startBeat: 264, duration: 8, velocity: 0.7 },
    { note: 'E3', startBeat: 264, duration: 8, velocity: 0.65 },
    { note: 'A3', startBeat: 264, duration: 8, velocity: 0.6 },
    { note: 'C4', startBeat: 264, duration: 8, velocity: 0.55 },
    // Building tension
    { note: 'A4', startBeat: 264, duration: 0.5, velocity: 0.8 },
    { note: 'E5', startBeat: 264, duration: 0.5, velocity: 0.85 },
    { note: 'B4', startBeat: 264.5, duration: 0.5, velocity: 0.82 },
    { note: 'E5', startBeat: 264.5, duration: 0.5, velocity: 0.87 },
    { note: 'C5', startBeat: 265, duration: 0.5, velocity: 0.85 },
    { note: 'E5', startBeat: 265, duration: 0.5, velocity: 0.9 },
    { note: 'D5', startBeat: 265.5, duration: 0.5, velocity: 0.88 },
    { note: 'E5', startBeat: 265.5, duration: 0.5, velocity: 0.92 },
    // FINAL PUSH!
    { note: 'E5', startBeat: 266, duration: 0.25, velocity: 0.92 },
    { note: 'A5', startBeat: 266.25, duration: 0.25, velocity: 0.95 },
    { note: 'E5', startBeat: 266.5, duration: 0.25, velocity: 0.92 },
    { note: 'B5', startBeat: 266.75, duration: 0.25, velocity: 0.98 },
    { note: 'E5', startBeat: 267, duration: 0.25, velocity: 0.95 },
    { note: 'C6', startBeat: 267.25, duration: 0.25, velocity: 1.0 },
    { note: 'E5', startBeat: 267.5, duration: 0.25, velocity: 0.95 },
    { note: 'D6', startBeat: 267.75, duration: 0.25, velocity: 1.0 },
    // Climax prep
    { note: 'E6', startBeat: 268, duration: 1, velocity: 1.0 },
    { note: 'C6', startBeat: 268, duration: 1, velocity: 0.95 },
    { note: 'A5', startBeat: 268, duration: 1, velocity: 0.9 },
    { note: 'E5', startBeat: 268, duration: 1, velocity: 0.85 },
    // Held tension
    { note: 'D6', startBeat: 269, duration: 1, velocity: 0.95 },
    { note: 'B5', startBeat: 269, duration: 1, velocity: 0.9 },
    { note: 'G#5', startBeat: 269, duration: 1, velocity: 0.85 },
    // Resolution to dominant
    { note: 'E6', startBeat: 270, duration: 2, velocity: 1.0 },
    { note: 'B5', startBeat: 270, duration: 2, velocity: 0.95 },
    { note: 'G#5', startBeat: 270, duration: 2, velocity: 0.9 },
    { note: 'E5', startBeat: 270, duration: 2, velocity: 0.85 },
];
export const climax = [
    { note: 'A1', startBeat: 272, duration: 4, velocity: 0.75 },
    { note: 'A2', startBeat: 272, duration: 4, velocity: 0.70 },
    { note: 'E3', startBeat: 272, duration: 4, velocity: 0.62 },
    { note: 'A3', startBeat: 272, duration: 4, velocity: 0.58 },
    { note: 'C4', startBeat: 272, duration: 4, velocity: 0.55 },
    { note: 'E4', startBeat: 272, duration: 4, velocity: 0.52 },
    { note: 'E5', startBeat: 272, duration: 1.5, velocity: 1.0 },
    { note: 'D5', startBeat: 273.5, duration: 0.5, velocity: 0.92 },
    { note: 'C5', startBeat: 274, duration: 1, velocity: 0.98 },
    { note: 'B4', startBeat: 275, duration: 0.5, velocity: 0.90 },
    { note: 'A4', startBeat: 275.5, duration: 0.5, velocity: 0.88 },

    { note: 'G2', startBeat: 276, duration: 4, velocity: 0.72 },
    { note: 'G3', startBeat: 276, duration: 4, velocity: 0.65 },
    { note: 'D4', startBeat: 276, duration: 4, velocity: 0.60 },
    { note: 'G4', startBeat: 276, duration: 4, velocity: 0.55 },
    { note: 'B4', startBeat: 276, duration: 4, velocity: 0.52 },
    { note: 'G4', startBeat: 276, duration: 0.75, velocity: 0.90 },
    { note: 'A4', startBeat: 276.75, duration: 0.25, velocity: 0.86 },
    { note: 'B4', startBeat: 277, duration: 1.5, velocity: 0.98 },
    { note: 'C5', startBeat: 278.5, duration: 1, velocity: 0.95 },
    { note: 'D5', startBeat: 279.5, duration: 0.5, velocity: 0.92 },

    { note: 'F2', startBeat: 280, duration: 4, velocity: 0.76 },
    { note: 'F3', startBeat: 280, duration: 4, velocity: 0.68 },
    { note: 'A3', startBeat: 280, duration: 4, velocity: 0.62 },
    { note: 'C4', startBeat: 280, duration: 4, velocity: 0.58 },
    { note: 'F4', startBeat: 280, duration: 4, velocity: 0.55 },
    { note: 'E5', startBeat: 280, duration: 0.75, velocity: 1.0 },
    { note: 'F5', startBeat: 280.75, duration: 0.25, velocity: 0.96 },
    { note: 'G5', startBeat: 281, duration: 1, velocity: 1.0 },
    { note: 'A5', startBeat: 282, duration: 1, velocity: 1.0 },
    { note: 'G5', startBeat: 283, duration: 0.5, velocity: 0.98 },
    { note: 'F5', startBeat: 283.5, duration: 0.5, velocity: 0.92 },

    { note: 'E2', startBeat: 284, duration: 4, velocity: 0.76 },
    { note: 'E3', startBeat: 284, duration: 4, velocity: 0.68 },
    { note: 'G#3', startBeat: 284, duration: 4, velocity: 0.62 },
    { note: 'B3', startBeat: 284, duration: 4, velocity: 0.58 },
    { note: 'E4', startBeat: 284, duration: 4, velocity: 0.55 },
    { note: 'E5', startBeat: 284, duration: 1.5, velocity: 1.0 },
    { note: 'D5', startBeat: 285.5, duration: 0.5, velocity: 0.92 },
    { note: 'C5', startBeat: 286, duration: 0.5, velocity: 0.96 },
    { note: 'B4', startBeat: 286.5, duration: 0.5, velocity: 0.90 },
    { note: 'A4', startBeat: 287, duration: 1, velocity: 0.98 },

    { note: 'A1', startBeat: 288, duration: 4, velocity: 0.80 },
    { note: 'A2', startBeat: 288, duration: 4, velocity: 0.72 },
    { note: 'E3', startBeat: 288, duration: 4, velocity: 0.65 },
    { note: 'A3', startBeat: 288, duration: 4, velocity: 0.60 },
    { note: 'E5', startBeat: 288, duration: 0.5, velocity: 1.0 },
    { note: 'F5', startBeat: 288.5, duration: 0.25, velocity: 0.96 },
    { note: 'E5', startBeat: 288.75, duration: 0.75, velocity: 1.0 },
    { note: 'D5', startBeat: 289.5, duration: 0.5, velocity: 0.92 },
    { note: 'C5', startBeat: 290, duration: 0.75, velocity: 0.98 },
    { note: 'D5', startBeat: 290.75, duration: 0.25, velocity: 0.92 },
    { note: 'B4', startBeat: 291, duration: 0.5, velocity: 0.96 },
    { note: 'A4', startBeat: 291.5, duration: 0.5, velocity: 0.92 },

    { note: 'F2', startBeat: 292, duration: 4, velocity: 0.80 },
    { note: 'F3', startBeat: 292, duration: 4, velocity: 0.72 },
    { note: 'A3', startBeat: 292, duration: 4, velocity: 0.65 },
    { note: 'C4', startBeat: 292, duration: 4, velocity: 0.60 },
    { note: 'A5', startBeat: 292, duration: 0.5, velocity: 1.0 },
    { note: 'B5', startBeat: 292.5, duration: 0.5, velocity: 1.0 },
    { note: 'C6', startBeat: 293, duration: 2, velocity: 1.0 },
    { note: 'B5', startBeat: 295, duration: 0.5, velocity: 1.0 },
    { note: 'A5', startBeat: 295.5, duration: 0.5, velocity: 0.96 },

    { note: 'E2', startBeat: 296, duration: 4, velocity: 0.78 },
    { note: 'E3', startBeat: 296, duration: 4, velocity: 0.70 },
    { note: 'G#3', startBeat: 296, duration: 4, velocity: 0.62 },
    { note: 'B3', startBeat: 296, duration: 4, velocity: 0.58 },
    { note: 'G5', startBeat: 296, duration: 1, velocity: 1.0 },
    { note: 'F5', startBeat: 297, duration: 0.5, velocity: 0.96 },
    { note: 'E5', startBeat: 297.5, duration: 0.5, velocity: 0.92 },
    { note: 'D5', startBeat: 298, duration: 1, velocity: 0.98 },
    { note: 'C5', startBeat: 299, duration: 0.5, velocity: 0.92 },
    { note: 'B4', startBeat: 299.5, duration: 0.5, velocity: 0.96 },
    { note: 'A4', startBeat: 300, duration: 2, velocity: 1.0 },
    { note: 'G#4', startBeat: 302, duration: 1, velocity: 0.96 },
    { note: 'A4', startBeat: 303, duration: 1, velocity: 0.98 },
];
export const recapitulation = [
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
export const coda = [
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

export const fullComposition = [
    ...prelude,
    ...mainTheme,
    ...development,
    ...variation,
    ...climax,
    ...recapitulation,
    ...coda
];
