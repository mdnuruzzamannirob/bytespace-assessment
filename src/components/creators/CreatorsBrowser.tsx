'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { LuListFilter } from 'react-icons/lu'

import { gridPatternClassName } from '@/components/home/HomeShared'
import { Pagination } from '@/components/ui/pagination'
import { ButtonLink } from '@/components/ui/button'
import { SearchField } from '@/components/ui/search-field'
import { Select } from '@/components/ui/select'
import { creators } from '@/constants/creators'

const pageSize = 6
const sortOptions = ['Most popular', 'Name A–Z', 'Name Z–A', 'Most products'] as const

export function CreatorsBrowser() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<(typeof sortOptions)[number]>('Most popular')
  const [page, setPage] = useState(1)
  const [followedCreators, setFollowedCreators] = useState<string[]>([])

  const visibleCreators = useMemo(() => {
    const query = search.trim().toLowerCase()
    const matching = creators.filter((creator) => (
      (!query || `${creator.name} ${creator.tagline}`.toLowerCase().includes(query))
    ))

    if (sort === 'Name A–Z') return [...matching].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'Name Z–A') return [...matching].sort((a, b) => b.name.localeCompare(a.name))
    if (sort === 'Most products') return [...matching].sort((a, b) => b.productCount - a.productCount)
    return [...matching].sort((a, b) => b.followers - a.followers)
  }, [search, sort])

  const pageCount = Math.max(1, Math.ceil(visibleCreators.length / pageSize))
  const activePage = Math.min(page, pageCount)
  const pageCreators = visibleCreators.slice((activePage - 1) * pageSize, activePage * pageSize)

  function updateSearch(value: string) {
    setSearch(value)
    setPage(1)
  }


  function toggleFollow(slug: string) {
    setFollowedCreators((current) => current.includes(slug)
      ? current.filter((value) => value !== slug)
      : [...current, slug])
  }

  return (
    <main>
      <section className={`bg-blue-800 pt-32 pb-14 text-white sm:pt-40 sm:pb-17 ${gridPatternClassName}`} aria-labelledby="creators-heading">
        <div className="mx-auto max-w-300 px-5 text-center xl:px-0">
          <h1 id="creators-heading" className="font-heading text-heading-s">Find Your Next Creator</h1>
          <div className="mx-auto mt-7 flex w-full max-w-156 flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <SearchField
              className="text-base"
              containerClassName="w-full flex-1 sm:w-auto"
              label="Search creators"
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search creators"
              value={search}
            />
            <button type="button" onClick={() => document.getElementById('creator-results')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lime-400 px-6 text-sm font-medium text-neutral-950 transition-colors hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto">
              <FiSearch aria-hidden="true" /> Search
            </button>
          </div>
        </div>
      </section>

      <section id="creator-results" className="mx-auto max-w-300 scroll-mt-20 px-5 pt-12 pb-20 sm:pt-18 sm:pb-28 xl:px-0" aria-label="Creator directory">
        <div className="flex justify-end">
          <Select
            label="Sort creators"
            value={sort}
            options={sortOptions}
            onSelect={(value) => {
              setSort(value as (typeof sortOptions)[number])
              setPage(1)
            }}
            icon={<LuListFilter aria-hidden="true" />}
            align="right"
            className="w-full [&>button]:w-full sm:w-auto sm:[&>button]:w-auto"
          />
        </div>

        {pageCreators.length ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {pageCreators.map((creator) => {
              const followed = followedCreators.includes(creator.slug)
              return (
                <article key={creator.slug} className="rounded-card border border-neutral-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Image src={creator.avatar} alt={`${creator.name} profile`} width={64} height={64} className="size-16 shrink-0 rounded-full border-3 border-blue-50 object-cover" />
                    <button type="button" aria-pressed={followed} onClick={() => toggleFollow(creator.slug)} className={`shrink-0 rounded-full px-6 py-3 text-sm font-medium transition-colors ${followed ? "bg-white text-blue-700 hover:bg-blue-50" : "bg-lime-400 text-neutral-950 hover:bg-lime-300"}`}>{followed ? "Following" : "Follow"}</button>
                  </div>
                  <div className="mt-3">
                    <h2 className="truncate font-heading text-heading-xs text-neutral-950" title={creator.name}>{creator.name}</h2>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-neutral-500">{creator.tagline}</p>
                  </div>
                  <div className="mt-3 grid grid-cols-2 divide-x divide-neutral-200 rounded-xl bg-neutral-50 py-2.5 text-center">
                    <span className="text-xs text-neutral-500"><strong className="block font-heading text-lg text-blue-700">{creator.productCount}</strong>Products</span>
                    <span className="text-xs text-neutral-500"><strong className="block font-heading text-lg text-blue-700">{creator.followers}</strong>Followers</span>
                  </div>
                  <ButtonLink href={`/creators/${creator.slug}`} variant="outline" className="mt-3 h-10 min-h-10 w-full px-4 text-sm">View profile →</ButtonLink>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="py-28 text-center">
            <p className="mt-2 text-neutral-500">Try another search.</p>
            <button type="button" onClick={() => setSearch("")} className="mt-5 rounded-full bg-lime-400 px-6 py-3 text-sm font-medium text-neutral-950 hover:bg-lime-300">Clear search</button>
          </div>
        )}

        {visibleCreators.length > pageSize && <Pagination page={activePage} pageCount={pageCount} className="mt-18" onPageChange={(nextPage) => {
          setPage(nextPage)
          document.getElementById('creator-results')?.scrollIntoView({ behavior: 'smooth' })
        }} />}
      </section>
    </main>
  )
}
