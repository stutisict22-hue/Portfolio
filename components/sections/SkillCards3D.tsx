'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, RoundedBox, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { SKILLS } from '@/lib/data'

// ═══════════════════════════════════════════════════════════════════════════════
// HOLOGRAPHIC SKILL CARD
// ═══════════════════════════════════════════════════════════════════════════════

const hologramVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const hologramFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uLevel;
  uniform float uHovered;
  uniform float uSelected;

  void main() {
    // Scanline effect
    float scanline = sin(vUv.y * 100.0 + uTime * 5.0) * 0.03 + 0.97;

    // Fresnel glow
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

    // Progress fill (from bottom)
    float fill = step(vUv.y, uLevel);
    float fillGlow = smoothstep(uLevel - 0.1, uLevel, vUv.y) * (1.0 - step(uLevel, vUv.y));

    // Base color with scanlines
    vec3 color = uColor * scanline;

    // Add fill coloring
    color = mix(color * 0.3, color * 1.5, fill);

    // Glitch effect
    float glitch = step(0.99, sin(uTime * 50.0 + vUv.x * 100.0)) * 0.1;
    color += vec3(glitch);

    // Edge glow
    float edge = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
    edge *= smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);

    // Hover/Select enhancement
    float enhance = mix(1.0, 1.5, uHovered) * mix(1.0, 1.8, uSelected);
    color *= enhance;

    // Fresnel edge lighting
    color += uColor * fresnel * 0.5 * enhance;

    // Fill line glow
    color += uColor * fillGlow * 2.0;

    // Alpha
    float alpha = 0.4 + fill * 0.3 + fresnel * 0.3;
    alpha *= mix(0.7, 1.0, uHovered);
    alpha *= edge * 0.5 + 0.5;

    gl_FragColor = vec4(color, alpha);
  }
`

// ═══════════════════════════════════════════════════════════════════════════════
// INDIVIDUAL SKILL CARD 3D
// ═══════════════════════════════════════════════════════════════════════════════

function SkillCard3D({
  skill,
  index,
  position,
  color,
  isHovered,
  isSelected,
  onHover,
  onClick,
}: {
  skill: { name: string; level: number; category: string }
  index: number
  position: [number, number, number]
  color: string
  isHovered: boolean
  isSelected: boolean
  onHover: (name: string | null) => void
  onClick: (name: string) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
    uLevel: { value: skill.level / 100 },
    uHovered: { value: 0 },
    uSelected: { value: 0 },
  }), [color, skill.level])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t
      materialRef.current.uniforms.uHovered.value += ((isHovered ? 1 : 0) - materialRef.current.uniforms.uHovered.value) * 0.1
      materialRef.current.uniforms.uSelected.value += ((isSelected ? 1 : 0) - materialRef.current.uniforms.uSelected.value) * 0.1
    }

    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5 + index * 0.5) * 0.05

      // Subtle rotation on hover
      const targetRotY = isHovered ? 0.1 : 0
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.1

      // Scale on hover
      const targetScale = isHovered ? 1.1 : 1
      groupRef.current.scale.setScalar(groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * 0.1)
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => onHover(skill.name)}
      onPointerLeave={() => onHover(null)}
      onClick={() => onClick(skill.name)}
    >
      {/* Card background */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2.2, 0.5]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={hologramVertexShader}
          fragmentShader={hologramFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Glowing border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.25, 0.55]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Skill name */}
      <Text
        position={[-0.9, 0.08, 0.01]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
      >
        {skill.name}
      </Text>

      {/* Level percentage */}
      <Text
        position={[0.95, 0.08, 0.01]}
        fontSize={0.12}
        color={color}
        anchorX="right"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
      >
        {skill.level}%
      </Text>

      {/* Progress bar background */}
      <mesh position={[0, -0.12, 0.005]}>
        <planeGeometry args={[1.9, 0.08]} />
        <meshBasicMaterial color="#1a1a2e" transparent opacity={0.8} />
      </mesh>

      {/* Progress bar fill */}
      <mesh position={[-0.95 + (skill.level / 100) * 0.95, -0.12, 0.01]}>
        <planeGeometry args={[(skill.level / 100) * 1.9, 0.06]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      {/* Animated glow pulse on progress */}
      <mesh position={[-0.95 + (skill.level / 100) * 1.9, -0.12, 0.015]}>
        <planeGeometry args={[0.05, 0.1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered ? 0.8 : 0.4}
        />
      </mesh>

      {/* Corner decorations */}
      {[[-1.05, 0.2], [1.05, 0.2], [-1.05, -0.2], [1.05, -0.2]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.01]}>
          <circleGeometry args={[0.02, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORY HEADER 3D
// ═══════════════════════════════════════════════════════════════════════════════

function CategoryHeader3D({
  label,
  color,
  position,
}: {
  label: string
  color: string
  position: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.02
    }
  })

  return (
    <group position={position} ref={meshRef}>
      {/* Category icon/dot */}
      <mesh position={[-1.3, 0, 0]}>
        <octahedronGeometry args={[0.08, 0]} />
        <MeshTransmissionMaterial
          color={color}
          transmission={0.8}
          thickness={0.3}
          roughness={0.1}
          chromaticAberration={0.3}
        />
      </mesh>

      {/* Category label */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.14}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        letterSpacing={0.1}
      >
        {label.toUpperCase()}
      </Text>

      {/* Decorative line */}
      <mesh position={[0, -0.15, 0]}>
        <planeGeometry args={[2.8, 0.005]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// BACKGROUND PARTICLES
// ═══════════════════════════════════════════════════════════════════════════════

function BackgroundParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 200

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02
    }
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
        color="#4f46e5"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SKILLS CARDS SCENE
// ═══════════════════════════════════════════════════════════════════════════════

const CATEGORIES = [
  { id: 'ai', label: 'AI & Generative AI', color: '#4f46e5' },
  { id: 'data', label: 'Data & ML', color: '#7c3aed' },
  { id: 'dev', label: 'Development', color: '#0891b2' },
  { id: 'cloud', label: 'Cloud & DevOps', color: '#059669' },
] as const

function SkillsCardsScene() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#4f46e5" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#7c3aed" />

      <BackgroundParticles />

      {CATEGORIES.map((category, catIndex) => {
        const categorySkills = SKILLS.filter(s => s.category === category.id)
        const startY = 2.5 - catIndex * 2.5

        return (
          <group key={category.id}>
            <CategoryHeader3D
              label={category.label}
              color={category.color}
              position={[0, startY + 0.7, 0]}
            />

            {categorySkills.map((skill, skillIndex) => (
              <SkillCard3D
                key={skill.name}
                skill={skill}
                index={catIndex * 10 + skillIndex}
                position={[0, startY - skillIndex * 0.6, 0]}
                color={category.color}
                isHovered={hoveredSkill === skill.name}
                isSelected={selectedSkill === skill.name}
                onHover={setHoveredSkill}
                onClick={setSelectedSkill}
              />
            ))}
          </group>
        )
      })}

      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function SkillCards3D({ height = 800 }: { height?: number }) {
  return (
    <div className="w-full" style={{ height: `${height}px`, cursor: 'pointer' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <SkillsCardsScene />
      </Canvas>
    </div>
  )
}
