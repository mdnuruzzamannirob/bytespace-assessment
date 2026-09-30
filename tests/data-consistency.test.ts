import { describe, expect, it } from 'vitest'

import {
  courses,
  creators,
  getCoursesByCreator,
  getCreatorStats,
  platformStats,
} from '@/lib/catalog'
import { getCourseDetails } from '@/lib/demo-data/course-details'
import { courseOutlines } from '@/lib/demo-data/course-outlines'
import { getCourseReviewData } from '@/lib/demo-data/course-reviews'
import { testimonials } from '@/lib/constants/home'

describe('course content consistency', () => {
  it('provides a course-specific outline, complete lessons, and exact durations for every course', () => {
    expect(courseOutlines).toHaveLength(courses.length)
    for (const course of courses) {
      const detail = getCourseDetails(course)
      const lessons = detail.modules.flatMap((module) => module.lessons)
      expect(lessons, course.title).toHaveLength(course.lessons)
      expect(
        lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0),
        course.title,
      ).toBe(course.durationMinutes)
      expect(detail.lessonsList).toEqual(lessons)
      expect(detail.rating).toContain(`${course.rating.toFixed(1)} (${course.reviewCount} reviews)`)
      expect(detail.students).toContain(course.enrollments.toLocaleString())
      expect(detail.previewImages.every((path) => path.startsWith('/assets/'))).toBe(true)
    }
  })

  it('keeps review totals and weighted ratings aligned with catalog cards', () => {
    for (const course of courses) {
      const { reviews, ratingDistribution, totalReviews } = getCourseReviewData(course)
      expect(reviews.length, course.title).toBeGreaterThanOrEqual(4)
      expect(reviews.length, course.title).toBeLessThanOrEqual(5)
      expect(new Set(reviews.map((review) => review.copy)).size).toBe(reviews.length)
      expect(totalReviews).toBe(course.reviewCount)
      expect(ratingDistribution.reduce((sum, item) => sum + item.count, 0)).toBe(totalReviews)
      const average =
        ratingDistribution.reduce((sum, item) => sum + item.rating * item.count, 0) / totalReviews
      expect(Number(average.toFixed(1)), course.title).toBe(course.rating)
      for (const item of ratingDistribution.filter((entry) => entry.count > 0)) {
        expect(
          reviews.some((review) => review.rating === item.rating),
          course.title,
        ).toBe(true)
      }
    }
    expect(getCourseReviewData(courses[0]).reviews[0].copy).not.toBe(
      getCourseReviewData(courses[1]).reviews[0].copy,
    )
  })
})

describe('creator and platform metrics', () => {
  it('derives each creator product count and local follower change from the same data', () => {
    for (const creator of creators) {
      expect(getCreatorStats(creator).products).toBe(getCoursesByCreator(creator.slug).length)
      expect(getCreatorStats(creator, [creator.slug]).followers).toBe(creator.followers + 1)
    }
  })

  it('derives site totals while preserving the three homepage testimonials', () => {
    expect(platformStats.courses).toBe(courses.length)
    expect(platformStats.creators).toBe(creators.length)
    expect(platformStats.enrollments).toBe(
      courses.reduce((sum, course) => sum + course.enrollments, 0),
    )
    expect(platformStats.reviews).toBe(courses.reduce((sum, course) => sum + course.reviewCount, 0))
    expect(testimonials).toHaveLength(3)
  })
})

describe('demo learning progress', () => {
  it('computes progress from actual completed and total lessons', async () => {
    const { getProgressPercent } = await import('@/lib/demo-data/learning')
    expect(getProgressPercent(0, courses[0].lessons)).toBe(0)
    expect(getProgressPercent(courses[0].lessons, courses[0].lessons)).toBe(100)
    expect(getProgressPercent(3, courses[0].lessons)).toBe(30)
  })
})
