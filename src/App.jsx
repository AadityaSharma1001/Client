import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import Events from "./pages/events";
import Team from "./pages/team";
import Navbar from "./components/Navbar";
import useSessionStorage from "./hooks/useSessionStorage";
import Discount from "./pages/discount";
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