import React from 'react';
import { Play, Youtube } from 'lucide-react';
import './YouTubeVideos.css';

const YouTubeVideos = () => {
    const videos = [
        {
            id: 1,
            title: "Building a Modern Portfolio",
            thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=340&fit=crop",
            link: "#",
            views: "1.2K views",
            duration: "15:20"
        },
        {
            id: 2,
            title: "React Hooks Explained",
            thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop",
            link: "#",
            views: "3.5K views",
            duration: "10:45"
        },
        {
            id: 3,
            title: "CSS Animations Masterclass",
            thumbnail: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=600&h=340&fit=crop",
            link: "#",
            views: "890 views",
            duration: "22:15"
        }
    ];

    return (
        <section id="videos" className="videos-section">
            <h2 className="section-title">Latest on <span className="highlight">YouTube</span></h2>
            <div className="videos-container">
                {videos.map((video) => (
                    <a key={video.id} href={video.link} className="video-card" target="_blank" rel="noopener noreferrer">
                        <div className="video-thumbnail">
                            <img src={video.thumbnail} alt={video.title} />
                            <div className="play-overlay">
                                <div className="play-button">
                                    <Play size={32} fill="currentColor" />
                                </div>
                            </div>
                            <span className="video-duration">{video.duration}</span>
                        </div>
                        <div className="video-content">
                            <div className="video-icon">
                                <Youtube size={20} />
                            </div>
                            <div className="video-info">
                                <h3 className="video-title">{video.title}</h3>
                                <span className="video-views">{video.views}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <div className="videos-cta">
                <a href="#" className="youtube-btn">
                    <Youtube size={24} />
                    <span>Visit Channel</span>
                </a>
            </div>
        </section>
    );
};

export default YouTubeVideos;
