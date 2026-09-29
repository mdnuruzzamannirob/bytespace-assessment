import Link from 'next/link'
import type { ButtonHTMLAttributes, ComponentProps } from 'react'

type ButtonVariant = 'primary' | 'outline'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant
}

function buttonClassName(variant: ButtonVariant, className: string) {
  const appearance =
    variant === 'outline'
      ? 'border border-neutral-200 bg-transparent text-foreground hover:border-neutral-500'
      : 'bg-lime-400 text-neutral-950 hover:bg-lime-300 hover:text-neutral-950'

  return `inline-flex h-13 min-h-13 items-center justify-center rounded-full px-6 text-label-l no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 disabled:cursor-not-allowed disabled:opacity-50 ${appearance} ${className}`
}

export function Button({
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return <button className={buttonClassName(variant, className)} type={type} {...props} />
}

export function ButtonLink({
  className = '',
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClassName(variant, className)} {...props} />
}
