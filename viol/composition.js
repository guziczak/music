// ============================================
// VIOLIN COMPOSITION - "Swiatlo w Ciemnosci"
// FIRST POSITION ONLY - E STRING FEATURED
// ============================================

export const sections = [
    { name: 'Build-up', startBeat: 0, key: 'A minor', mood: 'Intensifying', dynamics: 'mf → ff' },
    { name: 'CLIMAX', startBeat: 8, key: 'A minor', mood: 'EXPLOSIVE', dynamics: 'fff' },
    { name: 'Recapitulation', startBeat: 40, key: 'A minor', mood: 'Haunting', dynamics: 'mp → ppp' }
];

export const TOTAL_BEATS = 76;

// ============ BUILD-UP (0-8) ============
export const buildUp = [
    // Tremolo start - A string
    { note: 'A4', startBeat: 0, duration: 0.5, velocity: 0.5, technique: 'tremolo' },
    { note: 'C5', startBeat: 0, duration: 0.5, velocity: 0.55, technique: 'tremolo' },

    // String crossing G→E
    { note: 'G3', startBeat: 0.5, duration: 0.125, velocity: 0.7, technique: 'spiccato' },
    { note: 'E5', startBeat: 0.625, duration: 0.125, velocity: 0.85, technique: 'spiccato' },
    { note: 'G3', startBeat: 0.75, duration: 0.125, velocity: 0.72, technique: 'spiccato' },
    { note: 'F5', startBeat: 0.875, duration: 0.125, velocity: 0.88, technique: 'spiccato' },

    // Bariolage A↔E strings
    { note: 'A4', startBeat: 1, duration: 0.125, velocity: 0.75, technique: 'bariolage' },
    { note: 'E5', startBeat: 1.125, duration: 0.125, velocity: 0.78, technique: 'bariolage' },
    { note: 'B4', startBeat: 1.25, duration: 0.125, velocity: 0.8, technique: 'bariolage' },
    { note: 'F5', startBeat: 1.375, duration: 0.125, velocity: 0.82, technique: 'bariolage' },
    { note: 'C5', startBeat: 1.5, duration: 0.125, velocity: 0.85, technique: 'bariolage' },
    { note: 'G5', startBeat: 1.625, duration: 0.125, velocity: 0.88, technique: 'bariolage' },
    { note: 'D5', startBeat: 1.75, duration: 0.125, velocity: 0.9, technique: 'bariolage' },
    { note: 'A5', startBeat: 1.875, duration: 0.125, velocity: 0.92, technique: 'bariolage' },

    // Trill on A string
    { note: 'D5', startBeat: 2, duration: 1, velocity: 0.95, technique: 'trill' },

    // Chromatic run on E string (first position)
    { note: 'E5', startBeat: 3, duration: 0.125, velocity: 0.85, technique: 'ricochet' },
    { note: 'F5', startBeat: 3.125, duration: 0.125, velocity: 0.87, technique: 'ricochet' },
    { note: 'F#5', startBeat: 3.25, duration: 0.125, velocity: 0.89, technique: 'ricochet' },
    { note: 'G5', startBeat: 3.375, duration: 0.125, velocity: 0.91, technique: 'ricochet' },
    { note: 'G#5', startBeat: 3.5, duration: 0.125, velocity: 0.93, technique: 'ricochet' },
    { note: 'A5', startBeat: 3.625, duration: 0.125, velocity: 0.95, technique: 'ricochet' },
    { note: 'A5', startBeat: 3.75, duration: 0.25, velocity: 1.0, technique: 'sforzando' },

    // Big chord
    { note: 'A4', startBeat: 4, duration: 1, velocity: 0.95, technique: 'sforzando' },
    { note: 'E5', startBeat: 4, duration: 1, velocity: 1.0, technique: 'sforzando' },

    // Sul ponticello E string
    { note: 'G5', startBeat: 5, duration: 0.5, velocity: 0.85, technique: 'sul_ponticello' },
    { note: 'G#5', startBeat: 5.5, duration: 0.5, velocity: 0.88, technique: 'sul_ponticello' },

    // Tremolo crescendo
    { note: 'E5', startBeat: 6, duration: 0.5, velocity: 0.9, technique: 'tremolo' },
    { note: 'G#5', startBeat: 6, duration: 0.5, velocity: 0.88, technique: 'tremolo' },
    { note: 'E5', startBeat: 6.5, duration: 0.5, velocity: 0.95, technique: 'tremolo' },
    { note: 'A5', startBeat: 6.5, duration: 0.5, velocity: 0.92, technique: 'tremolo' },

    // 32nd notes descending E string
    { note: 'A5', startBeat: 7, duration: 0.0625, velocity: 0.95, technique: 'flying_staccato' },
    { note: 'G#5', startBeat: 7.0625, duration: 0.0625, velocity: 0.93, technique: 'flying_staccato' },
    { note: 'G5', startBeat: 7.125, duration: 0.0625, velocity: 0.95, technique: 'flying_staccato' },
    { note: 'F#5', startBeat: 7.1875, duration: 0.0625, velocity: 0.97, technique: 'flying_staccato' },
    { note: 'F5', startBeat: 7.25, duration: 0.0625, velocity: 0.95, technique: 'flying_staccato' },
    { note: 'E5', startBeat: 7.3125, duration: 0.0625, velocity: 0.97, technique: 'flying_staccato' },
    { note: 'F5', startBeat: 7.375, duration: 0.0625, velocity: 0.98, technique: 'flying_staccato' },
    { note: 'G5', startBeat: 7.4375, duration: 0.0625, velocity: 0.99, technique: 'flying_staccato' },
    { note: 'A5', startBeat: 7.5, duration: 0.5, velocity: 1.0, technique: 'sforzando' },
];

