import Image from 'next/image'
import Link from 'next/link'
import { FaChartSimple } from 'react-icons/fa6'

import { StudentFaces } from '@/components/home/HomeShared'
import { getCreatorBySlug, type Course } from '@/lib/catalog'
import { formatDuration } from '@/lib/format'
import { IoMdStar } from 'react-icons/io'

export function CourseCard({ course, className = '' }: { course: Course; className?: string }) {
  const creator = getCreatorBySlug(course.creatorSlug)

  return (
    <Link
      href={`/courses/${course.id}`}
      aria-label={`View ${course.title} course details`}
      className={`group rounded-card block w-full min-w-0 border border-neutral-200 bg-white px-4 pt-4 pb-8 text-neutral-950 transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 ${className}`}
    >
      <div className="relative aspect-341/196 overflow-hidden rounded-xl bg-neutral-100">
        <Image
          className="h-full w-full object-cover"
          src={course.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 341px"
        />
        <div className="absolute inset-x-2 bottom-2 flex flex-wrap justify-between gap-1 text-[10px] text-neutral-700 sm:text-xs">
          <span className="rounded-full bg-white/80 px-2 py-1">{course.lessons} Lessons</span>
          <span className="rounded-full bg-white/80 px-2 py-1">
            {formatDuration(course.durationMinutes)}
          </span>
          <span className="rounded-full bg-white/80 px-2 py-1">{course.reviewCount} Reviews</span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h2
          className="font-heading text-heading-xs min-w-0 truncate group-hover:text-lime-800"
          title={course.title}
        >
          {course.title}
        </h2>
        <span className="flex shrink-0 gap-1 text-neutral-500">
          {course.rating.toFixed(1)}{' '}
          <span className="text-lime-600" aria-label="out of 5 stars">
            <IoMdStar size={20} />
          </span>
        </span>
      </div>
      <p className="text-body-xs text-neutral-500">
        by <span className="text-blue-700">{creator?.name ?? 'ByteSpace Creator'}</span>
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-body-xs inline-flex items-center gap-1 rounded-full bg-neutral-50 px-3 py-1">
          <FaChartSimple aria-hidden="true" /> {course.level}
        </span>
        <StudentFaces compact count={course.enrollments} />
      </div>
      <p className="mt-4 text-blue-700">
        <strong className="text-label-l">${course.price}</strong>
        <span className="text-body-xs text-neutral-500">/lifetime</span>
      </p>
    </Link>
  )
}
