export const courseTopics = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Digital Illustration",
  "Film & Video",
  "Crafts",
  "Freelance & Entrepreneurship",
  "Graphic Design",
  "Photography",
  "Productivity",
  "Web Development",
  "Data Science",
  "Cooking",
];

export const courseTopicRows = [
  courseTopics.slice(0, 8),
  courseTopics.slice(8, 14),
  courseTopics.slice(14),
];

export const featuredCourses = [
  {
    title: "Learn Figma from Basic",
    image: "/assets/course-digital-products-icons.png",
  },
  {
    title: "Build Digital Asset",
    image: "/assets/course-digital-products-icons.png",
  },
  {
    title: "the Power of Big Data",
    image: "/assets/course-big-data-dashboard.png",
  },
  {
    title: "Balancing Productivity and Self-Care",
    image: "/assets/course-big-data-dashboard.png",
  },
  {
    title: "Mastering Money Management",
    image: "/assets/course-big-data-dashboard.png",
  },
  {
    title: "From Idea to Startup Success",
    image: "/assets/course-digital-products-icons.png",
  },
] as const;

export const learningPaths = [
  { label: "Design", icon: "/assets/design-tools-icon.png" },
  { label: "Development", icon: "/assets/coding-device-icon.png" },
  { label: "IT & Software", icon: "/assets/laptop-icon.png" },
  { label: "Business", icon: "/assets/buildings-icon.png" },
  { label: "Marketing", icon: "/assets/connected-people-icon.png" },
  { label: "Photography", icon: "/assets/id-badge-icon.png" },
] as const;

export const testimonials = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: "/assets/learner-yellow-background.png",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    avatar: "/assets/student-with-glasses.png",
    quote:
      "I’ve tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: "/assets/learner-blue-shirt.png",
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It’s fulfilling to see my courses making a positive impact on learners globally.",
  },
] as const;

export const partnerLogos = [
  "wave",
  "sunburst",
  "compass",
  "flower",
  "rings",
] as const;

export const studentAvatars = [
  "student-at-table.png",
  "learner-pink-background.png",
  "student-pink-shirt.png",
  "student-with-camera.png",
  "student-with-hat.png",
  "student-with-glasses.png",
  "student-outdoors.png",
] as const;

export const growthStats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
] as const;

export const creatorBenefits = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
] as const;
