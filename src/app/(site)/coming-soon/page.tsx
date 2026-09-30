import type { Metadata } from 'next'

import { ButtonLink } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Coming Soon | ByteSpace',
  description: 'This ByteSpace demo area is being prepared.',
}

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ feature?: string }>
}) {
  const { feature } = await searchParams
  const title = feature || 'This feature'

  return (
    <main className="flex min-h-[70svh] items-center justify-center px-5 py-28 text-center">
      <section className="max-w-145">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-blue-700">
          ByteSpace demo
        </p>
        <h1 className="mt-4 font-heading text-heading-m">
          {title} is coming soon
        </h1>
        <p className="mt-5 text-body-l text-neutral-600">
          This area is not part of the current learning flow yet, but the link
          is ready for a future release.
        </p>
        <ButtonLink href="/courses" className="mt-8">
          Browse courses
        </ButtonLink>
      </section>
    </main>
  )
}
