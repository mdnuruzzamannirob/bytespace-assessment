export function CreatorStats({
  products,
  followers,
}: {
  products: number
  followers: number
}) {
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
