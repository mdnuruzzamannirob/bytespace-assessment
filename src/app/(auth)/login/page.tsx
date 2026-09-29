import type { Metadata } from 'next'

import { AuthForm } from '@/components/auth/AuthForm'
import { AuthScene } from '@/components/auth/AuthScene'

export const metadata: Metadata = { title: 'Sign In | ByteSpace' }

export default function LoginPage() {
  return (
    <AuthScene mode="login">
      <AuthForm mode="login" />
    </AuthScene>
  )
}
