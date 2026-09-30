import type { Metadata } from 'next'

import { CoursesBrowser } from '@/components/courses/CoursesBrowser'
import { categories } from '@/constants/courses'

export const metadata: Metadata = {
  title: 'Courses | ByteSpace',
  description:
    'Find your next course in design, business, marketing, and more.',
}

type SearchParams = Record<string, string | string[] | undefined>

function valueOf(value: string | string[] | undefined) {
  return typeof value === 'string' ? value : ''
}

function allowedValue(
  value: string,
  options: readonly string[],
  fallback: string,
) {
  return options.includes(value) ? value : fallback
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const category = categories.find(
    (item) => item.toLowerCase() === valueOf(params.category).toLowerCase(),
  )

  const page = Number.parseInt(valueOf(params.page), 10)
  const rating = Number(valueOf(params.rating))
  const lessons = Number(valueOf(params.lessons))

  return (
    <CoursesBrowser
      initialCategory={category ?? 'Featured'}
      initialLevel={allowedValue(
        valueOf(params.level),
        ['All levels', 'Beginner', 'Intermediate'],
        'All levels',
      )}
      initialPage={Number.isFinite(page) && page > 0 ? page : 1}
      initialRatingMin={[4.5, 4.7, 4.9].includes(rating) ? rating : 0}
      initialLessonsMin={[17, 22].includes(lessons) ? lessons : 0}
      initialScope={allowedValue(
        valueOf(params.scope),
        ['Courses', 'Categories', 'Creators'],
        'Courses',
      )}
      initialSearch={valueOf(params.q)}
      initialShortCourses={valueOf(params.duration) === 'short'}
      initialSort={allowedValue(
        valueOf(params.sort),
        ['Most relevant', 'Title A–Z', 'Title Z–A', 'Highest rated'],
        'Most relevant',
      )}
    />
  )
}
