import type { Metadata } from 'next'
import { CoursesBrowser } from '@/components/courses/CoursesBrowser'

export const metadata: Metadata = {
  title: 'Courses | ByteSpace',
  description: 'Find your next course in design, business, marketing, and more.',
}

export default function CoursesPage() {
  return <CoursesBrowser />
}
