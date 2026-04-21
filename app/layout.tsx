import type { Metadata, Viewport } from 'next'
import { Manrope, Space_Grotesk } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'
import ExperienceEnhancer from '@/components/ui/ExperienceEnhancer'
import { PERSONAL } from '@/lib/data'

// ---- Fonts ----
const inter = Manrope({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const sora = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// ---- Metadata ----
export const metadata: Metadata = {
  title: `${PERSONAL.name} — ${PERSONAL.role}`,
  description: PERSONAL.tagline,
  keywords: [
    'AI developer', 'portfolio', 'multi-agent systems', 'generative AI', 'RAG',
    'LangGraph', 'LLM', 'machine learning', 'next.js', 'python',
  ],
  authors: [{ name: PERSONAL.name }],
  creator: PERSONAL.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: `${PERSONAL.name} — ${PERSONAL.role}`,
    description: PERSONAL.tagline,
    siteName: `${PERSONAL.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL.name} — ${PERSONAL.role}`,
    description: PERSONAL.tagline,
    creator: '@stutigohil',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f1e8',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// ---- Root Layout ----
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
        <SmoothScroll>
          <ExperienceEnhancer />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
