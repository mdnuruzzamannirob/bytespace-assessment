import type { ReactNode } from 'react'

import { Logo } from '@/components/ui/logo'
import { AuthArtwork } from './AuthArtwork'

type AuthSceneProps = {
  mode: 'login' | 'signup'
  children: ReactNode
}

const copy = {
  login: {
    title: 'Sign in with ease',
    description:
      'Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.',
  },
  signup: {
    title: 'Sign up and come in',
    description:
      'The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost.',
  },
} as const

export function AuthScene({ mode, children }: AuthSceneProps) {
  return (
    <div className="relative z-10 mx-auto grid w-full max-w-300 gap-10 px-5 pt-6 pb-10 sm:px-8 xl:grid-cols-[500px_580px] xl:gap-30 xl:px-0 xl:pt-0 xl:pb-0">
      <section className="relative xl:min-h-256">
        <div className="xl:pt-9">
          <Logo variant="symbol" />
          <div className="mt-8 max-w-119 xl:mt-12">
            <h2 className="font-heading text-heading-xs text-neutral-50">{copy[mode].title}</h2>
            <p className="text-body-l mt-4 text-neutral-50">{copy[mode].description}</p>
          </div>
        </div>
        <div className="absolute top-76 left-0 hidden xl:block">
          <AuthArtwork />
        </div>
      </section>
      {children}
    </div>
  )
}
