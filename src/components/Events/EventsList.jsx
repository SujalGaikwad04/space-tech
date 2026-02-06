import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addEventReminder } from '../../services/reminderService';
import './EventsList.css';

const EventsList = ({ events }) => {
    const { isAuthenticated, user } = useAuth();
    const [reminderEvents, setReminderEvents] = useState({}); // Track reminders by event ID

    if (!events || events.length === 0) {
        return null;
    }

    // Helper to determine tag color class
    const getTagClass = (type) => {
        switch (type) {
            case 'meteor': return 'tag-meteor';
            case 'eclipse': return 'tag-eclipse';
            case 'conjunction': return 'tag-planetary';
            case 'man-made': return 'tag-man-made';
            default: return 'tag-planetary';
        }
    };

    return (
        <div className="events-list-section">
            <div className="events-list-header">
                Upcoming Events
            </div>

            {events.map((event, index) => (
                <div key={index} className="event-card-item">
                    {event.image && (
                        <div className="event-visual" style={{ backgroundImage: `url(${event.image})` }}>
                            <div className="visual-overlay"></div>
                        </div>
                    )}

                    <div className="event-content">
                        <div className="event-top-row">
                            <div className="event-title-group">
                                <h3>{event.title}</h3>
                                {event.location && <span className="event-subtitle">{event.location}</span>}
                            </div>
                            {event.tag && (
                                <span className={`event-tag ${getTagClass(event.type)}`}>
                                    {event.tag}
                                </span>
                            )}
                        </div>

                        <p className="event-description">
                            {event.description}
                        </p>

                        <div className="event-info-row">
                            {event.time && (
                                <div className="info-item">
                                    <span className="info-icon">{event.timeIcon || '🕒'}</span> {event.time}
                                </div>
                            )}
                            {event.moonPhase && (
                                <div className="info-item">
                                    <span className="info-icon">🌑</span> {event.moonPhase}
                                </div>
                            )}
                        </div>

                        {event.warning && (
                            <div className="warning-box">
                                <span>{event.warningIcon || 'ℹ️'}</span> {event.warning}
                            </div>
                        )}

                        <div className="event-actions">
                            {event.buttonText && (
                                <button
                                    className={`btn-primary ${event.isWideButton ? 'btn-wide' : ''}`}
                                    onClick={async (e) => {
                                        if (event.buttonText === 'Set Reminder' && !reminderEvents[event.id]) {
                                            e.stopPropagation();
                                            if (!isAuthenticated) {
                                                alert("Please login to set reminders.");
                                                return;
                                            }

                                            try {
                                                await addEventReminder({
                                                    eventTitle: event.title,
                                                    eventDate: event.date,
                                                    eventTime: event.time,
                                                    eventDescription: event.description,
                                                    location: user?.location || "Unknown"
                                                });
                                                setReminderEvents(prev => ({ ...prev, [event.id]: true }));
                                            } catch (err) {
                                                console.error(err);
                                                alert("Failed to set reminder.");
                                            }
                                        } else if (event.primaryAction) {
                                            window.open(event.primaryAction, '_blank');
                                        }
                                    }}
                                    style={reminderEvents[event.id] ? { background: 'transparent', border: '1px solid #00ff88', color: '#00ff88' } : {}}
                                >
                                    {reminderEvents[event.id] ? (
                                        <><span>✓</span> Reminder Added</>
                                    ) : (
                                        <>
                                            {event.buttonText === 'Set Reminder' && <span>🔔</span>}
                                            {event.buttonText}
                                        </>
                                    )}
                                </button>
                            )}
                            {event.secondaryButtonText && (
                                <button
                                    className="btn-secondary"
                                    onClick={() => event.secondaryAction && window.open(event.secondaryAction, '_blank')}
                                >
                                    {event.secondaryButtonText}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}


        </div>
    );
};

export default EventsList;
