import React from 'react';
import { Award, ExternalLink, Calendar, Star } from 'lucide-react';

import './Certificates.css';

const Certificates = () => {
    const certificates = [
        {
            id: 1,
            title: "Convolve 4.0",
            subtitle: "Pan-IIT AI/ML Hackathon",
            highlight: "Pan-IIT Level Hackathon Achievement",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774627736/convolve4.O_iitKharagpur_merit_ujkoeg.jpg",
            link: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774627736/convolve4.O_iitKharagpur_merit_ujkoeg.jpg",
            date: "Recent"
        },
        {
            id: 2,
            title: "Code Contest",
            subtitle: "Enginow (Unstop)",
            highlight: "Secured 3rd Rank",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629852/Screenshot_2026-03-27_221018_zgmbw5.png",
            link: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629852/Screenshot_2026-03-27_221018_zgmbw5.png",
            date: "Recent"
        },
        {
            id: 3,
            title: "Logic League",
            subtitle: "Unstop – Tech-A-Thon (ARSD College)",
            highlight: "Certificate of Excellence",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629803/Screenshot_2026-03-27_221050_jduh6a.png",
            link: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629803/Screenshot_2026-03-27_221050_jduh6a.png",
            date: "Recent"
        },
        {
            id: 4,
            title: "Software Engineering Job Simulation",
            subtitle: "JPMorgan Chase & Co. (Forage)",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629797/Screenshot_2026-03-27_221244_uc0jrs.png",
            link: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629797/Screenshot_2026-03-27_221244_uc0jrs.png",
            date: "Recent"
        },
        {
            id: 5,
            title: "Solutions Architecture Job Simulation",
            subtitle: "AWS (Forage)",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629796/Screenshot_2026-03-27_221204_ienplz.png",
            link: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629796/Screenshot_2026-03-27_221204_ienplz.png",
            date: "Recent"
        },
        {
            id: 6,
            title: "Advanced Software Engineering Job Simulation",
            subtitle: "Walmart Global Tech (Forage)",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629796/Screenshot_2026-03-27_221140_naxb8i.png",
            link: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629796/Screenshot_2026-03-27_221140_naxb8i.png",
            date: "Recent"
        },
        {
            id: 7,
            title: "Data Analytics Job Simulation",
            subtitle: "Deloitte (Forage)",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629794/Screenshot_2026-03-27_221116_bkjrmp.png",
            link: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1774629794/Screenshot_2026-03-27_221116_bkjrmp.png",
            date: "Recent"
        },
        {
            id: 8,
            title: "Associate Merchant Job Simulation",
            subtitle: "Walmart (Forage)",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776425395/Screenshot_2026-04-17_165923_vcyprj.png",
            link: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776425395/Screenshot_2026-04-17_165923_vcyprj.png",
            date: "Recent"
        },
        {
            id: 9,
            title: "Cybersecurity Analyst Job Simulation",
            subtitle: "Tata (Forage)",
            image: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776425395/Screenshot_2026-04-17_165940_xisr0c.png",
            link: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776425395/Screenshot_2026-04-17_165940_xisr0c.png",
            date: "Recent"
        }
    ];

    return (
        <section id="certificates" className="certificates-section">
            <h2 className="section-title">My <span className="highlight">Certifications</span></h2>
            <div className="certificates-container">
                {certificates.map((cert) => (
                    <div key={cert.id} className="cert-card">
                        <div className="cert-image-wrapper">
                            <img src={cert.image} alt={cert.title} className="cert-image" />
                            <div className="cert-overlay">
                                <a target='_blank' rel="noopener noreferrer" href={cert.link} className="cert-link">
                                    <ExternalLink size={24} />
                                    <span>Verify</span>
                                </a>
                            </div>
                        </div>
                        <div className="cert-content">
                            <div className="cert-icon">
                                <Award size={24} />
                            </div>
                            <h3 className="cert-title">{cert.title}</h3>
                            <p className="cert-issuer">{cert.subtitle}</p>

                            {cert.highlight && (
                                <div className="cert-highlight-badge">
                                    <Star size={14} className="star-icon" />
                                    <span>{cert.highlight}</span>
                                </div>
                            )}

                            <div className="cert-meta">
                                <Calendar size={14} />
                                <span>{cert.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certificates;
