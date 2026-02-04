import { useEffect, useState } from "react";
import SolarActivity from "./SolarActivity";
import AuroraForecast from "./AuroraForecast";
import SatelliteImpact from "./SatelliteImpact";
import WeatherActions from "./WeatherActions";
import EarthWeatherBrief from "./EarthWeatherBrief";
import "./WeatherPageContainer.css";

const WeatherPageContainer = () => {
  const [solarFlares, setSolarFlares] = useState([]);
  const [kpIndex, setKpIndex] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("5 minutes ago");

  useEffect(() => {
    fetch("https://services.swpc.noaa.gov/json/solar_flares.json")
      .then(res => res.json())
      .then(data => setSolarFlares(data))
      .catch(() => setSolarFlares([]));

    fetch("https://services.swpc.noaa.gov/json/kp_index.json")
      .then(res => res.json())
      .then(data => setKpIndex(data[data.length - 1]))
      .catch(() => setKpIndex({ kp_index: 2 }));
  }, []);

  return (
    <div className="weather-page">
      {/* 🌍 GLOBAL BACKGROUND */}
      <img
        src="/backgrounds/abstract-horizon.png"
        alt="Abstract planet horizon"
        className="home-bg"
      />
      <div className="weather-container">
        <div className="weather-header">
          <h1 className="title">COSMIC WEATHER</h1>
          <p className="meta">
            Last Updated: {lastUpdated} | Source: NOAA/SWPC
          </p>
        </div>

        <div className="weather-grid">
          <SolarActivity solarFlares={solarFlares} />
          <AuroraForecast />
        </div>

        <SatelliteImpact kpIndex={kpIndex} />
        <EarthWeatherBrief />
      </div>
    </div>
  );
};

export default WeatherPageContainer;
