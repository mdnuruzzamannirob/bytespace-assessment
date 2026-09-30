'use client'

import { type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'

export function NewsletterForm() {
  const { showToast } = useToast()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    showToast('Newsletter signup is coming soon.', 'info')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Input
          aria-label="Email address"
          autoComplete="email"
          className="sm:max-w-94"
          name="email"
          placeholder="Enter your email"
          required
          type="email"
        />
        <Button className="h-13 min-h-13 self-start" type="submit">
          Subscribe
        </Button>
      </div>
      <p className="mt-6 text-body-xs text-neutral-700">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates from our company.
      </p>
    </form>
  )
}
