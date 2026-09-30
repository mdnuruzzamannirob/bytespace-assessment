import type { Metadata } from 'next'

import { CreatorsBrowser } from '@/components/creators/CreatorsBrowser'

export const metadata: Metadata = {
  title: 'Creators | ByteSpace',
  description: 'Meet the experts sharing practical courses on ByteSpace.',
}

export default function CreatorsPage() {
  return <CreatorsBrowser />
}