// ============ CLIMAX (8-40) - THE DROP ============
export const climax = [
    // THE DROP - all strings!
    { note: 'G3', startBeat: 8, duration: 0.25, velocity: 1.0, technique: 'sforzando' },
    { note: 'D4', startBeat: 8, duration: 0.25, velocity: 1.0, technique: 'sforzando' },
    { note: 'A4', startBeat: 8, duration: 0.25, velocity: 1.0, technique: 'sforzando' },
    { note: 'E5', startBeat: 8, duration: 0.25, velocity: 1.0, technique: 'sforzando' },

    // Jump G→E string
    { note: 'G3', startBeat: 8.25, duration: 0.125, velocity: 0.95, technique: 'sforzando' },
    { note: 'A5', startBeat: 8.375, duration: 0.125, velocity: 1.0, technique: 'sforzando' },

    // Run down E string
    { note: 'A5', startBeat: 8.5, duration: 0.0625, velocity: 1.0, technique: 'ricochet' },
    { note: 'G#5', startBeat: 8.5625, duration: 0.0625, velocity: 0.98, technique: 'ricochet' },
    { note: 'G5', startBeat: 8.625, duration: 0.0625, velocity: 0.96, technique: 'ricochet' },
    { note: 'F#5', startBeat: 8.6875, duration: 0.0625, velocity: 0.98, technique: 'ricochet' },
    { note: 'F5', startBeat: 8.75, duration: 0.0625, velocity: 0.96, technique: 'ricochet' },
    { note: 'E5', startBeat: 8.8125, duration: 0.1875, velocity: 1.0, technique: 'sforzando' },

    // Theme
    { note: 'E5', startBeat: 9, duration: 1, velocity: 1.0, technique: 'fortissimo' },
    { note: 'D5', startBeat: 10, duration: 0.25, velocity: 0.95, technique: 'martele' },
    { note: 'C5', startBeat: 10.25, duration: 0.75, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'B4', startBeat: 11, duration: 0.25, velocity: 0.92, technique: 'martele' },
    { note: 'A4', startBeat: 11.25, duration: 0.75, velocity: 0.95, technique: 'vibrato_intense' },

    // Bariolage D↔E
    { note: 'D4', startBeat: 12, duration: 0.125, velocity: 0.95, technique: 'bariolage' },
    { note: 'G5', startBeat: 12.125, duration: 0.125, velocity: 0.97, technique: 'bariolage' },
    { note: 'E4', startBeat: 12.25, duration: 0.125, velocity: 0.95, technique: 'bariolage' },
    { note: 'A5', startBeat: 12.375, duration: 0.125, velocity: 0.98, technique: 'bariolage' },
    { note: 'F4', startBeat: 12.5, duration: 0.125, velocity: 0.95, technique: 'bariolage' },
    { note: 'G5', startBeat: 12.625, duration: 0.125, velocity: 0.97, technique: 'bariolage' },
    { note: 'G4', startBeat: 12.75, duration: 0.125, velocity: 0.95, technique: 'bariolage' },
    { note: 'F5', startBeat: 12.875, duration: 0.125, velocity: 1.0, technique: 'bariolage' },

    // Sustained
    { note: 'A5', startBeat: 13, duration: 1.5, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'G5', startBeat: 14.5, duration: 0.5, velocity: 0.98, technique: 'portamento' },
    { note: 'F5', startBeat: 15, duration: 0.5, velocity: 0.95, technique: 'martele' },
    { note: 'E5', startBeat: 15.5, duration: 0.5, velocity: 0.98, technique: 'martele' },

    // Rising
    { note: 'E5', startBeat: 16, duration: 0.5, velocity: 1.0, technique: 'sforzando' },
    { note: 'F5', startBeat: 16.5, duration: 0.25, velocity: 0.96, technique: 'legato' },
    { note: 'G5', startBeat: 16.75, duration: 0.75, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'A5', startBeat: 17.5, duration: 1, velocity: 1.0, technique: 'trill' },

    { note: 'G5', startBeat: 18.5, duration: 0.25, velocity: 0.9, technique: 'martele' },
    { note: 'F5', startBeat: 18.75, duration: 0.25, velocity: 0.85, technique: 'martele' },

    // Double stops A+E strings
    { note: 'A4', startBeat: 19, duration: 0.5, velocity: 1.0, technique: 'double_stop' },
    { note: 'E5', startBeat: 19, duration: 0.5, velocity: 1.0, technique: 'double_stop' },
    { note: 'B4', startBeat: 19.5, duration: 0.25, velocity: 0.95, technique: 'double_stop' },
    { note: 'F5', startBeat: 19.5, duration: 0.25, velocity: 0.95, technique: 'double_stop' },
    { note: 'C5', startBeat: 19.75, duration: 0.25, velocity: 0.92, technique: 'double_stop' },
    { note: 'G5', startBeat: 19.75, duration: 0.25, velocity: 0.92, technique: 'double_stop' },

    // Scale run
    { note: 'D4', startBeat: 20, duration: 0.125, velocity: 0.9, technique: 'flying_staccato' },
    { note: 'E4', startBeat: 20.125, duration: 0.125, velocity: 0.92, technique: 'flying_staccato' },
    { note: 'F4', startBeat: 20.25, duration: 0.125, velocity: 0.94, technique: 'flying_staccato' },
    { note: 'G4', startBeat: 20.375, duration: 0.125, velocity: 0.96, technique: 'flying_staccato' },
    { note: 'A4', startBeat: 20.5, duration: 0.125, velocity: 0.98, technique: 'flying_staccato' },
    { note: 'B4', startBeat: 20.625, duration: 0.125, velocity: 0.98, technique: 'flying_staccato' },
    { note: 'C5', startBeat: 20.75, duration: 0.125, velocity: 1.0, technique: 'flying_staccato' },
    { note: 'D5', startBeat: 20.875, duration: 0.125, velocity: 1.0, technique: 'flying_staccato' },

    // Land on E string
    { note: 'E5', startBeat: 21, duration: 0.5, velocity: 1.0, technique: 'sforzando' },
    { note: 'A5', startBeat: 21.5, duration: 0.5, velocity: 1.0, technique: 'sforzando' },

    // Tremolo
    { note: 'G5', startBeat: 22, duration: 0.5, velocity: 0.95, technique: 'tremolo' },
    { note: 'F5', startBeat: 22.5, duration: 0.5, velocity: 0.9, technique: 'tremolo' },
    { note: 'E5', startBeat: 23, duration: 0.5, velocity: 0.92, technique: 'vibrato_intense' },
    { note: 'F5', startBeat: 23.5, duration: 0.5, velocity: 0.95, technique: 'portamento' },

    // Ornamented
    { note: 'E5', startBeat: 24, duration: 0.25, velocity: 1.0, technique: 'sforzando' },
    { note: 'F5', startBeat: 24.25, duration: 0.0625, velocity: 0.9, technique: 'grace' },
    { note: 'E5', startBeat: 24.3125, duration: 0.0625, velocity: 0.92, technique: 'grace' },
    { note: 'D#5', startBeat: 24.375, duration: 0.0625, velocity: 0.94, technique: 'grace' },
    { note: 'E5', startBeat: 24.4375, duration: 0.5625, velocity: 1.0, technique: 'vibrato_intense' },

    { note: 'D5', startBeat: 25, duration: 0.25, velocity: 0.95, technique: 'martele' },
    { note: 'C5', startBeat: 25.25, duration: 0.5, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'B4', startBeat: 25.75, duration: 0.0625, velocity: 0.9, technique: 'glissando' },
    { note: 'A#4', startBeat: 25.8125, duration: 0.0625, velocity: 0.88, technique: 'glissando' },
    { note: 'A4', startBeat: 25.875, duration: 0.125, velocity: 0.86, technique: 'glissando' },

    { note: 'A4', startBeat: 26, duration: 0.5, velocity: 0.98, technique: 'vibrato_intense' },
    { note: 'B4', startBeat: 26.5, duration: 0.25, velocity: 0.92, technique: 'martele' },
    { note: 'C5', startBeat: 26.75, duration: 0.25, velocity: 0.95, technique: 'martele' },
    { note: 'D5', startBeat: 27, duration: 0.5, velocity: 0.9, technique: 'legato' },
    { note: 'E5', startBeat: 27.5, duration: 0.5, velocity: 0.95, technique: 'vibrato_intense' },

    // PEAK
    { note: 'A4', startBeat: 28, duration: 0.125, velocity: 1.0, technique: 'sforzando' },
    { note: 'E5', startBeat: 28.0625, duration: 0.125, velocity: 1.0, technique: 'sforzando' },
    { note: 'A5', startBeat: 28.125, duration: 0.875, velocity: 1.0, technique: 'sforzando' },

    { note: 'G5', startBeat: 29, duration: 0.5, velocity: 1.0, technique: 'fortissimo' },
    { note: 'A5', startBeat: 29.5, duration: 1.5, velocity: 1.0, technique: 'vibrato_wide' },

    // Spiccato
    { note: 'A5', startBeat: 31, duration: 0.125, velocity: 0.95, technique: 'spiccato' },
    { note: 'G5', startBeat: 31.125, duration: 0.125, velocity: 0.92, technique: 'spiccato' },
    { note: 'F5', startBeat: 31.25, duration: 0.125, velocity: 0.9, technique: 'spiccato' },
    { note: 'E5', startBeat: 31.375, duration: 0.125, velocity: 0.88, technique: 'spiccato' },
    { note: 'D5', startBeat: 31.5, duration: 0.5, velocity: 1.0, technique: 'sforzando' },

    // Descent
    { note: 'G5', startBeat: 32, duration: 0.75, velocity: 1.0, technique: 'fortissimo' },
    { note: 'F5', startBeat: 32.75, duration: 0.25, velocity: 0.95, technique: 'martele' },
    { note: 'E5', startBeat: 33, duration: 0.25, velocity: 0.92, technique: 'martele' },
    { note: 'D5', startBeat: 33.25, duration: 0.75, velocity: 1.0, technique: 'vibrato_intense' },
    { note: 'C5', startBeat: 34, duration: 0.25, velocity: 0.9, technique: 'martele' },
    { note: 'B4', startBeat: 34.25, duration: 0.25, velocity: 0.95, technique: 'martele' },

    // Col legno
    { note: 'A4', startBeat: 34.5, duration: 0.25, velocity: 0.6, technique: 'col_legno' },
    { note: 'G#4', startBeat: 34.75, duration: 0.25, velocity: 0.55, technique: 'col_legno' },
    { note: 'A4', startBeat: 35, duration: 0.5, velocity: 0.65, technique: 'col_legno' },
    { note: 'B4', startBeat: 35.5, duration: 0.5, velocity: 0.7, technique: 'col_legno' },

    // Final burst
    { note: 'C5', startBeat: 36, duration: 0.5, velocity: 1.0, technique: 'sforzando' },
    { note: 'E5', startBeat: 36, duration: 0.5, velocity: 1.0, technique: 'sforzando' },

    // Arpeggio
    { note: 'A4', startBeat: 36.5, duration: 0.125, velocity: 0.95, technique: 'ricochet' },
    { note: 'C5', startBeat: 36.625, duration: 0.125, velocity: 0.97, technique: 'ricochet' },
    { note: 'E5', startBeat: 36.75, duration: 0.125, velocity: 0.98, technique: 'ricochet' },
    { note: 'A5', startBeat: 36.875, duration: 0.625, velocity: 1.0, technique: 'sforzando' },

    // Trill and descent
    { note: 'G5', startBeat: 37.5, duration: 0.5, velocity: 0.98, technique: 'trill' },
    { note: 'F5', startBeat: 38, duration: 0.5, velocity: 0.95, technique: 'vibrato_intense' },
    { note: 'E5', startBeat: 38.5, duration: 0.5, velocity: 0.92, technique: 'legato' },

    // Final note
    { note: 'E5', startBeat: 39, duration: 1, velocity: 1.0, technique: 'vibrato_wide' },
];

