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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted");
    setShowModal(false);
  };

  return (
    <div className="homepage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="overlay"></div>

      <div className="hero" style={{ textAlign: 'center' }}>
        <header className="hero-header">
          <h1 className="hero-title">VARCHAS</h1>
          <p className="hero-subtitle">IIT Jodhpur's Annual Sports Fest</p>
        </header>

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

        <footer className="hero-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <span className="date-badge">7th - 9th November, 2025</span>
          <button onClick={() => setShowModal(true)} className="pre-register-btn">
            Pre-Register Now
          </button>
        </footer>
      </div>

      <div className="social-icons" style={{ position: 'absolute', bottom: '20px', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)} aria-label="Close modal">
              ✕
            </button>

            <div className="modal-header" style={{ textAlign: 'center' }}>
              <h2 className="modal-title">Registration</h2>
              <p className="modal-subtitle">Join us for VARCHAS 2025</p>
            </div>

            <div className="tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                className={`tab-btn ${activeTab === "team" ? "active" : ""}`}
                onClick={() => setActiveTab("team")}
              >
                <span className="tab-icon">👥</span>
                <span className="tab-text">Team</span>
              </button>
              <button
                className={`tab-btn ${activeTab === "contingent" ? "active" : ""}`}
                onClick={() => setActiveTab("contingent")}
              >
                <span className="tab-icon">🏆</span>
                <span className="tab-text">Contingent</span>
              </button>
            </div>

            {activeTab === "team" && (
              <form className="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

            {activeTab === "contingent" && (
              <form className="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
