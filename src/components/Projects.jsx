import React, { useState } from 'react';
import { ExternalLink, Github, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const ProjectCard = ({ project }) => {
    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 60;
        const y = (e.clientY - top - height / 2) / 60;
        setStyle({ transform: `rotateY(${x}deg) rotateX(${-y}deg)` });
    };

    const handleMouseLeave = () => {
        setStyle({ transform: `rotateY(0deg) rotateX(0deg)` });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
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
                        {project.youtubeLink && (
                            <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="YouTube Demo">
                                <Youtube size={24} />
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
        </motion.div>
    );
};

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const BASE_URL = "https://chandelakamlesh1.netlify.app";

    const projects = [
        {
            id: 0,
            title: "Resumatch AI",
            description: "AI resume match and optimization tool with advanced matching algorithms",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776346140/Screenshot_2026-04-16_185852_rs57zv.png",
            tags: ["React", "Tailwind", "Python", "AI"],
            githubLink: "https://github.com/kamleshchandela/resumatch-ai",
            demoLink: "https://resumatch-kamleshchandela.netlify.app/",
            youtubeLink: "https://youtu.be/nenEcstK8Bc?si=OT0Dm3PPX7kjzAe-",
            category: "fullstack",
            postmanDoc: "https://documenter.postman.com/view/xxxx"
        },
        {
            id: 1,
            title: "Taj Hotel Clone",
            description: "A clone of the Taj Hotel website demonstrating layout and design skills.",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776345575/Screenshot_2026-04-16_184229_bbixgw.png",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/tajhotel",
            demoLink: `${BASE_URL}/diwali/tajhotel/index.html`,
            youtubeLink: "https://youtu.be/095_gUdXub4?si=7gNAEEvpEmD26v79",
            category: "frontend"
        },
        {
            id: 9,
            title: "Weather API App",
            description: "Real-time weather checker application.",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776345577/Screenshot_2026-04-16_184906_bptfp2.png",
            tags: ["API", "Weather", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/api/task2",
            demoLink: `${BASE_URL}/api/task1/index.html`,
            youtubeLink: "https://youtube.com",
            category: "frontend"
        },
        {
            id: 5,
            title: "Peak Design Clone",
            description: "E-commerce layout based on Peak Design's website.",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776345574/Screenshot_2026-04-16_184348_b5nt2l.png",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/peakdesign",
            demoLink: `${BASE_URL}/diwali/peakdesign/index.html`,
            youtubeLink: "https://youtu.be/gp0t99w0QnI?si=kYSm28iQGBxoeItQ",
            category: "frontend"
        },
        {
            id: 6,
            title: "Harvey AI Clone",
            description: "Minimalist landing page clone of Harvey.ai.",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776345575/Screenshot_2026-04-16_184412_p6k0j2.png",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/harvey",
            demoLink: `${BASE_URL}/diwali/harvey/index.html`,
            youtubeLink: "https://youtu.be/Buf5pGmTkzE?si=FhAyw6B-XQzx4owH",
            category: "frontend"
        },
        {
            id: 7,
            title: "Tic Tac Toe",
            description: "Classic browser-based game with logic and smart AI opponent.",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776345575/Screenshot_2026-04-16_184519_v9zudj.png",
            tags: ["HTML", "CSS", "JS", "Game"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/game/tictectoe",
            demoLink: `${BASE_URL}/game/tictectoe/index.html`,
            youtubeLink: "https://youtube.com",
            category: "games"
        },
        {
            id: 3,
            title: "Nansen Clone",
            description: "Clone of the Nansen.ai analytics platform interface.",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776345574/Screenshot_2026-04-16_184312_f0ogm0.png",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/nansen",
            demoLink: `${BASE_URL}/diwali/nansen/index.html`,
            youtubeLink: "https://youtu.be/pOrdhiqmkGE?si=_dFNIFO66G32RlTl",
            category: "frontend"
        },
        {
            id: 2,
            title: "Cars24 Clone",
            description: "A replica of the Cars24 platform.",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776345575/Screenshot_2026-04-16_184255_lucsgf.png",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/car24",
            demoLink: `${BASE_URL}/diwali/car24/index.html`,
            youtubeLink: "https://youtu.be/UX3TIi4kPSM?si=VNQvKk78p-RkDlzk",
            category: "clones"
        },
        {
            id: 4,
            title: "XRP Ledger Clone",
            description: "Recreation of the XRPL.org website.",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776345577/Screenshot_2026-04-16_184329_jhultg.png",
            tags: ["HTML", "CSS", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/diwali/xrp",
            demoLink: `${BASE_URL}/diwali/xrp/index.html`,
            youtubeLink: "https://youtu.be/LC0uDJnw28c?si=j_gXmTL9dXBRDt22",
            category: "clones"
        },
        {
            id: 8,
            title: "API News App",
            description: "Dynamic news fetcher using external APIs.",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776345576/Screenshot_2026-04-16_184847_jtnz4s.png",
            tags: ["API", "Async/Await", "JS"],
            githubLink: "https://github.com/kamleshchandela/assignment/tree/main/api/task2",
            demoLink: `${BASE_URL}/api/task2/index.html`,
            youtubeLink: "https://youtube.com",
            category: "frontend"
        }
    ];

    const categories = [
        { id: 'all', label: 'All Projects' },
        { id: 'fullstack', label: 'Full Stack' },
        { id: 'clones', label: 'Clones' },
        { id: 'games', label: 'Games' },
        { id: 'frontend', label: 'Frontend' }
    ];

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section id="projects" className="projects-section">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-title"
            >
                My <span className="highlight">Projects</span>
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="projects-filter-wrapper"
            >
                <div className="projects-filter">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div layout className="projects-grid">
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Projects;