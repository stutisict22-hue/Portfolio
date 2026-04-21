'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  projectColor: string
}

export default function ImageGallery({ images, projectColor }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [direction, setDirection] = useState(0)

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }, [images.length])

  const next = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setIsFullscreen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, prev, next])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  if (images.length === 0) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="text-gray-600 text-sm">Gallery coming soon</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main carousel */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden" style={{ background: '#0a0a0a' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover cursor-zoom-in"
              onClick={() => setIsFullscreen(true)}
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-hover"
              style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-hover"
              style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </>
        )}

        {/* Progress dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1)
                  setCurrentIndex(i)
                }}
                className="rounded-full transition-all duration-300 cursor-hover"
                style={{
                  width: i === currentIndex ? 24 : 8,
                  height: 8,
                  background: i === currentIndex ? projectColor : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', color: '#999' }}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Caption */}
      {images[currentIndex].caption && (
        <p className="text-sm text-gray-500 text-center">{images[currentIndex].caption}</p>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1)
                setCurrentIndex(i)
              }}
              className="relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all cursor-hover opacity-50 hover:opacity-80"
              style={{
                outline: i === currentIndex ? `2px solid ${projectColor}` : 'none',
                outlineOffset: '2px',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.95)' }}
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center cursor-hover"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <X size={20} className="text-white" />
            </button>

            <motion.img
              key={`fullscreen-${currentIndex}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center cursor-hover"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center cursor-hover"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm" style={{ background: 'rgba(255,255,255,0.1)', color: '#999' }}>
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
