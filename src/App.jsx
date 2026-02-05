import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Core Pages */
import Homepage from "./pages/Homepage";
import Eventspage from "./pages/Eventspage";
import CreateEvent from "./pages/CreateEvent.page";
import CommunityEvents from "./pages/CommunityEvents.page";
import CommunityEventDetails from "./pages/CommunityEventDetails.page";
import EventDetailsPage from "./pages/EventDetailsPage";
import Missionpage from "./pages/Missionpage";
import Weatherpage from "./pages/Weatherpage";
import Dashboardpage from "./pages/Dashboardpage";
import LiveMap from "./pages/LiveMap.page";
import BlogPost from "./pages/BlogPost.page";
import SkyObjectDetail from "./pages/SkyObjectDetail.page";
import SatelliteDetail from "./pages/SatelliteDetail.page";
import EarthWeatherDetails from "./pages/EarthWeatherDetails";

/* Learning */
import Learn from "./components/learn/learn";
import WhatIf from "./components/whatif/whatif";
import Detailquiz from "./components/quiz/detailquiz";
import SolarSystem from "./components/SolarSystem/SolarSystem";

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
            <Route path="/Auth" element={<Auth />} />

            <Route path="/events" element={<Eventspage />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/community-events" element={<CommunityEvents />} />
            <Route path="/community-event/:id" element={<CommunityEventDetails />} />
            <Route path="/event-details" element={<EventDetailsPage />} />

            <Route path="/mission" element={<Missionpage />} />
            <Route path="/weather" element={<Weatherpage />} />
            <Route path="/dashboard" element={<Dashboardpage />} />
            <Route path="/live-map" element={<LiveMap />} />

            <Route path="/sky-object/:objectId" element={<SkyObjectDetail />} />
            <Route path="/satellite-impact/:topicId" element={<SatelliteDetail />} />
            <Route path="/earth-weather-details" element={<EarthWeatherDetails />} />

            {/* Learning */}
            <Route path="/learn" element={<Learn />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/whatif" element={<WhatIf />} />
            <Route path="/quiz" element={<Detailquiz />} />
            <Route path="/solar-system" element={<SolarSystem />} />
          </Routes>

          <AiChat />
          <Footer />
        </BrowserRouter>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
