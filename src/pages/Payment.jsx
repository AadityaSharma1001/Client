import React from "react"
import Particles from "../components/Particles"

const Payment = () => {
  return (
    <div className="registration-page">
      <div className="particles-background">
        <Particles particleColors={["#d4af37", "#b78f28"]} particleCount={2000} speed={0.1} />
      </div>
      <div className="registration-content">
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">Make Payment</h1>
            <p className="form-subtitle">Proceed to complete your registration payment securely.</p>
            <hr className="form-divider" />
          </div>
          <div style={{ textAlign: "center", color: "#ddd" }}>
            Payment portal coming soon.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment


