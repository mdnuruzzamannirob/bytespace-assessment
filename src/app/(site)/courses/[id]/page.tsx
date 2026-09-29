import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  FiArrowLeft,
  FiClock,
  FiPlayCircle,
  FiStar,
  FiUsers,
} from 'react-icons/fi'

import { courses } from '@/constants/courses'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return courses.map((course) => ({ id: String(course.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const course = courses.find((item) => item.id === Number(id))
  return {
    title: course
      ? `${course.title} | ByteSpace`
      : 'Course not found | ByteSpace',
    description: course?.description,
  }
}

export default async function CourseDetailsPage({ params }: Props) {
  const { id } = await params
  const course = courses.find((item) => item.id === Number(id))
  if (!course) notFound()

  const duration = `${Math.floor(course.durationMinutes / 60)} hours ${course.durationMinutes % 60} mins`

  return (
    <main>
      <section className="bg-blue-800 pt-38 pb-17 text-white">
        <div className="mx-auto max-w-300 px-5 xl:px-0">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-lime-400"
          >
            <FiArrowLeft aria-hidden="true" /> All courses
          </Link>
          <p className="mt-10 text-sm font-medium text-lime-400">
            {course.category} · {course.level}
          </p>
          <h1 className="mt-3 max-w-190 font-heading text-heading-l">
            {course.title}
          </h1>
          <p className="mt-5 max-w-180 text-lg text-blue-50">
            {course.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-50">
            <span className="inline-flex items-center gap-2">
              <FiStar className="text-lime-400" aria-hidden="true" />{' '}
              {course.rating} rating
            </span>
            <span className="inline-flex items-center gap-2">
              <FiUsers aria-hidden="true" /> 26+ students
            </span>
            <span className="inline-flex items-center gap-2">
              <FiClock aria-hidden="true" /> {duration}
            </span>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-300 gap-10 px-5 py-18 lg:grid-cols-[minmax(0,1fr)_380px] xl:px-0">
        <div>
          <h2 className="font-heading text-heading-s">About this course</h2>
          <p className="mt-5 max-w-180 text-body-l text-neutral-700">
            {course.description} Follow clear lessons, practice as you go, and
            leave with skills you can use in your own projects.
          </p>
          <div className="mt-12 rounded-card border border-neutral-200 p-6 sm:p-8">
            <h2 className="font-heading text-heading-xs">
              What you&apos;ll learn
            </h2>
            <ul className="mt-5 grid gap-4 text-neutral-700 sm:grid-cols-2">
              {[
                'Build a strong foundation in the topic',
                'Apply practical techniques step by step',
                'Finish a hands-on project',
                'Continue learning with confidence',
              ].map((item) => (
                <li className="flex gap-3" key={item}>
                  <span className="font-bold text-blue-700">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12">
            <h2 className="font-heading text-heading-s">Course content</h2>
            <p className="mt-2 text-neutral-500">
              {course.lessons} lessons · {duration}
            </p>
            <ol className="mt-6 divide-y divide-neutral-200 rounded-card border border-neutral-200">
              {[
                'Welcome and course overview',
                'The essential concepts',
                'Putting ideas into practice',
                'Your final project',
              ].map((lesson, index) => (
                <li className="flex items-center gap-4 px-5 py-5" key={lesson}>
                  <FiPlayCircle
                    className="size-5 text-blue-700"
                    aria-hidden="true"
                  />
                  <span className="font-medium">
                    {index + 1}. {lesson}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <aside
          className="h-fit overflow-hidden rounded-card border border-neutral-200 bg-white shadow-lg lg:-mt-55"
          aria-label="Course enrollment"
        >
          <div className="relative aspect-[341/195]">
            <Image
              src={course.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <p className="font-heading text-3xl text-blue-700">
              ${course.price}
              <span className="font-sans text-sm font-normal text-neutral-500">
                {' '}
                / lifetime
              </span>
            </p>
            <Link
              href="/signup"
              className="mt-5 flex w-full items-center justify-center rounded-full bg-lime-400 px-6 py-3 font-medium text-neutral-950 hover:bg-lime-300"
            >
              Join to enroll
            </Link>
            <p className="mt-3 text-center text-xs text-neutral-500">
              Create an account to start learning.
            </p>
            <div className="mt-6 space-y-3 border-t border-neutral-200 pt-6 text-sm text-neutral-700">
              <p className="flex justify-between">
                <span>Lessons</span>
                <strong>{course.lessons}</strong>
              </p>
              <p className="flex justify-between">
                <span>Duration</span>
                <strong>{duration}</strong>
              </p>
              <p className="flex justify-between">
                <span>Level</span>
                <strong>{course.level}</strong>
              </p>
              <p className="flex justify-between">
                <span>Access</span>
                <strong>Lifetime</strong>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
