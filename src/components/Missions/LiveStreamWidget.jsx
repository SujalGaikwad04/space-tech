import React from 'react';
import './LiveStreamWidget.css';

const LiveStreamWidget = () => {
    return (
        <div className="live-stream-widget">
            <div className="stream-header">
                <h3>LIVE STREAM: ISS EXTERIOR</h3>
                <span className="live-badge">LIVE</span>
            </div>

            <div className="stream-container">
                {/* NASA ISS Live Stream via Ustream */}
                <iframe
                    src="https://www.ustream.tv/embed/17074538?html5ui=1&autoplay=true&controls=false"
                    title="ISS Live Stream"
                    className="stream-iframe"
                    frameBorder="0"
                    allow="autoplay"
                    allowFullScreen
                />
                <div className="stream-overlay">
                    <div className="camera-info">
                        <span className="camera-icon">📹</span>
                        <span className="camera-text">NASA ISS HD Earth Viewing</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveStreamWidget;
