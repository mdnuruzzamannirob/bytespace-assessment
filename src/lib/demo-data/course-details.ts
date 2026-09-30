import { formatDuration } from '@/lib/format'

import { courseOutlines } from './course-outlines'
import type { Course } from './courses'

export type CourseLesson = { title: string; durationMinutes: number; duration: string }
export type CourseModule = {
  title: string
  description: string
  durationMinutes: number
  lessons: CourseLesson[]
}

export const includedItems = [
  { icon: 'resource.svg', label: 'Full Lesson Outline' },
  { icon: 'video.svg', label: 'Guided Practice' },
  { icon: 'certificate.svg', label: 'Self-Paced Learning' },
  { icon: 'consultation.svg', label: 'Creator Information' },
] as const

export function getCourseDetails(course: Course) {
  const outline = courseOutlines[course.id - 1]
  if (!outline) throw new Error(`Missing curriculum for course ${course.id}`)
  const lessonTemplates = [
    (topic: string) => `Introduction to ${topic}`,
    (topic: string) => `${topic}: key ideas`,
    (topic: string) => `Guided practice: ${topic}`,
    (topic: string) => `Applying ${topic}`,
    (topic: string) => `Common mistakes in ${topic}`,
    (topic: string) => `Project checkpoint: ${topic}`,
  ]
  let lessonIndex = 0
  const modules: CourseModule[] = outline.map((topic, moduleIndex) => {
    const count =
      Math.floor(course.lessons / outline.length) +
      (moduleIndex < course.lessons % outline.length ? 1 : 0)
    const lessons = Array.from({ length: count }, (_, index): CourseLesson => {
      const durationMinutes =
        Math.floor(course.durationMinutes / course.lessons) +
        (lessonIndex++ < course.durationMinutes % course.lessons ? 1 : 0)
      return {
        title: lessonTemplates[index % lessonTemplates.length](topic),
        durationMinutes,
        duration: formatDuration(durationMinutes),
      }
    })
    return {
      title: `Module ${moduleIndex + 1}: ${topic}`,
      description: `Learn ${topic.toLowerCase()} through examples and guided practice.`,
      durationMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0),
      lessons,
    }
  })
  const lessonsList = modules.flatMap((module) => module.lessons)
  return {
    subtitle: course.description,
    lessons: lessonsList.length,
    duration: formatDuration(lessonsList.reduce((sum, lesson) => sum + lesson.durationMinutes, 0)),
    students: `${course.enrollments.toLocaleString()} Students`,
    rating: `${course.rating.toFixed(1)} (${course.reviewCount} reviews)`,
    description: [
      course.description,
      `The course moves from ${outline[0].toLowerCase()} through ${outline[1].toLowerCase()} and ${outline[2].toLowerCase()}, with practical exercises at each stage.`,
      `Finish by working on ${outline[3].toLowerCase()} and applying the techniques to a project of your own.`,
    ],
    keyPoints: [...outline],
    previewImages:
      course.id === 2
        ? [
            '/assets/course-details/sneak-1.jpg',
            '/assets/course-details/sneak-2.jpg',
            '/assets/course-details/sneak-3.jpg',
            '/assets/course-details/sneak-4.jpg',
          ]
        : [course.image],
    lessonsList,
    modules,
  }
}
