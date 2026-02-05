import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { satelliteImpactData } from '../data/satelliteImpactData';
import './SatelliteDetail.css';

const SatelliteDetail = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const data = satelliteImpactData[topicId];

    useEffect(() => {
        window.scrollTo(0, 0);

        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('[data-reveal]');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [topicId]);

    if (!data) {
        return (
            <div className="satellite-detail-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>Topic Not Found</h1>
                    <Link to="/weather" className="back-btn">Return to Dashboard</Link>
                </div>
            </div>
        );
    }

    // Only render for specific topics, return null for others as requested before
    const allowedTopics = ['precipitation-mapping', 'oceanic-heat-flux', 'atmospheric-sounding'];
    if (!allowedTopics.includes(topicId)) {
        return null;
    }

    if (topicId === 'atmospheric-sounding') {
        return (
            <div className="satellite-detail-page sounding-page">
                <nav className="back-nav">
                    <Link to="/weather" className="back-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Weather
                    </Link>
                </nav>

                <div className="precip-header" data-reveal>
                    <h1>Atmospheric Sounding Analysis</h1>
                    <p>Global analysis of atmospheric vertical structure, mapping temperature gradients and moisture profiles.</p>
                </div>

                <div className="precip-dual-panel" data-reveal>
                    <div className="panel-left live-global">
                        <div className="panel-header">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                            <span className="panel-title">Vertical Profile Map (Live)</span>
                            <span className="last-update">LAST UPDATE: 3:14 UTC</span>
                        </div>
                        <div className="globe-container">
                            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" alt="Atmospheric Sounding Map" className="globe-image" />
                            <div className="globe-badge">
                                <span className="badge-label">SATELLITES</span>
                                <span className="badge-value">32 Active</span>
                            </div>
                            <button className="globe-center-btn">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="panel-right atmospheric">
                        <div className="panel-header">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                            </svg>
                            <span className="panel-title">Thermal Profile Structure</span>
                        </div>
                        <div className="cross-section-container">
                            <div className="cross-section-plot">
                                <img src="https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&q=80&w=1200" alt="Atmospheric Gradient" className="cross-section-image" />
                                <div className="plot-gradient"></div>
                                <div className="plot-overlay">
                                    <div className="altitude-labels">
                                        <span>40 km</span>
                                        <span>25 km</span>
                                        <span>10 km</span>
                                        <span>0 km</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cross-section-footer">
                                <span className="footer-label">STRATOSPHERIC THERMAL MODEL</span>
                                <span className="footer-coords">LAT: 45.210 | LON: -122.420 | TEMP: -52°C</span>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="how-satellites-section" data-reveal>
                    <div className="satellites-content">
                        <div className="satellites-text">
                            <h2>How Atmospheric Sounding Works</h2>
                            <p>
                                Atmospheric sounding is the measurement of vertical distributions of physical properties of the atmosphere. Satellites use <strong>spectral radiance</strong> across various frequency bands to "slice" the atmosphere, allowing scientists to reconstruct its 3D structure.
                            </p>
                            <div className="sensor-badges">
                                <div className="sensor-badge-item">
                                    <div className="badge-icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                        </svg>
                                    </div>
                                    <div className="badge-text">
                                        <h4>Spectral Radiance</h4>
                                        <p>Detecting temperature deviation at ±0.01K accuracy.</p>
                                    </div>
                                </div>
                                <div className="sensor-badge-item">
                                    <div className="badge-icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" /><path d="M12 2v4M12 18v4" />
                                        </svg>
                                    </div>
                                    <div className="badge-text">
                                        <h4>Pressure Levels</h4>
                                        <p>Mapping 100+ discrete pressure levels globally.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="satellites-visual">
                            <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800" alt="Atmospheric Sounding Technology" className="satellite-img" />
                        </div>
                    </div>
                </section>

                <section className="monitoring-section" data-reveal>
                    <div className="monitoring-header">
                        <h2>Vertical Observation Status</h2>
                        <p>Real-time reliability metrics across planetary observation quadrants.</p>
                    </div>
                    <div className="monitoring-table-container">
                        <table className="monitoring-table">
                            <thead>
                                <tr>
                                    <th>Atmospheric Layer</th>
                                    <th>Detection Status</th>
                                    <th>Confidence</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Troposphere (0-12km)</td>
                                    <td><span className="status-badge live">LIVE</span> High-Res Scan</td>
                                    <td>
                                        <div className="confidence-bar">
                                            <div className="confidence-fill" style={{ width: '98%' }}></div>
                                        </div>
                                        <span className="confidence-value">98%</span>
                                    </td>
                                    <td><span className="operational-badge active">● NOMINAL</span></td>
                                </tr>
                                <tr>
                                    <td>Stratosphere (12-50km)</td>
                                    <td><span className="status-badge live">LIVE</span> Thermal Mapping</td>
                                    <td>
                                        <div className="confidence-bar">
                                            <div className="confidence-fill" style={{ width: '94%' }}></div>
                                        </div>
                                        <span className="confidence-value">94%</span>
                                    </td>
                                    <td><span className="operational-badge active">● NOMINAL</span></td>
                                </tr>
                                <tr>
                                    <td>Mesosphere (50-85km)</td>
                                    <td><span className="status-badge standby">STANDBY</span> Occasional</td>
                                    <td>
                                        <div className="confidence-bar">
                                            <div className="confidence-fill" style={{ width: '82%' }}></div>
                                        </div>
                                        <span className="confidence-value">82%</span>
                                    </td>
                                    <td><span className="operational-badge baseline">● CALIBRATING</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <footer className="precip-footer" data-reveal>
                    <div className="footer-left">
                        <span className="version">V.4.1.2-SOUND</span>
                        <span className="status">OPERATIONAL</span>
                    </div>
                    <div className="footer-right">
                        <a href="#">Data Policy</a>
                        <a href="#">Sounding Specs</a>
                        <a href="#">Vertical Logs</a>
                    </div>
                </footer>
            </div>
        );
    }

    if (topicId === 'oceanic-heat-flux') {
        return (
            <div className="satellite-detail-page oceanic-page">
                <nav className="back-nav">
                    <Link to="/weather" className="back-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Weather
                    </Link>
                </nav>

                <div className="precip-header" data-reveal>
                    <h1>Oceanic Heat Flux Monitoring</h1>
                    <p>Global analysis of sea-surface temperature gradients and ocean-atmosphere energy exchange patterns.</p>
                </div>

                <div className="precip-dual-panel" data-reveal>
                    <div className="panel-left live-global">
                        <div className="panel-header">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                            <span className="panel-title">Global SST Map (Live)</span>
                            <span className="last-update">LAST UPDATE: 3:42 UTC</span>
                        </div>
                        <div className="globe-container">
                            <img src="/oceanic_surface_gradients.png" alt="Ocean Thermal Map" className="globe-image" />
                            <div className="globe-badge">
                                <span className="badge-label">SATELLITES</span>
                                <span className="badge-value">28 Active</span>
                            </div>
                            <button className="globe-center-btn">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="panel-right atmospheric">
                        <div className="panel-header">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                            </svg>
                            <span className="panel-title">Energy Exchange Profile</span>
                        </div>
                        <div className="cross-section-container">
                            <div className="cross-section-plot">
                                <img src="/ocean_atmosphere_exchange_natural.png" alt="Energy Exchange" className="cross-section-image" />
                                <div className="plot-gradient" style={{ background: 'linear-gradient(to bottom, rgba(251, 146, 60, 0.15), transparent)' }}></div>
                                <div className="plot-overlay">
                                    <div className="altitude-labels">
                                        <span>200 m</span>
                                        <span>100 m</span>
                                        <span>50 m</span>
                                        <span>0 m</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cross-section-footer">
                                <span className="footer-label">THERMAL ENERGY TRANSFER MODEL</span>
                                <span className="footer-coords">LAT: -12.420 | LON: 165.740 | FLUX: +120 W/m²</span>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="how-satellites-section" data-reveal>
                    <div className="satellites-content">
                        <div className="satellites-text">
                            <h2>What Is Oceanic Heat Flux</h2>
                            <p>
                                Oceanic heat flux is the rate of energy exchange between the ocean and the atmosphere. This process is the primary regulator of Earth's climate, redistributing thermal energy from tropics toward the poles.
                            </p>
                            <div className="sensor-badges">
                                <div className="sensor-badge-item">
                                    <div className="badge-icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
                                        </svg>
                                    </div>
                                    <div className="badge-text">
                                        <h4>Thermal Mapping</h4>
                                        <p>Detecting sea surface temperature skin changes.</p>
                                    </div>
                                </div>
                                <div className="sensor-badge-item">
                                    <div className="badge-icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                        </svg>
                                    </div>
                                    <div className="badge-text">
                                        <h4>Latent Heat Flux</h4>
                                        <p>Quantifying energy transfer into the troposphere.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="satellites-visual">
                            <img src="https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&q=80&w=800" alt="Oceanic Heat Flux Visual" className="satellite-img" />
                        </div>
                    </div>
                </section>

                <section className="monitoring-section" data-reveal>
                    <div className="monitoring-header">
                        <h2>Oceanic Monitoring Network</h2>
                        <p>Detailed telemetry from sub-surface and orbital sensory nodes.</p>
                    </div>
                    <div className="monitoring-table-container">
                        <table className="monitoring-table">
                            <thead>
                                <tr>
                                    <th>Basin Region</th>
                                    <th>Thermal Status</th>
                                    <th>Data Confidence</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tropical Pacific</td>
                                    <td><span className="status-badge live">LIVE</span> Warming Trend</td>
                                    <td>
                                        <div className="confidence-bar">
                                            <div className="confidence-fill" style={{ width: '96%' }}></div>
                                        </div>
                                        <span className="confidence-value">96%</span>
                                    </td>
                                    <td><span className="operational-badge active">● NOMINAL</span></td>
                                </tr>
                                <tr>
                                    <td>North Atlantic</td>
                                    <td><span className="status-badge live">LIVE</span> Stable</td>
                                    <td>
                                        <div className="confidence-bar">
                                            <div className="confidence-fill" style={{ width: '92%' }}></div>
                                        </div>
                                        <span className="confidence-value">92%</span>
                                    </td>
                                    <td><span className="operational-badge active">● NOMINAL</span></td>
                                </tr>
                                <tr>
                                    <td>Indian Ocean</td>
                                    <td><span className="status-badge standby">SENSITIVE</span> High Flux</td>
                                    <td>
                                        <div className="confidence-bar">
                                            <div className="confidence-fill" style={{ width: '88%' }}></div>
                                        </div>
                                        <span className="confidence-value">88%</span>
                                    </td>
                                    <td><span className="operational-badge active">● MONITORING</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <footer className="precip-footer" data-reveal>
                    <div className="footer-left">
                        <span className="version">V.3.2.0-HEAT</span>
                        <span className="status">OPERATIONAL</span>
                    </div>
                    <div className="footer-right">
                        <a href="#">Data Policy</a>
                        <a href="#">Heat Flux Specs</a>
                        <a href="#">Historical Data</a>
                    </div>
                </footer>

                <section className="oceanic-bottom-section" data-reveal>
                    <div className="signals-card">
                        <h2>Long-Term Climate Signals</h2>
                        <div className="signal-content">
                            <div className="main-metric">+0.85 W/m²</div>
                            <div className="metric-label">AVERAGE ANNUAL INCREASE</div>
                            <p className="metric-desc">Decadal trend based on integrated multi-satellite observations (2014-2024).</p>
                        </div>
                    </div>
                    <div className="satellites-why-column">
                        <h2>Why Satellites Matter</h2>
                        <p>Orbiting sensors provide the only viable method for continuous, global-scale monitoring of the ocean's surface skin temperature. This data is critical for:</p>
                        <ul className="why-list">
                            <li>
                                <div className="check-box">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                Predicting weather patterns 2-3 weeks in advance
                            </li>
                            <li>
                                <div className="check-box">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                Monitoring the health of coral reef ecosystems
                            </li>
                            <li>
                                <div className="check-box">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                Improving global carbon cycle models
                            </li>
                        </ul>
                    </div>
                </section>

                <footer className="oceanic-footer">
                    <p>Powered by SpaceScope Data Distribution System</p>
                </footer>
            </div>
        );
    }

    // Default return for Precipitation Mapping (or any fallback)
    return (
        <div className="satellite-detail-page precipitation-page">
            <nav className="back-nav">
                <Link to="/weather" className="back-btn">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Weather
                </Link>
            </nav>

            <div className="precip-header" data-reveal>
                <h1>Global Precipitation Mapping</h1>
                <p>Operational satellite-derived moisture tracking and high-frequency atmospheric profiling.</p>
            </div>

            <div className="precip-dual-panel" data-reveal>
                <div className="panel-left live-global">
                    <div className="panel-header">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span className="panel-title">Live Global (Hourly)</span>
                        <span className="last-update">LAST UPDATE: 14:21 UTC</span>
                    </div>
                    <div className="globe-container">
                        <img src="/global_precipitation_map.png" alt="Global Precipitation Map" className="globe-image" />
                        <div className="globe-badge">
                            <span className="badge-label">SATELLITES</span>
                            <span className="badge-value">46 Active</span>
                        </div>
                        <button className="globe-center-btn">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="panel-right atmospheric">
                    <div className="panel-header">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                        </svg>
                        <span className="panel-title">Atmospheric Cross-Section (GPM RT-KF)</span>
                    </div>
                    <div className="cross-section-container">
                        <div className="cross-section-plot">
                            <img src="/atmospheric_cross_section.png" alt="Atmospheric Cross Section" className="cross-section-image" />
                            <div className="plot-gradient"></div>
                            <div className="plot-overlay">
                                <div className="altitude-labels">
                                    <span>18 km</span>
                                    <span>12 km</span>
                                    <span>6 km</span>
                                    <span>0 km</span>
                                </div>
                            </div>
                        </div>
                        <div className="cross-section-footer">
                            <span className="footer-label">PRECIPITATION PROFILING MODEL</span>
                            <span className="footer-coords">LAT: 23.420 | LON: 85.740 | ALT: 6.2 KM</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="how-satellites-section" data-reveal>
                <div className="satellites-content">
                    <div className="satellites-text">
                        <h2>How Satellites Measure Rainfall</h2>
                        <p>
                            Satellites use <strong>passive microwave radiometry</strong> to measure the electromagnetic energy emitted by precipitation. Unlike visible or infrared sensors that only see cloud tops, passive microwave sensors detect rain and ice particles through thick clouds to extract rain rate and snowmelt.
                        </p>
                        <div className="sensor-badges">
                            <div className="sensor-badge-item">
                                <div className="badge-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" />
                                    </svg>
                                </div>
                                <div className="badge-text">
                                    <h4>Active Radar</h4>
                                    <p>3D precipitation cross-sections with sub-kilometer accuracy.</p>
                                </div>
                            </div>
                            <div className="sensor-badge-item">
                                <div className="badge-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                        <line x1="12" y1="22.08" x2="12" y2="12" />
                                    </svg>
                                </div>
                                <div className="badge-text">
                                    <h4>Passive Radiometry</h4>
                                    <p>Broad spatial coverage, high temporal revisit rate.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="satellites-visual">
                        <img src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&q=80&w=800" alt="Satellite Technology" className="satellite-img" />
                    </div>
                </div>
            </section>

            <section className="applications-section" data-reveal>
                <h2>Real-World Applications</h2>
                <div className="applications-grid">
                    <div className="app-card">
                        <div className="app-icon blue">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                            </svg>
                        </div>
                        <h3>Flood Forecasting</h3>
                        <p>Anticipate extreme rainfall events and predict river basin discharge windows during critical seasons.</p>
                    </div>
                    <div className="app-card">
                        <div className="app-icon cyan">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 12h8" />
                                <path d="M12 8v8" />
                            </svg>
                        </div>
                        <h3>Cyclone Tracking</h3>
                        <p>Monitor tropical storm intensity with path-prediction for fiscal risk mitigation.</p>
                    </div>
                    <div className="app-card">
                        <div className="app-icon purple">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                        </div>
                        <h3>Monsoon Dynamics</h3>
                        <p>Model large scale rainfall patterns critical for agricultural planning and water resources.</p>
                    </div>
                    <div className="app-card">
                        <div className="app-icon orange">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="6" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <h3>Drought Analysis</h3>
                        <p>Long-term precipitation deficit tracking to preempt agricultural vulnerability and plan relief.</p>
                    </div>
                </div>
            </section>

            <section className="monitoring-section" data-reveal>
                <div className="monitoring-header">
                    <h2>Global Coverage & Monitoring</h2>
                    <p>Ensuring near-realtime reliability through a redundant multi-orbital sensor network.</p>
                </div>
                <div className="monitoring-table-container">
                    <table className="monitoring-table">
                        <thead>
                            <tr>
                                <th>Region/Metric</th>
                                <th>Observation Status</th>
                                <th>Data Confidence</th>
                                <th>Operational Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>N. Atlantic Basin</td>
                                <td><span className="status-badge active">HIGHLY ACTIVE</span></td>
                                <td>
                                    <div className="confidence-bar">
                                        <div className="confidence-fill" style={{ width: '95%' }}></div>
                                    </div>
                                    <span className="confidence-value">95%</span>
                                </td>
                                <td><span className="operational-badge active">● ACTIVE STREAM</span></td>
                            </tr>
                            <tr>
                                <td>Indian Year-Sea: (Monsoon)</td>
                                <td><span className="status-badge active">BASELINE FLOW</span></td>
                                <td>
                                    <div className="confidence-bar">
                                        <div className="confidence-fill" style={{ width: '89%' }}></div>
                                    </div>
                                    <span className="confidence-value">89%</span>
                                </td>
                                <td><span className="operational-badge active">● INTERMITTENT</span></td>
                            </tr>
                            <tr>
                                <td>Southern Ocean (Antarctic)</td>
                                <td><span className="status-badge low">LOW ACTIVITY</span></td>
                                <td>
                                    <div className="confidence-bar">
                                        <div className="confidence-fill" style={{ width: '64%' }}></div>
                                    </div>
                                    <span className="confidence-value">64%</span>
                                </td>
                                <td><span className="operational-badge baseline">● BASELINE</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <footer className="precip-footer" data-reveal>
                <div className="footer-left">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>Precipitation Intelligence v4.2</span>
                </div>
                <div className="footer-right">
                    <a href="#">Data Policy</a>
                    <a href="#">API Access</a>
                    <a href="#">3-Year Health</a>
                </div>
            </footer>
        </div>
    );
};

export default SatelliteDetail;
