import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiTrendingUp, FiCreditCard, FiHash, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import '../styles/Referee.css';
import Particles from '../components/Particles';

const sports = [
  "Cricket", "Football", "Basketball", "Badminton", "Volleyball",
  "Chess", "Hockey", "Table Tennis", "Kabaddi", "Athletics",
  "Squash", "ESports", "Powerlifting"
];

const Referee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sport: "",
    account_holder_name: "",
    ifsc_code: "",
    bank_account_number: ""
  });
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ show: false, message: "", success: false });

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 3) error = "Name must be at least 3 characters";
        else if (!/^[a-zA-Z\s.]+$/.test(value)) error = "Name can only contain letters and spaces";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{10}$/.test(value.replace(/\D/g, ""))) error = "Enter a valid 10-digit number";
        break;
      case "sport":
        if (!value.trim()) error = "Please select a sport";
        break;
      case "account_holder_name":
        if (!value.trim()) error = "Account holder name is required";
        else if (!/^[a-zA-Z\s.]+$/.test(value)) error = "Only letters and spaces allowed";
        break;
      case "ifsc_code":
        if (!value.trim()) error = "IFSC code is required";
        else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.trim().toUpperCase())) error = "Invalid IFSC format (e.g., SBIN0001234)";
        break;
      case "bank_account_number":
        if (!value.trim()) error = "Bank account number is required";
        else if (!/^\d{9,18}$/.test(value.trim())) error = "Account number must be 9–18 digits";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${backendUrl}/referees/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) {
        setPopup({ show: true, message: "Registration Successful, our PR team will contact you soon!", success: true });
        setFormData({
          name: "",
          email: "",
          phone: "",
          sport: "",
          account_holder_name: "",
          ifsc_code: "",
          bank_account_number: ""
        });
      } else {
        setPopup({ show: true, message: "Registration Failed. Please try again.", success: false });
      }
    } catch {
      setPopup({ show: true, message: "Network Error. Try again later.", success: false });
    } finally {
      setTimeout(() => setPopup({ show: false, message: "", success: false }), 2500);
    }
  };

  return (
    <div className="registration-page">
      <div className="particles-background">
        <Particles particleColors={['#d4af37', '#b78f28']} particleCount={4000} speed={0.1} />
      </div>

      <div className="registration-content">
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">Referee Registration</h1>
            <p className="form-subtitle">
              Join VARCHAS'25 as an official referee — earn, experience, and be part of the excitement at IIT Jodhpur!
            </p>
            <hr className="form-divider" />
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className={`input-group ${errors.name ? 'error' : ''}`}>
              <label className="input-label"><FiUser className="label-icon" /> Full Name</label>
              <input name="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} className="form-input" />
              {errors.name && <span className="error-message"><FiAlertCircle /> {errors.name}</span>}
            </div>

            <div className={`input-group ${errors.email ? 'error' : ''}`}>
              <label className="input-label"><FiMail className="label-icon" /> Email Address</label>
              <input name="email" type="email" placeholder="Enter a valid email address" value={formData.email} onChange={handleInputChange} className="form-input" />
              {errors.email && <span className="error-message"><FiAlertCircle /> {errors.email}</span>}
            </div>

            <div className={`input-group ${errors.phone ? 'error' : ''}`}>
              <label className="input-label"><FiPhone className="label-icon" /> Phone Number</label>
              <input name="phone" type="tel" placeholder="Enter a 10-digit phone number" value={formData.phone} onChange={handleInputChange} className="form-input" />
              {errors.phone && <span className="error-message"><FiAlertCircle /> {errors.phone}</span>}
            </div>

            <div className={`input-group ${errors.sport ? 'error' : ''}`}>
              <label className="input-label"><FiTrendingUp className="label-icon" /> Choose Sport</label>
              <select name="sport" value={formData.sport} onChange={handleInputChange} className="form-input">
                <option value="">Select a sport...</option>
                {sports.map((sport, index) => (
                  <option key={index} value={sport}>{sport}</option>
                ))}
              </select>
              {errors.sport && <span className="error-message"><FiAlertCircle /> {errors.sport}</span>}
            </div>

            <div className={`input-group ${errors.account_holder_name ? 'error' : ''}`}>
              <label className="input-label"><FiUser className="label-icon" /> Account Holder Name</label>
              <input name="account_holder_name" type="text" placeholder="As per bank records" value={formData.account_holder_name} onChange={handleInputChange} className="form-input" />
              {errors.account_holder_name && <span className="error-message"><FiAlertCircle /> {errors.account_holder_name}</span>}
            </div>

            <div className={`input-group ${errors.ifsc_code ? 'error' : ''}`}>
              <label className="input-label"><FiHash className="label-icon" /> IFSC Code</label>
              <input name="ifsc_code" type="text" placeholder="e.g. SBIN0001234" value={formData.ifsc_code} onChange={handleInputChange} className="form-input" />
              {errors.ifsc_code && <span className="error-message"><FiAlertCircle /> {errors.ifsc_code}</span>}
            </div>

            <div className={`input-group ${errors.bank_account_number ? 'error' : ''}`}>
              <label className="input-label"><FiCreditCard className="label-icon" /> Bank Account Number</label>
              <input name="bank_account_number" type="text" placeholder="Enter bank account number" value={formData.bank_account_number} onChange={handleInputChange} className="form-input" />
              {errors.bank_account_number && <span className="error-message"><FiAlertCircle /> {errors.bank_account_number}</span>}
            </div>

            <button type="submit" className="submit-btn">
              <FiCheckCircle /> Register as Referee
            </button>
            
            <div className="verification-section">
              <a
                className="verify-button"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfK-MDeVnOrkhx9bYlOypCcoCTzKjc6an72q3B4CrW-YtOV4A/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify Referees
              </a>
              <p className="mandatory-note">
                Verification via the above form is mandatory.
              </p>
            </div>
          </form>
        </div>
      </div>

      {popup.show && (
        <div className={`popup ${popup.success ? 'success' : 'error'}`}>
          {popup.success ? '✅' : '❌'} {popup.message}
        </div>
      )}
    </div>
  );
};

export default Referee;