import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import './Experience.css';

const Experience = () => {
    const experiences = [
        {
            id: 1,
            company: "Google",
            role: "Lead Software Engineer",
            period: "Dec 2022 - Present",
            location: "Mountain View, CA",
            description: "Leading a team of 12 engineers to develop and maintain cloud infrastructure solutions. Optimization of core services to reduce latency by 40%."
        },
        {
            id: 2,
            company: "Apple",
            role: "Junior Software Engineer",
            period: "Jan 2021 - Nov 2022",
            location: "Cupertino, CA",
            description: "Developed and maintained iOS applications using Swift and Objective-C. Collaborated with design teams to implement new fluid interfaces."
        },
        {
            id: 3,
            company: "Meta",
            role: "Software Engineer",
            period: "Mar 2019 - Dec 2020",
            location: "Menlo Park, CA",
            description: "Built scalable web applications using React and Node.js. Integrated AI-driven features to enhance user engagement."
        }
    ];

    return (
        <section id="experience" className="experience-section">
            <h2 className="section-title">Professional <span className="highlight">Journey</span></h2>
            <div className="timeline-container">
                <div className="timeline-line"></div>
                {experiences.map((exp, index) => (
                    <div key={exp.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                        <div className="timeline-content card-glass">
                            <div className="exp-header">
                                <h3 className="exp-role">{exp.role}</h3>
                                <h4 className="exp-company">{exp.company}</h4>
                            </div>
                            <div className="exp-meta">
                                <span className="exp-period"><Calendar size={14} /> {exp.period}</span>
                                <span className="exp-location"><MapPin size={14} /> {exp.location}</span>
                            </div>
                            <p className="exp-description">{exp.description}</p>
                        </div>
                        <div className="timeline-dot"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
