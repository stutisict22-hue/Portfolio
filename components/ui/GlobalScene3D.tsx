'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useMediaQuery'

interface NodeData {
  id: number
  basePosition: [number, number, number]
  color: string
  size: number
  speed: number
  phase: number
}

function NeuralNetwork({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null)
  const lineRefs = useRef<THREE.Line[]>([])

  const nodes: NodeData[] = useMemo(() => {
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b']
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      basePosition: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 5,
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 0.08 + Math.random() * 0.12,
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [])

  const connections = useMemo(() => {
    const conns: Array<{ from: number; to: number; opacity: number }> = []
    for (let i = 0; i < nodes.length; i++) {
      const connectCount = 2 + Math.floor(Math.random() * 3)
      for (let j = 0; j < connectCount; j++) {
        const target = Math.floor(Math.random() * nodes.length)
        if (target !== i && !conns.find(c => (c.from === i && c.to === target) || (c.from === target && c.to === i))) {
          conns.push({ from: i, to: target, opacity: 0.2 + Math.random() * 0.3 })
        }
      }
    }
    return conns
  }, [nodes])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05
    }

    // Animate line opacities
    lineRefs.current.forEach((line, i) => {
      if (line && line.material) {
        const material = line.material as THREE.LineBasicMaterial
        const baseOpacity = connections[i]?.opacity || 0.2
        material.opacity = baseOpacity * (0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 0.5 + i * 0.1))
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <Float key={node.id} speed={node.speed * 2} rotationIntensity={0.1} floatIntensity={0.3}>
          <Sphere args={[node.size, 16, 16]} position={node.basePosition}>
            <meshBasicMaterial color={node.color} transparent opacity={0.7} />
          </Sphere>
          {/* Glow sphere */}
          <Sphere args={[node.size * 3, 8, 8]} position={node.basePosition}>
            <meshBasicMaterial color={node.color} transparent opacity={0.1} />
          </Sphere>
        </Float>
      ))}

      {/* Connections */}
      {connections.map((conn, i) => {
        const from = nodes[conn.from]
        const to = nodes[conn.to]
        const points = [
          new THREE.Vector3(...from.basePosition),
          new THREE.Vector3(...to.basePosition),
        ]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        return (
          <line key={i} ref={(el) => { if (el) lineRefs.current[i] = el as unknown as THREE.Line }}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial
              attach="material"
              color="#3b82f6"
              transparent
              opacity={conn.opacity}
              blending={THREE.AdditiveBlending}
            />
          </line>
        )
      })}
    </group>
  )
}

function FloatingOrbs() {
  const orbsRef = useRef<THREE.Group>(null)

  const orbs = useMemo(() => [
    { position: [-4, 2, -6] as [number, number, number], color: '#3b82f6', scale: 0.4, speed: 1.2 },
    { position: [5, -1, -5] as [number, number, number], color: '#8b5cf6', scale: 0.35, speed: 1.5 },
    { position: [-3, -3, -7] as [number, number, number], color: '#06b6d4', scale: 0.25, speed: 1.8 },
    { position: [4, 3, -8] as [number, number, number], color: '#ec4899', scale: 0.3, speed: 1.3 },
    { position: [0, 1, -9] as [number, number, number], color: '#f59e0b', scale: 0.5, speed: 1 },
  ], [])

  useFrame(({ clock }) => {
    if (orbsRef.current) {
      orbsRef.current.rotation.y = clock.getElapsedTime() * 0.025
      orbsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.015) * 0.08
    }
  })

  return (
    <group ref={orbsRef}>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.3} floatIntensity={0.6}>
          <Sphere args={[orb.scale, 32, 32]} position={orb.position}>
            <MeshDistortMaterial
              color={orb.color}
              speed={2.5}
              distort={0.4}
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={0.5}
            />
          </Sphere>
          {/* Glow */}
          <Sphere args={[orb.scale * 2.5, 16, 16]} position={orb.position}>
            <meshBasicMaterial color={orb.color} transparent opacity={0.08} />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree()

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.015
    camera.position.y += (-mouse.current.y * 0.8 - camera.position.y) * 0.015
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#fff" />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.4} />
      <pointLight position={[0, 0, 5]} color="#3b82f6" intensity={0.5} />

      <NeuralNetwork mouse={mouse} />
      <FloatingOrbs />
    </>
  )
}

export default function GlobalScene3D() {
  const reducedMotion = useReducedMotion()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const mouseRef = useRef(mouse)
  mouseRef.current = mouse

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (reducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ background: 'transparent' }}
      >
        <Scene mouse={mouseRef} />
      </Canvas>

      {/* Gradient overlays for depth and blending */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(10,15,30,0.4) 0%, transparent 20%, transparent 70%, rgba(10,15,30,0.6) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(10,15,30,0.5) 100%)',
        }}
      />
    </div>
  )
}