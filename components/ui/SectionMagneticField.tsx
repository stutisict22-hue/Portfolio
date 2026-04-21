'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

const SECTION_STRENGTH: Record<string, number> = {
  hero: 0.24,
  about: 0.18,
  showcase: 0.19,
  work: 0.2,
  experience: 0.16,
  certifications: 0.14,
  skills: 0.2,
  contact: 0.22,
}

const TARGET_SELECTOR = [
  'section[id] a',
  'section[id] button',
  'header a',
  'header button',
  '[data-magnetic]',
  '.magnetic',
  '[data-magnetic-card]',
].join(', ')

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function resolveStrength(el: HTMLElement) {
  const explicit = Number(el.dataset.magneticStrength)
  if (!Number.isNaN(explicit) && explicit > 0) {
    return explicit
  }

  const sectionId = el.closest('section[id]')?.id
  if (sectionId && SECTION_STRENGTH[sectionId]) {
    return SECTION_STRENGTH[sectionId]
  }

  if (el.closest('header')) return 0.13
  return 0.15
}

export default function SectionMagneticField() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (isMobile || reducedMotion) return

    const cleanupMap = new Map<HTMLElement, () => void>()

    const bindElement = (el: HTMLElement) => {
      if (cleanupMap.has(el) || el.dataset.magnetic === 'off') return

      const rect = el.getBoundingClientRect()
      if (rect.width < 30 || rect.height < 20) return

      const strength = resolveStrength(el)
      const radius = Math.max(rect.width, rect.height) * 1.55
      const maxShift = clamp(Math.max(rect.width, rect.height) * 0.16, 8, 22)

      let addedCursorClass = false
      if (!el.classList.contains('cursor-hover')) {
        el.classList.add('cursor-hover')
        addedCursorClass = true
      }

      const onMove = (event: MouseEvent) => {
        const currentRect = el.getBoundingClientRect()
        const centerX = currentRect.left + currentRect.width / 2
        const centerY = currentRect.top + currentRect.height / 2

        const distanceX = event.clientX - centerX
        const distanceY = event.clientY - centerY
        const distance = Math.hypot(distanceX, distanceY)

        const pull = clamp(1 - distance / radius, 0, 1)

        const x = clamp(distanceX * strength * pull, -maxShift, maxShift)
        const y = clamp(distanceY * strength * pull, -maxShift, maxShift)

        el.style.translate = `${x}px ${y}px`
        el.style.transition = 'translate 140ms cubic-bezier(0.16, 1, 0.3, 1)'
        el.style.willChange = 'translate'
      }

      const onLeave = () => {
        el.style.translate = '0 0'
        el.style.transition = 'translate 460ms cubic-bezier(0.22, 1, 0.36, 1)'
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)

      cleanupMap.set(el, () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        el.style.translate = ''
        el.style.transition = ''
        el.style.willChange = ''
        if (addedCursorClass) {
          el.classList.remove('cursor-hover')
        }
      })
    }

    const scanElements = () => {
      const nodes = document.querySelectorAll<HTMLElement>(TARGET_SELECTOR)
      nodes.forEach(bindElement)

      cleanupMap.forEach((cleanup, node) => {
        if (!document.body.contains(node)) {
          cleanup()
          cleanupMap.delete(node)
        }
      })
    }

    scanElements()

    const observer = new MutationObserver(() => {
      scanElements()
    })

    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('resize', scanElements)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', scanElements)
      cleanupMap.forEach((cleanup) => cleanup())
      cleanupMap.clear()
    }
  }, [pathname, isMobile, reducedMotion])

  return null
}
