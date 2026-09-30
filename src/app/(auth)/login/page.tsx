import type { Metadata } from 'next'
import { Suspense } from 'react'

import { AuthForm } from '@/components/auth/AuthForm'
import { AuthScene } from '@/components/auth/AuthScene'

export const metadata: Metadata = { title: 'Sign In | ByteSpace' }

export default function LoginPage() {
  return (
    <AuthScene mode="login">
      <Suspense fallback={null}>
        <AuthForm mode="login" />
      </Suspense>
    </AuthScene>
  )
}
