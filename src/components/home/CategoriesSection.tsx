import Image from 'next/image'
import Link from 'next/link'

import { learningPaths } from '@/constants/home'

export function CategoriesSection() {
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
