'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'swiper/css'
import { A11y, FreeMode, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { SearchHero } from '@/components/catalog/SearchHero'
import { CourseBrowseControls } from '@/components/courses/CourseBrowseControls'
import { CourseCard } from '@/components/courses/CourseCard'
import { Pagination } from '@/components/ui/pagination'
import { courses, filterCourses, sortCourses } from '@/lib/catalog'
import { categories, type CourseCategory } from '@/lib/constants/catalog'
import { parseCourseQuery, serializeCourseQuery, type CourseQuery } from '@/lib/course-query'

const pageSize = 15
const categorySwiperModules = [A11y, FreeMode, Keyboard]
export function CoursesBrowser({ initialQuery }: { initialQuery: CourseQuery }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const skipWrite = useRef(false)
  const [search, setSearch] = useState(initialQuery.search)
  const [scope, setScope] = useState(initialQuery.scope)
  const [category, setCategory] = useState(initialQuery.category)
  const [level, setLevel] = useState(initialQuery.level)
  const [sort, setSort] = useState(initialQuery.sort)
  const [duration, setDuration] = useState(initialQuery.duration)
  const [ratingMin, setRatingMin] = useState(initialQuery.ratingMin)
  const [lessonsMin, setLessonsMin] = useState(initialQuery.lessonsMin)
  const [priceMax, setPriceMax] = useState(initialQuery.priceMax)
  const [page, setPage] = useState(initialQuery.page)
  const [showFilters, setShowFilters] = useState(false)
  const currentQuery: CourseQuery = {
    search,
    scope,
    category,
    level,
    sort,
    duration,
    ratingMin,
    lessonsMin,
    priceMax,
    page,
  }
  const currentQueryRef = useRef(currentQuery)
  useEffect(() => {
    currentQueryRef.current = currentQuery
  })

  // Keep controls in sync when a user navigates to another query or uses Back/Forward.
  useEffect(() => {
    const incoming = searchParams.toString()
    if (incoming === serializeCourseQuery(currentQueryRef.current)) return
    const query = parseCourseQuery(searchParams)
    skipWrite.current = true
    setSearch(query.search)
    setScope(query.scope)
    setCategory(query.category)
    setLevel(query.level)
    setSort(query.sort)
    setDuration(query.duration)
    setRatingMin(query.ratingMin)
    setLessonsMin(query.lessonsMin)
    setPriceMax(query.priceMax)
    setPage(query.page)
  }, [searchParams])

  useEffect(() => {
    if (skipWrite.current) {
      skipWrite.current = false
      return
    }
    const query = serializeCourseQuery({
      search,
      scope,
      category,
      level,
      sort,
      duration,
      ratingMin,
      lessonsMin,
      priceMax,
      page,
    })
    if (query === searchParams.toString()) return
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [
    search,
    scope,
    category,
    level,
    sort,
    duration,
    ratingMin,
    lessonsMin,
    priceMax,
    page,
    pathname,
    router,
    searchParams,
  ])

  const filtered = useMemo(() => {
    return sortCourses(
      filterCourses(courses, {
        query: search,
        scope,
        category,
        level,
        duration,
        ratingMin,
        lessonsMin,
        priceMax,
      }),
      sort,
    )
  }, [search, scope, category, level, sort, duration, ratingMin, lessonsMin, priceMax])

  const pageCount = Math.ceil(filtered.length / pageSize)
  const currentPage = Math.min(page, Math.max(pageCount, 1))
  const visibleCourses = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const changeCategory = (value: CourseCategory) => {
    setCategory(value)
    setPage(1)
  }
  const clearFilters = () => {
    setSearch('')
    setCategory('Featured')
    setLevel('All levels')
    setDuration('any')
    setRatingMin(0)
    setLessonsMin(0)
    setPriceMax(0)
    setSort('Most relevant')
    setPage(1)
  }
  const closeFilters = useCallback(() => setShowFilters(false), [])
  const goToPage = (value: number) => {
    setPage(value)
    document.getElementById('course-results')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      <SearchHero
        heading="Find Your Next Course"
        search={search}
        onSearch={(value) => {
          setSearch(value)
          setPage(1)
        }}
        scope={scope}
        onScopeChange={(value) => {
          setScope(value)
          setPage(1)
        }}
      />

      <section
        id="course-results"
        className="mx-auto max-w-300 scroll-mt-20 px-5 pt-12 pb-20 sm:pt-18 sm:pb-28 xl:px-0"
        aria-label="Browse courses"
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
          onCategoryChange={changeCategory}
          onLevelChange={(value) => {
            setLevel(value)
            setPage(1)
          }}
          onSortChange={(value) => {
            setSort(value)
            setPage(1)
          }}
          onDurationChange={(value) => {
            setDuration(value)
            setPage(1)
          }}
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
          onToggleFilters={() => setShowFilters((value) => !value)}
          onClear={clearFilters}
          onClose={closeFilters}
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
                  className={`rounded-full px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 ${category === item ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}
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
            <p className="mt-2 text-neutral-500">Try another search or clear your filters.</p>
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
            label="Course pages"
            onPageChange={goToPage}
            className="mt-18"
          />
        )}
      </section>
    </main>
  )
}
