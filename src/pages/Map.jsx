import React, { Suspense, useEffect, useRef, useState } from 'react';
import CollegeModel from '../components/CollegeModel';
import '../styles/Map.css';
import { motion, useAnimationControls, useInView } from 'framer-motion';

// Custom hook for mobile detection
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [breakpoint]);

  return isMobile;
};

const LoadingFallback = () => (
  <div className="loading-screen fixed inset-0 flex items-center justify-center bg-black z-50">
    <div className="loader flex flex-col items-center gap-4">
      <div className="spinner w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="loading-text text-lg md:text-xl font-semibold text-white">Loading 3D Campus Model...</p>
      <p className="loading-subtext text-xs md:text-sm text-gray-400">Preparing interactive features...</p>
    </div>
  </div>
);

const Map = () => {
  const ref = useRef();
  const controls = useAnimationControls();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isMobile = useIsMobile(768);

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } });
    }
  }, [isInView, controls]);

  return (
    <div className="map-page bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white min-h-screen flex flex-col">
      <motion.div
        className="map-header text-center pt-12 md:pt-16 pb-6 md:pb-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="map-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight">
          Interactive Campus Map
        </h1>
        <p className="map-subtitle text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-2">
          {isMobile 
            ? "Explore IIT Jodhpur in 3D - Touch to interact" 
            : "Explore IIT Jodhpur in immersive 3D"}
        </p>
      </motion.div>

      {/* Control instructions - hidden on mobile */}
      {!isMobile && (
        <motion.div
          className="map-controls-info mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center max-w-4xl mx-auto px-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="control-card p-5 md:p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="font-semibold text-base md:text-lg mb-2 text-white">Rotate</div>
            <div className="text-xs md:text-sm text-gray-400">Left Click + Drag</div>
          </div>
          <div className="control-card p-5 md:p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="font-semibold text-base md:text-lg mb-2 text-white">Zoom</div>
            <div className="text-xs md:text-sm text-gray-400">Scroll (Hover First)</div>
          </div>
        </motion.div>
      )}

      <motion.div
        className="model-container flex-1 w-full px-2 sm:px-4 pb-4 md:pb-8"
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div 
          className="w-full h-full min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh] rounded-xl md:rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-gray-900"
          style={{ position: 'relative', isolation: 'isolate' }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <CollegeModel />
          </Suspense>
        </div>
      </motion.div>

      <motion.div
        className="map-footer py-6 md:py-8 text-center px-4 border-t border-gray-800 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 text-xs md:text-sm">
          {!isMobile && (
            <>
              <div className="text-gray-400">
                Best viewed on desktop
              </div>
              <span className="hidden sm:inline text-gray-600">•</span>
            </>
          )}
          <div className="text-gray-500 text-xs">
            Built with 💓 by Team Varchas
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Map;
