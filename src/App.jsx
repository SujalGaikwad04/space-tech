import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Eventspage from "./pages/Eventspage";
import Learnpage from "./pages/Learn.page";
import Missionpage from "./pages/Missionpage";
import Weatherpage from "./pages/Weatherpage";
import Dashboardpage from "./pages/Dashboardpage";

import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/events" element={<Eventspage />} />
        <Route path="/learn" element={<Learnpage />} />
        <Route path="/mission" element={<Missionpage />} />
        <Route path="/weather" element={<Weatherpage />} />
        <Route path="/dashboard" element={<Dashboardpage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
