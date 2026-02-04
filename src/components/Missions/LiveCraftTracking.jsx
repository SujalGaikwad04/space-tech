import React, { useState, useEffect } from 'react';
import './LiveCraftTracking.css';

const LiveCraftTracking = () => {
    const [issPosition, setIssPosition] = useState({ latitude: 0, longitude: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch real ISS position from API
        const fetchISSPosition = async () => {
            try {
                const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
                const data = await response.json();
                setIssPosition({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    altitude: data.altitude,
                    velocity: data.velocity
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching ISS position:', error);
                setLoading(false);
            }
        };

        // Initial fetch
        fetchISSPosition();

        // Update every 5 seconds
        const interval = setInterval(fetchISSPosition, 5000);

        return () => clearInterval(interval);
    }, []);

    // Convert lat/long to canvas coordinates (simplified projection)
    const latToY = (lat) => {
        return 50 - (lat / 90) * 40; // Center at 50%, range ±40%
    };

    const lonToX = (lon) => {
        return 50 + (lon / 180) * 40; // Center at 50%, range ±40%
    };

    const issX = lonToX(issPosition.longitude);
    const issY = latToY(issPosition.latitude);

    return (
        <div className="live-craft-tracking">
            <div className="tracking-header">
                <h3>LIVE CRAFT TRACKING</h3>
                <div className="tracking-indicator">
                    <span className="pulse-dot"></span>
                    <span className="tracking-text">TRACKING ISS</span>
                </div>
            </div>

            <div className="orbital-canvas">
                {/* Orbital rings */}
                <div className="orbit-ring orbit-1"></div>
                <div className="orbit-ring orbit-2"></div>
                <div className="orbit-ring orbit-3"></div>

                {/* Central body (Earth) */}
                <div className="central-body"></div>

                {/* Real ISS position */}
                {!loading && (
                    <div
                        className="spacecraft iss-marker"
                        style={{
                            left: `${issX}%`,
                            top: `${issY}%`
                        }}
                        title={`ISS: ${issPosition.latitude.toFixed(2)}°, ${issPosition.longitude.toFixed(2)}°`}
                    >
                        <span className="spacecraft-label">ISS</span>
                    </div>
                )}
            </div>

            <div className="tracking-info">
                <div className="info-item">
                    <span className="info-label">LAT:</span>
                    <span className="info-value">{issPosition.latitude?.toFixed(4)}°</span>
                </div>
                <div className="info-item">
                    <span className="info-label">LON:</span>
                    <span className="info-value">{issPosition.longitude?.toFixed(4)}°</span>
                </div>
                <div className="info-item">
                    <span className="info-label">ALT:</span>
                    <span className="info-value">{issPosition.altitude?.toFixed(0)} km</span>
                </div>
                <div className="info-item">
                    <span className="info-label">VEL:</span>
                    <span className="info-value">{issPosition.velocity?.toFixed(0)} km/h</span>
                </div>
            </div>

            <a
                href="https://www.n2yo.com/?s=25544"
                target="_blank"
                rel="noopener noreferrer"
                className="full-screen-link"
            >
                FULL SCREEN MAP 🔗
            </a>
        </div>
    );
};

export default LiveCraftTracking;
