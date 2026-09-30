import Link from 'next/link'
import type { ButtonHTMLAttributes, ComponentProps } from 'react'

type ButtonVariant = 'primary' | 'outline'
type ButtonSize = 'small' | 'medium' | 'large'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

function buttonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className: string,
) {
  const appearance =
    variant === 'outline'
      ? 'border border-neutral-200 bg-transparent text-foreground hover:border-neutral-500'
      : 'bg-lime-400 text-neutral-950 hover:bg-lime-300 hover:text-neutral-950'

  const sizing =
    size === 'small'
      ? 'h-10 min-h-10 px-4 text-sm'
      : size === 'medium'
        ? 'h-12 min-h-12 px-5 text-sm'
        : 'h-13 min-h-13 px-6 text-label-l'
  return `inline-flex items-center justify-center rounded-full ${sizing} no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 disabled:cursor-not-allowed disabled:opacity-50 ${appearance} ${className}`
}

export function Button({
  className = '',
  type = 'button',
  variant = 'primary',
  size = 'large',
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClassName(variant, size, className)}
      type={type}
      {...props}
    />
  )
}

export function ButtonLink({
  className = '',
  variant = 'primary',
  size = 'large',
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClassName(variant, size, className)} {...props} />
  )
}
