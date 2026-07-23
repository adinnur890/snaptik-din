"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float, Torus, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

/* ── Inner ring ────────────────────────────────────────────── */
function NeonRing({ radius, tube, color, speed, rotAxis }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation[rotAxis] += delta * speed;
  });
  return (
    <Torus ref={ref} args={[radius, tube, 64, 128]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.2}
        roughness={0.05}
        metalness={0.9}
        transparent
        opacity={0.85}
      />
    </Torus>
  );
}

/* ── Core sphere ───────────────────────────────────────────── */
function CoreSphere() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });
  return (
    <Sphere ref={ref} args={[0.72, 64, 64]}>
      <MeshDistortMaterial
        color="#0a0a0c"
        emissive="#FE2C55"
        emissiveIntensity={0.15}
        roughness={0.1}
        metalness={1}
        distort={0.25}
        speed={1.5}
        transparent
        opacity={0.95}
      />
    </Sphere>
  );
}

/* ── Orbiting particles ────────────────────────────────────── */
function OrbitParticles() {
  const ref = useRef();
  const count = 120;

  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle  = (i / count) * Math.PI * 2;
    const radius = 1.4 + Math.random() * 0.6;
    const height = (Math.random() - 0.5) * 1.2;
    positions[i * 3]     = Math.cos(angle) * radius;
    positions[i * 3 + 1] = height;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    const isPink = Math.random() > 0.5;
    colors[i * 3]     = isPink ? 1.0 : 0.15;
    colors[i * 3 + 1] = isPink ? 0.17 : 0.96;
    colors[i * 3 + 2] = isPink ? 0.33 : 0.93;
  }

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

/* ── Mouse parallax camera ─────────────────────────────────── */
function CameraRig({ mouse }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current[0] * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current[1] * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Scene ─────────────────────────────────────────────────── */
function Scene({ mouse }) {
  return (
    <>
      <CameraRig mouse={mouse} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]}   color="#FE2C55" intensity={8}  distance={10} />
      <pointLight position={[-3, -2, 2]} color="#25F4EE" intensity={6}  distance={10} />
      <pointLight position={[0, 4, -2]}  color="#ffffff" intensity={2}  distance={8}  />

      <Environment preset="night" />

      {/* Floating group */}
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <group>
          <CoreSphere />
          <NeonRing radius={1.05} tube={0.018} color="#FE2C55" speed={0.4}  rotAxis="x" />
          <NeonRing radius={1.15} tube={0.012} color="#25F4EE" speed={-0.3} rotAxis="y" />
          <NeonRing radius={1.25} tube={0.008} color="#FE2C55" speed={0.2}  rotAxis="z" />
          <OrbitParticles />
        </group>
      </Float>
    </>
  );
}

/* ── Exported component ────────────────────────────────────── */
export default function TikTokOrb() {
  const mouse = useRef([0, 0]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = [
      ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
      -((e.clientY - rect.top)  / rect.height - 0.5) * 2,
    ];
  };

  const handleMouseLeave = () => { mouse.current = [0, 0]; };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[420px]"
    >
      {/* Bloom glow behind canvas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(254,44,85,0.18) 0%, rgba(37,244,238,0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>

      {/* Floating label */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <span className="glass-strong px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase text-[#A1A1AA] border border-white/5 animate-badge-glow">
          SnapDin Engine
        </span>
      </motion.div>
    </motion.div>
  );
}
