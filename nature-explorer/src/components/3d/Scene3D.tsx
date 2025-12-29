import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Create a circular texture for particles
const createCircleTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

// Individual Leaf Component
const Leaf: React.FC<{ 
  position: [number, number, number]; 
  rotation: number; 
  scale: number; 
  color: string 
}> = ({ position, rotation, scale, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + rotation) * 0.4;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2 + rotation) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + rotation) * 0.15;
    }
  });

  const leafShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.4, 0.4, 0.4, 1, 0, 1.5);
    shape.bezierCurveTo(-0.4, 1, -0.4, 0.4, 0, 0);
    return shape;
  }, []);

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale} rotation={[0.3, rotation, 0]}>
        <shapeGeometry args={[leafShape]} />
        <meshBasicMaterial 
          color={color} 
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
};

// Floating Leaves Group - MORE LEAVES
const FloatingLeaves: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const leaves = useMemo(() => {
    const colors = isDark 
      ? ['#34d399', '#6ee7b7', '#a7f3d0', '#10b981', '#059669']
      : ['#22c55e', '#4ade80', '#86efac', '#16a34a', '#15803d'];
    
    return Array.from({ length: 28 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2
      ] as [number, number, number],
      rotation: Math.random() * Math.PI * 2,
      scale: 0.2 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, [isDark]);

  return (
    <>
      {leaves.map((leaf, i) => (
        <Leaf key={i} {...leaf} />
      ))}
    </>
  );
};

// Glowing Orbs - MORE ORBS
const GlowingOrbs: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const orbs = useMemo(() => {
    return Array.from({ length: 80 }, () => ({
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6
      ] as [number, number, number],
      scale: 0.02 + Math.random() * 0.05,
      speed: 0.3 + Math.random() * 0.8,
      offset: Math.random() * Math.PI * 2
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <GlowOrb key={i} {...orb} isDark={isDark} />
      ))}
    </group>
  );
};

const GlowOrb: React.FC<{
  position: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
  isDark: boolean;
}> = ({ position, scale, speed, offset, isDark }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.y = position[1] + Math.sin(t) * 0.4;
      meshRef.current.position.x = position[0] + Math.cos(t * 0.7) * 0.25;
      const pulse = 0.6 + Math.sin(t * 2) * 0.4;
      meshRef.current.scale.setScalar(scale * pulse);
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.5 + Math.sin(t * 1.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial 
        color={isDark ? '#fbbf24' : '#34d399'} 
        transparent 
        opacity={0.6}
      />
    </mesh>
  );
};

// Sparkle Particles - MANY MORE PARTICLES
const SparkleParticles: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const texture = useMemo(() => createCircleTexture(), []);
  const count = 200; // Increased from 60

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.002;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.18 : 0.12}
        color={isDark ? '#fef3c7' : '#bbf7d0'}
        map={texture}
        transparent
        opacity={isDark ? 0.95 : 0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Secondary Particle Layer - NEW
const SecondaryParticles: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const texture = useMemo(() => createCircleTexture(), []);
  const count = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 + 1;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -state.clock.elapsedTime * 0.012;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.1 : 0.08}
        color={isDark ? '#6ee7b7' : '#a7f3d0'}
        map={texture}
        transparent
        opacity={isDark ? 0.7 : 0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main 3D Scene
const Scene3D: React.FC = () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  return (
    <div className="scene-3d-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          pointerEvents: 'none'
        }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isDark ? 0.3 : 0.6} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 0.5 : 1.0} color={isDark ? '#6ee7b7' : '#ffffff'} />
        <pointLight position={[-8, -5, 5]} intensity={isDark ? 0.3 : 0.4} color={isDark ? '#fbbf24' : '#86efac'} />
        <FloatingLeaves isDark={isDark} />
        <GlowingOrbs isDark={isDark} />
        <SparkleParticles isDark={isDark} />
        <SecondaryParticles isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
