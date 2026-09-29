import type { Metadata } from 'next'
import { CoursesBrowser } from '@/components/courses/CoursesBrowser'
import { categories } from '@/constants/courses'

export const metadata: Metadata = {
  title: 'Courses | ByteSpace',
  description: 'Find your next course in design, business, marketing, and more.',
}

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams
  const initialCategory = categories.find((item) => item.toLowerCase() === category?.toLowerCase())
  return <CoursesBrowser initialCategory={initialCategory} />
}
