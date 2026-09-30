import Link from 'next/link';

import { CourseCard } from '@/components/courses/CourseCard';
import { courses } from '@/lib/catalog';
import { courseTopicRows } from '@/lib/constants/home';

export function CoursesSection() {
  return (
    <section className="mx-auto max-w-300 px-5 pt-20 pb-16 sm:pt-24 lg:min-h-345 lg:pt-19 xl:px-0">
      <div className="mx-auto max-w-190 text-center">
        <h2 className="font-heading text-heading-m">
          Discover Your Passion,
          <br /> Build Your Skills
        </h2>
        <p className="text-body-m mt-5 text-neutral-500">
          At ByteSpace Courses, we bring you closer to life-changing knowledge. Explore a variety of
          courses across different fields, from technology to the arts, and make a difference in
          your career and life.
        </p>
      </div>
      <div className="mx-auto mt-10 flex max-w-300 flex-wrap justify-center gap-3 xl:flex-col xl:items-center xl:gap-6">
        {courseTopicRows.map((row, rowIndex) => (
          <div className="contents xl:flex xl:justify-center xl:gap-4" key={rowIndex}>
            {row.map((topic) => (
              <Link
                key={topic}
                href={`/courses?category=${encodeURIComponent(topic)}`}
                className={`text-body-s shrink-0 rounded-full px-4 py-3 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 sm:px-6 ${topic === 'Featured' ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}
              >
                {topic}
              </Link>
            ))}
            {rowIndex === courseTopicRows.length - 1 && (
              <Link
                href="/courses"
                className="text-body-s shrink-0 rounded-full bg-neutral-50 px-4 py-3 whitespace-nowrap text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 sm:px-6"
              >
                + More
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="mt-18 grid min-w-0 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {courses.slice(0, 6).map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </div>
    </section>
  )
}
