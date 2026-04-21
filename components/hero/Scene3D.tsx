'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useMediaQuery'

// ─── Interactive Orbital System ─────────────────────────────────────────────────
function OrbitalSystem() {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useMousePosition()
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    
    // Slow rotation
    groupRef.current.rotation.y = t * 0.1
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1
    
    // Mouse influence
    groupRef.current.rotation.x += (mouse.nY * 0.1 - groupRef.current.rotation.x) * 0.02
  })

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#4f46e5"
          metalness={0.8}
          roughness={0.2}
          emissive="#4f46e5"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh scale={1.1}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.1} />
      </mesh>

      {/* Orbital ring 1 */}
      <Ring radius={1.2} color="#4f46e5" thickness={0.008} opacity={0.4} />
      
      {/* Orbital ring 2 */}
      <Ring radius={1.6} color="#7c3aed" thickness={0.006} opacity={0.3} rotation={[Math.PI / 3, 0, 0]} />
      
      {/* Orbital ring 3 */}
      <Ring radius={2.0} color="#0891b2" thickness={0.005} opacity={0.2} rotation={[Math.PI / 5, Math.PI / 4, 0]} />

      {/* Floating nodes */}
      {[0, 1, 2, 3].map((i) => (
        <FloatingNode
          key={i}
          radius={1.2}
          index={i}
          color={i % 2 === 0 ? '#4f46e5' : '#7c3aed'}
        />
      ))}
      
      {[0, 1, 2].map((i) => (
        <FloatingNode
          key={`ring2-${i}`}
          radius={1.6}
          index={i + 4}
          color={i % 2 === 0 ? '#7c3aed' : '#0891b2'}
        />
      ))}
    </group>
  )
}

function Ring({ radius, color, thickness, opacity, rotation = [0, 0, 0] as [number, number, number] }: {
  radius: number
  color: string
  thickness: number
  opacity: number
  rotation?: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.2
    }
  })
  
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, thickness, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function FloatingNode({ radius, index, color }: { radius: number; index: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const angle = (index / 4) * Math.PI * 2 + t * 0.3
    
    ref.current.position.x = Math.cos(angle) * radius
    ref.current.position.z = Math.sin(angle) * radius
    ref.current.position.y = Math.sin(t * 0.5 + index) * 0.2
    
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.y = t * 0.3
  })
  
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.08, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  )
}

// ─── Floating Particles ───────────────────────────────────────────────────────────
function FloatingParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const mouse = useMousePosition()
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = -1 - Math.random() * 3
    }
    return arr
  }, [count])
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02
      pointsRef.current.position.x = mouse.nX * 0.3
      pointsRef.current.position.y = mouse.nY * 0.2
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#4f46e5"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Main Scene ─────────────────────────────────────────────────────────────────
export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const mouse = useMousePosition()

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} color="#ffffff" intensity={0.5} />
          <pointLight position={[-5, -5, 5]} color="#4f46e5" intensity={0.3} />
          
          {/* Main 3D elements */}
          {!reducedMotion && <OrbitalSystem />}
          {!reducedMotion && <FloatingParticles count={60} />}
          
          {/* Bloom effect */}
          {!reducedMotion && (
            <EffectComposer>
              <Bloom
                luminanceThreshold={0.6}
                intensity={0.6}
                radius={0.5}
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
