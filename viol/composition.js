// ============================================
// VIOLIN COMPOSITION - "Swiatlo w Ciemnosci"
// Adapted for solo violin
// ============================================

export const sections = [
    { name: 'Build-up', startBeat: 0, key: 'A minor', mood: 'Intensifying', dynamics: 'mf → ff' },
    { name: 'Climax', startBeat: 8, key: 'A minor', mood: 'Triumphant', dynamics: 'ff' },
    { name: 'Recapitulation', startBeat: 40, key: 'A minor', mood: 'Nostalgic', dynamics: 'mp → pp' }
];

export const TOTAL_BEATS = 72;

// ============ BUILD-UP (0-8) - Final approach to climax ============
// Technique: aggressive bow strokes, building intensity
export const buildUp = [
    // Building tension - extracted melody line
    { note: 'A4', startBeat: 0, duration: 0.5, velocity: 0.8, technique: 'detache' },
    { note: 'E5', startBeat: 0, duration: 0.5, velocity: 0.85, technique: 'detache' },
    { note: 'B4', startBeat: 0.5, duration: 0.5, velocity: 0.82, technique: 'detache' },
    { note: 'E5', startBeat: 0.5, duration: 0.5, velocity: 0.87, technique: 'detache' },
    { note: 'C5', startBeat: 1, duration: 0.5, velocity: 0.85, technique: 'detache' },
    { note: 'E5', startBeat: 1, duration: 0.5, velocity: 0.9, technique: 'detache' },
    { note: 'D5', startBeat: 1.5, duration: 0.5, velocity: 0.88, technique: 'detache' },
    { note: 'E5', startBeat: 1.5, duration: 0.5, velocity: 0.92, technique: 'detache' },

    // FINAL PUSH! - accelerating pattern
    { note: 'E5', startBeat: 2, duration: 0.25, velocity: 0.92, technique: 'martele' },
    { note: 'A5', startBeat: 2.25, duration: 0.25, velocity: 0.95, technique: 'martele' },
    { note: 'E5', startBeat: 2.5, duration: 0.25, velocity: 0.92, technique: 'martele' },
    { note: 'B5', startBeat: 2.75, duration: 0.25, velocity: 0.98, technique: 'martele' },
    { note: 'E5', startBeat: 3, duration: 0.25, velocity: 0.95, technique: 'martele' },
    { note: 'C6', startBeat: 3.25, duration: 0.25, velocity: 1.0, technique: 'martele' },
    { note: 'E5', startBeat: 3.5, duration: 0.25, velocity: 0.95, technique: 'martele' },
    { note: 'D6', startBeat: 3.75, duration: 0.25, velocity: 1.0, technique: 'martele' },

    // Climax prep - big chords (double stops)
    { note: 'E5', startBeat: 4, duration: 1, velocity: 1.0, technique: 'fortissimo' },
    { note: 'A5', startBeat: 4, duration: 1, velocity: 0.95, technique: 'fortissimo' },
    { note: 'C6', startBeat: 4, duration: 1, velocity: 0.9, technique: 'fortissimo' },

    // Held tension
    { note: 'G#5', startBeat: 5, duration: 1, velocity: 0.95, technique: 'vibrato_intense' },
    { note: 'B5', startBeat: 5, duration: 1, velocity: 0.9, technique: 'vibrato_intense' },
    { note: 'D6', startBeat: 5, duration: 1, velocity: 0.85, technique: 'vibrato_intense' },

    // Resolution to dominant - THE DROP IS COMING
    { note: 'E5', startBeat: 6, duration: 2, velocity: 1.0, technique: 'tremolo' },
    { note: 'G#5', startBeat: 6, duration: 2, velocity: 0.95, technique: 'tremolo' },
    { note: 'B5', startBeat: 6, duration: 2, velocity: 0.9, technique: 'tremolo' },
];

