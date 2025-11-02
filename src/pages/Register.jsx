import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle, FiAlertTriangle } from "react-icons/fi"
import '../styles/Register.css'
import Particles from '../components/Particles'


const STATES = [
    { value: "1", label: "Andhra Pradesh" },
    { value: "2", label: "Arunachal Pradesh" },
    { value: "3", label: "Assam" },
    { value: "4", label: "Bihar" },
    { value: "5", label: "Chhattisgarh" },
    { value: "6", label: "Goa" },
    { value: "7", label: "Gujarat" },
    { value: "8", label: "Haryana" },
    { value: "9", label: "Himachal Pradesh" },
    { value: "10", label: "Jammu & Kashmir" },
    { value: "11", label: "Jharkhand" },
    { value: "12", label: "Karnataka" },
    { value: "13", label: "Kerala" },
    { value: "14", label: "Madhya Pradesh" },
    { value: "15", label: "Maharashtra" },
    { value: "16", label: "Manipur" },
    { value: "17", label: "Meghalaya" },
    { value: "18", label: "Mizoram" },
    { value: "19", label: "Nagaland" },
    { value: "20", label: "Odisha" },
    { value: "21", label: "Punjab" },
    { value: "22", label: "Rajasthan" },
    { value: "23", label: "Sikkim" },
    { value: "24", label: "Tamil Nadu" },
    { value: "25", label: "Telangana" },
    { value: "26", label: "Tripura" },
    { value: "27", label: "Uttarakhand" },
    { value: "28", label: "Uttar Pradesh" },
    { value: "29", label: "West Bengal" },
    { value: "30", label: "Andaman & Nicobar Islands" },
    { value: "31", label: "Delhi" },
    { value: "32", label: "Chandigarh" },
    { value: "33", label: "Dadra & Naagar Haveli" },
    { value: "34", label: "Daman & Diu" },
    { value: "35", label: "Lakshadweep" },
    { value: "36", label: "Puducherry" }
]


