'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Award, ExternalLink, CheckCircle, ArrowRight, Star, TrendingUp, Globe } from 'lucide-react'
import RouteNavigation from '@/components/nav/RouteNavigation'

// Company logo URLs from reliable sources (Wikipedia/Wikimedia Commons)
const COMPANY_LOGOS: Record<string, string> = {
  'Oracle': 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
  'Amazon Web Services': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  'Google Cloud': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'Stanford Online & Coursera': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Leland_Stanford_Junior_University.svg',
  'IBM': 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  'MongoDB': 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
  'Cisco': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
  'Other Companies': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
  'freeCodeCamp': 'https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png',
  'HackerRank': 'https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png',
  'LinkedIn Learning': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
  'Udemy': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg',
  'Google Analytics': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'Be10x': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
}

// All certifications organized by company
const CERTIFICATIONS_BY_COMPANY = {
  'Oracle': {
    logo: COMPANY_LOGOS['Oracle'],
    color: '#f80000',
    tagline: 'Cloud Infrastructure & AI Professional',
    certs: [
      { id: 'ora-genai-2025', name: 'Oracle Cloud Infrastructure Generative AI Professional 2025', date: 'Oct 2025', url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=69D5AA45E4F1EE421163DECE887DFB94A6543A720EC84711981D41746C0B2E8F' },
      { id: 'ora-ds-2025', name: 'Oracle Cloud Infrastructure Data Science Professional 2025', date: 'Oct 2025', url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=5BE677431728D367E996AE9A5E6A593A5EDD5EF7D908A1078D4BCBD7F2D1DB7A' },
    ]
  },
  'Amazon Web Services': {
    logo: COMPANY_LOGOS['Amazon Web Services'],
    color: '#ff9900',
    tagline: 'Cloud Architecture & Machine Learning',
    certs: [
      { id: 'aws-arch-sim', name: 'AWS APAC - Solutions Architecture Job Simulation', date: 'Dec 2023', url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/AWS/kkE9HyeNcw6rwCRGw_AWS%20APAC_K7Wb97yL2WXiu4tbT_1702291147934_completion_certificate.pdf' },
      { id: 'aws-ml-readiness', name: 'Exam Readiness: AWS Certified Machine Learning - Specialty', date: 'Jan 2024', url: 'https://explore.skillbuilder.aws/learn/course/27/exam-readiness-aws-certified-machine-learning-specialty' },
      { id: 'aws-knowledge', name: 'AWS Knowledge: Architecting', date: 'Jan 2024', url: 'https://www.credly.com/badges/d097a825-81f8-4d7f-8260-c60d08e14197/linked_in_profile' },
    ]
  },
  'Google Cloud': {
    logo: COMPANY_LOGOS['Google Cloud'],
    color: '#4285f4',
    tagline: 'AI, Machine Learning & Cloud Skills',
    certs: [
      { id: 'gcp-gemini', name: 'Inspect Rich Documents with Gemini Multimodality and Multimodal RAG', date: 'Mar 2025', url: 'https://www.credly.com/badges/1966a996-6199-411a-9c02-d9259bb854ec/linked_in_profile' },
      { id: 'gcp-encoder', name: 'Encoder-Decoder Architecture', date: 'Feb 2025', url: 'https://www.cloudskillsboost.google/public_profiles/178fc623-c640-461b-a343-39dd4aee55be/badges/13955769' },
      { id: 'gcp-bert', name: 'Transformer Models and BERT Model', date: 'Feb 2025', url: 'https://www.cloudskillsboost.google/public_profiles/178fc623-c640-461b-a343-39dd4aee55be/badges/13959751' },
      { id: 'gcp-caption', name: 'Create Image Captioning Models', date: 'Feb 2025', url: 'https://www.cloudskillsboost.google/public_profiles/178fc623-c640-461b-a343-39dd4aee55be/badges/13961020' },
      { id: 'gcp-responsible', name: 'Responsible AI for Developers: Fairness & Bias', date: 'Feb 2025', url: 'https://www.cloudskillsboost.google/public_profiles/178fc623-c640-461b-a343-39dd4aee55be/badges/13969759' },
      { id: 'gcp-image-gen', name: 'Introduction to Image Generation', date: 'Oct 2024', url: 'https://www.cloudskillsboost.google/public_profiles/178fc623-c640-461b-a343-39dd4aee55be/badges/12117468' },
      { id: 'gcp-attention', name: 'Attention Mechanism', date: 'Oct 2024', url: 'https://www.cloudskillsboost.google/public_profiles/178fc623-c640-461b-a343-39dd4aee55be/badges/12117550' },
      { id: 'google-pm', name: 'Foundations of Project Management', date: 'Jun 2024', url: 'https://www.coursera.org/account/accomplishments/verify/ZZRQ59QG53PU' },
    ]
  },
  'Microsoft': {
    logo: COMPANY_LOGOS['Microsoft'],
    color: '#00a4ef',
    tagline: 'Azure AI & Platform Development',
    certs: [
      { id: 'ms-azure-openai', name: 'Develop Generative AI Solutions with Microsoft Azure OpenAI Service', date: 'May 2024', url: 'https://learn.microsoft.com/api/achievements/share/en-us/StutiGohil-5419/DGQHK5TJ' },
      { id: 'ms-copilot', name: 'GitHub Copilot Fundamentals', date: 'May 2024', url: 'https://learn.microsoft.com/api/achievements/share/en-us/StutiGohil-5419/ZPFT7G42' },
      { id: 'ms-power-platform', name: 'Create Power Platform solutions with AI and Copilot', date: 'May 2024', url: 'https://learn.microsoft.com/api/achievements/share/en-us/StutiGohil-5419/HYGVULU8' },
      { id: 'ms-powerbi', name: 'Get started with building Power BI', date: 'Jan 2024', url: 'https://learn.microsoft.com/api/achievements/share/en-us/StutiGohil-5419/ZP3LRNF2' },
      { id: 'ms-data-analysis', name: 'Career Essentials in Data Analysis by Microsoft and LinkedIn', date: 'Oct 2024', url: 'https://www.linkedin.com/learning/certificates/5c58596ec8d30965ad81471471774c89f542bd41fec9263b27221ab2fc320aa7' },
    ]
  },
  'Stanford Online & Coursera': {
    logo: COMPANY_LOGOS['Stanford Online & Coursera'],
    color: '#8c1515',
    tagline: 'Machine Learning & AI Specializations',
    certs: [
      { id: 'stanford-adv-ml', name: 'Advanced Learning Algorithms', date: 'Mar 2025', url: 'https://www.coursera.org/account/accomplishments/verify/JUITLM3GBHGI' },
      { id: 'stanford-genai-llm', name: 'Generative AI with Large Language Models', date: 'Oct 2024', url: 'https://coursera.org/share/a7dfe7be09c756ce2ac8fb8b46a5ac99' },
      { id: 'stanford-genai-intro', name: 'Introduction to Generative AI', date: 'Mar 2024', url: 'https://www.coursera.org/account/accomplishments/records/PHBN57V4M78Q' },
      { id: 'stanford-ai-everyone', name: 'AI For Everyone', date: 'Apr 2024', url: 'https://www.coursera.org/account/accomplishments/records/MBE27FPABU2B' },
      { id: 'stanford-facial', name: 'Emotion AI: Facial Key-points Detection', date: 'Mar 2024', url: 'https://coursera.org/share/f9a4ca0f33a50b3aa8f5c037964eae4d' },
      { id: 'stanford-rekognition', name: 'Recognizing Facials and Objects with Amazon Rekognition', date: 'Apr 2024', url: 'https://www.coursera.org/account/accomplishments/records/8NZGAP3C4W87' },
      { id: 'stanford-ml-py', name: 'Machine Learning with Python', date: 'Jan 2024', url: 'https://www.credly.com/badges/61684493-4faa-4fe8-bc6a-808e01f6234f/linked_in_profile' },
      { id: 'imperial-creative', name: 'Creative Thinking: Techniques and Tools for Success', date: 'Apr 2024', url: '' },
      { id: 'unity-fire', name: 'Create Fire with Particle Effects in Unity', date: 'Mar 2024', url: 'https://coursera.org/share/7d31380d354ed0f6f4cd711280991a2f' },
    ]
  },
  'IBM': {
    logo: COMPANY_LOGOS['IBM'],
    color: '#0530ad',
    tagline: 'AI & Data Science Foundations',
    certs: [
      { id: 'ibm-voice', name: 'Improve customer support with AI powered voice service', date: 'Jan 2024', url: 'https://courses.cognitiveclass.ai/certificates/a76ec5000fc4471ab5adca95778785f4' },
      { id: 'ibm-sql', name: 'SQL and Relational Databases 101', date: 'Jan 2024', url: 'https://courses.cognitiveclass.ai/certificates/281d28e1dda04f008ead0c3bd4f9703b' },
      { id: 'ibm-watson', name: 'Introduction to Virtual Intelligent Agents with IBM Watson Assistant', date: 'Jan 2024', url: 'https://learn.ibm.com/course/view.php?id=12340#' },
    ]
  },
  'MongoDB': {
    logo: COMPANY_LOGOS['MongoDB'],
    color: '#47A248',
    tagline: 'Vector Search & AI Integration',
    certs: [
      { id: 'mongodb-intro', name: 'Introduction to AI and Vector Search', date: 'Oct 2024', url: 'https://learn.mongodb.com/c/HOfSIHyVSf2qvRAZ6UDwbA' },
      { id: 'mongodb-vector', name: 'Using Vector Search for Semantic Search', date: 'Oct 2024', url: 'https://learn.mongodb.com/c/HBAi3wdeTGG0-A5OoSbeJg' },
    ]
  },
  'Cisco': {
    logo: COMPANY_LOGOS['Cisco'],
    color: '#0495d4',
    tagline: 'Networking & Python',
    certs: [
      { id: 'cisco-ds', name: 'Introduction to Data science', date: 'Aug 2023', url: 'https://www.credly.com/badges/9d910d40-c840-47d9-839d-86ce4a3b8126/public_url' },
      { id: 'cisco-py', name: 'Python Essentials 2', date: 'Oct 2024', url: 'https://www.credly.com/badges/d5daf703-9e74-42c3-9f95-80bd684523d2/linked_in_profile' },
    ]
  },
  'Other Companies': {
    logo: COMPANY_LOGOS['Other Companies'],
    color: '#0a66c2',
    tagline: 'Industry Leaders & Platforms',
    certs: [
      { id: 'bcg-data', name: 'Data Science - Boston Consulting Group', date: 'Feb 2025', url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/SKZxezskWgmFjRvj9/Tcz8gTtprzAS4xSoK_SKZxezskWgmFjRvj9_K7Wb97yL2WXiu4tbT_1739085127706_completion_certificate.pdf' },
      { id: 'walmart', name: 'Walmart USA - Advanced Software Engineering', date: 'Feb 2024', url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Walmart%20USA/oX6f9BbCL9kJDJzfg_Walmart%20USA_K7Wb97yL2WXiu4tbT_1706869781205_completion_certificate.pdf' },
      { id: 'goldman', name: 'Software Engineering Virtual Experience - Goldman Sachs', date: 'Jul 2023', url: 'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.theforage.com%2Fvirtual-internships%2Fprototype%2FNPdeQ43o8P9HJmJzg%2FGoldman-Sachs-Virtual-Experience-Program' },
      { id: 'infosys', name: 'AI-First Software Engineer - Infosys', date: 'Dec 2023', url: 'https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_0137283781200445441174_shared/overview' },
      { id: 'pepsico', name: 'PepsheCo Sales Star Program - PepsiCo', date: 'Apr 2024', url: '' },
      { id: 'pmi-genai', name: 'Generative AI Overview for Project Managers - PMI', date: 'Jun 2024', url: 'https://www.credly.com/badges/009d3c72-fb37-49f1-a075-4661307c18ac/linked_in_profile' },
      { id: 'hp-data', name: 'Data Science & Analytics - HP', date: 'Dec 2023', url: '' },
      { id: 'who-powerbi', name: 'Go.Data: Building additional dashboards in Power BI - WHO', date: 'Jan 2024', url: 'https://openwho.org/verify/xotor-bupom-gosur-samom-repop' },
      { id: 'unstop-flipkart', name: 'Flipkart Runway: Season 4 - Unstop', date: 'Apr 2024', url: 'https://unstop.com/certificate-preview/6906384c-94a8-42eb-bd19-f162107598ad' },
    ]
  },
}

// Certifications from learning platforms
const LEARNING_PLATFORMS = {
  'freeCodeCamp': {
    logo: COMPANY_LOGOS['freeCodeCamp'],
    color: '#0a0a0a',
    certs: [
      { id: 'fcc-web', name: 'Responsive Web Design', date: 'Jun 2023', url: 'https://freecodecamp.org/certification/Stuti_gohil/responsive-web-design' },
      { id: 'fcc-frontend', name: 'Web development all Libraries', date: 'Jul 2023', url: 'https://freecodecamp.org/certification/Stuti_gohil/front-end-development-libraries' },
      { id: 'fcc-ml', name: 'Machine Learning with Python', date: 'May 2024', url: 'https://freecodecamp.org/certification/Stuti_gohil/machine-learning-with-python-v7' },
    ]
  },
  'HackerRank': {
    logo: COMPANY_LOGOS['HackerRank'],
    color: '#00ea64',
    certs: [
      { id: 'hackerrank-css', name: 'CSS', date: 'Jul 2023', url: 'https://www.hackerrank.com/certificates/iframe/cf7c4067929d' },
      { id: 'hackerrank-java', name: 'Java', date: 'Jul 2023', url: 'https://www.hackerrank.com/certificates/iframe/a8cd7147d039' },
    ]
  },
  'LinkedIn Learning': {
    logo: COMPANY_LOGOS['LinkedIn Learning'],
    color: '#0a66c2',
    certs: [
      { id: 'li-genai', name: 'Generative AI', date: 'Jan 2024', url: 'https://www.linkedin.com/learning/certificates/1941a869493796ccc0d9978980d6fbae1714e97f79f97951c6c1030e33830201' },
      { id: 'li-llm', name: 'Generative AI: Working with Large Language Models', date: 'Oct 2024', url: 'https://www.linkedin.com/learning/certificates/3465918033bc7a6583b72c3404f68f6938bc2627255e26c4eac8d31bf301b66f' },
      { id: 'li-data-career', name: 'Introduction to Career Skills in Data Analytics', date: 'Oct 2024', url: 'https://www.linkedin.com/learning/certificates/79a780c2645827dee09244af5520ac35395c353041ada1144a2a1eb286e258a6' },
      { id: 'li-data-explore', name: 'Explore a Career in Data Analysis', date: 'Oct 2024', url: 'https://www.linkedin.com/learning/certificates/d4c688efa8e17f30e305ae2c73eb0bbc19aa5eb6f399dc021d2976a8dbf68d58' },
    ]
  },
  'Udemy': {
    logo: COMPANY_LOGOS['Udemy'],
    color: '#a435f0',
    certs: [
      { id: 'udemy-powerbi', name: 'Data Visualization with Power BI', date: 'Jan 2024', url: 'https://www.udemy.com/certificate/UC-830d533a-f47b-450b-9cc0-b8537cce9fbe/' },
      { id: 'udemy-mysql', name: 'MySQL Crash-course Certificate', date: 'Jan 2024', url: 'https://www.udemy.com/certificate/UC-bf59aa78-5659-4a9a-ab2d-cf244bbcf239/' },
      { id: 'udemy-python', name: 'Data Manipulation in python', date: 'Jan 2024', url: 'https://www.udemy.com/certificate/UC-8e4e1959-459d-4899-96b0-5be86f08ce2e/' },
    ]
  },
  'Google Analytics': {
    logo: COMPANY_LOGOS['Google Analytics'],
    color: '#f9ab00',
    certs: [
      { id: 'ga-exam', name: 'Google Analytics Exam', date: 'Jan 2024', url: 'https://skillshop.exceedlms.com/student/award/kA5fnLAXikVVf7McPHEmXvqu' },
      { id: 'ga-verified', name: 'Verified Google Analytics', date: 'Jan 2024', url: 'https://skillshop.credential.net/dd34ecc4-5644-4c41-9bc7-aa67a5135a4b' },
    ]
  },
  'Be10x': {
    logo: COMPANY_LOGOS['Be10x'],
    color: '#ff6b00',
    certs: [
      { id: 'be10x-mastery', name: 'Mastery Program of AI', date: 'Jan 2024', url: '' },
      { id: 'be10x-workshop', name: 'AI Workshop', date: 'Sep 2023', url: '' },
    ]
  },
}

interface CompanyData {
  logo: string
  color: string
  tagline?: string
  certs: { id: string; name: string; date: string; url: string }[]
}

function CompanySection({ company, data, index }: { company: string; data: CompanyData; index: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="mb-16"
    >
      {/* Company header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center" style={{ background: `${data.color}20` }}>
          <Image
            src={data.logo} 
            alt={company}
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{company}</h3>
          <p className="text-xs text-gray-500">{data.tagline || `${data.certs.length} Certifications`}</p>
        </div>
        <div className="flex-1 h-px ml-4" style={{ background: `linear-gradient(90deg, ${data.color}40, transparent)` }} />
      </div>

      {/* Certifications grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-2">
        {data.certs.map((cert, i) => (
          <motion.a
            key={cert.id}
            href={cert.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative p-4 rounded-xl transition-all"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mt-1" style={{ background: `${data.color}20` }}>
                <CheckCircle size={16} style={{ color: data.color }} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white group-hover:text-gray-200 transition-colors line-clamp-2">{cert.name}</h4>
                <p className="text-xs text-gray-600 mt-1">{cert.date}</p>
              </div>
              <ExternalLink size={14} className="text-gray-600 group-hover:text-white transition-colors flex-shrink-0" />
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  )
}

export default function AllCertifications() {
  const totalCerts = Object.values(CERTIFICATIONS_BY_COMPANY).reduce((sum, c) => sum + c.certs.length, 0) +
                     Object.values(LEARNING_PLATFORMS).reduce((sum, p) => sum + p.certs.length, 0)

  return (
    <div className="portfolio-route-page">
      <RouteNavigation accent="#f59e0b" />

      <div className="route-page-content">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[800px] h-[400px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          {/* Header */}
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
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', boxShadow: '0 0 40px rgba(245,158,11,0.3)' }}
            >
              <Award size={36} className="text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              60+ <span className="gradient-text-animated">Certifications</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Earned multiple certifications from highly recognized institutions and global companies
            </p>
          </motion.div>

          {/* Company names banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="flex flex-wrap justify-center items-center gap-6 py-6 px-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <Image
                src={COMPANY_LOGOS['Cisco']} 
                alt="Cisco"
                width={128}
                height={32}
                className="h-8 object-contain invert"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              {['Oracle', 'AWS', 'Google', 'Microsoft', 'Stanford', 'IBM', 'MongoDB', 'LinkedIn', 'Coursera'].map((name) => (
                <span key={name} className="text-sm text-gray-500 hover:text-white transition-colors cursor-default">
                  {name}
                </span>
              ))}
              <span className="text-sm text-gray-600">+ more</span>
            </div>
            <p className="text-center text-xs text-gray-600 mt-3">Certified by world-class organizations</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { icon: Award, value: '60+', label: 'Total Certifications', color: '#f59e0b' },
              { icon: Globe, value: '10+', label: 'Global Companies', color: '#3b82f6' },
              { icon: Star, value: '5', label: 'Cloud Platforms', color: '#8b5cf6' },
              { icon: TrendingUp, value: '15+', label: 'Tech Domains', color: '#ec4899' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="p-5 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <stat.icon size={24} style={{ color: stat.color }} className="mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications by Company */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="w-8 h-1 rounded" style={{ background: '#f59e0b' }} />
              Certifications by Company
            </h2>
            <p className="text-sm text-gray-500">Grouped by issuing organization</p>
          </motion.div>

          {Object.entries(CERTIFICATIONS_BY_COMPANY).map(([company, data], index) => (
            <CompanySection key={company} company={company} data={data} index={index} />
          ))}
        </div>
      </section>

      {/* Learning Platforms */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="w-8 h-1 rounded" style={{ background: '#8b5cf6' }} />
              Learning Platforms
            </h2>
            <p className="text-sm text-gray-500">Continuous learning through online platforms</p>
          </motion.div>

          {Object.entries(LEARNING_PLATFORMS).map(([platform, data], index) => (
            <CompanySection key={platform} company={platform} data={data as unknown as CompanyData} index={index} />
          ))}
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
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
