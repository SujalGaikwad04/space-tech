import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMissionByName } from '../components/Missions/missionsData';
import ParticleBackground from '../components/Home/ParticleBackground';
import './MissionDetails.css'; // We will need to create this CSS or use inline for now

const MissionDetails = () => {
    const { missionId } = useParams();
    const navigate = useNavigate();
    const [mission, setMission] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (missionId) {
            // Decode the URL encoded name
            const decodedName = decodeURIComponent(missionId);
            const foundMission = getMissionByName(decodedName);
            setMission(foundMission);
        }
    }, [missionId]);

    if (!mission) {
        return (
            <div className="mission-details-loading">
                <ParticleBackground />
                <div className="loading-content">
                    <h2>Mission Not Found</h2>
                    <button onClick={() => navigate('/mission')} className="back-btn">
                        Return to Missions
                    </button>
                </div>
            </div>
        );
    }

    // Dynamic Images based on mission type (fallback if specific image not found)
    const getMissionImage = (mission) => {
        if (mission.image) return mission.image;

        switch (mission.type) {
            case 'Crewed': return 'https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&q=80&w=1200';
            case 'Rover': return 'https://images.unsplash.com/photo-1614728853911-5369cfb87b24?auto=format&fit=crop&q=80&w=1200';
            case 'Orbiter': return 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?auto=format&fit=crop&q=80&w=1200';
            case 'Probe': return 'https://images.unsplash.com/photo-1454789548779-d5594f126fbb?auto=format&fit=crop&q=80&w=1200';
            default: return 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200';
        }
    };

    return (
        <div className="mission-details-page">
            <ParticleBackground />

            <div className="mission-details-container glass-panel">
                <nav className="details-nav">
                    <Link to="/mission" className="back-link">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Timeline
                    </Link>
                </nav>

                <div className="mission-header-section">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mission-title-block"
                    >
                        <span className="mission-year-badge">{mission.year}</span>
                        <h1>{mission.name}</h1>
                        <div className="mission-badges">
                            <span className={`status-badge ${mission.status.toLowerCase().replace(' ', '-')}`}>
                                {mission.status}
                            </span>
                            <span className="agency-badge">
                                {mission.agency}
                            </span>
                            <span className="type-badge">
                                {mission.type}
                            </span>
                        </div>
                    </motion.div>
                </div>

                <div className="mission-content-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mission-visual"
                    >
                        <img src={getMissionImage(mission)} alt={mission.name} className="main-mission-img" />
                        <div className="img-caption">Mission Visualization via SpaceScope Archives</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mission-info"
                    >
                        <h2>Mission Overview</h2>
                        <p className="mission-description-large">{mission.details || mission.description}</p>

                        <div className="mission-specs">
                            <h3>Mission Data</h3>
                            <div className="specs-grid">
                                <div className="spec-item">
                                    <span className="spec-label">Launch Date</span>
                                    <span className="spec-value">{mission.year}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Operator</span>
                                    <span className="spec-value">{mission.agency}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Primary Goal</span>
                                    <span className="spec-value">Exploration & Research</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Status</span>
                                    <span className="spec-value" style={{ color: '#00ff88' }}>{mission.status}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Styles are loaded from ./MissionDetails.css */}
        </div>
    );
};

export default MissionDetails;
