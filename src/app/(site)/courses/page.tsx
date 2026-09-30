import type { Metadata } from 'next'

import { CoursesBrowser } from '@/components/courses/CoursesBrowser'
import { parseCourseQuery } from '@/lib/course-query'

export const metadata: Metadata = {
  title: 'Courses | ByteSpace',
  description: 'Find your next course in design, business, marketing, and more.',
}

type SearchParams = Record<string, string | string[] | undefined>

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const raw = await searchParams
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'string') params.set(key, value)
  }
  return <CoursesBrowser initialQuery={parseCourseQuery(params)} />
}
