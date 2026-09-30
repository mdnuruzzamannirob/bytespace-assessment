import { courseOutlines } from './course-outlines'
import type { Course } from './courses'

export type CourseReview = {
  id: string
  name: string
  role: string
  image: string
  date: string
  rating: number
  copy: string
}

const reviewers = [
  {
    name: 'Nadia Rahman',
    image: '/assets/course-details/reviewer-1.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Albert Flores',
    image: '/assets/course-details/reviewer-2.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Cody Fisher',
    image: '/assets/course-details/reviewer-3.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Brooklyn Simmons',
    image: '/assets/course-details/reviewer-4.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Maya Patel',
    image: '/assets/home/people/learner-yellow-background.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Daniel Kim',
    image: '/assets/home/people/student-with-glasses.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Aisha Morgan',
    image: '/assets/home/people/learner-blue-shirt.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Jordan Lee',
    image: '/assets/home/people/student-with-camera.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Sara Chen',
    image: '/assets/home/people/student-at-table.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Leo Brooks',
    image: '/assets/home/people/student-with-hat.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Amira Noor',
    image: '/assets/home/people/learner-pink-background.png',
    role: 'ByteSpace Learner',
  },
  {
    name: 'Ethan Park',
    image: '/assets/home/people/student-outdoors.png',
    role: 'ByteSpace Learner',
  },
] as const

// These are illustrative demo reviews, not claims from verified learners.
export function getCourseReviewData(course: Course) {
  const outline = courseOutlines[course.id - 1]
  if (!outline) throw new Error(`Missing review outline for course ${course.id}`)
  const [foundation, practice, application, project] = outline

  // Allocate the recorded rating total across five stars. The rounded weighted
  // average always matches the catalog's one-decimal rating.
  const deficit = Math.round((5 - course.rating) * course.reviewCount)
  const oneStar = deficit >= 18 ? 1 : 0
  const twoStar = deficit >= 10 ? 1 : 0
  const threeStar = deficit >= 6 ? 1 : 0
  const fourStar = deficit - oneStar * 4 - twoStar * 3 - threeStar * 2
  const fiveStar = course.reviewCount - oneStar - twoStar - threeStar - fourStar
  const ratingDistribution = [fiveStar, fourStar, threeStar, twoStar, oneStar].map(
    (count, index) => ({
      rating: 5 - index,
      count,
      percentage: (count / course.reviewCount) * 100,
    }),
  )

  const ratings = ratingDistribution.filter((item) => item.count > 0).map((item) => item.rating)
  while (ratings.length < 4) ratings.splice(1, 0, 5)
  const dates = ['2 weeks ago', '1 month ago', '2 months ago', '3 months ago', '4 months ago']
  const reviews: CourseReview[] = ratings.map((rating, index) => {
    const focus = [foundation, practice, application, project][index % outline.length].toLowerCase()
    const copy =
      rating === 5
        ? `The section on ${focus} gave me a much clearer starting point. I could apply it to my own work without guessing at the next step.`
        : rating === 4
          ? `I liked the examples around ${focus}, although I wanted one more guided exercise. The material was still useful for my own project.`
          : rating === 3
            ? `The topic of ${focus} was relevant, but some steps moved too quickly for me. A slower walkthrough would make the course easier to follow.`
            : rating === 2
              ? `I struggled to put ${focus} into practice from the examples provided. More worked examples would have helped me finish the exercise.`
              : `The explanation of ${focus} did not give me enough guidance at my level. I needed clearer steps before attempting the project.`
    return {
      id: `${course.id}-${rating}-${index}`,
      ...reviewers[(course.id + index - 1) % reviewers.length],
      date: dates[index],
      rating,
      copy,
    }
  })

  return { reviews, ratingDistribution, totalReviews: course.reviewCount }
}
