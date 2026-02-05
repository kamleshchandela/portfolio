import React, { useState } from 'react';
import './ThemeRope.css';
import { useSound } from '../hooks/useSound';

const ThemeRope = ({ theme, toggleTheme }) => {
    const [isPulled, setIsPulled] = useState(false);
    const { playOff, playOn } = useSound(theme);

    const handlePull = () => {
        if (isPulled) return; // Prevent double clicks during animation

        setIsPulled(true);

        // Sound effect
        if (theme === 'dark') {
            playOn();
        } else {
            playOff();
        }

        // Toggle theme after a slight delay to sync with the "click" of the pull
        setTimeout(() => {
            toggleTheme();
        }, 300);

        // Reset animation state
        setTimeout(() => {
            setIsPulled(false);
        }, 1000); // Duration of the full bounce animation
    };

    return (
        <div className={`theme-rope-container ${isPulled ? 'pulled' : ''}`} onClick={handlePull}>
            <div className="rope-line"></div>
            <div className="rope-handle">
                <div className="handle-knob"></div>
                <div className="handle-bottom"></div>
            </div>
        </div>
    );
};

export default ThemeRope;
