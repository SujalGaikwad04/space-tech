import ExploreFeatures from "../components/ExploreFeatures";
import HeroSection from "../components/HeroSection";
import LearnAbout from "../components/LearnAbout";
import RealSpaceDashboard from "../components/RealSpaceDashboard";
import UpcomingEvents from "../components/UpcomingEvents";


function HomePage() {
  return (
    <>
      <HeroSection />
      <UpcomingEvents />
      <ExploreFeatures />
      <LearnAbout />
      <RealSpaceDashboard />     
      {/* next sections of homepage */}
    </>
  );
}

export default HomePage;
