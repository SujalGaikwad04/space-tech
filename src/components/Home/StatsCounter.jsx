import React, { useState, useEffect, useRef } from 'react';
import './StatsCounter.css';

const StatsCounter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({
        missions: 0,
        satellites: 0,
        years: 0,
        countries: 0
    });

    const sectionRef = useRef(null);

    const finalValues = {
        missions: 182,
        satellites: 5000,
        years: 65,
        countries: 80
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
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
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;

        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts({
                missions: Math.floor(finalValues.missions * progress),
                satellites: Math.floor(finalValues.satellites * progress),
                years: Math.floor(finalValues.years * progress),
                countries: Math.floor(finalValues.countries * progress)
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                setCounts(finalValues);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isVisible]);

    const stats = [
        {
            icon: '🚀',
            value: counts.missions,
            label: 'Active Missions',
            suffix: '+'
        },
        {
            icon: '🛰️',
            value: counts.satellites,
            label: 'Satellites Tracked',
            suffix: '+'
        },
        {
            icon: '📅',
            value: counts.years,
            label: 'Years of Data',
            suffix: ''
        },
        {
            icon: '🌍',
            value: counts.countries,
            label: 'Countries Involved',
            suffix: '+'
        }
    ];

    return (
        <section className="stats-counter" ref={sectionRef}>
            <div className="stats-container">
                <h2 className="stats-title">Space Exploration by the Numbers</h2>
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card glass-panel">
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">
                                {stat.value.toLocaleString()}{stat.suffix}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
