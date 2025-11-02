import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';


// Annotation component for labeling buildings
function Annotation({ position, text, onClick }) {
  return (
    <Html position={position} distanceFactor={10} occlude>
      <div 
        onClick={onClick}
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '14px',
          cursor: 'pointer',
          border: '2px solid #3b82f6',
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.borderColor = '#60a5fa';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.borderColor = '#3b82f6';
        }}
      >
        {text}
      </div>
    </Html>
  );
}


function Model({ url, setIsHovering, resetView }) {
  const gltf = useLoader(GLTFLoader, url);
  const groupRef = useRef();
  const { raycaster, camera } = useThree();
  
  // Define campus locations (adjust positions based on your model)
  const landmarks = [
    // { position: [0, 20, 0], name: 'Main Building', cameraPos: [50, 30, 50] },
    // { position: [40, 20, -40], name: 'Library', cameraPos: [70, 40, -20] },
    // { position: [-40, 20, 40], name: 'Hostel Block', cameraPos: [-70, 40, 70] },
    // { position: [40, 20, 40], name: 'Academic Block', cameraPos: [80, 50, 80] },
  ];


  useFrame(() => {
    if (groupRef.current) {
      const intersects = raycaster.intersectObject(groupRef.current, true);
      setIsHovering(intersects.length > 0);
    }
  });


  const handleLandmarkClick = (landmark) => {
    // Smooth camera animation to landmark
    const targetPos = new THREE.Vector3(...landmark.cameraPos);
    const duration = 1500;
    const startPos = camera.position.clone();
    const startTime = Date.now();


    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;


      camera.position.lerpVectors(startPos, targetPos, easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  };


  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[100, 100, 50]} intensity={1} />
      <directionalLight position={[-100, 100, 50]} intensity={1} />
      <directionalLight position={[100, -100, 50]} intensity={1} />
      <directionalLight position={[-100, -100, 50]} intensity={1} />
      
      <primitive object={gltf.scene} />
      
      {landmarks.map((landmark, idx) => (
        <Annotation
          key={idx}
          position={landmark.position}
          text={landmark.name}
          onClick={() => handleLandmarkClick(landmark)}
        />
      ))}
    </group>
  );
}


