'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import 'swiper/css'
import { A11y, FreeMode, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { SearchHero } from '@/components/catalog/SearchHero'
import { CourseBrowseControls } from '@/components/courses/CourseBrowseControls'
import { CourseCard } from '@/components/courses/CourseCard'
import { Pagination } from '@/components/ui/pagination'
import { courses, filterCourses, sortCourses } from '@/lib/catalog'
import { categories } from '@/lib/constants/catalog'

const pageSize = 15
const categorySwiperModules = [A11y, FreeMode, Keyboard]
export function CoursesBrowser({
  initialCategory = 'Featured',
  initialSearch = '',
  initialScope = 'Courses',
  initialLevel = 'All levels',
  initialSort = 'Most relevant',
  initialDuration = 'any',
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
  initialDuration?: 'any' | 'under2' | 'twoToThree' | 'threePlus'
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
    if (duration !== 'any') params.set('duration', duration)
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
    return sortCourses(
      filterCourses(courses, {
        query: search,
        scope: scope as 'Courses' | 'Categories',
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
  const changeCategory = (value: string) => {
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
            onPageChange={goToPage}
            className="mt-18"
          />
        )}
      </section>
    </main>
  )
}
