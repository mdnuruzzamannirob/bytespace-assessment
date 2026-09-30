export const categories = [
  'Featured',
  'Music',
  'Drawing & Painting',
  'Marketing',
  'Animation',
  'Social Media',
  'UI/UX Design',
  'Creative Marketing',
  'Cooking',
  'Design',
  'Development',
  'IT & Software',
  'Business',
  'Photography',
] as const

export const levels = ['All levels', 'Beginner', 'Intermediate'] as const
export const sortOptions = ['Most relevant', 'Title A–Z', 'Title Z–A', 'Highest rated'] as const
export type DurationFilter = 'any' | 'under2' | 'twoToThree' | 'threePlus'
export type CourseScope = 'Courses' | 'Categories'
export type CourseCategory = (typeof categories)[number]
export type CourseLevel = (typeof levels)[number]
export type CourseSort = (typeof sortOptions)[number]
