export const headerNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Creators', href: '/creators' },
] as const

export const headerAccountLinks = [
  { label: 'Sign In', href: '/login' },
  { label: 'Join Us', href: '/signup' },
] as const
export const shoppingBagHref = '/coming-soon?feature=Shopping%20bag'

export const footerColumns = [
  [
    { label: 'Featured Courses', href: '/courses' },
    { label: 'Featured Categories', href: '/courses' },
    { label: 'Business', href: '/courses?category=Business' },
    { label: 'IT & Software', href: '/courses?category=IT%20%26%20Software' },
    { label: 'Design', href: '/courses?category=Design' },
  ],
  [
    { label: 'Development', href: '/courses?category=Development' },
    { label: 'Marketing', href: '/courses?category=Marketing' },
    { label: 'Photography', href: '/courses?category=Photography' },
    { label: 'Music', href: '/courses?category=Music' },
    { label: 'Cooking', href: '/courses?category=Cooking' },
  ],
  [
    { label: 'Become a Creator', href: '/creators' },
    {
      label: 'Affiliate Program',
      href: '/coming-soon?feature=Affiliate%20program',
    },
    { label: 'Contact', href: '/coming-soon?feature=Contact' },
    { label: 'Help', href: '/coming-soon?feature=Help' },
    { label: 'About', href: '/coming-soon?feature=About' },
  ],
] as const

export const legalLinks = [
  { label: 'Privacy Policy', href: '/coming-soon?feature=Privacy%20policy' },
  {
    label: 'Terms of Service',
    href: '/coming-soon?feature=Terms%20of%20service',
  },
  {
    label: 'Cookies Settings',
    href: '/coming-soon?feature=Cookies%20settings',
  },
] as const
