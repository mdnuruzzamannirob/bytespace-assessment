'use client'

import Image from 'next/image'
import { useState } from 'react'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return (
    parts.length > 1 ? parts[0][0] + parts.at(-1)?.[0] : parts[0]?.slice(0, 2) || 'BS'
  ).toUpperCase()
}

export function CreatorAvatar({
  name,
  src,
  size = 64,
  className = '',
}: {
  name: string
  src?: string
  size?: number
  className?: string
}) {
  const [hasImage, setHasImage] = useState(Boolean(src))
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-sm font-semibold text-blue-800 ${className}`}
      style={{ width: size, height: size }}
    >
      {hasImage && src ? (
        <Image
          src={src}
          alt={`${name} profile`}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          onError={() => setHasImage(false)}
        />
      ) : (
        getInitials(name)
      )}
    </span>
  )
}
