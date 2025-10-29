import React, { Suspense } from 'react';
import CollegeModel from '../components/CollegeModel';
import '../styles/Map.css';

const Map = () => {
  return (
    <div className="map-page">
      <div className="map-header">
        <h1 className="map-title">Campus Map</h1>
        <p className="map-subtitle">Explore IIT Jodhpur in 3D</p>
      </div>

      <div className="map-controls-info">
        <div className="control-item">
          <span className="control-icon">🖱️</span>
          <span className="control-text">Left Click + Drag to Rotate</span>
        </div>
        <div className="control-item">
          <span className="control-icon">🔍</span>
          <span className="control-text">Scroll to Zoom</span>
        </div>
        <div className="control-item">
          <span className="control-icon">✋</span>
          <span className="control-text">Right Click + Drag to Pan</span>
        </div>
      </div>

      <div className="model-container">
        <Suspense fallback={
          <div className="loading-screen">
            <div className="loader">
              <div className="spinner"></div>
              <p className="loading-text">Loading 3D Model...</p>
              <p className="loading-subtext">Please wait while we prepare the campus view</p>
            </div>
          </div>
        }>
          <CollegeModel />
        </Suspense>
      </div>

      <div className="map-footer">
        <p className="footer-text">Hover over the model to enable zoom controls</p>
      </div>
    </div>
  );
};

export default Map;
