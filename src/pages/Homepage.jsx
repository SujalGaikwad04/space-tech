import ParticleBackground from "../components/Home/ParticleBackground";
import AnimatedHero from "../components/Home/AnimatedHero";

import UpcomingEvents from "../components/Home/UpcomingEvents";
import ExploreFeatures from "../components/Home/ExploreFeatures";
import LearnAbout from "../components/Home/LearnAbout";
import RealSpaceDashboard from "../components/Home/RealSpaceDashboard";
import './Homepage.css';

function HomePage() {
  return (
    <div className="parallax-homepage">
      <ParticleBackground />
      <AnimatedHero />

      <UpcomingEvents />
      <ExploreFeatures />
      <LearnAbout />
      <RealSpaceDashboard />
    </div>
  );
}

export default HomePage;
