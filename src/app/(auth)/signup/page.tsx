import type { Metadata } from 'next'

import { AuthForm } from '@/components/auth/AuthForm'
import { AuthScene } from '@/components/auth/AuthScene'

export const metadata: Metadata = { title: 'Create an Account | ByteSpace' }

export default function SignupPage() {
  return (
    <AuthScene mode="signup">
      <AuthForm mode="signup" />
    </AuthScene>
  )
}
