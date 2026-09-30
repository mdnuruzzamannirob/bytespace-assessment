import { courses } from '@/lib/demo-data/courses'
import { creators } from '@/lib/demo-data/creators'
import { categories as courseTopics } from './catalog'

export { courseTopics }

export const courseTopicRows = [
  courseTopics.slice(0, 8),
  courseTopics.slice(8, 14),
  courseTopics.slice(14),
]

export const learningPaths = [
  { label: 'Design', icon: '/assets/home/categories/design-tools-icon.png' },
  { label: 'Development', icon: '/assets/home/categories/coding-device-icon.png' },
  { label: 'IT & Software', icon: '/assets/home/categories/laptop-icon.png' },
  { label: 'Business', icon: '/assets/home/categories/buildings-icon.png' },
  { label: 'Marketing', icon: '/assets/home/categories/connected-people-icon.png' },
  { label: 'Photography', icon: '/assets/home/categories/id-badge-icon.png' },
] as const

export const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Enthusiastic Learner',
    avatar: '/assets/home/people/learner-yellow-background.png',
    quote:
      'ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.',
  },
  {
    name: 'James L.',
    role: 'Lifelong Learner',
    avatar: '/assets/home/people/student-with-glasses.png',
    quote:
      'I’ve tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.',
  },
  {
    name: 'Alex B.',
    role: 'Inspired Creator',
    avatar: '/assets/home/people/learner-blue-shirt.png',
    quote:
      'As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It’s fulfilling to see my courses making a positive impact on learners globally.',
  },
] as const

export const partnerLogos = ['wave', 'sunburst', 'compass', 'flower', 'rings'] as const
export const studentAvatars = [
  'home/people/student-at-table.png',
  'home/people/learner-pink-background.png',
  'home/people/student-pink-shirt.png',
  'home/people/student-with-camera.png',
  'home/people/student-with-hat.png',
  'home/people/student-with-glasses.png',
  'home/people/student-outdoors.png',
] as const
export const growthStats = [
  { value: '12K', label: 'Students' },
  { value: String(courses.length), label: 'Courses' },
  { value: String(creators.length), label: 'Creators' },
] as const
export const creatorBenefits = [
  'Share Your Expertise',
  'Monetize Your Passion',
  'Flexibility and Autonomy',
  'Build a Community',
] as const
