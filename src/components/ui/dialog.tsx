'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type DialogProps = {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
  className?: string
  mobileOnly?: boolean
  closeOnDragDown?: boolean
}

/** Accessible modal dialog with a mobile bottom-sheet layout. */
export function Dialog({
  open,
  onClose,
  labelledBy,
  children,
  className = '',
  mobileOnly = false,
  closeOnDragDown = false,
}: DialogProps) {
  const dragStartY = useRef<number | null>(null)

  useEffect(() => {
    if (
      !open ||
      (mobileOnly && !window.matchMedia('(max-width: 639px)').matches)
    ) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileOnly, onClose, open])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className={["fixed inset-0 z-[2147483600] flex items-end bg-neutral-950/45 p-0 sm:items-center sm:justify-center sm:p-6", mobileOnly && "sm:hidden"].filter(Boolean).join(" ")}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`max-h-[calc(100dvh-1rem)] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-h-[min(46rem,calc(100dvh-3rem))] sm:max-w-5xl sm:rounded-3xl ${className}`}
      >
        {closeOnDragDown && (
          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-1 w-10 touch-pan-y rounded-full bg-neutral-200 sm:hidden"
            onPointerDown={(event) => {
              dragStartY.current = event.clientY
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerUp={(event) => {
              if (dragStartY.current !== null && event.clientY - dragStartY.current > 80) onClose()
              dragStartY.current = null
            }}
            onPointerCancel={() => {
              dragStartY.current = null
            }}
          />
        )}
        {children}
      </section>
    </div>,
    document.body,
  )
}
