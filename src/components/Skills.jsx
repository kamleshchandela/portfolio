import React from 'react';
import { Code2, Database, Palette, FileCode, Terminal, GitBranch, Github, Atom, Server, Cpu, Figma } from 'lucide-react';
import './Skills.css';

const Skills = () => {
    const skills = [
        { icon: <FileCode size={40} />, name: "HTML", color: "#E34F26" },
        { icon: <Palette size={40} />, name: "CSS", color: "#1572B6" },
        { icon: <Terminal size={40} />, name: "JavaScript", color: "#F7DF1E" },
        { icon: <Atom size={40} />, name: "React", color: "#61DAFB" },
        { icon: <Figma size={40} />, name: "Figma", color: "#F24E1E" },
        { icon: <Database size={40} />, name: "MongoDB", color: "#47A248" },
        { icon: <Server size={40} />, name: "API", color: "#00f3ff" },
        { icon: <GitBranch size={40} />, name: "Git", color: "#F05032" },
        { icon: <Github size={40} />, name: "GitHub", color: "#ffffff" },
        { icon: <Cpu size={40} />, name: "C Language", color: "#A8B9CC" },
    ];

    return (
        <section id="skills" className="skills-section">
            <h2 className="section-title">My <span className="highlight">Tech Stack</span></h2>
            <div className="skills-container">
                {skills.map((skill, index) => (
                    <div key={index} className="skill-card card-glass" style={{ '--accent-color': skill.color }}>
                        <div className="skill-icon-wrapper" style={{ color: skill.color }}>
                            {skill.icon}
                        </div>
                        <h3 className="skill-name">{skill.name}</h3>
                        <div className="skill-glow"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
