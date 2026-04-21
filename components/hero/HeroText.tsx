'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import { PERSONAL } from '@/lib/data'
import { scrambleChars } from '@/lib/utils'

const WORDS = PERSONAL.tagline.split(' ')

export default function HeroText() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [nameText, setNameText] = useState(
    PERSONAL.name.split('').map(() => scrambleChars[Math.floor(Math.random() * scrambleChars.length)]).join('')
  )
  const [nameRevealed, setNameRevealed] = useState(false)
  const [roleVisible, setRoleVisible] = useState(false)
  const [taglineVisible, setTaglineVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)

  // Scramble → reveal name animation
  useEffect(() => {
    const TOTAL_MS = 1200
    const FPS = 30
    const totalFrames = Math.ceil((TOTAL_MS / 1000) * FPS)
    let frame = 0

    const interval = setInterval(() => {
      const progress = frame / totalFrames
      const revealedCount = Math.floor(progress * PERSONAL.name.length)

      setNameText(
        PERSONAL.name
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealedCount) return char
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
          })
          .join('')
      )

      frame++
      if (frame >= totalFrames + 3) {
        setNameText(PERSONAL.name)
        setNameRevealed(true)
        clearInterval(interval)
        setTimeout(() => setRoleVisible(true), 100)
        setTimeout(() => setTaglineVisible(true), 350)
        setTimeout(() => setCtaVisible(true), 750)
      }
    }, 1000 / FPS)

    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative z-20 flex flex-col justify-center h-full px-6 md:px-16 lg:px-24 max-w-[800px]">
      {/* Role label */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: roleVisible ? 1 : 0, y: roleVisible ? 0 : 10 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase mb-6 font-semibold"
        style={{ color: '#4f46e5' }}
      >
        <span className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg, #4f46e5, transparent)' }} />
        {PERSONAL.role}
      </motion.span>

      {/* Main name — scramble reveal */}
      <h1
        ref={nameRef}
        className="font-bold leading-[0.88] mb-6 select-none"
        style={{
          fontSize: 'clamp(3.2rem, 10vw, 9rem)',
          letterSpacing: '-0.04em',
          color: nameRevealed ? '#0d0d14' : '#44445a',
          fontFamily: 'var(--font-sora, var(--font-inter), sans-serif)',
          transition: 'color 0.3s ease',
          fontVariantNumeric: 'tabular-nums',
        }}
        aria-label={PERSONAL.name}
      >
        {nameText}
      </h1>

      {/* Tagline — words fade in */}
      <p
        className="mb-10 max-w-[520px] leading-relaxed"
        style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: '#888898' }}
      >
        {WORDS.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={
              taglineVisible
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 16, filter: 'blur(6px)' }
            }
            transition={{ delay: i * 0.055, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: ctaVisible ? 1 : 0, y: ctaVisible ? 0 : 20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-4"
      >
        <button
          onClick={() => scrollTo('work')}
          className="btn-primary group flex items-center gap-2"
          aria-label="View projects"
        >
          View Projects
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </button>

        <button
          onClick={() => scrollTo('contact')}
          className="btn-outline"
          aria-label="Get in touch"
        >
          Get in Touch
        </button>

        {/* Available indicator */}
        <div className="hidden sm:flex items-center gap-2 ml-1">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#059669', boxShadow: '0 0 8px #059669', animation: 'pulse 2s infinite' }}
          />
          <span className="text-xs tracking-wider" style={{ color: '#888898' }}>
            Open to opportunities
          </span>
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ctaVisible ? 1 : 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-1.5 mt-6"
        style={{ color: '#b0b0c0' }}
      >
        <MapPin size={12} />
        <span className="text-xs tracking-wide">{PERSONAL.location}</span>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: ctaVisible ? 1 : 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-6 md:left-16 lg:left-24 flex items-center gap-3 group"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={15} style={{ color: '#b0b0c0' }} />
        </motion.div>
        <span
          className="text-xs tracking-[0.25em] uppercase transition-colors duration-200 group-hover:text-accent"
          style={{ color: '#b0b0c0' }}
        >
          Scroll
        </span>
      </motion.button>
    </div>
  )
}
