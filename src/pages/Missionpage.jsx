import { useState } from "react";
import MissionHero from "../components/Missions/MissionHero";
import MissionFiltersSection from "../components/Missions/MissionFiltersSection";
import TimelineScroller from "../components/Missions/TimelineScroller";
import EraSelection from "../components/Missions/EraSelection";
import FeaturedMission from "../components/Missions/FeaturedMission";
import MissionListSection from "../components/Missions/MissionListSection";

function Missionpage() {
  const [selectedEra, setSelectedEra] = useState("2020s");
  const [currentView, setCurrentView] = useState("timeline");

  return (
    <>
      <MissionHero />
      <MissionFiltersSection 
        onViewChange={setCurrentView}
      />
      {currentView === "timeline" && (
        <>
          <TimelineScroller onEraSelect={setSelectedEra} />
          <EraSelection selectedEra={selectedEra} />
        </>
      )}
      <FeaturedMission />
      {currentView === "list" && <MissionListSection />}
    </>
  );
}

export default Missionpage;
