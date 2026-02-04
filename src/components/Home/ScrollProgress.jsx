import React, { useEffect, useState } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeChapter, setActiveChapter] = useState(1);

    const chapters = [
        { number: 1, title: 'The Journey Begins' },
        { number: 2, title: 'Current Missions' },
        { number: 3, title: 'Upcoming Adventures' },
        { number: 4, title: 'Explore the Cosmos' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;

            setScrollProgress(progress);

            // Determine active chapter based on scroll position
            const chapterHeight = documentHeight / chapters.length;
            const currentChapter = Math.min(
                Math.floor(scrolled / chapterHeight) + 1,
                chapters.length
            );
            setActiveChapter(currentChapter);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="scroll-progress-container">
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>
            <div className="chapter-indicators">
                {chapters.map((chapter) => (
                    <div
                        key={chapter.number}
                        className={`chapter-indicator ${activeChapter === chapter.number ? 'active' : ''} ${activeChapter > chapter.number ? 'completed' : ''}`}
                        title={chapter.title}
                    >
                        <div className="indicator-dot"></div>
                        <span className="indicator-label">{chapter.number}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScrollProgress;
