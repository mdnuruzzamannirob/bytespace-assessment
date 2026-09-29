import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline'
}

export function Button({
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const appearance =
    variant === 'outline'
      ? 'border border-neutral-200 bg-transparent text-foreground hover:border-neutral-500'
      : 'bg-lime-500 text-accent-foreground hover:bg-lime-400'

  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-label-l transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${appearance} ${className}`}
      type={type}
      {...props}
    />
  )
}
