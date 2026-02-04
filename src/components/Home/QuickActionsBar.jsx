import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuickActionsBar.css';

const QuickActionsBar = () => {
    const navigate = useNavigate();
    const actions = [
        { icon: '🛰️', label: 'Track ISS', id: 'track-iss' },
        { icon: '📅', label: 'View Events', id: 'events' },
        { icon: '🚀', label: 'Explore Missions', id: 'missions' },
        { icon: '📰', label: 'Latest News', id: 'news' }
    ];

    const handleAction = (id) => {
        // Smooth scroll to section or navigate
        if (id === 'track-iss') {
            navigate('/live-map');
        } else if (id === 'missions') {
            navigate('/mission');
        } else if (id === 'events') {
            navigate('/events');
        } else {
            // Scroll to section
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="quick-actions-bar">
            <div className="actions-container">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className="action-btn"
                        onClick={() => handleAction(action.id)}
                    >
                        <span className="action-icon">{action.icon}</span>
                        <span className="action-label">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActionsBar;
