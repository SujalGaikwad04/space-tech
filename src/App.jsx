import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Pages */
import Homepage from "./pages/Homepage";
import Eventspage from "./pages/Eventspage";
import EventDetailsPage from "./pages/EventDetailsPage";
import Missionpage from "./pages/Missionpage";
import Weatherpage from "./pages/Weatherpage";
import Dashboardpage from "./pages/Dashboardpage";
import LiveMap from "./pages/LiveMap.page.jsx";
import BlogPost from "./pages/BlogPost.page.jsx";
import CreateBlog from "./pages/CreateBlog.page.jsx";
import CreateEvent from "./pages/CreateEvent.page.jsx";
import CommunityEvents from "./pages/CommunityEvents.page.jsx";
import CommunityEventDetails from "./pages/CommunityEventDetails.page.jsx";
import SkyObjectDetail from "./pages/SkyObjectDetail.page.jsx";
import SatelliteDetail from "./pages/SatelliteDetail.page.jsx";
import EarthWeatherDetails from "./pages/EarthWeatherDetails";
import MissionDetails from "./pages/MissionDetails.page.jsx";
import Learn from "./components/learn/learn.jsx";
import Quiz from "./components/quiz/quiz.jsx";
import WhatIf from "./components/whatif/whatif.jsx";
import SolarSystem from "./components/SolarSystem/SolarSystem.jsx";
import AuroraView from "./pages/AuroraView";

/* Auth */
import Auth from "./components/auth/user";

/* Layout */
import Header from "./components/Header";
import Footer from "./components/Footer";
import AiChat from "./components/AiChat/AiChat";

/* Context */
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/events" element={<Eventspage />} />
            <Route path="/event-details" element={<EventDetailsPage />} />
            <Route path="/mission" element={<Missionpage />} />
            <Route path="/mission-details/:missionId" element={<MissionDetails />} />
            <Route path="/weather" element={<Weatherpage />} />
            <Route path="/dashboard" element={<Dashboardpage />} />
            <Route path="/live-map" element={<LiveMap />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/whatif" element={<WhatIf />} />
            <Route path="/solar-system" element={<SolarSystem />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/community-events" element={<CommunityEvents />} />
            <Route path="/community-event/:id" element={<CommunityEventDetails />} />
            <Route path="/sky-object/:objectId" element={<SkyObjectDetail />} />
            <Route path="/satellite/:topicId" element={<SatelliteDetail />} />
            <Route path="/satellite/:topicId" element={<SatelliteDetail />} />
            <Route path="/earth-weather-details" element={<EarthWeatherDetails />} />
            <Route path="/aurora-view" element={<AuroraView />} />

            {/* 🔐 AUTH ROUTE */}
            <Route path="/auth" element={<Auth />} />
          </Routes>

          <AiChat />
          <Footer />
        </BrowserRouter>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
