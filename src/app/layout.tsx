import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import type { ReactNode } from 'react'

import { AuthProvider } from '@/components/auth/AuthProvider'
import './globals.css'

const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ByteSpace — Learn without limits',
  description:
    'Discover creative courses, learn new skills, and grow with ByteSpace.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
