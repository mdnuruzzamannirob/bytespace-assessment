'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
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
  const dialogRef = useRef<HTMLElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const dragStartY = useRef<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)

  useEffect(() => {
    if (!open || (mobileOnly && !window.matchMedia('(max-width: 639px)').matches)) {
      return
    }

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const keepFocusInside = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) {
        event.preventDefault()
        dialogRef.current?.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('keydown', keepFocusInside)
    requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>('button, [href], input, [tabindex="0"]')
        ?.focus()
    })
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('keydown', keepFocusInside)
      restoreFocusRef.current?.focus()
    }
  }, [mobileOnly, onClose, open])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className={[
        'fixed inset-0 z-2147483600 flex items-end bg-neutral-950/45 p-0 sm:items-center sm:justify-center sm:p-6',
        mobileOnly && 'sm:hidden',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={[
          'max-h-[calc(100dvh-1rem)] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-h-[min(46rem,calc(100dvh-3rem))] sm:max-w-5xl sm:rounded-3xl',
          dragOffset ? 'transition-none' : 'transition-transform duration-200',
          className,
        ].join(' ')}
        style={
          closeOnDragDown && dragOffset
            ? { transform: 'translateY(' + dragOffset + 'px)' }
            : undefined
        }
      >
        {closeOnDragDown && (
          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-1 w-10 touch-pan-y rounded-full bg-neutral-200 sm:hidden"
            onPointerDown={(event) => {
              dragStartY.current = event.clientY
              setDragOffset(0)
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={(event) => {
              if (dragStartY.current !== null)
                setDragOffset(Math.max(0, event.clientY - dragStartY.current))
            }}
            onPointerUp={(event) => {
              if (dragStartY.current !== null && event.clientY - dragStartY.current > 100) onClose()
              setDragOffset(0)
              dragStartY.current = null
            }}
            onPointerCancel={() => {
              setDragOffset(0)
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
