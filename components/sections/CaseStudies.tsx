'use client'

import Link from 'next/link'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'

export type EnterpriseEngagement = {
  id: string
  title: string
  client: string
  role: string
  buildOrEngagementLabel: 'The Build' | 'The Engagement'
  buildOrEngagement: string
  impactLabel: 'Business Impact' | 'Impact'
  impact: string
  governance?: string
  focusAreas?: string
  action?: {
    label: string
    href: string
  }
  layout: 'wide' | 'standard'
}

export type DeliveryTrack = {
  id: string
  title: string
  focus: string
  details: string
}

export const ENTERPRISE_ENGAGEMENTS: EnterpriseEngagement[] = [
  {
    id: 'enterprise-infrastructure-deployment',
    title: 'Enterprise Infrastructure Deployment (Contract)',
    client: 'Welfare Group (UAE)',
    role: 'Lead AI Architect (Independent Contractor)',
    buildOrEngagementLabel: 'The Build',
    buildOrEngagement: 'Autonomous UAE Preboarding Orchestrator',
    impactLabel: 'Business Impact',
    impact:
      'Engineered a zero-intervention, multi-agent HR compliance pipeline. Replaced manual document verification with local Vision-Language Models (Moondream/LLaVA) integrated into an n8n automated loop.',
    governance:
      "Architected a strict 'Zero-Cloud' Docker environment, ensuring sensitive PII (Passports, Visas) never leaves the host server, achieving 100% compliance with local data privacy regulations.",
    action: {
      label: 'View Architecture Details',
      href: '#',
    },
    layout: 'wide',
  },
  {
    id: 'executive-ai-mentorship-integration',
    title: 'Executive AI Mentorship & Systems Integration',
    client: 'Operations Management (Dubai/Global)',
    role: 'AI Integration Consultant & Trainer',
    buildOrEngagementLabel: 'The Engagement',
    buildOrEngagement:
      'Retained by the Operations Manager (Siril) and core leadership (Thiago) to bridge the gap between business operations and Agentic AI.',
    impactLabel: 'Impact',
    impact:
      'Conducted paid, structured training sessions on deploying, managing, and scaling LLM-driven architectures.',
    focusAreas:
      "Transitioning leadership from 'prompt engineering' to 'systems thinking', implementing Fail-Safe logic, and establishing ROI-driven automation roadmaps for their internal teams.",
    layout: 'standard',
  },
]

export const DELIVERY_TRACKS: DeliveryTrack[] = [
  {
    id: 'conversational-voice-agents',
    title: 'Conversational Voice Agents',
    focus: 'Low-Latency Audio Architectures',
    details:
      'Engineered and deployed intelligent Voice AI agents with real-time speech-to-text routing and autonomous intent resolution for high-volume client environments.',
  },
  {
    id: 'native-mobile-architectures',
    title: 'Native Mobile Architectures',
    focus: 'Edge-Deployed Applications',
    details:
      'Architected cross-platform mobile applications, focusing on seamless API integrations, secure state management, and optimized local processing.',
  },
  {
    id: 'full-cycle-saas-engineering',
    title: 'Full-Cycle SaaS Engineering',
    focus: 'End-to-End Software Lifecycles',
    details:
      'Retained for comprehensive software builds, managing everything from initial database schema design to frontend deployment and secure cloud hosting for international clients.',
  },
]

function EngagementCard({ card }: { card: EnterpriseEngagement }) {
  return (
    <article
      className="group relative h-full overflow-hidden rounded-2xl border border-slate-800/95 bg-slate-950/72 p-6 md:p-7 transition-all duration-300 hover:border-cyan-300/30 hover:shadow-[0_0_0_1px_rgba(125,211,252,0.18),0_28px_52px_-28px_rgba(8,145,178,0.6)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">Enterprise Mandate</p>
        <h3 className="mt-3 text-[1.75rem] md:text-[2rem] font-semibold tracking-tight text-white leading-[1.05]">
          {card.title}
        </h3>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Client</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{card.client}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Role</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{card.role}</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">{card.buildOrEngagementLabel}</p>
          <p className="mt-2 text-sm leading-6 text-slate-100">{card.buildOrEngagement}</p>
        </div>

        <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-500/[0.06] p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-200/80">{card.impactLabel}</p>
          <p className="mt-2 text-sm leading-6 text-slate-100">{card.impact}</p>
        </div>

        {card.governance && (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sky-400/20 bg-sky-400/10">
                <ShieldCheck size={16} className="text-sky-300" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Governance</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{card.governance}</p>
              </div>
            </div>
          </div>
        )}

        {card.focusAreas && (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Focus Areas</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{card.focusAreas}</p>
          </div>
        )}

        {card.action && (
          <div className="mt-6">
            <Link
              href={card.action.href}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-100 transition-colors duration-300 hover:bg-cyan-500/20"
            >
              {card.action.label}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}

function DeliveryTrackCard({ track }: { track: DeliveryTrack }) {
  return (
    <article
      className="group relative h-full overflow-hidden rounded-2xl border border-slate-800/95 bg-slate-950/72 p-6 transition-all duration-300 hover:border-emerald-300/25 hover:shadow-[0_0_0_1px_rgba(110,231,183,0.15),0_24px_48px_-30px_rgba(16,185,129,0.45)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -bottom-16 -right-14 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Delivery Track</p>
        <h4 className="mt-3 text-xl font-semibold tracking-tight text-white">{track.title}</h4>
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-200/80">Focus</p>
          <p className="mt-2 text-sm text-slate-100">{track.focus}</p>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">{track.details}</p>
      </div>
    </article>
  )
}

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="portfolio-section relative py-24 md:py-28 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #040812 0%, #091225 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[72rem] -translate-x-1/2 rounded-full bg-sky-500/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-slate-400">05 - Enterprise Work</p>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-white max-w-5xl mx-auto">
            Global Enterprise Consulting & Deployments
          </h2>
          <p className="mt-4 text-sm md:text-base leading-7 text-slate-400 max-w-3xl mx-auto">
            Contract-grade systems delivery and executive AI enablement presented in a modular Bento grid.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {ENTERPRISE_ENGAGEMENTS.map((card) => (
            <EngagementCard key={card.id} card={card} />
          ))}
        </div>

        <div className="mt-12 mb-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-emerald-200/70">
              Additional Engagements
            </p>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-4xl mx-auto">
            Other Current Contract-Based / Freelance Projects
          </h3>
          <p className="mt-3 text-sm md:text-base leading-7 text-slate-400 max-w-3xl mx-auto">
            Ongoing delivery mandates across voice AI, mobile systems, and full-cycle SaaS engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {DELIVERY_TRACKS.map((track) => (
            <DeliveryTrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  )
}