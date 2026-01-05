import { useEffect, useState } from "react";
import "./MissionTimelineSection.css";

const API =
  "https://ll.thespacedevs.com/2.2.0/launch/?limit=20";

const MissionTimelineSection = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setMissions(data.results));
  }, []);

  return (
    <section className="mission-timeline">
      {missions.map(m => (
        <div key={m.id} className="timeline-item">
          <span>{m.net?.slice(0, 4)}</span>
          <p>{m.name}</p>
        </div>
      ))}
    </section>
  );
};

export default MissionTimelineSection;
    