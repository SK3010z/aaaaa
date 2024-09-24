'use client'

import { SessionLoader } from '@/components/custom/sessionLoader'
import { TooltipProvider } from '@/components/ui/tooltip'
import { queryClient } from '@/lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

export default function GlobalProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <SessionLoader>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ToastContainer theme="dark" />
            {children}
          </TooltipProvider>
        </QueryClientProvider>
      </SessionLoader>
    </SessionProvider>
  )
}
