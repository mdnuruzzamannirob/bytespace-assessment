import { describe, expect, it } from 'vitest'

import { courses, creators, filterCourses, sortCourses } from '@/lib/catalog'
import { parseCourseQuery, serializeCourseQuery } from '@/lib/course-query'
import { categories } from '@/lib/constants/catalog'

describe('catalog integrity', () => {
  it('keeps every course linked to a real creator and a visible category', () => {
    const creatorSlugs = new Set(creators.map((creator) => creator.slug))
    for (const course of courses) {
      expect(creatorSlugs.has(course.creatorSlug), course.title).toBe(true)
      expect(categories.includes(course.category), course.title).toBe(true)
    }
  })

  it('combines category, duration, rating and price filters without changing the source', () => {
    const originalLength = courses.length
    const results = filterCourses(courses, {
      category: 'Design',
      duration: 'under2',
      ratingMin: 4,
      priceMax: 35,
    })
    expect(results.length).toBeGreaterThan(0)
    expect(
      results.every(
        (course) =>
          course.category === 'Design' &&
          course.durationMinutes < 120 &&
          course.rating >= 4 &&
          course.price <= 35,
      ),
    ).toBe(true)
    expect(courses).toHaveLength(originalLength)
  })

  it('sorts a copy so changing order does not mutate the catalog', () => {
    const originalFirst = courses[0]
    const sorted = sortCourses(courses, 'Title Z–A')
    expect(sorted[0].title.localeCompare(sorted.at(-1)!.title)).toBeGreaterThanOrEqual(0)
    expect(courses[0]).toBe(originalFirst)
  })
})

describe('course URL state', () => {
  it('round-trips a shared filtered URL', () => {
    const original = parseCourseQuery(
      new URLSearchParams('q=figma&category=Design&duration=under2&sort=Highest+rated&page=2'),
    )
    const restored = parseCourseQuery(new URLSearchParams(serializeCourseQuery(original)))
    expect(restored).toEqual(original)
  })

  it('rejects invalid filter values from a URL', () => {
    const result = parseCourseQuery(
      new URLSearchParams('category=Unknown&duration=forever&rating=999&page=-3'),
    )
    expect(result.category).toBe('Featured')
    expect(result.duration).toBe('any')
    expect(result.ratingMin).toBe(0)
    expect(result.page).toBe(1)
  })
})
