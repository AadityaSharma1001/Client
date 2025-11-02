import React from 'react';
import Particles from '../components/Particles';
import '../styles/discount.css';
import useLocalStorage from "../hooks/useLocalStorage";

const Discount = () => {
  const [token] = useLocalStorage("token", "");
  const [uniqueId] = useLocalStorage("uniqueId", "");

  const isLoggedIn = !!token && !!uniqueId;

  return (
    <div className="discount-page">
      <div className="particles-background">
        <Particles
          particleColors={['#d4af37', '#b78f28']}
          particleCount={4000}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      <div className="discount-content">
        <div className="discount-container">
          <h1 className="discount-title">Accommodation Discounts</h1>
          
          <div className="offer-card accommodation-offer">
            <div className="offer-header">
              <h2 className="offer-title">Group Accommodation Offer</h2>
              <div className="offer-badge">Bigger Groups, Bigger Savings!</div>
            </div>

            <div className="offer-highlight">
              <h3>Save More When You Stay Together!</h3>
              <p className="highlight-text">
                Register your contingent and enjoy exclusive accommodation discounts at IIT Jodhpur.
              </p>
            </div>

            <div className="pricing-table">
              <h4>Charges per Person</h4>
              <table className="gold-table">
                <thead>
                  <tr>
                    <th>Number of People</th>
                    <th>Charges (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Below 40</td>
                    <td>2200</td>
                  </tr>
                  <tr>
                    <td>40+</td>
                    <td>2150</td>
                  </tr>
                  <tr>
                    <td>60+</td>
                    <td>2100</td>
                  </tr>
                  <tr>
                    <td>80+</td>
                    <td>2000</td>
                  </tr>
                </tbody>
              </table>

              {isLoggedIn && (
                <a
                  href="https://form.qfixonline.com/varsports"
                  className="cta-button payment-btn"
                >
                  Make Payment
                </a>
              )}
            </div>

            <div className="accommodation-details">
              <h4>What's Included in Your Stay</h4>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🏨</div>
                  <h5>3-Day Comfortable Stay</h5>
                  <p>Enjoy hassle-free accommodation at IIT Jodhpur campus</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">🍽️</div>
                  <h5>8 Meals Included</h5>
                  <p>Breakfast & lunch each day, plus dinner on 6th and breakfast on 10th</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">🎫</div>
                  <h5>Pro Event Passes</h5>
                  <p>Exclusive access to all pro events included in your package</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">🚌</div>
                  <h5>Bus Service</h5>
                  <p>Free transport from railway station to campus for your entire contingent</p>
                </div>
              </div>
            </div>

            <div className="meal-schedule">
              <h4>Meal Schedule</h4>
              <div className="schedule-grid">
                <div className="schedule-item">
                  <span className="meal-icon">☀️</span>
                  <div className="meal-info">
                    <strong>Breakfast</strong>
                    <p>Daily + 10th morning</p>
                  </div>
                </div>
                <div className="schedule-item">
                  <span className="meal-icon">🌤️</span>
                  <div className="meal-info">
                    <strong>Lunch</strong>
                    <p>All 3 days</p>
                  </div>
                </div>
                <div className="schedule-item">
                  <span className="meal-icon">🌙</span>
                  <div className="meal-info">
                    <strong>Dinner</strong>
                    <p>6th evening included</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="conditions">
              <h4>Important Notes</h4>
              <ul>
                <li>Offers apply only to registered participants with accommodation at IIT Jodhpur.</li>
                <li>All participants must present valid student ID proof during check-in.</li>
                <li>Discounts apply automatically based on group size at registration.</li>
                <li>Hassle-free check-in and on-ground assistance provided throughout your stay.</li>
                <li className="warning">Charges are non-refundable once accommodation is confirmed.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
