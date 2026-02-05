import React, { useState, useEffect } from 'react';
import './CountdownWidget.css';

const CountdownWidget = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 142,
        hours: 8,
        minutes: 45,
        seconds: 12
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;

                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }
                if (hours < 0) {
                    hours = 23;
                    days--;
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="countdown-widget glass-panel">
            <div className="countdown-header">
                <h3>NEXT LAUNCH: ARTEMIS III</h3>
                <span className="countdown-badge">🚀</span>
            </div>

            <div className="countdown-display">
                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.days).padStart(3, '0')}</div>
                    <div className="countdown-label">DAYS</div>
                </div>

                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="countdown-label">HOURS</div>
                </div>

                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="countdown-label">MINUTES</div>
                </div>

                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="countdown-label">SECONDS</div>
                </div>
            </div>
        </div>
    );
};

export default CountdownWidget;
