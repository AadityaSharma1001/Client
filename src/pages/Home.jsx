import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  FiUser, FiMail, FiPhone, FiMapPin,
  FiUsers, FiTrendingUp, FiCheckCircle, FiAlertCircle
} from "react-icons/fi";
import { IoMdFootball } from "react-icons/io";
import "../styles/Home.css";
import bg1 from "/Designer-1.jpeg";

const HomePage = () => {
  const mountRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("team");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
    sport: "",
    contingentSize: "",
    sports: []
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [teamSizeConstraints, setTeamSizeConstraints] = useState({ min: 1, max: 100 });

  const sportConstraints = {
    "Basketball (Men)": { min: 5, max: 12 },
    "Basketball (Women)": { min: 5, max: 12 },
    "Powerlifting": { min: 2, max: 8 },
    "Kabaddi": { min: 7, max: 12 },
    "Badminton (Men)": { min: 4, max: 5 },
    "Badminton (Women)": { min: 2, max: 3 },
    "Badminton (Mixed)": { min: 2, max: 2 },
    "Squash (Men)": { min: 3, max: 4 },
    "Squash (Women)": { min: 3, max: 4 },
    "Table Tennis (Men Singles)": { min: 1, max: 1 },
    "Table Tennis (Women Singles)": { min: 1, max: 1 },
    "Table Tennis (Men Team)": { min: 3, max: 4 },
    "Table Tennis (Women Team)": { min: 2, max: 3 },
    "Cricket": { min: 11, max: 16 },
    "Hockey": { min: 11, max: 14 },
    "Football": { min: 11, max: 16 },
    "Volleyball (Men)": { min: 6, max: 12 },
    "Volleyball (Women)": { min: 6, max: 12 },
    "Athletics (Men)": { min: 3, max: 3 },
    "Athletics (Women)": { min: 3, max: 3 },
    "ESports (BGMI)": { min: 4, max: 5 },
    "ESports (Free Fire)": { min: 4, max: 5 },
    "Chess": { min: 4, max: 5 },
    "Tennis": { min: 1, max: 4 }
  };

  const sports = [
    "Cricket", "Football", "Basketball (Men)", "Basketball (Women)", "Badminton (Men)",
    "Badminton (Women)", "Badminton (Mixed)",
    "Volleyball (Men)", "Volleyball (Women)", "Chess", "Hockey", "Tennis",
    "Table Tennis (Men Singles)", "Table Tennis (Women Singles)", "Table Tennis (Men Team)",
    "Table Tennis (Women Team)", "Kabaddi", "Athletics (Men)", "Athletics (Women)", "Squash (Men)", "Squash (Women)", "ESports (BGMI)", "ESports (Free Fire)", "Powerlifting"
  ];
  
  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(18, 10, 15, 9);
    const material = new THREE.MeshBasicMaterial({ map: loader.load(bg1) });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 5;

    const count = geometry.attributes.position.count;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);
        const anim1 = 0.25 * Math.sin(x + time * 0.7);
        const anim2 = 0.35 * Math.sin(x * 1 + time * 0.7);
        const anim3 = 0.1 * Math.sin(y * 15 + time * 0.7);
        geometry.attributes.position.setZ(i, anim1 + anim2 + anim3);
      }
      geometry.attributes.position.needsUpdate = true;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

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

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      college: "",
      phone: "",
      sport: "",
      contingentSize: "",
      sports: []
    });
    setErrors({});
    setFocusedField(null);
    setTeamSizeConstraints({ min: 1, max: 100 });
  }, [activeTab]);

  useEffect(() => {
    const targetDate = new Date("2025-11-07T00:00:00").getTime() / 1000;
    let flipdown;
    if (window.FlipDown) {
      flipdown = new window.FlipDown(targetDate, "flipdown", {
        theme: "dark",
        headings: ["Days", "Hours", "Minutes", "Seconds"],
      })
        .start()
        .ifEnded(() => console.log("Countdown finished"));
    }
    return () => {
      if (flipdown && flipdown.element) {
        clearInterval(flipdown.countdown);
        flipdown.element.innerHTML = "";
      }
    };
  }, []);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = "Invalid email format";
        break;
      case "phone":
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(value)) error = "Invalid phone number";
        break;
      case "contingentSize":
        const size = parseInt(value);
        if (isNaN(size) || size < teamSizeConstraints.min || size > teamSizeConstraints.max) {
          error = `Team size must be between ${teamSizeConstraints.min} and ${teamSizeConstraints.max}`;
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSportChange = (e) => {
    const selectedSport = e.target.value;
    setFormData(prev => ({ ...prev, sport: selectedSport, contingentSize: "" }));
    if (selectedSport && sportConstraints[selectedSport]) {
      setTeamSizeConstraints(sportConstraints[selectedSport]);
      setErrors(prev => ({ ...prev, contingentSize: "" }));
    } else {
      setTeamSizeConstraints({ min: 1, max: 100 });
    }
  };

  const handleSportsChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, sports: options }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log("Form submitted:", formData);
    setShowModal(false);
  };

  return (
    <div className="homepage">
      <div className="three_bg" ref={mountRef}></div>
      <div className="overlay"></div>
      <div className="hero" style={{ textAlign: 'center' }}>
        <header className="hero-header">
          <h1 className="hero-title">VARCHAS</h1>
          <p className="hero-subtitle">IIT Jodhpur's Annual Sports Fest</p>
        </header>
        <section className="hero-middle">
          <div id="flipdown" className="flipdown"></div>
        </section>
        <footer className="hero-bottom">
          <span className="date-badge">7th - 9th November, 2025</span>
          <button onClick={() => setShowModal(true)} className="pre-register-btn">
            Pre-Register Now
          </button>
        </footer>
      </div>
      <div className="social-icons" style={{ position: 'absolute', bottom: '20px', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <a href="https://www.instagram.com/varchas_iitj" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link" aria-label="YouTube">
          <FaYoutube />
        </a>
        <a href="mailto:pr_varchas@iitj.ac.in" target="_blank" rel="noreferrer" className="social-link" aria-label="Email">
          <FaYoutube />
        </a>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)} aria-label="Close modal">
              ✕
            </button>
            <div className="modal-header">
              <div className="modal-icon-wrapper">
                <IoMdFootball className="modal-icon" />
              </div>
              <h2 className="modal-title">Registration</h2>
              <p className="modal-subtitle">Join us for VARCHAS 2025 - Where Champions Rise</p>
              <div className="modal-divider"></div>
            </div>
            <div className="tabs">
              <button
                className={`tab-btn ${activeTab === "team" ? "active" : ""}`}
                onClick={() => setActiveTab("team")}
              >
                <span className="tab-icon">👤</span>
                <span className="tab-text">Team/Individual</span>
              </button>
              <button
                className={`tab-btn ${activeTab === "contingent" ? "active" : ""}`}
                onClick={() => setActiveTab("contingent")}
              >
                <span className="tab-icon">🎯</span>
                <span className="tab-text">Contingent</span>
              </button>
            </div>
            {activeTab === "team" && (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3 className="section-title">Team / Individual Information</h3>
                  <div className={`input-group ${focusedField === 'name' ? 'focused' : ''} ${errors.name ? 'error' : ''}`}>
                    <label htmlFor="name" className="input-label">
                      <FiUser className="label-icon" />
                      Full Name / Leader's Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name/ leader's name"
                      required
                      className="form-input"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className={`input-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''}`}>
                    <label htmlFor="email" className="input-label">
                      <FiMail className="label-icon" />
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter Email Address"
                      required
                      className="form-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.email && (
                      <span className="error-message">
                        <FiAlertCircle /> {errors.email}
                      </span>
                    )}
                  </div>
                  <div className={`input-group ${focusedField === 'phone' ? 'focused' : ''} ${errors.phone ? 'error' : ''}`}>
                    <label htmlFor="phone" className="input-label">
                      <FiPhone className="label-icon" />
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="form-input"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.phone && (
                      <span className="error-message">
                        <FiAlertCircle /> {errors.phone}
                      </span>
                    )}
                  </div>
                  <div className={`input-group ${focusedField === 'college' ? 'focused' : ''}`}>
                    <label htmlFor="college" className="input-label">
                      <FiMapPin className="label-icon" />
                      College/University Name
                    </label>
                    <input
                      id="college"
                      name="college"
                      type="text"
                      placeholder="Enter your institution name"
                      required
                      className="form-input"
                      value={formData.college}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('college')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>
                <div className="form-section">
                  <h3 className="section-title">Sport Selection</h3>
                  <div className={`input-group ${focusedField === 'sport' ? 'focused' : ''}`}>
                    <label htmlFor="sport" className="input-label">
                      <FiTrendingUp className="label-icon" />
                      Choose Your Sport
                    </label>
                    <p className="helper-text">Note: In athletics a player cannot participate in more than 3 events.</p>
                    <select
                      id="sport"
                      name="sport"
                      required
                      className="form-input"
                      value={formData.sport}
                      onChange={handleSportChange}
                      onFocus={() => setFocusedField('sport')}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="">Select a sport</option>
                      {sports.map(sport => (
                        <option key={sport} value={sport}>{sport}</option>
                      ))}
                    </select>
                  </div>
                  <div className={`input-group ${focusedField === 'contingentSize' ? 'focused' : ''} ${errors.contingentSize ? 'error' : ''}`}>
                    <label htmlFor="contingent-size" className="input-label">
                      <FiUsers className="label-icon" />
                      Team Size
                    </label>
                    {formData.sport && (
                      <p className="helper-text constraint-info">
                        Required team size: {teamSizeConstraints.min === teamSizeConstraints.max
                          ? `${teamSizeConstraints.min} player${teamSizeConstraints.min > 1 ? 's' : ''}`
                          : `${teamSizeConstraints.min}-${teamSizeConstraints.max} players`}
                      </p>
                    )}
                    <input
                      id="contingent-size"
                      name="contingentSize"
                      type="number"
                      min={teamSizeConstraints.min}
                      max={teamSizeConstraints.max}
                      placeholder={formData.sport ? `Enter number of players` : "Select a sport first"}
                      required
                      className="form-input"
                      value={formData.contingentSize}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('contingentSize')}
                      onBlur={() => setFocusedField(null)}
                      disabled={!formData.sport}
                    />
                    {errors.contingentSize && (
                      <span className="error-message">
                        <FiAlertCircle /> {errors.contingentSize}
                      </span>
                    )}
                  </div>
                </div>
                <button type="submit" className="submit-btn">
                  <FiCheckCircle className="btn-icon" />
                  Complete Pre-Registration
                </button>
                <p className="form-footer-text">
                  By registering, you agree to our terms and conditions
                </p>
              </form>
            )}
            {activeTab === "contingent" && (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3 className="section-title">Contingent Leader Details</h3>
                  <div className={`input-group ${focusedField === 'name' ? 'focused' : ''}`}>
                    <label htmlFor="contingent-name" className="input-label">
                      <FiUsers className="label-icon" />
                      Contingent Leader's Name
                    </label>
                    <input
                      id="contingent-name"
                      name="name"
                      type="text"
                      placeholder="Enter leader's full name"
                      required
                      className="form-input"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className={`input-group ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''}`}>
                    <label htmlFor="contingent-email" className="input-label">
                      <FiMail className="label-icon" />
                      Email Address
                    </label>
                    <input
                      id="contingent-email"
                      name="email"
                      type="email"
                      placeholder="Enter leader's email address"
                      required
                      className="form-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.email && (
                      <span className="error-message">
                        <FiAlertCircle /> {errors.email}
                      </span>
                    )}
                  </div>
                  <div className={`input-group ${focusedField === 'phone' ? 'focused' : ''} ${errors.phone ? 'error' : ''}`}>
                    <label htmlFor="contingent-phone" className="input-label">
                      <FiPhone className="label-icon" />
                      Phone Number
                    </label>
                    <input
                      id="contingent-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="form-input"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.phone && (
                      <span className="error-message">
                        <FiAlertCircle /> {errors.phone}
                      </span>
                    )}
                  </div>
                  <div className={`input-group ${focusedField === 'college' ? 'focused' : ''}`}>
                    <label htmlFor="contingent-college" className="input-label">
                      <FiMapPin className="label-icon" />
                      College/University Name
                    </label>
                    <input
                      id="contingent-college"
                      name="college"
                      type="text"
                      placeholder="Enter institution name"
                      required
                      className="form-input"
                      value={formData.college}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('college')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>
                <div className="form-section">
                  <h3 className="section-title">Sports Selection</h3>
                  <div className="input-group">
                    <label htmlFor="sports-select" className="input-label">
                      <FiTrendingUp className="label-icon" />
                      Select Sports (Multiple)
                    </label>
                    <div className="sports-grid">
                      {sports.map(sport => (
                        <label key={sport} className="sport-checkbox">
                          <input
                            type="checkbox"
                            value={sport}
                            checked={formData.sports.includes(sport)}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFormData(prev => ({
                                ...prev,
                                sports: e.target.checked
                                  ? [...prev.sports, value]
                                  : prev.sports.filter(s => s !== value)
                              }));
                            }}
                          />
                          <span className="checkbox-label">{sport}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <button type="submit" className="submit-btn">
                  <FiCheckCircle className="btn-icon" />
                  Register Contingent
                </button>
                <p className="form-footer-text">
                  By registering, you agree to our terms and conditions
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;