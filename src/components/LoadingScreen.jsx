import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Wait a bit after 100%
                    return 100;
                }
                // Random increments for a "realistic" feel
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="loading-logo">PORTFOLIO</div>
                <div className="loading-bar-container">
                    <div className="loading-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="loading-text">
                    Initializing System... {Math.min(progress, 100)}%
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
