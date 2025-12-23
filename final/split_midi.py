#!/usr/bin/env python3
"""
MIDI Splitter with proper note handling across segment boundaries.
Ensures notes that span segment boundaries are properly continued.
"""

import mido
import os
import sys
from collections import defaultdict

def analyze_midi(midi_path):
    """Analyze MIDI file and extract all notes with absolute timing."""
    mid = mido.MidiFile(midi_path)

    # Find tempo
    tempo = 500000  # default 120 BPM
    for track in mid.tracks:
        for msg in track:
            if msg.type == 'set_tempo':
                tempo = msg.tempo
                break

    print(f"MIDI: {midi_path}")
    print(f"  Ticks per beat: {mid.ticks_per_beat}")
    print(f"  Tempo: {tempo} microseconds/beat ({60000000/tempo:.1f} BPM)")
    print(f"  Length: {mid.length:.1f} seconds")
    print(f"  Tracks: {len(mid.tracks)}")

    # Extract all notes with start/end times
    notes = []  # (start_tick, end_tick, track_idx, channel, note, velocity)
    active_notes = {}  # (track_idx, channel, note) -> (start_tick, velocity)

    for track_idx, track in enumerate(mid.tracks):
        abs_tick = 0
        for msg in track:
            abs_tick += msg.time

            if msg.type == 'note_on' and msg.velocity > 0:
                key = (track_idx, msg.channel, msg.note)
                active_notes[key] = (abs_tick, msg.velocity)
            elif msg.type == 'note_off' or (msg.type == 'note_on' and msg.velocity == 0):
                key = (track_idx, msg.channel, msg.note)
                if key in active_notes:
                    start_tick, velocity = active_notes.pop(key)
                    notes.append((start_tick, abs_tick, track_idx, msg.channel, msg.note, velocity))

    # Close any remaining active notes at the end
    max_tick = max(n[1] for n in notes) if notes else 0
    for key, (start_tick, velocity) in active_notes.items():
        track_idx, channel, note = key
        notes.append((start_tick, max_tick, track_idx, channel, note, velocity))

    notes.sort(key=lambda x: x[0])
    print(f"  Total notes: {len(notes)}")

    return mid, tempo, notes


def split_midi(midi_path, output_dir, segment_seconds=30):
    """Split MIDI into segments with proper note handling."""

    mid, tempo, notes = analyze_midi(midi_path)

    os.makedirs(output_dir, exist_ok=True)

    ticks_per_beat = mid.ticks_per_beat
    # ticks = seconds * (1,000,000 / tempo) * ticks_per_beat
    ticks_per_segment = int(segment_seconds * 1000000 / tempo * ticks_per_beat)

    max_tick = max(n[1] for n in notes) if notes else 0
    num_segments = (max_tick // ticks_per_segment) + 1

    print(f"\nSplitting into {num_segments} segments of {segment_seconds}s ({ticks_per_segment} ticks) each")

    for seg_idx in range(num_segments):
        start_tick = seg_idx * ticks_per_segment
        end_tick = (seg_idx + 1) * ticks_per_segment

        # Find notes that are active in this segment
        segment_notes = []
        for note_start, note_end, track_idx, channel, note_num, velocity in notes:
            # Note overlaps with segment if: note_start < end_tick AND note_end > start_tick
            if note_start < end_tick and note_end > start_tick:
                # Clip note to segment boundaries
                clipped_start = max(note_start, start_tick) - start_tick
                clipped_end = min(note_end, end_tick) - start_tick
                segment_notes.append((clipped_start, clipped_end, track_idx, channel, note_num, velocity))

        # Create new MIDI file
        new_mid = mido.MidiFile(ticks_per_beat=ticks_per_beat)

        # Create tracks
        num_tracks = len(mid.tracks)
        for _ in range(num_tracks):
            new_mid.tracks.append(mido.MidiTrack())

        # Add tempo to first track
        new_mid.tracks[0].append(mido.MetaMessage('set_tempo', tempo=tempo, time=0))

        # Group notes by track
        track_events = defaultdict(list)  # track_idx -> [(tick, msg), ...]

        for clipped_start, clipped_end, track_idx, channel, note_num, velocity in segment_notes:
            # Note on
            track_events[track_idx].append((clipped_start, 'note_on', channel, note_num, velocity))
            # Note off
            track_events[track_idx].append((clipped_end, 'note_off', channel, note_num, 0))

        # Convert to MIDI messages with delta time
        for track_idx, events in track_events.items():
            events.sort(key=lambda x: (x[0], x[1] != 'note_on'))  # note_on before note_off at same tick

            prev_tick = 0
            for event in events:
                tick, msg_type, channel, note_num, velocity = event
                delta = tick - prev_tick

                if msg_type == 'note_on':
                    new_mid.tracks[track_idx].append(
                        mido.Message('note_on', channel=channel, note=note_num, velocity=velocity, time=delta)
                    )
                else:
                    new_mid.tracks[track_idx].append(
                        mido.Message('note_off', channel=channel, note=note_num, velocity=0, time=delta)
                    )
                prev_tick = tick

        # Save
        output_path = os.path.join(output_dir, f'segment_{seg_idx:02d}.mid')
        new_mid.save(output_path)

        print(f"  {output_path}: {len(segment_notes)} notes")

    print(f"\nDone! Segments saved to {output_dir}/")
    return num_segments


def analyze_boundaries(midi_path, segment_seconds=30):
    """Analyze what notes cross segment boundaries."""
    mid, tempo, notes = analyze_midi(midi_path)

    ticks_per_beat = mid.ticks_per_beat
    ticks_per_segment = int(segment_seconds * 1000000 / tempo * ticks_per_beat)

    max_tick = max(n[1] for n in notes) if notes else 0
    num_segments = (max_tick // ticks_per_segment) + 1

    print(f"\n=== Boundary Analysis ===")
    for seg_idx in range(num_segments - 1):
        boundary_tick = (seg_idx + 1) * ticks_per_segment

        # Find notes that cross this boundary
        crossing_notes = []
        for note_start, note_end, track_idx, channel, note_num, velocity in notes:
            if note_start < boundary_tick < note_end:
                crossing_notes.append((note_start, note_end, note_num, velocity))

        if crossing_notes:
            print(f"\nBoundary {seg_idx}/{seg_idx+1} at tick {boundary_tick}:")
            for start, end, note, vel in crossing_notes:
                print(f"  Note {note} (vel={vel}): {start} -> {end} (crosses by {end - boundary_tick} ticks)")


if __name__ == '__main__':
    midi_path = 'Swiatlo_w_Ciemnosci_Final2.mid'
    output_dir = 'midi_segments_v5'
    segment_seconds = 30

    # Analyze boundaries first
    analyze_boundaries(midi_path, segment_seconds)

    # Split
    print("\n" + "="*50)
    split_midi(midi_path, output_dir, segment_seconds)
