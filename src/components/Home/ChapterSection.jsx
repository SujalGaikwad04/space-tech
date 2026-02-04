import React, { useEffect, useRef, useState } from 'react';
import './ChapterSection.css';

const ChapterSection = ({
    chapterNumber,
    title,
    subtitle,
    backgroundImage,
    children,
    theme = 'dark'
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`chapter-section ${isVisible ? 'visible' : ''}`}
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
            }}
        >
            <div className="chapter-overlay"></div>
            <div className="chapter-content">
                <div className="chapter-header">
                    <span className="chapter-number">Chapter {chapterNumber}</span>
                    <h2 className="chapter-title">{title}</h2>
                    {subtitle && <p className="chapter-subtitle">{subtitle}</p>}
                </div>
                <div className="chapter-body">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default ChapterSection;
