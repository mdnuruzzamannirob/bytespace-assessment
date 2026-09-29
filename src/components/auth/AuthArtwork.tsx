import Image from 'next/image'

const chartBars = [
  36, 58, 77, 42, 89, 68, 100, 55, 72, 46, 81, 60, 93, 51, 74, 64,
]

function StudentAvatars() {
  return (
    <span className="flex -space-x-2" aria-hidden="true">
      {['JS', 'AD', 'KP', 'RM'].map((initials, index) => (
        <span
          className={`flex size-7 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white ${
            index % 2 === 0 ? 'bg-blue-500' : 'bg-neutral-600'
          }`}
          key={initials}
        >
          {initials}
        </span>
      ))}
      <span className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-black text-[8px] font-bold text-white">
        26+
      </span>
    </span>
  )
}

export function AuthArtwork() {
  return (
    <div aria-hidden="true" className="relative h-143 w-125 select-none">
      <div className="absolute top-22 left-0 h-96 w-93 overflow-hidden rounded-3xl bg-white p-4 text-neutral-950 shadow-xl">
        <div className="h-52 rounded-xl bg-linear-to-br from-neutral-300 via-neutral-100 to-neutral-400" />
        <div className="mt-5 flex items-start justify-between gap-3">
          <p className="font-heading text-lg leading-tight font-semibold">
            Build Digital Products
          </p>
          <span className="text-body-s">4.5 ★</span>
        </div>
        <p className="mt-1 text-body-xs text-neutral-500">
          by <span className="text-blue-700">purepearl studio</span>
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full bg-neutral-50 px-3 py-1 text-body-xs">
            Beginner
          </span>
          <StudentAvatars />
        </div>
        <p className="mt-3 text-blue-700">
          <strong className="text-lg">$25</strong>
          <span className="text-body-xs text-neutral-500">/lifetime</span>
        </p>
      </div>

      <div className="absolute top-0 left-28 z-10 h-96 w-93 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-4 text-neutral-950 shadow-xl">
        <div className="relative h-49 overflow-hidden rounded-xl bg-neutral-950 px-5 pt-4 text-white">
          <p className="text-[9px] font-semibold tracking-wide">
            USERS LAST 7 DAYS USING HEIDIAN
          </p>
          <div className="absolute inset-x-5 bottom-8 flex h-24 items-end gap-1 border-b border-neutral-500/50">
            {chartBars.map((height, index) => (
              <span
                className={`flex-1 ${index % 3 === 0 ? 'bg-blue-500' : 'bg-cyan-400'}`}
                key={index}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="absolute inset-x-5 bottom-2 flex justify-between text-[8px] text-neutral-300">
            <span>17 Lessons</span>
            <span>2 hours 16 mins</span>
            <span>59 Comments</span>
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-3">
          <p className="font-heading text-lg leading-tight font-semibold">
            the Power of Big Data
          </p>
          <span className="text-body-s">
            4.5 <span className="text-lime-500">★</span>
          </span>
        </div>
        <p className="mt-1 text-body-xs text-neutral-500">
          by <span className="text-blue-700">purepearl studio</span>
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full bg-neutral-50 px-3 py-1 text-body-xs">
            Beginner
          </span>
          <StudentAvatars />
        </div>
        <p className="mt-3 text-blue-700">
          <strong className="text-lg">$25</strong>
          <span className="text-body-xs text-neutral-500">/lifetime</span>
        </p>
      </div>

      <span className="absolute top-10 left-12 z-20 h-20 w-25 -rotate-32 rounded-[50%] border-20 border-lime-400 shadow-sm" />
      <Image
        alt=""
        className="absolute top-82 right-0 z-20"
        height={136}
        src="/assets/decorative-white-small-squiggle.png"
        width={136}
      />
      <Image
        alt=""
        className="absolute bottom-1 left-0 z-20"
        height={125}
        src="/assets/decorative-lime-triangle.png"
        width={125}
      />
      <div className="absolute right-3 bottom-1 z-30 w-65 rounded-2xl bg-lime-400 px-4 py-3 text-neutral-950 shadow-lg">
        <p className="text-body-m">Happy Students</p>
        <p className="text-body-xs">
          4.5 <span className="text-blue-700">(240) ★</span>
        </p>
        <div className="mt-2 flex items-center justify-between">
          <StudentAvatars />
          <span className="rounded-full bg-neutral-950 px-2 py-1 text-body-xs text-white">
            2K+
          </span>
        </div>
      </div>
    </div>
  )
}
