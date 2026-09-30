import Image from 'next/image'
import { IoStarSharp } from 'react-icons/io5'

import { demoLearnerProgress, studentAvatars } from '@/lib/constants/home'
import { platformStats } from '@/lib/catalog'
import { formatCompactNumber } from '@/lib/format'

export const gridPatternClassName =
  'bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_2px,transparent_2px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_2px,transparent_2px)] bg-size-[120px_120px] max-md:bg-size-[80px_80px]'

export function StudentFaces({
  compact = false,
  count = platformStats.enrollments,
}: {
  compact?: boolean
  count?: number
}) {
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
        {formatCompactNumber(count)}+
      </span>
    </span>
  )
}

export function FloatingStudents({ className = '' }: { className?: string }) {
  return (
    <div className={`w-65 rounded-xl bg-white px-4 py-5 text-neutral-950 shadow-lg ${className}`}>
      <p className="text-label-m">Happy Students</p>
      <p className="flex items-center gap-1 text-[10px]">
        {platformStats.averageRating.toFixed(1)}{' '}
        <span className="text-neutral-400">({formatCompactNumber(platformStats.reviews)}) </span>{' '}
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
      <p className="text-body-xs">Example Progress</p>
      <strong className="font-heading text-5xl leading-[1.2]">{demoLearnerProgress}%</strong>
      <div className="mt-1 h-2 rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-lime-400"
          style={{ width: `${demoLearnerProgress}%` }}
        />
      </div>
    </div>
  )
}
