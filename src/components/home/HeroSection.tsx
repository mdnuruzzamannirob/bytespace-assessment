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
        className="absolute top-55 left-0 hidden w-66.5 xl:block"
        src="/assets/home/decorations/decorative-lime-tall-squiggle.png"
        alt=""
        width={266}
        height={387}
      />
      <Image
        className="absolute top-54 right-0 hidden w-53.25 xl:block"
        src="/assets/home/decorations/decorative-lime-curved-strip.png"
        alt=""
        width={213}
        height={372}
      />
    </div>
  )
}

function HeroArtwork() {
  return (
    <div className="@container pointer-events-none relative mx-auto aspect-40/17 w-full max-w-300">
      <div className="absolute top-[13.5%] left-1/2 aspect-square w-[95.75%] -translate-x-1/2 rounded-full border-[26.67cqw] border-[#cbfc01]" />
      <Image
        className="absolute top-0 left-[8%] w-[14.67cqw]"
        src="/assets/home/decorations/decorative-white-small-squiggle.png"
        alt=""
        width={176}
        height={176}
      />
      <Image
        className="absolute top-[-1.5cqw] right-[3%] w-[15.75cqw]"
        src="/assets/home/decorations/decorative-white-triangle.png"
        alt=""
        width={189}
        height={189}
      />
      <Image
        className="absolute bottom-0 left-[-9.33cqw] hidden w-[28.67cqw] sm:block"
        src="/assets/home/decorations/decorative-white-oval-ring.png"
        alt=""
        width={344}
        height={343}
      />
      <Image
        className="absolute right-[-10cqw] bottom-[1.67cqw] hidden w-[26.42cqw] sm:block"
        src="/assets/home/decorations/decorative-white-large-squiggle.png"
        alt=""
        width={317}
        height={332}
      />
      <Image
        className="absolute top-0 left-[calc(50%+4.17cqw)] h-auto w-[60.2%] -translate-x-1/2 object-contain"
        src="/assets/home/people/man-with-headset-and-laptop.png"
        alt="Student learning with a laptop"
        width={722}
        height={515}
        priority
      />
      <div className="absolute top-[25%] left-[23.7%] w-52 origin-top-left scale-35 rounded-xl bg-white p-4 text-neutral-950 shadow-lg max-[399px]:left-[20%] sm:scale-55 md:scale-65 lg:scale-85 xl:scale-100">
        <p className="text-label-m">UI/UX Design</p>
        <p className="text-body-xs text-neutral-500">
          200 Courses · 1000+ Students
        </p>
      </div>
      <ProgressCard className="absolute top-[27%] right-[20.7%] origin-top-right scale-35 sm:scale-55 md:scale-65 lg:scale-85 xl:scale-100" />
      <FloatingStudents className="absolute bottom-[5.33cqw] left-[17.3%] origin-bottom-left scale-35 max-[399px]:left-[10%] sm:scale-55 md:scale-65 lg:scale-85 xl:scale-100" />
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      className={`relative isolate overflow-hidden bg-blue-800 text-white ${gridPatternClassName}`}
    >
      <HeroSideDecorations />
      <div className="relative z-10 mx-auto flex w-full max-w-300 flex-col items-center px-5 pt-28 text-center sm:pt-32 lg:pt-36 xl:px-4 xl:pt-42.25">
        <h1 className="max-w-233.75 font-heading text-[clamp(2rem,5vw,4.5rem)] leading-[1.2] xl:text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.01em]">
          <span className="block sm:whitespace-nowrap">
            Get Access to Hundreds
          </span>
          <span className="block">Courses Available</span>
        </h1>
        <p className="mt-5 max-w-204.75 text-body-l sm:mt-6 text-neutral-100 lg:mt-8">
          Unlock your creativity, gain valuable knowledge, and grow your
          business with our wide range of courses.
        </p>
        <form
          action="/courses"
          className="mt-7 flex w-full max-w-145 flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4 xl:mt-15"
        >
          <SearchField
            containerClassName="shrink-0 sm:flex-1"
            label="Search courses"
            name="q"
            placeholder="Course, topic, creator"
          />
          <button
            className="h-12 min-h-12 shrink-0 rounded-full bg-lime-400 px-6 text-label-l text-neutral-950 transition-colors hover:bg-lime-300"
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