export default function CollegeModel() {
  const [isHovering, setIsHovering] = useState(false);
  const [viewMode, setViewMode] = useState('perspective');
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cameraRef = useRef();
  const controlsRef = useRef();
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(110, 60, 50);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
      setResetTrigger(prev => prev + 1);
    }
  };


  const changeCameraView = (mode) => {
    setViewMode(mode);
    if (cameraRef.current && controlsRef.current) {
      switch(mode) {
        case 'top':
          cameraRef.current.position.set(0, 200, 0);
          controlsRef.current.target.set(0, 0, 0);
          break;
        case 'side':
          cameraRef.current.position.set(200, 50, 0);
          controlsRef.current.target.set(0, 0, 0);
          break;
        case 'aerial':
          cameraRef.current.position.set(150, 150, 150);
          controlsRef.current.target.set(0, 0, 0);
          break;
        default:
          cameraRef.current.position.set(110, 60, 50);
          controlsRef.current.target.set(0, 0, 0);
      }
      controlsRef.current.update();
    }
  };


  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Control Panel */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '10px' : '20px',
        right: isMobile ? '10px' : '20px',
        zIndex: 10,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: isMobile ? '10px' : '15px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        gap: isMobile ? '8px' : '10px',
        pointerEvents: 'auto',
        maxWidth: isMobile ? 'calc(100% - 20px)' : 'auto',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
      }}>
        {/* Reset Button */}
        <button
          onClick={resetCamera}
          style={{
            padding: isMobile ? '8px 12px' : '10px 15px',
            background: 'linear-gradient(135deg, #facc15, #fbbf24, #f59e0b)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: '500',
            transition: 'background 0.2s',
            flex: isMobile ? '1 1 auto' : 'none',
            minWidth: isMobile ? '80px' : 'auto',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #927b20ff, #b49034ff, #b98d40ff)'}
          onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #facc15, #fbbf24, #f59e0b)'}
        >
          Reset View
        </button>


        {/* Quick Views Label - Hide on mobile */}
        {!isMobile && (
          <div style={{ color: 'white', fontSize: '12px', marginTop: '5px', fontWeight: '600' }}>
            Quick Views:
          </div>
        )}
        
        {/* View Buttons */}
        <button 
          onClick={() => changeCameraView('perspective')} 
          style={{
            ...buttonStyle, 
            background: viewMode === 'perspective' ? 'linear-gradient(135deg, #facc15, #fbbf24, #f59e0b)' : '#4b5563',
            padding: isMobile ? '8px 12px' : '8px 12px',
            fontSize: isMobile ? '11px' : '12px',
            flex: isMobile ? '1 1 auto' : 'none',
            minWidth: isMobile ? '70px' : 'auto',
          }}
        >
          Default
        </button>
        <button 
          onClick={() => changeCameraView('top')} 
          style={{
            ...buttonStyle, 
            background: viewMode === 'top' ? 'linear-gradient(135deg, #facc15, #fbbf24, #f59e0b)' : '#4b5563',
            padding: isMobile ? '8px 12px' : '8px 12px',
            fontSize: isMobile ? '11px' : '12px',
            flex: isMobile ? '1 1 auto' : 'none',
            minWidth: isMobile ? '70px' : 'auto',
          }}
        >
          Top View
        </button>
        <button 
          onClick={() => changeCameraView('aerial')} 
          style={{
            ...buttonStyle, 
            background: viewMode === 'aerial' ? 'linear-gradient(135deg, #facc15, #fbbf24, #f59e0b)' : '#4b5563',
            padding: isMobile ? '8px 12px' : '8px 12px',
            fontSize: isMobile ? '11px' : '12px',
            flex: isMobile ? '1 1 auto' : 'none',
            minWidth: isMobile ? '70px' : 'auto',
          }}
        >
          Aerial
        </button>
      </div>


      {/* Status Indicator */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '10px' : '20px',
        left: isMobile ? '10px' : '20px',
        zIndex: 10,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: isMobile ? '8px 12px' : '10px 15px',
        borderRadius: '8px',
        color: 'white',
        fontSize: isMobile ? '10px' : '12px',
        pointerEvents: 'none',
        maxWidth: isMobile ? 'calc(50% - 20px)' : 'auto',
      }}>
        <div style={{ marginBottom: '4px' }}>
          Rotation: <span style={{ color: isHovering ? '#10b981' : '#6b7280', fontWeight: '600' }}>
            {isHovering ? 'Enabled' : isMobile ? 'Touch' : 'Hover'}
          </span>
        </div>
        <div>
          Zoom: <span style={{ color: isHovering ? '#10b981' : '#6b7280', fontWeight: '600' }}>
            {isHovering ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>


      <Canvas
        style={{
          height: isMobile ? '60vh' : '100vh',
          width: '100%',
          background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e)',
          display: 'block',
        }}
        camera={{
          far: 50000,
          position: [110, 60, 50],
          rotation: [0, Math.PI / 4, 0],
          fov: isMobile ? 65 : 50,
        }}
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          depth: true,
          precision: 'highp',
          powerPreference: 'high-performance',
        }}
        onWheel={(event) => event.stopPropagation()}
        touch-action={isMobile ? 'pan-y' : 'none'}
      >
        <PerspectiveCamera ref={cameraRef} makeDefault />
        
        <Suspense fallback={null}>
          <Model 
            url="./clgmodel9.glb" 
            setIsHovering={setIsHovering} 
            resetView={resetTrigger}
          />
        </Suspense>
        
        <OrbitControls 
          ref={controlsRef}
          enableZoom={isHovering}
          minDistance={isMobile ? 100 : 120}
          maxDistance={isMobile ? 200 : 180}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={false}
          enableRotate={true}
          enablePan={false}
          rotateSpeed={isMobile ? 0.7 : 0.5}
          zoomSpeed={isMobile ? 1.0 : 0.8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
          }}
        />
      </Canvas>
    </div>
  );
}


const buttonStyle = {
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontWeight: '500',
  whiteSpace: 'nowrap',
};
