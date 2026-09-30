'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { FiCheck, FiChevronDown } from 'react-icons/fi'

type SelectAlignment = 'left' | 'center' | 'right'
type SelectMenuWidth = 'content' | 'trigger'

type SelectProps = {
  label: string
  value: string
  options: readonly string[]
  onSelect: (value: string) => void
  icon?: ReactNode
  triggerLabel?: string
  align?: SelectAlignment
  menuWidth?: SelectMenuWidth
  className?: string
  buttonClassName?: string
  menuClassName?: string
}

type MenuPosition = {
  left: number
  top?: number
  bottom?: number
  maxHeight: number
  width: number
}

const VIEWPORT_GUTTER = 16
const MENU_GAP = 8
const MENU_MAX_HEIGHT = 520
const CONTENT_MENU_WIDTH = 208

/** A viewport-aware select menu portaled above page stacking contexts. */
export function Select({
  label,
  value,
  options,
  onSelect,
  icon,
  triggerLabel = value,
  align = 'left',
  menuWidth = 'content',
  className = '',
  buttonClassName = '',
  menuClassName = '',
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<MenuPosition | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const bounds = trigger.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const width = Math.min(
      menuWidth === 'trigger' ? bounds.width : CONTENT_MENU_WIDTH,
      viewportWidth - VIEWPORT_GUTTER * 2,
    )
    const spaceBelow = viewportHeight - bounds.bottom - VIEWPORT_GUTTER
    const spaceAbove = bounds.top - VIEWPORT_GUTTER
    const preferredHeight = Math.min(
      MENU_MAX_HEIGHT,
      viewportHeight - VIEWPORT_GUTTER * 2,
    )
    const openAbove = spaceBelow < preferredHeight && spaceAbove > spaceBelow
    const maxHeight = Math.max(
      0,
      Math.min(preferredHeight, openAbove ? spaceAbove : spaceBelow),
    )

    let left = bounds.left
    if (align === 'center') left = bounds.left + bounds.width / 2 - width / 2
    if (align === 'right') left = bounds.right - width
    left = Math.min(
      Math.max(VIEWPORT_GUTTER, left),
      viewportWidth - width - VIEWPORT_GUTTER,
    )

    setPosition(
      openAbove
        ? {
            left,
            bottom: viewportHeight - bounds.top + MENU_GAP,
            maxHeight,
            width,
          }
        : { left, top: bounds.bottom + MENU_GAP, maxHeight, width },
    )
  }, [align, menuWidth])

  useEffect(() => {
    if (!open) return

    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        !triggerRef.current?.contains(target) &&
        !document.getElementById(menuId)?.contains(target)
      ) {
        setOpen(false)
      }
    }
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    updatePosition()
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeEscape)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeEscape)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [menuId, open, updatePosition])

  const menu =
    open && position && typeof document !== 'undefined'
      ? createPortal(
          <div
            id={menuId}
            role="menu"
            aria-label={label}
            className={`fixed z-2147483647 overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl border border-neutral-200 bg-white ui-select-menu p-2 text-left shadow-xl ${menuClassName}`}
            style={position}
          >
            {options.map((option) => (
              <button
                role="menuitemradio"
                aria-checked={value === option}
                type="button"
                key={option}
                onClick={() => {
                  onSelect(option)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-none ${value === option ? 'font-medium text-lime-600' : 'text-neutral-700'}`}
              >
                <span>{option}</span>
                {value === option && <FiCheck aria-hidden="true" />}
              </button>
            ))}
          </div>,
          document.body,
        )
      : null

  return (
    <div className={`min-w-0 ${className}`}>
      <button
        type="button"
        aria-label={`${label}: ${triggerLabel}`}
        aria-controls={open ? menuId : undefined}
        aria-expanded={open}
        aria-haspopup="menu"
        ref={triggerRef}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={`inline-flex h-12 max-w-full items-center justify-start gap-2 rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 ${buttonClassName}`}
      >
        {icon}
        <span className="min-w-0 flex-1 truncate text-left">
          {triggerLabel}
        </span>
        <FiChevronDown
          aria-hidden="true"
          className={`ml-auto size-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {menu}
    </div>
  )
}
