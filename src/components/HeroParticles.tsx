import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import gsap from 'gsap';

const particleCount = 5000;
const spherePositions = new Float32Array(particleCount * 3);
random.inSphere(spherePositions, { radius: 1.5 });

function ParticleMap() {
  const ref = useRef<any>();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      const pointerX = state.pointer.x;
      const pointerY = state.pointer.y;
      ref.current.position.x = gsap.utils.interpolate(ref.current.position.x, pointerX * 0.2, 0.05);
      ref.current.position.y = gsap.utils.interpolate(ref.current.position.y, pointerY * 0.2, 0.05);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={spherePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#aa3bff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1.5] }} dpr={[1, 2]}>
        <ParticleMap />
      </Canvas>
    </div>
  );
}
