import type { InputHTMLAttributes } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'

type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  containerClassName?: string
  label?: string
}

export function SearchField({
  className = '',
  containerClassName = '',
  label = 'Search courses',
  ...props
}: SearchFieldProps) {
  return (
    <label
      className={`flex h-12 min-h-12 min-w-0 shrink-0 items-center gap-3 rounded-full bg-white px-4 text-neutral-500 ${containerClassName}`}
    >
      <PiMagnifyingGlass aria-hidden="true" className="size-5 shrink-0" />
      <span className="sr-only">{label}</span>
      <input
        className={`text-body-l min-w-0 flex-1 bg-transparent text-neutral-950 outline-none placeholder:text-neutral-400 ${className}`}
        type="search"
        {...props}
      />
    </label>
  )
}
