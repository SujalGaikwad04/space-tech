import React, { useEffect, useState } from "react";
import "./ExploreFeatures.css";

const ExploreFeatures = () => {
  const [issData, setIssData] = useState(null);

  useEffect(() => {
    fetch("http://api.open-notify.org/iss-now.json")
      .then(res => res.json())
      .then(data => setIssData(data.iss_position))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="explore-section">
      <h2 className="explore-title">EXPLORE WITH INTERACTIVE TOOLS</h2>

      <div className="explore-grid">
        {/* Visibility Map */}
        <div className="explore-card">
          <h3>VISIBILITY MAP</h3>
          <p>Check if you can see space events from your city.</p>
          <button>Try Now →</button>
        </div>

        {/* Mission Track */}
        <div className="explore-card">
          <h3>MISSION TRACK</h3>
          <p>Follow current space missions in real-time.</p>

          {issData ? (
            <p className="live-data">
              ISS Location:
              <br />
              Lat: {issData.latitude}
              <br />
              Lon: {issData.longitude}
            </p>
          ) : (
            <p className="loading">Fetching live data...</p>
          )}

          <button>Explore →</button>
        </div>

        {/* Satellite Impact */}
        <div className="explore-card">
          <h3>SATELLITE IMPACT</h3>
          <p>See how space technology helps solve Earth problems.</p>
          <button>Learn More →</button>
        </div>
      </div>
    </section>
  );
};

export default ExploreFeatures;
