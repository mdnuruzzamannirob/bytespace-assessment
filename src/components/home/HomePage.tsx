import Image from 'next/image'
import Link from 'next/link'
import { FaChartSimple, FaCheck } from 'react-icons/fa6'
import { PiMagnifyingGlass } from 'react-icons/pi'

import { ButtonLink } from '@/components/ui/button'
import {
  courseTopicRows,
  creatorBenefits,
  featuredCourses,
  growthStats,
  learningPaths,
  partnerLogos,
  studentAvatars,
  testimonials,
} from '@/constants/home'
import { IoStarSharp } from 'react-icons/io5'

const gridPatternClassName =
  'bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-size-[120px_120px] max-md:bg-size-[80px_80px]'

function StudentFaces({ compact = false }: { compact?: boolean }) {
  const size = compact ? 24 : 40
  const visibleStudents = compact ? studentAvatars.slice(0, 4) : studentAvatars

  return (
    <span
      className={`flex items-center ${compact ? '-space-x-2' : '-space-x-3.5'}`}
      aria-hidden="true"
    >
      {visibleStudents.map((src) => (
        <Image
          className={`${compact ? 'size-6' : 'size-10'} rounded-full border border-white object-cover`}
          src={`/assets/${src}`}
          alt=""
          width={size}
          height={size}
          key={src}
        />
      ))}
      <span
        className={`${compact ? 'size-6' : 'size-10'} flex items-center justify-center rounded-full bg-lime-400 text-[8px] font-bold text-neutral-950`}
      >
        2K+
      </span>
    </span>
  )
}

type FloatingStudentsProps = {
  className?: string
}

function FloatingStudents({ className = '' }: FloatingStudentsProps) {
  return (
    <div
      className={`w-65 rounded-xl bg-white px-4 py-5 text-neutral-950 shadow-lg ${className}`}
    >
      <p className="text-label-m">Happy Students</p>
      <p className="text-[10px] flex items-center gap-1">
        4.5 <span className="text-neutral-400">(240) </span>{' '}
        <IoStarSharp size={12} className="text-lime-400" />
      </p>
      <div className="mt-2">
        <StudentFaces />
      </div>
    </div>
  )
}

type ProgressCardProps = {
  className?: string
  expanded?: boolean
}

function ProgressCard({ className = '', expanded = false }: ProgressCardProps) {
  return (
    <div
      className={`w-58 rounded-xl bg-white px-4 py-5 text-neutral-950 shadow-xl ${expanded ? 'lg:py-7.5' : ''} ${className}`}
    >
      <p className="text-body-xs">Learning Progress</p>
      <strong className="font-heading text-5xl leading-[1.2]">55%</strong>
      <div className="mt-1 h-2 rounded-full bg-neutral-100">
        <div className="h-full w-[55%] rounded-full bg-lime-400" />
      </div>
    </div>
  )
}

type CourseCardProps = {
  course: (typeof featuredCourses)[number]
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href="/courses"
      className="group block min-w-0 w-full rounded-card border border-neutral-200 bg-white px-4 pt-4 pb-8 text-neutral-950 transition-shadow hover:shadow-xl"
    >
      <div className="relative h-49 overflow-hidden rounded-xl">
        <Image
          className="h-full w-full object-cover"
          src={course.image}
          alt=""
          width={341}
          height={196}
        />
        <div className="absolute inset-x-2 bottom-2 flex justify-between gap-1 text-[10px] text-neutral-500">
          <span className="rounded-full bg-white/80 px-2 py-1">17 Lessons</span>
          <span className="rounded-full bg-white/80 px-2 py-1">
            2 hours 16 mins
          </span>
          <span className="rounded-full bg-white/80 px-2 py-1">
            59 Comments
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="min-w-0 truncate font-heading text-heading-xs group-hover:text-blue-700">
          {course.title}
        </h3>
        <span className="shrink-0 text-body-xs text-neutral-500">
          4.5 <span className="text-lime-500">★</span>
        </span>
      </div>
      <p className="text-body-xs text-neutral-500">
        by <span className="text-blue-700">purepearl studio</span>
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-50 px-3 py-1 text-body-xs">
          <FaChartSimple /> Beginner
        </span>
        <StudentFaces compact />
      </div>
      <p className="mt-4 text-blue-700">
        <strong className="text-label-l">$25</strong>
        <span className="text-body-xs text-neutral-500">/lifetime</span>
      </p>
    </Link>
  )
}

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

