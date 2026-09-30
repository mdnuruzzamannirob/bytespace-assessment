export const categories = [
  'Featured',
  'Music',
  'Drawing & Painting',
  'Marketing',
  'Animation',
  'Social Media',
  'UI/UX Design',
  'Creative Marketing',
  'Digital Illustration',
  'Film & Video',
  'Crafts',
  'Freelance & Entrepreneurship',
  'Graphic Design',
  'Photography',
  'Productivity',
  'Web Development',
  'Data Science',
  'Cooking',
] as const

const templates = [
  {
    title: 'Learn Figma from Basic',
    image: '/assets/courses/figma-basics.jpg',
    category: 'UI/UX Design',
    description:
      'Learn the essentials of Figma and turn your ideas into polished, usable interfaces.',
  },
  {
    title: 'Build Digital Asset',
    image: '/assets/courses/digital-assets.jpg',
    category: 'Drawing & Painting',
    description:
      'Create a versatile collection of digital assets for your next creative project.',
  },
  {
    title: 'the Power of Big Data',
    image: '/assets/courses/big-data.jpg',
    category: 'Marketing',
    description:
      'Find useful stories in data and make confident decisions with practical analysis.',
  },
  {
    title: 'Balancing Productivity and Self-Care',
    image: '/assets/courses/productivity.jpg',
    category: 'Creative Marketing',
    description:
      'Build healthier routines that make room for focused work and personal wellbeing.',
  },
  {
    title: 'Mastering Money Management',
    image: '/assets/courses/money-management.jpg',
    category: 'Social Media',
    description:
      'Understand the everyday habits behind thoughtful budgeting and financial planning.',
  },
  {
    title: 'From Idea to Startup Success',
    image: '/assets/courses/startup.jpg',
    category: 'Animation',
    description:
      'Shape a promising idea, validate it with people, and plan your first launch.',
  },
] as const

const extraTitles = [
  'Music Production for Beginners',
  'The Art of Home Cooking',
  'Creative Branding Essentials',
  'Design Systems in Figma',
  'Drawing with Digital Tools',
  'Social Media Storytelling',
  'Make Your First Animation',
  'Marketing with Data',
  'Cook with Confidence',
  'Build a Better Daily Routine',
  'Illustration from Sketch to Screen',
  'Launch Your Creative Business',
] as const

const extraCategories = [
  'Music',
  'Cooking',
  'Digital Illustration',
  'Film & Video',
  'Crafts',
  'Freelance & Entrepreneurship',
  'Graphic Design',
  'Photography',
  'Productivity',
  'Web Development',
  'Data Science',
  'Marketing',
] as const

export const courses = Array.from({ length: 75 }, (_, index) => {
  const template = templates[index % templates.length]
  const extraIndex = index >= 18 ? (index - 18) % extraTitles.length : -1
  const extra = extraIndex >= 0 ? extraTitles[extraIndex] : undefined
  const category =
    extraIndex >= 0 ? extraCategories[extraIndex] : template.category

  return {
    ...template,
    id: index + 1,
    title: extra ?? template.title,
    category,
    level: index % 5 === 0 ? 'Intermediate' : 'Beginner',
    durationMinutes: [95, 136, 205][index % 3],
    lessons: [10, 17, 22][index % 3],
    comments: 59,
    rating: index < 18 ? 4.5 : Number((4.5 + (index % 5) * 0.1).toFixed(1)),
    price: [19, 25, 35, 49][index % 4],
    creator: 'purepearl studio',
  }
})

export type Course = (typeof courses)[number]
