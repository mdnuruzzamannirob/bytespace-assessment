'use client'

import Link from 'next/link'

import { CourseBrowseControls } from '@/components/courses/CourseBrowseControls'
import { CourseCard } from '@/components/courses/CourseCard'
import { CreatorAvatar } from '@/components/creators/CreatorAvatar'
import { CreatorStats } from '@/components/creators/CreatorStats'
import { FollowButton } from '@/components/creators/FollowButton'
import { useFollowedCreators } from '@/components/creators/FollowProvider'
import { gridPatternClassName } from '@/components/home/HomeShared'
import { filterCourses, getCoursesByCreator, getCreatorStats, sortCourses } from '@/lib/catalog'
import type { CourseCategory, CourseLevel, CourseSort } from '@/lib/constants/catalog'
import type { Creator } from '@/lib/demo-data/creators'
import { useCallback, useMemo, useState } from 'react'

export function CreatorProfile({ creator }: { creator: Creator }) {
  const [category, setCategory] = useState<CourseCategory>('Featured')
  const [level, setLevel] = useState<CourseLevel>('All levels')
  const [sort, setSort] = useState<CourseSort>('Most relevant')
  const { followedCreators, toggleFollow } = useFollowedCreators()
  const [showFilters, setShowFilters] = useState(false)
  const [ratingMin, setRatingMin] = useState(0)
  const [lessonsMin, setLessonsMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)
  const [duration, setDuration] = useState<'any' | 'under2' | 'twoToThree' | 'threePlus'>('any')
  const closeFilters = useCallback(() => setShowFilters(false), [])
  const stats = getCreatorStats(creator, followedCreators)
  const creatorCourses = useMemo(() => {
    const matching = filterCourses(getCoursesByCreator(creator.slug), {
      category,
      level,
      ratingMin,
      lessonsMin,
      priceMax,
      duration,
    })
    return sortCourses(matching, sort)
  }, [category, creator.slug, duration, lessonsMin, level, priceMax, ratingMin, sort])

  return (
    <main>
      <section
        className={`bg-blue-800 pt-30 pb-14 text-white sm:pt-43 sm:pb-18 ${gridPatternClassName}`}
      >
        <div className="mx-auto max-w-300 px-5 xl:px-0">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <CreatorAvatar
                name={creator.name}
                src={creator.avatar}
                size={96}
                className="sm:size-24"
              />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-heading text-3xl tracking-tight sm:text-4xl">
                    {creator.name}
                  </h1>
                  <span className="rounded-full bg-lime-400 px-5 py-2 text-sm font-medium text-neutral-950">
                    Creator
                  </span>
                </div>
                <p className="mt-2 text-base text-blue-50 sm:text-lg">{creator.tagline}</p>
              </div>
            </div>

            <p className="max-w-300 text-base leading-relaxed text-blue-50 sm:text-lg">
              {creator.bio}
            </p>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <CreatorStats products={stats.products} followers={stats.followers} variant="pills" />
              <FollowButton
                followed={followedCreators.includes(creator.slug)}
                onToggle={() => toggleFollow(creator.slug)}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-300 px-5 py-14 sm:py-16 xl:px-0"
        aria-label={`${creator.name} courses`}
      >
        {stats.products > 0 && (
          <CourseBrowseControls
            category={category}
            level={level}
            sort={sort}
            duration={duration}
            ratingMin={ratingMin}
            lessonsMin={lessonsMin}
            priceMax={priceMax}
            showFilters={showFilters}
            onCategoryChange={setCategory}
            onLevelChange={setLevel}
            onSortChange={setSort}
            onDurationChange={setDuration}
            onRatingChange={setRatingMin}
            onLessonsChange={setLessonsMin}
            onPriceChange={setPriceMax}
            onToggleFilters={() => setShowFilters((value) => !value)}
            onClear={() => {
              setCategory('Featured')
              setLevel('All levels')
              setSort('Most relevant')
              setRatingMin(0)
              setLessonsMin(0)
              setPriceMax(0)
              setDuration('any')
            }}
            onClose={closeFilters}
          />
        )}

        {creatorCourses.length ? (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {creatorCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : stats.products === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-16 text-center">
            <h2 className="font-heading text-xl">Courses coming soon</h2>
            <p className="mx-auto mt-3 max-w-lg text-neutral-600">
              {creator.name} has not published a course yet. Explore other creators while their
              first course is being prepared.
            </p>
            <Link
              href="/creators"
              className="mt-6 inline-flex rounded-full bg-lime-400 px-6 py-3 font-medium text-neutral-950 hover:bg-lime-300"
            >
              Browse creators
            </Link>
          </div>
        ) : (
          <p className="py-20 text-center text-neutral-500">No courses match these filters.</p>
        )}
      </section>
    </main>
  )
}
