import React, { useState, useEffect } from 'react';
import './Navbar.css';

import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                        const validLinks = ['home', 'skills', 'projects', 'hackathon', 'certificates', 'videos', 'experience', 'contact'];
                        if (validLinks.includes(id)) {
                            setActiveSection(id);
                        }
                    }
                });
            },
            // Using rootMargin to effectively draw a line across the middle of the viewport
            // Any section crossing this area becomes active. Solves the issue with very tall sections.
            { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
            setMobileMenuOpen(false); // Close mobile menu on click
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo" onClick={() => scrollToSection('home')}>KAMLESH</div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Nav Links (Desktop + Mobile) */}
                <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                    {['home', 'skills', 'projects', 'hackathon', 'certificates', 'videos', 'experience', 'contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className={`nav-link ${activeSection === item ? 'active' : ''}`}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    ))}
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
