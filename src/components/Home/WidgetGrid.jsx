import React from 'react';
import { Link } from 'react-router-dom';
import './WidgetGrid.css';

const WidgetGrid = () => {
    const widgets = [
        {
            id: 'events',
            icon: '📅',
            title: 'Upcoming Events',
            value: '12',
            subtitle: 'Next 30 days',
            link: '/events',
            color: '#00d9ff'
        },
        {
            id: 'missions',
            icon: '🚀',
            title: 'Active Missions',
            value: '182',
            subtitle: 'Currently operational',
            link: '/missions',
            color: '#9d4edd'
        },
        {
            id: 'satellites',
            icon: '🛰️',
            title: 'Satellites Tracked',
            value: '5,000+',
            subtitle: 'Real-time monitoring',
            link: '/satellites',
            color: '#00ff88'
        },
        {
            id: 'news',
            icon: '📰',
            title: 'Latest Updates',
            value: '24',
            subtitle: 'This week',
            link: '#news',
            color: '#ff006e'
        }
    ];

    return (
        <section className="widget-grid-section">
            <div className="widget-container">
                <h2 className="section-title">Mission Control Dashboard</h2>
                <div className="widget-grid">
                    {widgets.map((widget) => (
                        <Link
                            key={widget.id}
                            to={widget.link}
                            className="widget-card"
                            style={{ '--widget-color': widget.color }}
                        >
                            <div className="widget-header">
                                <span className="widget-icon">{widget.icon}</span>
                                <h3 className="widget-title">{widget.title}</h3>
                            </div>
                            <div className="widget-body">
                                <div className="widget-value">{widget.value}</div>
                                <div className="widget-subtitle">{widget.subtitle}</div>
                            </div>
                            <div className="widget-footer">
                                <span className="widget-link-text">View Details →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WidgetGrid;
