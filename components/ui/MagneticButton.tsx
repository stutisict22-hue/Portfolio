'use client'

import { useRef, ReactNode, MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  variant?: 'primary' | 'outline' | 'ghost'
}

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  href,
  target,
  rel,
  variant = 'ghost',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = (e.clientX - centerX) * strength
    const distY = (e.clientY - centerY) * strength
    el.style.transform = `translate(${distX}px, ${distY}px)`
    el.style.transition = 'transform 0.15s ease'
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
  }

  const baseStyles = cn(
    'relative inline-flex items-center justify-center overflow-hidden select-none transition-all duration-300',
    {
      'btn-primary': variant === 'primary',
      'btn-outline': variant === 'outline',
      'opacity-80 hover:opacity-100': variant === 'ghost',
    },
    className
  )

  const eventProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: baseStyles,
    onClick,
  }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...eventProps}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      {...eventProps}
    >
      {children}
    </button>
  )
}
