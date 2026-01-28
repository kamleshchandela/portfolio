import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './SoundToggle.css';

const SoundToggle = ({ muted, toggleMute }) => {
    return (
        <button
            className={`sound-toggle ${muted ? 'muted' : ''}`}
            onClick={toggleMute}
            aria-label={muted ? "Unmute Sound" : "Mute Sound"}
        >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            <span className="sound-tooltip">{muted ? "Sound Off" : "Sound On"}</span>
        </button>
    );
};

export default SoundToggle;
