import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Wireframe icosahedron core that reacts to mouse position with a tilt,
// plus a slow independent auto-rotation so it always feels alive.
function CoreShape() {
  const groupRef = useRef()
  const innerRef = useRef()
  const { viewport } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Smoothly ease toward pointer-driven tilt
    target.current.x = state.pointer.y * 0.4
    target.current.y = state.pointer.x * 0.5

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        target.current.x,
        0.04
      )
      groupRef.current.rotation.y +=
        0.0025 + (target.current.y - groupRef.current.rotation.y) * 0.0015
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.15
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= 0.003
      innerRef.current.rotation.z += 0.002
    }
  })

  return (
    <group ref={groupRef}>
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
  )
}

// Ambient orbiting particle field representing data / neural signal
function ParticleField() {
  const pointsRef = useRef()
  const count = 220

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#67E8F9"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
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
      className="relative w-full h-full min-h-[420px] cursor-grab active:cursor-grabbing"
      onPointerEnter={() => setReady(true)}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <CoreShape />
        <ParticleField />
        <OrbitRings />
      </Canvas>

      {/* subtle glow behind the canvas for extra atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-2/3 h-2/3 rounded-full bg-cyan-400/20 blur-[100px]" />
      </div>
    </div>
  )
}
