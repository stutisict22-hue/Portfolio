'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ImmersiveReel() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.35 })

  const cardOneY = useTransform(smooth, [0, 1], [180, -130])
  const cardOneRotate = useTransform(smooth, [0, 1], [-11, 10])
  const cardTwoY = useTransform(smooth, [0, 1], [100, -70])
  const cardTwoRotate = useTransform(smooth, [0, 1], [8, -7])
  const cardThreeY = useTransform(smooth, [0, 1], [150, -120])
  const cardThreeRotate = useTransform(smooth, [0, 1], [12, -9])

  const titleOpacity = useTransform(smooth, [0, 0.2, 0.85, 1], [0, 1, 1, 0])
  const titleY = useTransform(smooth, [0, 1], [38, -32])

  return (
    <section
      ref={sectionRef}
      className="portfolio-section tone-sky relative h-[220vh] md:h-[240vh]"
      style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -left-24 top-20 h-[420px] w-[420px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(2,132,199,0.2), transparent 70%)',
              filter: 'blur(24px)',
            }}
            animate={{ scale: [1, 1.12, 1], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute -right-24 bottom-8 h-[420px] w-[420px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(14,116,144,0.18), transparent 70%)',
              filter: 'blur(24px)',
            }}
            animate={{ scale: [1, 1.14, 1], y: [0, 18, 0] }}
            transition={{ duration: 13, repeat: Infinity }}
          />
        </div>

        <motion.div
          className="relative z-20 mx-auto max-w-5xl px-6 pt-24 text-center"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">Immersive Layer</p>
          <h3 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
            Systems in Motion
          </h3>
          <p className="mt-4 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            A cinematic scroll narrative that turns static claims into experiential proof.
          </p>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center px-5 md:px-10">
          <div className="relative h-[560px] w-full max-w-6xl">
            <motion.article
              className="absolute left-1/2 top-1/2 w-[92%] max-w-[820px] -translate-x-1/2 rounded-3xl p-7 md:p-9"
              style={{
                y: cardOneY,
                rotate: cardOneRotate,
                background: 'rgba(255,255,255,0.86)',
                border: '1px solid rgba(15,23,42,0.12)',
                boxShadow: '0 30px 70px rgba(2,132,199,0.18)',
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-sky-700">Neural Architecture</p>
              <h4 className="mt-2 text-xl md:text-3xl font-semibold text-slate-900">Orchestrated Multi-Agent Systems</h4>
              <p className="mt-3 text-sm md:text-base text-slate-600">
                Centralized intelligence layers that coordinate specialized agents for real production outcomes.
              </p>
            </motion.article>

            <motion.article
              className="absolute left-1/2 top-1/2 w-[86%] max-w-[760px] -translate-x-1/2 rounded-3xl p-7 md:p-9"
              style={{
                y: cardTwoY,
                rotate: cardTwoRotate,
                background: 'rgba(255,255,255,0.84)',
                border: '1px solid rgba(15,23,42,0.12)',
                boxShadow: '0 24px 56px rgba(15,23,42,0.14)',
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-700">Runtime Intelligence</p>
              <h4 className="mt-2 text-xl md:text-3xl font-semibold text-slate-900">Adaptive Decision Pipelines</h4>
              <p className="mt-3 text-sm md:text-base text-slate-600">
                Event-driven systems that reason, react, and re-route in milliseconds under real-world constraints.
              </p>
            </motion.article>

            <motion.article
              className="absolute left-1/2 top-1/2 w-[80%] max-w-[690px] -translate-x-1/2 rounded-3xl p-6 md:p-8"
              style={{
                y: cardThreeY,
                rotate: cardThreeRotate,
                background: 'rgba(255,255,255,0.84)',
                border: '1px solid rgba(15,23,42,0.12)',
                boxShadow: '0 18px 44px rgba(15,23,42,0.12)',
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-600">Delivery Layer</p>
              <h4 className="mt-2 text-lg md:text-2xl font-semibold text-slate-900">From Concept to Enterprise Deployment</h4>
              <p className="mt-3 text-sm text-slate-600">
                Full-stack execution across architecture, UX, backend systems, and measurable business impact.
              </p>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  )
}
