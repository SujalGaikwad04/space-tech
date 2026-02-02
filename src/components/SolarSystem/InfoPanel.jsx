import { solarSystemInfo, sunInfo } from './planetData';
import './SolarSystem.css';

function InfoPanel({ selectedPlanet, selectedSun, onBack }) {
    // Show Sun information
    if (selectedSun) {
        return (
            <div className="info-panel sun-info">
                <button className="back-button" onClick={onBack}>
                    ← Back to Solar System
                </button>

                <div className="info-header">
                    <h2>☀️ {sunInfo.name}</h2>
                    <div className="planet-color-badge" style={{ backgroundColor: '#FDB813', boxShadow: '0 0 20px #FDB813' }}></div>
                </div>

                <div className="info-content">
                    <p className="info-description">{sunInfo.description}</p>

                    <div className="planet-stats">
                        <h3>Star Statistics</h3>
                        <div className="stats-grid">
                            {Object.entries(sunInfo.facts).map(([key, value]) => (
                                <div key={key} className="stat-item">
                                    <span className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                    <span className="stat-value">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {sunInfo.lifeExpectancy && (
                        <div className="habitability-section">
                            <h3>🌱 Life Expectancy & Habitability</h3>
                            <div className="habitability-card">
                                <div className={`habitability-rating ${sunInfo.lifeExpectancy.possible ? 'possible' : 'impossible'}`}>
                                    Status: {sunInfo.lifeExpectancy.rating}
                                </div>
                                <p className="habitability-summary">{sunInfo.lifeExpectancy.summary}</p>
                                <div className="conditions-grid">
                                    {Object.entries(sunInfo.lifeExpectancy.conditions).map(([key, value]) => (
                                        <div key={key} className="condition-item">
                                            <span className="condition-label">{key}:</span>
                                            <span className="condition-value">{value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="reasons-list">
                                    <h4>Factors:</h4>
                                    <ul>
                                        {sunInfo.lifeExpectancy.reasons.map((reason, index) => (
                                            <li key={index}>{reason}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="info-facts">
                        <h3>Fun Facts:</h3>
                        <ul>
                            {sunInfo.funFacts.map((fact, index) => (
                                <li key={index}>{fact}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (!selectedPlanet) {
        // Show solar system overview
        return (
            <div className="info-panel">
                <div className="info-header">
                    <h2>🌌 {solarSystemInfo.title}</h2>
                </div>
                <div className="info-content">
                    <p className="info-description">{solarSystemInfo.description}</p>
                    <div className="info-facts">
                        <h3>Key Facts:</h3>
                        <ul>
                            {solarSystemInfo.facts.map((fact, index) => (
                                <li key={index}>{fact}</li>
                            ))}
                        </ul>
                    </div>
                    <p className="info-hint">💡 Click on the Sun or any planet to learn more</p>
                </div>
            </div>
        );
    }

    // Show asteroid belt details
    if (selectedPlanet && selectedPlanet.isAsteroidBelt) {
        return (
            <div className="info-panel asteroid-belt-info">
                <div className="info-header">
                    <h2>☄️ {selectedPlanet.name}</h2>
                    <div className="planet-color-badge" style={{ backgroundColor: selectedPlanet.color }}></div>
                </div>

                <div className="info-content">
                    <p className="info-description">{selectedPlanet.description}</p>

                    <div className="planet-stats">
                        <h3>Belt Statistics</h3>
                        <div className="stats-grid">
                            {Object.entries(selectedPlanet.facts).map(([key, value]) => (
                                <div key={key} className="stat-item">
                                    <span className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                    <span className="stat-value">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedPlanet.lifeExpectancy && (
                        <div className="habitability-section">
                            <h3>🌱 Life Expectancy & Habitability</h3>
                            <div className="habitability-card">
                                <div className={`habitability-rating ${selectedPlanet.lifeExpectancy.possible ? 'possible' : 'impossible'}`}>
                                    Status: {selectedPlanet.lifeExpectancy.rating}
                                </div>
                                <p className="habitability-summary">{selectedPlanet.lifeExpectancy.summary}</p>
                                <div className="conditions-grid">
                                    {Object.entries(selectedPlanet.lifeExpectancy.conditions).map(([key, value]) => (
                                        <div key={key} className="condition-item">
                                            <span className="condition-label">{key}:</span>
                                            <span className="condition-value">{value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="reasons-list">
                                    <h4>Factors:</h4>
                                    <ul>
                                        {selectedPlanet.lifeExpectancy.reasons.map((reason, index) => (
                                            <li key={index}>{reason}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedPlanet.notableAsteroids && (
                        <div className="satellites-section">
                            <h3>☄️ Notable Asteroids ({selectedPlanet.notableAsteroids.length})</h3>
                            <div className="satellites-list">
                                {selectedPlanet.notableAsteroids.map((asteroid) => (
                                    <div key={asteroid.name} className="satellite-card">
                                        <h4>{asteroid.name}</h4>
                                        <div className="satellite-details">
                                            <span>Diameter: {asteroid.diameter}</span>
                                            <span>Type: {asteroid.type}</span>
                                        </div>
                                        <p className="satellite-description">{asteroid.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedPlanet.notableDwarfPlanets && (
                        <div className="satellites-section">
                            <h3>🪐 Notable Dwarf Planets ({selectedPlanet.notableDwarfPlanets.length})</h3>
                            <div className="satellites-list">
                                {selectedPlanet.notableDwarfPlanets.map((dwarf) => (
                                    <div key={dwarf.name} className="satellite-card">
                                        <h4>{dwarf.name}</h4>
                                        <div className="satellite-details">
                                            <span>Diameter: {dwarf.diameter}</span>
                                            <span>Type: {dwarf.type}</span>
                                        </div>
                                        <p className="satellite-description">{dwarf.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Show planet details
    return (
        <div className="info-panel planet-info">
            <button className="back-button" onClick={onBack}>
                ← Back to Solar System
            </button>

            <div className="info-header">
                <h2>{selectedPlanet.name}</h2>
                {selectedPlanet.isDwarfPlanet && <span className="dwarf-badge">Dwarf Planet</span>}
                <div className="planet-color-badge" style={{ backgroundColor: selectedPlanet.color }}></div>
            </div>

            <div className="info-content">
                <p className="info-description">{selectedPlanet.description}</p>

                <div className="planet-stats">
                    <h3>{selectedPlanet.isDwarfPlanet ? 'Dwarf Planet' : 'Planet'} Statistics</h3>
                    <div className="stats-grid">
                        {Object.entries(selectedPlanet.facts).map(([key, value]) => (
                            <div key={key} className="stat-item">
                                <span className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                <span className="stat-value">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedPlanet.lifeExpectancy && (
                    <div className="habitability-section">
                        <h3>🌱 Life Expectancy & Habitability</h3>
                        <div className="habitability-card">
                            <div className={`habitability-rating ${selectedPlanet.lifeExpectancy.possible ? 'possible' : 'impossible'}`}>
                                Status: {selectedPlanet.lifeExpectancy.rating}
                            </div>
                            <p className="habitability-summary">{selectedPlanet.lifeExpectancy.summary}</p>
                            <div className="conditions-grid">
                                {Object.entries(selectedPlanet.lifeExpectancy.conditions).map(([key, value]) => (
                                    <div key={key} className="condition-item">
                                        <span className="condition-label">{key}:</span>
                                        <span className="condition-value">{value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="reasons-list">
                                <h4>Factors:</h4>
                                <ul>
                                    {selectedPlanet.lifeExpectancy.reasons.map((reason, index) => (
                                        <li key={index}>{reason}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {selectedPlanet.satellites.length > 0 && (
                    <div className="satellites-section">
                        <h3>🛰️ Moons & Satellites ({selectedPlanet.satellites.length})</h3>
                        <div className="satellites-list">
                            {selectedPlanet.satellites.map((satellite) => (
                                <div key={satellite.name} className="satellite-card">
                                    <h4>{satellite.name}</h4>
                                    <p className="satellite-discovered">Discovered: {satellite.discovered}</p>
                                    <div className="satellite-details">
                                        <span>Diameter: {satellite.diameter}</span>
                                        <span>Orbital Period: {satellite.orbitalPeriod}</span>
                                    </div>
                                    <p className="satellite-description">{satellite.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InfoPanel;
