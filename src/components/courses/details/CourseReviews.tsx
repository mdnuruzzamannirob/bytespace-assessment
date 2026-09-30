import Image from 'next/image'

import { ratingDistribution, reviews } from '@/lib/demo-data/course-details'

import { Stars, assets } from './DetailPrimitives'

export function CourseReviews({
  activeRating,
  onRatingChange,
}: {
  activeRating: number | 'all'
  onRatingChange: (value: number | 'all') => void
}) {
  const visibleReviews =
    activeRating === 'all'
      ? reviews
      : reviews.filter((review) => review.rating === activeRating)
  return (
    <div
      role="tabpanel"
      id="panel-reviews"
      aria-labelledby="tab-reviews"
      className="mt-10"
    >
      <h2 className="font-heading text-xl">What Learners Are Saying</h2>
      <p className="mt-6 max-w-181 text-base leading-relaxed text-neutral-700">
        Discover what learners have to say about their experience and read
        ratings from people who have taken this course.
      </p>
      <section
        className="mt-6 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:p-10"
        aria-label="Course rating distribution"
      >
        <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-lime-400 px-10 py-8 text-neutral-950">
          <p className="text-sm font-medium">Ratings</p>
          <p className="font-heading text-heading-s">4.7</p>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          {ratingDistribution.map((item) => (
            <div
              className="grid grid-cols-[minmax(0,1fr)_auto_10] items-center gap-3"
              key={item.count}
            >
              <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-lime-400"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <Stars size={16} />
              <span className="text-sm text-neutral-700">{item.count}</span>
            </div>
          ))}
        </div>
      </section>
      <h3 className="mt-8 font-heading text-xl">Individual Reviews</h3>
      <div
        className="mt-6 flex flex-wrap gap-3"
        aria-label="Filter reviews by rating"
      >
        <button
          type="button"
          aria-pressed={activeRating === 'all'}
          onClick={() => onRatingChange('all')}
          className={`rounded-full px-4 py-3 text-sm font-medium ${activeRating === 'all' ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}
        >
          All ratings
        </button>
        {[5, 4, 3, 2, 1].map((value) => (
          <button
            type="button"
            key={value}
            aria-pressed={activeRating === value}
            onClick={() => onRatingChange(value)}
            className={`inline-flex items-center gap-1 rounded-full px-4 py-3 text-sm font-medium ${activeRating === value ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}
          >
            <Stars count={1} size={20} />
            {value}
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-5">
        {visibleReviews.length ? (
          visibleReviews.map((review) => (
            <article
              className="rounded-card border border-neutral-200 p-6 sm:p-10"
              key={review.name}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={`${assets}/${review.image}`}
                    width={52}
                    height={52}
                    alt={`${review.name} profile`}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-lg font-medium text-neutral-950">
                      {review.name}
                    </h4>
                    <p className="text-base text-neutral-700">{review.role}</p>
                  </div>
                </div>
                <Stars count={review.rating} size={20} />
              </div>
              <p className="mt-6 text-base leading-relaxed text-neutral-700">
                {review.copy}
              </p>
            </article>
          ))
        ) : (
          <p className="rounded-2xl bg-neutral-50 p-6 text-neutral-700">
            No {activeRating}-star reviews yet.
          </p>
        )}
      </div>
    </div>
  )
}
