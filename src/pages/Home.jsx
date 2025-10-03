import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { BsHourglassSplit, BsClock, BsStopwatch, BsAlarm } from "react-icons/bs";
import "../styles/Home.css";

const HomePage = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("team");

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date("2025-11-07T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ expired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">
      <div className="overlay"></div>

      {/* Hero */}
      <div className="hero">
        <header>
          <h2 className="hero-title">VARCHAS</h2>
          <p className="hero-subtitle">IIT Jodhpur's Annual Sports Fest</p>
        </header>

        {/* Countdown */}
        <section className="hero-middle">
          <div className="countdown">
            {timeLeft.expired ? (
              <p className="expired">Event Started!</p>
            ) : (
              <>
                <div className="countdown-item">
                  <BsHourglassSplit className="countdown-icon" />
                  <div className="countdown-number">{timeLeft.days || 0}</div>
                  <p className="countdown-label">Days</p>
                </div>
                <div className="countdown-item">
                  <BsClock className="countdown-icon" />
                  <div className="countdown-number">{timeLeft.hours || 0}</div>
                  <p className="countdown-label">Hours</p>
                </div>
                <div className="countdown-item">
                  <BsStopwatch className="countdown-icon" />
                  <div className="countdown-number">{timeLeft.minutes || 0}</div>
                  <p className="countdown-label">Minutes</p>
                </div>
                <div className="countdown-item">
                  <BsAlarm className="countdown-icon" />
                  <div className="countdown-number">{timeLeft.seconds || 0}</div>
                  <p className="countdown-label">Seconds</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Date + Register Button */}
        <footer className="hero-bottom">
          <span className="date-badge">7th – 9th November, 2025</span>
          <button onClick={() => setShowModal(true)} className="pre-register-btn">
            Pre-Register Now
          </button>
        </footer>
      </div>

      {/* Social Links */}
      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link">
          <FaTwitter />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link">
          <FaYoutube />
        </a>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✕
            </button>

            <div className="modal-header">
              <h3 className="modal-title">Registration</h3>
              <p className="modal-subtitle">Join us for VARCHAS 2025</p>
            </div>

            {/* Tabs */}
            <div className="tabs">
              <button
                className={`tab-btn ${activeTab === "team" ? "active" : ""}`}
                onClick={() => setActiveTab("team")}
              >
                👥 Team
              </button>
              <button
                className={`tab-btn ${activeTab === "contingent" ? "active" : ""}`}
                onClick={() => setActiveTab("contingent")}
              >
                🏆 Contingent
              </button>
            </div>

            {/* Team Form */}
            {activeTab === "team" && (
              <form className="form">
                <input type="text" placeholder="Full Name" required className="form-input" />
                <input type="email" placeholder="Email Address" required className="form-input" />
                <input type="text" placeholder="College Name" required className="form-input" />
                <input type="tel" placeholder="Phone Number" required className="form-input" />
                <select required className="form-input">
                  <option value="">Select Sport</option>
                  <option>Cricket</option>
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Badminton</option>
                  <option>Volleyball</option>
                </select>
                <button type="submit" className="submit-btn">
                  Register Now
                </button>
              </form>
            )}

            {/* Contingent Form */}
            {activeTab === "contingent" && (
              <form className="form">
                <input type="text" placeholder="Contingent Leader Name" required className="form-input" />
                <input type="email" placeholder="Email Address" required className="form-input" />
                <input type="text" placeholder="College Name" required className="form-input" />
                <input type="tel" placeholder="Phone Number" required className="form-input" />
                <label className="select-label">Select Sports (Hold Ctrl/Cmd for multiple)</label>
                <select multiple required className="form-input multi-select">
                  <option>Cricket</option>
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Badminton</option>
                  <option>Volleyball</option>
                </select>
                <button type="submit" className="submit-btn">
                  Register Contingent
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
