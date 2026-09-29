import Image from 'next/image'
import Link from 'next/link'
import { FaChartSimple } from 'react-icons/fa6'
import { IoStarSharp } from 'react-icons/io5'

import { featuredCourses, studentAvatars } from '@/constants/home'

export const gridPatternClassName =
  'bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_2px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_2px,transparent_1px)] bg-size-[120px_120px] max-md:bg-size-[80px_80px]'

export function StudentFaces({ compact = false }: { compact?: boolean }) {
  const size = compact ? 24 : 40
  const visibleStudents = compact ? studentAvatars.slice(0, 4) : studentAvatars

  return (
    <span
      className={`flex items-center ${compact ? '-space-x-2' : '-space-x-3.5'}`}
      aria-hidden="true"
    >
      {visibleStudents.map((src) => (
        <Image
          className={`${compact ? 'size-6' : 'size-10'} rounded-full border border-white object-cover`}
          src={`/assets/${src}`}
          alt=""
          width={size}
          height={size}
          key={src}
        />
      ))}
      <span
        className={`${compact ? 'size-6' : 'size-10'} flex items-center justify-center rounded-full bg-lime-400 text-[8px] font-bold text-neutral-950`}
      >
        2K+
      </span>
    </span>
  )
}

export function FloatingStudents({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-65 rounded-xl bg-white px-4 py-5 text-neutral-950 shadow-lg ${className}`}
    >
      <p className="text-label-m">Happy Students</p>
      <p className="flex items-center gap-1 text-[10px]">
        4.5 <span className="text-neutral-400">(240) </span>{' '}
        <IoStarSharp size={12} className="text-lime-400" />
      </p>
      <div className="mt-2">
        <StudentFaces />
      </div>
    </div>
  )
}

export function ProgressCard({
  className = '',
  expanded = false,
}: {
  className?: string
  expanded?: boolean
}) {
  return (
    <div
      className={`w-58 rounded-xl bg-white px-4 py-5 text-neutral-950 shadow-xl ${expanded ? 'lg:py-7.5' : ''} ${className}`}
    >
      <p className="text-body-xs">Learning Progress</p>
      <strong className="font-heading text-5xl leading-[1.2]">55%</strong>
      <div className="mt-1 h-2 rounded-full bg-neutral-100">
        <div className="h-full w-[55%] rounded-full bg-lime-400" />
      </div>
    </div>
  )
}

export function CourseCard({
  course,
}: {
  course: (typeof featuredCourses)[number]
}) {
  return (
    <Link
      href="/courses"
      className="group block min-w-0 w-full rounded-card border border-neutral-200 bg-white px-4 pt-4 pb-8 text-neutral-950 transition-shadow hover:shadow-xl"
    >
      <div className="relative h-49 overflow-hidden rounded-xl">
        <Image
          className="h-full w-full object-cover"
          src={course.image}
          alt=""
          width={341}
          height={196}
        />
        <div className="absolute inset-x-2 bottom-2 flex justify-between gap-1 text-[10px] text-neutral-500">
          <span className="rounded-full bg-white/80 px-2 py-1">17 Lessons</span>
          <span className="rounded-full bg-white/80 px-2 py-1">
            2 hours 16 mins
          </span>
          <span className="rounded-full bg-white/80 px-2 py-1">
            59 Comments
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="min-w-0 truncate font-heading text-heading-xs group-hover:text-blue-700">
          {course.title}
        </h3>
        <span className="shrink-0 text-body-xs text-neutral-500">
          4.5 <span className="text-lime-500">★</span>
        </span>
      </div>
      <p className="text-body-xs text-neutral-500">
        by <span className="text-blue-700">purepearl studio</span>
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-50 px-3 py-1 text-body-xs">
          <FaChartSimple /> Beginner
        </span>
        <StudentFaces compact />
      </div>
      <p className="mt-4 text-blue-700">
        <strong className="text-label-l">$25</strong>
        <span className="text-body-xs text-neutral-500">/lifetime</span>
      </p>
    </Link>
  )
}
