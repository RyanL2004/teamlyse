import { useState } from "react";
import LiveCompanion from "./pages/LiveCompanion";
import Layouts from "./components/Layouts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./components/Home";
import Features from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import MeetingsHistory from "./pages/MeetingsHistory";
import LiveMeeting from "./pages/LiveMeeting";
import UpcomingMeetings from "./pages/UpcomingMeetings";
import { SidebarProvider } from "./context/SidebarContext";
function App() {
  const [selectedPet, setSelectedPet] = useState(null);

  return (
    <div>
      
      <Routes>
      <Route exact path="/" element={<Layouts><Home /></Layouts>} />
      <Route exact path="/features" element={<Layouts><Features /></Layouts>} />
      <Route exact path="/pricing" element={<Layouts><Pricing /></Layouts>} />
      <Route exact path="/signin" element={<Layouts><SignIn /></Layouts>} />
      <Route exact path="/signup" element={<Layouts><SignUp /></Layouts>} />
      </Routes>
      <SidebarProvider>
      <Routes>
      <Route exact path="/dashboard" element={<Dashboard />}></Route>
      <Route exact path="/live-meeting" element={<LiveMeeting />}></Route>
      <Route exact path="/upcoming-meetings" element={<UpcomingMeetings />}></Route>
      <Route exact path="/meetings-history" element={<MeetingsHistory />}></Route>
      <Route exact path="/live-companion" element={<LiveCompanion />}></Route>
      </Routes>
      </SidebarProvider>
      

      {/*
      <PetSelection onSelectPet={setSelectedPet} />
      {selectedPet && (
        <p style={{ textAlign: "center" }}>
          Your pet, {selectedPet.name}, will assist you during meetings!
        </p>
      )}
      */}

    </div>
  );
}

export default App;
