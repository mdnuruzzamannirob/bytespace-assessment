import type { CourseModule } from '@/lib/demo-data/course-details'

import { DetailIcon } from './DetailPrimitives'

export function CourseLessons({ modules }: { modules: CourseModule[] }) {
  return (
    <div role="tabpanel" id="panel-lessons" aria-labelledby="tab-lessons" className="mt-10">
      <h2 className="font-heading text-xl">Explore the Modules</h2>
      <p className="mt-6 max-w-181 text-base leading-relaxed text-neutral-700">
        Immerse yourself in course content through practical insights and hands-on experiences.
      </p>
      <ol className="mt-6 space-y-5">
        {modules.map((module) => (
          <li className="flex items-start gap-3" key={module.title}>
            <span className="rounded-card flex size-18 shrink-0 items-center justify-center bg-lime-400">
              <DetailIcon name="module-video.svg" size={40} />
            </span>
            <div className="pt-1">
              <h3 className="font-medium text-neutral-950">{module.title}</h3>
              <p className="mt-1 text-base leading-relaxed text-neutral-700">
                {module.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <h3 className="font-heading mt-7 text-xl">Lesson Progress Tracking</h3>
      <p className="mt-6 text-base leading-relaxed text-neutral-700">
        Witness your growth as you complete lessons, with progress tracking guiding you through your
        learning journey.
      </p>
      <section
        className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4"
        aria-label="Learning progress"
      >
        <p className="text-sm font-medium">Learning Progress</p>
        <p className="font-heading text-heading-s mt-1">55%</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100">
          <div className="h-full w-[55%] rounded-full bg-lime-400" />
        </div>
      </section>
    </div>
  )
}
