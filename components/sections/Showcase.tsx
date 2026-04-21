'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, PenTool, Rocket, FileText, Download, Heart, TrendingUp } from 'lucide-react'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const start = Date.now()

    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(target)
    }

    requestAnimationFrame(animate)
  }, [isInView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function Showcase() {
  return (
    <section
      id="showcase"
      className="portfolio-section tone-sky relative py-32 md:py-40 lg:py-48"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0a0f1e 100%)' }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-medium">
              02 — Proof
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <h2 className="text-heading text-white font-semibold">
            Beyond <span className="gradient-text-animated">Engineering</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto">
            Writing, startup building, and career milestones
          </p>
        </motion.div>

        {/* Three Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Writing / Chronicle */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8, borderColor: 'rgba(59,130,246,0.3)' }}
            className="group cursor-hover p-6 rounded-2xl"
            style={{
              background: 'rgba(30,41,59,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.2)' }}>
                <PenTool size={22} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">The Chronicle</h3>
                <p className="text-xs text-white/40">Thought Leadership</p>
              </div>
            </div>

            {/* Impressions Counter */}
            <div className="mb-6 p-4 rounded-xl text-center" style={{ background: 'rgba(59,130,246,0.1)' }}>
              <div className="text-4xl font-bold gradient-text mb-1" style={{ fontFamily: 'var(--font-sora)' }}>
                <AnimatedCounter target={200000} suffix="+" />
              </div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Total Impressions</p>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['LangGraph', 'Multi-Agent AI', 'Career in AI', 'UAE Ecosystem'].map((topic) => (
                <span key={topic} className="px-3 py-1.5 text-[10px] rounded-lg" style={{ background: 'rgba(59,130,246,0.15)', color: '#67e8f9' }}>
                  {topic}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-6 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <TrendingUp size={12} />
                <span>Top 0.5%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart size={12} />
                <span>5K+ likes</span>
              </div>
            </div>

            <a
              href="/writing"
              className="flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors"
            >
              Read Posts <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Selvenza Startup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8, borderColor: 'rgba(139,92,246,0.3)' }}
            className="group cursor-hover p-6 rounded-2xl"
            style={{
              background: 'rgba(30,41,59,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)' }}>
                <Rocket size={22} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Selvenza V2</h3>
                <p className="text-xs text-white/40">Startup Spotlight</p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              The world's first Code-First, Governance-First autonomous QA healing engine
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(139,92,246,0.1)' }}>
                <div className="text-lg font-bold text-white">24</div>
                <p className="text-[9px] text-white/40 uppercase">Prod Files</p>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(139,92,246,0.1)' }}>
                <div className="text-lg font-bold text-white">Phase 1</div>
                <p className="text-[9px] text-white/40 uppercase">Complete</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Fastify', 'PostgreSQL', 'Octokit', 'TypeScript'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 text-[10px] rounded-lg" style={{ background: 'rgba(139,92,246,0.15)', color: '#c4b5fd' }}>
                  {tech}
                </span>
              ))}
            </div>

            <a
              href="/selvenza"
              className="flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors"
            >
              View Startup <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Resume */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -8, borderColor: 'rgba(245,158,11,0.3)' }}
            className="group cursor-hover p-6 rounded-2xl"
            style={{
              background: 'rgba(30,41,59,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.2)' }}>
                <FileText size={22} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">The Codex</h3>
                <p className="text-xs text-white/40">Resume & Credentials</p>
              </div>
            </div>

            {/* Quick Highlights */}
            <div className="space-y-3 mb-6">
              {[
                { label: 'AI Developer', sub: 'SporTech Innovation Lab' },
                { label: '60+ Certifications', sub: 'AWS, Oracle, Google, Microsoft' },
                { label: 'McKinsey Forward', sub: 'Leadership Program' },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl" style={{ background: 'rgba(245,158,11,0.08)' }}>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-[10px] text-white/40">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Download Button */}
            <a
              href="/Stuti-Resume_IND.pdf"
              download
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium mb-4 transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fcd34d' }}
            >
              <Download size={14} />
              Download CV
            </a>

            <a
              href="/resume"
              className="flex items-center gap-2 text-sm font-medium text-amber-400 group-hover:text-amber-300 transition-colors"
            >
              View Resume <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* McKinsey & PepsiCo Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: 'rgba(0,112,243,0.1)', border: '1px solid rgba(0,112,243,0.3)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#0070f3' }}>
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">McKinsey Forward</p>
              <p className="text-[10px] text-white/40">Leadership Program</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.3)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#e63946' }}>
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">PepsiCo Top 1%</p>
              <p className="text-[10px] text-white/40">35,000+ candidates</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}