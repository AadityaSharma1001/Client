import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/events", label: "EVENTS" },
    { path: "/gallery", label: "GALLERY" },
    { path: "/sponsors", label: "SPONSORS" },
    { path: "/contact", label: "CONTACT" }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active index based on current route
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname);
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (index) => {
    setActiveIndex(index);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="logo-section">
            <Link to="/" className="logo">
              <span className="logo-text">VARCHAS</span>
              <span className="logo-year">2025</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-center">
            <ul className="nav-links">
              {navItems.map((item, index) => (
                <li key={index} className={activeIndex === index ? 'active' : ''}>
                  <Link 
                    to={item.path}
                    onClick={() => handleNavClick(index)}
                    className="nav-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="nav-right">
            <button className="cta-button">
              Register
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            {navItems.map((item, index) => (
              <li key={index} className={activeIndex === index ? 'active' : ''}>
                <Link 
                  to={item.path}
                  onClick={() => handleNavClick(index)}
                  className="mobile-nav-link"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="mobile-cta">Register for Varchas 2025</button>
        </div>
      </nav>

      <div className="navbar-spacer"></div>
      {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default Navbar;