// ============ RECAPITULATION (40-76) ============
export const recapitulation = [
    // Harmonics
    { note: 'E5', startBeat: 40, duration: 2, velocity: 0.4, technique: 'harmonic' },
    { note: 'A5', startBeat: 42, duration: 1.5, velocity: 0.35, technique: 'harmonic' },
    { note: 'G5', startBeat: 43.5, duration: 0.5, velocity: 0.3, technique: 'harmonic' },

    // Sul tasto
    { note: 'E5', startBeat: 44, duration: 1, velocity: 0.45, technique: 'sul_tasto' },
    { note: 'D5', startBeat: 45, duration: 0.5, velocity: 0.4, technique: 'sul_tasto' },
    { note: 'C5', startBeat: 45.5, duration: 0.5, velocity: 0.38, technique: 'sul_tasto' },
    { note: 'D5', startBeat: 46, duration: 1, velocity: 0.42, technique: 'sul_tasto' },
    { note: 'E5', startBeat: 47, duration: 0.5, velocity: 0.4, technique: 'sul_tasto' },
    { note: 'F5', startBeat: 47.5, duration: 0.5, velocity: 0.45, technique: 'sul_tasto' },

    // Pizzicato
    { note: 'E5', startBeat: 48, duration: 0.25, velocity: 0.55, technique: 'pizzicato' },
    { note: 'G5', startBeat: 48.5, duration: 0.25, velocity: 0.5, technique: 'pizzicato' },
    { note: 'A5', startBeat: 49, duration: 0.25, velocity: 0.45, technique: 'pizzicato' },
    { note: 'E5', startBeat: 49.5, duration: 0.5, velocity: 0.4, technique: 'pizzicato' },

    // Gentle melody
    { note: 'E5', startBeat: 50, duration: 1, velocity: 0.5, technique: 'vibrato_gentle' },
    { note: 'F5', startBeat: 51, duration: 1, velocity: 0.52, technique: 'vibrato_gentle' },
    { note: 'E5', startBeat: 52, duration: 0.5, velocity: 0.48, technique: 'legato' },
    { note: 'D5', startBeat: 52.5, duration: 0.5, velocity: 0.45, technique: 'legato' },

    // Sighing
    { note: 'C5', startBeat: 53, duration: 1.5, velocity: 0.5, technique: 'vibrato_gentle' },
    { note: 'B4', startBeat: 54.5, duration: 0.5, velocity: 0.45, technique: 'portamento' },
    { note: 'A4', startBeat: 55, duration: 2, velocity: 0.48, technique: 'vibrato_gentle' },

    // Wandering
    { note: 'E5', startBeat: 57, duration: 0.5, velocity: 0.42, technique: 'sul_tasto' },
    { note: 'D5', startBeat: 57.5, duration: 0.5, velocity: 0.4, technique: 'sul_tasto' },
    { note: 'C5', startBeat: 58, duration: 0.5, velocity: 0.38, technique: 'sul_tasto' },
    { note: 'B4', startBeat: 58.5, duration: 0.5, velocity: 0.36, technique: 'sul_tasto' },
    { note: 'A4', startBeat: 59, duration: 1, velocity: 0.4, technique: 'vibrato_gentle' },

    // Memory spark
    { note: 'A4', startBeat: 60, duration: 0.25, velocity: 0.35, technique: 'legato' },
    { note: 'B4', startBeat: 60.25, duration: 0.25, velocity: 0.38, technique: 'legato' },
    { note: 'C5', startBeat: 60.5, duration: 0.25, velocity: 0.4, technique: 'legato' },
    { note: 'D5', startBeat: 60.75, duration: 0.25, velocity: 0.42, technique: 'legato' },
    { note: 'E5', startBeat: 61, duration: 0.25, velocity: 0.45, technique: 'legato' },
    { note: 'F5', startBeat: 61.25, duration: 0.75, velocity: 0.48, technique: 'vibrato_gentle' },
    { note: 'E5', startBeat: 62, duration: 0.5, velocity: 0.42, technique: 'legato' },
    { note: 'D5', startBeat: 62.5, duration: 0.5, velocity: 0.38, technique: 'legato' },
    { note: 'C5', startBeat: 63, duration: 1, velocity: 0.4, technique: 'vibrato_gentle' },

    // Final descent
    { note: 'E5', startBeat: 64, duration: 1, velocity: 0.42, technique: 'vibrato_gentle' },
    { note: 'D5', startBeat: 65, duration: 0.5, velocity: 0.38, technique: 'legato' },
    { note: 'C5', startBeat: 65.5, duration: 0.5, velocity: 0.35, technique: 'legato' },
    { note: 'B4', startBeat: 66, duration: 1, velocity: 0.38, technique: 'vibrato_gentle' },
    { note: 'A4', startBeat: 67, duration: 1, velocity: 0.4, technique: 'vibrato_gentle' },

    // Ethereal ending
    { note: 'E5', startBeat: 68, duration: 1, velocity: 0.35, technique: 'harmonic' },
    { note: 'A5', startBeat: 69, duration: 1.5, velocity: 0.3, technique: 'harmonic' },
    { note: 'E5', startBeat: 70.5, duration: 0.5, velocity: 0.25, technique: 'harmonic' },

    // Morendo
    { note: 'A4', startBeat: 71, duration: 3, velocity: 0.28, technique: 'morendo' },
    { note: 'E5', startBeat: 73, duration: 2, velocity: 0.2, technique: 'harmonic' },
    { note: 'A4', startBeat: 75, duration: 1, velocity: 0.12, technique: 'harmonic' },
];

export const fullComposition = [
    ...buildUp,
    ...climax,
    ...recapitulation
];
