'use client'

import { useRef, useState, useEffect, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PROJECTS } from '@/lib/data'
import { ArrowUpRight, Award } from 'lucide-react'
import type { Project } from '@/lib/data'
import { saveProjectTransition } from '@/lib/projectTransition'
import { getProjectTransitionTheme } from '@/lib/transitionThemes'

interface LaunchOverlayState {
  xPercent: number
  yPercent: number
}

function ProjectCard({ project, index }: {
  project: Project
  index: number
}) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const transitionTheme = getProjectTransitionTheme(project.id)
  
  const [isHovered, setIsHovered] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [launchOverlay, setLaunchOverlay] = useState<LaunchOverlayState | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useMotionValue(0), springConfig)
  const rotateY = useSpring(useMotionValue(0), springConfig)

  const handleMouseMove = (e: ReactMouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      mouseX.set(x * 12)
      mouseY.set(-y * 12)
    }
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  useEffect(() => {
    const unsubscribeX = mouseX.on('change', (v) => rotateX.set(v))
    const unsubscribeY = mouseY.on('change', (v) => rotateY.set(v))
    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [mouseX, mouseY, rotateX, rotateY])

  const triggerProjectTransition = () => {
    if (isNavigating) return

    const rect = cardRef.current?.getBoundingClientRect()
    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2

    const xPercent = (centerX / window.innerWidth) * 100
    const yPercent = (centerY / window.innerHeight) * 100

    saveProjectTransition({
      projectId: project.id,
      title: project.title,
      subtitle: project.subtitle,
      color: transitionTheme.accentText,
      xPercent,
      yPercent,
    })

    setLaunchOverlay({ xPercent, yPercent })
    setIsNavigating(true)

    const routeDelayMs = Math.max(460, Math.round(transitionTheme.launchDuration * 1000) - 30)

    window.setTimeout(() => {
      router.push(`/projects/${project.id}`)
    }, routeDelayMs)
  }

  const handleProjectKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      triggerProjectTransition()
    }
  }

  return (
    <>
      <motion.article
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`Open case study: ${project.title}`}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={triggerProjectTransition}
        onKeyDown={handleProjectKeyDown}
        className={`group cursor-hover outline-none ${isNavigating ? 'pointer-events-none' : ''}`}
      >
        <motion.div 
          className="relative rounded-3xl overflow-hidden transition-all duration-500"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            background: 'linear-gradient(145deg, rgba(15,23,42,0.86) 0%, rgba(30,41,59,0.72) 100%)',
            boxShadow: isHovered 
              ? `0 30px 70px -24px ${project.color}45, 0 0 46px ${project.color}1f` 
              : '0 18px 40px rgba(2,6,23,0.45)',
          }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            style={{
              background: `linear-gradient(135deg, ${project.color}40, ${project.color}10)`,
              filter: 'blur(1px)',
              zIndex: -1,
            }}
          />

          {/* Top color bar */}
          <div className="relative h-1.5 overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              style={{ background: project.color }}
              animate={{ 
                scaleX: isHovered ? 1 : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.6 }}
            />
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0"
              animate={{ x: isHovered ? ['-100%', '100%'] : ['0%', '0%'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
            />
          </div>

          <div className="p-10 md:p-12">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <motion.span 
                  className="text-[9px] uppercase tracking-[0.3em] font-medium mb-3 block"
                  animate={{ color: isHovered ? project.color : '#94a3b8' }}
                >
                  {project.subtitle}
                </motion.span>
                <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight">
                  {project.title}
                </h3>
              </div>
              <motion.div
                animate={{ 
                  rotate: isHovered ? 45 : 0,
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center ml-4"
                style={{
                  background: isHovered ? project.color + '20' : 'rgba(148,163,184,0.1)',
                  border: `1px solid ${isHovered ? project.color + '50' : 'rgba(148,163,184,0.28)'}`,
                }}
              >
                <ArrowUpRight size={20} style={{ color: isHovered ? project.color : '#cbd5e1' }} />
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-10 line-clamp-3">
              {project.description}
            </p>

            {/* Metrics with glow */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {project.metrics.slice(0, 4).map((metric, i) => (
                <motion.div 
                  key={i}
                  className="py-4 px-3 rounded-xl text-center"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  style={{
                    background: 'rgba(148,163,184,0.1)',
                    border: '1px solid rgba(148,163,184,0.24)',
                  }}
                >
                  <div className="text-lg font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-[9px] text-white/55 uppercase tracking-wider">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag, i) => (
                <motion.span 
                  key={tag}
                  className="px-4 py-2 text-[10px] rounded-xl font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: 'rgba(148,163,184,0.1)',
                    border: '1px solid rgba(148,163,184,0.24)',
                    color: '#e2e8f0',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Awards */}
            {project.awards && (
              <motion.div 
                className="flex items-center gap-2 mt-8 pt-6"
                style={{ borderTop: '1px solid rgba(148,163,184,0.24)' }}
                animate={{ opacity: isHovered ? 1 : 0.6 }}
              >
                <Award size={14} style={{ color: '#f59e0b' }} />
                <span className="text-[10px] text-white/65">{project.awards[0]}</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.article>

      <AnimatePresence>
        {launchOverlay && (
          <motion.div
            className="fixed inset-0 z-[1600] pointer-events-none"
            initial={{
              opacity: 0.85,
              clipPath: `circle(0% at ${launchOverlay.xPercent}% ${launchOverlay.yPercent}%)`,
            }}
            animate={{
              opacity: 1,
              clipPath: `circle(${transitionTheme.launchRadius}% at ${launchOverlay.xPercent}% ${launchOverlay.yPercent}%)`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: transitionTheme.launchDuration, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: `radial-gradient(1200px 560px at ${launchOverlay.xPercent}% ${launchOverlay.yPercent}%, ${transitionTheme.primaryGlow}, transparent 62%), radial-gradient(860px 420px at 88% 0%, ${transitionTheme.secondaryGlow}, transparent 66%), radial-gradient(780px 340px at 0% 100%, ${transitionTheme.ambientGlow}, transparent 70%), linear-gradient(135deg, ${transitionTheme.baseGradientStart} 0%, #f7faff 44%, ${transitionTheme.baseGradientEnd} 100%)`,
            }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl px-8 py-6 text-center"
              initial={{ opacity: 0.4, scale: 0.9, rotateX: 0, y: 0 }}
              animate={{
                opacity: 1,
                scale: transitionTheme.launchPose.scale,
                rotateX: transitionTheme.launchPose.rotateX,
                rotateY: transitionTheme.launchPose.rotateY,
                x: transitionTheme.launchPose.x,
                y: transitionTheme.launchPose.y,
              }}
              transition={{ duration: transitionTheme.launchDuration - 0.04, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: transitionTheme.panelBackground,
                border: `1px solid ${transitionTheme.panelBorder}`,
                boxShadow: `0 24px 70px -20px ${transitionTheme.panelShadow}`,
                transformStyle: 'preserve-3d',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-slate-600">{transitionTheme.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900" style={{ color: transitionTheme.accentText }}>
                {project.title}
              </p>
            </motion.div>

            <motion.div
              className="absolute left-0 right-0 h-px"
              style={{
                top: '58%',
                background: `linear-gradient(90deg, transparent, ${transitionTheme.panelBorder}, transparent)`,
              }}
              animate={{ x: ['-24%', '24%'], opacity: [0.24, 0.66, 0.24] }}
              transition={{ duration: transitionTheme.launchDuration + 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="work"
      ref={sectionRef}
      className="portfolio-section tone-purple relative py-32 md:py-40 lg:py-48"
      style={{ background: 'linear-gradient(180deg, #0a0f1e 0%, #0f172a 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Section header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-500 font-medium">
              03 — Case Studies
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>
          <h2 className="text-heading text-white font-semibold">
            Featured <span className="text-violet-300">Projects</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-md mx-auto">
            Real-world AI systems making impact at scale
          </p>
        </motion.div>

        {/* Projects - 2 columns grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
