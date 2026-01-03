import "./SelectedDayDetails.css";

const SelectedDayDetails = ({ event, selectedDay }) => {
  if (!event) return null;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star filled" : "star empty"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="selected-day-section">
      <div className="selected-day-header">
        SELECTED DAY: {event.date}
      </div>

      <div className="details-card">
        <div className="event-time">
          <span className="clock-icon">🕒</span>
          <span>{event.time}</span>
        </div>

        <div className="event-title">
          <span className="title-icon">{event.icon}</span>
          <span>{event.title}</span>
        </div>

        <div className="event-visibility">
          <div className="stars">{renderStars(event.visibility)}</div>
          <span className="visibility-text">({event.visibilityText})</span>
        </div>

        <div className="event-moon">
          <span className="moon-icon">🌘</span>
          <span>{event.moonPhase}</span>
        </div>

        <div className="event-actions">
          <button className="action-btn-inline">
            <span>🔔</span> Set Alert
          </button>
          <button className="action-btn-inline">
            <span>🗺️</span> View Visibility Map
          </button>
          <button className="action-btn-inline">
            <span>📤</span> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedDayDetails;
