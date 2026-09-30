type FollowButtonProps = { followed: boolean; onToggle: () => void }

export function FollowButton({ followed, onToggle }: FollowButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={followed}
      onClick={onToggle}
      className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${followed ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-lime-400 text-neutral-950 hover:bg-lime-300'}`}
    >
      {followed ? 'Following' : 'Follow'}
    </button>
  )
}
