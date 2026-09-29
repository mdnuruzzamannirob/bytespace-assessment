import Image from 'next/image'
import Link from 'next/link'
import { FaChartSimple } from 'react-icons/fa6'

import { StudentFaces } from '@/components/home/HomeShared'
import type { Course } from '@/constants/courses'

export function CourseCard({ course, className = '' }: { course: Course; className?: string }) {
  const hours = Math.floor(course.durationMinutes / 60)
  const minutes = course.durationMinutes % 60

  return (
    <Link
      href={`/courses/${course.id}`}
      aria-label={`View ${course.title} course details`}
      className={`group block w-full min-w-0 rounded-card border border-neutral-200 bg-white px-4 pt-4 pb-8 text-neutral-950 transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 ${className}`}
    >
      <div className="relative aspect-341/196 overflow-hidden rounded-xl bg-neutral-100">
        <Image
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={course.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 341px"
        />
        <div className="absolute inset-x-2 bottom-2 flex flex-wrap justify-between gap-1 text-[10px] text-neutral-700 sm:text-xs">
          <span className="rounded-full bg-white/80 px-2 py-1">{course.lessons} Lessons</span>
          <span className="rounded-full bg-white/80 px-2 py-1">{hours} hours {minutes} mins</span>
          <span className="rounded-full bg-white/80 px-2 py-1">{course.comments} Comments</span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h2
          className="min-w-0 truncate font-heading text-heading-xs group-hover:text-lime-800"
          title={course.title}
        >
          {course.title}
        </h2>
        <span className="shrink-0 text-body-xs text-neutral-500">
          {course.rating} <span className="text-lime-500" aria-label="out of 5 stars">★</span>
        </span>
      </div>
      <p className="text-body-xs text-neutral-500">
        by <span className="text-blue-700">{course.creator}</span>
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-50 px-3 py-1 text-body-xs">
          <FaChartSimple aria-hidden="true" /> {course.level}
        </span>
        <StudentFaces compact />
      </div>
      <p className="mt-4 text-blue-700">
        <strong className="text-label-l">${course.price}</strong>
        <span className="text-body-xs text-neutral-500">/lifetime</span>
      </p>
    </Link>
  )
}
