'use client'

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Award, Calendar, MapPin, ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/lib/data'
import ImageGallery from '@/components/projects/ImageGallery'
import VideoPlayer from '@/components/projects/VideoPlayer'
import RouteNavigation from '@/components/nav/RouteNavigation'
import { consumeProjectTransition, saveProjectTransition, type ProjectTransitionPayload } from '@/lib/projectTransition'
import { getProjectTransitionTheme } from '@/lib/transitionThemes'

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const [entryTransition, setEntryTransition] = useState<ProjectTransitionPayload | null>(null)

  const project = PROJECTS.find((p) => p.id === projectId)
  const transitionTheme = getProjectTransitionTheme(projectId)

  useEffect(() => {
    window.scrollTo(0, 0)
    setEntryTransition(consumeProjectTransition(projectId))
  }, [projectId])

  useEffect(() => {
    if (!entryTransition) return

    const timer = window.setTimeout(() => {
      setEntryTransition(null)
    }, Math.round(transitionTheme.entryDuration * 1000) + 180)

    return () => window.clearTimeout(timer)
  }, [entryTransition, transitionTheme.entryDuration])

  const navigateToProject = (nextProjectId: string, event?: ReactMouseEvent<HTMLElement>) => {
    const targetProject = PROJECTS.find((item) => item.id === nextProjectId)
    const rect = event?.currentTarget.getBoundingClientRect()

    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2

    saveProjectTransition({
      projectId: nextProjectId,
      title: targetProject?.title ?? 'Project',
      subtitle: targetProject?.subtitle ?? 'Case Study',
      color: targetProject ? getProjectTransitionTheme(targetProject.id).accentText : '#0284c7',
      xPercent: (centerX / window.innerWidth) * 100,
      yPercent: (centerY / window.innerHeight) * 100,
    })

    router.push(`/projects/${nextProjectId}`)
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050505' }}>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-4">Project not found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl text-sm font-medium text-white"
            style={{ background: '#3b82f6' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const galleryImages: { src: string; alt: string; caption?: string }[] = project.gallery 
    ? project.gallery.map(img => ({ src: img.src, alt: img.alt, caption: img.caption }))
    : [{ src: project.image, alt: `${project.title} - Main View`, caption: project.subtitle }]

  return (
    <div className="portfolio-route-page">
      <AnimatePresence>
        {entryTransition && (
          <motion.div
            className="fixed inset-0 z-[1650] pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: `circle(${transitionTheme.entryRadius}% at ${entryTransition.xPercent}% ${entryTransition.yPercent}%)` }}
              animate={{ clipPath: `circle(0% at ${entryTransition.xPercent}% ${entryTransition.yPercent}%)` }}
              transition={{ duration: transitionTheme.entryDuration, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: `radial-gradient(920px 520px at ${entryTransition.xPercent}% ${entryTransition.yPercent}%, ${transitionTheme.primaryGlow}, transparent 62%), radial-gradient(860px 420px at 88% 0%, ${transitionTheme.secondaryGlow}, transparent 66%), radial-gradient(780px 340px at 0% 100%, ${transitionTheme.ambientGlow}, transparent 70%), linear-gradient(138deg, ${transitionTheme.baseGradientStart} 0%, #f8fbff 44%, ${transitionTheme.baseGradientEnd} 100%)`,
              }}
            />

            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl px-10 py-8 text-center"
              initial={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: transitionTheme.entryExitPose.scale,
                rotateX: transitionTheme.entryExitPose.rotateX,
                rotateY: transitionTheme.entryExitPose.rotateY,
                x: transitionTheme.entryExitPose.x,
                y: transitionTheme.entryExitPose.y,
              }}
              transition={{ duration: transitionTheme.entryDuration, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: transitionTheme.panelBackground,
                border: `1px solid ${transitionTheme.panelBorder}`,
                boxShadow: `0 32px 74px -22px ${transitionTheme.panelShadow}`,
                transformStyle: 'preserve-3d',
                transformPerspective: '1300px',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-500">{transitionTheme.label}</p>
              <p className="mt-2 text-base font-semibold" style={{ color: transitionTheme.accentText }}>
                {entryTransition.title}
              </p>
              <p className="mt-1 text-xs text-slate-500">{entryTransition.subtitle}</p>
            </motion.div>

            <motion.div
              className="absolute left-0 right-0 h-px"
              style={{
                top: '54%',
                background: `linear-gradient(90deg, transparent, ${transitionTheme.panelBorder}, transparent)`,
              }}
              animate={{ x: ['-28%', '28%'], opacity: [0.2, 0.62, 0.2] }}
              transition={{ duration: transitionTheme.entryDuration + 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <RouteNavigation accent={project.color} />

      <motion.div
        className="route-page-content"
        initial={{ opacity: entryTransition ? 0 : 1, y: entryTransition ? 26 : 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.68,
          delay: entryTransition ? Math.min(0.3, transitionTheme.entryDuration * 0.36) : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${project.color}20 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => router.push('/#work')}
            className="group flex items-center gap-3 mb-12 cursor-hover"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <ArrowLeft size={18} className="text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm text-gray-500 group-hover:text-white transition-colors">Back to Projects</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span
              className="text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
              style={{ color: project.color }}
            >
              {project.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6">
              {project.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>India</span>
              </div>
              {project.awards && (
                <div className="flex items-center gap-2" style={{ color: '#f59e0b' }}>
                  <Award size={14} />
                  <span>{project.awards[0]}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 rounded" style={{ background: project.color }} />
              Gallery
            </h2>
            <ImageGallery images={galleryImages} projectColor={project.color} />
          </motion.div>
        </div>
      </section>

      {/* Video Section (only for projects with video) */}
      {project.id === 'hci-agent' && (
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 rounded" style={{ background: project.color }} />
              Demo Video
            </h2>
            <VideoPlayer
              src="/projects/hci-agent/demo.mp4"
              poster={project.image}
              projectColor={project.color}
            />
          </motion.div>
        </div>
      </section>
      )}

      {/* Project Details */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 space-y-12"
            >
              {/* Overview */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 rounded" style={{ background: project.color }} />
                  Overview
                </h2>
                <div className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.longDescription}
                  </p>
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 rounded" style={{ background: project.color }} />
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-5 py-2.5 text-sm rounded-xl font-medium"
                      style={{
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}30`,
                        color: '#ccc',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Awards */}
              {project.awards && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-0.5 rounded" style={{ background: project.color }} />
                    Recognition
                  </h2>
                  <div className="space-y-3">
                    {project.awards.map((award, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-xl"
                        style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
                      >
                        <Award size={20} style={{ color: '#f59e0b' }} />
                        <span className="text-gray-300">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              {/* Metrics */}
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Key Metrics</h3>
                <div className="space-y-4">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{metric.label}</span>
                      <span className="text-sm font-semibold" style={{ color: project.color }}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-sm font-semibold text-white cursor-hover transition-all hover:scale-[1.02]"
                    style={{ background: project.color }}
                  >
                    View Live <ExternalLink size={16} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-sm font-semibold cursor-hover transition-all hover:scale-[1.02]"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  >
                    <Github size={16} /> Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-sm text-gray-600 mb-4 block">Next Project</span>
            {(() => {
              const currentIndex = PROJECTS.findIndex((p) => p.id === projectId)
              const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]
              return (
                <button
                  onClick={(event) => navigateToProject(nextProject.id, event)}
                  className="group inline-flex items-center gap-4 cursor-hover"
                >
                  <span className="text-3xl md:text-4xl font-semibold text-white group-hover:text-gray-300 transition-colors">
                    {nextProject.title}
                  </span>
                  <ArrowUpRight
                    size={32}
                    className="text-gray-500 group-hover:text-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-all"
                    style={{ color: nextProject.color }}
                  />
                </button>
              )
            })()}
          </motion.div>
        </div>
      </section>

      </motion.div>
    </div>
  )
}
