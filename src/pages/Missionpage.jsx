import React, { useState } from "react";
import MissionHero from "../components/Missions/MissionHero";
import MissionFiltersSection from "../components/Missions/MissionFiltersSection";
import TimelineScroller from "../components/Missions/TimelineScroller";
import CountdownWidget from "../components/Missions/CountdownWidget";
import LiveCraftTracking from "../components/Missions/LiveCraftTracking";
import LiveStreamWidget from "../components/Missions/LiveStreamWidget";
import MissionStatsWidget from "../components/Missions/MissionStatsWidget";
import FeaturedSpacecraft from "../components/Missions/FeaturedSpacecraft";
import HistoricalMissionsList from "../components/Missions/HistoricalMissionsList";
import UpcomingMissionsList from "../components/Missions/UpcomingMissionsList";
import './Missionpage.css';

function Missionpage() {
  const [selectedEra, setSelectedEra] = useState("2020s");
  const [activeView, setActiveView] = useState("timeline");

  return (
    <>
      {/* Global Background */}
      <img
        src="/backgrounds/abstract-horizon.png"
        alt="Abstract planet horizon"
        className="home-bg"
      />

      {/* Hero Section */}
      <MissionHero />

      {/* Filter Tabs */}
      <MissionFiltersSection onViewChange={setActiveView} />

      {/* Timeline View */}
      {activeView === "timeline" && (
        <>
          <TimelineScroller onEraSelect={setSelectedEra} />
          <HistoricalMissionsList selectedEra={selectedEra} />

          {/* Stats Widgets Only */}
          <div className="missions-stats-row">
            <CountdownWidget />
            <MissionStatsWidget />
          </div>
        </>
      )}

      {/* Upcoming Missions View */}
      {activeView === "upcoming" && (
        <div className="missions-single-view">
          <UpcomingMissionsList />
        </div>
      )}

      {/* Live Craft Tracking View */}
      {activeView === "tracking" && (
        <div className="missions-single-view">
          <LiveCraftTracking />
        </div>
      )}

      {/* Live Stream View */}
      {activeView === "stream" && (
        <div className="missions-single-view">
          <LiveStreamWidget />
        </div>
      )}

      {/* 3D Model View */}
      {activeView === "model" && (
        <div className="missions-single-view">
          <FeaturedSpacecraft />
        </div>
      )}
    </>
  );
}

export default Missionpage;
