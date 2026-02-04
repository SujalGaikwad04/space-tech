import React, { useState, useEffect } from "react";
import "./EventCountdown.css";

const EventCountdown = ({ targetDate, eventName, onActionClick }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    });

    const calculateTimeLeft = () => {
        const difference = new Date(targetDate) - new Date();

        if (difference > 0) {
            return {
                days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
                hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
                minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
                seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
            };
        }
        return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    };

    useEffect(() => {
        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    // Format event title to highlight last word or key part if needed based on design
    // For now, simpler implementation: "Total Solar Eclipse" -> "Total Solar" + "Eclipse" (colored) if 3 words
    const formatTitle = (title) => {
        if (!title) return { main: "Upcoming", highlight: "Event" };

        const words = title.split(" ");
        if (words.length > 1) {
            const lastWord = words.pop();
            return { main: words.join(" "), highlight: lastWord };
        }
        return { main: title, highlight: "" };
    };

    const { main, highlight } = formatTitle(eventName);

    return (
        <div className="event-countdown-container">
            <div className="countdown-bg-effect"></div>

            {/* Left: Info */}
            <div className="countdown-info">
                <div className="next-event-label">
                    <div className="pulsing-dot"></div>
                    NEXT MAJOR EVENT
                </div>
                <h2 className="countdown-event-title">
                    {main} <span>{highlight}</span>
                </h2>
            </div>

            {/* Center: Timer */}
            <div className="countdown-timer-wrapper">
                <div className="time-block">
                    <span className="time-value">{timeLeft.days}</span>
                    <span className="time-label">DAYS</span>
                </div>
                <span className="time-separator">:</span>
                <div className="time-block">
                    <span className="time-value">{timeLeft.hours}</span>
                    <span className="time-label">HOURS</span>
                </div>
                <span className="time-separator">:</span>
                <div className="time-block">
                    <span className="time-value">{timeLeft.minutes}</span>
                    <span className="time-label">MINS</span>
                </div>
                <span className="time-separator">:</span>
                <div className="time-block">
                    <span className="time-value">{timeLeft.seconds}</span>
                    <span className="time-label">SECS</span>
                </div>
            </div>
        </div>
    );
};

export default EventCountdown;
