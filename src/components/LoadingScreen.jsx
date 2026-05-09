import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Phase 0: 0s - 1.2s (Roll in, bounce, hit center)
        const t1 = setTimeout(() => setPhase(1), 1200);
        
        // Phase 1: 1.2s - 2.0s (Hold at center, circular words clearly visible)
        const t2 = setTimeout(() => setPhase(2), 2000);
        
        // Phase 2: 2.0s - 3.2s (Ring drops, circular letters move to horizontal)
        const t3 = setTimeout(() => setPhase(3), 3200);
        
        // Phase 3: 3.2s - 4.2s (Checkerboard Morph)
        const t4 = setTimeout(() => setPhase(4), 4200);
        
        // Phase 4: 4.2s - 5.2s (Gravity Drop, all fall except K and C)
        const t5 = setTimeout(() => setPhase(5), 5200);
        
        // Phase 5: 5.2s - 6.2s (Logo Slam & Final Name fade-in)
        const t6 = setTimeout(() => setPhase(6), 6200);

        // Fade out background: 6.5s - 7.0s
        const t7 = setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 500); // Unmount at 7.0s
        }, 6500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
            clearTimeout(t6);
            clearTimeout(t7);
        };
    }, [onComplete]);

    const word1 = "KAMLESH".split('');
    const word2 = "CHANDELA".split('');
    const allLetters = [...word1, ...word2]; // 15 letters total

    return (
        <div className={`loading-screen cn-loading-screen phase-${phase} ${fadeOut ? 'fade-out' : ''}`}>
            
            <div className="cn-coin-wrapper">
                
                {/* The hollow ring that drops in Phase 2 */}
                <div className="cn-coin-inner"></div>

                {/* The animated letters */}
                {allLetters.map((letter, i) => {
                    // Circular math: exactly uniform spacing for a premium look
                    const letterSpacingAngle = 18; // 18 degrees between each letter
                    let cxMult, cyMult, cr;
                    
                    if (i < 7) {
                        // Top word: KAMLESH (7 letters = 6 gaps = 108 deg span). Centered at 0.
                        const startAngle = -54; 
                        const angle = startAngle + (i * letterSpacingAngle);
                        const rad = angle * (Math.PI / 180);
                        cxMult = Math.sin(rad).toFixed(4);
                        cyMult = (-Math.cos(rad)).toFixed(4);
                        cr = angle.toFixed(2);
                    } else {
                        // Bottom word: CHANDELA (8 letters = 7 gaps = 126 deg span). Centered at 0 (bottom).
                        const j = i - 7;
                        const startAngle = 63; // Starts at bottom left
                        const angle = startAngle - (j * letterSpacingAngle);
                        const rad = angle * (Math.PI / 180);
                        cxMult = (-Math.sin(rad)).toFixed(4);
                        cyMult = Math.cos(rad).toFixed(4);
                        cr = angle.toFixed(2);
                    }

                    // Horizontal math
                    // KAMLESH (0-6) -> 7 letters
                    // CHANDELA (7-14) -> 8 letters
                    const isWord1 = i < 7;
                    const hxMult = isWord1 ? (i - 3) : (i - 7 - 3.5);
                    const hyMult = isWord1 ? -1 : 1;

                    // Identity for Phase 4 & 5 (Keep K and C)
                    const isK = i === 0;
                    const isC = i === 7;
                    const keepClass = (isK || isC) ? 'keep' : 'drop';
                    const logoClass = isK ? 'keep-k' : (isC ? 'keep-c' : '');

                    return (
                        <div 
                            key={`letter-${i}`} 
                            className={`cn-letter-wrapper ${phase >= 5 && (isK || isC) ? `logo-form ${logoClass}` : ''} ${phase >= 6 ? 'fly' : ''}`}
                            style={{
                                '--cx-mult': cxMult,
                                '--cy-mult': cyMult,
                                '--cr': `${cr}deg`,
                                '--hx-mult': hxMult,
                                '--hy-mult': hyMult
                            }}
                        >
                            <div className={`cn-letter-box ${i % 2 === 0 ? 'even' : 'odd'} ${keepClass}`}>
                                <span className="cn-letter">{letter}</span>
                            </div>
                        </div>
                    );
                })}

                {phase >= 5 && (
                    <div className="cn-final-text">
                        KAMLESH CHANDELA
                    </div>
                )}
            </div>

        </div>
    );
};

export default LoadingScreen;
