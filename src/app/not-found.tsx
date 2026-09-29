import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-blue-800 text-primary-foreground">
      <section
        className="flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-primary-foreground)_12%,transparent)_2px,transparent_2px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-primary-foreground)_12%,transparent)_2px,transparent_2px)] bg-size-[120px_120px] bg-position-[0_0,0_118px] max-md:bg-size-[80px_80px] max-md:bg-position-[0_0,0_78px]"
        aria-labelledby="not-found-title"
      >
        <div className="flex w-full max-w-site flex-col items-center px-6 py-6 text-center max-md:px-5 max-sm:py-4">
          <p
            className="mb-[-0.25em] bg-linear-to-b/srgb from-lime-400 from-15% via-lime-400/78 via-55% to-lime-400/12 to-100% bg-clip-text font-heading text-[clamp(12rem,min(33.333vw,50vh),30rem)] leading-none font-semibold tracking-[-0.01em] text-transparent max-md:text-[clamp(9rem,min(40vw,32vh),20rem)]"
            aria-label="404"
          >
            404
          </p>
          <h1
            className="w-full max-w-233.75 font-heading text-heading-l max-md:text-[clamp(1.125rem,6vw,2.75rem)]"
            id="not-found-title"
          >
            <span className="block whitespace-nowrap">The page you are looking</span>
            <span className="block whitespace-nowrap">for doesn’t exist</span>
          </h1>
          <p className="my-8 text-body-l text-neutral-100 max-md:my-6 max-md:max-w-md max-md:text-body-m">
            Try to use a correct url or go back to homepage to start again
          </p>
          <Link
            className="inline-flex items-center justify-center rounded-3xl bg-lime-400 px-6 py-3 text-label-l text-accent-foreground no-underline transition-colors hover:bg-lime-300"
            href="/"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
