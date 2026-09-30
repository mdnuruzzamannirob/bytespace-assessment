import Image from 'next/image'

import { ButtonLink } from '@/components/ui/button'

import { gridPatternClassName } from './HomeShared'

const decorationPath = '/assets/home/decorations/'

function CreatorCtaDecorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image
        className="absolute -top-16 -left-11 w-36 sm:-top-32 sm:-left-12 sm:w-52 xl:-top-40 xl:-left-1 xl:w-70"
        src={`${decorationPath}decorative-lime-tall-squiggle.png`}
        alt=""
        width={266}
        height={387}
      />
      <Image
        className="absolute top-5 left-[19%] w-16 sm:hidden xl:top-3 xl:left-49 xl:block xl:w-44"
        src={`${decorationPath}decorative-white-small-squiggle.png`}
        alt=""
        width={176}
        height={176}
      />
      <Image
        className="absolute bottom-12 -left-7 w-22 sm:bottom-10 sm:-left-7 sm:w-24 xl:top-52 xl:bottom-auto xl:-left-1 xl:w-35"
        src={`${decorationPath}decorative-white-rounded-wedge.png`}
        alt=""
        width={139}
        height={189}
      />
      <Image
        className="absolute -bottom-5 -left-5 w-36 sm:-bottom-10 sm:-left-6 sm:w-48 xl:-bottom-1 xl:left-0 xl:w-85.5"
        src={`${decorationPath}decorative-lime-arch.png`}
        alt=""
        width={344}
        height={190}
      />
      <Image
        className="absolute top-5 right-[13%] w-20 sm:top-0 sm:right-5 sm:w-24 xl:top-0 xl:right-52 xl:w-47"
        src={`${decorationPath}decorative-lime-triangle.png`}
        alt=""
        width={189}
        height={189}
      />
      <Image
        className="absolute -top-8 -right-8 w-20 sm:top-12 sm:-right-8 sm:w-24 xl:top-8 xl:-right-5 xl:w-47"
        src={`${decorationPath}decorative-white-curved-strip.png`}
        alt=""
        width={218}
        height={372}
      />
      <Image
        className="absolute -right-7 -bottom-8 w-32 sm:-right-6 sm:-bottom-12 sm:w-40 xl:right-0 xl:-bottom-35 xl:w-82.5"
        src={`${decorationPath}decorative-lime-small-squiggle.png`}
        alt=""
        width={216}
        height={216}
      />
    </div>
  )
}

export function CreatorCtaSection() {
  return (
    <section
      className={`relative isolate min-h-122 overflow-hidden bg-blue-800 text-white ${gridPatternClassName}`}
    >
      <CreatorCtaDecorations />
      <div className="relative z-10 mx-auto flex w-full max-w-251 flex-col items-center gap-10 px-5 py-25 text-center sm:max-w-[calc(100%-10rem)] sm:py-20 xl:min-h-122 xl:max-w-251 xl:justify-center xl:py-0">
        <h2 className="font-heading text-heading-m max-w-177.5 tracking-[-0.01em]">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="text-body-l max-w-241 text-neutral-50">
          Experience the collaboration of numerous creators and an expanding selection of courses.
          Register now and become a part of a community comprising over 10,000 local and
          international creators. Utilize our Course Editor, and showcase your expertise by
          publishing your finest course on the ByteSpace Course Library.
        </p>
        <ButtonLink href="/signup" style={{ height: 46, minHeight: 46 }}>
          Join as Creator
        </ButtonLink>
      </div>
    </section>
  )
}
