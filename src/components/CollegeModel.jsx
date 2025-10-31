import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';

// Annotation component for labeling buildings
function Annotation({ position, text, onClick }) {
  return (
    <Html position={position} distanceFactor={10} occlude>
      <div 
        onClick={onClick}
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.95))',
          color: '#FFD700',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '14px',
          cursor: 'pointer',
          border: '2px solid #FFD700',
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.borderColor = '#FFA500';
          e.target.style.boxShadow = '0 0 30px rgba(255, 165, 0, 0.6)';
          e.target.style.color = '#FFA500';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.borderColor = '#FFD700';
          e.target.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
          e.target.style.color = '#FFD700';
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
    { position: [0, 20, 0], name: 'Main Building', cameraPos: [50, 30, 50] },
    { position: [40, 20, -40], name: 'Library', cameraPos: [70, 40, -20] },
    { position: [-40, 20, 40], name: 'Hostel Block', cameraPos: [-70, 40, 70] },
    { position: [40, 20, 40], name: 'Academic Block', cameraPos: [80, 50, 80] },
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
      <ambientLight intensity={1.2} color="#FFE5B4" />
      <directionalLight position={[100, 100, 50]} intensity={1.2} color="#FFD700" />
      <directionalLight position={[-100, 100, 50]} intensity={0.8} color="#FFA500" />
      <directionalLight position={[100, -100, 50]} intensity={0.8} color="#FFD700" />
      <directionalLight position={[-100, -100, 50]} intensity={0.6} color="#FFA500" />
      <pointLight position={[0, 50, 0]} intensity={0.5} color="#FFD700" />
      
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
  const cameraRef = useRef();
  const controlsRef = useRef();
  
  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

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
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.9))',
        padding: '15px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
      }}>
        <button
          onClick={resetCamera}
          style={{
            padding: '10px 15px',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.4)';
          }}
        >
          🔄 Reset View
        </button>

        <div style={{ 
          color: '#FFD700', 
          fontSize: '12px', 
          marginTop: '5px',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
        }}>
          📷 Quick Views:
        </div>
        
        <button onClick={() => changeCameraView('perspective')} style={buttonStyle}>
          🎯 Default
        </button>
        <button onClick={() => changeCameraView('top')} style={buttonStyle}>
          ⬇️ Top View
        </button>
        <button onClick={() => changeCameraView('aerial')} style={buttonStyle}>
          🚁 Aerial
        </button>
      </div>

      {/* Stats Display */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.9))',
        padding: '10px 15px',
        borderRadius: '8px',
        color: '#FFD700',
        fontSize: '12px',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
      }}>
        <div style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
          🖱️ Rotation: <span style={{ color: isHovering ? '#FFA500' : '#FFD700', fontWeight: 'bold' }}>
            {isHovering ? 'Enabled' : 'Hover to Enable'}
          </span>
        </div>
        <div style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
          🔍 Zoom: <span style={{ color: isHovering ? '#FFA500' : '#FFD700', fontWeight: 'bold' }}>
            {isHovering ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <Canvas
        style={{
          height: isMobile ? '40vh' : '100vh',
          width: '100%',
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)',
        }}
        camera={{
          far: 50000,
          position: [110, 60, 50],
          rotation: [0, Math.PI / 4, 0],
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
      >
        <PerspectiveCamera ref={cameraRef} makeDefault />
        
        <Suspense fallback={null}>
          <Model 
            url="./clgmodel9.glb" 
            setIsHovering={setIsHovering} 
            resetView={resetTrigger}
          />
        </Suspense>
        
        {/* OrbitControls with manual rotation only */}
        <OrbitControls 
          ref={controlsRef}
          enableZoom={isHovering}
          minDistance={120}
          maxDistance={180}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={false}
          enableRotate={true}
          enablePan={false}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

const buttonStyle = {
  padding: '8px 12px',
  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2))',
  color: '#FFD700',
  border: '1px solid rgba(255, 215, 0, 0.5)',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '12px',
  transition: 'all 0.3s ease',
  fontWeight: '500',
  boxShadow: '0 2px 10px rgba(255, 215, 0, 0.2)',
};
