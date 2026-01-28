import React from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import './Certificates.css';

const Certificates = () => {
    const certificates = [
        {
            id: 1,
            title: "Advanced React Patterns",
            issuer: "Meta & Coursera",
            date: "Nov 2023",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&h=300&fit=crop",
            link: "#"
        },
        {
            id: 2,
            title: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "Aug 2023",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
            link: "#"
        },
        {
            id: 3,
            title: "Full Stack Web Development",
            issuer: "Udemy",
            date: "Jan 2023",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
            link: "#"
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
                                <a href={cert.link} className="cert-link">
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
                            <p className="cert-issuer">{cert.issuer}</p>
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
