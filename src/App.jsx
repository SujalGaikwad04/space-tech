import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Pages */
import LearnPage from "./pages/Learn.page";

/* Core Pages */
import Homepage from "./pages/Homepage";
import Eventspage from "./pages/Eventspage";
import Missionpage from "./pages/Missionpage";
import Weatherpage from "./pages/Weatherpage";
import Dashboardpage from "./pages/Dashboardpage";
import LiveMap from "./pages/LiveMap.page";
import BlogPost from "./pages/BlogPost.page";

/* Learning Section Components */
import Learn from "./components/learn/learn";
import WhatIf from "./components/whatif/whatif";
import Detailquiz from "./components/quiz/detailquiz";

/* Layout */
import Footer from "./components/Footer";
import Header from "./components/Header";
import Auth from "./components/auth/user";

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
            <Route path="/mission" element={<Missionpage />} />
            <Route path="/weather" element={<Weatherpage />} />
            <Route path="/dashboard" element={<Dashboardpage />} />
            <Route path="/live-map" element={<LiveMap />} />
            <Route path="/Auth" element={<Auth />} />


            {/* Learning routes */}
            <Route path="/learn" element={<Learn />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/whatif" element={<WhatIf />} />
            <Route path="/quiz" element={<Detailquiz />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
