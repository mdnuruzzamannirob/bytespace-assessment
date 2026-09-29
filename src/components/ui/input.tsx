import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'pill' | 'field'
}

export function Input({ className = '', variant = 'pill', ...props }: InputProps) {
  const appearance =
    variant === 'field'
      ? 'rounded-xl border-neutral-100 text-body-l placeholder:text-neutral-400'
      : 'rounded-full border-neutral-200 text-body-m placeholder:text-neutral-500'

  return (
    <input
      className={`h-13 w-full border bg-background px-6 text-foreground focus:border-transparent focus:ring-2 focus:ring-lime-400 focus:outline-none ${appearance} ${className}`}
      {...props}
    />
  )
}
