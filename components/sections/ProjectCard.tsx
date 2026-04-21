'use client'

import { useRef, MouseEvent, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Award, Sparkles } from 'lucide-react'
import type { Project } from '@/lib/data'

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

// Particle effect for hover
function HoverParticles({ active, color }: { active: boolean; color: string }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
      }))
      setParticles(newParticles)
    } else {
      setParticles([])
    }
  }, [active])

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -30],
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: 2,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </AnimatePresence>
  )
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const innerGlowRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  // Enhanced 3D tilt effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glow = glowRef.current
    const innerGlow = innerGlowRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // More dramatic tilt
    const rotateX = -(y - centerY) / 15
    const rotateY = (x - centerX) / 15

    // Calculate distance from center for intensity
    const distanceFromCenter = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    )
    const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2))
    const intensity = 1 - (distanceFromCenter / maxDistance) * 0.3

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(20px)
      scale(${1 + intensity * 0.02})
    `

    // Update mouse position for particles
    setMousePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })

    if (glow) {
      const percentX = (x / rect.width) * 100
      const percentY = (y / rect.height) * 100
      glow.style.background = `
        radial-gradient(circle at ${percentX}% ${percentY}%, ${project.color}40 0%, transparent 50%),
        radial-gradient(circle at ${percentX}% ${percentY}%, ${project.color}20 0%, transparent 70%)
      `
      glow.style.opacity = '1'
    }

    if (innerGlow) {
      const percentX = (x / rect.width) * 100
      const percentY = (y / rect.height) * 100
      innerGlow.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, ${project.color}15 0%, transparent 40%)`
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    const glow = glowRef.current
    setIsHovered(false)

    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
      card.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease'
      card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'
    }

    if (glow) {
      glow.style.opacity = '0'
    }
  }

  const handleMouseEnter = () => {
    const card = cardRef.current
    setIsHovered(true)

    if (card) {
      card.style.transition = 'transform 0.12s ease-out'
      card.style.boxShadow = `
        0 25px 50px -12px rgba(0,0,0,0.15),
        0 0 0 1px ${project.color}30,
        0 0 60px ${project.color}25,
        inset 0 1px 0 rgba(255,255,255,0.1)
      `
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{
        delay: index * 0.12,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${project.title} project details`}
      className="group cursor-pointer focus:outline-none"
      style={{ display: 'block', perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative overflow-hidden h-full"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
          border: '1px solid rgba(15,23,42,0.08)',
          borderRadius: '16px',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease, border-color 0.3s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        }}
      >
        {/* Animated border gradient */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${project.color}30, transparent 50%, ${project.color}20)`,
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
          }}
        />

        {/* Outer glow overlay (follows cursor) */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 opacity-0"
          style={{ borderRadius: '16px' }}
        />

        {/* Inner subtle glow */}
        <div
          ref={innerGlowRef}
          className="absolute inset-0 pointer-events-none z-0 transition-all duration-500"
          style={{ borderRadius: '16px' }}
        />

        {/* Hover particles */}
        <HoverParticles active={isHovered} color={project.color} />

        {/* Animated color strip at top */}
        <div className="relative h-[4px] w-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}, ${project.color}88, ${project.color}, transparent)`,
            }}
            animate={{
              x: isHovered ? ['0%', '100%'] : '0%',
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: 'linear',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, ${project.color}, ${project.color}55, transparent)`,
            }}
          />
        </div>

        {/* Floating 3D elements (decorative) */}
        <div
          className="absolute top-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: 'translateZ(40px)' }}
        >
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity },
            }}
          >
            <Sparkles
              size={16}
              style={{
                color: project.color,
                filter: `drop-shadow(0 0 8px ${project.color})`,
              }}
            />
          </motion.div>
        </div>

        {/* Card content */}
        <div
          className="relative z-10 p-6 md:p-8"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <motion.span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    color: project.color,
                    background: `${project.color}15`,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
                <span className="text-xs tracking-wider uppercase font-medium" style={{ color: '#a0a0b0' }}>
                  {project.year}
                </span>
              </div>
              <h3
                className="font-bold mb-1 transition-all duration-300"
                style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                  letterSpacing: '-0.02em',
                  color: '#0d0d14',
                  fontFamily: 'var(--font-sora, sans-serif)',
                  textShadow: isHovered ? `0 0 30px ${project.color}30` : 'none',
                }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm font-medium transition-colors duration-300"
                style={{ color: isHovered ? project.color : '#888898' }}
              >
                {project.subtitle}
              </p>
            </div>

            {/* Animated arrow icon */}
            <motion.div
              className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg"
              style={{
                border: `1px solid ${isHovered ? project.color : 'rgba(15,23,42,0.08)'}`,
                background: isHovered ? `${project.color}15` : 'transparent',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: `0 0 20px ${project.color}40`,
              }}
            >
              <motion.div
                animate={{
                  x: isHovered ? 2 : 0,
                  y: isHovered ? -2 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowUpRight
                  size={16}
                  style={{
                    color: isHovered ? project.color : '#888898',
                    transition: 'color 0.3s ease',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#44445a' }}>
            {project.description}
          </p>

          {/* Enhanced Metrics with 3D effect */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {project.metrics.slice(0, 4).map((metric, i) => (
              <motion.div
                key={i}
                className="px-3 py-2.5 rounded-lg relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,23,42,0.03) 0%, rgba(15,23,42,0.06) 100%)',
                  border: '1px solid rgba(15,23,42,0.06)',
                }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: `0 8px 20px ${project.color}15`,
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {/* Subtle gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}08 0%, transparent 100%)`,
                  }}
                />
                <div
                  className="text-sm font-bold tabular-nums relative z-10"
                  style={{ color: project.color, letterSpacing: '-0.01em' }}
                >
                  {metric.value}
                </div>
                <div className="text-xs relative z-10" style={{ color: '#b0b0c0' }}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Tags with hover effects */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 5).map((tag, i) => (
              <motion.span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-md font-medium"
                style={{
                  background: 'rgba(15,23,42,0.04)',
                  color: '#64748b',
                  border: '1px solid transparent',
                }}
                whileHover={{
                  background: `${project.color}15`,
                  color: project.color,
                  borderColor: `${project.color}30`,
                  scale: 1.05,
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Awards with enhanced styling */}
          {project.awards && project.awards.length > 0 && (
            <motion.div
              className="flex items-center gap-2 pt-4 relative"
              style={{ borderTop: '1px solid rgba(15,23,42,0.06)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{
                  rotate: isHovered ? [0, -10, 10, 0] : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <Award
                  size={14}
                  style={{
                    color: '#d97706',
                    filter: isHovered ? 'drop-shadow(0 0 8px #d97706)' : 'none',
                  }}
                />
              </motion.div>
              <span
                className="text-xs font-medium"
                style={{
                  color: '#d97706',
                  textShadow: isHovered ? '0 0 10px rgba(217,119,6,0.3)' : 'none',
                }}
              >
                {project.awards[0]}
              </span>
            </motion.div>
          )}
        </div>

        {/* Bottom gradient line animation */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <motion.div
            className="h-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
              width: '200%',
            }}
            animate={{
              x: isHovered ? ['-50%', '0%'] : '-50%',
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: 'linear',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
