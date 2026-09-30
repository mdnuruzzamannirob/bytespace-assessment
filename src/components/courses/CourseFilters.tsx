'use client'

import { FiX } from 'react-icons/fi'

import { Dialog } from '@/components/ui/dialog'

type CourseFiltersProps = {
  open: boolean
  ratingMin: number
  lessonsMin: number
  duration: "any" | "under2" | "twoToThree" | "threePlus"
  priceMax: number
  onRatingChange: (value: number) => void
  onLessonsChange: (value: number) => void
  onDurationChange: (value: "any" | "under2" | "twoToThree" | "threePlus") => void
  onPriceChange: (value: number) => void
  onClear: () => void
  onClose: () => void
}

function FilterChoice({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-sm transition-colors ${selected ? 'bg-lime-400 text-neutral-950' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'}`}
    >
      {label}
    </button>
  )
}

function FilterControls({
  ratingMin,
  lessonsMin,
  onRatingChange,
  onLessonsChange,
  duration,
  onDurationChange,
  priceMax,
  onPriceChange,
  onClear,
  onClose,
  mobile = false,
}: Omit<CourseFiltersProps, "open"> & { mobile?: boolean }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id="course-filter-heading" className="font-heading text-xl">Filters</h2>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={onClear} className="text-sm font-medium text-lime-600 underline underline-offset-4">Clear all</button>
          {!mobile && <button type="button" onClick={onClose} className="hidden h-10 items-center rounded-full bg-lime-400 px-5 text-sm font-medium text-neutral-950 transition-colors hover:bg-lime-300 sm:inline-flex">Apply filters</button>}
          {mobile && <button type="button" onClick={onClose} aria-label="Close filters" className="flex size-9 items-center justify-center rounded-full bg-neutral-50 text-neutral-700 hover:bg-neutral-100"><FiX aria-hidden="true" /></button>}
        </div>
      </div>
      <div className="mt-5 grid gap-5 border-t border-neutral-100 pt-5 sm:grid-cols-2">
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Rating</legend>
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4].map((item) => <FilterChoice key={item} label={item ? item + "+ stars" : "Any rating"} selected={ratingMin === item} onClick={() => onRatingChange(item)} />)}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Duration</legend>
          <div className="flex flex-wrap gap-2">
            <FilterChoice label="Any duration" selected={duration === "any"} onClick={() => onDurationChange("any")} />
            <FilterChoice label="Under 2 hours" selected={duration === "under2"} onClick={() => onDurationChange("under2")} />
            <FilterChoice label="2–3 hours" selected={duration === "twoToThree"} onClick={() => onDurationChange("twoToThree")} />
            <FilterChoice label="3+ hours" selected={duration === "threePlus"} onClick={() => onDurationChange("threePlus")} />
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Price</legend>
          <div className="flex flex-wrap gap-2">
            {[0, 25, 35, 50].map((item) => <FilterChoice key={item} label={item ? "Up to " + String.fromCharCode(36) + item : "Any price"} selected={priceMax === item} onClick={() => onPriceChange(item)} />)}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Lessons</legend>
          <div className="flex flex-wrap gap-2">
            {[0, 10, 17, 22].map((item) => <FilterChoice key={item} label={item ? item + "+ lessons" : "Any lesson count"} selected={lessonsMin === item} onClick={() => onLessonsChange(item)} />)}
          </div>
        </fieldset>
      </div>
      {mobile && <button type="button" onClick={onClose} className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-lime-400 text-sm font-medium text-neutral-950 transition-colors hover:bg-lime-300">Show results</button>}
    </>
  )
}

/** Desktop panel with a mobile bottom-drawer counterpart. */
export function CourseFilters(props: CourseFiltersProps) {
  if (!props.open) return null

  return (
    <>
      <section id="all-course-filters" className="mt-4 hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:block" aria-labelledby="course-filter-heading">
        <FilterControls {...props} />
      </section>
      <Dialog open={props.open} onClose={props.onClose} labelledBy="course-filter-heading" mobileOnly closeOnDragDown className="p-5">
        <FilterControls {...props} mobile />
      </Dialog>
    </>
  )
}
