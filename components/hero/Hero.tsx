'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { PERSONAL } from '@/lib/data'
import { createSeededRandom, scrambleChars } from '@/lib/utils'

const STAR_COLORS = ['#fff', '#a5b4fc', '#67e8f9', '#c4b5fd'] as const
const NETWORK_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899'] as const

interface StarParticle {
  id: number
  size: number
  left: number
  top: number
  color: string
  baseOpacity: number
  opacityLow: number
  opacityHigh: number
  duration: number
  delay: number
}

interface NeuralNode {
  id: number
  x: number
  y: number
  size: number
  color: string
  pulseDuration: number
  pulseDelay: number
}

interface NeuralConnection {
  from: number
  to: number
  duration: number
  delay: number
}

function buildStarParticles(count: number): StarParticle[] {
  const rand = createSeededRandom(20260418)
  return Array.from({ length: count }, (_, id) => {
    const opacityLow = 0.1 + rand() * 0.3
    const opacityHigh = 0.3 + rand() * 0.6
    return {
      id,
      size: 1 + rand() * 2,
      left: rand() * 100,
      top: rand() * 100,
      color: STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)],
      baseOpacity: 0.2 + rand() * 0.5,
      opacityLow,
      opacityHigh,
      duration: 2 + rand() * 3,
      delay: rand() * 5,
    }
  })
}

function buildNeuralNodes(count: number): NeuralNode[] {
  const rand = createSeededRandom(19081997)
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 4 + 2,
    color: NETWORK_COLORS[Math.floor(rand() * NETWORK_COLORS.length)],
    pulseDuration: 2 + rand() * 2,
    pulseDelay: rand() * 3,
  }))
}

