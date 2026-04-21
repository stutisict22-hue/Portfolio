# Portfolio-Claude — Deployment Guide

## Quick Start

```bash
# 1. Install dependencies
npm install
# or
pnpm install

# 2. Run development server
npm run dev
# → Open http://localhost:3000
```

## Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# For production deployment
vercel --prod
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). Vercel auto-detects Next.js.

## Customize Your Content

All portfolio content lives in **`lib/data.ts`** — edit this file to personalize:

- `PERSONAL` — Your name, role, bio, social links
- `PROJECTS` — Your projects with descriptions, metrics, tags
- `SKILLS` — Your skills and proficiency levels
- `EXPERIENCE` — Your work history and education

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| 3D / WebGL | React Three Fiber + Drei |
| Postprocessing | @react-three/postprocessing |
| Animation | GSAP 3.12 + Framer Motion 11 |
| Smooth Scroll | Lenis |
| Icons | Lucide React |

## Performance Notes

- 3D scenes use `dynamic(() => import(...), { ssr: false })` for optimal LCP
- `dpr={[1, 2]}` caps pixel ratio at 2 for performance
- `prefers-reduced-motion` disables animations for accessibility
- Particle counts are reduced on mobile automatically

## Environment Variables (Optional)

Create `.env.local` if you want to add form handling:

```env
# Example: Formspree
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your-id

# Example: Resend email
RESEND_API_KEY=re_xxx
```

The contact form at `components/sections/Contact.tsx` is ready to wire up.

## Easter Eggs

The site has a hidden Easter egg in the footer — try clicking "Made with ☕ & ✨"
