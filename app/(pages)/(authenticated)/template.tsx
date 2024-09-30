'use client'
import Header from '@/components/custom/header'
import { NavBar } from '@/components/custom/navbar'
import { QueueManagerProvider } from '@/contexts/queueManagerContext'
import { PropsWithChildren } from 'react'

export default function AuthenticatedTemplate({ children }: PropsWithChildren) {
  return (
    <QueueManagerProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <NavBar />

        <div className="flex flex-col flex-1">
          <Header />
          <main className="bg-screen-background flex flex-col flex-1">
            {children}
          </main>
        </div>
      </div>
    </QueueManagerProvider>
  )
}
