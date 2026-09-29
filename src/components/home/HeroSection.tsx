import Image from 'next/image'

import { SearchField } from '@/components/ui/search-field'

import {
  FloatingStudents,
  gridPatternClassName,
  ProgressCard,
} from './HomeShared'

function HeroSideDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Image
        className="absolute top-55 left-0 hidden w-66.5 lg:block"
        src="/assets/decorative-lime-tall-squiggle.png"
        alt=""
        width={266}
        height={387}
      />
      <Image
        className="absolute top-54 right-0 hidden w-53.25 lg:block"
        src="/assets/decorative-lime-curved-strip.png"
        alt=""
        width={213}
        height={372}
      />
    </div>
  )
}

function HeroArtwork() {
  return (
    <div className="@container pointer-events-none relative mx-auto aspect-21/20 w-[calc(100%-2rem)] max-w-300 sm:aspect-3/2 md:aspect-9/5 lg:aspect-40/17">
      <div className="absolute top-[13.5%] left-1/2 aspect-square w-[95.75%] -translate-x-1/2 rounded-full border-[26.67cqw] border-[#cbfc01] max-sm:top-[5%] md:max-lg:top-[6%]" />
      <Image
        className="absolute top-0 left-[8%] hidden w-44 sm:block max-sm:top-4 max-sm:left-[5%] max-sm:block max-sm:w-14"
        src="/assets/decorative-white-small-squiggle.png"
        alt=""
        width={176}
        height={176}
      />
      <Image
        className="absolute -top-7.5 right-[3%] hidden w-47.25 sm:block max-sm:top-6 max-sm:right-[2%] max-sm:block max-sm:w-12 md:max-lg:top-4"
        src="/assets/decorative-white-triangle.png"
        alt=""
        width={189}
        height={189}
      />
      <Image
        className="absolute bottom-0 -left-28 hidden w-86 sm:block max-sm:bottom-1 max-sm:-left-9 max-sm:block max-sm:w-22"
        src="/assets/decorative-white-oval-ring.png"
        alt=""
        width={344}
        height={343}
      />
      <Image
        className="absolute -right-30 bottom-5 hidden w-79.25 sm:block max-sm:right-[-12%] max-sm:bottom-0 max-sm:block max-sm:w-22"
        src="/assets/decorative-white-large-squiggle.png"
        alt=""
        width={317}
        height={332}
      />
      <Image
        className="absolute top-0 left-[calc(50%+50px)] h-auto w-[60.2%] max-w-180.5 -translate-x-1/2 object-contain max-sm:top-[4%] max-sm:left-1/2 max-sm:w-[85%] md:max-lg:top-0 md:max-lg:left-1/2 md:max-lg:w-[52%]"
        src="/assets/man-with-headset-and-laptop.png"
        alt="Student learning with a laptop"
        width={722}
        height={515}
        priority
      />
      <div className="absolute top-[25%] left-[23.7%] w-52 origin-top-left scale-80 rounded-xl bg-white p-4 text-neutral-950 shadow-lg lg:scale-100 max-sm:top-[18%] max-sm:left-[2%] max-sm:w-36 max-sm:scale-90 max-sm:p-3">
        <p className="text-label-m">UI/UX Design</p>
        <p className="text-body-xs text-neutral-500">
          200 Courses · 1000+ Students
        </p>
      </div>
      <ProgressCard className="absolute top-[27%] right-[20.7%] origin-top-right scale-80 lg:scale-100 max-sm:top-[28%] max-sm:right-[2%] max-sm:w-36 max-sm:scale-70 md:max-lg:right-[2%]" />
      <FloatingStudents className="absolute bottom-16 left-[17.3%] origin-bottom-left scale-80 lg:scale-100 max-sm:bottom-2 max-sm:left-[2%] max-sm:scale-60" />
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      className={`relative isolate overflow-hidden bg-blue-800 text-white ${gridPatternClassName}`}
    >
      <HeroSideDecorations />
      <div className="relative z-10 mx-auto flex w-full max-w-300 flex-col items-center px-4 pt-38 text-center sm:pt-40 lg:pt-42.25">
        <h1 className="max-w-233.75 font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.2] font-semibold tracking-[-0.01em]">
          <span className="block sm:whitespace-nowrap">
            Get Access to Hundreds
          </span>
          <span className="block">Courses Available</span>
        </h1>
        <p className="mt-6 max-w-204.75 text-body-l text-neutral-100 lg:mt-8">
          Unlock your creativity, gain valuable knowledge, and grow your
          business with our wide range of courses.
        </p>
        <form
          action="/courses"
          className="mt-8 flex w-full max-w-145 flex-col items-stretch gap-4 sm:flex-row sm:items-center lg:mt-15"
        >
          <SearchField
            containerClassName="shrink-0 sm:flex-1"
            label="Search courses"
            name="q"
            placeholder="Course, topic, creator"
          />
          <button
            className="h-13 shrink-0 rounded-full bg-lime-400 px-6 text-label-l text-neutral-950 transition-colors hover:bg-lime-300 max-sm:h-13"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <HeroArtwork />
    </section>
  )
}
