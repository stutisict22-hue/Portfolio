'use client'

import { useEffect, useRef, useState } from 'react'

export interface MousePosition {
  x: number  // raw pixel x
  y: number  // raw pixel y
  nX: number // normalized -1 to 1 (left to right)
  nY: number // normalized -1 to 1 (top to bottom)
  vX: number // velocity x
  vY: number // velocity y
}

// Returns normalized mouse position suitable for 3D camera parallax
export function useMousePosition(): MousePosition {
  const [mouse, setMouse] = useState<MousePosition>({
    x: 0, y: 0, nX: 0, nY: 0, vX: 0, vY: 0,
  })

  const prevRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nX = (e.clientX / window.innerWidth) * 2 - 1
      const nY = -(e.clientY / window.innerHeight) * 2 + 1
      const vX = e.clientX - prevRef.current.x
      const vY = e.clientY - prevRef.current.y

      prevRef.current = { x: e.clientX, y: e.clientY }

      setMouse({ x: e.clientX, y: e.clientY, nX, nY, vX, vY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mouse
}
