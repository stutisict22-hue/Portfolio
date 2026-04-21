'use client'

import { useEffect, useState, useRef, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Github, Linkedin, Twitter, Globe, Mail, Copy, Check } from 'lucide-react'
import { PERSONAL } from '@/lib/data'

type ContactIntent = 'project' | 'consulting' | 'speaking'

const INTENT_COPY: Record<ContactIntent, { label: string; subject: string; starter: string; helper: string }> = {
  project: {
    label: 'Build a Product',
    subject: 'Project Collaboration Inquiry',
    starter: 'I would like to discuss building an AI product. Here are the scope, timeline, and target outcomes:',
    helper: 'Best for product builds, MVPs, and implementation work.',
  },
  consulting: {
    label: 'Advisory Session',
    subject: 'AI Consulting Request',
    starter: 'I am seeking AI consulting support. Here are the current constraints and priorities:',
    helper: 'Best for architecture reviews and AI strategy guidance.',
  },
  speaking: {
    label: 'Talk or Workshop',
    subject: 'Speaking and Workshop Invitation',
    starter: 'I would like to invite you for a talk/workshop. Here are the audience and event details:',
    helper: 'Best for conferences, campus sessions, and company workshops.',
  },
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'opening' | 'opened'>('idle')
  const [intent, setIntent] = useState<ContactIntent>('project')
  const [emailCopied, setEmailCopied] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleIntentSelection = (event: Event) => {
      const detail = (event as CustomEvent<{ intent?: ContactIntent }>).detail
      const selectedIntent = detail?.intent
      if (!selectedIntent || !(selectedIntent in INTENT_COPY)) return

      setIntent(selectedIntent)
      setFormState((prev) => ({
        ...prev,
        message: INTENT_COPY[selectedIntent].starter,
      }))
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    window.addEventListener('portfolio:contact-intent', handleIntentSelection as EventListener)
    return () => window.removeEventListener('portfolio:contact-intent', handleIntentSelection as EventListener)
  }, [])

  const applyIntent = (nextIntent: ContactIntent) => {
    setIntent(nextIntent)
    setFormState((prev) => ({
      ...prev,
      message: INTENT_COPY[nextIntent].starter,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const selectedIntent = INTENT_COPY[intent]
    const subject = encodeURIComponent(`[Portfolio] ${selectedIntent.subject} — ${formState.name}`)
    const body = encodeURIComponent(
      `Hi ${PERSONAL.firstName},\n\n${formState.message}\n\nName: ${formState.name}\nEmail: ${formState.email}\nIntent: ${selectedIntent.label}\n\nSent from portfolio contact form.`
    )

    setStatus('opening')
    window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`
    setStatus('opened')

    setTimeout(() => {
      setStatus('idle')
    }, 4000)
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(PERSONAL.email)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const socialLinks = [
    { href: PERSONAL.social.github, icon: Github, label: 'GitHub', color: 'from-gray-600 to-gray-800' },
    { href: PERSONAL.social.linkedin, icon: Linkedin, label: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
    { href: PERSONAL.social.twitter, icon: Twitter, label: 'Twitter', color: 'from-sky-500 to-cyan-500' },
    { href: PERSONAL.social.dribbble, icon: Globe, label: 'Linktree', color: 'from-green-500 to-emerald-600' },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="portfolio-section tone-sky relative py-32 md:py-40 lg:py-48"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0a0f1e 50%, #0f172a 100%)' }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-px bg-gradient-to-r from-emerald-500 to-cyan-500" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-medium">
              07 — Contact
            </span>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left - Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 lg:col-start-1"
          >
            <h2
              className="text-4xl md:text-5xl lg:text-5xl text-white font-semibold mb-8 leading-tight tracking-tight"
            >
              Let&apos;s build{' '}
              <span className="gradient-text-animated">something</span>
              {' '}exceptional.
            </h2>
            
            <p className="text-sm text-white/60 leading-relaxed mb-12">
              I&apos;m currently available for new opportunities, collaborations, and interesting projects. Let&apos;s connect.
            </p>

            {/* Email */}
            <motion.button
              onClick={copyEmail}
              className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors mb-12"
              whileHover={{ x: 6 }}
            >
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center">
                <Mail size={18} />
              </div>
              <span className="text-sm font-medium">{PERSONAL.email}</span>
              <AnimatePresence mode="wait">
                {emailCopied ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1 text-emerald-500"
                  >
                    <Check size={14} /> Copied
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy size={14} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.color} p-0.5`}>
                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center glass group-hover:bg-transparent transition-colors">
                      <link.icon size={18} className="text-white/50 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Book a Meeting */}
            <motion.a
              href="https://cal.com/stuti-sg19"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-xl text-sm font-medium transition-all"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book a Meeting
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4">Intent</div>
                <div className="grid sm:grid-cols-3 gap-2">
                  {(Object.keys(INTENT_COPY) as ContactIntent[]).map((key) => {
                    const isActive = intent === key
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => applyIntent(key)}
                        className="px-4 py-3 text-xs rounded-xl transition-colors text-left"
                        style={{
                          background: isActive ? 'rgba(37,99,235,0.22)' : 'rgba(15,23,42,0.62)',
                          border: isActive ? '1px solid rgba(96,165,250,0.5)' : '1px solid rgba(148,163,184,0.24)',
                          color: isActive ? '#67e8f9' : 'rgba(241,245,249,0.88)',
                        }}
                      >
                        {INTENT_COPY[key].label}
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs text-white/40 mt-3">{INTENT_COPY[intent].helper}</p>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4">
                  Name
                </label>
                <InputField
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4">
                  Email
                </label>
                <InputField
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4">
                  Message
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  required
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="w-full px-6 py-5 text-sm bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                className="w-full py-5 rounded-2xl text-sm font-semibold text-black relative overflow-hidden disabled:cursor-not-allowed"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status === 'opening' && (
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  )}
                  {status === 'opened' ? (
                    <>
                      <Check size={16} />
                      Draft Opened
                    </>
                  ) : status === 'opening' ? (
                    'Opening Email...'
                  ) : (
                    <>
                      <Send size={16} />
                      Open Email Draft
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <span className="text-xs text-white/40">© 2026 {PERSONAL.name}</span>
          <div className="flex items-center gap-8">
            <span className="text-xs text-white/40">Built with Next.js</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/40">Designed with care</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function InputField({ type, value, onChange, placeholder }: {
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}) {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-6 py-5 text-sm bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/30 focus:outline-none transition-all duration-300"
        style={{
          borderColor: isFocused ? '#3b82f6' : 'rgba(255,255,255,0.1)',
          boxShadow: isFocused ? '0 0 30px rgba(59,130,246,0.2)' : 'none',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: isFocused ? '100%' : 0, 
          opacity: isFocused ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}
