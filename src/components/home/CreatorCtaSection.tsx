import Image from 'next/image'

import { ButtonLink } from '@/components/ui/button'

import { gridPatternClassName } from './HomeShared'

function CreatorCtaDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Image
        className="absolute -top-24 -left-12 w-66.5 max-sm:w-35"
        src="/assets/decorative-lime-tall-squiggle.png"
        alt=""
        width={266}
        height={387}
      />
      <Image
        className="absolute top-7 left-[14%] hidden w-35 sm:block"
        src="/assets/decorative-white-small-squiggle.png"
        alt=""
        width={176}
        height={176}
      />
      <Image
        className="absolute top-[44%] -left-10 w-47 max-sm:top-auto max-sm:bottom-0 max-sm:w-25"
        src="/assets/decorative-white-triangle.png"
        alt=""
        width={189}
        height={189}
      />
      <Image
        className="absolute bottom-4 left-[1.5%] hidden w-75 sm:block"
        src="/assets/decorative-lime-arch.png"
        alt=""
        width={344}
        height={190}
      />
      <Image
        className="absolute top-2 right-[13%] w-42 max-sm:w-20"
        src="/assets/decorative-lime-triangle.png"
        alt=""
        width={189}
        height={189}
      />
      <Image
        className="absolute top-4 -right-22 w-66 max-sm:-top-10 max-sm:-right-6 max-sm:w-16"
        src="/assets/decorative-white-rounded-wedge.png"
        alt=""
        width={139}
        height={189}
      />
      <Image
        className="absolute -bottom-8 right-[3%] hidden w-54 sm:block"
        src="/assets/decorative-lime-small-squiggle.png"
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
      className={`relative min-h-122 overflow-hidden bg-blue-800 text-white ${gridPatternClassName}`}
    >
      <CreatorCtaDecorations />
      <div className="relative mx-auto flex max-w-300 flex-col items-center px-5 py-28 text-center lg:px-0 lg:pt-22.5 lg:pb-15">
        <h2 className="max-w-170 font-heading text-heading-m">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="mt-7 max-w-240 text-body-m">
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now and become a part of a community
          comprising over 10,000 local and international creators. Utilize our
          Course Editor, and showcase your expertise by publishing your finest
          course on the ByteSpace Course Library.
        </p>
        <ButtonLink className="mt-14" href="/signup">
          Join as Creator
        </ButtonLink>
      </div>
    </section>
  )
}
