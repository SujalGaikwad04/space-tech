import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectedDayDetails.css";

const SelectedDayDetails = ({ event, selectedDay }) => {
  const navigate = useNavigate();
  const [reminderText, setReminderText] = useState("Add Reminder");
  const [shareText, setShareText] = useState("Share");

  const isNoEvent = !event || event?.noEvent;

  const handleViewDetails = () => {
    navigate('/event-details', { state: { event } });
  };

  const handleAddReminder = () => {
    setReminderText("Reminder Added! ✓");
    // Simulate API call or local notification
    setTimeout(() => {
      alert(`Reminder set for ${event.title}! We'll notify you on the day.`);
      setReminderText("Add Reminder");
    }, 500);
  };

  const handleShare = async () => {
    const fullInfo = `
🌌 *${event.title?.toUpperCase()}*
📅 ${event.date} | ${event.time}
⭐ Visibility: ${event.visibilityText || 'N/A'}
🌔 ${event.moonPhase || 'N/A'}

📝 ${event.description || 'No description available'}

Check it out on RealSpace!
`.trim();

    // WhatsApp ONLY as strictly requested
    const waUrl = `https://wa.me/?text=${encodeURIComponent(fullInfo)}`;
    window.open(waUrl, '_blank');
  };



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
              <button
                className="action-btn-primary"
                onClick={() => alert("Alert set for clear skies!")}
              >
                🔔 Set Alert
              </button>

              <button className="action-btn-secondary">
                🗺️ View Visibility Map
              </button>

              <button
                className="action-btn-secondary"
                onClick={() => {
                  navigator.clipboard.writeText("Clear skies tonight! Perfect for stargazing.");
                  alert("Status copied to clipboard!");
                }}
              >
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
              <button className="info-icon-btn" onClick={handleViewDetails}>ⓘ</button>
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
              <div style={{
                fontSize: '0.9rem',
                color: event.visibility <= 2 ? '#ff4d4d' : event.visibility === 3 ? '#ffcc00' : '#4dff88',
                marginTop: '5px',
                fontStyle: 'italic',
                fontWeight: '500'
              }}>
                {event.visibilityText}
              </div>
            </div>

            <div className="event-description">
              <strong>Event Description</strong>
              <p>
                {event.description}
              </p>
              <button
                className="read-more-btn"
                onClick={handleViewDetails}
              >
                Read More
              </button>
            </div>

            <div className="event-type">
              <strong>Event Type</strong>
              <div className="event-type-icon">
                <span>{event.icon || "☄️"}</span>
              </div>
            </div>

            <div className="event-actions">
              <button
                className="action-btn-primary"
                onClick={handleAddReminder}
              >
                {reminderText}
              </button>

              <button
                className="action-btn-secondary"
                onClick={handleShare}
              >
                {shareText}
              </button>



              <button className="action-btn-secondary" onClick={handleViewDetails}>
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
