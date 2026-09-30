import {
  categories,
  levels,
  sortOptions,
  type CourseCategory,
  type CourseLevel,
  type CourseScope,
  type CourseSort,
  type DurationFilter,
} from '@/lib/constants/catalog'

type QuerySource = { get: (key: string) => string | null }
export type CourseQuery = {
  search: string
  scope: CourseScope
  category: CourseCategory
  level: CourseLevel
  sort: CourseSort
  duration: DurationFilter
  ratingMin: number
  lessonsMin: number
  priceMax: number
  page: number
}

function oneOf<T extends string>(value: string | null, options: readonly T[], fallback: T): T {
  return options.find((option) => option.toLowerCase() === value?.toLowerCase()) ?? fallback
}
function oneOfNumber(value: string | null, options: readonly number[]) {
  const parsed = Number(value)
  return options.includes(parsed) ? parsed : 0
}
export function parseCourseQuery(params: QuerySource): CourseQuery {
  const page = Number.parseInt(params.get('page') ?? '', 10)
  return {
    search: params.get('q') ?? '',
    scope: oneOf(params.get('scope'), ['Courses', 'Categories'] as const, 'Courses'),
    category: oneOf(params.get('category'), categories, 'Featured'),
    level: oneOf(params.get('level'), levels, 'All levels'),
    sort: oneOf(params.get('sort'), sortOptions, 'Most relevant'),
    duration: oneOf(
      params.get('duration'),
      ['any', 'under2', 'twoToThree', 'threePlus'] as const,
      'any',
    ),
    ratingMin: oneOfNumber(params.get('rating'), [0, 1, 2, 3, 4]),
    lessonsMin: oneOfNumber(params.get('lessons'), [0, 10, 17, 22]),
    priceMax: oneOfNumber(params.get('price'), [0, 25, 35, 50]),
    page: Number.isFinite(page) && page > 0 ? page : 1,
  }
}
export function serializeCourseQuery(query: CourseQuery) {
  const params = new URLSearchParams()
  if (query.search) params.set('q', query.search)
  if (query.scope !== 'Courses') params.set('scope', query.scope)
  if (query.category !== 'Featured') params.set('category', query.category)
  if (query.level !== 'All levels') params.set('level', query.level)
  if (query.duration !== 'any') params.set('duration', query.duration)
  if (query.ratingMin) params.set('rating', String(query.ratingMin))
  if (query.lessonsMin) params.set('lessons', String(query.lessonsMin))
  if (query.priceMax) params.set('price', String(query.priceMax))
  if (query.sort !== 'Most relevant') params.set('sort', query.sort)
  if (query.page > 1) params.set('page', String(query.page))
  return params.toString()
}
