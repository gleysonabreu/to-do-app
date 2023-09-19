import '../assets/globals.css'
import type { Metadata } from 'next'
import SessionProvider from '@/components/SessionProvider'
import { Inter } from 'next/font/google'
import { getSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Todo app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  )
}
