import React from 'react';
import Particles from '../components/Particles';
import '../styles/discount.css';

const Discount = () => {
  return (
    <div className="discount-page">
      <div className="particles-background">
        <Particles
          particleColors={['#d4af37', '#b78f28']}
          particleCount={200}
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
            </div>

            <div className="conditions">
              <h4>Important Notes</h4>
              <ul>
                <li>Offers apply only to registered participants with accommodation at IIT Jodhpur.</li>
                <li>All participants must present valid student ID proof during check-in.</li>
                <li>Discounts apply automatically based on group size at registration.</li>
                <li className="warning">⚠️ Charges are non-refundable once accommodation is confirmed.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;