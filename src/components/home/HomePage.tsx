import Image from "next/image";
import Link from "next/link";
import { FaChartSimple, FaCheck } from "react-icons/fa6";
import { PiMagnifyingGlass } from "react-icons/pi";

import { ButtonLink } from "@/components/ui/button";
import {
  courseTopics,
  featuredCourses,
  learningPaths,
  testimonials,
} from "@/constants/home";

const grid =
  "bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-size-[120px_120px] max-md:bg-size-[80px_80px]";
const students = [
  "student-at-table.png",
  "learner-pink-background.png",
  "student-pink-shirt.png",
  "student-with-camera.png",
  "student-with-hat.png",
  "student-with-glasses.png",
  "student-outdoors.png",
];

function StudentFaces({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`flex items-center ${compact ? "-space-x-2" : "-space-x-3.5"}`}
      aria-hidden="true"
    >
      {students.slice(0, compact ? 4 : 7).map((src) => (
        <Image
          className={`${compact ? "size-6" : "size-10"} rounded-full border border-white object-cover`}
          src={`/assets/${src}`}
          alt=""
          width={compact ? 24 : 40}
          height={compact ? 24 : 40}
          key={src}
        />
      ))}
      <span
        className={`${compact ? "size-6" : "size-10"} flex items-center justify-center rounded-full bg-lime-400 text-[8px] font-bold text-neutral-950`}
      >
        2K+
      </span>
    </span>
  );
}

function FloatingStudents({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-65 rounded-xl bg-white p-4 text-neutral-950 shadow-lg ${className}`}
    >
      <p className="text-label-m">Happy Students</p>
      <p className="text-[10px]">
        4.5 <span className="text-blue-700">(240) ★</span>
      </p>
      <div className="mt-2">
        <StudentFaces />
      </div>
    </div>
  );
}

function ProgressCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-58 rounded-xl bg-white p-4 text-neutral-950 shadow-xl ${className}`}
    >
      <p className="text-body-xs">Learning Progress</p>
      <strong className="font-heading text-heading-s">55%</strong>
      <div className="mt-1 h-2 rounded-full bg-neutral-100">
        <div className="h-full w-[55%] rounded-full bg-lime-400" />
      </div>
    </div>
  );
}

function CtaDecorations() {
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
        className="absolute -bottom-18 -left-10 w-47 max-sm:w-25"
        src="/assets/decorative-white-triangle.png"
        alt=""
        width={189}
        height={189}
      />
      <Image
        className="absolute -bottom-20 left-[6%] hidden w-75 sm:block"
        src="/assets/decorative-lime-arch.png"
        alt=""
        width={344}
        height={190}
      />
      <Image
        className="absolute -top-4 right-[13%] w-36 max-sm:w-20"
        src="/assets/decorative-lime-triangle.png"
        alt=""
        width={189}
        height={189}
      />
      <Image
        className="absolute -top-10 -right-8 w-50 max-sm:w-27"
        src="/assets/decorative-white-rounded-wedge.png"
        alt=""
        width={139}
        height={189}
      />
      <Image
        className="absolute -bottom-20 right-[3%] hidden w-54 sm:block"
        src="/assets/decorative-lime-small-squiggle.png"
        alt=""
        width={216}
        height={216}
      />
    </div>
  );
}

function HeroSideDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Image
        className="absolute top-55 -left-15 hidden w-66.5 lg:block"
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
  );
}

