// ============================================================
// PORTFOLIO CONTENT — Stuti Gohil
// ============================================================

export const PERSONAL = {
  name: 'Stuti Gohil',
  firstName: 'Stuti',
  lastName: 'Gohil',
  initials: 'SG',
  role: 'AI Developer & Multi-Agent Systems Architect',
  tagline: 'Building intelligent systems with Generative AI, RAG pipelines, and autonomous multi-agent workflows.',
  email: 'stutigohil1908@gmail.com',
  location: 'Pune, India',
  available: true,
  bio: [
    "I'm an AI Developer at SporTech Innovation Lab, architecting India's first Neural Sports Gaming Engine — a government-backed multi-agent system unifying the national sports ecosystem for millions of athletes.",
    "My expertise spans Generative AI, RAG pipelines, LLM fine-tuning, LangGraph orchestration, and autonomous agentic workflows. I build everything from CI/CD-ready automation tools to real-time anomaly detection systems that enforce smart contracts.",
    "With 60+ certifications from AWS, Google, Microsoft, IBM, Oracle, and Stanford, and 200K+ LinkedIn views, I bring both technical depth and strong communication to every problem I tackle.",
  ],
  philosophy: "Governance-first AI isn't a constraint — it's what separates systems that scale from systems that fail.",
  social: {
    github: 'https://github.com/Stuti19',
    linkedin: 'https://linkedin.com/in/stuti-gohil',
    twitter: 'https://twitter.com/stutigohil',
    dribbble: 'https://linktr.ee/Stuti_1908',
  },
}

export const STATS = [
  { value: 200, suffix: 'K+', label: 'LinkedIn Views' },
  { value: 5, suffix: '+', label: 'Projects Built' },
  { value: 60, suffix: '+', label: 'Certifications' },
  { value: 3, suffix: '+', label: 'Years Building' },
]

// ============================================================
// PROJECTS
// ============================================================

export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectGalleryImage {
  src: string
  alt: string
  caption?: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tags: string[]
  year: string
  url?: string
  github?: string
  image: string
  color: string
  accentColor: string
  metrics: ProjectMetric[]
  awards?: string[]
  gallery?: ProjectGalleryImage[]
}

