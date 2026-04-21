'use client'

import { useEffect, useState, useRef } from 'react'

export interface ScrollData {
  y: number
  progress: number
  direction: 'up' | 'down'
  velocity: number
}

export function useScrollProgress(): ScrollData {
  const [scroll, setScroll] = useState<ScrollData>({
    y: 0,
    progress: 0,
    direction: 'down',
    velocity: 0,
  })

  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(Date.now())

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const deltaTime = Math.max(now - lastTimeRef.current, 1)
      const currentScroll = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(currentScroll / maxScroll, 1) : 0
      const velocity = Math.abs(currentScroll - lastScrollRef.current) / deltaTime * 1000
      const direction: 'up' | 'down' = currentScroll > lastScrollRef.current ? 'down' : 'up'

      lastScrollRef.current = currentScroll
      lastTimeRef.current = now

      setScroll({
        y: currentScroll,
        progress,
        direction,
        velocity,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scroll
}
