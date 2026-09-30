'use client'

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type PaginationProps = {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  className?: string
  label?: string
}

type PageItem = number | 'start-ellipsis' | 'end-ellipsis'

function getPageItems(page: number, pageCount: number): PageItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  if (page <= 4) return [1, 2, 3, 4, 5, 'end-ellipsis', pageCount]
  if (page >= pageCount - 3) {
    return [
      1,
      'start-ellipsis',
      pageCount - 4,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ]
  }

  return [1, 'start-ellipsis', page - 1, page, page + 1, 'end-ellipsis', pageCount]
}

/** Compact pagination that stays readable for any number of pages. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  className = '',
  label = 'Pages',
}: PaginationProps) {
  const pageItems = getPageItems(page, pageCount)

  return (
    <nav
      aria-label={label}
      className={`flex max-w-full items-center justify-center gap-1 sm:gap-4 ${className}`}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 sm:size-10"
      >
        <FiChevronLeft aria-hidden="true" className="size-5" />
      </button>

      <div className="flex items-center gap-0 sm:gap-2">
        {pageItems.map((item) =>
          typeof item === 'number' ? (
            <button
              type="button"
              key={item}
              aria-label={`Page ${item}`}
              aria-current={page === item ? 'page' : undefined}
              onClick={() => onPageChange(item)}
              className={`font-heading flex size-8 shrink-0 items-center justify-center rounded-full text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 sm:size-10 sm:text-lg ${page === item ? 'bg-lime-400 font-semibold text-neutral-950' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'}`}
            >
              {item}
            </button>
          ) : (
            <span
              key={item}
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center text-neutral-400 sm:size-10"
            >
              …
            </span>
          ),
        )}
      </div>

      <button
        type="button"
        aria-label="Next page"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
        className="flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 sm:size-10"
      >
        <FiChevronRight aria-hidden="true" className="size-5" />
      </button>
    </nav>
  )
}
