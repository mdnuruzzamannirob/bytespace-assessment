'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineShopping } from 'react-icons/ai'
import { PiList, PiX } from 'react-icons/pi'

import { Logo } from '@/components/ui/logo'
import { headerAccountLinks, headerNavigation, shoppingBagHref } from '@/constants/navigation'

export function Header() {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 0)

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktop)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-200 ${
        scrolled || menuOpen ? 'bg-blue-800/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div
        className={`mx-auto grid w-full max-w-300 grid-cols-2 items-center px-5 transition-[min-height] duration-200 md:grid-cols-3 xl:px-0 ${
          scrolled ? 'min-h-16 md:min-h-20' : 'min-h-20 md:min-h-30'
        }`}
      >
        <Logo />

        <nav aria-label="Main navigation" className="hidden justify-self-center md:block">
          <ul className="flex items-center gap-6">
            {headerNavigation.map(({ label, href }) => (
              <li key={label}>
                <Link
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`text-label-m font-normal transition-colors hover:text-lime-400 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400 ${
                    isActive(href) ? 'text-lime-400' : ''
                  }`}
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-5 sm:gap-6">
          {headerAccountLinks.map(({ label, href }) => (
            <Link
              aria-current={isActive(href) ? 'page' : undefined}
              className={`hidden text-label-m font-normal transition-colors hover:text-lime-400 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400 sm:inline ${
                isActive(href) ? 'text-lime-400' : ''
              }`}
              href={href}
              key={label}
            >
              {label}
            </Link>
          ))}
          <Link
            aria-label="Shopping bag"
            className="inline-flex size-7 items-center justify-center transition-colors hover:text-lime-400 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400"
            href={shoppingBagHref}
          >
            <AiOutlineShopping aria-hidden="true" className="size-5" />
          </Link>
          <div className="md:hidden" ref={menuRef}>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="flex size-8 items-center justify-center focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              {menuOpen ? (
                <PiX aria-hidden="true" className="size-6" />
              ) : (
                <PiList aria-hidden="true" className="size-6" />
              )}
            </button>
            {menuOpen && (
              <nav
                aria-label="Mobile navigation"
                className="absolute inset-x-0 top-full bg-blue-800 px-5 pb-6 shadow-lg md:hidden"
                id="mobile-navigation"
              >
                <ul className="mx-auto flex max-w-300 flex-col gap-4">
                  {headerNavigation.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        aria-current={isActive(href) ? 'page' : undefined}
                        className={`block py-1 text-label-m font-normal hover:text-lime-400 ${isActive(href) ? 'text-lime-400' : ''}`}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                  {headerAccountLinks.map(({ label, href }) => (
                    <li className="sm:hidden" key={label}>
                      <Link
                        aria-current={isActive(href) ? 'page' : undefined}
                        className={`block py-1 text-label-m font-normal hover:text-lime-400 ${isActive(href) ? 'text-lime-400' : ''}`}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
