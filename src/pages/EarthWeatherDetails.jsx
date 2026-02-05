import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EarthWeatherDashboard from '../components/Weather/EarthWeatherDashboard';
import '../components/Weather/WeatherPageContainer.css';
import './EarthWeatherDetails.css';

import ParticleBackground from '../components/Home/ParticleBackground';

const EarthWeatherDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="weather-page">
            <ParticleBackground />
            <div className="weather-container">
                <Link to="/weather" className="back-link">← RETURN TO COMMAND CENTER</Link>
                <EarthWeatherDashboard isStandalone={true} />
            </div>
        </div>
    );
};

export default EarthWeatherDetails;
