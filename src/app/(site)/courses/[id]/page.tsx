import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CourseDetailsContent } from '@/components/courses/CourseDetailsContent'
import { courses, getCourseById } from '@/lib/catalog'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return courses.map((course) => ({ id: String(course.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const course = getCourseById(Number(id))
  return {
    title: course
      ? `${course.title} | ByteSpace`
      : 'Course not found | ByteSpace',
    description: course?.description,
  }
}

export default async function CourseDetailsPage({ params }: Props) {
  const { id } = await params
  const course = getCourseById(Number(id))
  if (!course) notFound()
  return <CourseDetailsContent course={course} />
}
