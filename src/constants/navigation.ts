export const headerNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Creators', href: '/creators' },
] as const

export const headerAccountLinks = [
  { label: 'Sign In', href: '/login' },
  { label: 'Join Us', href: '/signup' },
] as const

export const shoppingBagHref = '/cart'

export const footerColumns = [
  [
    { label: 'Featured Courses', href: '/courses' },
    { label: 'Featured Categories', href: '/courses' },
    { label: 'Business', href: '/courses?category=business' },
    { label: 'IT', href: '/courses?category=it' },
    { label: 'Design', href: '/courses?category=design' },
  ],
  [
    { label: 'Development', href: '/courses?category=development' },
    { label: 'Marketing', href: '/courses?category=marketing' },
    { label: 'Photography', href: '/courses?category=photography' },
    { label: 'Finance', href: '/courses?category=finance' },
    { label: 'Sport', href: '/courses?category=sport' },
  ],
  [
    { label: 'Become a Creator', href: '/creators' },
    { label: 'Affiliate Program', href: '/affiliate-program' },
    { label: 'Contact', href: '/contact' },
    { label: 'Help', href: '/help' },
    { label: 'About', href: '/about' },
  ],
] as const

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookies Settings', href: '/cookies-settings' },
] as const