// ============ CLIMAX (8-40) - "To zajebiste tapniecie" ============
// Full power - the main event
export const climax = [
    // THE DROP - Beat 8 (originally 272)
    // Massive chord strikes
    { note: 'E4', startBeat: 8, duration: 4, velocity: 0.65, technique: 'fortissimo' },
    { note: 'A4', startBeat: 8, duration: 4, velocity: 0.7, technique: 'fortissimo' },
    { note: 'E5', startBeat: 8, duration: 1.5, velocity: 1.0, technique: 'fortissimo' },
    { note: 'D5', startBeat: 9.5, duration: 0.5, velocity: 0.92, technique: 'legato' },
    { note: 'C5', startBeat: 10, duration: 1, velocity: 0.98, technique: 'vibrato_intense' },
    { note: 'B4', startBeat: 11, duration: 0.5, velocity: 0.90, technique: 'legato' },
    { note: 'A4', startBeat: 11.5, duration: 0.5, velocity: 0.88, technique: 'legato' },

    // Second phrase
    { note: 'G4', startBeat: 12, duration: 0.75, velocity: 0.90, technique: 'detache' },
    { note: 'A4', startBeat: 12.75, duration: 0.25, velocity: 0.86, technique: 'legato' },
    { note: 'B4', startBeat: 13, duration: 1.5, velocity: 0.98, technique: 'vibrato_intense' },
    { note: 'C5', startBeat: 14.5, duration: 1, velocity: 0.95, technique: 'legato' },
    { note: 'D5', startBeat: 15.5, duration: 0.5, velocity: 0.92, technique: 'legato' },

    // Third phrase - rising
    { note: 'E5', startBeat: 16, duration: 0.75, velocity: 1.0, technique: 'fortissimo' },
    { note: 'F5', startBeat: 16.75, duration: 0.25, velocity: 0.96, technique: 'legato' },
    { note: 'G5', startBeat: 17, duration: 1, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'A5', startBeat: 18, duration: 1, velocity: 1.0, technique: 'fortissimo' },
    { note: 'G5', startBeat: 19, duration: 0.5, velocity: 0.98, technique: 'legato' },
    { note: 'F5', startBeat: 19.5, duration: 0.5, velocity: 0.92, technique: 'legato' },

    // Fourth phrase - dominant
    { note: 'E5', startBeat: 20, duration: 1.5, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'D5', startBeat: 21.5, duration: 0.5, velocity: 0.92, technique: 'legato' },
    { note: 'C5', startBeat: 22, duration: 0.5, velocity: 0.96, technique: 'legato' },
    { note: 'B4', startBeat: 22.5, duration: 0.5, velocity: 0.90, technique: 'legato' },
    { note: 'A4', startBeat: 23, duration: 1, velocity: 0.98, technique: 'vibrato_intense' },

    // Fifth phrase - ornamented theme
    { note: 'E5', startBeat: 24, duration: 0.5, velocity: 1.0, technique: 'martele' },
    { note: 'F5', startBeat: 24.5, duration: 0.25, velocity: 0.96, technique: 'legato' },
    { note: 'E5', startBeat: 24.75, duration: 0.75, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'D5', startBeat: 25.5, duration: 0.5, velocity: 0.92, technique: 'legato' },
    { note: 'C5', startBeat: 26, duration: 0.75, velocity: 0.98, technique: 'vibrato_intense' },
    { note: 'D5', startBeat: 26.75, duration: 0.25, velocity: 0.92, technique: 'legato' },
    { note: 'B4', startBeat: 27, duration: 0.5, velocity: 0.96, technique: 'legato' },
    { note: 'A4', startBeat: 27.5, duration: 0.5, velocity: 0.92, technique: 'legato' },

    // Sixth phrase - PEAK MOMENT
    { note: 'A5', startBeat: 28, duration: 0.5, velocity: 1.0, technique: 'fortissimo' },
    { note: 'B5', startBeat: 28.5, duration: 0.5, velocity: 1.0, technique: 'fortissimo' },
    { note: 'C6', startBeat: 29, duration: 2, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'B5', startBeat: 31, duration: 0.5, velocity: 1.0, technique: 'legato' },
    { note: 'A5', startBeat: 31.5, duration: 0.5, velocity: 0.96, technique: 'legato' },

    // Seventh phrase - descending
    { note: 'G5', startBeat: 32, duration: 1, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'F5', startBeat: 33, duration: 0.5, velocity: 0.96, technique: 'legato' },
    { note: 'E5', startBeat: 33.5, duration: 0.5, velocity: 0.92, technique: 'legato' },
    { note: 'D5', startBeat: 34, duration: 1, velocity: 0.98, technique: 'vibrato_intense' },
    { note: 'C5', startBeat: 35, duration: 0.5, velocity: 0.92, technique: 'legato' },
    { note: 'B4', startBeat: 35.5, duration: 0.5, velocity: 0.96, technique: 'legato' },

    // Final climax phrase - resolution
    { note: 'A4', startBeat: 36, duration: 2, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'G#4', startBeat: 38, duration: 1, velocity: 0.96, technique: 'legato' },
    { note: 'A4', startBeat: 39, duration: 1, velocity: 0.98, technique: 'vibrato_wide' },
];

