import Image from 'next/image'

import { testimonials } from '@/lib/constants/home'

export function TestimonialsSection() {
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
