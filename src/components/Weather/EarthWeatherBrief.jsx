import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EarthWeatherBrief.css';

const EarthWeatherBrief = () => {
    const navigate = useNavigate();

    return (
        <div className="earth-brief-card">
            {/* Header with icon */}
            <div className="brief-header">
                <span className="header-icon"></span>
                <h2 className="header-title">EARTH ATMOSPHERIC BRIEFING</h2>
            </div>

            <div className="brief-content">
                {/* Stats Box Left */}
                <div className="brief-box">
                    <div className="brief-stat">
                        <span className="stat-label">GLOBAL TEMP VARIANCE</span>
                        <span className="stat-value plus">+1.24°C</span>
                    </div>
                    <div className="brief-stat">
                        <span className="stat-label">CLOUD DENSITY</span>
                        <span className="stat-value cyan">42.8%</span>
                    </div>
                    <div className="brief-stat">
                        <span className="stat-label">HUMIDITY INDEX</span>
                        <span className="stat-value cyan">68%</span>
                    </div>
                </div>

                {/* Description Right */}
                <div className="brief-description">
                    <p>Current atmospheric telemetry indicates stable orbital conditions with a slight increase in thermal radiation over the Pacific sector. Cloud microphysics remain within operational parameters for high-altitude sensor tracking.</p>
                </div>
            </div>

            {/* View Full Analytics Button */}
            <div className="brief-footer">
                <button
                    className="view-analytics-btn"
                    onClick={() => navigate('/earth-weather-details')}
                >
                    (VIEW FULL ANALYTICS)
                </button>
            </div>

            {/* Atmosphere background overlay effect */}
            <div className="atmosphere-overlay"></div>
            <div className="scanner-line-v2"></div>
        </div>
    );
};

export default EarthWeatherBrief;
