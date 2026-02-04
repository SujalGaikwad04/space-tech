import React from 'react';
import './HistoricalMissionsList.css';
import { historicalMissions, getStatusColor } from './missionsData';

const HistoricalMissionsList = ({ selectedEra }) => {
    const missions = historicalMissions[selectedEra] || [];

    if (missions.length === 0) {
        return (
            <div className="historical-missions-list">
                <div className="missions-header">
                    <h3>MISSIONS: {selectedEra}</h3>
                </div>
                <div className="no-missions">No missions data available for this era.</div>
            </div>
        );
    }

    return (
        <div className="historical-missions-list">
            <div className="missions-header">
                <h3>MISSIONS: {selectedEra}</h3>
                <span className="mission-count">{missions.length} Missions</span>
            </div>

            <div className="missions-grid">
                {missions.map((mission, index) => (
                    <div key={index} className="mission-card">
                        <div className="mission-card-header">
                            <div className="mission-name">{mission.name}</div>
                            <div
                                className="mission-status"
                                style={{ color: getStatusColor(mission.status) }}
                            >
                                {mission.status}
                            </div>
                        </div>

                        <div className="mission-meta">
                            <span className="mission-year">📅 {mission.year}</span>
                            <span className="mission-type">🚀 {mission.type}</span>
                            <span className="mission-agency">🏛️ {mission.agency}</span>
                        </div>

                        <p className="mission-description">{mission.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoricalMissionsList;
