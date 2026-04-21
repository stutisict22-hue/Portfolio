// GSAP + Plugin Registration
// All imports from the main 'gsap' bundle to avoid case-sensitivity issues on Windows.

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'
import { TextPlugin } from 'gsap/dist/TextPlugin'

// Register plugins (client-only — safe to call multiple times, GSAP deduplicates)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin)
  // Sync ScrollTrigger with Lenis scroll events (Lenis calls this in SmoothScroll.tsx)
  ScrollTrigger.normalizeScroll(true)
}

export { gsap, ScrollTrigger, SplitText, TextPlugin }

// ---- Helper: Reveal on scroll ----
export function revealOnScroll(
  elements: string | Element | Element[],
  options?: {
    y?: number
    x?: number
    duration?: number
    stagger?: number
    delay?: number
    ease?: string
    trigger?: Element | string
  }
) {
  const opts = {
    y: 60,
    x: 0,
    duration: 0.9,
    stagger: 0.1,
    delay: 0,
    ease: 'power3.out',
    ...options,
  }

  return gsap.fromTo(
    elements,
    { opacity: 0, y: opts.y, x: opts.x, filter: 'blur(8px)' },
    {
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
      duration: opts.duration,
      stagger: opts.stagger,
      delay: opts.delay,
      ease: opts.ease,
      scrollTrigger: {
        trigger: opts.trigger || (Array.isArray(elements) ? elements[0] : elements),
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

// ---- Animated counter ----
export function animateCounter(
  element: HTMLElement,
  target: number,
  prefix = '',
  suffix = '',
  duration = 2
) {
  const obj = { value: 0 }
  return gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reset',
    },
  })
}

// ---- Text scramble utility ----
export function scrambleReveal(element: HTMLElement, finalText: string, duration = 1.5) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  const steps = Math.floor(duration * 30)
  let currentStep = 0

  const interval = setInterval(() => {
    const progress = currentStep / steps
    element.textContent = finalText
      .split('')
      .map((char, i) => {
        if (i < Math.floor(progress * finalText.length)) return char
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')

    currentStep++
    if (currentStep >= steps) {
      element.textContent = finalText
      clearInterval(interval)
    }
  }, 1000 / 30)

  return () => clearInterval(interval)
}
