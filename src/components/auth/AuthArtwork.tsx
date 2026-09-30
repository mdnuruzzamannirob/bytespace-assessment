import Image from 'next/image'
import { FaChartSimple } from 'react-icons/fa6'

import { courses, getCreatorBySlug, platformStats, type Course } from '@/lib/catalog'
import { formatCompactNumber } from '@/lib/format'

const courseLearners = [
  'home/people/learner-pink-background.png',
  'home/people/learner-curly-hair.png',
  'home/people/learner-yellow-background.png',
  'home/people/learner-blue-shirt.png',
]

const happyStudents = [
  'home/people/student-at-table.png',
  courseLearners[0],
  'home/people/student-pink-shirt.png',
  'home/people/student-with-camera.png',
  'home/people/student-with-hat.png',
  'home/people/student-with-glasses.png',
  'home/people/student-outdoors.png',
]

function StudentAvatars({ students, count }: { students: string[]; count: number }) {
  return (
    <span className="flex items-center -space-x-2">
      {students.map((student) => (
        <Image
          alt=""
          className="size-8 rounded-full border border-white object-cover"
          height={32}
          key={student}
          src={`/assets/${student}`}
          width={32}
        />
      ))}
      <span className="flex size-8 items-center justify-center rounded-full bg-neutral-950 text-[11px] font-semibold text-white">
        {formatCompactNumber(count)}
      </span>
    </span>
  )
}

function CourseCard({ course, className }: { course: Course; className: string }) {
  return (
    <div
      className={`absolute h-96 w-93 rounded-3xl bg-white p-4 text-neutral-950 shadow-lg ${className}`}
    >
      <Image
        alt=""
        className="h-49 w-full rounded-xl object-cover"
        height={196}
        src={course.image}
        width={341}
      />
      <div className="mt-5 flex items-start justify-between gap-3">
        <p className="font-heading text-lg leading-tight font-semibold">{course.title}</p>
        <span className="text-body-s shrink-0">
          {course.rating.toFixed(1)} <span className="text-lime-400">★</span>
        </span>
      </div>
      <p className="text-body-xs mt-1 text-neutral-500">
        by <span className="text-blue-700">{getCreatorBySlug(course.creatorSlug)?.name}</span>
      </p>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-body-xs inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1">
          <FaChartSimple aria-hidden="true" />
          {course.level}
        </span>
        <StudentAvatars students={courseLearners} count={course.enrollments} />
      </div>
      <p className="mt-3 text-blue-700">
        <strong className="text-lg">${course.price}</strong>
        <span className="text-body-xs text-neutral-500">/lifetime</span>
      </p>
    </div>
  )
}

export function AuthArtwork() {
  return (
    <div aria-hidden="true" className="relative h-143 w-125 select-none">
      <CourseCard className="top-22 left-0" course={courses[1]} />
      <CourseCard className="-top-1 left-28 z-10" course={courses[14]} />
      <span className="absolute top-10 left-12 z-20 h-20 w-25 -rotate-32 rounded-[50%] border-20 border-lime-400 shadow-sm" />
      <Image
        alt=""
        className="absolute top-82 right-0 z-20"
        height={136}
        src="/assets/home/decorations/decorative-white-small-squiggle.png"
        width={136}
      />
      <Image
        alt=""
        className="absolute bottom-1 left-0 z-20"
        height={125}
        src="/assets/home/decorations/decorative-lime-triangle.png"
        width={125}
      />
      <div className="absolute right-3 bottom-5 z-30 w-65 rounded-2xl bg-lime-400 px-4 py-3 text-neutral-950 shadow-lg">
        <p className="text-body-m">Happy Students</p>
        <p className="text-body-xs">
          {platformStats.averageRating.toFixed(1)}{' '}
          <span className="text-blue-700">({formatCompactNumber(platformStats.reviews)}) ★</span>
        </p>
        <div className="mt-2">
          <StudentAvatars students={happyStudents} count={platformStats.enrollments} />
        </div>
      </div>
    </div>
  )
}
