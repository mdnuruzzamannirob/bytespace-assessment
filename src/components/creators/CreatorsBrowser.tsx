'use client'

import { useMemo, useState } from 'react'
import { LuListFilter } from 'react-icons/lu'
import { FaArrowRight } from 'react-icons/fa6'

import { SearchHero } from '@/components/catalog/SearchHero'
import { CreatorAvatar } from '@/components/creators/CreatorAvatar'
import { CreatorStats } from '@/components/creators/CreatorStats'
import { FollowButton } from '@/components/creators/FollowButton'
import { useFollowedCreators } from '@/components/creators/FollowProvider'
import { ButtonLink } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Select } from '@/components/ui/select'
import { getCreatorStats } from '@/lib/catalog'
import { creators } from '@/lib/demo-data/creators'

const pageSize = 9
const sortOptions = ['Most popular', 'Name A–Z', 'Name Z–A', 'Most products'] as const

export function CreatorsBrowser() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<(typeof sortOptions)[number]>('Most popular')
  const [page, setPage] = useState(1)
  const { followedCreators, toggleFollow } = useFollowedCreators()

  const visibleCreators = useMemo(() => {
    const query = search.trim().toLowerCase()
    const matching = creators.filter(
      (creator) => !query || `${creator.name} ${creator.tagline}`.toLowerCase().includes(query),
    )

    if (sort === 'Name A–Z') return [...matching].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'Name Z–A') return [...matching].sort((a, b) => b.name.localeCompare(a.name))
    if (sort === 'Most products')
      return [...matching].sort((a, b) => getCreatorStats(b).products - getCreatorStats(a).products)
    return [...matching].sort(
      (a, b) =>
        getCreatorStats(b, followedCreators).followers -
        getCreatorStats(a, followedCreators).followers,
    )
  }, [search, sort, followedCreators])

  const pageCount = Math.max(1, Math.ceil(visibleCreators.length / pageSize))
  const activePage = Math.min(page, pageCount)
  const pageCreators = visibleCreators.slice((activePage - 1) * pageSize, activePage * pageSize)

  function updateSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  return (
    <main>
      <SearchHero heading="Find Your Next Creator" search={search} onSearch={updateSearch} />

      <section
        id="creator-results"
        className="mx-auto max-w-300 scroll-mt-20 px-5 pt-12 pb-20 sm:pt-18 sm:pb-28 xl:px-0"
        aria-label="Creator directory"
      >
        <div className="flex justify-end">
          <Select
            label="Sort creators"
            value={sort}
            options={sortOptions}
            onSelect={(value) => {
              setSort(value)
              setPage(1)
            }}
            icon={<LuListFilter aria-hidden="true" />}
            align="right"
            className="w-full sm:w-auto [&>button]:w-full sm:[&>button]:w-auto"
          />
        </div>

        {pageCreators.length ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {pageCreators.map((creator) => {
              const followed = followedCreators.includes(creator.slug)
              return (
                <article
                  key={creator.slug}
                  className="rounded-card border border-neutral-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <CreatorAvatar name={creator.name} src={creator.avatar} size={64} />
                    <FollowButton followed={followed} onToggle={() => toggleFollow(creator.slug)} />
                  </div>
                  <div className="mt-3">
                    <h2
                      className="font-heading text-heading-xs truncate text-neutral-950"
                      title={creator.name}
                    >
                      {creator.name}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-neutral-500">
                      {creator.tagline}
                    </p>
                  </div>
                  <div className="mt-3">
                    <CreatorStats
                      products={getCreatorStats(creator, followedCreators).products}
                      followers={getCreatorStats(creator, followedCreators).followers}
                    />
                  </div>
                  <ButtonLink
                    href={`/creators/${creator.slug}`}
                    variant="outline"
                    className="mt-3 h-10 min-h-10 w-full px-4 text-sm"
                  >
                    View profile <FaArrowRight aria-hidden="true" />
                  </ButtonLink>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="py-28 text-center">
            <p className="mt-2 text-neutral-500">Try another search.</p>
            <button
              type="button"
              onClick={() => setSearch('')}
              className="mt-5 rounded-full bg-lime-400 px-6 py-3 text-sm font-medium text-neutral-950 hover:bg-lime-300"
            >
              Clear search
            </button>
          </div>
        )}

        {visibleCreators.length > pageSize && (
          <Pagination
            page={activePage}
            pageCount={pageCount}
            label="Creator pages"
            className="mt-18"
            onPageChange={(nextPage) => {
              setPage(nextPage)
              document.getElementById('creator-results')?.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        )}
      </section>
    </main>
  )
}
