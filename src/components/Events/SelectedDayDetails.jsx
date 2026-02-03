import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { addEventReminder, removeEventReminder, checkEventReminder } from "../../services/reminderService";
import "./SelectedDayDetails.css";

const SelectedDayDetails = ({ event, selectedDay }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [reminderText, setReminderText] = useState("Add Reminder");
  const [shareText, setShareText] = useState("Share");
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderId, setReminderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isNoEvent = !event || event?.noEvent;

  // Check if user already has a reminder for this event
  useEffect(() => {
    if (isAuthenticated && event && !isNoEvent) {
      const checkReminder = async () => {
        try {
          const result = await checkEventReminder(event.title, event.date);
          setHasReminder(result.hasReminder);
          setReminderId(result.reminderId);
          if (result.hasReminder) {
            setReminderText("Reminder Set ✓");
          }
        } catch (error) {
          console.error("Error checking reminder:", error);
        }
      };
      checkReminder();
    }
  }, [event, isAuthenticated, isNoEvent]);

  const handleViewDetails = () => {
    navigate('/event-details', { state: { event } });
  };

  const handleAddReminder = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to set reminders and receive email notifications!");
      navigate('/login');
      return;
    }

    if (hasReminder && reminderId) {
      // Remove reminder
      setIsLoading(true);
      try {
        await removeEventReminder(reminderId);
        setHasReminder(false);
        setReminderId(null);
        setReminderText("Add Reminder");
        alert("Reminder removed successfully!");
      } catch (error) {
        console.error("Error removing reminder:", error);
        alert("Failed to remove reminder. Please try again.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Add reminder
    setIsLoading(true);
    setReminderText("Adding...");

    try {
      const eventData = {
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventDescription: event.description,
        eventIcon: event.icon,
        location: user.location || "Your location"
      };

      const result = await addEventReminder(eventData);

      setHasReminder(true);
      setReminderId(result.reminderId);
      setReminderText("Reminder Set ✓");

      alert(`✅ Reminder set for ${event.title}!\n\n📧 A confirmation email has been sent to ${user.email}`);
    } catch (error) {
      console.error("Error adding reminder:", error);
      setReminderText("Add Reminder");
      alert(error.message || "Failed to add reminder. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
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
