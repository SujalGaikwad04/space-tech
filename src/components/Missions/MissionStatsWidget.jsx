import React from 'react';
import './MissionStatsWidget.css';

const MissionStatsWidget = () => {
    return (
        <div className="mission-stats-widget">
            <div className="stats-header">
                <h3>MISSION STATISTICS</h3>
                <span className="stats-icon">📊</span>
            </div>

            <div className="stats-content">
                <div className="stat-item">
                    <div className="stat-label">LAUNCH SUCCESS RATE (2024)</div>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '94%' }}>
                            <span className="progress-text">94%</span>
                        </div>
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-box">
                        <div className="stat-number">182</div>
                        <div className="stat-name">TOTAL MISSIONS</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">42</div>
                        <div className="stat-name">ACTIVE</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionStatsWidget;
