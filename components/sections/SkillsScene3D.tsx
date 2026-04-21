'use client'

import { useRef, useMemo, useState, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Text,
  Float,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Sparkles,
  Trail,
  Stars,
  OrbitControls,
} from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { SKILL_SPHERE_NODES, SKILLS } from '@/lib/data'

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOM SHADERS
// ═══════════════════════════════════════════════════════════════════════════════

const coreVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    // Morphing displacement
    vec3 pos = position;
    float displacement = sin(pos.x * 3.0 + uTime) * sin(pos.y * 3.0 + uTime) * sin(pos.z * 3.0 + uTime) * 0.15;
    pos += normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const coreFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  void main() {
    // Fresnel effect
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);

    // Animated gradient
    float gradient = sin(vPosition.y * 2.0 + uTime * 0.5) * 0.5 + 0.5;
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;

    // Color mixing
    vec3 color = mix(uColor1, uColor2, gradient);
    color = mix(color, uColor3, fresnel * 0.8);

    // Energy lines
    float lines = sin(vPosition.y * 20.0 + uTime * 3.0) * 0.5 + 0.5;
    lines = smoothstep(0.4, 0.6, lines);
    color += vec3(lines * 0.3 * pulse);

    // Glow intensity
    float glow = fresnel * 2.0 + pulse * 0.5;

    gl_FragColor = vec4(color, 0.9);
  }
`

const ringVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;
    float wave = sin(uv.x * 20.0 + uTime * 2.0) * 0.02;
    pos.z += wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const ringFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    float alpha = sin(vUv.x * 50.0 + uTime * 3.0) * 0.3 + 0.7;
    alpha *= uOpacity;

    // Energy pulse traveling along ring
    float pulse = sin(vUv.x * 6.28 - uTime * 4.0) * 0.5 + 0.5;
    pulse = smoothstep(0.3, 0.7, pulse);

    vec3 color = uColor + vec3(pulse * 0.5);

    gl_FragColor = vec4(color, alpha * 0.6);
  }
`

// ═══════════════════════════════════════════════════════════════════════════════
// ENERGY CORE - Central pulsing orb
// ═══════════════════════════════════════════════════════════════════════════════

function EnergyCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#4f46e5') },
    uColor2: { value: new THREE.Color('#7c3aed') },
    uColor3: { value: new THREE.Color('#00d4ff') },
  }), [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group>
      {/* Main core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 4]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh scale={0.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#4f46e5"
          emissiveIntensity={2}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer glow */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#4f46e5"
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Sparkles around core */}
      <Sparkles
        count={100}
        scale={3}
        size={2}
        speed={0.5}
        color="#00d4ff"
      />
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ORBITAL RING - Skills orbit on rings
// ═══════════════════════════════════════════════════════════════════════════════

function OrbitalRing({
  radius,
  color,
  rotationSpeed,
  tilt,
  skills,
  onSkillHover,
  hoveredSkill,
}: {
  radius: number
  color: string
  rotationSpeed: number
  tilt: [number, number, number]
  skills: string[]
  onSkillHover: (skill: string | null) => void
  hoveredSkill: string | null
}) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
    uOpacity: { value: 0.4 },
  }), [color])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <group ref={groupRef} rotation={tilt}>
      {/* Ring mesh */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Skill nodes on ring */}
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const isHovered = hoveredSkill === skill

        return (
          <SkillNode
            key={skill}
            position={[x, 0, z]}
            label={skill}
            color={color}
            isHovered={isHovered}
            onHover={onSkillHover}
          />
        )
      })}
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SKILL NODE - Individual skill with 3D effects
// ═══════════════════════════════════════════════════════════════════════════════

