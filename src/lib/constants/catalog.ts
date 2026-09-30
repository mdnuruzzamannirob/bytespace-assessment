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
export const sortOptions = [
  'Most relevant',
  'Title A–Z',
  'Title Z–A',
  'Highest rated',
] as const
export type DurationFilter = 'any' | 'under2' | 'twoToThree' | 'threePlus'
