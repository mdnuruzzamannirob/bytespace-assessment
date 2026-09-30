import Image from 'next/image'
import { FaCheck } from 'react-icons/fa6'
import { IoStarSharp } from 'react-icons/io5'

import { CourseCard } from '@/components/courses/CourseCard'
import { courses } from '@/lib/catalog'
import { creatorBenefits, growthStats } from '@/lib/constants/home'

import { StudentFaces } from './HomeShared'

const metricCardClassName =
  'absolute z-1 flex box-border flex-col items-start justify-between rounded-2xl bg-blue-800 p-[clamp(10px,2.96cqw,16px)] text-neutral-50 shadow-[0_12px_22px_rgba(0,0,0,0.12)]'
const metricLabelClassName =
  'whitespace-nowrap text-[clamp(11px,2.96cqw,16px)] leading-[1.2] font-medium'
const metricDateClassName = 'mt-0.5 text-[clamp(9px,1.85cqw,10px)] leading-[1.2] text-white/80'
const metricValueClassName =
  'whitespace-nowrap font-heading text-[clamp(15px,4.44cqw,24px)] leading-[1.33] font-semibold tracking-[-0.01em]'

function GrowthArtwork() {
  return (
    <div className="@container relative isolate order-2 mx-auto aspect-541/596 w-full max-w-135.25 max-sm:max-w-87.5 lg:order-1 lg:mx-0">
      <div className={`${metricCardClassName} top-[7.38%] left-0 h-[19.97%] w-[max(42.88%,160px)]`}>
        <div>
          <p className={metricLabelClassName}>Total Revenue</p>
          <p className={metricDateClassName}>July 1-28</p>
        </div>
        <strong className={metricValueClassName}>$120.29</strong>
        <div className="h-[clamp(5px,1.48cqw,8px)] w-full overflow-hidden rounded-full bg-white">
          <span className="block h-full w-[55%] rounded-full bg-lime-400" />
        </div>
      </div>

      <div
        className={`${metricCardClassName} top-[32.55%] left-0 h-[max(22.65%,91px)] w-[max(24.77%,120px)]`}
      >
        <div>
          <p className={metricLabelClassName}>Year to Date</p>
          <p className={metricDateClassName}>2023</p>
        </div>
        <strong className={metricValueClassName}>$1,200.38</strong>
        <span className="inline-flex min-h-6 min-w-9.5 items-center justify-center rounded-full bg-lime-500 px-1.5 py-0.5 text-[10px] leading-none font-medium text-neutral-950 max-[490px]:min-h-4.5 max-[490px]:text-[9px]">
          +12%
        </span>
      </div>

      <Image
        className="absolute top-0 left-[9.8%] z-2 h-full w-[80.4%] drop-shadow-[24px_30px_28px_rgba(0,0,0,0.18)]"
        src="/assets/home/people/woman-with-headset-and-tablet.png"
        alt="Creator holding a tablet"
        width={579}
        height={719}
        sizes="(max-width: 640px) 75vw, 435px"
      />
      <Image
        className="absolute top-[19.13%] left-[49.9%] z-3 h-auto w-[39.74%]"
        src="/assets/home/decorations/decorative-lime-small-squiggle-rotated.png"
        alt=""
        width={216}
        height={216}
        sizes="(max-width: 640px) 40vw, 215px"
      />

      <div className="absolute top-[69.3%] right-0 z-4 box-border flex h-[max(20.64%,92px)] w-[max(47.7%,215px)] flex-col justify-between rounded-2xl bg-white p-[clamp(10px,2.96cqw,16px)] text-neutral-950 shadow-[0_12px_22px_rgba(0,0,0,0.12)]">
        <div>
          <p className="text-[clamp(11px,2.96cqw,16px)] leading-normal font-medium">
            Happy Students
          </p>
          <p className="flex items-center gap-0.5 text-[10px] leading-[1.2]">
            4.5 <span className="text-neutral-400">(240)</span>{' '}
            <IoStarSharp aria-hidden="true" className="size-4 text-lime-400" />
          </p>
        </div>
        <div className="h-10 origin-top-left max-[490px]:h-8.25 max-[490px]:scale-[0.82] [&>span]:w-max">
          <StudentFaces />
        </div>
      </div>
    </div>
  )
}

