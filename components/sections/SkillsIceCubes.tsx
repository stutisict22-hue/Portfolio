'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILLS } from '@/lib/data'
import { Brain, Database, Code, Cloud, ChevronRight } from 'lucide-react'

const CATEGORIES = [
  { 
    id: 'ai', 
    label: 'AI & Agentic', 
    icon: Brain,
    gradient: 'from-indigo-500 to-purple-600',
    bgGradient: 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10',
    border: 'border-indigo-500/30',
    glow: 'shadow-indigo-500/20',
    accent: '#6366f1'
  },
  { 
    id: 'data', 
    label: 'Data & ML', 
    icon: Database,
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    accent: '#06b6d4'
  },
  { 
    id: 'dev', 
    label: 'Development', 
    icon: Code,
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    accent: '#10b981'
  },
  { 
    id: 'cloud', 
    label: 'Cloud & DevOps', 
    icon: Cloud,
    gradient: 'from-orange-500 to-amber-600',
    bgGradient: 'bg-gradient-to-br from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
    accent: '#f97316'
  },
] as const

function SkillBadge3D({ skill, category, index, isActive, onHover }: {
  skill: typeof SKILLS[0]
  category: typeof CATEGORIES[number]
  index: number
  isActive: boolean
  onHover: (skill: typeof SKILLS[0] | null) => void
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setMousePosition({ x, y })
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotateX: 90 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ 
        delay: index * 0.05, 
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ scale: 1.08, z: 50 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      className="relative cursor-pointer"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className={`
          relative p-4 rounded-2xl
          backdrop-blur-xl border-2 ${category.border}
          ${category.bgGradient}
          transition-all duration-300
        `}
        animate={{
          rotateY: mousePosition.x * 15,
          rotateX: -mousePosition.y * 15,
        }}
        style={{
          boxShadow: isActive 
            ? `0 25px 50px -12px ${category.accent}40, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 10px 30px -5px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
      >
        {/* Top bar with gradient */}
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r ${category.gradient}`} />
        
        {/* Skill name */}
        <h4 className="text-sm font-bold text-white/90 mb-3 pr-4 leading-tight">
          {skill.name}
        </h4>
        
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-white/50 uppercase tracking-wider">Proficiency</span>
            <span className="text-xs font-mono font-bold" style={{ color: category.accent }}>
              {skill.level}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: 'easeOut' }}
              style={{
                boxShadow: `0 0 10px ${category.accent}`,
              }}
            />
          </div>
        </div>
        
        {/* Hover glow effect */}
        <div 
          className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 ${category.bgGradient}`}
          style={{ opacity: isActive ? 0.5 : 0 }}
        />
        
        {/* Corner accent */}
        <div 
          className="absolute top-3 right-3 w-2 h-2 rounded-full"
          style={{ 
            background: category.accent,
            boxShadow: `0 0 12px ${category.accent}`
          }}
        />
      </motion.div>
    </motion.div>
  )
}

function CategorySection({ category, skills, isExpanded, onToggle }: {
  category: typeof CATEGORIES[number]
  skills: typeof SKILLS
  isExpanded: boolean
  onToggle: () => void
}) {
  const [hoveredSkill, setHoveredSkill] = useState<typeof SKILLS[0] | null>(null)
  const Icon = category.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Category header */}
      <motion.button
        onClick={onToggle}
        className={`
          w-full p-4 rounded-2xl flex items-center gap-4
          border-2 ${category.border} ${category.bgGradient}
          backdrop-blur-xl transition-all duration-300
        `}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-lg font-bold text-white/90">{category.label}</h3>
          <p className="text-sm text-white/50">{skills.length} skills</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          className="text-white/50"
        >
          <ChevronRight size={20} />
        </motion.div>
      </motion.button>
      
      {/* Skills grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <SkillBadge3D
                    key={skill.name}
                    skill={skill}
                    category={category}
                    index={index}
                    isActive={hoveredSkill?.name === skill.name}
                    onHover={setHoveredSkill}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function SkillsIceCubes() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('ai')
  
  const skillsByCategory = useMemo(() => {
    return CATEGORIES.map(cat => ({
      ...cat,
      skills: SKILLS.filter(s => s.category === cat.id),
    }))
  }, [])
  
  return (
    <div className="relative w-full h-[700px] overflow-y-auto overflow-x-hidden rounded-3xl"
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)',
      }}
    >
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] bg-indigo-500/10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] bg-purple-500/10" />
      
      {/* Content */}
      <div className="relative z-10 p-6 space-y-4">
        {skillsByCategory.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            skills={category.skills}
            isExpanded={expandedCategory === category.id}
            onToggle={() => setExpandedCategory(
              expandedCategory === category.id ? null : category.id
            )}
          />
        ))}
      </div>
      
      {/* Scrollbar styling */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  )
}
