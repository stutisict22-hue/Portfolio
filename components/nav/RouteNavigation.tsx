'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react'
import { PERSONAL } from '@/lib/data'

const ROUTES = [
  { href: '/', label: 'Home' },
  { href: '/writing', label: 'Writing' },
  { href: '/selvenza', label: 'Selvenza' },
  { href: '/resume', label: 'Resume' },
  { href: '/certifications', label: 'Certifications' },
]

export default function RouteNavigation({ accent = '#0284c7' }: { accent?: string }) {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-[1200] px-4 md:px-6 pt-3">
      <div
        className="mx-auto max-w-[1240px] rounded-2xl"
        style={{
          background: 'rgba(248,251,255,0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(15,23,42,0.12)',
          boxShadow: '0 14px 38px rgba(15,23,42,0.1)',
        }}
      >
        <div className="flex h-[68px] items-center justify-between px-4 md:px-6">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(2,132,199,0.18), rgba(20,184,166,0.2))',
                border: '1px solid rgba(2,132,199,0.3)',
              }}
            >
              <ArrowLeft size={15} className="text-slate-800 transition-transform group-hover:-translate-x-0.5" />
            </span>
            <span className="hidden sm:block text-sm font-semibold text-slate-900">{PERSONAL.firstName} Portfolio</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(15,23,42,0.08)' }}>
            {ROUTES.map((route) => {
              const isActive = pathname === route.href || (route.href !== '/' && pathname?.startsWith(route.href))
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className="relative rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors"
                  style={{ color: isActive ? '#0f172a' : '#64748b' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="route-nav-active"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(2,132,199,0.2), rgba(20,184,166,0.15))',
                        border: '1px solid rgba(2,132,199,0.34)',
                      }}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{route.label}</span>
                </Link>
              )
            })}
          </nav>

          <a
            href="https://cal.com/stuti-sg19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${accent}, #0d9488)`,
              boxShadow: '0 10px 24px rgba(2,132,199,0.28)',
            }}
          >
            <Sparkles size={13} />
            <span className="hidden sm:inline">Book Intro Call</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </header>
  )
}
