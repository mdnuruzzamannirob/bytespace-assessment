'use client'

import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react'

const STORAGE_KEY = 'bytespace.demo.followed-creators'
const CHANGE_EVENT = 'bytespace:follow-change'
type FollowContextValue = {
  followedCreators: string[]
  toggleFollow: (slug: string) => void
}
const FollowContext = createContext<FollowContextValue | null>(null)

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}
function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? '[]'
}
function getServerSnapshot() {
  return '[]'
}
function parseFollowed(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : []
  } catch {
    return []
  }
}

export function FollowProvider({ children }: { children: ReactNode }) {
  const followedCreators = parseFollowed(
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  )
  function toggleFollow(slug: string) {
    const next = followedCreators.includes(slug)
      ? followedCreators.filter((value) => value !== slug)
      : [...followedCreators, slug]
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }
  return (
    <FollowContext.Provider value={{ followedCreators, toggleFollow }}>
      {children}
    </FollowContext.Provider>
  )
}
export function useFollowedCreators() {
  const context = useContext(FollowContext)
  if (!context) throw new Error('useFollowedCreators must be used within FollowProvider')
  return context
}
