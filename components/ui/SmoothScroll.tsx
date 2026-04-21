'use client'

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  // Use a ref for cleanup so the returned cleanup fn always sees the latest instance
  const cleanupRef = useRef<(() => void) | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      try {
        const { gsap } = await import('@/lib/gsap')
        const { ScrollTrigger } = await import('@/lib/gsap')
        if (cancelled) return

        const lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        })

        lenisInstance.on('scroll', () => ScrollTrigger.update())

        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        setLenis(lenisInstance)

        cleanupRef.current = () => {
          lenisInstance.destroy()
          gsap.ticker.remove((time) => { lenisInstance.raf(time * 1000) })
        }
      } catch {
        // Fallback without GSAP sync
        if (cancelled) return

        const lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })

        const raf = (time: number) => {
          lenisInstance.raf(time)
          rafRef.current = requestAnimationFrame(raf)
        }
        rafRef.current = requestAnimationFrame(raf)

        setLenis(lenisInstance)

        cleanupRef.current = () => {
          lenisInstance.destroy()
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
      }
    }

    init()

    return () => {
      cancelled = true
      cleanupRef.current?.()
      cleanupRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
