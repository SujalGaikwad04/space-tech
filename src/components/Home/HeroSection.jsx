import { useEffect, useState } from "react";
import "./HeroSection.css";
import { useEventsData } from "../Events/useEventsData";

export default function HeroSection() {
  const [iss, setIss] = useState("ISS currently over Pacific Ocean");
  const [cityInput, setCityInput] = useState("");
  const [searchCity, setSearchCity] = useState("Mumbai, India"); // Default for initial load

  // Current date for event fetching
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  // Fetch events based on searchCity
  const { allEventsData, loading } = useEventsData(currentMonth, currentYear, searchCity);

  // Filter for relevant upcoming events (today/tomorrow)
  const liveEvents = allEventsData
    .filter(event => event.day >= currentDay && (event.day <= currentDay + 2)) // Show next 2 days
    .sort((a, b) => a.day - b.day)
    .slice(0, 3); // Take top 3

  useEffect(() => {
    const fetchISS = async () => {
      try {
        const res = await fetch(
          "https://api.wheretheiss.at/v1/satellites/25544"
        );
        const data = await res.json();
        setIss(
          `ISS currently over Lat ${data.latitude.toFixed(
            1
          )}°, Lon ${data.longitude.toFixed(1)}°`
        );
      } catch {
        setIss("ISS currently over Pacific Ocean");
      }
    };

    fetchISS();
    const interval = setInterval(fetchISS, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (cityInput.trim()) {
      setSearchCity(cityInput);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* 🌍 FIXED BACKGROUND FOR ENTIRE HOME */}
      <img
        src="/earth.jpg"
        alt="Earth from space"
        className="home-bg"
      />

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-header">
            <h1 className="hero-title">Welcome to SpaceScope</h1>
            <p className="hero-subtitle">
              Explore, Learn & Stay Connected with the Universe
            </p>
          </div>

          <div className="hero-content-box">
            <div className="hero-search">
              <input
                type="text"
                placeholder="[Enter Your City]"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="hero-input"
              />
              <button className="premium-btn hero-search-btn" onClick={handleSearch}>
                <span className="shimmer-effect"></span>
                <span className="scan-line"></span>
                🔍 Find Events
              </button>
            </div>

            <div className="hero-live-section">
              <div className="live-badge">LIVE NOW IN {searchCity.toUpperCase().split(',')[0]}</div>
              <div className="live-updates">

                {/* Always show ISS */}
                <div className="live-item">
                  <span style={{ marginRight: '10px' }}>🛰️</span>
                  {iss}
                </div>

                {/* Dynamic Events */}
                {loading ? (
                  <div className="live-item">Syncing astronomical data...</div>
                ) : liveEvents.length > 0 ? (
                  liveEvents.map((event, index) => (
                    <div key={index} className="live-item">
                      <span style={{ marginRight: '10px' }}>{event.icon}</span>
                      <span>{event.title} - {event.time}</span>
                    </div>
                  ))
                ) : (
                  <div className="live-item">No major events visible tonight in {searchCity.split(',')[0]}.</div>
                )}

              </div>
            </div>

            <div className="hero-notification">
              🔔 Set up notifications to never miss a sky event!
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