const UserRegister = () => {
    const location = useLocation()
    const [step, setStep] = useState(1)
    const [form1, setForm1] = useState({ email: "", password: "", confirm: "" })
    const [errors1, setErrors1] = useState({})
    const [showPass, setShowPass] = useState({ pass: false, confirm: false })
    const [form2, setForm2] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        gender: "",
        college: "",
        state: "",
        accommodation_required: "",
        account_holder_name: "",
        ifsc_code: "",
        bank_account_number: "",
        confirm_bank_account: ""
    })
    const [errors2, setErrors2] = useState({})
    const [popup, setPopup] = useState({ show: false, message: "", success: false })
    const [termsChecked, setTermsChecked] = useState(false)
    const [passwordWarningChecked, setPasswordWarningChecked] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL


    useEffect(() => {
        if (location.state?.skipStep1 && location.state?.email) {
            setForm2(prev => ({ ...prev, email: location.state.email }))
            setStep(2)
        }
    }, [location.state])


    const validateField1 = (name, value) => {
        let error = ""
        if (name === "email") {
            if (!value.trim()) error = "Email is required"
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format"
        } else if (name === "password") {
            if (!value.trim()) error = "Password is required"
            else if (value.length < 6) error = "At least 6 characters required"
        } else if (name === "confirm") {
            if (value !== form1.password) error = "Passwords do not match"
        }
        return error
    }


    const validateField2 = (name, value) => {
        let error = ""
        switch (name) {
            case "first_name":
            case "last_name":
                if (!value.trim()) error = "This field is required"
                else if (!/^[a-zA-Z\s.]+$/.test(value)) error = "Only letters allowed"
                break
            case "phone":
                if (!/^\d{10}$/.test(value)) error = "Enter a valid 10-digit number"
                break
            case "gender":
                if (!value) error = "Please select a gender"
                break
            case "college":
            case "account_holder_name":
                if (!value.trim()) error = "This field is required"
                break
            case "state":
                if (!value.trim()) error = "Please select a state"
                break
            case "accommodation_required":
                if (!value) error = "Please select an option"
                break
            case "ifsc_code":
                if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.trim().toUpperCase())) error = "Invalid IFSC format"
                break
            case "bank_account_number":
                if (!/^\d{9,18}$/.test(value)) error = "Must be 9–18 digits"
                break
            case "confirm_bank_account":
                if (value !== form2.bank_account_number) error = "Bank accounts do not match"
                break
            default:
                break
        }
        return error
    }


    const handleChange = (e, setFunc, validateFunc, setErr) => {
        const { name, value } = e.target
        setFunc(prev => ({ ...prev, [name]: value }))
        const error = validateFunc(name, value)
        setErr(prev => ({ ...prev, [name]: error }))
    }


    const handleBankFieldEvent = (e) => {
        e.preventDefault()
    }


    const registerUser = async (e) => {
        e.preventDefault()
        const newErrors = {}
        Object.keys(form1).forEach(k => {
            const err = validateField1(k, form1[k])
            if (err) newErrors[k] = err
        })
        setErrors1(newErrors)
        if (Object.keys(newErrors).length > 0) return


        try {
            const res = await fetch(`${backendUrl}/account/userregister/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form1.email, password: form1.password, confirm_password: form1.confirm })
            })
            const data = await res.json()
            if ((res.status === 201 || res.status === 200) && data.message?.toLowerCase().includes("success")) {
                setForm2(prev => ({ ...prev, email: form1.email }))
                setStep(2)
            } else {
                setPopup({ show: true, message: data.message || data.Error || "Registration failed", success: false })
            }
        } catch {
            setPopup({ show: true, message: "Network error", success: false })
        } finally {
            setTimeout(() => setPopup({ show: false, message: "", success: false }), 2500)
        }
    }


    const updateInfo = async (e) => {
        e.preventDefault()
        const newErrors = {}
        Object.keys(form2).forEach(k => {
            if (k !== "confirm_bank_account") {
                const err = validateField2(k, form2[k])
                if (err) newErrors[k] = err
            }
        })
        const confirmErr = validateField2("confirm_bank_account", form2.confirm_bank_account)
        if (confirmErr) newErrors.confirm_bank_account = confirmErr

        if (!termsChecked || !passwordWarningChecked) {
            setPopup({ show: true, message: "Please accept all terms and conditions", success: false })
            setTimeout(() => setPopup({ show: false, message: "", success: false }), 2500)
            return
        }

        setErrors2(newErrors)
        if (Object.keys(newErrors).length > 0) return


        try {
            const { confirm_bank_account, ...dataToSend } = form2
            const res = await fetch(`${backendUrl}/account/updateInfo/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            })
            console.log(JSON.stringify(dataToSend))
            if (res.status === 201) {
                setPopup({ show: true, message: "Registration Successful!", success: true })
                setTimeout(() => {
                    window.location.href = "/login"
                }, 2000)
            } else {
                setPopup({ show: true, message: res.message || res.Error || "Update failed", success: false })
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
                {step === 1 && (
                    <div className="form-card">
                        <h1 className="form-title">User Registration</h1>

                        <div className="security-warning-banner">
                            <FiAlertTriangle className="warning-icon" />
                            <div className="warning-text">
                                <strong>Important:</strong> Passwords cannot be retrieved or reset later. Please save it carefully in a secure location.
                            </div>
                        </div>

                        <form onSubmit={registerUser} className="form">
                            <div className={`input-group ${errors1.email ? 'error' : ''}`}>
                                <label><FiMail className="label-icon" /> Email</label>
                                <input type="email" name="email" placeholder="Enter your email"
                                    value={form1.email} onChange={e => handleChange(e, setForm1, validateField1, setErrors1)} className="form-input" />
                                {errors1.email && <span className="error-message"><FiAlertCircle /> {errors1.email}</span>}
                            </div>


                            <div className={`input-group ${errors1.password ? 'error' : ''}`}>
                                <label><FiLock className="label-icon" /> Password</label>
                                <div className="password-wrapper">
                                    <input type={showPass.pass ? "text" : "password"} name="password"
                                        placeholder="Enter password" value={form1.password}
                                        onChange={e => handleChange(e, setForm1, validateField1, setErrors1)} className="form-input" />
                                    <span onClick={() => setShowPass(prev => ({ ...prev, pass: !prev.pass }))} className="eye-icon">
                                        {showPass.pass ? <FiEyeOff /> : <FiEye />}
                                    </span>
                                </div>
                                {errors1.password && <span className="error-message"><FiAlertCircle /> {errors1.password}</span>}
                            </div>


                            <div className={`input-group ${errors1.confirm ? 'error' : ''}`}>
                                <label><FiLock className="label-icon" /> Confirm Password</label>
                                <div className="password-wrapper">
                                    <input type={showPass.confirm ? "text" : "password"} name="confirm"
                                        placeholder="Confirm password" value={form1.confirm}
                                        onChange={e => handleChange(e, setForm1, validateField1, setErrors1)} className="form-input" />
                                    <span onClick={() => setShowPass(prev => ({ ...prev, confirm: !prev.confirm }))} className="eye-icon">
                                        {showPass.confirm ? <FiEyeOff /> : <FiEye />}
                                    </span>
                                </div>
                                {errors1.confirm && <span className="error-message"><FiAlertCircle /> {errors1.confirm}</span>}
                            </div>


                            <button type="submit" className="submit-btn"><FiCheckCircle /> Register</button>


                            <p className="login-redirect">
                                Already registered? <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                )}


                {step === 2 && (
                    <div className="form-card popup-card">
                        <h1 className="form-title">Complete Your Profile</h1>
                        <form onSubmit={updateInfo} className="form">
                            <input value={form2.email} readOnly className="form-input readonly" placeholder="Email" />


                            {[["first_name", "First Name"], ["last_name", "Last Name"], ["phone", "Phone"], ["college", "College"]
                            ].map(([name, placeholder]) => (
                                <div key={name} className={`input-group ${errors2[name] ? 'error' : ''}`}>
                                    <input
                                        name={name}
                                        placeholder={placeholder}
                                        value={form2[name]}
                                        onChange={e => handleChange(e, setForm2, validateField2, setErrors2)}
                                        className="form-input"
                                    />
                                    {errors2[name] && <span className="error-message"><FiAlertCircle /> {errors2[name]}</span>}
                                </div>
                            ))}

                            <div className={`input-group ${errors2.gender ? 'error' : ''}`}>
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    value={form2.gender}
                                    onChange={e => handleChange(e, setForm2, validateField2, setErrors2)}
                                    className="form-input"
                                >
                                    <option value="">-- Select Gender --</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                                {errors2.gender && <span className="error-message"><FiAlertCircle /> {errors2.gender}</span>}
                            </div>

                            <div className={`input-group ${errors2.state ? 'error' : ''}`}>
                                <label>State</label>
                                <select
                                    name="state"
                                    value={form2.state}
                                    onChange={e => handleChange(e, setForm2, validateField2, setErrors2)}
                                    className="form-input"
                                >
                                    <option value="">-- Select State --</option>
                                    {STATES.map(s => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                                {errors2.state && <span className="error-message"><FiAlertCircle /> {errors2.state}</span>}
                            </div>

                            <div className={`input-group ${errors2.accommodation_required ? 'error' : ''}`}>
                                <label>Accommodation Required</label>
                                <select
                                    name="accommodation_required"
                                    value={form2.accommodation_required}
                                    onChange={e => handleChange(e, setForm2, validateField2, setErrors2)}
                                    className="form-input"
                                >
                                    <option value="">-- Select Option --</option>
                                    <option value="Y">Yes</option>
                                    <option value="N">No</option>
                                </select>
                                {errors2.accommodation_required && <span className="error-message"><FiAlertCircle /> {errors2.accommodation_required}</span>}
                            </div>


                            {[["account_holder_name", "Account Holder Name"], ["ifsc_code", "IFSC Code"]
                            ].map(([name, placeholder]) => (
                                <div key={name} className={`input-group ${errors2[name] ? 'error' : ''}`}>
                                    <input
                                        name={name}
                                        placeholder={placeholder}
                                        value={form2[name]}
                                        onChange={e => handleChange(e, setForm2, validateField2, setErrors2)}
                                        className="form-input"
                                    />
                                    {errors2[name] && <span className="error-message"><FiAlertCircle /> {errors2[name]}</span>}
                                </div>
                            ))}

                            <div className={`input-group ${errors2.bank_account_number ? 'error' : ''}`}>
                                <label>Bank Account Number</label>
                                <input
                                    type="password"
                                    name="bank_account_number"
                                    placeholder="Enter bank account number"
                                    value={form2.bank_account_number}
                                    onChange={e => handleChange(e, setForm2, validateField2, setErrors2)}
                                    onCopy={handleBankFieldEvent}
                                    onPaste={handleBankFieldEvent}
                                    onCut={handleBankFieldEvent}
                                    className="form-input secure-bank-input"
                                />
                                {errors2.bank_account_number && <span className="error-message"><FiAlertCircle /> {errors2.bank_account_number}</span>}
                            </div>

                            <div className={`input-group ${errors2.confirm_bank_account ? 'error' : ''}`}>
                                <label>Confirm Bank Account Number</label>
                                <input
                                    type="password"
                                    name="confirm_bank_account"
                                    placeholder="Confirm bank account number"
                                    value={form2.confirm_bank_account}
                                    onChange={e => handleChange(e, setForm2, validateField2, setErrors2)}
                                    onCopy={handleBankFieldEvent}
                                    onPaste={handleBankFieldEvent}
                                    onCut={handleBankFieldEvent}
                                    className="form-input secure-bank-input"
                                />
                                {errors2.confirm_bank_account && <span className="error-message"><FiAlertCircle /> {errors2.confirm_bank_account}</span>}
                            </div>

                            <div className="terms-section">
                                <div className="terms-checkbox">
                                    <input
                                        type="checkbox"
                                        id="terms-check"
                                        checked={termsChecked}
                                        onChange={e => setTermsChecked(e.target.checked)}
                                        className="checkbox-input"
                                    />
                                    <label htmlFor="terms-check" className="terms-label">
                                        <span className="warning-icon-small">⚠️</span>
                                        I understand that the information provided above <strong>cannot be edited after account creation</strong>. I have carefully reviewed all details.
                                    </label>
                                </div>

                                <div className="terms-checkbox">
                                    <input
                                        type="checkbox"
                                        id="password-warning-check"
                                        checked={passwordWarningChecked}
                                        onChange={e => setPasswordWarningChecked(e.target.checked)}
                                        className="checkbox-input"
                                    />
                                    <label htmlFor="password-warning-check" className="terms-label">
                                        I understand that my <strong>password cannot be retrieved or reset</strong> later. I have saved it securely.
                                    </label>
                                </div>
                            </div>


                            <button type="submit" className="submit-btn" disabled={!termsChecked || !passwordWarningChecked}><FiCheckCircle /> Submit</button>
                        </form>
                    </div>
                )}
            </div>


            {popup.show && (
                <div className={`popup ${popup.success ? 'success' : 'error'}`}>
                    {popup.success ? '✅' : '❌'} {popup.message}
                </div>
            )}
        </div>
    )
}


export default UserRegister