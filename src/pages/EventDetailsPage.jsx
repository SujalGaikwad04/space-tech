import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EventDetailsPage.css';

const EventDetailsPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const event = state?.event;

    // Redirect if no event data
    if (!event) {
        return (
            <div className="event-detail-page">
                <div className="error-message">
                    <h1>Event Not Found</h1>
                    <button onClick={() => navigate('/events')}>Return to Events</button>
                </div>
            </div>
        );
    }

    // Dynamic background based on event type
    const getBackgroundStyle = (type) => {
        let imageUrl;
        switch (type) {
            case 'meteor':
                imageUrl = 'https://images.unsplash.com/photo-1532960401447-b16e13b8fc76?q=80&w=1600&auto=format&fit=crop';
                break;
            case 'aurora':
                imageUrl = 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=1600&auto=format&fit=crop';
                break;
            case 'moon':
                imageUrl = 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?q=80&w=1600&auto=format&fit=crop';
                break;
            case 'eclipse':
                imageUrl = 'https://images.unsplash.com/photo-1529753253655-470be9a42781?q=80&w=1600&auto=format&fit=crop';
                break;
            default: // planetary, etc.
                imageUrl = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1600&auto=format&fit=crop';
        }
        return {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };
    };

    // Generate quick facts based on type (mock data for demo)
    const getQuickFacts = (type) => {
        switch (type) {
            case 'meteor':
                return [
                    { label: 'Parent Body', value: '3200 Phaethon' },
                    { label: 'ZHR (Rate)', value: '120 meteors/hr' },
                    { label: 'Velocity', value: '35 km/s' },
                    { label: 'Radiant', value: 'Gemini Constellation' }
                ];
            case 'aurora':
                return [
                    { label: 'Kp Index', value: '5 (Storm)' },
                    { label: 'Solar Wind', value: '450 km/s' },
                    { label: 'Source', value: 'Coronal Mass Ejection' },
                    { label: 'Best Lat', value: '> 60° North' }
                ];
            case 'moon':
                return [
                    { label: 'Illumination', value: event.moonPhase ? event.moonPhase.replace('Moon: ', '') : '100%' },
                    { label: 'Distance', value: '384,400 km' },
                    { label: 'Age', value: '14.8 days' },
                    { label: 'Next Phase', value: 'Waning Gibbous' }
                ];
            default:
                return [
                    { label: 'Category', value: 'Astronomical Event' },
                    { label: 'Frequency', value: 'Annual' },
                    { label: 'Best Time', value: 'Midnight' },
                    { label: 'Equipment', value: 'None / Binoculars' }
                ];
        }
    };

    const quickFacts = getQuickFacts(event.type);

    return (
        <div className="event-detail-page">
            {/* Hero Section */}
            <section className="detail-hero" style={getBackgroundStyle(event.type)}>
                <div className="hero-overlay"></div>
                <div className="hero-container">
                    <button className="back-button" onClick={() => navigate('/events')}>
                        ← Back to Events
                    </button>

                    <div className="hero-content">
                        <span className="hero-category">{event.type?.toUpperCase() || 'CELESTIAL EVENT'}</span>
                        <h1 className="hero-title">{event.title}</h1>

                        {/* Quick Stats Inline */}
                        <div className="hero-stats">
                            <div className="hero-stat-card">
                                <div className="hero-stat-value">{event.time}</div>
                                <div className="hero-stat-label">TIME</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="hero-stat-value">{event.date}</div>
                                <div className="hero-stat-label">DATE</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="hero-stat-value">{event.visibilityText || 'Good'}</div>
                                <div className="hero-stat-label">VISIBILITY</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="hero-stat-value">{event.moonPhase?.split(':')[1] || 'N/A'}</div>
                                <div className="hero-stat-label">MOON PHASE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <div className="detail-content-wrapper">
                <div className="detail-content-grid">
                    {/* Description */}
                    <section className="detail-section overview-section">
                        <div className="section-header">
                            <h2 className="section-title">Event Overview</h2>
                        </div>
                        <p className="section-description">
                            {event.description || `Join us for the spectacular ${event.title}. This celestial event offers a unique opportunity for stargazers and astronomy enthusiasts. Ensure you have a clear view of the sky and check local weather conditions for the best experience.`}
                        </p>
                    </section>

                    {/* Two Column Layout */}
                    <div className="two-column-layout">
                        {/* Observation Tips */}
                        <section className="detail-section tips-section">
                            <div className="section-header">
                                <h2 className="section-title">Observation Tips</h2>
                            </div>
                            <ul className="tips-list">
                                <li className="tip-item">
                                    <span className="tip-bullet">•</span>
                                    <span className="tip-text">Find a dark location away from city lights for best visibility.</span>
                                </li>
                                <li className="tip-item">
                                    <span className="tip-bullet">•</span>
                                    <span className="tip-text">Allow 20-30 minutes for your eyes to adjust to the darkness.</span>
                                </li>
                                <li className="tip-item">
                                    <span className="tip-bullet">•</span>
                                    <span className="tip-text">Bring warm clothing and a comfortable chair.</span>
                                </li>
                                {event.type === 'meteor' && (
                                    <li className="tip-item">
                                        <span className="tip-bullet">•</span>
                                        <span className="tip-text">No special equipment needed; naked eye is best for meteors.</span>
                                    </li>
                                )}
                                {event.type === 'aurora' && (
                                    <li className="tip-item">
                                        <span className="tip-bullet">•</span>
                                        <span className="tip-text">Look towards the northern horizon. Camera sensors may see more than eyes.</span>
                                    </li>
                                )}
                            </ul>
                        </section>

                        {/* Technical / Extra Info */}
                        <section className="detail-section facts-section">
                            <div className="section-header">
                                <h2 className="section-title">Quick Facts</h2>
                            </div>
                            <div className="data-grid">
                                {quickFacts.map((fact, index) => (
                                    <div key={index} className="data-item">
                                        <span className="data-label">{fact.label}</span>
                                        <span className="data-value">{fact.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;
