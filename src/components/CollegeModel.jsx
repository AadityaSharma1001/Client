import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';

function Model({ url, setIsHovering }) {
  const gltf = useLoader(GLTFLoader, url);
  const groupRef = useRef();
  const { raycaster } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Rotate the model continuously
      groupRef.current.rotation.y -= 0.002;
      
      // Check if mouse is hovering over the model
      const intersects = raycaster.intersectObject(groupRef.current, true);
      setIsHovering(intersects.length > 0);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[100, 100, 50]} intensity={1} />
      <directionalLight position={[-100, 100, 50]} intensity={1} />
      <directionalLight position={[100, -100, 50]} intensity={1} />
      <directionalLight position={[-100, -100, 50]} intensity={1} />
      <hemisphereLight intensity={0.5} groundColor="#ffffff" />
    </>
  );
}

export default function CollegeModel() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Canvas
      style={{
        height: isMobile ? '40vh' : '100vh',
        width: '100%',
      }}
      className='bg-black my-0'
      camera={{
        fov: 50,
        near: 0.1,
        far: 50000,
        position: [110, 60, 50],
      }}
      gl={{ antialias: true }}
      onWheel={(event) => event.stopPropagation()}
    >
      <Lights />
      <Model url="/models/clgmodel10.glb" setIsHovering={setIsHovering} />
      <OrbitControls
        enableZoom={isHovering}
        minDistance={120}
        maxDistance={180}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
    </Canvas>
  );
}
