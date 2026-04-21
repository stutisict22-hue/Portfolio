'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, Building2, ChartNoAxesCombined, ShieldCheck } from 'lucide-react'

const CREDIBILITY_PILLARS = [
  {
    icon: Building2,
    title: 'Government-Backed Deployment',
    value: 'National Scale',
    detail: 'Leading AI systems work inside a Government of India sports initiative with live production architecture.',
    tone: 'rgba(37,99,235,0.12)',
    edge: 'rgba(37,99,235,0.28)',
  },
  {
    icon: BadgeCheck,
    title: 'Third-Party Credential Proof',
    value: '60+ Certifications',
    detail: 'Validated by Oracle, AWS, Google, Microsoft, IBM, Stanford, and other global institutions.',
    tone: 'rgba(5,150,105,0.12)',
    edge: 'rgba(5,150,105,0.26)',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Public Signal and Reach',
    value: '200K+ Impressions',
    detail: 'AI content and technical writing with measurable engagement from a global professional audience.',
    tone: 'rgba(217,119,6,0.12)',
    edge: 'rgba(217,119,6,0.26)',
  },
]

export default function CredibilityLayer() {
  return (
    <section
      className="portfolio-section tone-sky relative py-24 md:py-28"
      style={{ background: 'linear-gradient(180deg, #0b1224 0%, #0f172a 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.36em] text-white/45 mb-4">Phase 5 - Credibility</p>
          <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Validation that survives due diligence
          </h3>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Every claim is backed by deployment context, recognized credentials, or verifiable public signal.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {CREDIBILITY_PILLARS.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(15,23,42,0.62)',
                border: '1px solid rgba(148,163,184,0.2)',
              }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: pillar.tone, border: `1px solid ${pillar.edge}` }}>
                <pillar.icon size={18} className="text-slate-100" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/45 mb-2">{pillar.title}</p>
              <p className="text-xl font-semibold text-white mb-2">{pillar.value}</p>
              <p className="text-sm text-slate-300 leading-relaxed">{pillar.detail}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-2xl p-5 md:p-6 flex flex-wrap items-center gap-3"
          style={{ background: 'rgba(15,23,42,0.62)', border: '1px solid rgba(148,163,184,0.2)' }}
        >
          <div className="inline-flex items-center gap-2 pr-2">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span className="text-xs font-medium text-white/75">Verify directly:</span>
          </div>

          <Link
            href="/certifications"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium"
            style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(96,165,250,0.4)', color: '#dbeafe' }}
          >
            Certifications
            <ArrowUpRight size={12} />
          </Link>

          <a
            href="https://linkedin.com/in/stuti-gohil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium"
            style={{ background: 'rgba(14,165,233,0.18)', border: '1px solid rgba(56,189,248,0.38)', color: '#e0f2fe' }}
          >
            LinkedIn Profile
            <ArrowUpRight size={12} />
          </a>

          <a
            href="https://github.com/Stuti-1908"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium"
            style={{ background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(129,140,248,0.38)', color: '#e0e7ff' }}
          >
            GitHub Code
            <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
