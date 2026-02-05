import React, { useState, useEffect } from 'react';
import './UpcomingMissionsList.css';
import { upcomingMissions2026, getStatusColor } from './upcomingMissionsData';
import { useAuth } from '../../context/AuthContext';
import { addEventReminder, checkEventReminder } from '../../services/reminderService';
import { useNavigate } from 'react-router-dom';

const UpcomingMissionCard = ({ mission }) => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [hasReminder, setHasReminder] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [btnText, setBtnText] = useState("Set Reminder");

    useEffect(() => {
        if (isAuthenticated) {
            const check = async () => {
                try {
                    const result = await checkEventReminder(mission.name, mission.launchDate);
                    setHasReminder(result.hasReminder);
                    if (result.hasReminder) setBtnText("Reminder Set");
                } catch (e) {
                    console.error("Error checking mission reminder:", e);
                }
            };
            check();
        }
    }, [mission.name, mission.launchDate, isAuthenticated]);

    const handleReminder = async () => {
        if (!isAuthenticated) {
            alert("Please login to set mission reminders!");
            navigate('/login');
            return;
        }

        setIsLoading(true);
        setBtnText("Setting...");
        try {
            await addEventReminder({
                eventTitle: mission.name,
                eventDate: mission.launchDate,
                eventTime: "TBD",
                eventDescription: mission.description,
                location: mission.agency
            });
            setHasReminder(true);
            setBtnText("Reminder Set");
            alert(`✅ Reminder set for ${mission.name}! Check your email: ${user.email}`);
        } catch (e) {
            console.error("Failed to set reminder:", e);
            setBtnText("Set Reminder");
            alert(e.message || "Failed to set reminder");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="upcoming-card">
            <div className="upcoming-card-header">
                <div className="upcoming-name">{mission.name}</div>
                <div
                    className="upcoming-status"
                    style={{ color: getStatusColor(mission.status) }}
                >
                    {mission.status}
                </div>
            </div>

            <div className="upcoming-launch">
                <span className="launch-icon">🚀</span>
                <span className="launch-date">{mission.launchDate}</span>
            </div>

            <div className="upcoming-meta">
                <div className="meta-item">
                    <span className="meta-icon">🏛️</span>
                    <span>{mission.agency}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-icon">🎯</span>
                    <span>{mission.destination}</span>
                </div>
                <div className="meta-item">
                    <span className="meta-icon">🛸</span>
                    <span>{mission.type}</span>
                </div>
            </div>

            <p className="upcoming-description">{mission.description}</p>

            <button
                className={`reminder-btn ${hasReminder ? 'added' : ''}`}
                onClick={handleReminder}
                disabled={hasReminder || isLoading}
            >
                {btnText}
            </button>
        </div>
    );
};

const UpcomingMissionsList = () => {
    return (
        <div className="upcoming-missions-list">
            <div className="upcoming-header">
                <h3>UPCOMING MISSIONS 2026</h3>
                <span className="mission-count">{upcomingMissions2026.length} Missions</span>
            </div>

            <div className="upcoming-grid">
                {upcomingMissions2026.map((mission, index) => (
                    <UpcomingMissionCard key={index} mission={mission} />
                ))}
            </div>
        </div>
    );
};

export default UpcomingMissionsList;
