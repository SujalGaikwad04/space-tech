import { useNavigate } from 'react-router-dom';
import './EarthWeatherDashboard.css';

const EarthWeatherDashboard = ({ isStandalone = false }) => {
    const navigate = useNavigate();

    const sensorCards = [
        {
            id: "SA-1",
            slug: "atmospheric-sounding",
            title: "Atmospheric Sounding",
            description: "Vertical temperature profile at 0.01 hPa resolution",
            bgClass: "bg-sounding",
            bgImage: "/sounding-bg.png"
        },
        {
            id: "PM-5",
            slug: "precipitation-mapping",
            title: "Precipitation Mapping",
            description: "Global rainfall estimation using microwave radiometry",
            bgClass: "bg-precip"
        },
        {
            id: "HF-11",
            slug: "oceanic-heat-flux",
            title: "Oceanic Heat Flux",
            description: "Sea surface temperature thermal monitoring",
            bgClass: "bg-heat"
        }
    ];

    const fleetData = [
        { id: "S-AURA 9", orbit: "LEO", status: "ACTIVE", telemetry: "12.4 Gbps", health: 98, healthClass: "health-good" },
        { id: "S-TERRA 4", orbit: "MEO", status: "ACTIVE", telemetry: "8.1 Gbps", health: 92, healthClass: "health-good" },
        { id: "S-AQUA 2", orbit: "LEO", status: "STANDBY", telemetry: "0.0 Gbps", health: 100, healthClass: "health-standby" }
    ];

    return (
        <div className={`earth-weather-dashboard redesign ${isStandalone ? 'standalone-view' : ''}`}>
            {/* Upper Header Section */}
            <div className="dashboard-header-container">
                <div className="header-text-group">
                    <span className="mission-tag">● MISSION: EARTH ATMOSPHERIC DYNAMICS</span>
                    <h1 className="main-title">Satellite Impact on Earth Weather</h1>
                    <p className="subtitle">
                        Global meteorological telemetry and atmospheric perturbation monitoring powered by SpaceScope high-resolution sensors.
                    </p>
                </div>
            </div>

            {/* Sensor Grid Section */}
            <div className="sensor-grid">
                {sensorCards.map((card, index) => (
                    <div
                        key={index}
                        className={`sensor-card ${card.bgClass}`}
                        style={{
                            ...(card.bgImage ? { backgroundImage: `url(${card.bgImage})` } : {}),
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/satellite/${card.slug}`)}
                    >
                        <div className="sensor-card-overlay">
                            <span className="sensor-badge">SENSOR: {card.id}</span>
                            <div className="sensor-card-content">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Live Insight Section */}
            <div className="insight-section-header">
                <h2>Live Insight: Global Perturbation Map</h2>
                <span className="sync-status">● SYNCED: 8.848 AGO</span>
            </div>

            <div className="live-insight-container">
                <div className="map-visualization">
                    <img src="/weather-viz.png" alt="Global Map" className="map-image" />
                    <div className="altitude-badge">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                        </svg>
                        <div className="alt-info">
                            <span className="alt-label">ORBITAL ALTITUDE</span>
                            <span className="alt-value">785.42 KM</span>
                        </div>
                    </div>

                    <div className="map-footer-info">
                        <div className="region-name">Central Pacific Region</div>
                        <div className="coordinates">LAT: 12.423 | LON: -145.210</div>
                    </div>

                    <div className="map-controls">
                        <button className="map-control-btn">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                        </button>
                        <button className="map-control-btn">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="metrics-panel">
                    <div className="metrics-header-text">
                        <span className="metrics-tag">METRICS PANEL</span>
                        <h3>Atmospheric Status</h3>
                    </div>

                    <div className="metric-row">
                        <div className="metric-info">
                            <span>Temperature Variance</span>
                            <span className="value-plus">+1.24°C</span>
                        </div>
                        <div className="metric-bar-bg">
                            <div className="metric-bar-fill blue" style={{ width: '85%' }}></div>
                        </div>
                    </div>

                    <div className="metric-row">
                        <div className="metric-info">
                            <span>Cloud Density</span>
                            <span className="value-main">42.8%</span>
                        </div>
                        <div className="metric-bar-bg">
                            <div className="metric-bar-fill gray" style={{ width: '43%' }}></div>
                        </div>
                    </div>

                    <div className="metric-row special">
                        <div className="metric-info">
                            <span>Aerosol Optical Depth</span>
                            <span className="value-warning">0.142</span>
                        </div>
                        <div className="metric-bar-bg thin">
                            <div className="metric-bar-fill yellow" style={{ width: '30%' }}></div>
                        </div>
                    </div>

                    <div className="impact-badge-container">
                        <span className="impact-label">Impact Level</span>
                        <span className="status-badge-green">NORMAL OPERATING RANGE</span>
                    </div>

                    <div className="relay-status">
                        <div className="relay-icon">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H11V10H13v6zm0-8H11V6h2v2z" />
                            </svg>
                        </div>
                        <div className="relay-info">
                            <span className="relay-name">SpaceScope-4 Active</span>
                            <span className="relay-meta">CURRENT RELAY LEAD</span>
                        </div>
                        <span className="relay-dot"></span>
                    </div>
                </div>
            </div>

            {/* Fleet Status Table Sections */}
            <div className="fleet-status-section">
                <div className="fleet-header">
                    <h3>Satellite Fleet Status</h3>
                    <a href="#" className="view-all">VIEW ALL SATELLITES</a>
                </div>

                <div className="table-responsive">
                    <table className="fleet-table">
                        <thead>
                            <tr>
                                <th>SATELLITE ID</th>
                                <th>STATUS</th>
                                <th>TELEMETRY</th>
                                <th>OPERATIONAL HEALTH</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fleetData.map((sat, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <div className="sat-id-cell">
                                            {sat.id} <span className="orbit-tag">{sat.orbit}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="status-cell">
                                            <span className={`status-dot ${sat.status.toLowerCase()}`}></span>
                                            {sat.status}
                                        </span>
                                    </td>
                                    <td>{sat.telemetry}</td>
                                    <td>
                                        <div className="health-cell">
                                            <div className="health-bar-bg">
                                                <div className={`health-bar-fill ${sat.healthClass}`} style={{ width: `${sat.health}%` }}></div>
                                            </div>
                                            <span className="health-value">{sat.health}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="action-dots">
                                            <span></span><span></span><span></span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EarthWeatherDashboard;
