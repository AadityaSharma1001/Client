import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiTrendingUp, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import '../styles/Referee.css';
import Particles from '../components/Particles';

const sports = [
    "Cricket", "Football", "Basketball", "Badminton", "Volleyball",
    "Chess", "Hockey", "Table Tennis", "Kabaddi", "Athletics", "Squash",
    "ESports", "Powerlifting"
];

const Referee = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        sport: ""
    });
    const [errors, setErrors] = useState({});

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
        // setLoading(true);
        // setMessage("");

        try {
            const res = await fetch("http://34.131.104.193:5000/referee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to register referee.");

            // setMessage("✅ Registration successful!");
            setFormData({ name: "", email: "", phone: "", sport: "" });
        } catch (err) {
            // setMessage("❌ Error: " + err.message);
        } finally {
            // setLoading(false);
        }
    };

    return (
        <div className="registration-page">
            <div className="particles-background">
                <Particles
                    particleColors={['#d4af37', '#b78f28']}
                    particleCount={4000}
                    speed={0.1}
                />
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
                            <label htmlFor="name" className="input-label">
                                <FiUser className="label-icon" />
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            {errors.name && (
                                <span className="error-message"><FiAlertCircle /> {errors.name}</span>
                            )}
                        </div>

                        <div className={`input-group ${errors.email ? 'error' : ''}`}>
                            <label htmlFor="email" className="input-label">
                                <FiMail className="label-icon" />
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter a valid email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            {errors.email && (
                                <span className="error-message"><FiAlertCircle /> {errors.email}</span>
                            )}
                        </div>

                        <div className={`input-group ${errors.phone ? 'error' : ''}`}>
                            <label htmlFor="phone" className="input-label">
                                <FiPhone className="label-icon" />
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter a 10-digit phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            {errors.phone && (
                                <span className="error-message"><FiAlertCircle /> {errors.phone}</span>
                            )}
                        </div>

                        <div className={`input-group ${errors.sport ? 'error' : ''}`}>
                            <label htmlFor="sport" className="input-label">
                                <FiTrendingUp className="label-icon" />
                                Choose Sport
                            </label>
                            <select
                                id="sport"
                                name="sport"
                                value={formData.sport}
                                onChange={handleInputChange}
                                className="form-input"
                            >
                                <option value="">Select a sport...</option>
                                {sports.map((sport, index) => (
                                    <option key={index} value={sport}>
                                        {sport}
                                    </option>
                                ))}
                            </select>
                            {errors.sport && (
                                <span className="error-message"><FiAlertCircle /> {errors.sport}</span>
                            )}
                        </div>

                        <button type="submit" className="submit-btn">
                            <FiCheckCircle />
                            Register as Referee
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Referee;