function HeroArtwork() {
  return (
    <div className="@container pointer-events-none absolute inset-y-0 left-1/2 w-[calc(100%-2rem)] max-w-300 -translate-x-1/2">
      <div className="absolute top-[56.84%] left-1/2 aspect-square w-[95.75%] -translate-x-1/2 rounded-full border-[26.67cqw] border-[#cbfc01] max-sm:top-auto max-sm:-bottom-50 max-sm:w-full" />
      <Image
        className="absolute top-[46.6%] left-[5.3%] hidden w-24 sm:block lg:w-44 [@media(max-height:900px)]:top-[58%]"
        src="/assets/decorative-white-small-squiggle.png"
        alt=""
        width={176}
        height={176}
      />
      <Image
        className="absolute top-[45.2%] right-[3%] hidden w-28 sm:block lg:w-47.25"
        src="/assets/decorative-white-triangle.png"
        alt=""
        width={189}
        height={189}
      />
      <Image
        className="absolute -bottom-20 -left-16 hidden w-40 sm:block lg:bottom-0 lg:w-86"
        src="/assets/decorative-white-oval-ring.png"
        alt=""
        width={344}
        height={343}
      />
      <Image
        className="absolute -right-30 bottom-0 hidden w-40 sm:block lg:bottom-5 lg:w-79.25"
        src="/assets/decorative-white-large-squiggle.png"
        alt=""
        width={317}
        height={332}
      />
      <Image
        className="absolute bottom-0 left-1/2 h-auto w-auto max-h-[calc(100svh-465px)] max-w-[60.2%] -translate-x-1/2 object-contain lg:left-[calc(50%-30px)] lg:max-h-none max-sm:max-h-none max-sm:max-w-[85%] [@media(max-height:700px)]:max-w-[68%]"
        src="/assets/man-with-headset-and-laptop.png"
        alt="Student learning with a laptop"
        width={722}
        height={515}
        priority
      />
      <div className="absolute top-[62.5%] left-[23.7%] hidden w-52 origin-top-left scale-80 rounded-xl bg-white p-4 text-neutral-950 shadow-lg md:block lg:scale-100">
        <p className="text-label-m">UI/UX Design</p>
        <p className="text-body-xs text-neutral-500">
          200 Courses · 1000+ Students
        </p>
      </div>
      <ProgressCard className="absolute top-[62.5%] right-[20.7%] hidden origin-top-right scale-80 md:block lg:top-[63.5%] lg:scale-100" />
      <FloatingStudents className="absolute bottom-16 left-[17.3%] hidden origin-bottom-left scale-80 md:block lg:bottom-18.5 lg:scale-100" />
    </div>
  );
}

