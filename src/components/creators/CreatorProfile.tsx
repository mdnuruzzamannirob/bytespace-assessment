'use client'

import { CourseBrowseControls } from '@/components/courses/CourseBrowseControls'
import { CourseCard } from '@/components/courses/CourseCard'
import { CreatorStats } from '@/components/creators/CreatorStats'
import { FollowButton } from '@/components/creators/FollowButton'
import { gridPatternClassName } from '@/components/home/HomeShared'
import { filterCourses, getCoursesByCreator } from '@/lib/catalog'
import type { Creator } from '@/lib/demo-data/creators'
import Image from 'next/image'
import { useMemo, useState } from 'react'

export function CreatorProfile({ creator }: { creator: Creator }) {
  const [category, setCategory] = useState('Featured')
  const [level, setLevel] = useState('All levels')
  const [sort, setSort] = useState('Most relevant')
  const [followed, setFollowed] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [ratingMin, setRatingMin] = useState(0)
  const [lessonsMin, setLessonsMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)
  const [duration, setDuration] = useState<
    'any' | 'under2' | 'twoToThree' | 'threePlus'
  >('any')
  const creatorCourses = useMemo(() => {
    const matching = filterCourses(getCoursesByCreator(creator.slug), {
      category,
      level,
      ratingMin,
      lessonsMin,
      priceMax,
      duration,
    })
    if (sort === 'Title A–Z')
      return [...matching].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'Title Z–A')
      return [...matching].sort((a, b) => b.title.localeCompare(a.title))
    if (sort === 'Highest rated')
      return [...matching].sort((a, b) => b.rating - a.rating)
    return matching
  }, [
    category,
    creator.slug,
    duration,
    lessonsMin,
    level,
    priceMax,
    ratingMin,
    sort,
  ])

  return (
    <main>
      <section
        className={`bg-blue-800 pt-30 pb-14 text-white sm:pt-43 sm:pb-18 ${gridPatternClassName}`}
      >
        <div className="mx-auto max-w-300 px-5 xl:px-0">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <Image
                src={creator.avatar}
                alt={`${creator.name} profile`}
                width={96}
                height={96}
                priority
                className="size-20 rounded-3xl object-cover sm:size-24"
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
                <p className="mt-2 text-base text-blue-50 sm:text-lg">
                  {creator.tagline}
                </p>
              </div>
            </div>

            <p className="max-w-300 text-base leading-relaxed text-blue-50 sm:text-lg">
              {creator.bio}
            </p>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <CreatorStats
                products={getCoursesByCreator(creator.slug).length}
                followers={creator.followers}
                variant="pills"
              />
              <FollowButton
                followed={followed}
                onToggle={() => setFollowed((value) => !value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-300 px-5 py-14 sm:py-16 xl:px-0"
        aria-label={`${creator.name} courses`}
      >
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
            setRatingMin(0)
            setLessonsMin(0)
            setPriceMax(0)
            setDuration('any')
          }}
          onClose={() => setShowFilters(false)}
        />

        {creatorCourses.length ? (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {creatorCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-neutral-500">
            No courses match these filters.
          </p>
        )}
      </section>
    </main>
  )
}
