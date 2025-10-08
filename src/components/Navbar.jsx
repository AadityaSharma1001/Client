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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (index) => {
    setActiveIndex(index);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container">
          <div className="logo-section">
            <Link to="/" className="logo" aria-label="VARCHAS 2025 Home">
              <span className="logo-text">VARCHAS</span>
              <span className="logo-year">2025</span>
            </Link>
          </div>

          <div className="nav-center">
            <ul className="nav-links" role="menubar">
              {navItems.map((item, index) => (
                <li 
                  key={index} 
                  className={activeIndex === index ? 'active' : ''}
                  role="none"
                >
                  <Link 
                    to={item.path}
                    onClick={() => handleNavClick(index)}
                    className="nav-link"
                    role="menuitem"
                    aria-current={activeIndex === index ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-right">
            <Link to="/register" className="cta-button" aria-label="Register for VARCHAS 2025">
              Register
            </Link>

            <button 
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <div 
          id="mobile-menu"
          className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="mobile-nav-links" role="menu">
            {navItems.map((item, index) => (
              <li 
                key={index} 
                className={activeIndex === index ? 'active' : ''}
                role="none"
              >
                <Link 
                  to={item.path}
                  onClick={() => handleNavClick(index)}
                  className="mobile-nav-link"
                  role="menuitem"
                  tabIndex={isMenuOpen ? 0 : -1}
                  aria-current={activeIndex === index ? 'page' : undefined}
                >
                  <span className="mobile-link-icon">›</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            to="/register" 
            className="mobile-cta"
            tabIndex={isMenuOpen ? 0 : -1}
            onClick={() => setIsMenuOpen(false)}
          >
            Register for Varchas 2025
          </Link>
        </div>
      </nav>

      <div className="navbar-spacer"></div>
      
      {isMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
