import type { ReactNode } from 'react'

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="min-h-svh overflow-hidden bg-blue-800 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-primary-foreground)_12%,transparent)_2px,transparent_2px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-primary-foreground)_12%,transparent)_2px,transparent_2px)] bg-size-[120px_120px] text-neutral-50 lg:min-h-256">
      {children}
    </main>
  )
}
