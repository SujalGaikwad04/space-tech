import { useState } from "react";
import "./TimelineScroller.css";

const TimelineScroller = ({ onEraSelect }) => {
  const eras = ["1960s", "1970s", "1980s", "1990s", "2000s", "2020s"];
  const [selectedEra, setSelectedEra] = useState("2020s");

  const handleEraClick = (era) => {
    setSelectedEra(era);
    if (onEraSelect) onEraSelect(era);
  };

  return (
    <div className="timeline-scroller">
      <div className="timeline-header">
        <h3>TIMELINE SCROLLER</h3>
      </div>
      <div className="timeline-track">
        {eras.map((era, index) => (
          <div key={era} className="timeline-era-wrapper">
            <button
              className={`timeline-era ${selectedEra === era ? 'active' : ''}`}
              onClick={() => handleEraClick(era)}
            >
              {era}
            </button>
            {index < eras.length - 1 && <div className="timeline-connector"></div>}
          </div>
        ))}
        <div className="timeline-arrow">→</div>
      </div>
    </div>
  );
};

export default TimelineScroller;
