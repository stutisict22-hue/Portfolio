'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  
  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12
      cursorY += (mouseY - cursorY) * 0.12
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX - 8}px, ${cursorY - 8}px)`
      }
      
      requestAnimationFrame(animate)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-hover], .group, input, textarea, .cursor-hover')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-hover], .group, input, textarea, .cursor-hover')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{
        width: isHovering ? '24px' : '16px',
        height: isHovering ? '24px' : '16px',
        borderRadius: '50%',
        background: isHovering ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        transition: 'all 0.15s ease-out',
        boxShadow: isHovering ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none',
      }}
    />
  )
}
