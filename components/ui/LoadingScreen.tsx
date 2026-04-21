'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const duration = 2500
    const startTime = Date.now()
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress)
      } else {
        setTimeout(() => {
          onComplete?.()
        }, 400)
      }
    }
    
    requestAnimationFrame(updateProgress)
  }, [onComplete])

  // Realistic 3D Earth animation using Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = 500
    const height = 500
    canvas.width = width
    canvas.height = height
    const centerX = width / 2
    const centerY = height / 2
    const radius = 180

    let rotation = 0
    let animationId: number

    // Simplified continent coordinates (longitude, latitude ranges)
    const continents = [
      // North America
      { lonMin: -130, lonMax: -60, latMin: 25, latMax: 60, color: 'rgba(34, 139, 34, 0.6)' },
      // South America
      { lonMin: -80, lonMax: -35, latMin: -55, latMax: 10, color: 'rgba(34, 139, 34, 0.5)' },
      // Europe
      { lonMin: -10, lonMax: 40, latMin: 35, latMax: 60, color: 'rgba(34, 139, 34, 0.6)' },
      // Africa
      { lonMin: -20, lonMax: 50, latMin: -35, latMax: 35, color: 'rgba(34, 139, 34, 0.55)' },
      // Asia
      { lonMin: 40, lonMax: 150, latMin: 10, latMax: 65, color: 'rgba(34, 139, 34, 0.6)' },
      // Australia
      { lonMin: 110, lonMax: 155, latMin: -40, latMax: -10, color: 'rgba(34, 139, 34, 0.5)' },
      // India
      { lonMin: 68, lonMax: 90, latMin: 8, latMax: 35, color: 'rgba(34, 139, 34, 0.65)' },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Background glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 2)
      glowGrad.addColorStop(0, 'rgba(59, 130, 246, 0.15)')
      glowGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)')
      glowGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, width, height)

      // Draw atmosphere
      const atmosGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.9, centerX, centerY, radius * 1.15)
      atmosGrad.addColorStop(0, 'rgba(59, 130, 246, 0)')
      atmosGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)')
      atmosGrad.addColorStop(1, 'rgba(59, 130, 246, 0)')
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2)
      ctx.fillStyle = atmosGrad
      ctx.fill()

      // Draw ocean base
      const oceanGrad = ctx.createRadialGradient(centerX - radius * 0.3, centerY - radius * 0.3, 0, centerX, centerY, radius)
      oceanGrad.addColorStop(0, 'rgba(30, 58, 138, 0.9)')
      oceanGrad.addColorStop(0.5, 'rgba(23, 37, 84, 0.95)')
      oceanGrad.addColorStop(1, 'rgba(15, 23, 42, 1)')
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = oceanGrad
      ctx.fill()

      // Draw continents on rotating sphere
      continents.forEach(continent => {
        const lonRange = continent.lonMax - continent.lonMin
        const latRange = continent.latMax - continent.latMin

        // Draw multiple points for each continent
        for (let i = 0; i < 30; i++) {
          const lon = continent.lonMin + Math.random() * lonRange
          const lat = continent.latMin + Math.random() * latRange

          // Convert to 3D coordinates
          const phi = (lon + rotation) * (Math.PI / 180)
          const theta = (90 - lat) * (Math.PI / 180)

          const x = radius * Math.sin(theta) * Math.cos(phi)
          const y = radius * Math.cos(theta)
          const z = radius * Math.sin(theta) * Math.sin(phi)

          // Only draw if on front side
          if (z > -radius * 0.3) {
            const screenX = centerX + x
            const screenY = centerY + y
            const opacity = Math.max(0.3, (z + radius) / (2 * radius))
            const size = 3 + opacity * 6

            ctx.beginPath()
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
            ctx.fillStyle = continent.color.replace(')', `, ${opacity * 0.8})`).replace('rgba', 'rgba')
            ctx.fill()
          }
        }
      })

      // Draw grid lines (longitude)
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)'
        ctx.lineWidth = 0.5

        for (let lat = -90; lat <= 90; lat += 2) {
          const phi = (lon + rotation) * (Math.PI / 180)
          const theta = (90 - lat) * (Math.PI / 180)

          const x = radius * Math.sin(theta) * Math.cos(phi)
          const y = radius * Math.cos(theta)
          const z = radius * Math.sin(theta) * Math.sin(phi)

          if (z > 0) {
            const screenX = centerX + x
            const screenY = centerY + y
            if (lat === -90) {
              ctx.moveTo(screenX, screenY)
            } else {
              ctx.lineTo(screenX, screenY)
            }
          }
        }
        ctx.stroke()
      }

      // Draw grid lines (latitude)
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)'
        ctx.lineWidth = 0.5

        for (let lon = -180; lon <= 180; lon += 2) {
          const phi = (lon + rotation) * (Math.PI / 180)
          const theta = (90 - lat) * (Math.PI / 180)

          const x = radius * Math.sin(theta) * Math.cos(phi)
          const y = radius * Math.cos(theta)
          const z = radius * Math.sin(theta) * Math.sin(phi)

          if (z > 0) {
            const screenX = centerX + x
            const screenY = centerY + y
            if (lon === -180) {
              ctx.moveTo(screenX, screenY)
            } else {
              ctx.lineTo(screenX, screenY)
            }
          }
        }
        ctx.stroke()
      }

      // Draw city lights (random dots)
      const cities = [
        { lon: -74, lat: 40.7 }, // New York
        { lon: -118.2, lat: 34 }, // LA
        { lon: 0.1, lat: 51.5 }, // London
        { lon: 2.3, lat: 48.8 }, // Paris
        { lon: 139.7, lat: 35.7 }, // Tokyo
        { lon: 77.2, lat: 28.6 }, // Delhi
        { lon: 72.8, lat: 19 }, // Mumbai
        { lon: 116.4, lat: 39.9 }, // Beijing
        { lon: 121.5, lat: 31.2 }, // Shanghai
        { lon: 151.2, lat: -33.8 }, // Sydney
        { lon: -43.2, lat: -22.9 }, // Rio
        { lon: 37.6, lat: 55.7 }, // Moscow
        { lon: 28.9, lat: 41 }, // Istanbul
        { lon: 100.5, lat: 13.7 }, // Bangkok
        { lon: 103.8, lat: 1.3 }, // Singapore
      ]

      cities.forEach(city => {
        const phi = (city.lon + rotation) * (Math.PI / 180)
        const theta = (90 - city.lat) * (Math.PI / 180)

        const x = radius * Math.sin(theta) * Math.cos(phi)
        const y = radius * Math.cos(theta)
        const z = radius * Math.sin(theta) * Math.sin(phi)

        if (z > 0) {
          const screenX = centerX + x
          const screenY = centerY + y
          const opacity = (z / radius)

          // Glow effect
          const cityGrad = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, 8)
          cityGrad.addColorStop(0, `rgba(255, 255, 200, ${opacity})`)
          cityGrad.addColorStop(0.5, `rgba(255, 200, 100, ${opacity * 0.5})`)
          cityGrad.addColorStop(1, 'transparent')
          ctx.fillStyle = cityGrad
          ctx.beginPath()
          ctx.arc(screenX, screenY, 8, 0, Math.PI * 2)
          ctx.fill()

          // Core dot
          ctx.beginPath()
          ctx.arc(screenX, screenY, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.fill()
        }
      })

      // Highlight (light source)
      const highlightGrad = ctx.createRadialGradient(
        centerX - radius * 0.4,
        centerY - radius * 0.4,
        0,
        centerX - radius * 0.4,
        centerY - radius * 0.4,
        radius * 0.8
      )
      highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
      highlightGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)')
      highlightGrad.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = highlightGrad
      ctx.fill()

      // Earth edge glow
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 2
      ctx.stroke()

      rotation += 0.3
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Realistic Earth Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-80">
        <canvas ref={canvasRef} className="w-[500px] h-[500px]" />
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center">
        {/* Monogram with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div 
            className="w-20 h-20 mx-auto flex items-center justify-center text-xl font-bold tracking-[0.2em] rounded-full"
            style={{ 
              fontFamily: 'var(--font-sora)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 0 60px rgba(59,130,246,0.3), 0 0 120px rgba(139,92,246,0.2)',
              backdropFilter: 'blur(20px)',
              color: '#fff',
            }}
          >
            SG
          </div>
        </motion.div>

        {/* Animated progress bar with gradient */}
        <div className="w-48 mx-auto">
          <div 
            className="h-0.5 bg-gray-800/50 rounded-full overflow-hidden"
          >
            <div
              className="h-full rounded-full relative overflow-hidden transition-all duration-100"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
                boxShadow: '0 0 20px rgba(59,130,246,0.5)',
              }}
            />
          </div>
          <motion.p 
            className="mt-6 text-[10px] tracking-[0.3em] uppercase text-gray-500 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-xs text-gray-600"
          style={{ fontFamily: 'var(--font-sora)' }}
        >
          Loading Experience
        </motion.p>
      </div>
    </motion.div>
  )
}
