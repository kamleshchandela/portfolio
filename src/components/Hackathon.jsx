import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Clock, Trophy, Github, ExternalLink, Youtube, X, ChevronLeft, ChevronRight, Award, Maximize2 } from 'lucide-react';
import './Hackathon.css';
import { useSoundEnabled } from '../context/SoundContext';

// Premium 3-note rising arpeggio — energetic & hackathon-worthy
const playHoverTone = () => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();

        // Three notes: C5 → E5 → G5 (major chord arpeggio — uplifting & victorious)
        const notes = [523.25, 659.25, 783.99];
        const stagger = 0.08; // seconds between each note

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            const startTime = ctx.currentTime + i * stagger;

            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.1, startTime + 0.02);   // sharp attack
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35); // smooth decay

            osc.start(startTime);
            osc.stop(startTime + 0.4);
        });
    } catch (e) { /* silently ignore if browser blocks audio */ }
};

const hackathon = {
    title: "Sanjeevani — AI Emergency Healthcare Ecosystem",
    shortDescription: "AI-powered emergency platform connecting patients, hospitals & NGOs",
    location: "SU University, Rajasthan",
    duration: "36 Hours",
    coverPhoto: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776426144/Screenshot_2026-04-16_191230_v3vfyz.png",
    images: [
        "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776426144/Screenshot_2026-04-16_191230_v3vfyz.png",
        "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776426146/Screenshot_2026-04-16_191218_gml48q.png",
        "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776426144/Screenshot_2026-04-16_191241_iaq2te.png"
    ],
    fullDescription: `Built an AI-powered emergency platform connecting patients, hospitals, pharmacies, and NGOs for rapid response and affordable healthcare. Enabled instant medical access via facial recognition and QR-based medical passport. Integrated real-time SOS, GPS tracking, live doctor guidance, video calls, and geo-based blood donor alerts. Implemented WhatsApp reminders for continuous patient support.`,
    teamSize: "4 Members",
    role: "Full-Stack Developer & Team Lead",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Gemini AI", "Leaflet", "Twilio API"],
    achievement: "Participation Certificate",
    github: "https://github.com/kamleshchandela/sanjeevani.git",
    deployment: "https://sanjeevani-kamleshchandela.netlify.app/",
    youtube: "https://www.youtube.com/@KamleshChandela-z5e",
};

const Hackathon = () => {
    const { muted } = useSoundEnabled();
    const handleCardHover = () => { if (!muted) playHoverTone(); };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    // Auto slideshow when modal is open (7 sec delay)
    useEffect(() => {
        let interval;
        if (isModalOpen) {
            interval = setInterval(() => {
                setCurrentImgIndex((prev) => (prev + 1) % hackathon.images.length);
            }, 7000);
        }
        return () => clearInterval(interval);
    }, [isModalOpen, currentImgIndex]);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev + 1) % hackathon.images.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev === 0 ? hackathon.images.length - 1 : prev - 1));
    };

    const handleDotClick = (e, index) => {
        e.stopPropagation();
        setCurrentImgIndex(index);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(false);
    };

    return (
        <section id="hackathon" className="hackathon-section">
            <h2 className="section-title">My <span className="highlight">Hackathon</span></h2>
            
            <div className="hackathon-container">
                {/* Hackathon Card */}
                <div className="hackathon-card" onClick={openModal} onMouseEnter={handleCardHover}>
                    <div className="hackathon-image-wrapper">
                        <img src={hackathon.coverPhoto} alt="Hackathon Cover" className="hackathon-image" />
                        <div className="hackathon-badge">
                            <Trophy size={16} /> Participation Certificate
                        </div>
                        <div className="hackathon-hover-overlay">
                            <Maximize2 size={32} />
                            <span>View Details</span>
                        </div>
                    </div>
                    <div className="hackathon-info">
                        <h3 className="hackathon-title">{hackathon.title}</h3>
                        <p className="hackathon-short-desc">{hackathon.shortDescription}</p>
                        <div className="hackathon-meta">
                            <div className="meta-item">
                                <MapPin size={16} className="highlight" /> {hackathon.location}
                            </div>
                            <div className="meta-item">
                                <Clock size={16} className="highlight" /> {hackathon.duration}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal via Portal */}
            {createPortal(
                <div 
                    className={`hackathon-modal-overlay ${isModalOpen ? 'open' : ''}`}
                    onClick={closeModal}
                >
                    <div 
                        className="hackathon-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-btn" onClick={closeModal} aria-label="Close modal">
                            <X size={24} />
                        </button>

                        {/* Left: Gallery */}
                        <div className="hackathon-gallery">
                            <img 
                                src={hackathon.images[currentImgIndex]} 
                                alt={`Gallery ${currentImgIndex + 1}`} 
                                className="gallery-img" 
                            />
                            
                            <button className="nav-arrow left" onClick={handlePrev} aria-label="Previous image">
                                <ChevronLeft size={24} />
                            </button>
                            <button className="nav-arrow right" onClick={handleNext} aria-label="Next image">
                                <ChevronRight size={24} />
                            </button>

                            <div className="gallery-dots">
                                {hackathon.images.map((_, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`dot ${currentImgIndex === idx ? 'active' : ''}`}
                                        onClick={(e) => handleDotClick(e, idx)}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Details */}
                        <div className="hackathon-details">
                            <h2 className="modal-title">{hackathon.title}</h2>
                            <div className="modal-role">
                                <span style={{ color: 'var(--text-secondary)' }}>Role: </span>
                                {hackathon.role} <span style={{ color: 'var(--glass-border)' }}>|</span> {hackathon.teamSize}
                            </div>
                            
                            <p className="modal-desc">{hackathon.fullDescription}</p>
                            
                            <div className="detail-section">
                                <h4 className="detail-title">Technologies Used</h4>
                                <div className="tech-stack">
                                    {hackathon.techStack.map((tech, idx) => (
                                        <span key={idx} className="tech-pill">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-section">
                                <h4 className="detail-title">Achievement</h4>
                                <div className="achievement-highlight">
                                    <Award size={20} /> {hackathon.achievement}
                                </div>
                            </div>

                            <div className="links-group">
                                <a href={hackathon.github} target="_blank" rel="noopener noreferrer" className="hackathon-link-btn btn-github">
                                    <Github size={20} /> GitHub
                                </a>
                                <a href={hackathon.deployment} target="_blank" rel="noopener noreferrer" className="hackathon-link-btn btn-live">
                                    <ExternalLink size={20} /> Live Demo
                                </a>
                                <a href={hackathon.youtube} target="_blank" rel="noopener noreferrer" className="hackathon-link-btn btn-youtube">
                                    <Youtube size={20} /> YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
};

export default Hackathon;
