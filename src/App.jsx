import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Hackathon from './components/Hackathon';
import Certificates from './components/Certificates';
import YouTubeVideos from './components/YouTubeVideos';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FigmaDesigns from './components/FigmaDesigns';
import ResumeViewer from './components/ResumeViewer';
import './App.css';

import LoadingScreen from './components/LoadingScreen';
import ScrollReveal from './components/ScrollReveal';
import SoundToggle from './components/SoundToggle';
import ChatBot from './components/ChatBot';
import ThemeRope from './components/ThemeRope';
import { useSound } from './hooks/useSound';
import InfinityStones from './components/InfinityStones';
import SEOHead from './components/SEOHead';

// Per-route SEO — title is used AS-IS (complete, no modification in SEOHead)
const routeSEO = {

  // ── Home ─────────────────────────────────────── 57 chars
  '/': {
    title: 'Kamlesh Chandela — Full Stack Developer & UI/UX Designer',
    description:
      "I'm Kamlesh Chandela, a Full Stack Developer from India specializing in React, Node.js & MongoDB. I build fast, beautiful web apps. Available for freelance & full-time opportunities.",
    // ogDescription: punchier, for social shares (WhatsApp, LinkedIn, Facebook, Discord)
    ogDescription:
      "Full Stack Developer from India. I craft high-performance web apps using React, Node.js & MongoDB. Check out my portfolio — let's build something great together.",
    keywords:
      'Kamlesh Chandela, Full Stack Developer India, MERN Stack Developer, React Developer Portfolio, Hire Web Developer India, JavaScript Expert, UI UX Designer India',
  },

  // ── Skills ───────────────────────────────────── 47 chars
  '/skills': {
    title: 'Kamlesh Chandela — Skills & Tech Stack',
    description:
      'From React & Node.js to MongoDB & Figma — explore the complete tech stack of Kamlesh Chandela, a skilled MERN Stack Developer who builds end-to-end web solutions.',
    ogDescription:
      'React · Node.js · MongoDB · JavaScript · Figma · Git. See the full tech stack that powers every project Kamlesh Chandela builds.',
    keywords:
      'Kamlesh Chandela Skills, React.js Developer, Node.js Developer, MongoDB Developer, JavaScript Developer India, Figma UI Designer, MERN Stack Skills',
  },

  // ── Projects ─────────────────────────────────── 48 chars
  '/projects': {
    title: 'Kamlesh Chandela — Projects & Live Demos',
    description:
      'Explore 10+ live web projects by Kamlesh Chandela — Hotel clones, AI interfaces, API-driven apps & more. Built with React, JavaScript & REST APIs. See the work in action.',
    ogDescription:
      '10+ live React projects — from Hotel & Car clones to AI apps and Weather APIs. Every project is deployed and demo-ready. Check them out!',
    keywords:
      'Kamlesh Chandela Projects, React Projects India, JavaScript Web Projects, Frontend Developer Portfolio, Full Stack Projects, Live Demo Projects',
  },

  // ── Hackathon ────────────────────────────────── 53 chars
  '/hackathon': {
    title: 'Kamlesh Chandela — Hackathon Projects & Wins',
    description:
      'Kamlesh Chandela has competed in multiple hackathons — solving real problems under pressure with innovative web apps. Explore his hackathon journey, ideas, and results.',
    ogDescription:
      'Built under pressure, shipped in hours. Explore the hackathon projects where Kamlesh Chandela turned ideas into working web apps, fast.',
    keywords:
      'Kamlesh Chandela Hackathon, Web Hackathon India, Coding Competition, React Hackathon Projects, Full Stack Hackathon',
  },

  // ── Certificates ─────────────────────────────── 55 chars
  '/certificates': {
    title: 'Kamlesh Chandela — Certifications & Achievements',
    description:
      'View professional certifications of Kamlesh Chandela in Full Stack Development, React.js & MERN Stack — validating his expertise with industry-recognized credentials.',
    ogDescription:
      'Certified in Full Stack Web Development, React.js & MERN Stack. Real credentials, real expertise — see what Kamlesh Chandela has earned.',
    keywords:
      'Kamlesh Chandela Certificates, Full Stack Certification India, React Certification, MERN Stack Certificate, Web Development Achievement',
  },

  // ── Experience ───────────────────────────────── 53 chars
  '/experience': {
    title: 'Kamlesh Chandela — Work Experience & Internships',
    description:
      'Kamlesh Chandela brings real-world experience through internships and client projects — building production-grade MERN Stack applications that deliver results.',
    ogDescription:
      'From internships to real client projects — Kamlesh Chandela has hands-on experience building full-stack MERN applications that work in production.',
    keywords:
      'Kamlesh Chandela Experience, Full Stack Developer Internship, MERN Stack Work History, React Developer India, Frontend Developer Job',
  },

  // ── Contact ──────────────────────────────────── 60 chars
  '/contact': {
    title: 'Hire Kamlesh Chandela — Full Stack Developer, Open to Work',
    description:
      "Need a Full Stack Developer? Hire Kamlesh Chandela for freelance, contract, or full-time roles. Let's connect and build something extraordinary together.",
    ogDescription:
      "Open to Work. Looking for freelance, contract, or full-time opportunities. If you need a skilled Full Stack Developer — let's talk!",
    keywords:
      'Hire Full Stack Developer India, Contact Kamlesh Chandela, Freelance React Developer, MERN Stack Developer for Hire, Web Developer India',
  },

};

function App() {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { muted, setMuted, playHover, playClick, playOn, playOff } = useSound(theme);

  // Get the current route's SEO config — double fallback ensures title is ALWAYS defined
  const currentSEO = routeSEO[location.pathname] ?? routeSEO['/'];

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

  useEffect(() => {
    if (!loading) {
      const sectionId = location.pathname === '/' ? 'home' : location.pathname.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        // Slightly delay smooth scroll to let DOM layout settle
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.pathname, loading]);

  return (
    <div className="app">
      {/* Dynamic SEO — title & description change per route */}
      <SEOHead
        title={currentSEO.title}
        description={currentSEO.description}
        ogDescription={currentSEO.ogDescription}
        keywords={currentSEO.keywords}
        routePath={location.pathname}
      />
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
{!loading && (
        <>
          <ThemeRope theme={theme} toggleTheme={toggleTheme} />
          <SoundToggle muted={muted} toggleMute={toggleMute} />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Hero />
          <ScrollReveal><Skills /></ScrollReveal>
          <ScrollReveal><Projects /></ScrollReveal>
          <ScrollReveal><FigmaDesigns /></ScrollReveal>
          <ScrollReveal><Hackathon /></ScrollReveal>
          <ScrollReveal><Certificates /></ScrollReveal>
          <ScrollReveal><YouTubeVideos /></ScrollReveal>
          <ScrollReveal><Experience /></ScrollReveal>
          <ScrollReveal><ResumeViewer /></ScrollReveal>
          <ScrollReveal><Contact /></ScrollReveal>
          <Footer />
          <ChatBot />
          <InfinityStones />
        </>
      )}
    </div>
  );
}

export default App;