export function GrowthSection() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa] bg-[radial-gradient(ellipse_650px_620px_at_100%_0%,#ecf0f8,transparent_100%),radial-gradient(circle_at_27%_7%,#e6fba0,transparent_28%),radial-gradient(circle_at_2%_51%,#d5def7,transparent_28%),radial-gradient(circle_at_0%_89%,#e7fa9f,transparent_23%),radial-gradient(ellipse_720px_650px_at_100%_100%,#cdd7f5,transparent_100%)]">
      <div className="relative mx-auto grid max-w-300 items-center gap-12 px-5 py-25 lg:min-h-182.5 lg:grid-cols-2 lg:gap-25 xl:px-0">
        <div className="lg:translate-y-6.5">
          <h2 className="font-heading text-heading-m max-w-140">
            Your Path to Professional Growth Starts Here!
          </h2>
          <p className="text-body-m mt-12 max-w-113 text-neutral-600">
            Explore our curated selection of courses tailored to enhance your capabilities and
            accelerate your career journey. Whether you are looking to sharpen specific skills, gain
            industry expertise, or embark on a new career path entirely, we have the resources you
            need.
          </p>
          <div className="mt-12 flex gap-12 lg:mt-13.5">
            {growthStats.map(({ value, label }) => (
              <div key={label}>
                <strong className="font-heading text-heading-s text-blue-700">{value}</strong>
                <p className="text-body-s text-neutral-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="@container relative isolate mx-auto aspect-621/552 w-full max-w-155.25 max-sm:aspect-621/700 max-sm:max-w-87.5 lg:mx-0">
          <div className="absolute top-0 left-0 z-1 w-[60.06%]">
            <CourseCard course={courses[0]} />
          </div>
          <Image
            className="absolute top-[2.17%] left-[-5%] z-2 h-[97.83%] w-auto max-w-none drop-shadow-[24px_30px_28px_rgba(0,0,0,0.18)]"
            src="/assets/home/people/man-with-headset-and-laptop.png"
            alt="Learner with laptop"
            width={722}
            height={515}
            sizes="(max-width: 640px) 85vw, 577px"
          />
          <div className="absolute top-[38.59%] left-[55.56%] z-4 box-border flex h-[25%] w-[37.36%] flex-col justify-between rounded-2xl bg-white p-[clamp(10px,2.58cqw,16px)] text-neutral-950 shadow-[0_12px_22px_rgba(0,0,0,0.14)]">
            <p className="text-[clamp(10px,2.25cqw,14px)] leading-[1.4]">Learning Progress</p>
            <strong className="font-heading text-[clamp(27px,7.73cqw,48px)] leading-[1.2] font-semibold tracking-[-0.01em]">
              55%
            </strong>
            <div className="h-[clamp(5px,1.29cqw,8px)] w-full rounded-full bg-neutral-100">
              <div className="h-full w-[55%] rounded-full bg-lime-400" />
            </div>
          </div>
          <Image
            className="absolute top-[12.14%] left-[65.38%] z-5 h-auto w-[34.62%]"
            src="/assets/home/decorations/decorative-lime-small-squiggle.png"
            alt=""
            width={216}
            height={216}
            sizes="(max-width: 640px) 35vw, 215px"
          />
        </div>
      </div>
      <div className="relative mx-auto grid max-w-300 items-center gap-12 px-5 pb-25 lg:min-h-182.5 lg:grid-cols-2 lg:gap-25 xl:px-0">
        <GrowthArtwork />
        <div className="order-1 lg:order-2 lg:-translate-x-7.5">
          <h2 className="font-heading text-heading-m max-w-120">
            Create &amp; Manage Courses Easily.
          </h2>
          <p className="text-body-m mt-8 max-w-122 text-neutral-600">
            <strong>ByteSpace</strong> supports individuals or entities in the creation,
            publication, and administration of educational courses.
          </p>
          <ul className="mt-10 space-y-4">
            {creatorBenefits.map((benefit) => (
              <li className="text-body-m flex items-center gap-3" key={benefit}>
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