export const PROJECTS: Project[] = [
  {
    id: 'neural-sports',
    title: 'Neural Sports Gaming Engine',
    subtitle: "India's First Unified Sports AI Core",
    description:
      "Government-backed multi-agent system unifying India's national sports ecosystem with centralized AI orchestration, event-driven Azure architecture, and sub-second certificate generation.",
    longDescription: `India's sports ecosystem was fragmented — no unified digital identity, no standardized data pipeline for millions of athletes. The Neural Sports Gaming Engine changes that.\n\nAt its core is a centralized Multi-Agent System where a single intelligent orchestrator manages specialized AI agents handling complex, distributed logic. This transition from static automation to dynamic, agentic workflow establishes the foundation for a nationwide digital identity framework.\n\nThe LevelUp NorthEast registration portal (built with Next.js + Azure Service Bus) handles burst traffic during national events with zero downtime via event-driven asynchronous message queuing. A serverless Dynamic Certificate Generation engine achieves sub-second generation times for thousands of unique assets using server-side HTML overlay — eliminating administrative overhead and setting a new standard for instant digital gratification in sports.`,
    tags: ['Next.js', 'Azure', 'Multi-Agent', 'LangGraph', 'Python', 'RAG', 'Azure Service Bus'],
    year: '2026',
    image: '/projects/portfolio-ai-placeholder.svg',
    color: '#4f46e5',
    accentColor: 'rgba(79,70,229,0.1)',
    metrics: [
      { label: 'Architecture', value: 'Multi-Agent' },
      { label: 'Backed By', value: 'Govt. of India' },
      { label: 'Certificate Gen', value: 'Sub-second' },
      { label: 'Status', value: 'Live 2026' },
    ],
    awards: ['Government of India Initiative', 'National Sports Ecosystem'],
  },
  {
    id: 'selvenza',
    title: 'Selvenza',
    subtitle: 'AI-Powered UI Test Automation',
    description:
      'First-of-its-kind CI/CD-ready automation tool that detects and heals UI selector drift in dynamic web apps, preventing flaky tests and ensuring test suite stability without manual intervention.',
    longDescription: `Selvenza was born out of a real pain: fast-moving React/Vite codebases breaking test suites constantly due to UI selector drift. The tool automates the entire selector lifecycle.\n\nBuilt during my internship at Infosoft LLC (Colorado, USA), Selvenza clones live GitHub repos, launches them locally with Puppeteer, extracts DOM selectors, compares versions, performs intelligent mapping, and auto-refactors .feature files, PageObjects, and step definitions — all in a single CI/CD-ready pipeline.\n\nBackstopJS integration provides pixel-level visual regression testing. A test skeleton generator, multi-page context-tagged selector tracking, and an interactive HTML report round out the toolset. The result: zero manual intervention when your UI changes.`,
    tags: ['Node.js', 'Puppeteer', 'WebdriverIO', 'Cucumber', 'BackstopJS', 'CI/CD', 'React'],
    year: '2025',
    image: '/projects/portfolio-ai-placeholder.svg',
    color: '#7c3aed',
    accentColor: 'rgba(124,58,237,0.1)',
    metrics: [
      { label: 'Selector Healing', value: 'Automated' },
      { label: 'Visual Regression', value: 'Pixel-level' },
      { label: 'CI/CD Ready', value: 'Yes' },
      { label: 'Type', value: 'Production' },
    ],
  },
  {
    id: 'smarttradex',
    title: 'SmartTradeX',
    subtitle: 'Autonomous AI Supply Chain Enforcer',
    description:
      'Self-healing logistics platform using Edge AI anomaly detection and LangGraph autonomous agents to enforce supply chain contracts in real-time, with Ethereum smart contract integration.',
    longDescription: `Traditional supply chains are reactive. If a container of vaccines overheats, the data is logged — but the financial loss happens anyway. SmartTradeX flips this to an active system.\n\nThe architecture: a simulator streams sensor data. The Edge Sentinel detects anomalies using statistical distribution analysis. When a breach is detected, a LangGraph Supervisor orchestrates three specialized agents: Logistics Agent (validates the reading), Compliance Agent (checks digital contract clauses), and Finance Agent (executes HOLD_PAYMENT).\n\nResults are published back to the system and visualized in real-time on Grafana. Phase 2 (in progress) integrates Ethereum Smart Contracts (Solidity) to make payment decisions execute directly on the blockchain — making the enforcement truly autonomous and immutable.`,
    tags: ['LangGraph', 'Python', 'Grafana', 'Multi-Agent', 'Blockchain', 'Solidity', 'Edge AI'],
    year: '2025',
    image: '/projects/portfolio-ai-placeholder.svg',
    color: '#0891b2',
    accentColor: 'rgba(8,145,178,0.1)',
    metrics: [
      { label: 'Detection', value: 'Real-time' },
      { label: 'Agents', value: '3 Specialized' },
      { label: 'Dashboard', value: 'Grafana' },
      { label: 'Phase 2', value: 'Blockchain' },
    ],
  },
  {
    id: 'emotion-ai',
    title: 'Emotion AI',
    subtitle: 'Facial Key-points Detection System',
    description:
      'Deep learning model using CNNs and Residual blocks with TensorFlow/Keras for real-time facial key-point detection — IBM Honors Project.',
    longDescription: `Emotion AI explores the intersection of computer vision and human-computer interaction through deep neural networks trained for facial analysis.\n\nThe architecture leverages Convolutional Neural Networks with Residual blocks (ResNet-style skip connections) — built and trained from scratch using Keras with TensorFlow 2.0 as backend. The model detects facial key-points in real-time with high accuracy across diverse lighting conditions and orientations.\n\nKey performance indicators track both accuracy and generalization — ensuring the model performs robustly on unseen data. Completed as an IBM Honors Project through Coursera, this project established my foundation in applied deep learning and computer vision.`,
    tags: ['TensorFlow', 'Keras', 'CNN', 'ResNet', 'Python', 'Computer Vision', 'Deep Learning'],
    year: '2024',
    image: '/projects/portfolio-ai-placeholder.svg',
    color: '#059669',
    accentColor: 'rgba(5,150,105,0.1)',
    metrics: [
      { label: 'Architecture', value: 'CNN + ResNet' },
      { label: 'Framework', value: 'TensorFlow 2.0' },
      { label: 'Honor', value: 'IBM Honors' },
      { label: 'Platform', value: 'Coursera' },
    ],
    awards: ['IBM Machine Learning Honors', 'Coursera Verified'],
  },
  {
    id: 'levelup-portal',
    title: 'LevelUp Northeast 2026',
    subtitle: 'Esports & Gaming Industry Event Portal',
    description:
      'Complete end-to-end registration system for a major CII & IDGS gaming event, handling 7+ event categories with multi-select dropdowns, real-time validation, and serverless backend.',
    longDescription: `LevelUp Northeast 2026 is a major gaming & esports industry event organized by the Confederation of Indian Industry (CII) and the Indian Digital Gaming Society (IDGS), happening on March 28-29, 2026.\n\nI designed and developed the complete end-to-end registration system from scratch, handling everything from UI/UX to backend integration. A fully responsive registration portal (desktop + mobile) using React, Vite, and Tailwind CSS with custom multi-select dropdowns, real-time form validation, and client-side image compression.\n\nThe serverless backend is powered by Google Apps Script — zero infrastructure overhead. Features include unique registration ID generation (IDGES2026_XXXXX) with duplicate prevention, profile photo upload with automatic compression using the Canvas API, and pixel-perfect responsive design with separate mobile-optimized components.\n\nHandles 7+ event categories including B2B Connect, Esports, Exhibition, Job Fair, and Masterclass. Supports multiple participant types — Visitors, Exhibitors, and Partners. Built-in legal compliance with digital waiver collection.`,
    tags: ['React', 'Vite', 'Tailwind CSS', 'Google Apps Script', 'Canvas API', 'TypeScript', 'Serverless'],
    year: '2026',
    image: '/projects/portfolio-ai-placeholder.svg',
    color: '#06b6d4',
    accentColor: 'rgba(6,182,212,0.1)',
    metrics: [
      { label: 'Event Type', value: 'CII & IDGS' },
      { label: 'Categories', value: '7+' },
      { label: 'Participants', value: 'Multi-type' },
      { label: 'Backend', value: 'Serverless' },
    ],
    awards: ['CII & IDGS Official Event', 'Industry Recognition'],
  },
  {
    id: 'hci-agent',
    title: 'Human Capital Intelligence Agent',
    subtitle: 'Autonomous Multi-Agent HR System',
    description:
      'Sovereign-first multi-agent swarm architecture covering the entire employee lifecycle — from talent sourcing to emotion-tagged exit interviews. 97.2% task success rate with 24ms latency.',
    longDescription: `A sovereign-first, multi-agent swarm architecture covering the entire employee lifecycle — from autonomous talent sourcing to emotion-tagged exit interviews.\n\nBuilt with Async Python FastAPI backend (Azure AKS-ready) with a Sovereign LLM (Jais-adapted) integration layer. The system achieves 97.2% overall task success rate with a median response latency of 24ms.\n\nFeatures 7 production-grade modules including a Master Swarm Orchestrator, Total Rewards modeling, and AI-led Performance Intelligence. Each agent in the swarm specializes in different HR functions, working together to provide comprehensive human capital management.\n\nThe architecture emphasizes data sovereignty and privacy-first design, making it suitable for enterprise deployment in regulated industries.`,
    tags: ['Python', 'FastAPI', 'LangGraph', 'Multi-Agent', 'Azure', 'LLM', 'Jais'],
    year: '2025',
    image: '/projects/hci-agent/image1.png',
    color: '#8b5cf6',
    accentColor: 'rgba(139,92,246,0.1)',
    metrics: [
      { label: 'Success Rate', value: '97.2%' },
      { label: 'Latency', value: '24ms' },
      { label: 'Modules', value: '7' },
      { label: 'Architecture', value: 'Multi-Agent' },
    ],
    awards: ['Production-Grade System', 'Sovereign AI Design'],
    gallery: [
      { src: '/projects/hci-agent/image1.png', alt: 'HCI Agent Dashboard', caption: 'Agent Dashboard Overview' },
      { src: '/projects/hci-agent/image2.png', alt: 'HCI Agent Analytics', caption: 'Performance Analytics' },
      { src: '/projects/hci-agent/image3.png', alt: 'HCI Agent Modules', caption: 'Agent Modules' },
      { src: '/projects/hci-agent/image4.png', alt: 'HCI Agent Orchestration', caption: 'Swarm Orchestration' },
      { src: '/projects/hci-agent/image5.png', alt: 'HCI Agent Monitoring', caption: 'Real-time Monitoring' },
      { src: '/projects/hci-agent/image6.png', alt: 'HCI Agent Reports', caption: 'Intelligence Reports' },
      { src: '/projects/hci-agent/image7.png', alt: 'HCI Agent Settings', caption: 'System Configuration' },
    ],
  },
]

