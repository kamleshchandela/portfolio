import React, { useState, useEffect } from 'react';
import './InfinityStones.css';

import stonesImg from '../assets/stones.png';
import explosionImg from '../assets/explosion.png';

/* Corrected order mapping: 
   Top (50% 10%) = Blue
   Top-Right (85% 35%) = Yellow (Mind)
   Bottom-Right (85% 75%) = Red (Reality)
   Bottom (50% 90%) = Purple (Power)
   Bottom-Left (15% 75%) = Green (Time)
   Top-Left (15% 35%) = Orange (Soul)
*/
const stonesData = [
  { id: 'space', name: 'Space', color: '#0055ff', lightColor: '#0044cc', glow: '#00f3ff', startX: '-200vw', startY: '-100vh', rot: '-360deg', bgPos: '50% 10%' },
  { id: 'mind', name: 'Mind', color: '#ffcc00', lightColor: '#c29b00', glow: '#ffee55', startX: '200vw', startY: '-150vh', rot: '420deg', bgPos: '85% 35%' },
  { id: 'reality', name: 'Reality', color: '#ff0000', lightColor: '#cc0000', glow: '#ff5555', startX: '150vw', startY: '200vh', rot: '-200deg', bgPos: '85% 75%' },
  { id: 'power', name: 'Power', color: '#8800ff', lightColor: '#6a00cc', glow: '#cc55ff', startX: '0vw', startY: '250vh', rot: '250deg', bgPos: '50% 90%' },
  { id: 'time', name: 'Time', color: '#00ea00', lightColor: '#008b00', glow: '#55ff55', startX: '-150vw', startY: '150vh', rot: '-180deg', bgPos: '15% 75%' },
  { id: 'soul', name: 'Soul', color: '#ff5500', lightColor: '#cc4400', glow: '#ffaa22', startX: '-200vw', startY: '-100vh', rot: '300deg', bgPos: '15% 35%' },
];

const scatterParams = [
  { sx: '-200vw', sy: '-100vh' },
  { sx: '200vw', sy: '-100vh' },
  { sx: '150vw', sy: '150vh' },
  { sx: '0vw', sy: '250vh' },
  { sx: '-150vw', sy: '150vh' },
  { sx: '-200vw', sy: '-100vh' },
];

const InfinityStones = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedStone, setSelectedStone] = useState(null);
  const [explosionFlash, setExplosionFlash] = useState(false);
  const [themeOverlay, setThemeOverlay] = useState(false);

  const [appliedStone, setAppliedStone] = useState(null);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isActive]);

  const handleTriggerClick = () => {
    setIsActive(true);
    setSelectedStone(null);
    setExplosionFlash(false);
    setThemeOverlay(false);
  };

  const handleStoneClick = (stoneId, index, e) => {
    if (selectedStone) return; 

    const stone = stonesData.find((s) => s.id === stoneId);
    setSelectedStone(stoneId);

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = centerX - (rect.left + rect.width / 2);
    const dy = centerY - (rect.top + rect.height / 2);

    e.currentTarget.style.setProperty('--center-dx', `${dx}px`);
    e.currentTarget.style.setProperty('--center-dy', `${dy}px`);

    setTimeout(() => {
      setExplosionFlash(true);
      
      const rgbaGlow = hexToRgba(stone.color, 0.4);
      const rgbaBorder = hexToRgba(stone.color, 0.3);

      let styleEl = document.getElementById('infinity-theme-style');
      if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'infinity-theme-style';
          document.head.appendChild(styleEl);
      }
      
      // We explicitly retain Light Mode and Dark Mode backgrounds,
      // but overwrite the primary accents depending on the current active theme
      styleEl.innerHTML = `
          [data-theme="dark"] {
              --primary-color: ${stone.color} !important;
              --secondary-color: ${stone.glow} !important;
              --accent-glow: ${rgbaGlow} !important;
              --glass-border: ${rgbaBorder} !important;
          }
          [data-theme="light"] {
              --primary-color: ${stone.lightColor} !important;
              --secondary-color: ${stone.color} !important;
              --accent-glow: ${rgbaGlow} !important;
              --glass-border: ${rgbaBorder} !important;
          }
      `;

      setTimeout(() => {
         setThemeOverlay(true);
         setAppliedStone(stone);
         setTimeout(() => {
             setIsActive(false);
             setSelectedStone(null);
             setExplosionFlash(false);
             setThemeOverlay(false);
         }, 1000);
      }, 500);

    }, 2000); 
  };

  const hexToRgba = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const activeStoneData = stonesData.find((s) => s.id === selectedStone);

  return (
    <>
      {/* Hidden SVG Filter for Realistic 3D Rock Texture */}
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
        <defs>
          <filter id="rocky-texture" x="0%" y="0%" width="100%" height="100%">
             <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
             <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 2 -0.3" in="noise" result="coloredNoise" />
             <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
             <feBlend mode="multiply" in="texture" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      <button className={`infinity-trigger-btn ${appliedStone ? 'is-stone' : ''}`} onClick={handleTriggerClick}>
         {appliedStone ? (
             <div className="trigger-stone-image" style={{
                 '--bg-pos': appliedStone.bgPos,
                 '--stones-img': `url(${stonesImg})`,
                 '--stone-glow': appliedStone.glow
             }}></div>
         ) : (
             <div className="trigger-icon"></div>
         )}
      </button>

      <div 
        className={`infinity-overlay ${isActive ? 'active' : ''}`}
        style={activeStoneData ? {
            '--active-color': activeStoneData.color,
            '--active-glow': activeStoneData.glow
        } : {}}
      >
        <div className="overlay-stars"></div>
        
        <div className={`stones-container ${selectedStone ? 'has-selection' : ''}`}>
          {stonesData.map((stone, index) => {
             const isSelected = selectedStone === stone.id;
             
             return (
              <div 
                key={stone.id}
                className={`infinity-stone ${isSelected ? 'selected' : ''}`}
                onClick={(e) => handleStoneClick(stone.id, index, e)}
                style={{
                  '--start-x': stone.startX,
                  '--start-y': stone.startY,
                  '--start-rot': stone.rot,
                  '--scatter-x': scatterParams[index].sx,
                  '--scatter-y': scatterParams[index].sy,
                  '--stone-color': stone.color,
                  '--stone-glow': stone.glow,
                  '--delay': `${index * 0.15}s`,
                  '--bg-pos': stone.bgPos,
                  '--stones-img': `url(${stonesImg})`
                }}
              >
                  <div className="stone-glow-wrapper">
                      <div className="stone-body-image"></div>
                  </div>
              </div>
             )
          })}
        </div>

        {selectedStone && (
            <div className={`explosion-flash ${explosionFlash ? 'active' : ''}`}>
               <div className="cosmic-dust-image" style={{backgroundImage: `url(${explosionImg})`}}></div>
            </div>
        )}

        <div className={`theme-fade-overlay ${themeOverlay ? 'visible' : ''}`}></div>
      </div>
    </>
  );
};

export default InfinityStones;
