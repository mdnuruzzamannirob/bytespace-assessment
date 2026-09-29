import Image from 'next/image'
import { FaCheck } from 'react-icons/fa6'

import { creatorBenefits, featuredCourses, growthStats } from '@/constants/home'

import { CourseCard, FloatingStudents, ProgressCard } from './HomeShared'

export function GrowthSection() {
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
