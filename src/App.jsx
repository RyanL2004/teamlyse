import { useState } from "react";
import PetSelection from "./components/PetSelection";
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
function App() {
  const [selectedPet, setSelectedPet] = useState(null);

  return (
    <div>
      <Layouts>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/signin" element={<SignIn />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/petselection" element={<PetSelection />}></Route>
        <Route exact path="/features" element={<Features />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route exact path="/pricing" element={<Pricing />}></Route>
      </Routes>
      </Layouts>

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
