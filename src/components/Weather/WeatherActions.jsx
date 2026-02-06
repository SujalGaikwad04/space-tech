import { useNavigate } from "react-router-dom";
import "./WeatherActions.css";

const WeatherActions = () => {
  const navigate = useNavigate();

  return (
    <div className="actions">
      <button onClick={() => navigate('/earth-weather-details')}>View Detailed Analytics</button>
      <button onClick={() => alert('Cosmic Weather Alerts coming soon!')}>Get Alerts</button>
      <button className="secondary" onClick={() => window.open('https://www.swpc.noaa.gov/', '_blank')}>Live NOAA Data</button>
    </div>
  );
};

export default WeatherActions;
