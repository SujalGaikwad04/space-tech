import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Pages */
import LearnPage from "./pages/Learn.page";

/* Core Pages */
import Homepage from "./pages/Homepage";
import Eventspage from "./pages/Eventspage";
import Missionpage from "./pages/Missionpage";
import Weatherpage from "./pages/Weatherpage";
import Dashboardpage from "./pages/Dashboardpage";

/* Learning Section Components */
import Learn from "./components/learn/learn";
import WhatIf from "./components/whatif/whatif";
import Detailquiz from "./components/quiz/detailquiz";

/* Layout */
import Footer from "./components/Footer";
import Header from "./components/Header";
import Auth from "./components/auth/user";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/events" element={<Eventspage />} />
        <Route path="/mission" element={<Missionpage />} />
        <Route path="/weather" element={<Weatherpage />} />
        <Route path="/dashboard" element={<Dashboardpage />} />
        <Route path="/Auth" element={<Auth />  } />
        

        {/* Learning routes */}
        <Route path="/learn" element={<Learn />} />
        <Route path="/whatif" element={<WhatIf />} />
        <Route path="/quiz" element={<Detailquiz />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