function buildNeuralConnections(nodeCount: number): NeuralConnection[] {
  const rand = createSeededRandom(14022024)
  const connections: NeuralConnection[] = []

  for (let i = 0; i < nodeCount; i++) {
    const connectCount = Math.floor(rand() * 3) + 1
    for (let j = 0; j < connectCount; j++) {
      const target = Math.floor(rand() * nodeCount)
      if (target !== i) {
        connections.push({
          from: i,
          to: target,
          duration: 2 + rand() * 2,
          delay: rand() * 3,
        })
      }
    }
  }

  return connections
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nameRevealed, setNameRevealed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springMouseX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springMouseY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const stars = useMemo(() => buildStarParticles(100), [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      mouseX.set(x * 30)
      mouseY.set(y * 30)
      setMousePos({ x: e.clientX, y: e.clientY })
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    const TOTAL_MS = 1200
    const totalFrames = Math.ceil((TOTAL_MS / 1000) * 30)
    let frame = 0

    const scrambleText = () => {
      const progress = frame / totalFrames
      const revealedCount = Math.floor(progress * PERSONAL.name.length)

      const displayText = PERSONAL.name
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < revealedCount) return char
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        })
        .join('')

      const el = document.getElementById('hero-name')
      if (el) el.textContent = displayText

      frame++
      if (frame >= totalFrames + 2) {
        const finalEl = document.getElementById('hero-name')
        if (finalEl) finalEl.textContent = PERSONAL.name
        setNameRevealed(true)
      } else {
        requestAnimationFrame(scrambleText)
      }
    }

    scrambleText()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const routeToContact = (intent: 'project' | 'consulting' | 'speaking') => {
    window.dispatchEvent(new CustomEvent('portfolio:contact-intent', { detail: { intent } }))
    scrollTo('contact')
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1e1b4b 100%)' }}
    >
      {/* Deep space background with stars */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.left}%`,
              top: `${star.top}%`,
              background: star.color,
              opacity: star.baseOpacity,
            }}
            animate={{
              opacity: [star.opacityLow, star.opacityHigh, star.opacityLow],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}

        {/* Animated nebula gradients */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Neural Network SVG Background */}
      <NeuralNetwork mouseX={springMouseX} mouseY={springMouseY} />

      {/* Floating 3D-ish holographic elements */}
      <FloatingElements mouseX={springMouseX} mouseY={springMouseY} />

      <motion.div
        className="w-full px-8 md:px-16 lg:px-24 relative z-20"
        style={{ y, opacity, scale }}
      >
        <div className="max-w-[1800px] mx-auto">

          {/* THE NAME - Massive, with holographic effect */}
          <div className="relative mt-12 md:mt-16 mb-8">
            <motion.h1
              id="hero-name"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-display relative"
              style={{
                fontFamily: 'var(--font-sora, sans-serif)',
                background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 30%, #c7d2fe 50%, #a5b4fc 70%, #fff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: nameRevealed ? 'gradient-shift 4s ease infinite' : 'none',
              }}
              aria-label={PERSONAL.name}
            >
              {PERSONAL.name}
            </motion.h1>

            {/* Holographic reflection line */}
            <motion.div
              className="absolute -bottom-4 left-0 right-0 h-px"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(103,232,249,0.6), rgba(165,180,252,0.8), rgba(103,232,249,0.6), transparent)',
              }}
            />

            {/* Glow behind the name */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: -1,
              }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          {/* Tagline with typewriter-like reveal */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-2xl max-w-2xl leading-relaxed mb-16 font-light"
            style={{ color: 'rgba(226,232,240,0.85)' }}
          >
            {PERSONAL.tagline}
          </motion.p>

          {/* CTA Buttons - Glass morphism style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={() => scrollTo('work')}>
              <span
                className="px-8 py-4 text-sm font-semibold rounded-full relative z-10 flex items-center gap-2 text-white"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  boxShadow: '0 8px 32px rgba(59,130,246,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
                }}
              >
                View Projects
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </MagneticButton>

            <a
              href="/Stuti-Resume_IND.pdf"
              download
              className="px-8 py-4 text-sm font-semibold rounded-full flex items-center gap-2 transition-all cursor-hover"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download CV
            </a>

            <MagneticButton onClick={() => routeToContact('project')}>
              <span
                className="px-8 py-4 text-sm font-semibold rounded-full relative z-10 flex items-center gap-2 cursor-hover"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                Start a Project
              </span>
            </MagneticButton>
          </motion.div>

          {/* Bottom info bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-32 flex items-center gap-8"
          >
            <div className="flex items-center gap-3">
              <motion.span
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.3, 1], boxShadow: ['0 0 8px rgba(52,211,153,0.4)', '0 0 16px rgba(52,211,153,0.6)', '0 0 8px rgba(52,211,153,0.4)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-white/50 tracking-wide">Available for opportunities</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollTo('about')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3 cursor-hover"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
          <motion.svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2"
            className="text-white/40"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* Corner holographic decorations */}
      <motion.div
        className="absolute top-8 right-8 w-32 h-32 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="cornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M0 0 L100 0 L100 100" fill="none" stroke="url(#cornerGrad)" strokeWidth="0.5" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-8 w-32 h-32 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0 100 L0 0 L100 100" fill="none" stroke="url(#cornerGrad)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <RobotCompanion />
    </section>
  )
}

function RobotCompanion() {
  return (
    <motion.div
      className="hidden lg:block absolute bottom-8 right-10 xl:right-14 z-20 pointer-events-none"
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 1.2, 0, -1.2, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <svg width="190" height="220" viewBox="0 0 190 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="robotBody" x1="26" y1="58" x2="150" y2="194" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDFDFD" />
              <stop offset="0.55" stopColor="#ECEFF5" />
              <stop offset="1" stopColor="#D6DCE6" />
            </linearGradient>
            <linearGradient id="robotGold" x1="73" y1="100" x2="125" y2="164" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EAD29A" />
              <stop offset="1" stopColor="#C49B4A" />
            </linearGradient>
            <radialGradient id="visorGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(95 58) rotate(90) scale(34 56)">
              <stop stopColor="#0F1A37" />
              <stop offset="1" stopColor="#060B1B" />
            </radialGradient>
          </defs>

          <ellipse cx="95" cy="206" rx="46" ry="8" fill="#031026" fillOpacity="0.45" />

          <rect x="58" y="14" width="74" height="64" rx="26" fill="url(#robotBody)" stroke="#D7DCE7" strokeWidth="2" />
          <rect x="69" y="28" width="52" height="34" rx="15" fill="url(#visorGlow)" />

          <motion.circle
            cx="84"
            cy="46"
            r="6"
            fill="#67E8F9"
            animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <motion.circle
            cx="106"
            cy="46"
            r="6"
            fill="#67E8F9"
            animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 0.2 }}
          />

          <rect x="70" y="82" width="50" height="64" rx="16" fill="url(#robotBody)" stroke="#D7DCE7" strokeWidth="2" />
          <rect x="74" y="99" width="42" height="28" rx="12" fill="url(#robotGold)" fillOpacity="0.9" />
          <text x="95" y="118" textAnchor="middle" fill="#F8F2E1" style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-sora, sans-serif)' }}>
            G
          </text>

          <rect x="82" y="146" width="10" height="28" rx="5" fill="url(#robotGold)" />
          <rect x="98" y="146" width="10" height="28" rx="5" fill="url(#robotGold)" />

          <rect x="70" y="171" width="18" height="30" rx="8" fill="url(#robotBody)" stroke="#D7DCE7" strokeWidth="2" />
          <rect x="102" y="171" width="18" height="30" rx="8" fill="url(#robotBody)" stroke="#D7DCE7" strokeWidth="2" />

          <g>
            <rect x="40" y="90" width="14" height="44" rx="7" fill="url(#robotBody)" stroke="#D7DCE7" strokeWidth="2" />
            <circle cx="47" cy="136" r="8" fill="url(#robotBody)" stroke="#D7DCE7" strokeWidth="2" />
          </g>

          <motion.g
            animate={{ rotate: [0, 14, 0, -8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '140px 92px' }}
          >
            <rect x="136" y="86" width="14" height="38" rx="7" fill="url(#robotBody)" stroke="#D7DCE7" strokeWidth="2" />
            <circle cx="143" cy="126" r="8" fill="url(#robotBody)" stroke="#D7DCE7" strokeWidth="2" />
          </motion.g>
        </svg>

        <motion.div
          className="absolute right-2 top-2 text-[10px] uppercase tracking-[0.26em] text-cyan-200/70"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          AI Buddy
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function NeuralNetwork({ mouseX, mouseY }: {
  mouseX: ReturnType<typeof useSpring>
  mouseY: ReturnType<typeof useSpring>
}) {
  const nodes = useMemo(() => buildNeuralNodes(25), [])
  const connections = useMemo(() => buildNeuralConnections(nodes.length), [nodes.length])

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated connections */}
        {connections.map((conn, i) => {
          const from = nodes[conn.from]
          const to = nodes[conn.to]
          return (
            <motion.line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke={`url(#lineGrad${i % 4})`}
              strokeWidth="0.08"
              strokeOpacity="0.3"
              filter="url(#glow)"
              animate={{
                strokeOpacity: [0.15, 0.4, 0.15],
              }}
              transition={{
                duration: conn.duration,
                repeat: Infinity,
                delay: conn.delay,
              }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size / 10}
            fill={node.color}
            filter="url(#glow)"
            animate={{
              r: [node.size / 10, node.size / 8, node.size / 10],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: node.pulseDuration,
              repeat: Infinity,
              delay: node.pulseDelay,
            }}
            style={{ x: mouseX, y: mouseY }}
          />
        ))}

        <defs>
          {[...Array(4)].map((_, i) => (
            <linearGradient key={i} id={`lineGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899'][i]} stopOpacity="0.5" />
              <stop offset="100%" stopColor={['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899'][i]} stopOpacity="0.1" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </motion.div>
  )
}

function FloatingElements({ mouseX, mouseY }: {
  mouseX: ReturnType<typeof useSpring>
  mouseY: ReturnType<typeof useSpring>
}) {
  const elements = useMemo(() => [
    { size: 60, x: '15%', y: '20%', color: '#3b82f6', delay: 0 },
    { size: 40, x: '80%', y: '15%', color: '#8b5cf6', delay: 1 },
    { size: 50, x: '75%', y: '70%', color: '#06b6d4', delay: 2 },
    { size: 35, x: '10%', y: '65%', color: '#ec4899', delay: 0.5 },
    { size: 45, x: '85%', y: '45%', color: '#f59e0b', delay: 1.5 },
  ], [])

  return (
    <>
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
            zIndex: 3,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: el.delay,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${el.color}40, ${el.color}10, transparent)`,
              border: `1px solid ${el.color}30`,
              boxShadow: `0 0 40px ${el.color}20, inset 0 0 20px ${el.color}10`,
            }}
          />
        </motion.div>
      ))}
    </>
  )
}

function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) * 0.4
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4
      setPosition({ x, y })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
    setIsHovering(false)
  }, [])

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative group cursor-hover"
    >
      {children}
      {isHovering && (
        <motion.div
          className="absolute inset-0 rounded-full"
          layoutId="heroGlow"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
            filter: 'blur(25px)',
            zIndex: -1,
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}