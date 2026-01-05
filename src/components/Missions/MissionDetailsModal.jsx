import "./MissionDetailsModal.css";

const MissionDetailsModal = ({ mission, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mission.name}</h2>
        <p>{mission.mission?.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MissionDetailsModal;
