import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  variant?: 'light' | 'dark'
  className?: string
}

export function Logo({ variant = 'light', className = '' }: LogoProps) {
  return (
    <Link
      aria-label="ByteSpace home"
      className={`inline-flex shrink-0 items-center focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500 ${className}`}
      href="/"
    >
      <Image
        alt="ByteSpace"
        height={37}
        priority={variant === 'light'}
        src={`/assets/bytespace-logo-${variant}.png`}
        width={171}
      />
    </Link>
  )
}
