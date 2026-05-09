import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        const validLinks = ['home', 'skills', 'projects', 'figma-designs', 'hackathon', 'certificates', 'videos', 'experience', 'resume', 'contact'];
                        if (validLinks.includes(id)) {
                            setActiveSection(id);
                        }
                    }
                });
            },
            { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const handleNavigation = (sectionId) => {
        const path = sectionId === 'home' ? '/' : `/${sectionId}`;
        navigate(path);
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                {/* Left: Logo */}
                <div className="nav-logo-container" onClick={() => handleNavigation('home')}>
                    <div className="nav-logo-block even">K</div>
                    <div className="nav-logo-block odd">C</div>
                </div>

                {/* Right: Links & Utilities */}
                <div className="nav-content-right">
                    <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                        {['home', 'skills', 'projects', 'figma-designs', 'hackathon', 'certificates', 'videos', 'experience', 'resume', 'contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavigation(item)}
                                className={`nav-link ${activeSection === item ? 'active' : ''}`}
                            >
                                <span className="nav-text">
                                    {item === 'figma-designs' ? 'Figma-designs' : item.charAt(0).toUpperCase() + item.slice(1)}
                                    
                                    {/* Active Neon Underline */}
                                    {activeSection === item && (
                                        <motion.div
                                            layoutId="nav-active-underline"
                                            className="nav-active-underline"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="nav-utilities">
                        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
