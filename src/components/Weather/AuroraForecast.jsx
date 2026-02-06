import "./AuroraForecast.css";

const AuroraForecast = () => {
  return (
    <div className="weather-card aurora-card">
      <h2 className="card-title">AURORA FORECAST</h2>

      <div className="aurora-visual">
        <div className="aurora-texture"></div>
        <div className="aurora-overlay"></div>
      </div>

      <div className="aurora-info">
        <p className="forecast-title">Tonight's Forecast</p>
        <p className="forecast-value">Green = High Activity</p>

        <p className="viewing-info">
          Best Viewing: <span className="locations">Scandinavia, Canada</span>
        </p>

        <div className="aurora-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          <button className="primary-btn" style={{ width: '100%' }}>Get Location Alert</button>
          <button
            className="primary-btn"
            style={{
              width: '100%',
              background: 'rgba(0, 255, 136, 0.2)',
              border: '1px solid rgba(0, 255, 136, 0.5)',
              color: '#00ff88'
            }}
            onClick={() => window.location.href = '/aurora-view'}
          >
            Aurora View
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuroraForecast;
