'use client'

import { gridPatternClassName } from '@/components/home/HomeShared'
import { SearchField } from '@/components/ui/search-field'
import { Select } from '@/components/ui/select'

export function SearchHero({
  heading,
  search,
  onSearch,
  scope,
  onScopeChange,
}: {
  heading: string
  search: string
  onSearch: (value: string) => void
  scope?: string
  onScopeChange?: (value: string) => void
}) {
  const scopes = ['Courses', 'Categories'] as const
  return (
    <section
      className={`bg-blue-800 pt-32 pb-14 text-white sm:pt-40 sm:pb-17 ${gridPatternClassName}`}
    >
      <div className="mx-auto max-w-300 px-5 text-center">
        <h1 className="font-heading text-heading-s">{heading}</h1>
        <div className="mx-auto mt-7 flex w-full max-w-156 flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <SearchField
            className="text-base"
            containerClassName="w-full flex-1 sm:w-auto"
            label={`Search ${heading.toLowerCase()}`}
            onChange={(event) => onSearch(event.target.value)}
            placeholder={`Search ${heading.toLowerCase()}`}
            value={search}
          />
          {scope && onScopeChange ? (
            <Select
              label="Search by"
              value={scope}
              options={scopes}
              onSelect={onScopeChange}
              buttonClassName="!border-lime-400 !bg-lime-400 px-6 !text-neutral-950 hover:!border-lime-300 hover:!bg-lime-300"
              mobileMenuWidth="trigger"
              className="w-full sm:w-auto [&>button]:w-full sm:[&>button]:w-auto"
            />
          ) : (
            <button
              type="button"
              onClick={() =>
                document.getElementById('creator-results')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-label-l h-12 min-h-12 shrink-0 rounded-full bg-lime-400 px-6 text-neutral-950 hover:bg-lime-300"
            >
              Search
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
