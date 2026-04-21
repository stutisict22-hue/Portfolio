'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react'
import { useLenis } from '@/components/ui/SmoothScroll'
import { PERSONAL } from '@/lib/data'

// Minimal sections - only what matters for navigation
const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const PAGES = [
  { href: '/writing', label: 'Writing' },
  { href: '/resume', label: 'Resume' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [magneticStrength, setMagneticStrength] = useState({ x: 0, y: 0 })
  const [isHoveringLogo, setIsHoveringLogo] = useState(false)
  const lenis = useLenis()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const logoRef = useRef<HTMLButtonElement>(null)
  const [logoPos, setLogoPos] = useState({ x: 0, y: 0 })

  const scrollProgress = useMotionValue(0)
  const springProgress = useSpring(scrollProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 24)
      scrollProgress.set(maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollProgress])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!lenis) return

    if (menuOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }

    return () => {
      lenis.start()
    }
  }, [menuOpen, lenis])

  useEffect(() => {
    const setupObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.24) {
              setActiveSection(entry.target.id)
            }
          })
        },
        { threshold: [0.2, 0.3, 0.45, 0.6], rootMargin: '-90px 0px -45% 0px' }
      )
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) observerRef.current?.observe(el)
      })
    }
    const timeoutId = setTimeout(setupObserver, 130)
    return () => { clearTimeout(timeoutId); observerRef.current?.disconnect() }
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    setMenuOpen(false)
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.25, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [lenis])

  const handleLogoMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = logoRef.current?.getBoundingClientRect()
    if (rect) {
      setLogoPos({
        x: (e.clientX - rect.left - rect.width / 2) * 0.5,
        y: (e.clientY - rect.top - rect.height / 2) * 0.5,
      })
    }
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1200]">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full"
          style={{
            padding: scrolled ? '12px 24px' : '20px 24px',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Main navigation bar - sleek capsule design */}
          <div
            className="relative mx-auto max-w-[920px] rounded-full overflow-hidden"
            style={{
              background: scrolled
                ? 'rgba(15, 23, 42, 0.85)'
                : 'rgba(15, 23, 42, 0.08)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: scrolled
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid rgba(255,255,255,0.15)',
              boxShadow: scrolled
                ? '0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05) inset'
                : '0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            {/* Animated gradient border glow */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{
                opacity: scrolled ? 1 : 0.3,
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3), rgba(6,182,212,0.3))',
                filter: 'blur(1px)',
                zIndex: -1,
              }}
            />

            {/* Holographic shimmer line at top */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(59,130,246,0.8), transparent)',
              }}
            />

            <div className="relative flex items-center justify-between px-3 md:px-4 py-2">
              {/* Logo / Brand Mark */}
              <motion.button
                ref={logoRef}
                onClick={() => scrollToSection('hero')}
                onMouseEnter={() => setIsHoveringLogo(true)}
                onMouseLeave={() => {
                  setIsHoveringLogo(false)
                  setMagneticStrength({ x: 0, y: 0 })
                }}
                onMouseMove={handleLogoMouseMove}
                animate={{
                  x: isHoveringLogo ? logoPos.x : 0,
                  y: isHoveringLogo ? logoPos.y : 0,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative group flex items-center gap-3 cursor-hover"
                aria-label="Back to top"
              >
                {/* Animated brand mark */}
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
                  }}
                >
                  {/* Inner shimmer */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    }}
                  />
                  <span
                    className="text-[11px] font-bold tracking-[0.08em] text-white relative z-10"
                    style={{ fontFamily: 'var(--font-sora, sans-serif)' }}
                  >
                    {PERSONAL.initials}
                  </span>

                  {/* Glow ring on hover */}
                  {isHoveringLogo && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      layoutId="logoGlow"
                      style={{
                        background: 'rgba(59,130,246,0.3)',
                        filter: 'blur(8px)',
                      }}
                    />
                  )}
                </div>

                {/* Name */}
                <div className="hidden sm:block text-left">
                  <motion.div
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60"
                    animate={{ opacity: scrolled ? 1 : 0 }}
                    style={{ transition: 'opacity 0.5s' }}
                  >
                    Portfolio
                  </motion.div>
                  <div
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: 'var(--font-sora, sans-serif)' }}
                  >
                    {PERSONAL.firstName}
                  </div>
                </div>
              </motion.button>

              {/* Center Nav Links - Desktop */}
              <div className="hidden md:flex items-center gap-1">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section.id
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="relative px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 cursor-hover"
                      style={{
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="navActive"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(139,92,246,0.3))',
                            border: '1px solid rgba(255,255,255,0.2)',
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                      )}
                      <span className="relative z-10">{section.label}</span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-2">
                {/* Available indicator */}
                <motion.div
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'opacity 0.5s',
                  }}
                  animate={{ opacity: scrolled ? 1 : 0 }}
                >
                  <motion.span
                    className="relative inline-flex h-2 w-2"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </motion.span>
                  <span className="text-[10px] font-medium text-white/80">Available</span>
                </motion.div>

                {/* CTA Button */}
                <motion.a
                  href="https://cal.com/stuti-sg19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white cursor-hover"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles size={12} />
                  <span>Book Call</span>
                </motion.a>

                {/* Menu Toggle */}
                <motion.button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="relative w-10 h-10 rounded-full flex items-center justify-center cursor-hover"
                  style={{
                    background: menuOpen
                      ? 'rgba(59,130,246,0.3)'
                      : 'rgba(255,255,255,0.1)',
                    border: menuOpen
                      ? '1px solid rgba(59,130,246,0.4)'
                      : '1px solid rgba(255,255,255,0.1)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open menu"
                >
                  <motion.div
                    animate={{ rotate: menuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {menuOpen ? (
                      <X size={16} className="text-white" />
                    ) : (
                      <Menu size={16} className="text-white" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>

            {/* Progress Bar */}
            <motion.div
              className="h-[2px] origin-left rounded-full"
              style={{ scaleX: springProgress }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
                }}
              />
            </motion.div>
          </div>
        </motion.nav>
      </header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[1190] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.98) 50%, rgba(15,23,42,0.97) 100%)',
              backdropFilter: 'blur(32px)',
              overscrollBehavior: 'contain',
            }}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: ['#3b82f6', '#8b5cf6', '#06b6d4'][i % 3],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100 - Math.random() * 100],
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>

            <div
              className="relative h-full overflow-y-auto overscroll-contain"
              onWheelCapture={(event) => {
                event.stopPropagation()
              }}
              onTouchMove={(event) => {
                event.stopPropagation()
              }}
            >
              <div className="flex min-h-full flex-col px-6 pt-24 pb-12">
              {/* Header */}
              <div className="flex items-center justify-between mb-16">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Navigation</div>
                  <div
                    className="mt-1 text-xl font-semibold text-white"
                    style={{ fontFamily: 'var(--font-sora, sans-serif)' }}
                  >
                    {PERSONAL.name}
                  </div>
                </div>
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  className="w-12 h-12 rounded-full flex items-center justify-center cursor-hover"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close menu"
                >
                  <X size={20} className="text-white" />
                </motion.button>
              </div>

              {/* Sections */}
              <div className="flex-1">
                <div className="mb-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                  Sections
                </div>
                <div className="space-y-3">
                  {SECTIONS.map((section, index) => {
                    const isActive = activeSection === section.id
                    return (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.4 }}
                        onClick={() => scrollToSection(section.id)}
                        className="flex w-full items-center justify-between rounded-2xl px-6 py-5 cursor-hover"
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.2))'
                            : 'rgba(255,255,255,0.05)',
                          border: isActive
                            ? '1px solid rgba(59,130,246,0.4)'
                            : '1px solid rgba(255,255,255,0.08)',
                        }}
                        whileHover={{ x: 8 }}
                      >
                        <span className="text-base font-semibold text-white">{section.label}</span>
                        <ArrowUpRight size={18} className="text-white/50" />
                      </motion.button>
                    )
                  })}
                </div>

                {/* Pages */}
                <div className="mt-10 mb-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                  Pages
                </div>
                <div className="space-y-3">
                  {PAGES.map((page, index) => (
                    <motion.div
                      key={page.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
                    >
                      <Link
                        href={page.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl px-6 py-5 cursor-hover"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        <span className="text-base font-semibold text-white">{page.label}</span>
                        <ArrowUpRight size={18} className="text-white/50" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer CTAs */}
              <div className="mt-auto space-y-3 pt-6">
                <motion.a
                  href="https://cal.com/stuti-sg19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl px-6 py-5 text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Book Intro Call
                  <ArrowUpRight size={16} />
                </motion.a>

                <motion.a
                  href="mailto:stutigohil1908@gmail.com"
                  className="flex items-center justify-center rounded-2xl px-6 py-5 text-sm font-semibold text-white"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Send Email
                </motion.a>
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}