// ============ RECAPITULATION (40-72) - Nostalgic calm ============
// Gentle, reflective - coming down from the storm
export const recapitulation = [
    // Quiet return of theme
    { note: 'A4', startBeat: 40, duration: 2, velocity: 0.55, technique: 'legato' },
    { note: 'E5', startBeat: 42, duration: 1.5, velocity: 0.6, technique: 'vibrato_gentle' },
    { note: 'D5', startBeat: 43.5, duration: 0.5, velocity: 0.52, technique: 'legato' },

    // Second phrase
    { note: 'C5', startBeat: 44, duration: 1, velocity: 0.55, technique: 'legato' },
    { note: 'B4', startBeat: 45, duration: 0.5, velocity: 0.48, technique: 'legato' },
    { note: 'A4', startBeat: 45.5, duration: 0.5, velocity: 0.45, technique: 'legato' },
    { note: 'G4', startBeat: 46, duration: 1, velocity: 0.5, technique: 'vibrato_gentle' },
    { note: 'A4', startBeat: 47, duration: 0.5, velocity: 0.48, technique: 'legato' },
    { note: 'B4', startBeat: 47.5, duration: 0.5, velocity: 0.52, technique: 'legato' },

    // Third phrase
    { note: 'C5', startBeat: 48, duration: 0.75, velocity: 0.55, technique: 'legato' },
    { note: 'D5', startBeat: 48.75, duration: 0.25, velocity: 0.5, technique: 'legato' },
    { note: 'E5', startBeat: 49, duration: 1, velocity: 0.58, technique: 'vibrato_gentle' },
    { note: 'F5', startBeat: 50, duration: 1, velocity: 0.6, technique: 'vibrato_gentle' },
    { note: 'E5', startBeat: 51, duration: 0.5, velocity: 0.52, technique: 'legato' },
    { note: 'D5', startBeat: 51.5, duration: 0.5, velocity: 0.5, technique: 'legato' },

    // Fourth phrase - sighing
    { note: 'C5', startBeat: 52, duration: 1.5, velocity: 0.55, technique: 'vibrato_gentle' },
    { note: 'B4', startBeat: 53.5, duration: 0.5, velocity: 0.48, technique: 'legato' },
    { note: 'A4', startBeat: 54, duration: 2, velocity: 0.55, technique: 'vibrato_gentle' },

    // Fifth phrase - wandering melody
    { note: 'E5', startBeat: 56, duration: 0.5, velocity: 0.5, technique: 'legato' },
    { note: 'D5', startBeat: 56.5, duration: 0.5, velocity: 0.48, technique: 'legato' },
    { note: 'C5', startBeat: 57, duration: 0.5, velocity: 0.45, technique: 'legato' },
    { note: 'B4', startBeat: 57.5, duration: 0.5, velocity: 0.42, technique: 'legato' },
    { note: 'A4', startBeat: 58, duration: 1, velocity: 0.48, technique: 'vibrato_gentle' },
    { note: 'G4', startBeat: 59, duration: 0.5, velocity: 0.42, technique: 'legato' },
    { note: 'A4', startBeat: 59.5, duration: 0.5, velocity: 0.45, technique: 'legato' },
    { note: 'B4', startBeat: 60, duration: 0.5, velocity: 0.48, technique: 'legato' },
    { note: 'C5', startBeat: 60.5, duration: 0.5, velocity: 0.5, technique: 'legato' },
    { note: 'D5', startBeat: 61, duration: 0.5, velocity: 0.52, technique: 'legato' },
    { note: 'E5', startBeat: 61.5, duration: 1.5, velocity: 0.55, technique: 'vibrato_gentle' },
    { note: 'D5', startBeat: 63, duration: 1, velocity: 0.5, technique: 'legato' },

    // Final phrase - fading
    { note: 'C5', startBeat: 64, duration: 1, velocity: 0.5, technique: 'vibrato_gentle' },
    { note: 'B4', startBeat: 65, duration: 0.5, velocity: 0.45, technique: 'legato' },
    { note: 'A4', startBeat: 65.5, duration: 0.5, velocity: 0.42, technique: 'legato' },
    { note: 'G#4', startBeat: 66, duration: 1, velocity: 0.45, technique: 'vibrato_gentle' },
    { note: 'A4', startBeat: 67, duration: 1, velocity: 0.48, technique: 'vibrato_gentle' },
    { note: 'B4', startBeat: 68, duration: 1, velocity: 0.5, technique: 'vibrato_gentle' },
    { note: 'E5', startBeat: 69, duration: 1.5, velocity: 0.45, technique: 'vibrato_wide' },
    { note: 'D5', startBeat: 70.5, duration: 0.5, velocity: 0.38, technique: 'legato' },
    { note: 'A4', startBeat: 71, duration: 1, velocity: 0.35, technique: 'morendo' },
];

export const fullComposition = [
    ...buildUp,
    ...climax,
    ...recapitulation
];
