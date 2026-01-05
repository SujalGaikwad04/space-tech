import { useEffect, useState } from "react";
import "./FeaturedMission.css";

const FeaturedMission = () => {
  const [mission, setMission] = useState(null);

  useEffect(() => {
    fetch("https://ll.thespacedevs.com/2.2.0/launch/?limit=1")
      .then(res => res.json())
      .then(data => setMission(data.results[0]));
  }, []);

  if (!mission) return null;

  return (
    <section className="featured-mission-section">
      <h2 className="featured-title">FEATURED MISSION: {mission.name}</h2>
      <div className="featured-content">
        <div className="featured-image">
          {mission.image ? (
            <img src={mission.image} alt={mission.name} />
          ) : (
            <div className="placeholder-image">🛰️</div>
          )}
        </div>
        <div className="featured-details">
          <div className="status-row">
            <span className="status-indicator">🟢</span>
            <span className="status-text">
              Operational | Launch: {new Date(mission.net).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="discovery-row">
            <span className="discovery-label">Recent Discovery:</span>
            <span className="discovery-text">
              "{mission.mission?.description?.substring(0, 50) || "Exploring the cosmos..."}..."
            </span>
          </div>
          <div className="action-buttons">
            <button className="action-btn">[View Latest Images]</button>
            <button className="action-btn">[Track Live Position]</button>
            <button className="action-btn">[3D Model]</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMission;
