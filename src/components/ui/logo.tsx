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
      {variant === 'light' ? (
        <Image
          alt="ByteSpace"
          height={37}
          priority
          src="/assets/bytespace-logo-light.png"
          width={171}
        />
      ) : (
        <span className="inline-flex items-center gap-2">
          <Image
            alt=""
            aria-hidden="true"
            height={32}
            src="/assets/bytespace-symbol-lime.png"
            width={29}
          />
          <span className="font-sans text-2xl font-black tracking-tight text-neutral-950">
            ByteSpace
          </span>
        </span>
      )}
    </Link>
  )
}
