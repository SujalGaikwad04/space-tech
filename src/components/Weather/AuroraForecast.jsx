import "./AuroraForecast.css";

const AuroraForecast = () => {
  return (
    <div className="weather-card aurora-card">
      <h2 className="card-title">AURORA FORECAST</h2>
      
      <div className="aurora-visual">
        <div className="aurora-overlay"></div>
      </div>

      <div className="aurora-info">
        <p className="forecast-title">TONIGHT'S Forecast:</p>
        <p className="forecast-value">Green = High Activity</p>
        
        <p className="viewing-info">Best Viewing: <span className="locations">Scandinavia, Canada</span></p>
        
        <button className="primary-btn">Get Location Alert</button>
      </div>
    </div>
  );
};

export default AuroraForecast;
