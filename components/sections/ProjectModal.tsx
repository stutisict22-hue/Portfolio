'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Award } from 'lucide-react'
import type { Project } from '@/lib/data'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[5000]"
            style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[5001] flex flex-col overflow-hidden"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(15,23,42,0.08)',
              boxShadow: `0 40px 120px rgba(0,0,0,0.15), 0 0 0 1px rgba(${hexToRgb(project.color)},0.12)`,
              maxWidth: '1000px',
              margin: 'auto',
              borderRadius: '12px',
            }}
            role="dialog"
            aria-label={`${project.title} project details`}
            aria-modal="true"
          >
            {/* Color bar */}
            <div
              className="h-[2px] flex-shrink-0"
              style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}66, transparent)` }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center group rounded-md"
              style={{ border: '1px solid rgba(15,23,42,0.1)', background: 'rgba(15,23,42,0.03)' }}
              aria-label="Close modal"
            >
              <X size={16} className="group-hover:rotate-90 transition-transform duration-300" style={{ color: '#888898' }} />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-6 md:p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono" style={{ color: project.color }}>
                    {project.year}
                  </span>
                  <span
                    className="w-4 h-[1px]"
                    style={{ background: project.color }}
                  />
                  <span className="text-xs uppercase tracking-wider" style={{ color: '#888898' }}>
                    {project.subtitle}
                  </span>
                </div>

                <h2
                  className="font-bold mb-4"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    letterSpacing: '-0.03em',
                    color: '#0d0d14',
                    fontFamily: 'var(--font-sora, sans-serif)',
                  }}
                >
                  {project.title}
                </h2>

                {/* CTA links */}
                <div className="flex gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2 text-xs"
                      style={{ padding: '0.5rem 1.25rem' }}
                    >
                      Live Site <ExternalLink size={12} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center gap-2 text-xs"
                      style={{ padding: '0.5rem 1.25rem' }}
                    >
                      GitHub <Github size={12} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Description (2/3) */}
                <div className="md:col-span-2 space-y-6">
                  {project.longDescription.split('\n\n').map((para, i) => (
                    <p
                      key={i}
                      className="leading-relaxed text-sm md:text-base"
                      style={{ color: i === 0 ? '#0d0d14' : '#44445a' }}
                    >
                      {para}
                    </p>
                  ))}

                  {/* Tags */}
                  <div>
                    <h3
                      className="text-xs tracking-[0.2em] uppercase mb-3"
                      style={{ color: '#444460' }}
                    >
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="skill-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics (1/3) */}
                <div className="space-y-4">
                  <h3
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ color: '#888898' }}
                  >
                    Impact
                  </h3>
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-4"
                      style={{
                        background: 'rgba(15,23,42,0.03)',
                        border: '1px solid rgba(15,23,42,0.06)',
                        borderRadius: '6px',
                      }}
                    >
                      <div
                        className="text-2xl font-bold tabular-nums mb-1"
                        style={{ color: project.color, letterSpacing: '-0.02em' }}
                      >
                        {metric.value}
                      </div>
                      <div className="text-xs" style={{ color: '#888898' }}>
                        {metric.label}
                      </div>
                    </div>
                  ))}

                  {/* Awards */}
                  {project.awards && project.awards.length > 0 && (
                    <div className="space-y-2 pt-4">
                      <h3
                        className="text-xs tracking-[0.2em] uppercase"
                        style={{ color: '#444460' }}
                      >
                        Recognition
                      </h3>
                      {project.awards.map((award, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Award size={12} style={{ color: '#f59e0b' }} />
                          <span className="text-xs" style={{ color: '#888898' }}>
                            {award}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0,0,0'
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
}
