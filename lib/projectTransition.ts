export interface ProjectTransitionPayload {
  projectId: string
  title: string
  subtitle: string
  color: string
  xPercent: number
  yPercent: number
  timestamp: number
}

const STORAGE_KEY = 'portfolio:project-transition:v1'
const MAX_AGE_MS = 6000

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'
}

function isValidPayload(value: unknown): value is ProjectTransitionPayload {
  if (!value || typeof value !== 'object') return false

  const payload = value as Partial<ProjectTransitionPayload>
  return (
    typeof payload.projectId === 'string' &&
    typeof payload.title === 'string' &&
    typeof payload.subtitle === 'string' &&
    typeof payload.color === 'string' &&
    typeof payload.xPercent === 'number' &&
    typeof payload.yPercent === 'number' &&
    typeof payload.timestamp === 'number'
  )
}

export function saveProjectTransition(
  payload: Omit<ProjectTransitionPayload, 'timestamp'>
) {
  if (!canUseStorage()) return

  const withTimestamp: ProjectTransitionPayload = {
    ...payload,
    timestamp: Date.now(),
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp))
  } catch {
    // Ignore storage errors in private mode or restricted contexts.
  }
}

export function consumeProjectTransition(projectId?: string): ProjectTransitionPayload | null {
  if (!canUseStorage()) return null

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    window.sessionStorage.removeItem(STORAGE_KEY)

    const parsed: unknown = JSON.parse(raw)
    if (!isValidPayload(parsed)) return null

    const age = Date.now() - parsed.timestamp
    if (age > MAX_AGE_MS) return null

    if (projectId && parsed.projectId !== projectId) return null

    return parsed
  } catch {
    return null
  }
}

export function clearProjectTransition() {
  if (!canUseStorage()) return

  try {
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage errors in restricted contexts.
  }
}
