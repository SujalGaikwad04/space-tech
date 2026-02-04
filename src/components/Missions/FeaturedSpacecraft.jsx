import React from 'react';
import './FeaturedSpacecraft.css';

const FeaturedSpacecraft = () => {
    return (
        <div className="featured-spacecraft">
            <div className="spacecraft-header">
                <h3>FEATURED: ISS (INTERNATIONAL SPACE STATION)</h3>
                <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">ACTIVE MISSION</span>
                </div>
            </div>

            <div className="spacecraft-model-container">
                {/* NASA 3D Resources - ISS Model */}
                <iframe
                    title="ISS 3D Model"
                    className="model-iframe"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    src="https://solarsystem.nasa.gov/gltf_embed/2378"
                />
            </div>

            <div className="spacecraft-info">
                <div className="info-label">MISSION OVERVIEW</div>
                <p className="info-text">
                    "The International Space Station is a modular space station in low Earth orbit.
                    It is a multinational collaborative project involving NASA, Roscosmos, JAXA, ESA, and CSA."
                </p>
            </div>

            <div className="spacecraft-actions">
                <button
                    className="action-btn outline"
                    onClick={() => window.open('https://www.nasa.gov/international-space-station/', '_blank')}
                >
                    [NASA ISS INFO]
                </button>
                <button
                    className="action-btn outline"
                    onClick={() => window.open('https://www.n2yo.com/?s=25544', '_blank')}
                >
                    [TRACK ISS LIVE]
                </button>
                <button
                    className="action-btn primary"
                    onClick={() => window.open('https://solarsystem.nasa.gov/resources/2378/international-space-station-3d-model/', '_blank')}
                >
                    [VIEW IN NASA 3D]
                </button>
            </div>
        </div>
    );
};

export default FeaturedSpacecraft;