function SkillNode({
  position,
  label,
  color,
  isHovered,
  onHover,
}: {
  position: [number, number, number]
  label: string
  color: string
  isHovered: boolean
  onHover: (skill: string | null) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hoverScale, setHoverScale] = useState(1)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()
      const targetScale = isHovered ? 1.8 : 1
      setHoverScale(prev => prev + (targetScale - prev) * 0.1)

      meshRef.current.rotation.x = t * 0.5
      meshRef.current.rotation.y = t * 0.7
      meshRef.current.scale.setScalar(hoverScale)

      // Floating effect
      meshRef.current.position.y = Math.sin(t * 2) * 0.05
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        {/* Skill crystal */}
        <Trail
          width={isHovered ? 1 : 0.5}
          length={6}
          color={new THREE.Color(color)}
          attenuation={(w) => w * w}
        >
          <mesh
            ref={meshRef}
            onPointerEnter={() => onHover(label)}
            onPointerLeave={() => onHover(null)}
          >
            <octahedronGeometry args={[0.12, 0]} />
            <MeshTransmissionMaterial
              color={color}
              transmission={0.9}
              thickness={0.5}
              roughness={0.1}
              chromaticAberration={0.5}
              anisotropy={0.5}
              distortion={0.2}
              distortionScale={0.5}
              temporalDistortion={0.1}
              backside
            />
          </mesh>
        </Trail>

        {/* Glow sphere */}
        <mesh scale={isHovered ? 0.3 : 0.15}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isHovered ? 0.4 : 0.2}
          />
        </mesh>

        {/* Label */}
        <Text
          position={[0, 0.25, 0]}
          fontSize={isHovered ? 0.12 : 0.08}
          color={isHovered ? '#ffffff' : color}
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.01}
          outlineColor="#000000"
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        >
          {label}
        </Text>
      </group>
    </Float>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEURAL NETWORK - Connecting lines between skills
// ═══════════════════════════════════════════════════════════════════════════════

function NeuralNetwork() {
  const linesRef = useRef<THREE.LineSegments>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const { positions, connections } = useMemo(() => {
    const pos: THREE.Vector3[] = []
    const conn: THREE.Vector3[] = []

    // Generate random nodes
    for (let i = 0; i < 50; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 4 + Math.random() * 2

      pos.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ))
    }

    // Connect nearby nodes
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        if (pos[i].distanceTo(pos[j]) < 2) {
          conn.push(pos[i].clone())
          conn.push(pos[j].clone())
        }
      }
    }

    return { positions: pos, connections: conn }
  }, [])

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(connections)
  }, [connections])

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(positions.length * 3)
    positions.forEach((p, i) => {
      arr[i * 3] = p.x
      arr[i * 3 + 1] = p.y
      arr[i * 3 + 2] = p.z
    })
    return arr
  }, [positions])

  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.getElapsedTime() * 0.02
      linesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <group>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#4f46e5" transparent opacity={0.1} />
      </lineSegments>

      {/* Node particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7c3aed"
          size={0.05}
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FLOATING PARTICLES - Ambient particles
// ═══════════════════════════════════════════════════════════════════════════════

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 500

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15

      vel[i * 3] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    }

    return [pos, vel]
  }, [])

  useFrame(() => {
    if (!particlesRef.current) return

    const positionAttr = particlesRef.current.geometry.attributes.position
    const arr = positionAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3]
      arr[i * 3 + 1] += velocities[i * 3 + 1]
      arr[i * 3 + 2] += velocities[i * 3 + 2]

      // Boundary wrap
      for (let j = 0; j < 3; j++) {
        if (arr[i * 3 + j] > 7.5) arr[i * 3 + j] = -7.5
        if (arr[i * 3 + j] < -7.5) arr[i * 3 + j] = 7.5
      }
    }

    positionAttr.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00d4ff"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SKILL INFO PANEL - 3D floating info panel
// ═══════════════════════════════════════════════════════════════════════════════

function SkillInfoPanel({ skill }: { skill: string | null }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [opacity, setOpacity] = useState(0)

  const skillData = useMemo(() => {
    if (!skill) return null
    return SKILLS.find(s => s.name.toLowerCase().includes(skill.toLowerCase()))
  }, [skill])

  useFrame(() => {
    const targetOpacity = skill ? 1 : 0
    setOpacity(prev => prev + (targetOpacity - prev) * 0.1)

    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.05
    }
  })

  if (opacity < 0.01) return null

  return (
    <group position={[3.5, 1.5, 0]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[2.5, 1.2]} />
        <meshBasicMaterial
          color="#0d0d14"
          transparent
          opacity={opacity * 0.9}
        />
      </mesh>

      {/* Border glow */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.6, 1.3]} />
        <meshBasicMaterial
          color="#4f46e5"
          transparent
          opacity={opacity * 0.3}
        />
      </mesh>

      {/* Skill name */}
      <Text
        position={[0, 0.35, 0.01]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        material-transparent
        material-opacity={opacity}
      >
        {skill || ''}
      </Text>

      {/* Level bar background */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2, 0.1]} />
        <meshBasicMaterial
          color="#1a1a2e"
          transparent
          opacity={opacity * 0.8}
        />
      </mesh>

      {/* Level bar fill */}
      {skillData && (
        <mesh position={[(skillData.level - 100) / 100, 0, 0.02]}>
          <planeGeometry args={[skillData.level / 50, 0.08]} />
          <meshBasicMaterial
            color="#4f46e5"
            transparent
            opacity={opacity}
          />
        </mesh>
      )}

      {/* Level text */}
      <Text
        position={[0, -0.35, 0.01]}
        fontSize={0.12}
        color="#7c3aed"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        material-transparent
        material-opacity={opacity}
      >
        {skillData ? `Proficiency: ${skillData.level}%` : ''}
      </Text>
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SCENE
// ═══════════════════════════════════════════════════════════════════════════════

