import { useState } from "react";
import LiveCompanion from "./pages/LiveCompanion";
import Layouts from "./components/Layouts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./app/login/LoginPage";
import GetStartedPage from "./app/GetStarted/GetStartedPage";
import Home from "./components/Home";
import Features from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import MeetingsHistory from "./pages/MeetingsHistory";
import LiveMeeting from "./pages/LiveMeeting";
import UpcomingMeetings from "./pages/UpcomingMeetings";
import { SidebarProvider } from "./context/SidebarContext";
import { AnimatePresence } from "framer-motion"; //Permit smooth transition between dashboard component pages
import ChatbotUI from "./pages/ChatbotUI";
import NewFeatures from "./pages/NewFeatures";





function AnimatedRoutes({ onSelectPet }) {
  const location = useLocation(); // Detect current page




  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/live-meeting" element={<LiveMeeting />} />
        <Route exact path="/upcoming-meetings" element={<UpcomingMeetings />} />
        <Route exact path="/meetings-history" element={<MeetingsHistory />} />
        <Route exact path="/debriefing" element={<ChatbotUI />} /> 
        {/* Passing 'onSelectPet' to liveCompanion  */}
        <Route exact path="/live-companion" element={<LiveCompanion onSelectPet = {onSelectPet} />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [selectedPet, setSelectedPet] = useState(null);

  const handlePetSelection = (pet) => {
    console.log("🐾Selected pet:", pet);
    setSelectedPet(pet);

  };
  return (
    <div>
      
      <Routes>
      <Route exact path="/" element={<Layouts><Home /></Layouts>} />
      <Route exact path="/features" element={<Layouts><NewFeatures /></Layouts>} />
      <Route exact path="/pricing" element={<Layouts><Pricing /></Layouts>} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/getstarted" element={<GetStartedPage />} />
      
      </Routes>
      
      
      
      
      <SidebarProvider>
        {/* Pass 'handlePetSelection' to AnimatedRoutes */}
        <AnimatedRoutes onSelectPet = {handlePetSelection} />
      </SidebarProvider>
      

    </div>
  );
}

export default App;
