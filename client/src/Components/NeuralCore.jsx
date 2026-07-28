import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Wireframe icosahedron core that tumbles through a full 360° rotation on
// every axis continuously, with a subtle pointer-driven parallax layered on
// top (via a separate wrapper) so it still feels responsive to the mouse.
function CoreShape() {
  const tiltRef = useRef()
  const spinRef = useRef()
  const innerRef = useRef()
  const target = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    // Subtle pointer parallax on the outer wrapper — never caps rotation,
    // just nudges the tumble slightly toward the cursor.
    target.current.x = state.pointer.y * 0.25
    target.current.y = state.pointer.x * 0.3

    if (tiltRef.current) {
      tiltRef.current.rotation.x = THREE.MathUtils.lerp(
        tiltRef.current.rotation.x,
        target.current.x,
        0.04
      )
      tiltRef.current.rotation.y = THREE.MathUtils.lerp(
        tiltRef.current.rotation.y,
        target.current.y,
        0.04
      )
      tiltRef.current.position.y = Math.sin(t * 0.6) * 0.15
    }

    // Continuous full tumble on all three axes — completes real 360°
    // rotations over time instead of settling toward a fixed tilt.
    if (spinRef.current) {
      spinRef.current.rotation.x += delta * 0.22
      spinRef.current.rotation.y += delta * 0.31
      spinRef.current.rotation.z += delta * 0.13
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.35
      innerRef.current.rotation.z += delta * 0.22
    }
  })

  return (
    <group ref={tiltRef}>
      <group ref={spinRef}>
        {/* Outer wireframe icosahedron */}
        <mesh>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.55} />
        </mesh>
        {/* Inner solid glowing core */}
        <mesh ref={innerRef} scale={0.55}>
          <icosahedronGeometry args={[1.6, 0]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={1.4}
            transparent
            opacity={0.9}
            wireframe
          />
        </mesh>
        {/* Core light */}
        <pointLight color="#22D3EE" intensity={8} distance={6} />
      </group>
    </group>
  )
}

// Thin orbiting rings for extra depth
function OrbitRings() {
  const ring1 = useRef()
  const ring2 = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ring1.current) ring1.current.rotation.z = t * 0.15
    if (ring2.current) ring2.current.rotation.z = -t * 0.1
  })

  return (
    <>
      <mesh ref={ring1} rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[2.35, 0.006, 8, 128]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.8, -0.4, 0]}>
        <torusGeometry args={[2.7, 0.005, 8, 128]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.18} />
      </mesh>
    </>
  )
}

export default function NeuralCore() {
  const [ready, setReady] = useState(false)

  return (
    <div
      className="relative w-full h-full min-h-105 cursor-grab active:cursor-grabbing"
      onPointerEnter={() => setReady(true)}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <CoreShape />
        <OrbitRings />
      </Canvas>

      {/* subtle glow behind the canvas for extra atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-2/3 h-2/3 rounded-full bg-cyan-400/20 blur-[100px]" />
      </div>
    </div>
  )
}