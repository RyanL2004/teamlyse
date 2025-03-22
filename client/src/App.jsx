import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import Home from "./components/Home";
import NewFeatures from "./pages/NewFeatures";
import Pricing from "./pages/Pricing";
import LoginPage from "./app/login/LoginPage";
import GetStartedPage from "./app/GetStarted/GetStartedPage";
import Dashboard from "./pages/Dashboard";
import ChatbotUI from "./pages/ChatbotUI";
import UserProvider from "./context/UserProvider";
import MyCalendar from "./components/dashboard-component/MyCalendar";
import MyHistory from "./components/dashboard-component/MyHistory";
import CompanionSelection from "./components/dashboard-component/AICompanionSelection";

function App() {
  return (
    <UserProvider>
      {/* Define your routes for public pages */}
      <Routes>
        <Route
          path="/"
          element={
            <Layouts>
              <Home />
            </Layouts>
          }
        />
        <Route path="/features" element={<Layouts><NewFeatures /></Layouts>}/>
        <Route path="/pricing" element={ <Layouts><Pricing /></Layouts>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/getstarted" element={<GetStartedPage />} />

        {/* Define routes for authenticated parts of your app */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/debriefing" element={<ChatbotUI />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/history" element={<MyHistory />} />
        <Route path="/companion" element={<CompanionSelection />} />
        
        {/* Remove pet selection related routes if not needed */}
      </Routes>
    </UserProvider>
  );
}

export default App;
