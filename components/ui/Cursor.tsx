'use client'

import { useEffect, useRef, useState } from 'react'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

type CursorState = 'default' | 'hover' | 'text' | 'drag' | 'click'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], .cursor-hover, [data-cursor="hover"], input, textarea, select'
const DRAG_SELECTOR = '[data-cursor="drag"], [draggable="true"]'
const TEXT_SELECTOR = 'p, h1, h2, h3, h4, h5, h6, li, blockquote, label, span'

function resolveStateFromTarget(target: HTMLElement | null): CursorState {
  if (!target) return 'default'
  if (target.closest(DRAG_SELECTOR)) return 'drag'
  if (target.closest(INTERACTIVE_SELECTOR)) return 'hover'
  if (target.closest(TEXT_SELECTOR)) return 'text'
  return 'default'
}

export default function Cursor() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)
  const stateRef = useRef<CursorState>('default')
  const activeRef = useRef(false)

  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (isMobile || reducedMotion) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const root = document.documentElement
    root.classList.add('cursor-enhanced')

    const setState = (nextState: CursorState) => {
      if (stateRef.current === nextState) return
      stateRef.current = nextState
      setCursorState(nextState)
    }

    const animate = () => {
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.14
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.14

      dot.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%)`

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    const syncStateFromPoint = () => {
      const target = document.elementFromPoint(posRef.current.x, posRef.current.y) as HTMLElement | null
      setState(resolveStateFromTarget(target))
    }

    const onMove = (event: MouseEvent) => {
      posRef.current = { x: event.clientX, y: event.clientY }
      if (!activeRef.current) {
        activeRef.current = true
        setActive(true)
      }
      setState(resolveStateFromTarget(event.target as HTMLElement | null))
    }

    const onDown = () => setState('click')
    const onUp = () => syncStateFromPoint()
    const onLeaveWindow = () => {
      activeRef.current = false
      setActive(false)
    }

    const onEnterWindow = () => {
      activeRef.current = true
      setActive(true)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseleave', onLeaveWindow)
    window.addEventListener('mouseenter', onEnterWindow)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseleave', onLeaveWindow)
      window.removeEventListener('mouseenter', onEnterWindow)
      root.classList.remove('cursor-enhanced')
    }
  }, [isMobile, reducedMotion])

  if (isMobile || reducedMotion) return null

  const ringWidth =
    cursorState === 'hover'
      ? 54
      : cursorState === 'text'
        ? 3
        : cursorState === 'drag'
          ? 44
          : cursorState === 'click'
            ? 24
            : 34

  const ringHeight =
    cursorState === 'hover'
      ? 54
      : cursorState === 'text'
        ? 26
        : cursorState === 'drag'
          ? 44
          : cursorState === 'click'
            ? 24
            : 34

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none top-0 left-0"
        style={{
          width: cursorState === 'click' ? 6 : 5,
          height: cursorState === 'click' ? 6 : 5,
          borderRadius: '50%',
          background: '#0ea5e9',
          boxShadow: '0 0 18px rgba(2,132,199,0.4)',
          opacity: active ? 1 : 0,
          transition: 'width 0.14s ease, height 0.14s ease, opacity 0.2s ease',
          willChange: 'transform',
          zIndex: 1700,
        }}
      />

      <div
        ref={ringRef}
        className="fixed pointer-events-none top-0 left-0"
        style={{
          width: ringWidth,
          height: ringHeight,
          borderRadius: cursorState === 'text' ? 2 : '50%',
          border:
            cursorState === 'hover'
              ? '1.5px solid rgba(2,132,199,0.64)'
              : cursorState === 'drag'
                ? '1.5px solid rgba(14,116,144,0.5)'
                : '1px solid rgba(15,23,42,0.24)',
          background:
            cursorState === 'hover'
              ? 'rgba(2,132,199,0.08)'
              : cursorState === 'drag'
                ? 'rgba(14,116,144,0.08)'
                : 'transparent',
          boxShadow:
            cursorState === 'hover' || cursorState === 'drag'
              ? '0 0 24px rgba(2,132,199,0.16)'
              : 'none',
          opacity: active ? 1 : 0,
          transition:
            'width 0.28s cubic-bezier(0.22, 1, 0.36, 1), height 0.28s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.22s ease, border-color 0.22s ease, background 0.22s ease, opacity 0.2s ease',
          willChange: 'transform',
          zIndex: 1699,
        }}
      />
    </>
  )
}
