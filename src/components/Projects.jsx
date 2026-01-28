import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const ProjectCard = ({ project }) => {
    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 60; // Was 25, increased to 60 for VERY subtle premium tilt
        const y = (e.clientY - top - height / 2) / 60;
        setStyle({ transform: `rotateY(${x}deg) rotateX(${-y}deg)` });
    };

    const handleMouseLeave = () => {
        setStyle({ transform: `rotateY(0deg) rotateX(0deg)` });
    };

    return (
        <div
            className="project-card-3d"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style}
        >
            <div className="project-card-content">
                <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} className="project-image" />
                    <div className="project-overlay">
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub Repo">
                                <Github size={24} />
                            </a>
                        )}
                        {project.demoLink && (
                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Live Demo">
                                <ExternalLink size={24} />
                            </a>
                        )}
                    </div>
                </div>
                <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="project-tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="holographic-sheen"></div>
        </div>
    );
};

const Projects = () => {
    // REPLACE THIS WITH YOUR ACTUAL NETLIFY LINK (e.g., "https://my-portfolio.netlify.app")
    const BASE_URL = "https://chandelakamlesh1.netlify.app";

    const projects = [
        {
            id: 1,
            title: "Taj Hotel Clone",
            description: "A clone of the Taj Hotel website demonstrating layout and design skills.",
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/tajhotel",
            demoLink: `${BASE_URL}/diwali/tajhotel/index.html`
        },
        {
            id: 2,
            title: "Cars24 Clone",
            description: "A replica of the Cars24 platform.",
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/car24",
            demoLink: `${BASE_URL}/diwali/car24/index.html`
        },
        {
            id: 3,
            title: "Nansen Clone",
            description: "Clone of the Nansen.ai analytics platform interface.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/nansen",
            demoLink: `${BASE_URL}/diwali/nansen/index.html`
        },
        {
            id: 4,
            title: "XRP Ledger Clone",
            description: "Recreation of the XRPL.org website.",
            image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&h=400&fit=crop",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/xrp",
            demoLink: `${BASE_URL}/diwali/xrp/index.html`
        },
        {
            id: 5,
            title: "Peak Design Clone",
            description: "E-commerce layout based on Peak Design's website.",
            image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=600&h=400&fit=crop",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/peakdesign",
            demoLink: `${BASE_URL}/diwali/peakdesign/index.html`
        },
        {
            id: 6,
            title: "Harvey AI Clone",
            description: "Minimalist landing page clone of Harvey.ai.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/harvey",
            demoLink: `${BASE_URL}/diwali/harvey/index.html`
        },
        {
            id: 7,
            title: "Tic Tac Toe",
            description: "Classic browser-based game with logic.",
            image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&h=400&fit=crop",
            tags: ["HTML", "CSS", "JS", "Game"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/game/tictectoe",
            demoLink: `${BASE_URL}/game/tictectoe/index.html`
        },
        {
            id: 9,
            title: "API News App",
            description: "Dynamic news fetcher using external APIs.",
            image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&h=400&fit=crop",
            tags: ["API", "Async/Await", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/api/task2",
            demoLink: `${BASE_URL}/api/task2/index.html`
        },
        {
            id: 10,
            title: "Weather API App",
            description: "Real-time weather checker application.",
            image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop",
            tags: ["API", "Weather", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/api/task2",
            demoLink: `${BASE_URL}/api/task1/index.html`
        },
        {
            id: 11,
            title: "My AI Project",
            description: "An exploration into AI interfaces.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop", // Robot Face/Humanoid
            tags: ["AI", "Interface", "Future"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/api/task2",
            demoLink: `${BASE_URL}/api/task6/index.html`
        }
    ];

    return (
        <section id="projects" className="projects-section">
            <h2 className="section-title">My <span className="highlight">Projects</span></h2>
            <div className="projects-grid">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
};


export default Projects;
