'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { CourseLessons } from '@/components/courses/details/CourseLessons'
import { CourseOverview } from '@/components/courses/details/CourseOverview'
import { CourseReviews } from '@/components/courses/details/CourseReviews'
import { DetailIcon } from '@/components/courses/details/DetailPrimitives'
import { gridPatternClassName } from '@/components/home/HomeShared'
import { ButtonLink } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { getCreatorBySlug, type Course } from '@/lib/catalog'
import { getCourseDetails, includedItems } from '@/lib/demo-data/course-details'

type Tab = 'About' | 'Lessons' | 'Reviews'
const assets = '/assets/course-details'

export function CourseDetailsContent({ course }: { course: Course }) {
  const [tab, setTab] = useState<Tab>('About')
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    About: null,
    Lessons: null,
    Reviews: null,
  })
  const [activeRating, setActiveRating] = useState<number | 'all'>('all')
  const { showToast } = useToast()
  const creator = getCreatorBySlug(course.creatorSlug)
  const details = getCourseDetails(course)
  const title = course.title

  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title, url })
      else {
        await navigator.clipboard.writeText(url)
        showToast('Course link copied.', 'success')
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      showToast('Unable to share this link.', 'error')
    }
  }

  function showLessons() {
    setTab('Lessons')
    document.getElementById('course-information')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="overflow-x-clip">
      <section
        className={`relative bg-blue-800 text-white xl:h-239.25 ${gridPatternClassName}`}
        aria-labelledby="course-title"
      >
        <div className="relative mx-auto max-w-300 px-5 pt-40 pb-16 xl:px-0 xl:pt-43">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-210">
              <h1 id="course-title" className="font-heading text-heading-s">
                {title}
              </h1>
              <p className="font-heading mt-2 text-xl leading-tight">{details.subtitle}</p>
              <p className="mt-6 text-lg text-blue-50">
                by{' '}
                <Link
                  href={`/creators/${course.creatorSlug}`}
                  className="font-medium text-lime-400 hover:underline"
                >
                  {creator?.name}
                </Link>
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                {[
                  { icon: 'level.svg', text: course.level },
                  { icon: 'star.svg', text: details.rating },
                  { icon: 'people.svg', text: details.students },
                ].map((item) => (
                  <span
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-medium text-neutral-950"
                    key={item.icon}
                  >
                    <DetailIcon name={item.icon} />
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-2 text-base font-medium text-neutral-950 hover:bg-lime-300"
              >
                <DetailIcon name="share.svg" />
                Share
              </button>
            </div>
          </div>
          <div className="mt-16 grid items-start gap-8 xl:grid-cols-[725px_412px] xl:gap-15.75">
            <div className="rounded-card relative aspect-720/479 overflow-hidden bg-neutral-100">
              <Image
                src={course.image}
                alt={`${title} course preview`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 725px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={showLessons}
                aria-label="Explore course lessons"
                className="rounded-card absolute top-1/2 left-1/2 flex size-26 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-neutral-800/25 p-4 backdrop-blur-md"
              >
                <DetailIcon name="play.svg" size={72} />
              </button>
            </div>
            <aside
              className="rounded-card relative z-10 border border-neutral-200 bg-white p-6 text-neutral-950 shadow-sm sm:p-10"
              aria-label="Course enrollment"
            >
              <h2 className="font-heading text-xl">
                {details.lessons} Lessons ({details.duration})
              </h2>
              <ol className="mt-6 space-y-3 text-sm">
                {details.lessonsList.slice(0, 3).map((lesson, index) => (
                  <li
                    className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-start gap-2"
                    key={lesson.title}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-medium">{lesson.title}</span>
                    <span className="text-blue-700">{lesson.duration}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-sm text-neutral-700">
                {Math.max(details.lessons - Math.min(details.lessonsList.length, 3), 0)} more videos
              </p>
              <p className="font-heading mt-6 text-4xl text-blue-800">
                ${course.price}
                <span className="font-sans text-base font-normal text-neutral-700">/lifetime</span>
              </p>
              <ButtonLink href="/signup" className="mt-5 w-full">
                Enroll Now
              </ButtonLink>
              <h3 className="font-heading mt-7 text-xl">This course includes</h3>
              <ul className="mt-5 space-y-3 text-base text-neutral-700">
                {includedItems.map((item) => (
                  <li className="flex items-center gap-2" key={item.label}>
                    <DetailIcon name={item.icon} />
                    {item.label}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-neutral-200 pt-6">
                <div className="flex items-center gap-3">
                  <Image
                    src={creator?.avatar ?? `${assets}/creator.png`}
                    width={52}
                    height={52}
                    alt={`${creator?.name ?? 'Creator'} profile`}
                    className="rounded-full"
                  />
                  <div>
                    <Link
                      href={`/creators/${course.creatorSlug}`}
                      className="text-lg font-medium hover:text-blue-700 hover:underline"
                    >
                      {creator?.name}
                    </Link>
                    <p className="text-base text-neutral-700">{creator?.tagline}</p>
                  </div>
                </div>
                <Link
                  href={`/creators/${course.creatorSlug}`}
                  className="mt-6 inline-flex rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  See Full Profile
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section
        id="course-information"
        className="mx-auto max-w-300 scroll-mt-22 px-5 pt-16 pb-30 xl:px-0"
        aria-label="Course information"
      >
        <div className="relative z-20 max-w-181.25">
          <div
            role="tablist"
            aria-label="Course information sections"
            className="flex flex-wrap gap-4"
          >
            {(['About', 'Lessons', 'Reviews'] as const).map((item) => (
              <button
                type="button"
                role="tab"
                id={`tab-${item.toLowerCase()}`}
                aria-selected={tab === item}
                tabIndex={tab === item ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[item] = element
                }}
                onKeyDown={(event) => {
                  const tabs: Tab[] = ['About', 'Lessons', 'Reviews']
                  const index = tabs.indexOf(item)
                  const next =
                    event.key === 'ArrowRight'
                      ? tabs[(index + 1) % tabs.length]
                      : event.key === 'ArrowLeft'
                        ? tabs[(index + tabs.length - 1) % tabs.length]
                        : event.key === 'Home'
                          ? tabs[0]
                          : event.key === 'End'
                            ? tabs[tabs.length - 1]
                            : null
                  if (!next) return
                  event.preventDefault()
                  setTab(next)
                  tabRefs.current[next]?.focus()
                }}
                aria-controls={`panel-${item.toLowerCase()}`}
                onClick={() => setTab(item)}
                key={item}
                className={`rounded-full px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-lime-600 ${tab === item ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}
              >
                {item}
              </button>
            ))}
          </div>
          {tab === 'About' && (
            <CourseOverview
              description={details.description}
              keyPoints={details.keyPoints}
              previewImages={details.previewImages}
            />
          )}
          {tab === 'Lessons' && <CourseLessons modules={details.modules} />}
          {tab === 'Reviews' && (
            <CourseReviews
              course={course}
              activeRating={activeRating}
              onRatingChange={setActiveRating}
            />
          )}
        </div>
      </section>
    </main>
  )
}
