import { useState, useCallback, useRef, useEffect } from 'react';

export const useSound = (theme = 'dark') => {
    const [muted, setMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const timeoutRef = useRef(null);
    const audioContextRef = useRef(null);

    // Initial Scales
    // Light Mode: C Major Pentatonic (Bright, Happy) - C5, D5, E5, G5, A5, C6
    const majorScale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];

    // Dark Mode: A Minor Pentatonic (Deep, Cool, Mysterious) - A4, C5, D5, E5, G5, A5
    const minorScale = [440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

    // Select scale based on theme
    const activeScale = theme === 'light' ? majorScale : minorScale;

    const initAudio = useCallback(() => {
        if (!audioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    }, []);

    const playTone = useCallback((freq, type, duration, vol = 0.1, detune = 0) => {
        if (muted || !audioContextRef.current) return;

        // Visualizer State
        setIsPlaying(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsPlaying(false), duration * 1000 + 100);

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        if (detune) osc.detune.value = detune;

        // "Pluck" envelope
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(vol, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(now + duration + 0.1);
    }, [muted]);

    const playChord = useCallback((freqs, type, duration, vol = 0.1) => {
        freqs.forEach((f, i) => {
            // Slight staggger
            setTimeout(() => playTone(f, type, duration, vol), i * 30);
        });
    }, [playTone]);

    const playHover = useCallback(() => {
        initAudio();
        // Play random note from the ACTIVE scale
        const note = activeScale[Math.floor(Math.random() * activeScale.length)];

        // Tone nuance: Light = Sine (Pure), Dark = Triangle (Warmer) check not strictly needed but adds variety
        const waveType = theme === 'light' ? 'sine' : 'triangle';
        const volume = theme === 'light' ? 0.03 : 0.02; // Triangle is louder perceivably

        playTone(note, waveType, 0.6, volume);
    }, [playTone, initAudio, activeScale, theme]);

    const playClick = useCallback(() => {
        initAudio();
        if (theme === 'light') {
            // Major Third (Happy)
            playChord([523.25, 659.25], 'sine', 0.8, 0.08);
        } else {
            // Minor Third (Sad/Deep)
            playChord([440.00, 523.25], 'triangle', 0.8, 0.06);
        }
    }, [playChord, initAudio, theme]);

    const playOn = useCallback(() => {
        initAudio();
        // Ascending
        const notes = theme === 'light' ? [523.25, 659.25, 783.99, 1046.50] : [440.00, 523.25, 659.25, 880.00];
        playChord(notes, 'sine', 1.0, 0.05);
    }, [playChord, initAudio, theme]);

    const playOff = useCallback(() => {
        initAudio();
        // Descending
        const notes = theme === 'light' ? [1046.50, 783.99, 659.25, 523.25] : [880.00, 659.25, 523.25, 440.00];
        playChord(notes, 'triangle', 1.0, 0.05);
    }, [playChord, initAudio, theme]);

    return { muted, setMuted, playHover, playClick, playOn, playOff, initAudio, isPlaying };
};
