import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    }, [displayText, isDeleting, currentRole, roles]);

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
                <div className="hero-text">
                    <h2 className="hero-greeting fade-in-up">Hello, I'm</h2>
                    <h1 className="hero-name glitch" data-text="Kamlesh">Kamlesh</h1>
                    <h3 className="hero-role fade-in-up delay-1">
                        I am a <span className="highlight typing-text">{displayText}</span><span className="cursor">|</span>
                    </h3>
                    <p className="hero-description fade-in-up delay-2">
                        Crafting immersive digital experiences with modern web technologies.
                        Let's explore the endless possibilities of the web together.
                    </p>
                    <div className="hero-buttons fade-in-up delay-3">
                        <button className="btn btn-primary" onClick={() => navigate('/projects')}>View Work</button>
                        <button className="btn btn-resume" onClick={() => window.open('/resume.pdf', '_blank')}>
                            Resume
                            <span className="download-sub-btn" onClick={(e) => {
                                e.stopPropagation();
                                const link = document.createElement('a');
                                link.href = '/resume.pdf';
                                link.download = 'Kamlesh_Chandela_Resume.pdf';
                                link.click();
                            }} title="Download Resume">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                </svg>
                            </span>
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/contact')}>Contact Me</button>
                    </div>
                </div>
                <div className="hero-visual fade-in-right">
                    <div className="card-glass profile-card">
                        <div className="profile-image-container">
                            <img
                                src="https://res.cloudinary.com/dsuhb6swy/image/upload/v1767764610/Screenshot_2026-01-07_111318_cpzfzv.png"
                                alt="Kamlesh"
                                className="profile-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
