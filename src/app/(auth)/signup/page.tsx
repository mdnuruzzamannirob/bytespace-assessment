import type { Metadata } from 'next'
import { Suspense } from 'react'

import { AuthForm } from '@/components/auth/AuthForm'
import { AuthScene } from '@/components/auth/AuthScene'

export const metadata: Metadata = { title: 'Create an Account | ByteSpace' }

export default function SignupPage() {
  return (
    <AuthScene mode="signup">
      <Suspense fallback={null}>
        <AuthForm mode="signup" />
      </Suspense>
    </AuthScene>
  )
}
