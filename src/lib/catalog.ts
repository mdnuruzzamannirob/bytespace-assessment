import type { DurationFilter } from '@/lib/constants/catalog'
import { courses, type Course } from '@/lib/demo-data/courses'
import { creators, type Creator } from '@/lib/demo-data/creators'

export { courses, creators }
export const platformStats = {
  courses: courses.length,
  creators: creators.length,
  enrollments: courses.reduce((sum, course) => sum + course.enrollments, 0),
  reviews: courses.reduce((sum, course) => sum + course.reviewCount, 0),
  averageRating: Number(
    (
      courses.reduce((sum, course) => sum + course.rating * course.reviewCount, 0) /
      courses.reduce((sum, course) => sum + course.reviewCount, 0)
    ).toFixed(1),
  ),
}

export function getCreatorStats(creator: Creator, followedSlugs: readonly string[] = []) {
  return {
    products: getCoursesByCreator(creator.slug).length,
    followers: creator.followers + Number(followedSlugs.includes(creator.slug)),
  }
}

export type { Course }

export function getCourseById(id: number) {
  return courses.find((course) => course.id === id)
}

export function getCreatorBySlug(slug: string) {
  return creators.find((creator) => creator.slug === slug)
}

export function getCoursesByCreator(slug: string) {
  return courses.filter((course) => course.creatorSlug === slug)
}

export function filterCourses(
  input: readonly Course[],
  filters: {
    query?: string
    scope?: 'Courses' | 'Categories'
    category?: string
    level?: string
    duration?: DurationFilter
    ratingMin?: number
    lessonsMin?: number
    priceMax?: number
  } = {},
) {
  const query = filters.query?.trim().toLowerCase() ?? ''
  return input.filter((course) => {
    const searchable =
      filters.scope === 'Categories' ? course.category : `${course.title} ${course.description}`
    const matchesDuration =
      !filters.duration ||
      filters.duration === 'any' ||
      (filters.duration === 'under2' && course.durationMinutes < 120) ||
      (filters.duration === 'twoToThree' &&
        course.durationMinutes >= 120 &&
        course.durationMinutes < 180) ||
      (filters.duration === 'threePlus' && course.durationMinutes >= 180)
    return (
      (!query || searchable.toLowerCase().includes(query)) &&
      (!filters.category ||
        filters.category === 'Featured' ||
        course.category === filters.category) &&
      (!filters.level || filters.level === 'All levels' || course.level === filters.level) &&
      matchesDuration &&
      (!filters.ratingMin || course.rating >= filters.ratingMin) &&
      (!filters.lessonsMin || course.lessons >= filters.lessonsMin) &&
      (!filters.priceMax || course.price <= filters.priceMax)
    )
  })
}

export function sortCourses(input: readonly Course[], sort: string) {
  if (sort === 'Title A–Z') return [...input].sort((a, b) => a.title.localeCompare(b.title))
  if (sort === 'Title Z–A') return [...input].sort((a, b) => b.title.localeCompare(a.title))
  if (sort === 'Highest rated') return [...input].sort((a, b) => b.rating - a.rating)
  return [...input]
}
