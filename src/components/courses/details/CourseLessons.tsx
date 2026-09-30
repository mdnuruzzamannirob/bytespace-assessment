import type { CourseModule } from '@/lib/demo-data/course-details'
import { formatDuration } from '@/lib/format'

import { DetailIcon } from './DetailPrimitives'

export function CourseLessons({ modules }: { modules: CourseModule[] }) {
  return (
    <div role="tabpanel" id="panel-lessons" aria-labelledby="tab-lessons" className="mt-10">
      <h2 className="font-heading text-xl">Explore the Modules</h2>
      <p className="mt-6 max-w-181 text-base leading-relaxed text-neutral-700">
        Browse the full lesson outline and time commitment for this course.
      </p>
      <ol className="mt-6 space-y-5">
        {modules.map((module) => (
          <li className="rounded-2xl border border-neutral-200 p-4 sm:p-5" key={module.title}>
            <div className="flex items-start gap-3">
              <span className="rounded-card flex size-18 shrink-0 items-center justify-center bg-lime-400">
                <DetailIcon name="module-video.svg" size={40} />
              </span>
              <div className="min-w-0 pt-1">
                <h3 className="font-medium text-neutral-950">{module.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-neutral-700">
                  {module.description}
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  {module.lessons.length} lessons · {formatDuration(module.durationMinutes)}
                </p>
              </div>
            </div>
            <details className="mt-4 border-t border-neutral-100 pt-4">
              <summary className="cursor-pointer text-sm font-medium text-blue-700">
                View lessons
              </summary>
              <ol className="mt-3 space-y-2 pl-5">
                {module.lessons.map((lesson) => (
                  <li
                    className="flex justify-between gap-4 text-sm text-neutral-700"
                    key={lesson.title}
                  >
                    <span>{lesson.title}</span>
                    <span className="shrink-0">{lesson.duration}</span>
                  </li>
                ))}
              </ol>
            </details>
          </li>
        ))}
      </ol>
      <h3 className="font-heading mt-7 text-xl">Learning Progress</h3>
      <p className="mt-3 text-base leading-relaxed text-neutral-700">
        Progress tracking becomes available after enrollment.
      </p>
    </div>
  )
}
