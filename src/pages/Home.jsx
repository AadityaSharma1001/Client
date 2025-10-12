import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  FiUser, FiMail, FiPhone, FiMapPin,
  FiUsers, FiTrendingUp, FiCheckCircle, FiAlertCircle
} from "react-icons/fi";
import { IoMdFootball } from "react-icons/io";
import "../styles/Home.css";
import bg1 from "/bg.jpg";

const BACKEND_URL = import.meta.env.VITE_URL_BACKEND || "/api";

const SuccessScreen = ({ onClose, registrationType }) => {
  return (
    <div className="success-screen">
      <div className="success-animation">
        <div className="success-checkmark">
          <FiCheckCircle className="success-icon" />
        </div>
      </div>
      <h2 className="success-title">Successfully Pre-Registered!</h2>
      <p className="success-message">
        Welcome to VARCHAS 2025 - Where Champions Rise
      </p>
      <div className="success-details">
        <p>
          {registrationType === "team" 
            ? "Your have been successfully registered." 
            : "Your contingent has been successfully registered."}
        </p>
        <p>Check your email for confirmation details.</p>
      </div>
      <button onClick={onClose} className="success-close-btn">
        <FiCheckCircle /> Continue
      </button>
    </div>
  );
};

const HomePage = () => {
  const mountRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("team");
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [registrationType, setRegistrationType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
    sport: "",
    teamSize: "",
    contingentSize: "",
    sports: []
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [teamSizeConstraints, setTeamSizeConstraints] = useState({ min: 1, max: 100 });
  const [submissionStatus, setSubmissionStatus] = useState({ loading: false, success: false, error: null });

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
    "Table Tennis (Women Team)", "Kabaddi", "Athletics (Men)", "Athletics (Women)", 
    "Squash (Men)", "Squash (Women)", "ESports (BGMI)", "ESports (Free Fire)", "Powerlifting"
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
      teamSize: "",
      contingentSize: "",
      sports: []
    });
    setErrors({});
    setFocusedField(null);
    setTeamSizeConstraints({ min: 1, max: 100 });
    setSubmissionStatus({ loading: false, success: false, error: null });
    setShowSuccessScreen(false);
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
  }, []);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) return "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = "Invalid email format";
        break;
      case "phone":
        if (!value) return "";
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value.replace(/[\s\-+]/g, ''))) error = "Invalid phone number (10 digits required)";
        break;
      case "teamSize":
        if (!value) return "";
        const teamSize = parseInt(value);
        if (isNaN(teamSize) || teamSize < teamSizeConstraints.min || teamSize > teamSizeConstraints.max) {
          error = `Team size must be between ${teamSizeConstraints.min} and ${teamSizeConstraints.max}`;
        }
        break;
      case "contingentSize":
        if (!value) return "";
        const contingentSize = parseInt(value);
        if (isNaN(contingentSize) || contingentSize < 1) {
          error = "Contingent size must be at least 1";
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
    setFormData(prev => ({ ...prev, sport: selectedSport, teamSize: "" }));
    if (selectedSport && sportConstraints[selectedSport]) {
      setTeamSizeConstraints(sportConstraints[selectedSport]);
      setErrors(prev => ({ ...prev, teamSize: "" }));
    } else {
      setTeamSizeConstraints({ min: 1, max: 100 });
    }
  };

  const registerTeam = async (teamData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/register/team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const registerContingent = async (contingentData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/register/contingent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contingentData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form submitted!", { formData, activeTab });
    const newErrors = {};
    
    if (activeTab === "team") {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.college) newErrors.college = "College is required";
      if (!formData.sport) newErrors.sport = "Sport selection is required";
      if (!formData.teamSize) newErrors.teamSize = "Team size is required";
      if (formData.email) {
        const emailError = validateField('email', formData.email);
        if (emailError) newErrors.email = emailError;
      }
      if (formData.phone) {
        const phoneError = validateField('phone', formData.phone);
        if (phoneError) newErrors.phone = phoneError;
      }
      if (formData.teamSize) {
        const sizeError = validateField('teamSize', formData.teamSize);
        if (sizeError) newErrors.teamSize = sizeError;
      }
    } else {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.college) newErrors.college = "College is required";
      if (formData.sports.length === 0) newErrors.sports = "Select at least one sport";
      if (!formData.contingentSize) newErrors.contingentSize = "Contingent size is required";
      if (formData.email) {
        const emailError = validateField('email', formData.email);
        if (emailError) newErrors.email = emailError;
      }
      if (formData.phone) {
        const phoneError = validateField('phone', formData.phone);
        if (phoneError) newErrors.phone = phoneError;
      }
      if (formData.contingentSize) {
        const sizeError = validateField('contingentSize', formData.contingentSize);
        if (sizeError) newErrors.contingentSize = sizeError;
      }
    }
    
    console.log("Validation errors:", newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log("Form has errors, stopping submission");
      return;
    }

    console.log("Validation passed, starting submission");
    setSubmissionStatus({ loading: true, success: false, error: null });

    try {
      if (activeTab === "team") {
        const teamData = {
          name: formData.name,
          email: formData.email,
          number: formData.phone,
          college: formData.college,
          sport: formData.sport,
          teamSize: parseInt(formData.teamSize)
        };
        
        console.log("Sending team data:", teamData);
        const response = await registerTeam(teamData);
        console.log("Team registered successfully:", response);
        
        setSubmissionStatus({ 
          loading: false, 
          success: true, 
          error: null 
        });
        
        console.log("Setting success screen for team");
        setRegistrationType("team");
        setShowSuccessScreen(true);
        
      } else {
        const contingentData = {
          name: formData.name,
          email: formData.email,
          number: formData.phone,
          college: formData.college,
          sport: formData.sports,
          contingentSize: parseInt(formData.contingentSize)
        };
        
        console.log("Sending contingent data:", contingentData);
        const response = await registerContingent(contingentData);
        console.log("Contingent registered successfully:", response);
        
        setSubmissionStatus({ 
          loading: false, 
          success: true, 
          error: null 
        });
        
        console.log("Setting success screen for contingent");
        setRegistrationType("contingent");
        setShowSuccessScreen(true);
      }
      
    } catch (error) {
      console.error("Registration error:", error);
      setSubmissionStatus({ 
        loading: false, 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      });
    }
  };

  const handleCloseSuccessScreen = () => {
    setShowSuccessScreen(false);
    setShowModal(false);
    setSubmissionStatus({ loading: false, success: false, error: null });
    setFormData({
      name: "",
      email: "",
      college: "",
      phone: "",
      sport: "",
      teamSize: "",
      contingentSize: "",
      sports: []
    });
  };

  return (
    <div className="homepage">
      <div className="three_bg" ref={mountRef}></div>
      <div className="overlay"></div>
      <div className="hero" style={{ textAlign: 'center' }}>
        <header className="hero-header">
          <h1 className="hero-title">VARCHAS'25 </h1>
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
      <div className="social-icons">
        <a href="https://www.instagram.com/varchas_iitj" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link" aria-label="YouTube">
          <FaYoutube />
        </a>
        <a href="mailto:pr_varchas@iitj.ac.in" target="_blank" rel="noreferrer" className="social-link" aria-label="Email">
          <FiMail size={20} color="#FFF" />
        </a>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => !showSuccessScreen && setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {!showSuccessScreen ? (
              <>
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
                {submissionStatus.loading && (
                  <div className="status-message loading">
                    <FiAlertCircle /> Submitting registration...
                  </div>
                )}
                {submissionStatus.error && (
                  <div className="status-message error">
                    <FiAlertCircle /> {submissionStatus.error}
                  </div>
                )}

                <div className="tabs">
                  <button
                    className={`tab-btn ${activeTab === "team" ? "active" : ""}`}
                    onClick={() => setActiveTab("team")}
                  >
                    <span className="tab-text">Team/Individual</span>
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "contingent" ? "active" : ""}`}
                    onClick={() => setActiveTab("contingent")}
                  >
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
                        {errors.name && (
                          <span className="error-message">
                            <FiAlertCircle /> {errors.name}
                          </span>
                        )}
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
                          placeholder="XXXXXXXXXX"
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
                      <div className={`input-group ${focusedField === 'college' ? 'focused' : ''} ${errors.college ? 'error' : ''}`}>
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
                        {errors.college && (
                          <span className="error-message">
                            <FiAlertCircle /> {errors.college}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="form-section">
                      <h3 className="section-title">Sport Selection</h3>
                      <div className={`input-group ${focusedField === 'sport' ? 'focused' : ''} ${errors.sport ? 'error' : ''}`}>
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
                        {errors.sport && (
                          <span className="error-message">
                            <FiAlertCircle /> {errors.sport}
                          </span>
                        )}
                      </div>
                      <div className={`input-group ${focusedField === 'teamSize' ? 'focused' : ''} ${errors.teamSize ? 'error' : ''}`}>
                        <label htmlFor="team-size" className="input-label">
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
                          id="team-size"
                          name="teamSize"
                          type="number"
                          min={teamSizeConstraints.min}
                          max={teamSizeConstraints.max}
                          placeholder={formData.sport ? `Enter number of players` : "Select a sport first"}
                          required
                          className="form-input"
                          value={formData.teamSize}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('teamSize')}
                          onBlur={() => setFocusedField(null)}
                          disabled={!formData.sport}
                        />
                        {errors.teamSize && (
                          <span className="error-message">
                            <FiAlertCircle /> {errors.teamSize}
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={submissionStatus.loading}
                    >
                      <FiCheckCircle className="btn-icon" />
                      {submissionStatus.loading ? 'Submitting...' : 'Complete Pre-Registration'}
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
                      <div className={`input-group ${focusedField === 'name' ? 'focused' : ''} ${errors.name ? 'error' : ''}`}>
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
                        {errors.name && (
                          <span className="error-message">
                            <FiAlertCircle /> {errors.name}
                          </span>
                        )}
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
                      <div className={`input-group ${focusedField === 'college' ? 'focused' : ''} ${errors.college ? 'error' : ''}`}>
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
                        {errors.college && (
                          <span className="error-message">
                            <FiAlertCircle /> {errors.college}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="form-section">
                      <h3 className="section-title">Sports Selection</h3>
                      <div className="input-group">
                        <label htmlFor="sports-select" className="input-label">
                          <FiTrendingUp className="label-icon" />
                          Select Sports (Multiple)
                        </label>
                        {errors.sports && (
                          <span className="error-message">
                            <FiAlertCircle /> {errors.sports}
                          </span>
                        )}
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
                                  setErrors(prev => ({ ...prev, sports: null }));
                                }}
                              />
                              <span className="checkbox-label">{sport}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className={`input-group ${focusedField === 'contingentSize' ? 'focused' : ''} ${errors.contingentSize ? 'error' : ''}`}>
                        <label htmlFor="contingent-size-input" className="input-label">
                          <FiUsers className="label-icon" />
                          Contingent Size
                        </label>
                        <p className="helper-text">Total number of participants in your contingent</p>
                        <input
                          id="contingent-size-input"
                          name="contingentSize"
                          type="number"
                          min="1"
                          placeholder="Enter total number of participants"
                          required
                          className="form-input"
                          value={formData.contingentSize}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('contingentSize')}
                          onBlur={() => setFocusedField(null)}
                        />
                        {errors.contingentSize && (
                          <span className="error-message">
                            <FiAlertCircle /> {errors.contingentSize}
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={submissionStatus.loading}
                    >
                      <FiCheckCircle className="btn-icon" />
                      {submissionStatus.loading ? 'Submitting...' : 'Register Contingent'}
                    </button>
                    <p className="form-footer-text">
                      By registering, you agree to our terms and conditions
                    </p>
                  </form>
                )}
              </>
            ) : (
              <SuccessScreen 
                onClose={handleCloseSuccessScreen} 
                registrationType={registrationType}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
