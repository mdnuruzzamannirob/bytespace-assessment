import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`h-13 w-full rounded-full border border-neutral-200 bg-background px-6 text-body-m text-foreground placeholder:text-neutral-500 focus:border-transparent focus:ring-2 focus:ring-lime-400 focus:outline-none ${className}`}
      {...props}
    />
  )
}
