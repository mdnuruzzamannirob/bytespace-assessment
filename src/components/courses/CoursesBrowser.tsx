'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { FaChartSimple } from 'react-icons/fa6'
import {
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiSearch,
} from 'react-icons/fi'
import { LuListFilter, LuShapes } from 'react-icons/lu'

import {
  gridPatternClassName,
  StudentFaces,
} from '@/components/home/HomeShared'
import { categories, courses, type Course } from '@/constants/courses'

const pageSize = 18
const searchScopes = ['Courses', 'Categories', 'Creators'] as const
const levels = ['All levels', 'Beginner', 'Intermediate'] as const
const sortOptions = [
  'Most relevant',
  'Title A–Z',
  'Title Z–A',
  'Highest rated',
] as const

function ChoiceMenu({
  label,
  value,
  options,
  onSelect,
  icon,
  accent = false,
  align = 'left',
}: {
  label: string
  value: string
  options: readonly string[]
  onSelect: (value: string) => void
  icon?: ReactNode
  accent?: boolean
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeEscape)
    }
  }, [open])

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label={`${label}: ${value}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(!open)}
        className={`inline-flex h-12 max-w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${accent ? 'border border-lime-400 bg-lime-400 px-6 text-neutral-950 hover:bg-lime-300' : 'border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'}`}
      >
        {icon}
        <span className="max-w-34 truncate">
          {value === 'All levels'
            ? 'Level'
            : value === 'Featured'
              ? 'Category'
              : value}
        </span>
        <FiChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          aria-label={label}
          className={`absolute top-full z-30 mt-2 min-w-52 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 text-left shadow-xl ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          {options.map((option) => (
            <button
              role="menuitemradio"
              aria-checked={value === option}
              type="button"
              key={option}
              onClick={() => {
                onSelect(option)
                setOpen(false)
              }}
              className={`flex w-full items-center justify-between gap-5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-none ${value === option ? 'font-medium text-blue-700' : 'text-neutral-700'}`}
            >
              <span>{option}</span>
              {value === option && <FiCheck aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block min-w-0 rounded-card border border-neutral-200 bg-white p-4 transition-all hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      aria-label={`View ${course.title} course details`}
    >
      <div className="relative aspect-341/195 overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={course.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 341px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5 text-[10px] text-neutral-700 sm:text-xs">
          {[
            `${course.lessons} Lessons`,
            `${Math.floor(course.durationMinutes / 60)} hours ${course.durationMinutes % 60} mins`,
            `${course.comments} Comments`,
          ].map((detail) => (
            <span
              className="rounded-full bg-white/75 px-2 py-1 backdrop-blur-sm"
              key={detail}
            >
              {detail}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2
            className="truncate font-heading text-xl leading-6 text-black group-hover:text-blue-700"
            title={course.title}
          >
            {course.title}
          </h2>
          <p className="text-xs text-neutral-700">
            by <span className="text-blue-800">{course.creator}</span>
          </p>
        </div>
        <span className="shrink-0 text-lg text-neutral-500">
          {course.rating}{' '}
          <span className="text-neutral-200" aria-label="out of 5 stars">
            ★
          </span>
        </span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-50 px-3 py-1.5 text-xs text-neutral-700">
          <FaChartSimple aria-hidden="true" />
          {course.level}
        </span>
        <StudentFaces compact />
      </div>
      <p className="mt-4 text-blue-800">
        <strong className="font-heading text-xl">${course.price}</strong>
        <span className="text-xs text-neutral-700">/lifetime</span>
      </p>
    </Link>
  )
}

export function CoursesBrowser({
  initialCategory = 'Featured',
}: {
  initialCategory?: string
}) {
  const [search, setSearch] = useState('')
  const [scope, setScope] = useState<string>('Courses')
  const [category, setCategory] = useState(
    categories.includes(initialCategory as (typeof categories)[number])
      ? initialCategory
      : 'Featured',
  )
  const [level, setLevel] = useState('All levels')
  const [sort, setSort] = useState('Most relevant')
  const [shortCourses, setShortCourses] = useState(false)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const matches = courses.filter((course) => {
      const searchable =
        scope === 'Categories'
          ? course.category
          : scope === 'Creators'
            ? course.creator
            : course.title
      return (
        (!query || searchable.toLowerCase().includes(query)) &&
        (category === 'Featured' || course.category === category) &&
        (level === 'All levels' || course.level === level) &&
        (!shortCourses || course.durationMinutes < 180)
      )
    })
    if (sort === 'Title A–Z')
      return [...matches].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'Title Z–A')
      return [...matches].sort((a, b) => b.title.localeCompare(a.title))
    if (sort === 'Highest rated')
      return [...matches].sort((a, b) => b.rating - a.rating)
    return matches
  }, [search, scope, category, level, sort, shortCourses])

  const pageCount = Math.ceil(filtered.length / pageSize)
  const visibleCourses = filtered.slice((page - 1) * pageSize, page * pageSize)
  const changeCategory = (value: string) => {
    setCategory(value)
    setPage(1)
  }
  const clearFilters = () => {
    setSearch('')
    setCategory('Featured')
    setLevel('All levels')
    setShortCourses(false)
    setSort('Most relevant')
    setPage(1)
  }
  const goToPage = (value: number) => {
    setPage(value)
    document
      .getElementById('course-results')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      <section
        className={`bg-blue-800 pt-40 pb-17 text-white ${gridPatternClassName}`}
        aria-labelledby="courses-heading"
      >
        <div className="mx-auto max-w-300 px-5 text-center">
          <h1 id="courses-heading" className="font-heading text-heading-s">
            Find Your Next Course
          </h1>
          <div className="mx-auto mt-8 flex max-w-156 flex-col gap-4 sm:flex-row">
            <label className="flex h-13 min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-6 text-neutral-400 ring-white/20 focus-within:ring-4">
              <FiSearch className="size-5 shrink-0" aria-hidden="true" />
              <span className="sr-only">Search {scope.toLowerCase()}</span>
              <input
                type="search"
                className="w-full min-w-0 bg-transparent text-base text-neutral-950 outline-none placeholder:text-neutral-400"
                placeholder={`Search ${scope.toLowerCase()}`}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setPage(1)
                }}
              />
            </label>
            <ChoiceMenu
              label="Search by"
              value={scope}
              options={searchScopes}
              onSelect={(value) => {
                setScope(value)
                setPage(1)
              }}
              accent
            />
          </div>
        </div>
      </section>

      <section
        id="course-results"
        className="mx-auto max-w-300 scroll-mt-20 px-5 pt-18 pb-28 xl:px-0"
        aria-label="Browse courses"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              aria-expanded={showFilters}
              aria-controls="all-course-filters"
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex h-12 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${showFilters ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'}`}
            >
              <FiFilter aria-hidden="true" />
              Filter
            </button>
            <ChoiceMenu
              label="Course level"
              value={level}
              options={levels}
              onSelect={(value) => {
                setLevel(value)
                setPage(1)
              }}
              icon={<FaChartSimple aria-hidden="true" />}
            />
            <ChoiceMenu
              label="Course category"
              value={category}
              options={categories}
              onSelect={changeCategory}
              icon={<LuShapes aria-hidden="true" />}
            />
          </div>
          <ChoiceMenu
            label="Sort courses"
            value={sort}
            options={sortOptions}
            onSelect={(value) => {
              setSort(value)
              setPage(1)
            }}
            icon={<LuListFilter aria-hidden="true" />}
            align="right"
          />
        </div>
        {showFilters && (
          <div
            id="all-course-filters"
            className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-heading text-xl">Filter courses</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Find the right course for your next step.
                </p>
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-blue-700 underline underline-offset-4"
              >
                Clear all
              </button>
            </div>
            <div className="mt-5 grid gap-5 border-t border-neutral-100 pt-5 sm:grid-cols-2">
              <fieldset>
                <legend className="mb-3 text-sm font-medium">Level</legend>
                <div className="flex flex-wrap gap-2">
                  {levels.map((value) => (
                    <button
                      type="button"
                      key={value}
                      aria-pressed={level === value}
                      onClick={() => {
                        setLevel(value)
                        setPage(1)
                      }}
                      className={`rounded-full px-4 py-2 text-sm ${level === value ? 'bg-blue-700 text-white' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-3 text-sm font-medium">Duration</legend>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={shortCourses}
                    onChange={(event) => {
                      setShortCourses(event.target.checked)
                      setPage(1)
                    }}
                    className="size-4 accent-blue-700"
                  />
                  Under 3 hours
                </label>
              </fieldset>
            </div>
          </div>
        )}
        <div
          className="mt-8 flex gap-3 overflow-x-auto pb-2 lg:justify-between"
          aria-label="Course categories"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => changeCategory(item)}
              className={`shrink-0 rounded-full px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${category === item ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm text-neutral-500" role="status">
          {filtered.length} {filtered.length === 1 ? 'course' : 'courses'} found
        </p>
        {visibleCourses.length ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {visibleCourses.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>
        ) : (
          <div className="py-28 text-center">
            <h2 className="font-heading text-heading-xs">No courses found</h2>
            <p className="mt-2 text-neutral-500">
              Try another search or clear your filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full bg-lime-400 px-6 py-3 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
        {pageCount > 1 && (
          <nav
            className="mt-18 flex items-center justify-center gap-3 sm:gap-6"
            aria-label="Course pages"
          >
            <button
              type="button"
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className="flex size-12 items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40"
            >
              <FiChevronLeft />
            </button>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                type="button"
                key={index}
                aria-label={`Page ${index + 1}`}
                aria-current={page === index + 1 ? 'page' : undefined}
                onClick={() => goToPage(index + 1)}
                className={`font-heading text-xl ${page === index + 1 ? 'text-blue-700' : 'text-neutral-950'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              aria-label="Next page"
              disabled={page === pageCount}
              onClick={() => goToPage(page + 1)}
              className="flex size-12 items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40"
            >
              <FiChevronRight />
            </button>
          </nav>
        )}
      </section>
    </main>
  )
}
