'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { FaFacebook, FaGoogle } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type AuthFormProps = {
  mode: 'login' | 'signup'
}

function AuthField({
  label,
  name,
  placeholder,
  type,
  autoComplete,
}: {
  label: string
  name: string
  placeholder: string
  type: 'text' | 'email' | 'password'
  autoComplete: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-label-s text-neutral-950" htmlFor={name}>
        {label}
      </label>
      <Input
        autoComplete={autoComplete}
        id={name}
        minLength={type === 'password' ? 8 : undefined}
        name={name}
        placeholder={placeholder}
        required
        type={type}
        variant="field"
      />
    </div>
  )
}

export function AuthForm({ mode }: AuthFormProps) {
  const [message, setMessage] = useState('')
  const isLogin = mode === 'login'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(
      isLogin
        ? 'Sign in is not connected yet. No account was accessed.'
        : 'Account creation is not connected yet. No account was created.',
    )
  }

  return (
    <section className="flex w-full max-w-145 self-start flex-col rounded-3xl bg-white px-6 pt-8 pb-9 text-neutral-950 shadow-sm sm:mx-auto sm:px-12 sm:pt-12 xl:mt-30 xl:min-h-196 xl:px-16 xl:pt-15 xl:pb-8">
      <div>
        <p className="text-body-l text-blue-800">
          {isLogin ? 'Sign In' : 'Create an Account'}
        </p>
        <h1 className="font-heading text-[clamp(2.25rem,4vw,2.75rem)] leading-[1.2] font-semibold tracking-[-0.01em] text-neutral-950">
          {isLogin ? (
            'Welcome Back'
          ) : (
            <>
              Welcome to
              <br />
              ByteSpace
            </>
          )}
        </h1>

        <form className="mt-10 flex flex-col gap-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <AuthField
              autoComplete="name"
              label="Full Name"
              name="name"
              placeholder="Jamie Davis"
              type="text"
            />
          )}
          <AuthField
            autoComplete="email"
            label="Email"
            name="email"
            placeholder="designer@example.com"
            type="email"
          />
          <AuthField
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            label="Password"
            name="password"
            placeholder="********"
            type="password"
          />
          <Button className="self-end" type="submit">
            {isLogin ? 'Sign In' : 'Continue'}
          </Button>
        </form>
        {message && (
          <p className="mt-4 text-body-s text-neutral-700" role="status">
            {message}
          </p>
        )}

        {isLogin && (
          <div className="mt-18">
            <div className="flex items-center gap-3 text-body-l text-neutral-400">
              <span className="h-px flex-1 bg-neutral-200" />
              <span>or</span>
              <span className="h-px flex-1 bg-neutral-200" />
            </div>
            <div className="mt-10 flex justify-center gap-4">
              <button
                aria-label="Sign in with Facebook"
                className="flex size-18 items-center justify-center rounded-3xl border border-neutral-200 text-black transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none"
                onClick={() =>
                  setMessage('Facebook sign in is not connected yet.')
                }
                type="button"
              >
                <FaFacebook aria-hidden="true" className="size-10" />
              </button>
              <button
                aria-label="Sign in with Google"
                className="flex size-18 items-center justify-center rounded-3xl border border-neutral-200 text-black transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none"
                onClick={() =>
                  setMessage('Google sign in is not connected yet.')
                }
                type="button"
              >
                <FaGoogle aria-hidden="true" className="size-10" />
              </button>
            </div>
          </div>
        )}
      </div>

      <p
        className={`mt-12 text-center text-body-m ${isLogin ? 'xl:mt-auto' : 'xl:mt-auto xl:pb-10'}`}
      >
        <span className={isLogin ? 'text-neutral-400' : 'text-neutral-700'}>
          {isLogin ? 'New user?' : 'Already have an account?'}
        </span>{' '}
        <Link
          className="text-blue-800 hover:underline"
          href={isLogin ? '/signup' : '/login'}
        >
          {isLogin ? 'Create an account' : 'Login'}
        </Link>
      </p>
    </section>
  )
}
