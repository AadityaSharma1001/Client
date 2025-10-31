import React, { Suspense, useEffect, useRef } from 'react';
import CollegeModel from '../components/CollegeModel';
import '../styles/Map.css';
import { motion, useAnimationControls, useInView } from 'framer-motion';

const LoadingFallback = () => (
  <div className="loading-screen" style={{ background: '#000' }}>
    <div className="loader">
      <div className="spinner" style={{ 
        borderColor: 'rgba(255, 215, 0, 0.2)',
        borderTopColor: '#FFD700',
      }}></div>
      <p className="loading-text" style={{ 
        color: '#FFD700',
        textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
      }}>
        Loading 3D Campus Model...
      </p>
      <p className="loading-subtext" style={{ color: '#FFA500' }}>
        Preparing interactive features...
      </p>
    </div>
  </div>
);

const Map = () => {
  const ref = useRef();
  const controls = useAnimationControls();
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, transition: { duration: 2 } });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      className="map-page min-h-screen flex flex-col items-center"
      style={{ background: 'radial-gradient(ellipse at top, #1a1a1a 0%, #000000 100%)' }}
      initial={{ opacity: 0 }}
      animate={controls}
      ref={ref}
    >
      {/* HEADER */}
      <div className="map-header text-center mt-10">
        <h1 
          className="map-title text-4xl font-bold mb-2"
          style={{ 
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
          }}
        >
          Interactive Campus Map 🎓
        </h1>
        <p className="map-subtitle" style={{ color: '#D4AF37' }}>
          Explore IIT Jodhpur in immersive 3D • Click landmarks to fly to locations
        </p>
      </div>

      {/* ENHANCED CONTROLS INFO */}
      <div className="map-controls-info mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm max-w-4xl px-4">
        <div 
          className="control-card p-4 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.8))',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
          }}
        >
          <div className="text-2xl mb-2">🖱️</div>
          <div className="font-semibold mb-1" style={{ color: '#FFD700' }}>Rotate</div>
          <div className="text-xs" style={{ color: '#D4AF37' }}>Left Click + Drag</div>
        </div>
        <div 
          className="control-card p-4 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.8))',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
          }}
        >
          <div className="text-2xl mb-2">🔍</div>
          <div className="font-semibold mb-1" style={{ color: '#FFD700' }}>Zoom</div>
          <div className="text-xs" style={{ color: '#D4AF37' }}>Scroll (Hover First)</div>
        </div>
        <div 
          className="control-card p-4 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.8))',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
          }}
        >
          <div className="text-2xl mb-2">🏷️</div>
          <div className="font-semibold mb-1" style={{ color: '#FFD700' }}>Navigate</div>
          <div className="text-xs" style={{ color: '#D4AF37' }}>Click Labels to Fly</div>
        </div>
      </div>

      {/* MODEL */}
      <div className="model-container w-full h-[80vh] mt-10">
        <Suspense fallback={<LoadingFallback />}>
          <CollegeModel />
        </Suspense>
      </div>

      {/* ENHANCED FOOTER */}
      <div className="map-footer mt-10 mb-10 text-center">
        <div className="text-sm mb-2" style={{ color: '#FFD700' }}>
          💡 Pro Tip: Click building labels for automatic camera flight
        </div>
        <div className="text-xs" style={{ color: '#D4AF37' }}>
          Best viewed on desktop • Built with React Three Fiber
        </div>
      </div>
    </motion.div>
  );
};

export default Map;
