'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  label,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: ReactNode
  children: ReactNode
  label: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onOpenChange(false)
    }
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeEscape)
    }
  }, [onOpenChange, open])

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      >
        {trigger}
      </button>
      {open && (
        <div
          role="dialog"
          aria-label={label}
          className="absolute top-[calc(100%+0.75rem)] right-0 z-50 w-64 rounded-2xl border border-neutral-200 bg-white p-3 text-neutral-950 shadow-xl"
        >
          {children}
        </div>
      )}
    </div>
  )
}
