import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { addEventReminder, removeEventReminder, checkEventReminder } from "../../services/reminderService";
import "./SelectedDayDetails.css";

const SelectedDayDetails = ({ event, selectedDay }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [reminderText, setReminderText] = useState("Add Reminder");
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderId, setReminderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isNoEvent = !event || event?.noEvent;

  // Format date nicely (e.g., "February 4, 2026")
  const formatDate = (dateIn) => {
    // If dateIn is just a day number, construct date. 
    // This is a rough estimation based on current props (event might just have day number)
    // For now assuming event.date is a string or day. If it's a day, use selectedDay logic from parent if possible,
    // but here we just display what we have or a placeholder.
    return event?.date || `Day ${selectedDay}`;
  };

  useEffect(() => {
    if (isAuthenticated && event && !isNoEvent) {
      const checkReminder = async () => {
        try {
          const result = await checkEventReminder(event.title, event.date);
          setHasReminder(result.hasReminder);
          setReminderId(result.reminderId);
          setReminderText(result.hasReminder ? "Reminder Added" : "Add Reminder");
        } catch (error) {
          console.error("Error checking reminder:", error);
        }
      };
      checkReminder();
    }
  }, [event, isAuthenticated, isNoEvent]);

  const handleAddReminder = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to set reminders!");
      navigate('/login');
      return;
    }

    if (hasReminder && reminderId) {
      // Remove logic
      setIsLoading(true);
      await removeEventReminder(reminderId);
      setHasReminder(false);
      setReminderId(null);
      setReminderText("Add Reminder");
      setIsLoading(false);
      return;
    }

    // Add logic
    setIsLoading(true);
    setReminderText("Adding...");
    try {
      const result = await addEventReminder({
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventDescription: event.description,
        location: user.location || "Your location"
      });
      setHasReminder(true);
      setReminderId(result.reminderId);
      setReminderText("Reminder Added");
      alert(`✅ Reminder set for ${event.title}!`);
    } catch (e) {
      setReminderText("Add Reminder");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : "empty"}`}>★</span>
    ));
  };

  return (
    <div className="selected-day-section">
      <div className="details-card">

        {/* --- NO EVENT STATE --- */}
        {isNoEvent && (
          <>
            <div className="event-card-header">
              <div className="event-title-main">NO CELESTIAL EVENTS</div>
              <button className="info-icon-btn">i</button>
            </div>



            <div className="event-datetime">
              FEBRUARY {selectedDay}, 2026 | NO EVENTS SCHEDULED
            </div>

            <div className="event-visibility">
              <span className="visibility-label">VISIBILITY RATING:</span>
              <div className="stars">{renderStars(3)}</div>
              <span className="visibility-text" style={{ color: '#00d9ff' }}>Clear Night Sky</span>
            </div>

            <div className="event-description">
              <span className="desc-label">EVENT DESCRIPTION</span>
              <p>
                On this night, the atmospheric conditions are expected to be exceptionally clear.
                While no major planetary alignments or meteor showers are predicted, it's a perfect
                opportunity for deep-space photography of the Orion Nebula and Pleiades cluster.
              </p>
            </div>

            {/* Quiet Orbit Center Graphic */}
            <div className="center-icon-container">
              <div className="center-icon quiet-moon">☾</div>
            </div>
            <div className="quiet-label">QUIET ORBIT</div>

            <div className="event-actions">
              <button className="action-btn" onClick={() => alert("Reminder set for stargazing!")}>ADD REMINDER</button>
              <button className="action-btn" onClick={() => {
                navigator.clipboard.writeText("Clear skies tonight!");
                alert("Copied to clipboard");
              }}>SHARE EVENT</button>
              <button className="action-btn">VIEW FULL SKY MAP</button>
            </div>
          </>
        )}

        {/* --- EVENT DETECTED STATE --- */}
        {!isNoEvent && (
          <>
            <div className="event-card-header">
              <div className="event-title-main">{event.title}</div>
              <button className="info-icon-btn" onClick={() => navigate('/event-details', { state: { event } })}>i</button>
            </div>



            <div className="event-datetime">
              {event.date || `FEBRUARY ${selectedDay}, 2026`} | {event.time || "ALL NIGHT"}
            </div>

            <div className="event-visibility">
              <span className="visibility-label">VISIBILITY RATING:</span>
              <div className="stars">{renderStars(event.visibility || 4)}</div>
              <span className="visibility-text">{event.visibilityText || "Good Visibility"}</span>
            </div>

            <div className="event-description">
              <span className="desc-label">EVENT DESCRIPTION</span>
              <p>{event.description}</p>
            </div>

            {/* Event Type Center Graphic */}
            <div className="center-icon-container">
              <div className="center-icon">{event.icon || "🛰️"}</div>
            </div>

            <div className="event-actions">
              <button className="action-btn" onClick={handleAddReminder} disabled={isLoading}>
                {reminderText.toUpperCase()}
              </button>
              <button className="action-btn" onClick={() => {
                navigator.clipboard.writeText(`Check out ${event.title}!`);
                alert("Link copied!");
              }}>SHARE EVENT</button>
              <button className="action-btn" onClick={() => navigate('/event-details', { state: { event } })}>
                VIEW DETAILS
              </button>
              <button className="action-btn" style={{ borderColor: '#8a2be2', color: '#e0b0ff' }} onClick={() => navigate('/community-events')}>
                COMMUNITY EVENTS
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default SelectedDayDetails;
