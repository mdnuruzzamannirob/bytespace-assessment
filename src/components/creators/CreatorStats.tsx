export function CreatorStats({
  products,
  followers,
  variant = 'card',
}: {
  products: number
  followers: number
  variant?: 'card' | 'pills'
}) {
  if (variant === 'pills') {
    return (
      <div className="flex flex-wrap gap-3">
        <span className="rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950">
          <strong className="mr-2 text-blue-700">{products}</strong>Products
        </span>
        <span className="rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950">
          <strong className="mr-2 text-blue-700">{followers}</strong>Followers
        </span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 divide-x divide-neutral-200 rounded-xl bg-neutral-50 py-2.5 text-center">
      <span className="text-xs text-neutral-500">
        <strong className="block font-heading text-lg text-blue-700">
          {products}
        </strong>
        Products
      </span>
      <span className="text-xs text-neutral-500">
        <strong className="block font-heading text-lg text-blue-700">
          {followers}
        </strong>
        Followers
      </span>
    </div>
  )
}
