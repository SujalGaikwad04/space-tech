import "./MissionCard.css";

const MissionCard = ({ mission, onClick }) => {
  return (
    <div className="mission-card" onClick={onClick}>
      <h3>{mission.name}</h3>
      <p>🚀 {mission.rocket?.configuration?.name}</p>
      <p>📅 {mission.net?.split("T")[0]}</p>
      <p>🏢 {mission.launch_service_provider?.name}</p>
    </div>
  );
};

export default MissionCard;
