import "./SelectedDayDetails.css";

const SelectedDayDetails = ({ event, selectedDay }) => {
  const isNoEvent = !event || event?.noEvent;

  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`star ${i < rating ? "filled" : "empty"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="selected-day-section">
      <div className="details-card">

        {/* 🟢 NO EVENT STATE */}
        {isNoEvent && (
          <>
            <div className="event-status">
              🕒 No events scheduled
            </div>

            <div className="event-title-main">
              No Celestial Events
            </div>

            <div className="event-visibility">
              <div className="stars">
                {renderStars(5)}
              </div>
              <span className="visibility-text">
                (Clear Night Sky)
              </span>
            </div>

            <div className="event-note">
              🪐 Check for general stargazing
            </div>

            <div className="event-actions">
              <button className="action-btn-primary">
                🔔 Set Alert
              </button>

              <button className="action-btn-secondary">
                🗺️ View Visibility Map
              </button>

              <button className="action-btn-secondary">
                📤 Share
              </button>
            </div>
          </>
        )}

        {/* 🔵 EVENT PRESENT STATE */}
        {!isNoEvent && (
          <>
            <div className="event-card-header">
              <div className="event-title-main">
                {event.title?.toUpperCase()}
              </div>
              <button className="info-icon-btn">ⓘ</button>
            </div>

            <div className="event-datetime">
              {event.date} | {event.time}
            </div>

            <div className="event-visibility">
              <span className="visibility-label">
                Visibility Rating:
              </span>
              <div className="stars">
                {renderStars(event.visibility)}
              </div>
            </div>

            <div className="event-description">
              <strong>Event Description</strong>
              <p>
                {event.description}
              </p>
            </div>

            <div className="event-type">
              <strong>Event Type</strong>
              <div className="event-type-icon">
                <span>{event.icon || "☄️"}</span>
              </div>
            </div>

            <div className="event-actions">
              <button className="action-btn-primary">
                Add Reminder
              </button>

              <button className="action-btn-secondary">
                Share
              </button>

              <button className="action-btn-secondary">
                View Details
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default SelectedDayDetails;