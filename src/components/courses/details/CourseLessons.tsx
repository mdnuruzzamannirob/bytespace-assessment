import { FaCheck, FaCircle } from 'react-icons/fa6'

import type { CourseModule } from '@/lib/demo-data/course-details'
import { getProgressPercent } from '@/lib/demo-data/learning'
import { formatDuration } from '@/lib/format'

import { DetailIcon } from './DetailPrimitives'

export function CourseLessons({
  modules,
  completedLessons,
  onCompleteNext,
}: {
  modules: CourseModule[]
  completedLessons?: number
  onCompleteNext: () => void
}) {
  const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0)
  const progress = getProgressPercent(completedLessons ?? 0, totalLessons)
  return (
    <div role="tabpanel" id="panel-lessons" aria-labelledby="tab-lessons" className="mt-10">
      <h2 className="font-heading text-xl">Explore the Modules</h2>
      <p className="mt-6 max-w-181 text-base leading-relaxed text-neutral-700">
        Browse the full lesson outline and time commitment for this course.
      </p>
      <ol className="mt-6 space-y-5">
        {modules.map((module, moduleIndex) => {
          const previousLessons = modules
            .slice(0, moduleIndex)
            .reduce((sum, item) => sum + item.lessons.length, 0)
          return (
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
                <ol className="mt-3 space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const enrolled = completedLessons !== undefined
                    const completed = enrolled && previousLessons + lessonIndex < completedLessons
                    return (
                      <li
                        className="flex items-start justify-between gap-4 text-sm text-neutral-700"
                        key={`${lesson.title}-${lessonIndex}`}
                      >
                        <span className="flex items-start gap-2">
                          {enrolled &&
                            (completed ? (
                              <FaCheck aria-hidden="true" className="mt-1 shrink-0 text-lime-700" />
                            ) : (
                              <FaCircle
                                aria-hidden="true"
                                className="mt-1 shrink-0 text-[8px] text-neutral-300"
                              />
                            ))}
                          <span>
                            {lesson.title}
                            {enrolled && (
                              <span className="ml-2 text-xs text-neutral-500">
                                {completed ? 'Completed' : 'Pending'}
                              </span>
                            )}
                          </span>
                        </span>
                        <span className="shrink-0">{lesson.duration}</span>
                      </li>
                    )
                  })}
                </ol>
              </details>
            </li>
          )
        })}
      </ol>
      <section className="mt-9" aria-labelledby="lesson-progress-heading">
        <h3 id="lesson-progress-heading" className="font-heading text-xl">
          Lesson Progress Tracking
        </h3>
        <p className="mt-6 max-w-181 text-base leading-relaxed text-neutral-700">
          Witness your growth as you complete lessons, with progress tracking guiding you through
          your learning journey.
        </p>
        {completedLessons === undefined ? (
          <p className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600">
            Enroll in this course to see your learning progress.
          </p>
        ) : (
          <div>
            <div className="mt-6 rounded-2xl border border-neutral-300 bg-white p-4">
              <p className="text-sm font-medium">Learning Progress</p>
              <strong className="font-heading mt-1 block text-4xl">{progress}%</strong>
              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-200"
                role="progressbar"
                aria-label="Course progress"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-lime-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p className="text-sm text-neutral-600">
                {completedLessons} of {totalLessons} lessons completed
              </p>
              <button
                type="button"
                disabled={completedLessons >= totalLessons}
                onClick={onCompleteNext}
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaCheck aria-hidden="true" />
                {completedLessons >= totalLessons ? 'Course completed' : 'Complete next lesson'}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
