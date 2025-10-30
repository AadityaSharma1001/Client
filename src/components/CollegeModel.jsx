import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useState, useRef, useEffect } from 'react';
import clgModel from '/models/clgmodel10.glb'; // ✅ Correct import from src/assets

function Model({ url, setIsHovering }) {
  const gltf = useLoader(GLTFLoader, url);
  const groupRef = useRef();

  // Continuous model rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.002;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setIsHovering(true)}
      onPointerOut={() => setIsHovering(false)}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[50, 100, 50]} intensity={1.2} />
      <directionalLight position={[-50, 100, 50]} intensity={1} />
      <hemisphereLight intensity={0.6} groundColor="#ffffff" />
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
      className="bg-black my-0"
      camera={{
        fov: 50,
        near: 0.1,
        far: 50000,
        position: [150, 100, 150],
      }}
      gl={{ antialias: true }}
      onWheel={(event) => event.stopPropagation()}
    >
      <Lights />
      <Model url={clgModel} setIsHovering={setIsHovering} />
      <OrbitControls
        enableZoom={isHovering}
        minDistance={100}
        maxDistance={300}
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
