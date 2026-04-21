export type TransitionMotion =
  | 'orbital'
  | 'diagonal'
  | 'surge'
  | 'bloom'
  | 'horizon'
  | 'helix'

export interface TransitionPose {
  x: number
  y: number
  scale: number
  rotateX: number
  rotateY: number
}

export interface ProjectTransitionTheme {
  label: string
  motion: TransitionMotion
  launchDuration: number
  entryDuration: number
  launchRadius: number
  entryRadius: number
  primaryGlow: string
  secondaryGlow: string
  ambientGlow: string
  baseGradientStart: string
  baseGradientEnd: string
  panelBackground: string
  panelBorder: string
  panelShadow: string
  accentText: string
  launchPose: TransitionPose
  entryExitPose: TransitionPose
}

const DEFAULT_THEME: ProjectTransitionTheme = {
  label: 'Case Study',
  motion: 'orbital',
  launchDuration: 0.58,
  entryDuration: 0.84,
  launchRadius: 150,
  entryRadius: 156,
  primaryGlow: 'rgba(2,132,199,0.68)',
  secondaryGlow: 'rgba(13,148,136,0.42)',
  ambientGlow: 'rgba(2,132,199,0.2)',
  baseGradientStart: '#e7f3ff',
  baseGradientEnd: '#eef6ff',
  panelBackground: 'rgba(255,255,255,0.72)',
  panelBorder: 'rgba(2,132,199,0.4)',
  panelShadow: 'rgba(2,132,199,0.4)',
  accentText: '#0369a1',
  launchPose: { x: 0, y: -12, scale: 1.04, rotateX: 16, rotateY: -8 },
  entryExitPose: { x: -4, y: -210, scale: 0.6, rotateX: 42, rotateY: -12 },
}

const THEMES: Record<string, ProjectTransitionTheme> = {
  'neural-sports': {
    label: 'Neural Core',
    motion: 'orbital',
    launchDuration: 0.62,
    entryDuration: 0.88,
    launchRadius: 158,
    entryRadius: 164,
    primaryGlow: 'rgba(79,70,229,0.74)',
    secondaryGlow: 'rgba(56,189,248,0.42)',
    ambientGlow: 'rgba(79,70,229,0.24)',
    baseGradientStart: '#e9ecff',
    baseGradientEnd: '#edf5ff',
    panelBackground: 'rgba(255,255,255,0.7)',
    panelBorder: 'rgba(79,70,229,0.46)',
    panelShadow: 'rgba(79,70,229,0.46)',
    accentText: '#4338ca',
    launchPose: { x: 0, y: -14, scale: 1.06, rotateX: 18, rotateY: -10 },
    entryExitPose: { x: -12, y: -220, scale: 0.58, rotateX: 46, rotateY: -18 },
  },
  selvenza: {
    label: 'Automation Pulse',
    motion: 'diagonal',
    launchDuration: 0.57,
    entryDuration: 0.8,
    launchRadius: 148,
    entryRadius: 152,
    primaryGlow: 'rgba(124,58,237,0.72)',
    secondaryGlow: 'rgba(236,72,153,0.36)',
    ambientGlow: 'rgba(124,58,237,0.2)',
    baseGradientStart: '#f1e9ff',
    baseGradientEnd: '#f8f2ff',
    panelBackground: 'rgba(255,250,255,0.72)',
    panelBorder: 'rgba(124,58,237,0.45)',
    panelShadow: 'rgba(124,58,237,0.44)',
    accentText: '#6d28d9',
    launchPose: { x: 18, y: -10, scale: 1.04, rotateX: 20, rotateY: 12 },
    entryExitPose: { x: 24, y: -200, scale: 0.62, rotateX: 38, rotateY: 20 },
  },
  smarttradex: {
    label: 'Edge Sentinel',
    motion: 'surge',
    launchDuration: 0.55,
    entryDuration: 0.78,
    launchRadius: 144,
    entryRadius: 150,
    primaryGlow: 'rgba(8,145,178,0.74)',
    secondaryGlow: 'rgba(20,184,166,0.4)',
    ambientGlow: 'rgba(8,145,178,0.22)',
    baseGradientStart: '#e5fbff',
    baseGradientEnd: '#ecf9ff',
    panelBackground: 'rgba(246,254,255,0.72)',
    panelBorder: 'rgba(8,145,178,0.44)',
    panelShadow: 'rgba(8,145,178,0.42)',
    accentText: '#0e7490',
    launchPose: { x: 0, y: -8, scale: 1.02, rotateX: 24, rotateY: 0 },
    entryExitPose: { x: 0, y: -190, scale: 0.64, rotateX: 50, rotateY: 0 },
  },
  'emotion-ai': {
    label: 'Vision Bloom',
    motion: 'bloom',
    launchDuration: 0.59,
    entryDuration: 0.86,
    launchRadius: 152,
    entryRadius: 158,
    primaryGlow: 'rgba(5,150,105,0.7)',
    secondaryGlow: 'rgba(132,204,22,0.35)',
    ambientGlow: 'rgba(5,150,105,0.22)',
    baseGradientStart: '#eafcf4',
    baseGradientEnd: '#effcf9',
    panelBackground: 'rgba(248,255,252,0.72)',
    panelBorder: 'rgba(5,150,105,0.42)',
    panelShadow: 'rgba(5,150,105,0.38)',
    accentText: '#047857',
    launchPose: { x: -8, y: -12, scale: 1.05, rotateX: 14, rotateY: -10 },
    entryExitPose: { x: -16, y: -210, scale: 0.6, rotateX: 34, rotateY: -22 },
  },
  'levelup-portal': {
    label: 'Event Horizon',
    motion: 'horizon',
    launchDuration: 0.54,
    entryDuration: 0.76,
    launchRadius: 146,
    entryRadius: 150,
    primaryGlow: 'rgba(6,182,212,0.72)',
    secondaryGlow: 'rgba(37,99,235,0.38)',
    ambientGlow: 'rgba(6,182,212,0.22)',
    baseGradientStart: '#e8fbff',
    baseGradientEnd: '#eef7ff',
    panelBackground: 'rgba(247,254,255,0.74)',
    panelBorder: 'rgba(6,182,212,0.45)',
    panelShadow: 'rgba(6,182,212,0.4)',
    accentText: '#0891b2',
    launchPose: { x: 12, y: -6, scale: 1.03, rotateX: 12, rotateY: 18 },
    entryExitPose: { x: 28, y: -184, scale: 0.66, rotateX: 28, rotateY: 24 },
  },
  'hci-agent': {
    label: 'Swarm Intelligence',
    motion: 'helix',
    launchDuration: 0.64,
    entryDuration: 0.9,
    launchRadius: 162,
    entryRadius: 168,
    primaryGlow: 'rgba(139,92,246,0.76)',
    secondaryGlow: 'rgba(217,70,239,0.36)',
    ambientGlow: 'rgba(139,92,246,0.24)',
    baseGradientStart: '#f0edff',
    baseGradientEnd: '#f6f3ff',
    panelBackground: 'rgba(252,250,255,0.72)',
    panelBorder: 'rgba(139,92,246,0.48)',
    panelShadow: 'rgba(139,92,246,0.48)',
    accentText: '#7c3aed',
    launchPose: { x: -10, y: -14, scale: 1.07, rotateX: 22, rotateY: -18 },
    entryExitPose: { x: -20, y: -230, scale: 0.56, rotateX: 52, rotateY: -24 },
  },
}

export function getProjectTransitionTheme(projectId: string): ProjectTransitionTheme {
  return THEMES[projectId] ?? DEFAULT_THEME
}
