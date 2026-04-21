'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { PERSONAL, STATS } from '@/lib/data'
import profilePic from '../../Profile_pic.jpg'

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2500
    const start = Date.now()

    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(value)
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start']
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = visualRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      mouseX.set(x * 15)
      mouseY.set(y * 15)
    }
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="portfolio-section tone-dark relative py-32 md:py-40 lg:py-48"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0a0f1e 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-medium">
              01 — Positioning
            </span>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left - Visual */}
          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-4"
            onMouseMove={handleMouseMove}
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="relative"
              style={{
                y: imageY,
                rotateX: useTransform(scrollYProgress, [0, 1], [5, -5]),
              }}
            >
              {/* Main visual card */}
              <motion.div
                className="aspect-[3/4] rounded-3xl overflow-hidden relative"
                style={{
                  background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 52%, #1e1b4b 100%)',
                  rotateY: mouseX,
                  rotateX: mouseY,
                  transformStyle: 'preserve-3d',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(59,130,246,0.1)',
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Animated gradient orbs */}
                <motion.div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
                  }}
                  animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
                  }}
                  animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                  transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                />

                {/* Profile image */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Image
                    src={profilePic}
                    alt={`${PERSONAL.name} profile photo`}
                    fill
                    sizes="(min-width: 1024px) 34vw, 90vw"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1ecc] via-[#0a0f1e66] to-transparent" />
                </motion.div>

                {/* Floating status card */}
                <motion.div
                  initial={{ opacity: 0, y: 30, x: -10 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-8 left-6 right-6 p-6 rounded-2xl"
                  style={{
                    background: 'rgba(30,41,59,0.8)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transform: 'translateZ(40px)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-white/40 mb-1">Currently</p>
                      <p className="text-sm font-medium text-white">AI Developer @ SporTech</p>
                    </div>
                    <motion.div
                      className="flex items-center gap-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs text-white/50">Open</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <div className="lg:col-span-8 lg:pl-8">
            <div className="lg:pt-12 space-y-12">

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2
                  className="text-heading text-white font-semibold"
                >
                  Building systems that{' '}
                  <span className="gradient-text-animated">think, learn,</span>
                  {' '}and evolve.
                </h2>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-6"
              >
                <p className="text-base text-white/70 leading-relaxed" style={{ lineHeight: 1.9 }}>
                  I build autonomous AI systems that don't just automate — they orchestrate. At 22, I'm architecting India's first Neural Sports Gaming Engine, a government-backed multi-agent platform unifying millions of athletes nationwide.
                </p>
                <p className="text-base text-white/70 leading-relaxed" style={{ lineHeight: 1.9 }}>
                  My work spans the full stack of intelligent systems: from RAG pipelines and LangGraph orchestration to real-time anomaly detection that enforces smart contracts. I've shipped production-grade tools like Selvenza (CI/CD-ready test healing) and SmartTradeX (autonomous supply chain enforcement) — systems that solve real problems, not just impress on paper.
                </p>
                <p className="text-base text-white/70 leading-relaxed" style={{ lineHeight: 1.9 }}>
                  With 60+ certifications from AWS, Google, Microsoft, IBM, Oracle, and Stanford, and 200K+ LinkedIn impressions, I bring both technical depth and the ability to communicate complex ideas simply.
                </p>
              </motion.div>

              {/* Philosophy */}
              <motion.blockquote
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="relative py-8 border-l-2 pl-8"
                style={{ borderColor: 'rgba(59,130,246,0.5)' }}
              >
                <svg className="absolute -top-4 -left-2 w-8 h-8 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-lg text-white/80 italic leading-relaxed">
                  {PERSONAL.philosophy}
                </p>
              </motion.blockquote>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
              >
                {STATS.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      borderColor: 'rgba(59,130,246,0.3)',
                      boxShadow: '0 0 40px rgba(59,130,246,0.15)',
                    }}
                    className="space-y-3 p-6 rounded-2xl"
                    style={{
                      background: 'rgba(30,41,59,0.5)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div
                      className="text-4xl font-bold gradient-text"
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}