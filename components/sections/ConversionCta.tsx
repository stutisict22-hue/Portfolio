'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Download, MessageSquare } from 'lucide-react'

type ContactIntent = 'project' | 'consulting' | 'speaking'

function routeToContact(intent: ContactIntent) {
  window.dispatchEvent(new CustomEvent('portfolio:contact-intent', { detail: { intent } }))
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function ConversionCta() {
  return (
    <section
      className="portfolio-section tone-amber relative py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-8 md:p-10 lg:p-12"
          style={{
            background: 'linear-gradient(145deg, rgba(15,23,42,0.84) 0%, rgba(30,41,59,0.7) 100%)',
            border: '1px solid rgba(148,163,184,0.22)',
            boxShadow: '0 24px 60px rgba(2,6,23,0.45)',
          }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/45 mb-4">Phase 4 - Conversion</p>
              <h3 className="text-3xl md:text-4xl font-semibold text-white leading-tight tracking-tight">
                Ready to deploy your next AI product?
              </h3>
              <p className="text-white/70 mt-4 max-w-2xl">
                Choose a path and I will route your request with the right context so we can move from idea to execution faster.
              </p>
            </div>

            <div className="lg:col-span-5 grid gap-3">
              <a
                href="https://cal.com/stuti-sg19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.01]"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)' }}
              >
                <CalendarDays size={16} />
                Book 20-min Strategy Call
              </a>

              <button
                type="button"
                onClick={() => routeToContact('project')}
                className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-sky-100 transition-all hover:scale-[1.01]"
                style={{ background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(96,165,250,0.45)' }}
              >
                <MessageSquare size={16} />
                Send Project Brief
              </button>

              <a
                href="/Stuti-Resume_IND.pdf"
                download
                className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white/85 transition-all hover:scale-[1.01]"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(148,163,184,0.26)' }}
              >
                <Download size={16} />
                Download CV
              </a>
            </div>

            <div className="lg:col-span-12 pt-4 md:pt-6" style={{ borderTop: '1px solid rgba(148,163,184,0.22)' }}>
              <div className="flex flex-wrap items-center gap-2.5">
                {['Government-backed product systems', '60+ globally recognized certifications', '200K+ audience reach'].map((signal) => (
                  <span
                    key={signal}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-medium text-white/75"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(148,163,184,0.24)' }}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
