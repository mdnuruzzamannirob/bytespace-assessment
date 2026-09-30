export type DemoEnrollment = { courseId: number; completedLessons: number }

export const featuredDemoEnrollments: DemoEnrollment[] = [
  { courseId: 1, completedLessons: 3 },
  { courseId: 2, completedLessons: 12 },
  { courseId: 9, completedLessons: 5 },
  { courseId: 25, completedLessons: 4 },
  { courseId: 35, completedLessons: 7 },
]

export function getProgressPercent(completedLessons: number, totalLessons: number) {
  return Math.round((completedLessons / totalLessons) * 100)
}
