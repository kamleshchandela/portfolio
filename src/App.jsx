import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import YouTubeVideos from './components/YouTubeVideos';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

import LoadingScreen from './components/LoadingScreen';
import ScrollReveal from './components/ScrollReveal';
import SoundToggle from './components/SoundToggle';
import ChatBot from './components/ChatBot';
import { useSound } from './hooks/useSound';

function App() {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  const { muted, setMuted, playHover, playClick, playOn, playOff } = useSound(theme);


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Global Sound Event Listeners
  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .interactive, .card')) {
        playHover();
      }
    };

    const handleClick = (e) => {
      if (e.target.closest('a, button, .interactive, .card')) {
        playClick();
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, [playHover, playClick]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    if (theme === 'dark') playOff(); else playOn(); // Sound feedback on theme switch
  };

  // Handle sound feedback when mute state changes
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Play sound when unmuted
    if (!muted) {
      playOn();
    }
  }, [muted, playOn]);

  const toggleMute = () => {
    setMuted(prev => !prev);
  };

  const handleLoadingComplete = () => {
    setLoading(false);
    // Optional: playOn() here if you want sound on load completion, but might need user interaction firstT
  };

  return (
    <div className="app">
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!loading && (
        <>
          <SoundToggle muted={muted} toggleMute={toggleMute} />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Hero />
          <ScrollReveal><Skills /></ScrollReveal>
          <ScrollReveal><Projects /></ScrollReveal>
          <ScrollReveal><Certificates /></ScrollReveal>
          <ScrollReveal><YouTubeVideos /></ScrollReveal>
          <ScrollReveal><Experience /></ScrollReveal>
          <ScrollReveal><Contact /></ScrollReveal>
          <Footer />
          <ChatBot /> {/* Added ChatBot component */}
        </>
      )}
    </div>
  );
}

export default App;