function Scene() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  // Distribute skills across rings
  const aiSkills = SKILL_SPHERE_NODES.slice(0, 8)
  const devSkills = SKILL_SPHERE_NODES.slice(8, 16)
  const cloudSkills = SKILL_SPHERE_NODES.slice(16, 24)
  const otherSkills = SKILL_SPHERE_NODES.slice(24)

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#4f46e5" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[0, 5, -5]} intensity={1} color="#00d4ff" />

      {/* Central energy core */}
      <EnergyCore />

      {/* Orbital rings with skills */}
      <OrbitalRing
        radius={2}
        color="#4f46e5"
        rotationSpeed={0.15}
        tilt={[0.3, 0, 0]}
        skills={aiSkills}
        onSkillHover={setHoveredSkill}
        hoveredSkill={hoveredSkill}
      />
      <OrbitalRing
        radius={2.8}
        color="#7c3aed"
        rotationSpeed={-0.1}
        tilt={[-0.2, 0.3, 0]}
        skills={devSkills}
        onSkillHover={setHoveredSkill}
        hoveredSkill={hoveredSkill}
      />
      <OrbitalRing
        radius={3.5}
        color="#0891b2"
        rotationSpeed={0.08}
        tilt={[0.1, -0.2, 0.1]}
        skills={cloudSkills}
        onSkillHover={setHoveredSkill}
        hoveredSkill={hoveredSkill}
      />
      <OrbitalRing
        radius={4.2}
        color="#059669"
        rotationSpeed={-0.06}
        tilt={[-0.1, 0.1, -0.2]}
        skills={otherSkills}
        onSkillHover={setHoveredSkill}
        hoveredSkill={hoveredSkill}
      />

      {/* Neural network background */}
      <NeuralNetwork />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Background stars */}
      <Stars
        radius={50}
        depth={50}
        count={2000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />

      {/* Skill info panel */}
      <SkillInfoPanel skill={hoveredSkill} />

      {/* Orbit controls for interactivity */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.002, 0.002)}
        />
        <Vignette
          offset={0.3}
          darkness={0.6}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function SkillsScene3D() {
  return (
    <div
      className="w-full h-full min-h-[600px]"
      style={{ cursor: 'grab' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
