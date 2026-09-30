'use client'

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import {
  clearSession,
  findValidUser,
  getSession,
  saveCreatedUser,
  saveSession,
  type DemoUser,
} from '@/lib/auth-session'

type AuthContextValue = {
  user: DemoUser | null
  loading: boolean
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, password: string) => boolean
  socialLogin: (provider: 'google' | 'facebook') => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    startTransition(() => {
      setUser(getSession())
      setLoading(false)
    })
  }, [])

  function login(email: string, password: string) {
    const nextUser = findValidUser(email, password)
    if (!nextUser) return false
    saveSession(nextUser)
    setUser(nextUser)
    return true
  }

  function signup(name: string, email: string, password: string) {
    const nextUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      provider: 'password' as const,
    }
    saveCreatedUser(nextUser)
    saveSession(nextUser)
    setUser(nextUser)
    return true
  }

  function socialLogin(provider: 'google' | 'facebook') {
    const nextUser = {
      name: provider === 'google' ? 'Google Demo Learner' : 'Facebook Demo Learner',
      email: `${provider}@bytespace.dev`,
      password: '',
      provider,
    }
    saveSession(nextUser)
    setUser(nextUser)
  }

  function logout() {
    clearSession()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, socialLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
