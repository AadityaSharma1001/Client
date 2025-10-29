import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/gallery.jsx";
import Events from "./pages/Events.jsx";
import Team from "./pages/team.jsx";
import Navbar from "./components/Navbar.jsx";
import useSessionStorage from "./hooks/useSessionStorage.jsx";
import Discount from "./pages/discount.jsx";
import Referee from "./pages/Referee.jsx";
import Map from "./pages/Map.jsx";
import UserRegister from "./pages/Register.jsx";
import "./index.css";

function AppContent({ showNavbar, setShowNavbar }) {
  const location = useLocation();

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home setShowNavbar={setShowNavbar} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/team" element={<Team />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/referee" element={<Referee />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
}

function App() {
  const [hasLoaded] = useSessionStorage("hasLoaded", false);
  const [showNavbar, setShowNavbar] = useState(hasLoaded);

  return (
    <Router>
      <AppContent showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
    </Router>
  );
}

export default App;