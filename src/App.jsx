import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import Home from "./pages/Home.jsx";
import Gallery from "./pages/gallery.jsx";
import Events from "./pages/Events.jsx";
import Team from "./pages/team.jsx";
import Navbar from "./components/Navbar.jsx";
import useSessionStorage from "./hooks/useSessionStorage.jsx";
import Discount from "./pages/discount.jsx";
import Referee from "./pages/Referee.jsx";
import UserLogin from "./pages/Login.jsx";
import UserProfile from "./pages/Profile.jsx";
import Map from "./pages/Map.jsx";
import ProtectedRoute from "./hooks/protectedRoute.jsx";
import UserRegister from "./pages/Register.jsx";
import Payment from "./pages/Payment.jsx";
import Pronite from "./pages/Pronite.jsx";
import "./index.css";

function AppContent({ showNavbar, setShowNavbar }) {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname]);

  return (
    <>
      <Analytics />
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home setShowNavbar={setShowNavbar} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/team" element={<Team />} />
        <Route path="/referee" element={<Referee />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/map" element={<Map />} />
        {/* <Route path="/pronite" element={<Pronite />} /> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
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