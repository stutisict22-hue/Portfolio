'use client'

import { useEffect, useRef, useState } from 'react'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-=+'

interface UseTextScrambleOptions {
  fps?: number
  revealSpeed?: number // characters revealed per frame
  randomize?: boolean
}

// Scramble text effect — cycles through random chars before settling on final text
export function useTextScramble(
  text: string,
  trigger: boolean,
  options: UseTextScrambleOptions = {}
): string {
  const { fps = 30, revealSpeed = 0.6 } = options
  const [displayText, setDisplayText] = useState(text)
  const frameRef = useRef(0)
  const totalFramesRef = useRef(0)

  useEffect(() => {
    if (!trigger) {
      setDisplayText(Array(text.length).fill('·').join(''))
      return
    }

    frameRef.current = 0
    totalFramesRef.current = Math.ceil(text.length / revealSpeed)

    const interval = setInterval(() => {
      const progress = frameRef.current / totalFramesRef.current
      const revealedCount = Math.floor(progress * text.length)

      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (char === '\n') return '\n'
            if (i < revealedCount) return char
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          })
          .join('')
      )

      frameRef.current++

      if (frameRef.current >= totalFramesRef.current + 5) {
        setDisplayText(text)
        clearInterval(interval)
      }
    }, 1000 / fps)

    return () => clearInterval(interval)
  }, [trigger, text, fps, revealSpeed])

  return displayText
}

// Hover-triggered scramble
export function useHoverScramble(text: string) {
  const [isHovering, setIsHovering] = useState(false)
  const scrambled = useTextScramble(text, isHovering)

  return {
    text: scrambled,
    handlers: {
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => setIsHovering(false),
    },
  }
}
