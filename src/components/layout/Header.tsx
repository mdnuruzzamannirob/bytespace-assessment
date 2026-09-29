import Link from 'next/link'
import { PiList, PiShoppingBag } from 'react-icons/pi'

import { Logo } from '@/components/ui/logo'
import { headerAccountLinks, headerNavigation, shoppingBagHref } from '@/constants/navigation'

export function Header() {
  return (
    <header className="relative z-10 bg-black text-white">
      <div className="mx-auto grid min-h-20 w-full max-w-300 grid-cols-2 items-center px-5 md:min-h-30 md:grid-cols-3 xl:px-0">
        <Logo />

        <nav aria-label="Main navigation" className="hidden justify-self-center md:block">
          <ul className="flex items-center gap-6">
            {headerNavigation.map(({ label, href }) => (
              <li key={label}>
                <Link
                  className="text-label-m transition-colors hover:text-lime-500 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500"
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
              className="hidden text-label-m transition-colors hover:text-lime-500 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500 sm:inline"
              href={href}
              key={label}
            >
              {label}
            </Link>
          ))}
          <Link
            aria-label="Shopping bag"
            className="inline-flex size-7 items-center justify-center transition-colors hover:text-lime-500 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500"
            href={shoppingBagHref}
          >
            <PiShoppingBag aria-hidden="true" className="size-5" />
          </Link>
          <details className="group md:hidden">
            <summary
              aria-label="Open navigation menu"
              className="flex size-8 cursor-pointer list-none items-center justify-center focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500 [&::-webkit-details-marker]:hidden"
            >
              <PiList aria-hidden="true" className="size-6" />
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="absolute inset-x-0 top-full bg-black px-5 pb-6 shadow-lg"
            >
              <ul className="mx-auto flex max-w-300 flex-col gap-4">
                {headerNavigation.map(({ label, href }) => (
                  <li key={label}>
                    <Link className="block py-1 text-label-m" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
                {headerAccountLinks.map(({ label, href }) => (
                  <li className="sm:hidden" key={label}>
                    <Link className="block py-1 text-label-m" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
