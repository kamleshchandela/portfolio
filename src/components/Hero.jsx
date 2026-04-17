import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    const roles = ["Full Stack Developer", "UI/UX Designer", "Creative Thinker", "Code Artisan"];
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const typeSpeed = isDeleting ? 100 : 200;
        const fullText = roles[currentRole];

        const type = () => {
            if (isDeleting) {
                setDisplayText(fullText.substring(0, displayText.length - 1));
            } else {
                setDisplayText(fullText.substring(0, displayText.length + 1));
            }

            if (!isDeleting && displayText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setCurrentRole((prev) => (prev + 1) % roles.length);
            }
        };

        const timer = setTimeout(type, typeSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentRole]);

    const handleMouseMove = (e) => {
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach(orb => {
            const speed = orb.getAttribute('data-speed');
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            orb.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    };

    return (
        <section id="home" className="hero-section" onMouseMove={handleMouseMove}>
            <div className="hero-bg-elements">
                <div className="orb orb-1" data-speed="2"></div>
                <div className="orb orb-2" data-speed="-2"></div>
                <div className="orb orb-3" data-speed="4"></div>
                <div className="grid-overlay"></div>
            </div>

            <div className="hero-content">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hero-text"
                >
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hero-greeting"
                    >
                        Hello, I'm
                    </motion.h2>
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="hero-name glitch" 
                        data-text="Kamlesh"
                    >
                        Kamlesh
                    </motion.h1>
                    <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="hero-role"
                    >
                        I am a <span className="highlight typing-text">{displayText}</span><span className="cursor">|</span>
                    </motion.h3>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="hero-description"
                    >
                        Crafting immersive digital experiences with modern web technologies.
                        Let's explore the endless possibilities of the web together.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="hero-buttons"
                    >
                        <button className="btn btn-primary" onClick={() => navigate('/projects')}>View Work</button>
                        <button className="btn btn-resume" onClick={() => window.open('/resume.pdf', '_blank')}>
                            Resume
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/contact')}>Contact Me</button>
                    </motion.div>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 50 }}
                    className="hero-visual"
                >
                    <div className="card-glass profile-card">
                        <div className="profile-image-container">
                            <img
                                src="https://res.cloudinary.com/dsuhb6swy/image/upload/v1767764610/Screenshot_2026-01-07_111318_cpzfzv.png"
                                alt="Kamlesh"
                                className="profile-image"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
