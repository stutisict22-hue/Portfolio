'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Award, ExternalLink, CheckCircle } from 'lucide-react'

// Company logo URLs from reliable sources (Wikipedia/Wikimedia Commons)
const COMPANY_LOGOS: Record<string, string> = {
  'Oracle': 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
  'Amazon Web Services': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  'Google Cloud': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'Stanford Online': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Leland_Stanford_Junior_University.svg',
  'MongoDB': 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
  'IBM': 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  'Cisco': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
  'LinkedIn': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
  'Coursera': 'https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg',
  'freeCodeCamp': 'https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png',
  'HackerRank': 'https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png',
  'Udemy': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg',
  'Google': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'DeepLearning.AI': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
}

// Top 15 Best Certifications for impression
const TOP_CERTIFICATIONS = [
  { id: 'ora-genai-2025', name: 'Oracle Cloud Infrastructure Generative AI Professional 2025', issuer: 'Oracle', date: 'Oct 2025', url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=69D5AA45E4F1EE421163DECE887DFB94A6543A720EC84711981D41746C0B2E8F', color: '#f80000' },
  { id: 'ora-ds-2025', name: 'Oracle Cloud Infrastructure Data Science Professional 2025', issuer: 'Oracle', date: 'Oct 2025', url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=5BE677431728D367E996AE9A5E6A593A5EDD5EF7D908A1078D4BCBD7F2D1DB7A', color: '#f80000' },
  { id: 'aws-ml-readiness', name: 'AWS Certified Machine Learning - Specialty', issuer: 'Amazon Web Services', date: 'Jan 2024', url: 'https://explore.skillbuilder.aws/learn/course/27/exam-readiness-aws-certified-machine-learning-specialty', color: '#ff9900' },
  { id: 'aws-knowledge', name: 'AWS Knowledge: Architecting', issuer: 'Amazon Web Services', date: 'Jan 2024', url: 'https://www.credly.com/badges/d097a825-81f8-4d7f-8260-c60d08e14197/linked_in_profile', color: '#ff9900' },
  { id: 'gcp-gemini', name: 'Inspect Rich Documents with Gemini Multimodality', issuer: 'Google Cloud', date: 'Mar 2025', url: 'https://www.credly.com/badges/1966a996-6199-411a-9c02-d9259bb854ec/linked_in_profile', color: '#4285f4' },
  { id: 'gcp-bert', name: 'Transformer Models and BERT Model', issuer: 'Google Cloud', date: 'Feb 2025', url: 'https://www.cloudskillsboost.google/public_profiles/178fc623-c640-461b-a343-39dd4aee55be/badges/13959751', color: '#4285f4' },
  { id: 'gcp-responsible', name: 'Responsible AI for Developers', issuer: 'Google Cloud', date: 'Feb 2025', url: 'https://www.cloudskillsboost.google/public_profiles/178fc623-c640-461b-a343-39dd4aee55be/badges/13969759', color: '#4285f4' },
  { id: 'ms-azure-openai', name: 'Azure OpenAI Service - Generative AI Solutions', issuer: 'Microsoft', date: 'May 2024', url: 'https://learn.microsoft.com/api/achievements/share/en-us/StutiGohil-5419/DGQHK5TJ', color: '#00a4ef' },
  { id: 'ms-copilot', name: 'GitHub Copilot Fundamentals', issuer: 'Microsoft', date: 'May 2024', url: 'https://learn.microsoft.com/api/achievements/share/en-us/StutiGohil-5419/ZPFT7G42', color: '#00a4ef' },
  { id: 'ms-power-platform', name: 'Power Platform Solutions with AI and Copilot', issuer: 'Microsoft', date: 'May 2024', url: 'https://learn.microsoft.com/api/achievements/share/en-us/StutiGohil-5419/HYGVULU8', color: '#00a4ef' },
  { id: 'stanford-adv-ml', name: 'Advanced Learning Algorithms', issuer: 'Stanford Online', date: 'Mar 2025', url: 'https://www.coursera.org/account/accomplishments/verify/JUITLM3GBHGI', color: '#8c1515' },
  { id: 'stanford-genai-llm', name: 'Generative AI with Large Language Models', issuer: 'Stanford Online', date: 'Oct 2024', url: 'https://coursera.org/share/a7dfe7be09c756ce2ac8fb8b46a5ac99', color: '#8c1515' },
  { id: 'mongodb-intro', name: 'Introduction to AI and Vector Search', issuer: 'MongoDB', date: 'Oct 2024', url: 'https://learn.mongodb.com/c/HOfSIHyVSf2qvRAZ6UDwbA', color: '#47A248' },
  { id: 'mongodb-vector', name: 'Using Vector Search for Semantic Search', issuer: 'MongoDB', date: 'Oct 2024', url: 'https://learn.mongodb.com/c/HBAi3wdeTGG0-A5OoSbeJg', color: '#47A248' },
  { id: 'ibm-watson', name: 'Virtual Intelligent Agents with IBM Watson', issuer: 'IBM', date: 'Jan 2024', url: 'https://learn.ibm.com/course/view.php?id=12340#', color: '#0530ad' },
]

function CertificationCard({ cert, index }: { cert: typeof TOP_CERTIFICATIONS[0]; index: number }) {
  const logoUrl = COMPANY_LOGOS[cert.issuer] || ''
  
  return (
    <motion.a
      href={cert.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative block p-5 rounded-2xl"
      style={{
        background: 'rgba(30,41,59,0.5)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${cert.color}15 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      <div className="relative z-10">
        {/* Logo & Issuer */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white/10 border border-white/20">
            {logoUrl ? (
              <Image
                src={logoUrl} 
                alt={cert.issuer}
                width={32}
                height={32}
                className="w-8 h-8 object-contain opacity-90"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <CheckCircle size={24} style={{ color: cert.color }} />
            )}
          </div>
          <ExternalLink size={14} className="text-white/40 group-hover:text-white transition-colors" />
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-white mb-2 leading-tight group-hover:text-white transition-colors line-clamp-2">
          {cert.name}
        </h3>

        {/* Issuer & Date */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/70">{cert.issuer}</span>
          <span className="text-white/70">{cert.date}</span>
        </div>
      </div>
    </motion.a>
  )
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="portfolio-section tone-amber relative py-32 md:py-40 lg:py-48"
      style={{ background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 relative isolate"
        >
          <div className="relative z-10 flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              05 - Credentials
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
          </div>
          <h2 className="relative z-10 text-heading text-slate-100 font-semibold mx-auto max-w-5xl leading-[1]">
            <span className="gradient-text-animated block md:inline">Certifications</span>
            <span className="text-slate-100 block md:inline md:ml-3">& Credentials</span>
          </h2>
          <p className="relative z-10 text-slate-400 mt-5 max-w-2xl mx-auto text-balance">
            Earned multiple certifications from highly recognized global companies and institutions
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 mb-12 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl"
        >
          <div className="py-6 px-6 text-center">
            <div className="text-3xl font-bold text-white mb-1">60+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Total Certifications</div>
          </div>
          <div className="py-6 px-6 text-center">
            <div className="text-3xl font-bold text-white mb-1">10+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Global Companies</div>
          </div>
          <div className="py-6 px-6 text-center">
            <div className="text-3xl font-bold text-white mb-1">5</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Cloud Platforms</div>
          </div>
        </motion.div>

        {/* Company logos banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-12 py-6 px-8 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
        >
          {Object.entries(COMPANY_LOGOS).slice(0, 8).map(([company, url]) => (
            <Image
              key={company}
              src={url} 
              alt={company}
              width={112}
              height={28}
              className="h-7 opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ))}
        </motion.div>

        {/* Top 15 Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {TOP_CERTIFICATIONS.map((cert, i) => (
            <CertificationCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* View All Certifications */}
          <a
            href="/certifications"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium rounded-xl transition-all hover:scale-[1.02]"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}
          >
            <Award size={18} />
            View All Certifications
            <ExternalLink size={14} />
          </a>

          {/* Verify on LinkedIn */}
          <a
            href="https://www.linkedin.com/in/stuti-gohil/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium rounded-xl transition-all hover:scale-[1.02]"
            style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(15,23,42,0.1)', color: '#1e293b' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Verify on LinkedIn
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
