import { useEffect, useState } from "react";
import MissionCard from "./MissionCard";
import MissionDetailsModal from "./MissionDetailsModal";
import "./MissionListSection.css";

const API =
  "https://ll.thespacedevs.com/2.2.0/launch/?limit=30";

const MissionListSection = () => {
  const [missions, setMissions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setMissions(data.results));
  }, []);

  return (
    <section className="mission-list-section">
      {missions.map(m => (
        <MissionCard
          key={m.id}
          mission={m}
          onClick={() => setSelected(m)}
        />
      ))}

      {selected && (
        <MissionDetailsModal
          mission={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default MissionListSection;
