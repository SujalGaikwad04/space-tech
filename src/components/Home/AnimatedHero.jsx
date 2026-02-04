import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimatedHero.css';

const AnimatedHero = () => {
    const navigate = useNavigate();
    const [displayedText, setDisplayedText] = useState('');
    const fullText = 'Explore the Cosmos';
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (isTyping && displayedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(fullText.slice(0, displayedText.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
        } else if (displayedText.length === fullText.length) {
            setIsTyping(false);
        }
    }, [displayedText, isTyping]);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <section className="animated-hero">
            <div className="hero-content">
                <div className="hero-badge">🚀 Space Exploration Platform</div>

                <h1 className="hero-title">
                    {displayedText}
                    <span className="cursor">{isTyping ? '|' : ''}</span>
                </h1>

                <p className="hero-subtitle">
                    Track missions, explore satellites, and discover the wonders of space in real-time
                </p>

                <div className="hero-actions">
                    <button className="hero-btn primary" onClick={() => navigate('/live-map')}>
                        Track ISS Now
                    </button>
                    <button className="hero-btn secondary" onClick={() => navigate('/mission')}>
                        Explore Missions
                    </button>
                </div>
            </div>

            <div className="scroll-indicator" onClick={scrollToContent}>
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <span className="scroll-text">Scroll to explore</span>
            </div>
        </section>
    );
};

export default AnimatedHero;
