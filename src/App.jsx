import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import HomePage from "./pages/Homepage.jsx";
import Eventspage from "./pages/Eventspage.jsx";
import Learnpage from "./pages/Learn.page.jsx";
import Missionpage from "./pages/Missionpage.jsx";
import Weatherpage from "./pages/Weatherpage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<Eventspage />} />
        <Route path="/learn" element={<Learnpage />} />
        <Route path="/mission" element={<Missionpage />} />
        <Route path="/weather" element={<Weatherpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
