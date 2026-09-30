export type CourseLesson = { title: string; duration: string }
export type CourseModule = { title: string; description: string }
export type CourseReview = {
  name: string
  role: string
  image: string
  rating: number
  copy: string
}

export const includedItems = [
  { icon: 'resource.svg', label: 'Learning Resources' },
  { icon: 'video.svg', label: 'Quality Lesson Videos' },
  { icon: 'certificate.svg', label: 'Certificate of Completion' },
  { icon: 'consultation.svg', label: 'Private Consultation' },
] as const

const defaultModules: CourseModule[] = [
  {
    title: 'Module 1: Getting Started',
    description:
      'Lay the groundwork with essential concepts, tools, and a clear path through the course.',
  },
  {
    title: 'Module 2: Core Principles',
    description:
      'Master the principles that make practical work clearer, more useful, and easier to improve.',
  },
  {
    title: 'Module 3: Hands-on Practice',
    description:
      'Apply each idea through guided exercises and a project that grows with your confidence.',
  },
  {
    title: 'Module 4: Sharing Your Work',
    description:
      'Polish your work, respond to feedback, and communicate your decisions with confidence.',
  },
]

const digitalAssetDetails = {
  subtitle: 'Unlock the Power of Digital Creation with Expert Guidance',
  lessons: 22,
  duration: '3 hours 25 mins',
  students: '199 Students',
  rating: '4.8 (44 ratings)',
  description: [
    'Embark on an enlightening exploration into the world of digital creation with this comprehensive course. Build a practical understanding of the techniques behind impactful digital content.',
    'Start with foundational concepts, then explore design principles, visual communication, and hands-on exercises that make each lesson immediately useful.',
    'By the end, you will have a polished project and a repeatable process for creating digital assets across different platforms.',
  ],
  keyPoints: [
    'Foundational Concepts',
    'Design Principles Mastery',
    'Advanced Techniques in Digital Creation',
    'Project Showcase and Critique',
    'Optimizing for Various Platforms',
    'Digital Asset Management Best Practices',
    'Monetization Strategies',
    'Capstone Project: Building Your Portfolio',
  ],
  lessonsList: [
    { title: 'Introduction to Digital Assets', duration: '12 mins' },
    { title: 'Design Principles for Impact', duration: '21 mins' },
    { title: 'Advanced Techniques in Digital Creation', duration: '16 mins' },
  ],
  modules: [
    {
      title: 'Module 1: Introduction to Digital Assets',
      description:
        'Lay the groundwork with lessons like Understanding Digital Elements and Navigating Design Software Tools.',
    },
    {
      title: 'Module 2: Design Principles for Impact',
      description:
        'Master color theory, typography, and layout strategies that elevate digital communication.',
    },
    {
      title: 'Module 3: User-Centric Design Strategies',
      description:
        'Understand design thinking and UX essentials while keeping the learner at the center.',
    },
    {
      title: 'Module 4: Interactive Media and Engagement',
      description:
        'Create immersive digital experiences with interactive presentations and multimedia.',
    },
  ],
}

export function getCourseDetails(course: {
  id: number
  title: string
  description: string
  lessons: number
  durationMinutes: number
  rating: number
  comments: number
}) {
  if (course.id === 2) return digitalAssetDetails
  return {
    subtitle: course.description,
    lessons: course.lessons,
    duration: `${Math.floor(course.durationMinutes / 60)} hours ${course.durationMinutes % 60} mins`,
    students: '26+ Students',
    rating: `${course.rating} (${course.comments} ratings)`,
    description: [
      course.description,
      'Start with the essential ideas, then apply each lesson through practical exercises. The course is designed to help you build confidence at your own pace.',
      'By the end, you will have a clearer process and a project that demonstrates what you have learned.',
    ],
    keyPoints: [
      'Foundational Concepts',
      'Practical Techniques',
      'Hands-On Exercises',
      'Final Project',
      'Continuing Your Learning',
    ],
    lessonsList: [
      { title: `Introduction to ${course.title}`, duration: '12 mins' },
      { title: 'Core ideas and techniques', duration: '21 mins' },
      { title: 'Your practical project', duration: '16 mins' },
    ],
    modules: defaultModules.map((module, index) =>
      index === 0 ? { ...module, title: `Module 1: Introduction to ${course.title}` } : module,
    ),
  }
}

export const reviews: CourseReview[] = [
  {
    name: 'PurePearl Studio',
    role: 'UI/UX Designer',
    image: 'reviewer-1.png',
    rating: 5,
    copy: 'The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended.',
  },
  {
    name: 'Albert Flores',
    role: 'UI/UX Designer',
    image: 'reviewer-2.png',
    rating: 5,
    copy: 'This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience.',
  },
  {
    name: 'Cody Fisher',
    role: 'UI/UX Designer',
    image: 'reviewer-3.png',
    rating: 5,
    copy: 'The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills.',
  },
  {
    name: 'Brooklyn Simmons',
    role: 'UI/UX Designer',
    image: 'reviewer-4.png',
    rating: 5,
    copy: 'The lessons on optimizing digital assets for various platforms were particularly insightful and kept me motivated throughout.',
  },
]

// Only the featured digital assets course has written sample reviews.
export function getCourseReviewData(course: { id: number }) {
  const courseReviews = course.id === 2 ? reviews : []
  const counts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: courseReviews.filter((review) => review.rating === rating).length,
  }))
  const total = courseReviews.length
  return {
    reviews: courseReviews,
    ratingDistribution: counts.map((item) => ({
      ...item,
      percentage: total ? (item.count / total) * 100 : 0,
    })),
  }
}
