import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary text-primary-foreground bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-primary-foreground)_18%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-primary-foreground)_18%,transparent)_1px,transparent_1px)] bg-size-[120px_120px] max-md:bg-size-[80px_80px]"
        aria-labelledby="not-found-title"
      >
        <div className="flex w-full max-w-site flex-col items-center px-6 py-16 text-center max-md:px-5 max-md:py-12">
          <p
            className="m-0 bg-linear-to-b from-accent via-accent/70 to-accent/15 bg-clip-text font-heading text-[clamp(15rem,27vw,25rem)] leading-none font-semibold tracking-tighter text-transparent max-md:text-[clamp(11rem,43vw,19rem)]"
            aria-label="404"
          >
            404
          </p>
          <h1
            className="-mt-2 font-heading text-heading-l max-md:mt-0 max-md:text-heading-m"
            id="not-found-title"
          >
            The page you are looking
            <br className="max-md:hidden" /> for doesn’t exist
          </h1>
          <p className="my-9 text-body-l text-primary-foreground/90 max-md:my-7 max-md:max-w-md max-md:text-body-m">
            Try to use a correct url or go back to homepage to start again
          </p>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-label-l text-accent-foreground no-underline transition-colors hover:bg-lime-400"
            href="/"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
