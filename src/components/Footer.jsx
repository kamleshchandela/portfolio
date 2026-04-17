import React from 'react';
import { Linkedin, Github, Youtube, Twitter, Code } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const socialLinks = [
        { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/kamlesh-chandela/", label: "LinkedIn" },
        { icon: <Github size={20} />, link: "https://github.com/kamleshchandela", label: "GitHub" },
        { icon: <Code size={20} />, link: "https://leetcode.com/u/KamleshChandela/", label: "LeetCode" },
        { icon: <Youtube size={20} />, link: "https://www.youtube.com/@KamleshChandela-z5e", label: "YouTube" },
        { icon: <Twitter size={20} />, link: "https://x.com/KamleshChandra_", label: "Twitter" },
    ];

    return (
        <footer className="footer-section">
            <div className="footer-content">
                <div className="footer-social">
                    {socialLinks.map((social, index) => (
                        <a 
                            key={index} 
                            href={social.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="social-icon"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
                <p>&copy; {new Date().getFullYear()} Kamlesh Chandela. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;