function Hero() {
  return (
    <section
      className={`relative isolate min-h-[max(840px,100svh)] overflow-hidden lg:min-h-[max(1024px,100svh)] [@media(max-height:700px)]:min-h-svh [@media(max-height:620px)]:min-h-175 bg-blue-800 text-white ${grid}`}
    >
      <HeroSideDecorations />
      <HeroArtwork />
      <div className="relative z-10 mx-auto flex w-full max-w-300 flex-col items-center px-4 pt-38 text-center sm:pt-40 lg:pt-42.25 [@media(max-height:700px)]:pt-24">
        <h1 className="max-w-233.75 font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.2] font-semibold tracking-[-0.01em] [@media(max-height:700px)]:text-4xl">
          <span className="block sm:whitespace-nowrap">
            Get Access to Hundreds
          </span>
          <span className="block">Courses Available</span>
        </h1>
        <p className="mt-6 max-w-204.75 text-body-l text-neutral-100 lg:mt-8 [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:text-body-m">
          Unlock your creativity, gain valuable knowledge, and grow your
          business with our wide range of courses.
        </p>
        <form
          action="/courses"
          className="mt-8 flex w-full max-w-145 flex-col items-stretch gap-4 sm:flex-row sm:items-center lg:mt-15 [@media(max-height:700px)]:mt-5 [@media(max-height:700px)]:gap-2"
        >
          <label className="flex h-13 min-w-0 shrink-0 [@media(max-height:700px)]:h-11 items-center gap-3 rounded-full sm:flex-1 bg-white px-6 text-neutral-500">
            <PiMagnifyingGlass className="size-5 shrink-0" aria-hidden="true" />
            <span className="sr-only">Search courses</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-body-l text-neutral-950 outline-none placeholder:text-neutral-400"
              name="q"
              placeholder="Course, topic, creator"
            />
          </label>
          <button
            className="h-11.5 shrink-0 rounded-full bg-lime-400 px-6 text-label-l text-neutral-950 transition-colors hover:bg-lime-300 max-sm:h-12 [@media(max-height:700px)]:h-11"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

function Partners() {
  const logos = ["wave", "sunburst", "compass", "flower", "rings"];
  return (
    <section aria-label="Our partners" className="bg-neutral-50">
      <div className="mx-auto grid min-h-50.5 max-w-300 grid-cols-2 items-center justify-items-center gap-8 px-5 py-12 sm:grid-cols-3 lg:grid-cols-5">
        {logos.map((logo) => (
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
  );
}

function CourseCard({ course }: { course: (typeof featuredCourses)[number] }) {
  return (
    <Link
      href="/courses"
      className="group block rounded-card border border-neutral-200 bg-white p-4 text-neutral-950 transition-shadow hover:shadow-xl"
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
  );
}

function Courses() {
  return (
    <section className="mx-auto max-w-300 px-5 pt-20 pb-28 sm:pt-24 lg:min-h-345 lg:px-0">
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
      <div className="mx-auto mt-10 flex max-w-250 flex-wrap justify-center gap-3">
        {courseTopics.map((topic, index) => (
          <Link
            key={topic}
            href={`/courses?category=${encodeURIComponent(topic)}`}
            className={`rounded-full px-4 py-2 text-body-s transition-colors hover:bg-lime-300 ${index === 0 ? "bg-lime-400 text-neutral-950" : "bg-neutral-50 text-neutral-700"}`}
          >
            {topic}
          </Link>
        ))}
        <Link
          href="/courses"
          className="rounded-full px-4 py-2 text-body-s text-blue-700 hover:underline"
        >
          + More
        </Link>
      </div>
      <div className="mt-18 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {featuredCourses.map((course) => (
          <CourseCard course={course} key={course.title} />
        ))}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-300 px-5 pb-30 text-center lg:min-h-113.5 lg:px-0 lg:pb-25">
      <h2 className="font-heading text-heading-m">
        Explore Diverse Learning Paths at Bytespace
      </h2>
      <p className="mx-auto mt-5 max-w-190 text-body-m text-neutral-500">
        At Bytespace, we believe in empowering individuals through knowledge.
        Our diverse range of courses spans various fields, ensuring there’s
        something for everyone. Unleash your potential and explore our carefully
        curated categories.
      </p>
      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
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
  );
}

function Growth() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_27%_12%,#e9ff9e,transparent_28%),radial-gradient(circle_at_15%_75%,#c7d4ff,transparent_35%),radial-gradient(circle_at_85%_85%,#dbe4ff,transparent_40%)]">
      <div className="relative mx-auto grid max-w-300 items-center gap-12 px-5 py-25 lg:min-h-182.5 lg:grid-cols-2 lg:gap-25 lg:px-0">
        <div>
          <h2 className="max-w-120 font-heading text-heading-m">
            Your Path to Professional Growth Starts Here!
          </h2>
          <p className="mt-8 max-w-113 text-body-m text-neutral-600">
            Explore our curated selection of courses tailored to enhance your
            capabilities and accelerate your career journey. Whether you are
            looking to sharpen specific skills, gain industry expertise, or
            embark on a new career path entirely, we have the resources you
            need.
          </p>
          <div className="mt-12 flex gap-12">
            {[
              ["12K", "Students"],
              ["70+", "Courses"],
              ["16", "Creators"],
            ].map(([value, label]) => (
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
          <div className="absolute top-0 left-0 w-93 max-sm:w-72">
            <CourseCard course={featuredCourses[0]} />
          </div>
          <Image
            className="absolute top-16 right-0 w-30"
            src="/assets/decorative-lime-small-squiggle.png"
            alt=""
            width={216}
            height={216}
          />
          <Image
            className="absolute right-0 bottom-0 h-auto w-full max-w-140 lg:max-w-160"
            src="/assets/man-with-headset-and-laptop.png"
            alt="Learner with laptop"
            width={722}
            height={515}
          />
          <ProgressCard className="absolute right-0 bottom-8" />
        </div>
      </div>
      <div className="relative mx-auto grid max-w-300 items-center gap-12 px-5 pb-25 lg:min-h-182.5 lg:grid-cols-2 lg:gap-25 lg:px-0">
        <div className="relative min-h-120">
          <div className="absolute top-8 left-2 rounded-xl bg-blue-800 p-4 text-white shadow-xl">
            <p className="text-body-xs">Total Revenue</p>
            <strong className="font-heading text-heading-xs">$120.29</strong>
            <div className="mt-2 h-1 w-24 rounded-full bg-lime-400" />
          </div>
          <div className="absolute top-32 left-3 rounded-xl bg-blue-800 p-4 text-white shadow-xl">
            <p className="text-body-xs">Year to Date</p>
            <strong className="font-heading text-heading-xs">$1,200.38</strong>
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
            className="absolute right-0 bottom-0 h-auto w-full max-w-140"
            src="/assets/woman-with-headset-and-tablet.png"
            alt="Creator holding a tablet"
            width={579}
            height={719}
          />
          <FloatingStudents className="absolute right-0 bottom-8" />
        </div>
        <div>
          <h2 className="max-w-120 font-heading text-heading-m">
            Create &amp; Manage Courses Easily.
          </h2>
          <p className="mt-8 max-w-122 text-body-m text-neutral-600">
            <strong>ByteSpace</strong> supports individuals or entities in the
            creation, publication, and administration of educational courses.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              "Share Your Expertise",
              "Monetize Your Passion",
              "Flexibility and Autonomy",
              "Build a Community",
            ].map((item) => (
              <li className="flex items-center gap-3 text-body-m" key={item}>
                <span className="flex size-5 items-center justify-center rounded-full bg-blue-700 text-white">
                  <FaCheck className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CreatorCta() {
  return (
    <section
      className={`relative min-h-122 overflow-hidden bg-blue-800 text-white ${grid}`}
    >
      <CtaDecorations />
      <div className="relative mx-auto flex max-w-300 flex-col items-center px-5 py-28 text-center lg:px-0 lg:pt-22.5 lg:pb-15">
        <h2 className="max-w-170 font-heading text-heading-m">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="mt-7 max-w-180 text-body-m">
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now and become a part of a community
          comprising over 10,000 local and international creators. Utilize our
          Course Editor, and showcase your expertise by publishing your finest
          course on the ByteSpace Course Library.
        </p>
        <ButtonLink className="mt-10" href="/signup">
          Join as Creator
        </ButtonLink>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative bg-[radial-gradient(circle_at_50%_20%,#edffb7,transparent_42%),radial-gradient(circle_at_15%_100%,#c5d1ff,transparent_40%)]">
      <div className="relative mx-auto min-h-196 max-w-300 px-5 py-25 lg:px-0">
        <div className="grid gap-8 md:grid-cols-2 md:gap-18">
          <h2 className="max-w-120 font-heading text-heading-m">
            Discover What Our Community Is Saying
          </h2>
          <p className="text-body-m text-neutral-600">
            At ByteSpace, our vibrant community of learners and creators is at
            the heart of what we do. Hear directly from those who have
            experienced the transformative journey of learning and creating on
            our platform. Explore testimonials that reflect the diverse
            perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map(({ name, role, avatar, quote }) => (
            <article className="rounded-card bg-white p-8" key={name}>
              <Image
                className="size-15 rounded-full object-cover"
                src={avatar}
                alt=""
                width={60}
                height={60}
              />
              <h3 className="mt-5 font-heading text-heading-xs">{name}</h3>
              <p className="text-body-s text-blue-700">{role}</p>
              <blockquote className="mt-6 text-body-m text-neutral-600">
                “{quote}”
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
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
  );
}
