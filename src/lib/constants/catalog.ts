export const categories = [
  'Featured',
  'Design',
  'Development',
  'IT & Software',
  'Business',
  'Marketing',
  'Photography',
  'Music',
  'Animation',
  'Cooking',
] as const

export const levels = ['All levels', 'Beginner', 'Intermediate'] as const
export const sortOptions = [
  'Most relevant',
  'Title A–Z',
  'Title Z–A',
  'Highest rated',
] as const
export type DurationFilter = 'any' | 'under2' | 'twoToThree' | 'threePlus'
