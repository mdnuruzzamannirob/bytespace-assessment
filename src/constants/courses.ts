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
] as const

const templates = [
  {
    title: 'Learn Figma from Basic',
    image: '/assets/courses/figma-basics.jpg',
    category: 'UI/UX Design',
  },
  {
    title: 'Build Digital Asset',
    image: '/assets/courses/digital-assets.jpg',
    category: 'Drawing & Painting',
  },
  {
    title: 'the Power of Big Data',
    image: '/assets/courses/big-data.jpg',
    category: 'Marketing',
  },
  {
    title: 'Balancing Productivity and Self-Care',
    image: '/assets/courses/productivity.jpg',
    category: 'Creative Marketing',
  },
  {
    title: 'Mastering Money Management',
    image: '/assets/courses/money-management.jpg',
    category: 'Social Media',
  },
  {
    title: 'From Idea to Startup Success',
    image: '/assets/courses/startup.jpg',
    category: 'Animation',
  },
] as const

export const courses = Array.from({ length: 90 }, (_, index) => ({
  ...templates[index % templates.length],
  id: index + 1,
  level: index % 5 === 0 ? 'Intermediate' : 'Beginner',
}))

export type Course = (typeof courses)[number]
