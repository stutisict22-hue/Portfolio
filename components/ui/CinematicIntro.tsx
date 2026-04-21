'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { PERSONAL } from '@/lib/data'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

const INTRO_STORAGE_KEY = 'portfolio:intro:cinematic:v1'

interface IntroTuningProfile {
  totalDurationMs: number
  exitLeadMs: number
  overlayFadeSec: number
  pulseCycleSec: number
  beamSweepSec: number
  ringSize: number
  ringGlow: number
  monogramSize: number
  intensity: number
}

const INTRO_TUNING = {
  desktop: {
    totalDurationMs: 2860,
    exitLeadMs: 620,
    overlayFadeSec: 0.42,
    pulseCycleSec: 1.7,
    beamSweepSec: 1.2,
    ringSize: 204,
    ringGlow: 72,
    monogramSize: 102,
    intensity: 1,
  } satisfies IntroTuningProfile,
  mobile: {
    totalDurationMs: 2140,
    exitLeadMs: 560,
    overlayFadeSec: 0.32,
    pulseCycleSec: 1.45,
    beamSweepSec: 0.95,
    ringSize: 176,
    ringGlow: 58,
    monogramSize: 88,
    intensity: 0.86,
  } satisfies IntroTuningProfile,
  reduced: {
    totalDurationMs: 980,
    exitLeadMs: 440,
    overlayFadeSec: 0.2,
    pulseCycleSec: 1,
    beamSweepSec: 0.7,
    ringSize: 146,
    ringGlow: 42,
    monogramSize: 78,
    intensity: 0.56,
  } satisfies IntroTuningProfile,
}

export default function CinematicIntro() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  const profile = reducedMotion
    ? INTRO_TUNING.reduced
    : isMobile
      ? INTRO_TUNING.mobile
      : INTRO_TUNING.desktop

  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (pathname !== '/') {
      setVisible(false)
      setExiting(false)
      return
    }

    if (typeof window === 'undefined') return

    const alreadySeen = window.sessionStorage.getItem(INTRO_STORAGE_KEY)
    if (alreadySeen) return

    window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'seen')
    setVisible(true)

    const totalDuration = profile.totalDurationMs
    const exitAfter = Math.max(450, totalDuration - profile.exitLeadMs)

    const exitTimer = window.setTimeout(() => setExiting(true), exitAfter)
    const doneTimer = window.setTimeout(() => {
      setVisible(false)
      setExiting(false)
    }, totalDuration)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
    }
  }, [pathname, profile])

  const skyOpacity = (0.34 * profile.intensity).toFixed(3)
  const tealOpacity = (0.24 * profile.intensity).toFixed(3)
  const scanlineOpacity = (0.12 * profile.intensity).toFixed(3)
  const beamOpacity = (0.46 * profile.intensity).toFixed(3)
  const ringOpacity = (0.3 * profile.intensity).toFixed(3)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: profile.overlayFadeSec }}
          className="fixed inset-0 z-[2100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              `radial-gradient(920px 430px at 10% 0%, rgba(14,165,233,${skyOpacity}), transparent 60%), radial-gradient(880px 390px at 90% 100%, rgba(13,148,136,${tealOpacity}), transparent 62%), linear-gradient(140deg, #e6f0ff 0%, #f8fbff 52%, #eff6ff 100%)`,
            clipPath: exiting ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)',
          }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: exiting ? 0 : [0.04 * profile.intensity, 0.11 * profile.intensity, 0.04 * profile.intensity] }}
            transition={{ duration: profile.pulseCycleSec, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              backgroundImage:
                `linear-gradient(transparent 49%, rgba(15,23,42,${scanlineOpacity}) 50%, transparent 51%)`,
              backgroundSize: '100% 6px',
            }}
          />

          <motion.div
            className="relative flex flex-col items-center"
            animate={exiting ? { opacity: 0, y: -40, scale: 1.08 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0 -z-10 rounded-full"
              animate={
                exiting
                  ? { opacity: 0, scale: 1.2 }
                  : { opacity: [0.28, 0.52, 0.28], scale: [0.96, 1.06, 0.96], rotate: [0, 360] }
              }
              transition={
                exiting
                  ? { duration: 0.4 }
                  : { duration: 4.8, repeat: Infinity, ease: 'linear' }
              }
              style={{
                width: `${profile.ringSize}px`,
                height: `${profile.ringSize}px`,
                border: `1px solid rgba(2,132,199,${ringOpacity})`,
                boxShadow: `0 0 ${profile.ringGlow}px rgba(2,132,199,${(0.24 * profile.intensity).toFixed(3)})`,
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.84, rotate: -10 }}
              animate={
                exiting
                  ? { opacity: 0, scale: 1.26, rotate: 8 }
                  : { opacity: 1, scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid place-items-center rounded-2xl"
              style={{
                width: `${profile.monogramSize}px`,
                height: `${profile.monogramSize}px`,
                background: 'linear-gradient(135deg, rgba(2,132,199,0.18), rgba(13,148,136,0.2))',
                border: '1px solid rgba(2,132,199,0.36)',
                boxShadow: `0 30px 70px -24px rgba(2,132,199,${(0.35 * profile.intensity).toFixed(3)})`,
              }}
            >
              <span
                className="text-xl font-bold tracking-[0.28em] text-slate-900"
                style={{ fontFamily: 'var(--font-sora)' }}
              >
                {PERSONAL.initials}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={
                exiting
                  ? { opacity: 0, y: -16 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-8 text-center"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-slate-500">Experience</p>
              <p className="mt-2 text-base font-semibold text-slate-900" style={{ fontFamily: 'var(--font-sora)' }}>
                {PERSONAL.name}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              top: exiting ? '35%' : '50%',
                background: `linear-gradient(90deg, transparent, rgba(2,132,199,${beamOpacity}), transparent)`,
            }}
            animate={
              exiting
                ? { opacity: 0 }
                : { x: ['-35%', '35%'], opacity: [0.25, 0.65, 0.25] }
            }
            transition={
              exiting
                ? { duration: 0.3 }
                  : { duration: profile.beamSweepSec, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
