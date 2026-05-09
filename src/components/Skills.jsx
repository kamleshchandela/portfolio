import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Palette, FileCode, Terminal, GitBranch, Github, Atom, Server, Cpu, Figma, Cloud, Wrench, Globe, Layout } from 'lucide-react';
import './Skills.css';
import { useSoundEnabled } from '../context/SoundContext';

// Plays a soft ping only when sound is enabled globally
const playHoverTone = () => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.18);
    } catch (e) { /* silently ignore */ }
};

const Skills = () => {
    const { muted } = useSoundEnabled();
    const handleCardHover = () => { if (!muted) playHoverTone(); };
    const frontend = [
        { icon: <FileCode size={32} />, name: "HTML5", color: "#E34F26" },
        { icon: <Palette size={32} />, name: "CSS3", color: "#1572B6" },
        { icon: <Terminal size={32} />, name: "JavaScript", color: "#F7DF1E" },
        { icon: <Atom size={32} />, name: "React.js", color: "#61DAFB" },
        { icon: <Code2 size={32} />, name: "Tailwind CSS", color: "#38B2AC" },
        { icon: <Layout size={32} />, name: "Responsive UI", color: "#FF00FF" },
    ];

    const backend = [
        { icon: <Server size={32} />, name: "Node.js & Express(Basics)", color: "#339933" },
        { icon: <Database size={32} />, name: "MongoDB", color: "#47A248" },
    ];

    const tools = [
        { icon: <GitBranch size={32} />, name: "Git & GitHub", color: "#F05032" },
        { icon: <Figma size={32} />, name: "Figma", color: "#F24E1E" },
        { icon: <Globe size={32} />, name: "Postman", color: "#FF6C37" },
        { icon: <Cloud size={32} />, name: "Vercel, Netlify", color: "#A8B9CC" },
        { icon: <Database size={32} />, name: "Compass & Atlas", color: "#47A248" },
    ];

    const renderSkillCategory = (title, skillsArray, countOffset, delayOffset = 0) => (
        <div className="skill-category">
            <div className="category-header">
                <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: delayOffset }}
                    className="category-title"
                >
                    {title} <span>({countOffset})</span>
                </motion.h3>
                <div className="category-line"></div>
            </div>
            
            <motion.div 
                className="skills-container"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: delayOffset + 0.2 }}
            >
                {skillsArray.map((skill, index) => (
                    <motion.div 
                        whileHover={{ y: -3 }}
                        onMouseEnter={handleCardHover}
                        className="skill-card" 
                        key={index} 
                        style={{ '--accent-color': skill.color }}
                    >
                        <div className="skill-icon-wrapper" style={{ color: skill.color }}>
                            {skill.icon}
                        </div>
                        <div className="skill-card-content">
                            <h4 className="skill-name">{skill.name}</h4>
                            <span className="skill-level">Proficient</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );

    return (
        <section id="skills" className="skills-section">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-title"
            >
                My <span className="highlight">Tech Stack</span>
            </motion.h2>
            
            <div className="skills-layout">
                {renderSkillCategory("Frontend", frontend, frontend.length, 0.1)}
                {renderSkillCategory("Backend", backend, backend.length, 0.3)}
                {renderSkillCategory("Tools & Platforms", tools, tools.length, 0.5)}
            </div>
        </section>
    );
};

export default Skills;