// ============================================================
// SKILLS
// ============================================================

export interface Skill {
  name: string
  level: number // 0-100
  category: 'ai' | 'ml' | 'cloud' | 'data' | 'dev'
  description?: string
}

export const SKILLS: Skill[] = [
  // AI & Agentic Systems
  { name: 'Multi-Agent Systems (LangGraph)', level: 95, category: 'ai' },
  { name: 'RAG Pipelines', level: 92, category: 'ai' },
  { name: 'LLMs (GPT-4, Llama)', level: 93, category: 'ai' },
  { name: 'LangChain', level: 90, category: 'ai' },
  { name: 'Prompt Engineering', level: 94, category: 'ai' },
  { name: 'Fine-Tuning & RLHF', level: 85, category: 'ai' },
  { name: 'Transformer Models', level: 88, category: 'ai' },
  { name: 'Swarm Orchestration', level: 90, category: 'ai' },
  { name: 'Agentic Workflows', level: 93, category: 'ai' },
  { name: 'Tool-Use Agents', level: 89, category: 'ai' },
  { name: 'CrewAI / AutoGen', level: 85, category: 'ai' },
  { name: 'Autonomous Reasoning', level: 87, category: 'ai' },

  // Machine Learning
  { name: 'Python', level: 95, category: 'ml' },
  { name: 'PyTorch', level: 88, category: 'ml' },
  { name: 'TensorFlow / Keras', level: 87, category: 'ml' },
  { name: 'Scikit-learn', level: 86, category: 'ml' },
  { name: 'Pandas / NumPy', level: 90, category: 'ml' },
  { name: 'Edge AI', level: 82, category: 'ml' },

  // Backend & Cloud
  { name: 'Oracle Cloud', level: 82, category: 'cloud' },
  { name: 'AWS', level: 84, category: 'cloud' },
  { name: 'Google Cloud Platform', level: 80, category: 'cloud' },
  { name: 'Docker', level: 82, category: 'cloud' },
  { name: 'Microservices', level: 85, category: 'cloud' },
  { name: 'MQTT / Event-Driven', level: 80, category: 'cloud' },
  { name: 'REST APIs', level: 90, category: 'cloud' },
  { name: 'CI/CD Pipelines', level: 83, category: 'cloud' },

  // Data & DevOps
  { name: 'InfluxDB', level: 78, category: 'data' },
  { name: 'Grafana', level: 80, category: 'data' },
  { name: 'Git / GitHub', level: 90, category: 'data' },
  { name: 'Power BI', level: 80, category: 'data' },
  { name: 'SQL', level: 85, category: 'data' },

  // Development & Automation
  { name: 'TypeScript', level: 88, category: 'dev' },
  { name: 'C++', level: 75, category: 'dev' },
  { name: 'Puppeteer', level: 85, category: 'dev' },
  { name: 'WebdriverIO', level: 83, category: 'dev' },
  { name: 'Streamlit', level: 80, category: 'dev' },
  { name: 'FastAPI', level: 86, category: 'dev' },
  { name: 'Next.js / React', level: 87, category: 'dev' },
]

