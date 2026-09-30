'use client'

import { FaChartSimple } from 'react-icons/fa6'
import { FiFilter } from 'react-icons/fi'
import { LuListFilter, LuShapes } from 'react-icons/lu'

import { CourseFilters } from '@/components/courses/CourseFilters'
import { Select } from '@/components/ui/select'
import { categories, levels, sortOptions, type DurationFilter } from '@/lib/constants/catalog'

type Props = {
  category: string
  level: string
  sort: string
  duration: DurationFilter
  ratingMin: number
  lessonsMin: number
  priceMax: number
  showFilters: boolean
  onCategoryChange: (value: string) => void
  onLevelChange: (value: string) => void
  onSortChange: (value: string) => void
  onDurationChange: (value: DurationFilter) => void
  onRatingChange: (value: number) => void
  onLessonsChange: (value: number) => void
  onPriceChange: (value: number) => void
  onToggleFilters: () => void
  onClear: () => void
  onClose: () => void
}

export function CourseBrowseControls(props: Props) {
  return (
    <>
      <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
        <button
          type="button"
          aria-expanded={props.showFilters}
          aria-controls="all-course-filters"
          onClick={props.onToggleFilters}
          className={`inline-flex h-12 w-full items-center justify-start gap-2 rounded-full border px-4 text-sm font-medium text-neutral-700 sm:w-auto ${props.showFilters ? 'border-neutral-400 bg-neutral-50' : 'border-neutral-200 bg-white hover:border-neutral-400 hover:bg-neutral-50'}`}
        >
          <FiFilter aria-hidden="true" />
          Filter
        </button>
        <Select
          label="Course level"
          triggerLabel={props.level === 'All levels' ? 'Level' : props.level}
          value={props.level}
          options={levels}
          onSelect={props.onLevelChange}
          icon={<FaChartSimple aria-hidden="true" />}
          className="w-full sm:w-auto [&>button]:w-full sm:[&>button]:w-auto"
        />
        <Select
          label="Course category"
          contentWidth={256}
          triggerLabel={props.category === 'Featured' ? 'Category' : props.category}
          value={props.category}
          options={categories}
          onSelect={props.onCategoryChange}
          icon={<LuShapes aria-hidden="true" />}
          className="w-full sm:w-auto [&>button]:w-full sm:[&>button]:w-auto"
        />
        <Select
          label="Sort courses"
          value={props.sort}
          options={sortOptions}
          onSelect={props.onSortChange}
          icon={<LuListFilter aria-hidden="true" />}
          align="right"
          className="w-full sm:ml-auto sm:w-auto [&>button]:w-full sm:[&>button]:w-auto"
        />
      </div>
      <CourseFilters
        open={props.showFilters}
        ratingMin={props.ratingMin}
        lessonsMin={props.lessonsMin}
        priceMax={props.priceMax}
        duration={props.duration}
        onRatingChange={props.onRatingChange}
        onLessonsChange={props.onLessonsChange}
        onPriceChange={props.onPriceChange}
        onDurationChange={props.onDurationChange}
        onClear={props.onClear}
        onClose={props.onClose}
      />
    </>
  )
}
