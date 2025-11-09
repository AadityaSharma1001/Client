import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import "../styles/Navbar.css"
import { FiUser } from "react-icons/fi"
import useLocalStorage from "../hooks/useLocalStorage"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const location = useLocation()

  const [token] = useLocalStorage("token", "")
  const [uniqueId] = useLocalStorage("uniqueId", "")

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/events", label: "EVENTS" },
    { path: "/team", label: "TEAM" },
    { path: "/gallery", label: "GALLERY" },
    { path: "/map", label: "MAP" }
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname)
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0)
  }, [location.pathname])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset"
    return () => (document.body.style.overflow = "unset")
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const handleNavClick = index => {
    setActiveIndex(index)
    setIsMenuOpen(false)
  }

  const isLoggedIn = !!token && !!uniqueId

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="logo-section">
            <Link to="/" className="logo">
              <span className="logo-text">VARCHAS</span>
              <span className="logo-year">2025</span>
            </Link>
          </div>

          <div className="nav-center">
            <ul className="nav-links">
              {navItems.map((item, index) => (
                <li key={index} className={activeIndex === index ? "active" : ""}>
                  <Link to={item.path} onClick={() => handleNavClick(index)} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-right">
            {!isLoggedIn ? (
              <Link to="/register" className="cta-button">
                Register / Login
              </Link>
            ) : (
              <Link to='/profile'>
                <div className="user-info">
                  <div className="user-avatar">
                    <FiUser />
                  </div>
                  <span className="user-id">{uniqueId}</span>
                </div>
              </Link>
            )}

            <button
              className={`hamburger ${isMenuOpen ? "active" : ""}`}
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

        <div id="mobile-menu" className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="mobile-nav-links">
            {navItems.map((item, index) => (
              <li key={index} className={activeIndex === index ? "active" : ""}>
                <Link to={item.path} onClick={() => handleNavClick(index)} className="mobile-nav-link">
                  <span className="mobile-link-icon">›</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {isLoggedIn ? (
            <>
              <Link to='/profile'>
                <div className="mobile-user-info">
                  <FiUser className="mobile-user-icon" />
                  <span>{uniqueId}</span>
                </div>
              </Link>
            </>
          ) : (
            <Link to="/register" className="mobile-cta" onClick={() => setIsMenuOpen(false)}>
              Register / Login for Varchas 2025
            </Link>
          )}
        </div>
      </nav>

      <div className="navbar-spacer"></div>

      {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)} />}
    </>
  )
}

export default Navbar
