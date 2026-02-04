import React from 'react';
import './EventsList.css';

const EventsList = ({ events }) => {
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
                                    <span className="info-icon">🕒</span> {event.time}
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
                                <span>ℹ️</span> {event.warning}
                            </div>
                        )}

                        <div className="event-actions">
                            {event.buttonText && (
                                <button
                                    className="btn-primary"
                                    onClick={() => event.primaryAction && window.open(event.primaryAction, '_blank')}
                                >
                                    {event.buttonText === 'Set Reminder' && <span>🔔</span>}
                                    {event.buttonText}
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
