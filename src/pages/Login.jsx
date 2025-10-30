import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from "react-icons/fi"
import '../styles/Register.css'
import Particles from '../components/Particles'
import useLocalStorage from '../hooks/useLocalStorage'


const UserLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: "", success: false })
  const [uniqueId, setUniqueId] = useLocalStorage("uniqueId", "")
  const [token, setToken] = useLocalStorage("token", "")
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()


  const validate = (name, value) => {
    let error = ""
    if (name === "email") {
      if (!value.trim()) error = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format"
    } else if (name === "password") {
      if (!value.trim()) error = "Password is required"
      else if (value.length < 6) error = "At least 6 characters required"
    }
    return error
  }


  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
  }


  const handleLogin = async e => {
    e.preventDefault()
    const newErrors = {}
    Object.keys(form).forEach(k => {
      const err = validate(k, form[k])
      if (err) newErrors[k] = err
    })
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return


    try {
      const res = await fetch(`${backendUrl}/account/userlogin/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.profile_required === true) {
        setPopup({ show: true, message: "Complete your profile...", success: true })
        setTimeout(() => {
          navigate("/register", {
            state: {
              email: form.email,
              skipStep1: true
            }
          })
        }, 1000)
      }
      else if ((res.status === 200 || res.status === 201) && data.message?.toLowerCase().includes("success")) {
        if (data.uniqueId) setUniqueId(data.uniqueId)
        if (data.access_token) setToken(data.access_token)
        setPopup({ show: true, message: "Login Successful!", success: true })
        setTimeout(() => window.location.href = "/", 2000)
      } else {
        setPopup({ show: true, message: data.message || "Invalid credentials", success: false })
      }
    } catch {
      setPopup({ show: true, message: "Network error", success: false })
    } finally {
      setTimeout(() => setPopup({ show: false, message: "", success: false }), 2500)
    }
  }


  return (
    <div className="registration-page">
      <div className="particles-background">
        <Particles particleColors={['#d4af37', '#b78f28']} particleCount={4000} speed={0.1} />
      </div>


      <div className="registration-content">
        <div className="form-card">
          <h1 className="form-title">User Login</h1>
          <form onSubmit={handleLogin} className="form">
            <div className={`input-group ${errors.email ? 'error' : ''}`}>
              <label><FiMail className="label-icon" /> Email</label>
              <input type="email" name="email" placeholder="Enter your email"
                value={form.email} onChange={handleChange} className="form-input" />
              {errors.email && <span className="error-message"><FiAlertCircle /> {errors.email}</span>}
            </div>


            <div className={`input-group ${errors.password ? 'error' : ''}`}>
              <label><FiLock className="label-icon" /> Password</label>
              <div className="password-wrapper">
                <input type={showPass ? "text" : "password"} name="password"
                  placeholder="Enter password" value={form.password}
                  onChange={handleChange} className="form-input" />
                <span onClick={() => setShowPass(!showPass)} className="eye-icon">
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              {errors.password && <span className="error-message"><FiAlertCircle /> {errors.password}</span>}
            </div>


            <button type="submit" className="submit-btn"><FiCheckCircle /> Login</button>


            <p className="login-redirect">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>


      {popup.show && (
        <div className={`popup ${popup.success ? 'success' : 'error'}`}>
          {popup.success ? '✅' : '❌'} {popup.message}
        </div>
      )}
    </div>
  )
}


export default UserLogin