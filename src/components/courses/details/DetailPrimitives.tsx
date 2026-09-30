import Image from 'next/image'

const assets = '/assets/course-details'

export function DetailIcon({ name, size = 24 }: { name: string; size?: number }) {
  return (
    <Image
      src={`${assets}/${name}`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className="shrink-0"
    />
  )
}

export function Stars({ count = 5, size = 24 }: { count?: number; size?: number }) {
  return (
    <span aria-label={`${count} out of 5 stars`} className="flex gap-1">
      {Array.from({ length: count }, (_, index) => (
        <DetailIcon key={index} name="rating-star.svg" size={size} />
      ))}
    </span>
  )
}

export { assets }
