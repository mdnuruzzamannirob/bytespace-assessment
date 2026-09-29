'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { FaChartSimple } from 'react-icons/fa6'
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiFilter, FiSearch } from 'react-icons/fi'
import { LuListFilter, LuShapes } from 'react-icons/lu'

import { gridPatternClassName, StudentFaces } from '@/components/home/HomeShared'
import { categories, courses, type Course } from '@/constants/courses'

const pageSize = 18

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group min-w-0 rounded-card border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[341/195] overflow-hidden rounded-xl bg-neutral-100">
        <Image src={course.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 341px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5 text-[10px] text-neutral-700 sm:text-xs">
          {['17 Lessons', '2 hours 16 mins', '59 Comments'].map((detail) => <span className="rounded-full bg-white/75 px-2 py-1 backdrop-blur-sm" key={detail}>{detail}</span>)}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="truncate font-heading text-xl leading-6 text-black" title={course.title}>{course.title}</h2>
          <p className="text-xs text-neutral-700">by <span className="text-blue-800">purepearl studio</span></p>
        </div>
        <span className="shrink-0 text-lg text-neutral-500">4.5 <span className="text-neutral-200" aria-label="out of 5 stars">★</span></span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-50 px-3 py-1.5 text-xs text-neutral-700"><FaChartSimple aria-hidden="true" />{course.level}</span>
        <StudentFaces compact />
      </div>
      <p className="mt-4 text-blue-800"><strong className="font-heading text-xl">$25</strong><span className="text-xs text-neutral-700">/lifetime</span></p>
    </article>
  )
}

export function CoursesBrowser() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Featured')
  const [level, setLevel] = useState('All levels')
  const [sort, setSort] = useState('Most relevant')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const matches = courses.filter((course) =>
      (!query || course.title.toLowerCase().includes(query) || course.category.toLowerCase().includes(query)) &&
      (category === 'Featured' || course.category === category) &&
      (level === 'All levels' || course.level === level),
    )
    if (sort === 'Title A–Z') return [...matches].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'Title Z–A') return [...matches].sort((a, b) => b.title.localeCompare(a.title))
    return matches
  }, [search, category, level, sort])

  const pageCount = Math.ceil(filtered.length / pageSize)
  const visibleCourses = filtered.slice((page - 1) * pageSize, page * pageSize)
  const selectCategory = (value: string) => { setCategory(value); setPage(1) }

  return (
    <main>
      <section className={`bg-blue-800 pt-40 pb-17 text-white ${gridPatternClassName}`} aria-labelledby="courses-heading">
        <div className="mx-auto max-w-300 px-5 text-center">
          <h1 id="courses-heading" className="font-heading text-heading-s">Find Your Next Course</h1>
          <div className="mx-auto mt-8 flex max-w-156 flex-col gap-4 sm:flex-row">
            <label className="flex h-13 min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-6 text-neutral-400">
              <FiSearch className="size-5 shrink-0" aria-hidden="true" />
              <span className="sr-only">Search courses</span>
              <input className="w-full min-w-0 bg-transparent text-lg text-neutral-950 outline-none placeholder:text-neutral-400" placeholder="Search" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} />
            </label>
            <button type="button" onClick={() => document.getElementById('course-results')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-lime-400 px-6 text-lg font-medium text-neutral-950 hover:bg-lime-300">Courses <FiChevronDown aria-hidden="true" /></button>
          </div>
        </div>
      </section>

      <section id="course-results" className="mx-auto max-w-300 px-5 pt-18 pb-28 xl:px-0" aria-label="Browse courses">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <button type="button" aria-expanded={showFilters} onClick={() => setShowFilters((shown) => !shown)} className="inline-flex h-12 items-center gap-1 rounded-full border border-neutral-200 px-4 text-neutral-700 hover:border-blue-700"><FiFilter aria-hidden="true" />Filter</button>
            <label className="inline-flex h-12 items-center gap-1 rounded-full border border-neutral-200 px-4 text-neutral-700 hover:border-blue-700"><FaChartSimple aria-hidden="true" /><span className="sr-only">Level</span><select className="max-w-25 cursor-pointer appearance-none bg-transparent outline-none" value={level} onChange={(event) => { setLevel(event.target.value); setPage(1) }}><option value="All levels">Level</option><option>Beginner</option><option>Intermediate</option></select></label>
            <label className="inline-flex h-12 items-center gap-1 rounded-full border border-neutral-200 px-4 text-neutral-700 hover:border-blue-700"><LuShapes aria-hidden="true" /><span className="sr-only">Category</span><select className="max-w-27 cursor-pointer appearance-none bg-transparent outline-none" value={category} onChange={(event) => selectCategory(event.target.value)}>{categories.map((item) => <option value={item} key={item}>{item === 'Featured' ? 'Category' : item}</option>)}</select></label>
          </div>
          <label className="inline-flex h-12 items-center gap-1 rounded-full border border-neutral-200 px-4 text-neutral-700 hover:border-blue-700"><LuListFilter aria-hidden="true" /><span className="sr-only">Sort courses</span><select className="cursor-pointer appearance-none bg-transparent outline-none" value={sort} onChange={(event) => { setSort(event.target.value); setPage(1) }}><option>Most relevant</option><option>Title A–Z</option><option>Title Z–A</option></select></label>
        </div>
        {showFilters && <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">Showing {filtered.length} courses. Choose a level or category above to refine the results. <button type="button" className="ml-2 text-blue-700 underline" onClick={() => { setSearch(''); setCategory('Featured'); setLevel('All levels'); setSort('Most relevant'); setPage(1) }}>Clear filters</button></div>}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 lg:justify-between" aria-label="Course categories">
          {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => selectCategory(item)} className={`shrink-0 rounded-full px-4 py-3 text-sm font-medium transition-colors ${category === item ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}>{item}</button>)}
        </div>
        {visibleCourses.length ? <div className="mt-18 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">{visibleCourses.map((course) => <CourseCard course={course} key={course.id} />)}</div> : <div className="py-32 text-center"><h2 className="font-heading text-heading-xs">No courses found</h2><p className="mt-2 text-neutral-500">Try another search or category.</p></div>}
        {pageCount > 1 && <nav className="mt-18 flex items-center justify-center gap-3 sm:gap-6" aria-label="Course pages"><button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => setPage(page - 1)} className="flex size-12 items-center justify-center rounded-full border border-neutral-200 disabled:opacity-40"><FiChevronLeft /></button>{Array.from({ length: pageCount }, (_, index) => <button type="button" key={index} aria-label={`Page ${index + 1}`} aria-current={page === index + 1 ? 'page' : undefined} onClick={() => setPage(index + 1)} className={`font-heading text-xl ${page === index + 1 ? 'text-blue-700' : 'text-neutral-950'}`}>{index + 1}</button>)}<button type="button" aria-label="Next page" disabled={page === pageCount} onClick={() => setPage(page + 1)} className="flex size-12 items-center justify-center rounded-full border border-neutral-200 disabled:opacity-40"><FiChevronRight /></button></nav>}
      </section>
    </main>
  )
}
