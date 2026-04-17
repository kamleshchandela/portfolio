import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import './ResumeViewer.css';

const ResumeViewer = () => {
    return (
        <section id="resume" className="resume-section">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-title"
            >
                My <span className="highlight">Resume</span>
            </motion.h2>
            
            <div className="resume-container">
                <motion.a 
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, rotateX: 2, rotateY: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ textDecoration: 'none', perspective: 1000 }}
                    className="resume-card"
                >
                    <div className="resume-preview">
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            className="resume-icon"
                        >
                            <FileText size={48} />
                        </motion.div>
                        <div className="resume-decoration"></div>
                    </div>
                    <div className="resume-info">
                        <h3>Kamlesh Chandela</h3>
                        <p>Full Stack Developer & UI/UX Designer</p>
                        <span className="resume-cta">
                            <ExternalLink size={18} />
                            <span>View Full Resume</span>
                        </span>
                    </div>
                    <div className="holographic-sheen" style={{ borderRadius: '20px' }}></div>
                </motion.a>
            </div>
        </section>
    );
};

export default ResumeViewer;