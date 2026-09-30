'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { FaChartSimple } from 'react-icons/fa6'
import { FiFilter } from 'react-icons/fi'
import { LuListFilter, LuShapes } from 'react-icons/lu'

import { CourseCard } from '@/components/courses/CourseCard'
import { CourseFilters } from '@/components/courses/CourseFilters'
import { gridPatternClassName } from '@/components/home/HomeShared'
import { Select } from '@/components/ui/select'
import type { Creator } from '@/constants/creators'
import { categories, courses } from '@/constants/courses'

const levels = ['All levels', 'Beginner', 'Intermediate'] as const
const sortOptions = ['Most relevant', 'Title A–Z', 'Title Z–A', 'Highest rated'] as const

export function CreatorProfile({ creator }: { creator: Creator }) {
  const [category, setCategory] = useState('Featured')
  const [level, setLevel] = useState('All levels')
  const [sort, setSort] = useState('Most relevant')
  const [followed, setFollowed] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [ratingMin, setRatingMin] = useState(0)
  const [lessonsMin, setLessonsMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)
  const [duration, setDuration] = useState<'any' | 'under2' | 'twoToThree' | 'threePlus'>('any')
  const filterButtonClass = showFilters
    ? "inline-flex h-12 w-full items-center justify-start gap-2 rounded-full border border-neutral-400 bg-neutral-50 px-4 text-sm font-medium text-neutral-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 sm:w-auto"
    : "inline-flex h-12 w-full items-center justify-start gap-2 rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 sm:w-auto"

  const creatorCourses = useMemo(() => {
    const matching = courses
      .filter((course) =>
        (category === 'Featured' || course.category === category) &&
        (level === 'All levels' || course.level === level) &&
        (!ratingMin || course.rating >= ratingMin) &&
        (!lessonsMin || course.lessons >= lessonsMin) &&
        (!priceMax || course.price <= priceMax) &&
        (duration === 'any' ||
          (duration === 'under2' && course.durationMinutes < 120) ||
          (duration === 'twoToThree' && course.durationMinutes >= 120 && course.durationMinutes < 180) ||
          (duration === 'threePlus' && course.durationMinutes >= 180)),
      )
      .slice(0, 6)

    if (sort === 'Title A–Z') return [...matching].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'Title Z–A') return [...matching].sort((a, b) => b.title.localeCompare(a.title))
    if (sort === 'Highest rated') return [...matching].sort((a, b) => b.rating - a.rating)
    return matching
  }, [category, duration, lessonsMin, level, priceMax, ratingMin, sort])

  return (
    <main>
      <section className={`bg-blue-800 pt-30 pb-14 text-white sm:pt-43 sm:pb-18 ${gridPatternClassName}`}>
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
                  <h1 className="font-heading text-3xl tracking-tight sm:text-4xl">{creator.name}</h1>
                  <span className="rounded-full bg-lime-400 px-5 py-2 text-sm font-medium text-neutral-950">Creator</span>
                </div>
                <p className="mt-2 text-base text-blue-50 sm:text-lg">{creator.tagline}</p>
              </div>
            </div>

            <p className="max-w-300 text-base leading-relaxed text-blue-50 sm:text-lg">{creator.bio}</p>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950"><strong className="mr-2 text-blue-700">{creator.productCount}</strong>Products</span>
                <span className="rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950"><strong className="mr-2 text-blue-700">{creator.followers}</strong>Followers</span>
              </div>
              <button
                type="button"
                aria-pressed={followed}
                onClick={() => setFollowed((value) => !value)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${followed ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-lime-400 text-neutral-950 hover:bg-lime-300'}`}
              >
                {followed ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-300 px-5 py-14 sm:py-16 xl:px-0" aria-label={`${creator.name} courses`}>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
          <button
            type="button"
            aria-expanded={showFilters}
            aria-controls="all-course-filters"
            onClick={() => setShowFilters((value) => !value)}
            className={filterButtonClass}
          >
            <FiFilter aria-hidden="true" /> Filter
          </button>
          <Select
            label="Course level"
            triggerLabel={level === 'All levels' ? 'Level' : level}
            value={level}
            options={levels}
            onSelect={setLevel}
            icon={<FaChartSimple aria-hidden="true" />}
            className="w-full [&>button]:w-full sm:w-auto sm:[&>button]:w-auto"
          />
          <Select
            label="Course category"
            triggerLabel={category === 'Featured' ? 'Category' : category}
            value={category}
            options={categories}
            onSelect={setCategory}
            icon={<LuShapes aria-hidden="true" />}
            contentWidth={256}
            className="w-full [&>button]:w-full sm:w-auto sm:[&>button]:w-auto"
          />
          <Select
            label="Sort courses"
            value={sort}
            options={sortOptions}
            onSelect={setSort}
            icon={<LuListFilter aria-hidden="true" />}
            align="right"
            className="w-full [&>button]:w-full sm:ml-auto sm:w-auto sm:[&>button]:w-auto"
          />
        </div>

        <CourseFilters
          open={showFilters}
          ratingMin={ratingMin}
          lessonsMin={lessonsMin}
          priceMax={priceMax}
          duration={duration}
          onRatingChange={setRatingMin}
          onLessonsChange={setLessonsMin}
          onPriceChange={setPriceMax}
          onDurationChange={setDuration}
          onClear={() => {
            setRatingMin(0)
            setLessonsMin(0)
            setPriceMax(0)
            setDuration("any")
          }}
          onClose={() => setShowFilters(false)}
        />

        {creatorCourses.length ? (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {creatorCourses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        ) : (
          <p className="py-20 text-center text-neutral-500">No courses match these filters.</p>
        )}
      </section>
    </main>
  )
}
