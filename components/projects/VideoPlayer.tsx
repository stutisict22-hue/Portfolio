'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  poster?: string
  projectColor: string
}

export default function VideoPlayer({ src, poster, projectColor }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * videoRef.current.duration
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <motion.div
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: '#0a0a0a' }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Center play button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: !isPlaying || isHovered ? 1 : 0,
          scale: !isPlaying || isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: `${projectColor}cc` }}
        >
          {isPlaying ? (
            <Pause size={28} className="text-white" />
          ) : (
            <Play size={28} className="text-white ml-1" />
          )}
        </div>
      </motion.div>

      {/* Bottom controls */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Progress bar */}
        <div
          className="h-1 bg-white/20 rounded-full cursor-pointer"
          onClick={(e) => { e.stopPropagation(); handleSeek(e) }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, background: projectColor }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); toggleMute() }}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-hover"
            >
              {isMuted ? (
                <VolumeX size={16} className="text-white/70" />
              ) : (
                <Volume2 size={16} className="text-white/70" />
              )}
            </button>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleFullscreen() }}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-hover"
          >
            <Maximize size={14} className="text-white/70" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