function Hero() {
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
          <label className="flex h-13 min-w-0 shrink-0 items-center gap-3 rounded-full bg-white px-6 text-neutral-500 sm:flex-1">
            <PiMagnifyingGlass className="size-5 shrink-0" aria-hidden="true" />
            <span className="sr-only">Search courses</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-body-l text-neutral-950 outline-none placeholder:text-neutral-400"
              name="q"
              placeholder="Course, topic, creator"
            />
          </label>
          <button
            className="h-11.5 shrink-0 rounded-full bg-lime-400 px-6 text-label-l text-neutral-950 transition-colors hover:bg-lime-300 max-sm:h-12"
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

function Partners() {
  return (
    <section aria-label="Our partners" className="bg-neutral-50">
      <div className="mx-auto grid min-h-50.5 max-w-300 grid-cols-2 items-center justify-items-center gap-8 px-5 py-12 sm:grid-cols-3 lg:grid-cols-5">
        {partnerLogos.map((logo) => (
          <Image
            key={logo}
            src={`/assets/logoipsum-${logo}-logo.png`}
            alt="Logoipsum"
            width={170}
            height={42}
            className="h-auto max-w-35 opacity-75 sm:max-w-42"
          />
        ))}
      </div>
    </section>
  )
}

function Courses() {
  return (
    <section className="mx-auto max-w-300 px-5 pt-20 pb-16 sm:pt-24 lg:min-h-345 lg:px-0 lg:pt-19">
      <div className="mx-auto max-w-190 text-center">
        <h2 className="font-heading text-heading-m">
          Discover Your Passion,
          <br /> Build Your Skills
        </h2>
        <p className="mt-5 text-body-m text-neutral-500">
          At Bytespace Courses, we bring you closer to life-changing knowledge.
          Explore a variety of courses across different fields, from technology
          to the arts, and make a difference in your career and life.
        </p>
      </div>
      <div className="mx-auto mt-10 flex max-w-300 flex-wrap justify-center gap-3 lg:flex-col lg:items-center lg:gap-6">
        {courseTopicRows.map((row, rowIndex) => (
          <div
            className="contents lg:flex lg:justify-center lg:gap-4"
            key={rowIndex}
          >
            {row.map((topic) => (
              <Link
                key={topic}
                href={`/courses?category=${encodeURIComponent(topic)}`}
                className={`rounded-full px-4 py-2.5 text-body-s transition-colors hover:bg-lime-300 sm:px-6 ${topic === 'Featured' ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700'}`}
              >
                {topic}
              </Link>
            ))}
            {rowIndex === courseTopicRows.length - 1 && (
              <Link
                href="/courses"
                className="rounded-full px-4 py-2.5 text-body-s text-blue-700 hover:underline sm:px-6"
              >
                + More
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="mt-18 grid min-w-0 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {featuredCourses.map((course) => (
          <CourseCard course={course} key={course.title} />
        ))}
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section className="mx-auto max-w-300 px-5 pb-30 text-center lg:min-h-113.5 lg:px-0">
      <h2 className="font-heading text-heading-m">
        Explore Diverse Learning Paths at Bytespace
      </h2>
      <p className="mx-auto mt-5 max-w-190 text-body-m text-neutral-500">
        At Bytespace, we believe in empowering individuals through knowledge.
        Our diverse range of courses spans various fields, ensuring there’s
        something for everyone. Unleash your potential and explore our carefully
        curated categories.
      </p>
      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:mt-9 lg:grid-cols-6">
        {learningPaths.map(({ label, icon }) => (
          <Link
            className="flex min-h-42 flex-col items-center justify-center gap-5 rounded-card border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
            href={`/courses?category=${encodeURIComponent(label)}`}
            key={label}
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-lime-400">
              <Image src={icon} alt="" width={36} height={36} />
            </span>
            <span className="text-label-m">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Growth() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa] bg-[radial-gradient(ellipse_650px_620px_at_100%_0%,#ecf0f8,transparent_100%),radial-gradient(circle_at_27%_7%,#e6fba0,transparent_28%),radial-gradient(circle_at_2%_51%,#d5def7,transparent_28%),radial-gradient(circle_at_0%_89%,#e7fa9f,transparent_23%),radial-gradient(ellipse_720px_650px_at_100%_100%,#cdd7f5,transparent_100%)]">
      <div className="relative mx-auto grid max-w-300 items-center gap-12 px-5 py-25 lg:min-h-182.5 lg:grid-cols-2 lg:gap-25 lg:px-0">
        <div className="lg:translate-y-6.5">
          <h2 className="max-w-140 font-heading text-heading-m">
            Your Path to Professional Growth Starts Here!
          </h2>
          <p className="mt-12 max-w-113 text-body-m text-neutral-600">
            Explore our curated selection of courses tailored to enhance your
            capabilities and accelerate your career journey. Whether you are
            looking to sharpen specific skills, gain industry expertise, or
            embark on a new career path entirely, we have the resources you
            need.
          </p>
          <div className="mt-12 flex gap-12 lg:mt-13.5">
            {growthStats.map(({ value, label }) => (
              <div key={label}>
                <strong className="font-heading text-heading-s text-blue-700">
                  {value}
                </strong>
                <p className="text-body-s text-neutral-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-110 lg:min-h-130">
          <div className="absolute top-3.5 left-0 w-93 lg:-left-2.5 max-sm:w-72">
            <CourseCard course={featuredCourses[0]} />
          </div>
          <Image
            className="absolute top-20 right-0 w-30 lg:-right-4 lg:w-40"
            src="/assets/decorative-lime-small-squiggle.png"
            alt=""
            width={216}
            height={216}
          />
          <Image
            className="absolute right-0 bottom-0 h-auto w-full max-w-140 lg:-right-36 lg:w-190 lg:max-w-none lg:translate-y-12"
            src="/assets/man-with-headset-and-laptop.png"
            alt="Learner with laptop"
            width={722}
            height={515}
          />
          <ProgressCard
            expanded
            className="absolute top-0 right-0 origin-top-right scale-70 sm:top-auto sm:bottom-8 sm:scale-100 lg:-right-4 lg:bottom-39"
          />
        </div>
      </div>
      <div className="relative mx-auto grid max-w-300 items-center gap-12 px-5 pb-25 lg:min-h-182.5 lg:grid-cols-2 lg:gap-25 lg:px-0">
        <div className="relative min-h-120">
          <div className="absolute -top-4 left-0 rounded-xl bg-blue-800 px-6 py-5 text-white shadow-xl">
            <p className="text-body-s">Total Revenue</p>
            <p className="text-body-xs text-white/70">July 1-28</p>
            <strong className="font-heading text-2xl">$120.29</strong>
            <div className="mt-2 h-1 w-24 rounded-full bg-lime-400" />
          </div>
          <div className="absolute top-34 left-0 rounded-xl bg-blue-800 px-6 py-5 text-white shadow-xl">
            <p className="text-body-s">Year to Date</p>
            <p className="text-body-xs text-white/70">2023</p>
            <strong className="font-heading text-2xl">$1,200.38</strong>
            <p className="mt-2 text-body-xs text-lime-400">+12%</p>
          </div>
          <Image
            className="absolute top-18 right-0 w-35"
            src="/assets/decorative-lime-small-squiggle.png"
            alt=""
            width={216}
            height={216}
          />
          <Image
            className="absolute right-0 bottom-0 h-auto w-full max-w-140 lg:-right-8 lg:w-144 lg:max-w-none lg:translate-y-42"
            src="/assets/woman-with-headset-and-tablet.png"
            alt="Creator holding a tablet"
            width={579}
            height={719}
          />
          <FloatingStudents className="absolute right-0 bottom-8 lg:bottom-3" />
        </div>
        <div className="lg:-translate-x-7.5">
          <h2 className="max-w-120 font-heading text-heading-m">
            Create &amp; Manage Courses Easily.
          </h2>
          <p className="mt-8 max-w-122 text-body-m text-neutral-600">
            <strong>ByteSpace</strong> supports individuals or entities in the
            creation, publication, and administration of educational courses.
          </p>
          <ul className="mt-10 space-y-4">
            {creatorBenefits.map((benefit) => (
              <li className="flex items-center gap-3 text-body-m" key={benefit}>
                <span className="flex size-5 items-center justify-center rounded-full bg-blue-700 text-white">
                  <FaCheck className="size-3" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

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

function CreatorCta() {
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

function Testimonials() {
  return (
    <section className="relative bg-[#fafafa] bg-[radial-gradient(ellipse_460px_240px_at_50%_190px,#e1fb72,transparent_100%),radial-gradient(ellipse_420px_400px_at_100%_332px,#e6fb9b,transparent_100%),radial-gradient(circle_at_10%_100%,#c5d4f7,transparent_38%)]">
      <div className="relative mx-auto min-h-196 max-w-300 px-5 pt-25 pb-16 lg:px-0 lg:pb-15.5">
        <div className="grid gap-8 md:grid-cols-2 md:gap-18">
          <h2 className="max-w-120 font-heading text-heading-m lg:translate-y-4">
            Discover What Our Community Is Saying
          </h2>
          <p className="text-body-m text-neutral-600 lg:-translate-y-5">
            At ByteSpace, our vibrant community of learners and creators is at
            the heart of what we do. Hear directly from those who have
            experienced the transformative journey of learning and creating on
            our platform. Explore testimonials that reflect the diverse
            perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-3 lg:mt-21">
          {testimonials.map(({ name, role, avatar, quote }) => (
            <article className="min-h-108 rounded-card bg-white p-6" key={name}>
              <Image
                className="size-20 rounded-full object-cover"
                src={avatar}
                alt=""
                width={80}
                height={80}
              />
              <h3 className="mt-6 font-heading text-heading-xs">{name}</h3>
              <p className="text-body-s text-blue-700">{role}</p>
              <blockquote className="mt-6 text-body-l text-neutral-600">
                “{quote}”
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <main>
      <Hero />
      <Partners />
      <Courses />
      <Categories />
      <Growth />
      <CreatorCta />
      <Testimonials />
    </main>
  )
}
