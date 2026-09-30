export const AUTH_SESSION_KEY = 'bytespace.demo.session'
export const AUTH_USERS_KEY = 'bytespace.demo.users'
export const PENDING_TOAST_KEY = 'bytespace.demo.pending-toast'
export const DEMO_EMAIL = 'demo@bytespace.dev'
export const DEMO_PASSWORD = 'demo12345'

export type DemoUser = {
  name: string
  email: string
  password: string
  provider?: 'password' | 'google' | 'facebook'
}

export type PendingToast = {
  message: string
  tone: 'success' | 'info' | 'error'
}

const demoUser: DemoUser = {
  name: 'Demo Learner',
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
  provider: 'password',
}

function canUseStorage() {
  return typeof window !== 'undefined'
}

export function getSession(): DemoUser | null {
  if (!canUseStorage()) return null
  const value = window.localStorage.getItem(AUTH_SESSION_KEY)
  if (!value) return null
  try {
    return JSON.parse(value) as DemoUser
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_KEY)
    return null
  }
}

export function saveSession(user: DemoUser) {
  if (canUseStorage())
    window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  if (canUseStorage()) window.localStorage.removeItem(AUTH_SESSION_KEY)
}

export function getCreatedUsers() {
  if (!canUseStorage()) return [] as DemoUser[]
  const value = window.localStorage.getItem(AUTH_USERS_KEY)
  if (!value) return [] as DemoUser[]
  try {
    return JSON.parse(value) as DemoUser[]
  } catch {
    return [] as DemoUser[]
  }
}

export function saveCreatedUser(user: DemoUser) {
  if (!canUseStorage()) return
  const users = getCreatedUsers().filter((item) => item.email !== user.email)
  window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify([...users, user]))
}

export function findValidUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase()
  const users = [demoUser, ...getCreatedUsers()]
  return (
    users.find(
      (user) => user.email === normalizedEmail && user.password === password,
    ) ?? null
  )
}

export function savePendingToast(toast: PendingToast) {
  if (canUseStorage())
    window.sessionStorage.setItem(PENDING_TOAST_KEY, JSON.stringify(toast))
}

export function consumePendingToast(): PendingToast | null {
  if (!canUseStorage()) return null
  const value = window.sessionStorage.getItem(PENDING_TOAST_KEY)
  if (!value) return null
  window.sessionStorage.removeItem(PENDING_TOAST_KEY)
  try {
    return JSON.parse(value) as PendingToast
  } catch {
    return null
  }
}
