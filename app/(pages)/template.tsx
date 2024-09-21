'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

export default function GlobalProviders({ children }: PropsWithChildren) {
  return (
    <TooltipProvider>
      <ToastContainer />
      {children}
    </TooltipProvider>
  )
}
