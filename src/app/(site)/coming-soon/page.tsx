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
    <main className="text-primary-foreground min-h-screen bg-blue-800 lg:min-h-240">
      <section
        className="flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-primary-foreground)_12%,transparent)_2px,transparent_2px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-primary-foreground)_12%,transparent)_2px,transparent_2px)] bg-size-[120px_120px] bg-position-[0_0,0_118px] max-md:bg-size-[80px_80px] max-md:bg-position-[0_0,0_78px] lg:min-h-240"
        aria-labelledby="coming-soon-title"
      >
        <div className="max-w-site flex w-full flex-col items-center px-6 py-6 text-center max-md:px-5 max-sm:py-4 lg:translate-y-4">
          <p
            className="font-heading mb-[-0.25em] bg-linear-to-b/srgb from-lime-400 from-15% via-lime-400/78 via-55% to-lime-400/12 to-100% bg-clip-text text-[clamp(12rem,min(33.333vw,50vh),30rem)] leading-none font-semibold tracking-[-0.01em] text-transparent max-md:text-[clamp(9rem,min(40vw,32vh),20rem)]"
            aria-label="Coming soon"
          >
            SOON
          </p>
          <h1
            className="font-heading text-heading-l w-full max-w-233.75 max-md:text-[clamp(1.125rem,6vw,2.75rem)]"
            id="coming-soon-title"
          >
            <span className="block whitespace-nowrap">{title}</span>
            <span className="block whitespace-nowrap">is coming soon</span>
          </h1>
          <p className="text-body-l max-md:text-body-m my-8 text-neutral-100 max-md:my-6 max-md:max-w-md">
            This area is not part of the current learning flow yet. Keep exploring the courses and
            creators already available.
          </p>
          <ButtonLink href="/courses">Browse Courses</ButtonLink>
        </div>
      </section>
    </main>
  )
}
