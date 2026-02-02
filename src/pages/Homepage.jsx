import ExploreFeatures from "../components/Home/ExploreFeatures";
import HeroSection from "../components/Home//HeroSection";
import LearnAbout from "../components/Home/LearnAbout";
import RealSpaceDashboard from "../components/Home/RealSpaceDashboard";
import UpcomingEvents from "../components/Home/UpcomingEvents";


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
