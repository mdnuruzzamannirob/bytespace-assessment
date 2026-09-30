export type DemoEnrollment = { courseId: number; completedLessons: number }

export function getProgressPercent(completedLessons: number, totalLessons: number) {
  return Math.round((completedLessons / totalLessons) * 100)
}
