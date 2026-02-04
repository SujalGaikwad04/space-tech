import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityEvents.css";

const CommunityEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events from localStorage
        const storedEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
        // Sort by newest first
        const sortedEvents = storedEvents.sort((a, b) => b.id - a.id);
        setEvents(sortedEvents);
    }, []);

    return (
        <div className="community-events-page">
            {/* 🌍 GLOBAL BACKGROUND */}
            <img
                src="/backgrounds/abstract-horizon.png"
                alt="Abstract planet horizon"
                className="home-bg"
            />

            <div className="community-header">
                <h1>Community Events</h1>
                <p>Discover space events hosted by fellow explorers in the SpaceTech community.</p>
            </div>

            <div className="community-controls">
                <button
                    className="premium-btn"
                    onClick={() => navigate('/create-event')}
                    style={{ padding: '10px 25px' }}
                >
                    <span className="shimmer-effect"></span>
                    + Host New Event
                </button>
            </div>

            {events.length === 0 ? (
                <div className="empty-state">
                    <h3>No community events yet</h3>
                    <p>Be the first to host a cosmic gathering!</p>
                    <button
                        className="premium-btn"
                        onClick={() => navigate('/create-event')}
                    >
                        Create Event
                    </button>
                </div>
            ) : (
                <div className="community-grid">
                    {events.map(event => (
                        <div key={event.id} className="community-card">
                            <img src={event.image} alt={event.title} className="community-card-image" />
                            <div className="community-card-content">
                                <span className="event-tag">{event.tag || "COMMUNITY"}</span>
                                <h3>{event.title}</h3>

                                <div className="event-meta">
                                    <span>📅 {new Date().getFullYear()}-{new Date().getMonth() + 1}-{event.day}</span>
                                    <span>⏱️ {event.time}</span>
                                </div>

                                <div className="event-meta">
                                    <span>📍 {event.location}</span>
                                </div>

                                <p className="event-desc">
                                    {event.description?.length > 100
                                        ? event.description.substring(0, 100) + "..."
                                        : event.description}
                                </p>

                                <div className="card-footer">
                                    <div className="user-badge">
                                        <div className="user-avatar">U</div>
                                        <span>Community Member</span>
                                    </div>
                                    <button
                                        className="view-btn"
                                        onClick={() => navigate(`/community-event/${event.id}`)}
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommunityEvents;
