'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { FaChartSimple } from 'react-icons/fa6'
import { FiFilter } from 'react-icons/fi'
import { LuListFilter, LuShapes } from 'react-icons/lu'
import 'swiper/css'
import { A11y, FreeMode, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CourseCard } from '@/components/courses/CourseCard'
import { CourseFilters } from '@/components/courses/CourseFilters'
import { gridPatternClassName } from '@/components/home/HomeShared'
import { Pagination } from '@/components/ui/pagination'
import { SearchField } from '@/components/ui/search-field'
import { Select } from '@/components/ui/select'
import { categories, courses } from '@/constants/courses'

const pageSize = 15
const searchScopes = ['Courses', 'Categories', 'Creators'] as const
const levels = ['All levels', 'Beginner', 'Intermediate'] as const
const sortOptions = [
  'Most relevant',
  'Title A–Z',
  'Title Z–A',
  'Highest rated',
] as const

const categorySwiperModules = [A11y, FreeMode, Keyboard]
export function CoursesBrowser({
  initialCategory = 'Featured',
  initialSearch = '',
  initialScope = 'Courses',
  initialLevel = 'All levels',
  initialSort = 'Most relevant',
  initialDuration = "any",
  initialRatingMin = 0,
  initialLessonsMin = 0,
  initialPriceMax = 0,
  initialPage = 1,
}: {
  initialCategory?: string
  initialSearch?: string
  initialScope?: string
  initialLevel?: string
  initialSort?: string
  initialDuration?: "any" | "under2" | "twoToThree" | "threePlus"
  initialRatingMin?: number
  initialLessonsMin?: number
  initialPriceMax?: number
  initialPage?: number
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [search, setSearch] = useState(initialSearch)
  const [scope, setScope] = useState<string>(initialScope)
  const [category, setCategory] = useState(
    categories.includes(initialCategory as (typeof categories)[number])
      ? initialCategory
      : 'Featured',
  )
  const [level, setLevel] = useState(initialLevel)
  const [sort, setSort] = useState(initialSort)
  const [duration, setDuration] = useState(initialDuration)
  const [ratingMin, setRatingMin] = useState(initialRatingMin)
  const [lessonsMin, setLessonsMin] = useState(initialLessonsMin)
  const [priceMax, setPriceMax] = useState(initialPriceMax)
  const [page, setPage] = useState(initialPage)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (scope !== 'Courses') params.set('scope', scope)
    if (category !== 'Featured') params.set('category', category)
    if (level !== 'All levels') params.set('level', level)
    if (duration !== "any") params.set("duration", duration)
    if (ratingMin) params.set('rating', String(ratingMin))
    if (lessonsMin) params.set('lessons', String(lessonsMin))
    if (priceMax) params.set('price', String(priceMax))
    if (sort !== 'Most relevant') params.set('sort', sort)
    if (page > 1) params.set('page', String(page))
    const query = params.toString()
    router.replace(query ? pathname + '?' + query : pathname, { scroll: false })
  }, [
    category,
    level,
    page,
    pathname,
    ratingMin,
    lessonsMin,
    priceMax,
    router,
    scope,
    search,
    duration,
    sort,
  ])

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
        (duration === "any" ||
          (duration === "under2" && course.durationMinutes < 120) ||
          (duration === "twoToThree" && course.durationMinutes >= 120 && course.durationMinutes < 180) ||
          (duration === "threePlus" && course.durationMinutes >= 180)) &&
        (!ratingMin || course.rating >= ratingMin) &&
        (!lessonsMin || course.lessons >= lessonsMin) &&
        (!priceMax || course.price <= priceMax)
      )
    })
    if (sort === 'Title A–Z')
      return [...matches].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'Title Z–A')
      return [...matches].sort((a, b) => b.title.localeCompare(a.title))
    if (sort === 'Highest rated')
      return [...matches].sort((a, b) => b.rating - a.rating)
    return matches
  }, [search, scope, category, level, sort, duration, ratingMin, lessonsMin, priceMax])

  const pageCount = Math.ceil(filtered.length / pageSize)
  const currentPage = Math.min(page, Math.max(pageCount, 1))
  const visibleCourses = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )
  const changeCategory = (value: string) => {
    setCategory(value)
    setPage(1)
  }
  const clearFilters = () => {
    setSearch('')
    setCategory('Featured')
    setLevel('All levels')
    setDuration("any")
    setRatingMin(0)
    setLessonsMin(0)
    setPriceMax(0)
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
        className={`bg-blue-800 pt-32 pb-14 text-white sm:pt-40 sm:pb-17 ${gridPatternClassName}`}
        aria-labelledby="courses-heading"
      >
        <div className="mx-auto max-w-300 px-5 text-center">
          <h1 id="courses-heading" className="font-heading text-heading-s">
            Find Your Next Course
          </h1>
          <div className="mx-auto mt-7 flex w-full max-w-156 flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <SearchField
              className="text-base"
              containerClassName="w-full flex-1 sm:w-auto"
              label={'Search ' + scope.toLowerCase()}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
              placeholder={'Search ' + scope.toLowerCase()}
              value={search}
            />
            <Select
              label="Search by"
              value={scope}
              options={searchScopes}
              onSelect={(value) => {
                setScope(value)
                setPage(1)
              }}
              buttonClassName="!border-lime-400 !bg-lime-400 px-6 !text-neutral-950 hover:!border-lime-300 hover:!bg-lime-300"
              mobileMenuWidth="trigger"
              className="w-full [&>button]:w-full sm:w-auto sm:[&>button]:w-auto"
            />
          </div>
        </div>
      </section>

      <section
        id="course-results"
        className="mx-auto max-w-300 scroll-mt-20 px-5 pt-12 pb-20 sm:pt-18 sm:pb-28 xl:px-0"
        aria-label="Browse courses"
      >
        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
          <button
            type="button"
            aria-expanded={showFilters}
            aria-controls="all-course-filters"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex h-12 w-full items-center justify-start gap-2 rounded-full border px-4 text-sm font-medium text-neutral-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 sm:w-auto ${showFilters ? 'border-neutral-400 bg-neutral-50' : 'border-neutral-200 bg-white hover:border-neutral-400 hover:bg-neutral-50'}`}
          >
            <FiFilter aria-hidden="true" />
            Filter
          </button>
          <Select
            label="Course level"
            triggerLabel={level === 'All levels' ? 'Level' : level}
            value={level}
            options={levels}
            onSelect={(value) => {
              setLevel(value)
              setPage(1)
            }}
            icon={<FaChartSimple aria-hidden="true" />}
            className="w-full [&>button]:w-full sm:w-auto sm:[&>button]:w-auto"
          />
          <Select
            label="Course category"
            contentWidth={256}
            triggerLabel={category === 'Featured' ? 'Category' : category}
            value={category}
            options={categories}
            onSelect={changeCategory}
            icon={<LuShapes aria-hidden="true" />}
            className="w-full [&>button]:w-full sm:w-auto sm:[&>button]:w-auto"
          />
          <Select
            label="Sort courses"
            value={sort}
            options={sortOptions}
            onSelect={(value) => {
              setSort(value)
              setPage(1)
            }}
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
          onRatingChange={(value) => {
            setRatingMin(value)
            setPage(1)
          }}
          onLessonsChange={(value) => {
            setLessonsMin(value)
            setPage(1)
          }}
          onPriceChange={(value) => {
            setPriceMax(value)
            setPage(1)
          }}
          onDurationChange={(value) => {
            setDuration(value)
            setPage(1)
          }}
          onClear={clearFilters}
          onClose={() => setShowFilters(false)}
        />
        <div className="mt-8 min-w-0">
          <Swiper
            modules={categorySwiperModules}
            slidesPerView="auto"
            spaceBetween={12}
            freeMode={{ enabled: true, momentumBounce: false }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            watchOverflow
            grabCursor
            touchEventsTarget="container"
            touchStartPreventDefault={false}
            role="region"
            aria-label="Course categories"
            className="w-full cursor-grab active:cursor-grabbing"
          >
            {categories.map((item) => (
              <SwiperSlide className="w-auto!" key={item}>
                <button
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => changeCategory(item)}
                  className={`whitespace-nowrap rounded-full px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 ${category === item ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}
                >
                  {item}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {visibleCourses.length ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {visibleCourses.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>
        ) : (
          <div className="py-28 text-center">
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
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            onPageChange={goToPage}
            className="mt-18"
          />
        )}
      </section>
    </main>
  )
}
