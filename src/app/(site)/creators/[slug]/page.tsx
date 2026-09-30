import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CreatorProfile } from '@/components/creators/CreatorProfile'
import { creators } from '@/constants/creators'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return creators.map((creator) => ({ slug: creator.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const creator = creators.find((item) => item.slug === slug)
  return {
    title: creator ? `${creator.name} | ByteSpace` : 'Creator not found | ByteSpace',
    description: creator?.tagline,
  }
}

export default async function CreatorProfilePage({ params }: Props) {
  const { slug } = await params
  const creator = creators.find((item) => item.slug === slug)
  if (!creator) notFound()
  return <CreatorProfile creator={creator} />
}
