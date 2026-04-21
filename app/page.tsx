'use client'

import Navigation from '@/components/nav/Navigation'
import Hero from '@/components/hero/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Certifications from '@/components/sections/Certifications'
import Experience from '@/components/sections/Experience'
import Showcase from '@/components/sections/Showcase'
import Contact from '@/components/sections/Contact'
import ConversionCta from '@/components/sections/ConversionCta'
import CaseStudies from '@/components/sections/CaseStudies'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Showcase />
      <Projects />
      <Experience />
      <Certifications />
      <Skills />
      <CaseStudies />
      <ConversionCta />
      <Contact />
    </main>
  )
}