export const SKILL_SPHERE_NODES = [
  'Python', 'PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'RAG',
  'Multi-Agent', 'CrewAI', 'AutoGen', 'Swarm', 'GPT-4', 'Llama',
  'Next.js', 'React', 'Docker', 'CI/CD', 'AWS', 'GCP',
  'Generative AI', 'LLMs', 'Edge AI', 'Transformers', 'RLHF',
  'Power BI', 'SQL', 'InfluxDB', 'Grafana', 'Puppeteer', 'FastAPI',
  'Prompt Engineering', 'TypeScript', 'Oracle Cloud', 'Microservices',
  'REST APIs', 'MQTT', 'Streamlit', 'WebdriverIO', 'Agentic AI',
]

// ============================================================
// EXPERIENCE
// ============================================================

export interface ExperienceEntry {
  id: string
  company: string
  companyUrl?: string
  role: string
  period: string
  startYear: number
  location: string
  description: string
  achievements: string[]
  tech: string[]
  type: 'work' | 'education'
  logo?: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'sportech',
    company: 'SporTech Innovation Lab Pvt Ltd',
    role: 'AI Developer',
    period: 'Jan 2026 — Present',
    startYear: 2026,
    location: 'Pune, India',
    description:
      "I am currently spearheading the architectural development of India's first Neural Sports Gaming Engine, a strategic initiative supported by the Government of India to unify the fragmented national sports ecosystem. My core focus is engineering a centralized Multi-Agent System where a single intelligent orchestrator manages specialized AI agents to handle complex, distributed logic across the platform. This transition from static automation to a dynamic, agentic workflow is establishing the foundation for a nationwide digital identity framework that standardizes how sports data is processed, analyzed, and utilized at scale for millions of athletes.",
    achievements: [
      "Architecting India's first centralized Multi-Agent System with intelligent orchestrator managing specialized AI agents",
      'Engineering LevelUp NorthEast portal with Next.js + Azure Service Bus for event-driven architecture',
      'Building serverless Dynamic Certificate Generation engine achieving sub-second generation',
      'Architecting validation-first CMS for automatic scheduling conflict detection',
    ],
    tech: ['Next.js', 'Azure', 'Multi-Agent Systems', 'LangGraph', 'Python', 'RAG', 'Azure Service Bus'],
    type: 'work',
  },
  {
    id: 'infosoft',
    company: 'Infosoft LLC',
    companyUrl: 'https://infosoftllc.com',
    role: 'Software Developer Intern',
    period: 'May 2025 — Jul 2025',
    startYear: 2025,
    location: 'Colorado, USA (Remote)',
    description:
      "As a Software Developer Intern at Infosoft LLC (Colorado, USA) Working remotely in the US time zone, I contributed end-to-end to the research, development, and production-readiness of automation systems aimed at improving the resilience of frontend test suites. My internship focused on building powerful, CI/CD-ready tools and frameworks from scratch to detect UI drift, automate test healing, and visually validate UI consistency across releases.",
    achievements: [
      'Built Selvenza — a CI/CD-ready automation tool detecting and healing UI selector drift',
      'Automated DOM snapshot extraction, version comparison, intelligent mapping, and test case refactoring',
      'Integrated BackstopJS for pixel-level visual regression testing',
      'Implemented interactive HTML reports and test skeleton generators',
    ],
    tech: ['Node.js', 'Puppeteer', 'WebdriverIO', 'Cucumber', 'BackstopJS', 'CI/CD', 'React', 'Git'],
    type: 'work',
  },
  {
    id: 'ecell',
    company: 'E-Cell, IIT Bombay',
    companyUrl: 'https://ecell.in',
    role: 'Campus Ambassador',
    period: 'Jul 2024 — Jun 2025',
    startYear: 2024,
    location: 'Remote',
    description:
      "The Entrepreneurship Cell (E-Cell) of IIT Bombay has been inspiring Entrepreneurs since 1998 and is Asia's largest student-run entrepreneurship-promoting body as designated by Thomson Reuters. It helps the hustling startups and young professionals via dynamic workshops, thought-provoking speaker sessions, high-stakes business plan competitions, and numerous other game-changing initiatives throughout the year to create a crucible for innovation.",
    achievements: [
      'Represented E-Cell IIT Bombay at PDEU, inspiring the next generation of entrepreneurs',
      'Organized dynamic workshops, thought-provoking speaker sessions, and business plan competitions',
      'Connected budding entrepreneurs with experienced mentors, funding opportunities, and a robust network',
    ],
    tech: ['Entrepreneurship', 'Strategic Planning', 'Public Speaking', 'Business Planning', 'Networking'],
    type: 'work',
  },
  {
    id: 'pdeu',
    company: 'Pandit Deendayal Energy University',
    companyUrl: 'https://pdeu.ac.in',
    role: 'B.Tech — Information & Communication Technology',
    period: '2022 — 2026',
    startYear: 2022,
    location: 'Gandhinagar, India',
    description:
      'Pursuing Bachelor of Technology in Information and Communication Technology at Pandit Deendayal Energy University, actively engaging with a diverse curriculum.',
    achievements: [
      'Specialized in AI, Machine Learning, Cloud Architecture, and Full-Stack Development',
      'Accumulated 60+ professional certifications from AWS, Google, Microsoft, IBM, Oracle, and Stanford',
      'Built production-grade AI systems while still in university — from multi-agent platforms to CV models',
      'Active participation in hackathons, entrepreneurship cells, and technical communities',
    ],
    tech: ['Python', 'MATLAB', 'Machine Learning', 'Cloud Computing', 'Data Structures', 'Web Development'],
    type: 'education',
  },
]
