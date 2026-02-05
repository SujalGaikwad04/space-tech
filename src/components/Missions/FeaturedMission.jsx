import { useEffect, useState } from "react";
import "./FeaturedMission.css";
import { useAuth } from "../../context/AuthContext";
import { addEventReminder, checkEventReminder } from "../../services/reminderService";
import { useNavigate } from "react-router-dom";

const FeaturedMission = () => {
  const [mission, setMission] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [hasReminder, setHasReminder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState("Set Reminder");

  useEffect(() => {
    fetch("https://ll.thespacedevs.com/2.2.0/launch/?limit=1")
      .then(res => res.json())
      .then(data => setMission(data.results[0]));
  }, []);

  useEffect(() => {
    if (isAuthenticated && mission) {
      const check = async () => {
        try {
          const result = await checkEventReminder(mission.name, new Date(mission.net).toLocaleDateString());
          setHasReminder(result.hasReminder);
          if (result.hasReminder) setBtnText("Reminder Set");
        } catch (e) {
          console.error("Error checking featured mission reminder:", e);
        }
      };
      check();
    }
  }, [mission, isAuthenticated]);

  const handleReminder = async () => {
    if (!isAuthenticated) {
      alert("Please login to set mission reminders!");
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setBtnText("Setting...");
    try {
      const launchDate = new Date(mission.net).toLocaleDateString();
      await addEventReminder({
        eventTitle: mission.name,
        eventDate: launchDate,
        eventTime: new Date(mission.net).toLocaleTimeString(),
        eventDescription: mission.mission?.description || "Space exploration mission",
        location: mission.pad?.name || mission.launch_service_provider?.name || "TBD"
      });
      setHasReminder(true);
      setBtnText("Reminder Set");
      alert(`✅ Reminder set for ${mission.name}! Check your email: ${user.email}`);
    } catch (e) {
      console.error("Failed to set reminder:", e);
      setBtnText("Set Reminder");
      alert(e.message || "Failed to set reminder");
    } finally {
      setIsLoading(false);
    }
  };

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
              "{mission.mission?.description?.substring(0, 150) || "Exploring the cosmos..."}..."
            </span>
          </div>
          <div className="action-buttons">
            <button className="action-btn" onClick={handleReminder} disabled={hasReminder || isLoading}>
              {btnText}
            </button>
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
