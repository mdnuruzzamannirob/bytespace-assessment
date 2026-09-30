'use client'

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import { courses } from '@/lib/catalog'
import { featuredDemoEnrollments, type DemoEnrollment } from '@/lib/demo-data/learning'

type Enrollment = DemoEnrollment
type LearningContextValue = {
  enrollments: Enrollment[]
  enroll: (courseId: number) => void
  markLessonComplete: (courseId: number, lessonIndex: number) => void
}

const storageKey = 'bytespace.demo.enrollments.v3'
const LearningContext = createContext<LearningContextValue | null>(null)

export function sanitizeEnrollments(value: unknown): Enrollment[] {
  if (!Array.isArray(value)) return featuredDemoEnrollments
  const seen = new Set<number>()
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const { courseId, completedLessons } = item as Partial<Enrollment>
    const course = courses.find((entry) => entry.id === courseId)
    if (!course || seen.has(course.id) || !Number.isInteger(completedLessons)) return []
    seen.add(course.id)
    return [
      {
        courseId: course.id,
        completedLessons: Math.max(0, Math.min(completedLessons!, course.lessons)),
      },
    ]
  })
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(featuredDemoEnrollments)

  useEffect(() => {
    let restored: Enrollment[] = featuredDemoEnrollments
    try {
      const saved = window.localStorage.getItem(storageKey)
      if (saved) restored = sanitizeEnrollments(JSON.parse(saved))
    } catch {
      // Keep the featured demo enrollments when browser storage is unavailable.
    }
    startTransition(() => setEnrollments(restored))
  }, [])

  function update(next: Enrollment[]) {
    setEnrollments(next)
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next))
    } catch {
      // The in-memory demo still works when storage is unavailable.
    }
  }

  function enroll(courseId: number) {
    if (
      !courses.some((course) => course.id === courseId) ||
      enrollments.some((item) => item.courseId === courseId)
    )
      return
    update([...enrollments, { courseId, completedLessons: 0 }])
  }

  function markLessonComplete(courseId: number, lessonIndex: number) {
    const course = courses.find((item) => item.id === courseId)
    if (!course || lessonIndex < 0 || lessonIndex >= course.lessons) return
    update(
      enrollments.map((item) =>
        item.courseId === courseId
          ? { ...item, completedLessons: Math.max(item.completedLessons, lessonIndex + 1) }
          : item,
      ),
    )
  }

  return (
    <LearningContext.Provider value={{ enrollments, enroll, markLessonComplete }}>
      {children}
    </LearningContext.Provider>
  )
}

export function useLearning() {
  const context = useContext(LearningContext)
  if (!context) throw new Error('useLearning must be used within LearningProvider')
  return context
}
