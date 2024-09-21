'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { LoadingScreen } from './loadScreen'

export function SessionLoader({ children }: PropsWithChildren) {
  const router = useRouter()
  const session = useSession({
    required: false,
    onUnauthenticated() {
      router.replace('/')
    },
  })

  if (session.status === 'loading') {
    return <LoadingScreen />
  }

  return children
}
