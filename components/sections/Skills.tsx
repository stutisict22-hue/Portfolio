'use client'

import dynamic from 'next/dynamic'
import { useState, useRef, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SKILLS } from '@/lib/data'
import { createSeededRandom } from '@/lib/utils'
import { Brain, Database, Code, Server, Layers } from 'lucide-react'

const SkillCards3D = dynamic(() => import('@/components/sections/SkillCards3D'), {
  ssr: false,
})

const CATEGORIES = [
  { 
    id: 'ai', 
    label: 'AI & Agentic', 
    icon: Brain, 
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    gradient: 'from-blue-600 to-cyan-500'
  },
  { 
    id: 'ml', 
    label: 'Machine Learning', 
    icon: Layers, 
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    gradient: 'from-purple-600 to-pink-500'
  },
  { 
    id: 'cloud', 
    label: 'Backend & Cloud', 
    icon: Server, 
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    gradient: 'from-cyan-500 to-teal-500'
  },
  { 
    id: 'data', 
    label: 'Data & DevOps', 
    icon: Database, 
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    gradient: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'dev', 
    label: 'Dev & Automation', 
    icon: Code, 
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    gradient: 'from-pink-600 to-rose-500'
  },
] as const

function SkillTag({ skill, index, color }: { skill: string; index: number; color: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        scale: 1.1, 
        y: -8,
        transition: { type: 'spring', stiffness: 400, damping: 15 }
      }}
      className="px-6 py-3.5 rounded-2xl text-sm font-medium cursor-hover relative overflow-hidden group"
      style={{ 
        background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
        border: `1px solid ${color}30`,
      }}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${color}20 50%, transparent 100%)`,
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      />
      
      <span className="relative z-10 flex items-center gap-2">
        <span 
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        <span className="text-slate-100">{skill}</span>
      </span>
    </motion.span>
  )
}

interface CategoryType {
  id: string
  label: string
  icon: typeof CATEGORIES[0]['icon']
  color: string
  glowColor: string
  gradient: string
}

interface FloatingParticle {
  id: number
  left: number
  top: number
  driftY: number
  duration: number
  delay: number
}

function CategoryCard({ category, isActive, onClick, index }: {
  category: CategoryType
  isActive: boolean
  onClick: () => void
  index: number
}) {
  const Icon = category.icon
  
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.1 }}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="relative p-6 rounded-3xl cursor-hover transition-all duration-500"
      style={{
        background: isActive 
          ? `linear-gradient(135deg, rgba(15,23,42,0.78) 0%, ${category.color}22 100%)` 
          : 'rgba(15,23,42,0.62)',
        border: `1px solid ${isActive ? category.color + '55' : 'rgba(148,163,184,0.22)'}`,
        boxShadow: isActive ? `0 0 40px ${category.glowColor}` : 'none',
      }}
    >
      {/* Glow effect for active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-3xl"
          layoutId="categoryGlow"
          style={{
            background: `radial-gradient(circle at center, ${category.glowColor} 0%, transparent 70%)`,
            filter: 'blur(20px)',
            zIndex: -1,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      )}
      
      <div className="flex flex-col items-center gap-4">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${category.color}30 0%, ${category.color}10 100%)`,
            boxShadow: isActive ? `0 0 30px ${category.glowColor}` : 'none',
          }}
        >
          <Icon 
            size={28} 
            style={{ color: isActive ? category.color : '#cbd5e1' }}
          />
        </div>
        <div className="text-center">
          <span
            className="text-sm font-semibold block mb-1"
            style={{ color: isActive ? '#fff' : '#e2e8f0' }}
          >
            {category.label}
          </span>
          <span 
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ 
              background: isActive ? category.color + '30' : 'rgba(148,163,184,0.18)',
              color: isActive ? category.color : '#cbd5e1'
            }}
          >
            {SKILLS.filter(s => s.category === category.id).length} skills
          </span>
        </div>
      </div>
    </motion.button>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('ai')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  const skillsByCategory = useMemo(() => {
    return CATEGORIES.map(cat => ({
      ...cat,
      skills: SKILLS.filter(s => s.category === cat.id).map(s => s.name),
    }))
  }, [])

  const floatingParticles = useMemo<FloatingParticle[]>(() => {
    return Array.from({ length: 10 }, (_, id) => {
      const rand = createSeededRandom(51042 + id * 131)
      return {
        id,
        left: rand() * 100,
        top: rand() * 100,
        driftY: 80 + rand() * 80,
        duration: 3 + rand() * 3,
        delay: rand() * 3,
      }
    })
  }, [])

  const activeSkills = skillsByCategory.find(c => c.id === activeCategory)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="portfolio-section tone-dark relative py-32 md:py-40 lg:py-48 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0f1e 0%, #0f172a 100%)' }}
    >
      {/* Dynamic background glow based on active category */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 80% 50% at 50% 30%, ${activeSkills?.glowColor || 'rgba(37,99,235,0.12)'} 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: activeSkills?.color || '#3b82f6',
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -particle.driftY],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Section header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-500 font-medium">
              06 — Toolkit
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>
          <h2 className="text-heading text-white font-semibold">
            My <span className="gradient-text-animated">Skills</span> Stack
          </h2>
          <p className="text-white/50 mt-3 max-w-md mx-auto">
            Expert in building intelligent systems
          </p>
        </motion.div>

        {/* 3D Skills Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="mb-16 rounded-3xl p-3 md:p-4"
          style={{
            background: 'linear-gradient(145deg, rgba(15,23,42,0.86) 0%, rgba(15,23,42,0.68) 100%)',
            border: '1px solid rgba(148,163,184,0.24)',
            boxShadow: '0 20px 48px rgba(2,6,23,0.38)',
          }}
        >
          <div className="mb-3 md:mb-4 px-2 md:px-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/55 mb-1">Interactive 3D</p>
            <p className="text-sm md:text-base font-semibold text-white">Neural Skill Matrix</p>
          </div>
          <div className="overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(180deg, #05070f 0%, #060b16 100%)' }}>
            <SkillCards3D height={620} />
          </div>
        </motion.div>

        {/* Category cards - centered grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
        >
          {skillsByCategory.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Skills tags - centered with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-3 min-h-[100px]"
          >
            {activeSkills?.skills.map((skill, i) => (
              <SkillTag 
                key={skill} 
                skill={skill} 
                index={i} 
                color={activeSkills.color}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-24 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
        />
      </div>
    </section>
  )
}
