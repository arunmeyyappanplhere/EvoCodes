import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// Ambient drifting particle field representing data / neural signal,
// spread across a large volume so it reads as a starfield behind the
// whole page rather than something orbiting a single section.
function ParticleField() {
  const pointsRef = useRef()
  const count = 420

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Flattened box distribution: wide across X/Y (screen plane) so it
      // covers the full viewport, shallow on Z so it stays near-camera
      // and reads clearly at any scroll position.
      arr[i * 3] = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    return arr
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.015
      pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05
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
        size={0.03}
        color="#67E8F9"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

// Fixed, full-viewport, click-through layer that sits behind all page
// content (Navbar, Hero, Stats, etc). Mounted once in App.jsx.
export default function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleField />
      </Canvas>
    </div>
  )
}