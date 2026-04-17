import React from 'react';
import { Play, Youtube } from 'lucide-react';
import './YouTubeVideos.css';
const YouTubeVideos = () => {
    const videos = [
        {
            id: 1,
            title: "AI resume match and optimization tool",
            thumbnail: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776431326/yt1_mc6jwp.png",
            link: "https://youtu.be/nenEcstK8Bc?si=OT0Dm3PPX7kjzAe-",
            views: "1.2K views",
            duration: "07:21"
        },
        {
            id: 2,
            title: "E-commerce layout based on Peak Design's website.",
            thumbnail: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776431321/yt2_ra6x0f.png",
            link: "https://youtu.be/gp0t99w0QnI?si=aBEnoqj-uByZ-Kjp",
            views: "3.5K views",
            duration: "04:46"
        },
        {
            id: 3,
            title: "CSS Animations Masterclass",
            thumbnail: "https://res.cloudinary.com/dhzhzxczn/image/upload/q_auto/f_auto/v1776431322/yt3_lykonj.png",
            link: "https://youtu.be/Buf5pGmTkzE?si=aAMNVCqEV5wA2xOr",
            views: "890 views",
            duration: "04:28"
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
                <a href="https://www.youtube.com/@KamleshChandela-z5e" className="youtube-btn">
                    <Youtube size={24} />
                    <span>Visit Channel</span>
                </a>
            </div>
        </section>
    );
};

export default YouTubeVideos;
