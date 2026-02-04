import React, { useState, useEffect } from 'react';
import './CompactHero.css';

const CompactHero = () => {
    const [issData, setIssData] = useState({ lat: 0, lon: 0, velocity: 0 });
    const [activeMissions, setActiveMissions] = useState(182);

    useEffect(() => {
        // Fetch ISS data
        const fetchISSData = async () => {
            try {
                const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
                const data = await response.json();
                setIssData({
                    lat: data.latitude.toFixed(2),
                    lon: data.longitude.toFixed(2),
                    velocity: Math.round(data.velocity)
                });
            } catch (error) {
                console.error('Error fetching ISS data:', error);
            }
        };

        fetchISSData();
        const interval = setInterval(fetchISSData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="compact-hero">
            <div className="hero-container">
                <div className="hero-main">
                    <h1 className="hero-heading">Space Exploration Dashboard</h1>
                    <p className="hero-tagline">
                        Real-time tracking, mission data, and satellite monitoring in one unified platform
                    </p>
                </div>

                <div className="live-data-ticker">
                    <div className="ticker-item">
                        <span className="ticker-label">ISS POSITION</span>
                        <span className="ticker-value">
                            {issData.lat}°N, {issData.lon}°E
                        </span>
                    </div>
                    <div className="ticker-divider"></div>
                    <div className="ticker-item">
                        <span className="ticker-label">VELOCITY</span>
                        <span className="ticker-value">{issData.velocity} km/h</span>
                    </div>
                    <div className="ticker-divider"></div>
                    <div className="ticker-item">
                        <span className="ticker-label">ACTIVE MISSIONS</span>
                        <span className="ticker-value">{activeMissions}</span>
                    </div>
                    <div className="ticker-divider"></div>
                    <div className="ticker-item">
                        <span className="ticker-label">STATUS</span>
                        <span className="ticker-value ticker-live">
                            <span className="live-dot"></span>LIVE
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompactHero;
