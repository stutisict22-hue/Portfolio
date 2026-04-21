'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Download, ExternalLink, FileText, Calendar, Eye } from 'lucide-react'
import RouteNavigation from '@/components/nav/RouteNavigation'

export default function ResumePage() {
  const [pdfError, setPdfError] = useState(false)

  return (
    <div className="portfolio-route-page">
      <RouteNavigation accent="#0d9488" />

      <div className="route-page-content">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[800px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', boxShadow: '0 0 40px rgba(245,158,11,0.3)' }}
            >
              <FileText size={36} className="text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="gradient-text-animated">The Codex</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
              Full resume — last updated March 2026
            </p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a
                href="/Stuti-Resume_IND.pdf"
                download
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff' }}
              >
                <Download size={18} />
                Download Resume
              </a>
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
                View LinkedIn Profile
                <ExternalLink size={16} />
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-xl transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
              >
                <ArrowRight size={16} className="rotate-180" />
                Back to Portfolio
              </Link>
            </motion.div>
          </motion.div>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-8 mb-8"
          >
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={14} />
              <span className="text-xs">Updated: March 2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <FileText size={14} />
              <span className="text-xs">PDF Format</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Eye size={14} />
              <span className="text-xs">ATS-Friendly</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PDF Viewer */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="relative w-full flex items-center justify-center" style={{ height: '80vh', minHeight: '500px' }}>
              {!pdfError ? (
                <iframe
                  src="/Stuti-Resume_IND.pdf#toolbar=0&navpanes=0"
                  className="w-full h-full"
                  title="Stuti Gohil Resume"
                  onError={() => setPdfError(true)}
                  style={{ border: 'none', background: '#fff' }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
                  >
                    <FileText size={40} className="text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Unable to load preview</h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Your browser may not support inline PDF viewing. Download the resume directly instead.
                  </p>
                  <a
                    href="/Stuti-Resume_IND.pdf"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff' }}
                  >
                    <Download size={16} />
                    Download Resume
                  </a>
                </div>
              )}
            </div>

            {/* Info Bar */}
            <div className="p-4 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-amber-400" />
                <div>
                  <p className="text-sm font-medium text-white">Stuti Gohil — Resume</p>
                  <p className="text-xs text-gray-600">AI Developer & Multi-Agent Systems Architect</p>
                </div>
              </div>
              <a
                href="/Stuti-Resume_IND.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}
              >
                <Download size={14} />
                Download PDF
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-6">Quick Highlights</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: 'AI Developer', sub: 'SporTech Innovation Lab' },
                { label: '60+ Certifications', sub: 'AWS, Oracle, Google, Microsoft' },
                { label: '200K+ Impressions', sub: 'LinkedIn Thought Leadership' },
                { label: 'McKinsey Forward', sub: 'Leadership Program Alumna' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-xl text-center"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="text-base font-semibold text-white mb-1">{item.label}</p>
                  <p className="text-xs text-gray-600">{item.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
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
