'use client'

import { usePathname } from 'next/navigation'
import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { FiCheck, FiInfo, FiX } from 'react-icons/fi'

import { consumePendingToast } from '@/lib/auth-session'

type ToastTone = 'success' | 'info' | 'error'
type ToastItem = { id: number; message: string; tone: ToastTone }
type ToastContextValue = {
  showToast: (message: string, tone?: ToastTone) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const pathname = usePathname()

  function showToast(message: string, tone: ToastTone = 'info') {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, message, tone }])
  }

  function dismissToast(id: number) {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  useEffect(() => {
    const pendingToast = consumePendingToast()
    if (!pendingToast) return
    startTransition(() => {
      setToasts((current) => [...current, { ...pendingToast, id: Date.now() + Math.random() }])
    })
  }, [pathname])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-4 bottom-4 z-2147483646 flex flex-col items-end gap-3 sm:left-auto sm:max-w-96"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <ToastNotice key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastNotice({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  useEffect(() => {
    const timeout = window.setTimeout(onDismiss, 4200)
    return () => window.clearTimeout(timeout)
  }, [onDismiss])

  const Icon = toast.tone === 'success' ? FiCheck : toast.tone === 'error' ? FiX : FiInfo
  return (
    <div
      role="status"
      className="pointer-events-auto flex w-full items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 shadow-xl"
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${toast.tone === 'success' ? 'bg-lime-400 text-neutral-950' : toast.tone === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}
      >
        <Icon aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">{toast.message}</span>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className="flex size-7 shrink-0 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
      >
        <FiX aria-hidden="true" />
      </button>
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
