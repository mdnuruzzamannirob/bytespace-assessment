import Link from 'next/link'

import { Logo } from '@/components/ui/logo'
import { footerColumns, legalLinks } from '@/constants/navigation'
import { NewsletterForm } from './NewsletterForm'

export function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="mx-auto w-full max-w-300 px-5 pt-12 lg:pt-18 xl:px-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="max-w-126">
            <Logo variant="dark" />
            <p className="mt-3 mb-11 text-body-s">
              Stay Up to date with our latest features and releases by joining our newsletter.
            </p>
            <NewsletterForm />
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-10 lg:pt-11">
            {footerColumns.map((column, index) => (
              <ul className="space-y-4" key={index}>
                {column.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      className="text-body-s transition-colors hover:text-lime-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                      href={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-200 pt-4 pb-12 text-body-xs sm:flex-row sm:items-center sm:justify-between lg:mt-32">
          <p>© 2023 ByteSpace. All rights reserved.</p>
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    className="transition-colors hover:text-lime-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
