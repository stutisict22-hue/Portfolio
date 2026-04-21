'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, CheckCircle, Zap, Shield, GitBranch, Database, Clock, Target, Award, TrendingUp, Users, Building2, Rocket } from 'lucide-react'
import RouteNavigation from '@/components/nav/RouteNavigation'

const CAPABILITIES = [
  { icon: Zap, title: 'Autonomous Detection', desc: 'Identifies broken CSS/XPath/DOM selectors across any test framework' },
  { icon: GitBranch, title: 'Multi-File POM Resolution', desc: 'Understands selector references across the entire codebase' },
  { icon: Shield, title: 'GitHub App PLG Motion', desc: 'Heals directly inside pull requests via Octokit integration' },
  { icon: Database, title: 'HealingLedger Data Flywheel', desc: 'Every fix trains the system, making it progressively smarter' },
  { icon: Clock, title: 'Idempotency-Guarded State Machine', desc: 'No double-healing, no race conditions, no data corruption' },
  { icon: Target, title: 'Governance-First Audit Logs', desc: 'Every healing decision is timestamped, attributed, and queryable' },
]

const ARCHITECTURE = [
  { label: 'Runtime', value: 'Node.js / TypeScript', detail: 'Strict, production-grade, fully typed' },
  { label: 'API Layer', value: 'Fastify', detail: 'High-performance with schema validation' },
  { label: 'Database', value: 'PostgreSQL', detail: 'ACID-compliant healing ledger' },
  { label: 'GitHub Integration', value: 'Octokit', detail: 'GitHub App PLG, PR-level auto-healing' },
  { label: 'Orchestration', value: 'HealingOrchestrator', detail: 'Idempotent, fault-tolerant' },
  { label: 'CI/CD', value: 'Full Pipeline', detail: 'Unit tests across all modules' },
]

export default function SelvenzaPage() {
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true })

  return (
    <div className="portfolio-route-page">
      <RouteNavigation accent="#7c3aed" />

      <div className="route-page-content">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[800px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
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
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)', boxShadow: '0 0 40px rgba(124,58,237,0.3)' }}
            >
              <Rocket size={36} className="text-white" />
            </motion.div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <span className="text-xs font-medium text-purple-400">Phase 1 Complete — Q1 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Selvenza V2
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-4">
              The World's First Code-First, Governance-First Autonomous QA Healing Engine
            </p>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Detects broken selectors, reasons about the DOM change, proposes and applies a repair — all without human intervention.
            </p>
          </motion.div>

          {/* Phase Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mb-16"
          >
            <div className="px-6 py-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-2xl font-bold text-white">24</div>
              <p className="text-xs text-gray-500">Production Files</p>
            </div>
            <div className="px-6 py-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-2xl font-bold text-white">TypeScript</div>
              <p className="text-xs text-gray-500">Strict, Fully Typed</p>
            </div>
            <div className="px-6 py-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-2xl font-bold text-white">Phase 1</div>
              <p className="text-xs text-gray-500">Complete</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Problem</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <h3 className="text-lg font-semibold text-red-400 mb-4">Why This Exists</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Enterprise software teams lose between 30-50% of QA engineering time to broken test selectors — CSS selectors, XPaths, and DOM locators that silently fail every time a frontend is updated.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-red-400 mt-1 flex-shrink-0" />50+ engineering hours per month wasted per mid-size team</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-red-400 mt-1 flex-shrink-0" />Delayed releases — blocked CI pipelines</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-red-400 mt-1 flex-shrink-0" />Governance risk — undocumented selector changes</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-red-400 mt-1 flex-shrink-0" />No self-healing mechanism exists in current tooling</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <h3 className="text-lg font-semibold text-green-400 mb-4">What Selvenza V2 Does</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Selvenza V2 is the world's first Code-First, Governance-First autonomous QA test healing engine. It detects broken selectors, reasons about the DOM change, proposes and applies a repair — all without human intervention.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />Autonomous detection across any test framework</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />Multi-file POM resolution at production scale</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />GitHub App PLG — zero-friction adoption</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />HealingLedger — proprietary data flywheel</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Core Capabilities</h2>
            <p className="text-gray-500">Production-grade features designed for enterprise deployment</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <cap.icon size={24} className="text-purple-400 mb-4" />
                <h3 className="text-base font-semibold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-500">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Architecture — Phase 1</h2>
            <p className="text-gray-500">Production-grade stack designed for scale</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARCHITECTURE.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">{item.label}</p>
                <p className="text-base font-semibold text-white mb-1">{item.value}</p>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Moat */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl"
            style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)' }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Competitive Moat</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'HealingLedger Data Flywheel', desc: 'Competitors cannot replicate institutional healing memory' },
                { title: 'Governance-First Design', desc: 'Built for enterprise compliance, not bolted on later' },
                { title: 'GitHub App PLG Motion', desc: 'Zero-friction adoption with no enterprise procurement needed' },
                { title: 'Multi-File POM Resolution', desc: 'Only solution addressing this at production scale' },
              ].map((moat, i) => (
                <div key={moat.title} className="flex items-start gap-3">
                  <Shield size={20} className="text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{moat.title}</h3>
                    <p className="text-xs text-gray-500">{moat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* GTM */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">GTM & Traction</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Target size={24} className="text-blue-400 mb-4" />
                <h3 className="text-base font-semibold text-white mb-2">Target Buyer</h3>
                <p className="text-sm text-gray-500">QA Engineering Leads and VP Engineering at SaaS companies with 20-500 engineers</p>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Building2 size={24} className="text-purple-400 mb-4" />
                <h3 className="text-base font-semibold text-white mb-2">Primary Market</h3>
                <p className="text-sm text-gray-500">UAE/GCC (data sovereignty aligned) + global SaaS via GitHub Marketplace</p>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <TrendingUp size={24} className="text-green-400 mb-4" />
                <h3 className="text-base font-semibold text-white mb-2">Accelerator Targets</h3>
                <p className="text-sm text-gray-500">DIFC Innovation Hub Ignyte program, global YC-style programs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Eliminate Flaky Tests?</h2>
            <p className="text-gray-500 mb-8">Join the waitlist for early access to Selvenza V2</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://cal.com/stuti-sg19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold rounded-xl transition-all hover:scale-105 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', color: '#fff' }}
              >
                Request Early Access
                <ArrowRight size={16} />
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold rounded-xl transition-all hover:scale-105 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
              >
                Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  )
}
