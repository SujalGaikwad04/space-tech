import React from 'react';
import './UpcomingMissionsList.css';
import { upcomingMissions2026, getStatusColor } from './upcomingMissionsData';

const UpcomingMissionsList = () => {
    return (
        <div className="upcoming-missions-list">
            <div className="upcoming-header">
                <h3>UPCOMING MISSIONS 2026</h3>
                <span className="mission-count">{upcomingMissions2026.length} Missions</span>
            </div>

            <div className="upcoming-grid">
                {upcomingMissions2026.map((mission, index) => (
                    <div key={index} className="upcoming-card">
                        <div className="upcoming-card-header">
                            <div className="upcoming-name">{mission.name}</div>
                            <div
                                className="upcoming-status"
                                style={{ color: getStatusColor(mission.status) }}
                            >
                                {mission.status}
                            </div>
                        </div>

                        <div className="upcoming-launch">
                            <span className="launch-icon">🚀</span>
                            <span className="launch-date">{mission.launchDate}</span>
                        </div>

                        <div className="upcoming-meta">
                            <div className="meta-item">
                                <span className="meta-icon">🏛️</span>
                                <span>{mission.agency}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-icon">🎯</span>
                                <span>{mission.destination}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-icon">🛸</span>
                                <span>{mission.type}</span>
                            </div>
                        </div>

                        <p className="upcoming-description">{mission.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingMissionsList;
