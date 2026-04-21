'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Briefcase, GraduationCap } from 'lucide-react'
import { EXPERIENCE } from '@/lib/data'

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="portfolio-section tone-dark relative py-32 md:py-44 lg:py-56"
      style={{ background: 'linear-gradient(180deg, #0a0f1e 0%, #0f172a 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute left-1/4 top-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-medium">
              04 — Journey
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <h2 className="text-heading text-white font-semibold">
            Work <span className="gradient-text-animated">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'linear-gradient(180deg, #3b82f6, #8b5cf6, #ec4899)',
            }}
          />

          {/* Entries */}
          <div className="space-y-16">
            {EXPERIENCE.map((entry, index) => {
              const Icon = entry.type === 'work' ? Briefcase : GraduationCap
              const gradient = entry.type === 'work'
                ? 'from-blue-500 to-purple-500'
                : 'from-pink-500 to-orange-500'
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    whileHover={{ scale: 1.2 }}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(59,130,246,0.4)',
                        '0 0 40px rgba(139,92,246,0.5)',
                        '0 0 20px rgba(59,130,246,0.4)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-br ${gradient}`}
                    />
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    className={`w-[49%] ${isLeft ? 'pr-2 md:pr-3' : 'pl-2 md:pl-3'}`}
                    whileHover={{
                      scale: 1.01,
                      borderColor: 'rgba(59,130,246,0.3)',
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div
                      className="p-5 md:p-6 rounded-2xl"
                      style={{
                        background: 'rgba(30,41,59,0.5)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} p-0.5`}>
                            <div
                              className="w-full h-full rounded-lg flex items-center justify-center"
                              style={{ background: 'rgba(15,23,42,0.9)' }}
                            >
                              <Icon size={16} className="text-white" />
                            </div>
                          </div>
                          <div>
                            <p className="text-[11px] text-white/50 tracking-wide">{entry.period}</p>
                          </div>
                        </div>
                        {entry.companyUrl && (
                          <a
                            href={entry.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg transition-colors"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }}
                          >
                            <ExternalLink size={12} className="text-white/40" />
                          </a>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white mb-1 tracking-tight">
                        {entry.role}
                      </h3>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {entry.company}
                        </span>
                        <span className="text-white/30">·</span>
                        <span className="text-[11px] text-white/50">{entry.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-[13px] text-white/60 leading-relaxed mb-5">
                        {entry.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {entry.tech.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-[10px] rounded-lg"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              color: 'rgba(255,255,255,0.7)',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                        {entry.tech.length > 5 && (
                          <span
                            className="px-3 py-1.5 text-[10px] rounded-lg"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              color: 'rgba(255,255,255,0.4)',
                            }}
                          >
                            +{entry.tech.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}