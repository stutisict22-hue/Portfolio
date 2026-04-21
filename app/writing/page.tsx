'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Heart, MessageCircle, Repeat2, TrendingUp, PenTool, BookOpen, Sparkles } from 'lucide-react'
import RouteNavigation from '@/components/nav/RouteNavigation'

const WRITING_TOPICS = [
  'LangGraph Architecture',
  'Multi-Agent AI Systems',
  'Career in AI',
  'Startup Building',
  'UAE AI Ecosystem',
  'Enterprise RAG',
  'Governance-First AI',
  'Founder Journey',
]

const FEATURED_POSTS = [
  {
    id: 1,
    title: 'Building India\'s First Neural Sports Gaming Engine with Multi-Agent Systems',
    excerpt: 'How we\'re unifying India\'s fragmented sports ecosystem using centralized AI orchestration and LangGraph workflows...',
    reach: '45,000+',
    likes: 892,
    comments: 156,
    date: 'Mar 2026',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7157817047744163841/',
  },
  {
    id: 2,
    title: 'The Architecture Behind Selvenza: From Flaky Tests to Autonomous QA Healing',
    excerpt: 'Why 30-50% of QA time is wasted on broken selectors, and how a code-first approach changes everything...',
    reach: '38,000+',
    likes: 724,
    comments: 89,
    date: 'Feb 2026',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7154798399953788929/',
  },
  {
    id: 3,
    title: 'RAG Pipelines at Enterprise Scale: Lessons from Production AI Systems',
    excerpt: 'What I learned building a production RAG system for enterprise-grade AI applications...',
    reach: '52,000+',
    likes: 1243,
    comments: 203,
    date: 'Jan 2026',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7414635323856650240/',
  },
  {
    id: 4,
    title: 'Multi-Agent AI Systems: The Future of Autonomous Engineering',
    excerpt: 'How autonomous multi-agent workflows are reshaping how we build and ship software at scale...',
    reach: '35,000+',
    likes: 651,
    comments: 127,
    date: 'Dec 2025',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7317901891537936384/',
  },
  {
    id: 5,
    title: 'From Student to AI Developer: My Journey Building Production Systems',
    excerpt: 'How 60+ certifications, internships, and relentless building led to architecting production AI systems...',
    reach: '30,000+',
    likes: 589,
    comments: 94,
    date: 'Nov 2025',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7439199087196950528/',
  },
]

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2500
    const start = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(target)
    }
    
    requestAnimationFrame(animate)
  }, [isInView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function WritingPage() {
  return (
    <div className="portfolio-route-page">
      <RouteNavigation accent="#0284c7" />

      <div className="route-page-content">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[800px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}
            >
              <PenTool size={36} className="text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="gradient-text-animated">The Chronicle</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Thought leadership on AI engineering, multi-agent systems, and building in the UAE
            </p>
          </motion.div>

          {/* Impressions Counter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="p-8 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-7xl md:text-8xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-sora)' }}>
                <AnimatedCounter target={200000} suffix="+" />
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em]">Total Impressions</p>
              <div className="flex justify-center gap-8 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">Top 0.5%</div>
                  <p className="text-xs text-gray-600">of AI Engineers on LinkedIn</p>
                </div>
                <div className="w-px bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">100%</div>
                  <p className="text-xs text-gray-600">Organic Growth</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Topics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-6 text-center">Topics I Write About</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {WRITING_TOPICS.map((topic, i) => (
                <motion.span
                  key={topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="px-5 py-2.5 rounded-full text-sm font-medium"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3b82f6' }}
                >
                  {topic}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="w-8 h-1 rounded" style={{ background: '#3b82f6' }} />
              Featured Posts
            </h2>
          </motion.div>

          <div className="space-y-6">
            {FEATURED_POSTS.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01, y: -4 }}
                className="block p-6 rounded-2xl transition-all"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{post.excerpt}</p>
                  </div>
                  <ExternalLink size={16} className="text-gray-600 ml-4 flex-shrink-0" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <TrendingUp size={14} />
                      <span className="text-xs font-medium">{post.reach}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Heart size={14} />
                      <span className="text-xs">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MessageCircle size={14} />
                      <span className="text-xs">{post.comments}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{post.date}</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <a
              href="https://linkedin.com/in/stuti-gohil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-xl transition-all hover:scale-105"
              style={{ background: '#0073e6', color: '#fff' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Follow on LinkedIn
              <ArrowRight size={16} />
            </a>
            <p className="text-xs text-gray-600 mt-4">The most underused conversion on engineering portfolios</p>
          </motion.div>
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
          >
            <ArrowRight size={16} className="rotate-180" />
            Back to Portfolio
          </Link>
        </div>
      </section>

      </div>
    </div>
  )
}
