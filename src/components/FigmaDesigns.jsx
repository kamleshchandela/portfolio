import React from 'react';
import { Figma, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import './FigmaDesigns.css';

const FigmaDesigns = () => {
    const design = {
        title: "Hotel Management System",
        description: "Complete UI/UX design for a Hotel Management System featuring clean layouts, seamless reservations, intuitive dashboard interfaces, and a modern glassmorphism aesthetic.",
        thumbnail: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776343845/Screenshot_2026-04-16_182037_cmhm7t.png",
        figmaLink: "https://www.figma.com/design/x5BIDmYFHOrYh92JZy0nmK/Untitled?node-id=0-1&t=wnYkkY5RHjxsqUBp-1",
        category: "UI/UX Design"
    };

    return (
        <section id="figma-designs" className="figma-section">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-title"
            >
                Figma <span className="highlight">Designs</span>
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="section-subtitle"
            >
                UI/UX designs created using Figma
            </motion.p>
            
            <div className="figma-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.a 
                    href={design.figmaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="figma-card"
                    style={{ maxWidth: '600px', width: '100%', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                    <div className="figma-thumbnail">
                        <img src={design.thumbnail} alt={design.title} style={{ objectFit: 'cover' }} />
                        <div className="figma-overlay">
                            <span 
                                className="figma-btn figma-link-btn"
                                aria-label="Open in Figma"
                                style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary-color)', color: 'white' }}
                            >
                                <Figma size={30} />
                            </span>
                        </div>
                        <span className="figma-category">{design.category}</span>
                    </div>
                    <div className="figma-info" style={{ textAlign: 'center' }}>
                        <h3 className="figma-title">{design.title}</h3>
                        <p className="figma-description">{design.description}</p>
                    </div>
                </motion.a>
            </div>
        </section>
    );
};

export default FigmaDesigns;