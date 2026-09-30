export const creators = [
  {
    slug: 'purepearl-studio',
    name: 'PurePearl Studio',
    tagline: 'Passionate UI/UX, Web designer',
    bio: "Welcome to the creative world of PurePearl Studio. Discover the passion, expertise, and inspiration behind every project—then explore practical courses that turn creative ideas into polished work.",
    avatar: '/assets/creators/purepearl-studio.png',
    productCount: 3,
    followers: 12,
  },
] as const

export type Creator = (typeof creators)[number]
