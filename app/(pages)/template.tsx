'use client'

import { SessionLoader } from '@/components/custom/sessionLoader'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

export default function GlobalProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <SessionLoader>
        <TooltipProvider>
          <ToastContainer theme="dark" />
          {children}
        </TooltipProvider>
      </SessionLoader>
    </SessionProvider>
  )
}
