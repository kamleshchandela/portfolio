import React from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import './Certificates.css';

const Certificates = () => {
    const certificates = [
        {
            id: 1,
            title: "Software Engineering Job Simulation",
            issuer: "JPMorgan Chase & Co.",
            date: "Jan 2026",
            image: "https://res.cloudinary.com/dsuhb6swy/image/upload/v1770035861/Screenshot_2026-01-18_103209_gw3ch7.png",
            link: "https://res.cloudinary.com/dsuhb6swy/image/upload/v1770035861/Screenshot_2026-01-18_103209_gw3ch7.png"
        },
        {
            id: 2,
            title: "Code Contest",
            issuer: "Enginow",
            date: "Jan 2026",
            image: "https://res.cloudinary.com/dsuhb6swy/image/upload/v1770035861/Screenshot_2026-01-15_161547_azamxy.png",
            link: "https://res.cloudinary.com/dsuhb6swy/image/upload/v1770035861/Screenshot_2026-01-15_161547_azamxy.png"
        },
        {
            id: 3,
            title: "Software Architecture Job Simulation",
            issuer: "AWS",
            date: "Jan 2026",
            image: "https://res.cloudinary.com/dsuhb6swy/image/upload/v1770035861/Screenshot_2026-02-01_150943_mhftkz.png",
            link: "https://res.cloudinary.com/dsuhb6swy/image/upload/v1770035861/Screenshot_2026-02-01_150943_mhftkz.png"
        },
        {
            id: 4,
            title: "Advanced Software Engineering Job Simulation",
            issuer: "Walmart | Global Tech",
            date: "Jan 2026",
            image: "https://res.cloudinary.com/dsuhb6swy/image/upload/v1770035861/Screenshot_2026-02-01_151008_czcmqf.png",
            link: "https://res.cloudinary.com/dsuhb6swy/image/upload/v1770035861/Screenshot_2026-02-01_151008_czcmqf.png"
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
                                <a target='_blank' href={cert.link} className="cert-link">
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
