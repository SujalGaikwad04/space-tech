import "./SatelliteImpact.css";

const SatelliteImpact = ({ kpIndex }) => {
  const gpsStatus = kpIndex?.kp_index > 4 ? "Disturbed" : "Normal";

  return (
    <div className="weather-card satellite-card">
      <h2 className="card-title">SATELLITE IMPACT</h2>

      <div className="impact-details">
        <div className="status-item">
          <span className="status-indicator status-good"></span>
          <span className="status-label">GPS Accuracy:</span>
          <span className="status-value">{gpsStatus}</span>
        </div>

        <div className="status-item">
          <span className="status-indicator status-good"></span>
          <span className="status-label">Communications:</span>
          <span className="status-value">Good</span>
        </div>

        <div className="status-item">
          <span className="status-indicator status-alert"></span>
          <span className="status-label">Potential Issues:</span>
          <span className="status-value-normal">None reported</span>
        </div>
      </div>


    </div>
  );
};

export default SatelliteImpact;
