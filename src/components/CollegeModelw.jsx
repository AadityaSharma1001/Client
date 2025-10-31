import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useState, useRef, Suspense } from 'react';

function Model({ url, setIsHovering }) {
  const gltf = useLoader(GLTFLoader, url);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const groupRef = useRef();

  useFrame(() => {
    setRotation([rotation[0], rotation[1] - 0.002, rotation[2]]);
  });

  const { raycaster, camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      const intersects = raycaster.intersectObject(groupRef.current, true);
      setIsHovering(intersects.length > 0);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[100, 100, 50]} intensity={1} />
      <directionalLight position={[-100, 100, 50]} intensity={1} />
      <directionalLight position={[100, -100, 50]} intensity={1} />
      <directionalLight position={[-100, -100, 50]} intensity={1} />
      <primitive
        object={gltf.scene}
        rotation={rotation}
      />
    </group>
  );
}

export default function CollegeModel() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Canvas
    style={{
      height: '100vh',
      width: '100%',
      [`${typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches ? 'height' : ''}`]: '40vh', // mobile height
    }}
      color="black"
      className='bg-black my-0 '
      camera={{
        far: 50000,
        position: [110, 60, 50],
        rotation: [0, Math.PI / 4, 0],
      }}
      onWheel={(event) => event.stopPropagation()}
    >
      <Model url="./clgmodel10.glb" setIsHovering={setIsHovering} />
      <OrbitControls
        enableZoom={isHovering}
        minDistance={120}
        maxDistance={180}
      />
    </Canvas>
  );
}
