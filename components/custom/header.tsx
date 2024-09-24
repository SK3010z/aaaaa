'use client'
import { Bell, Settings } from 'lucide-react'
import { Button } from '../ui/button'
import { BreadCrumbs } from './breadCrumbs'

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-4 border-b">
      <BreadCrumbs />

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <Button className="size-10 p-0" variant="ghost">
            <Settings className="size-4" />
          </Button>
          <Button className="size-10 p-0" variant="ghost">
            <Bell className="size-4" />
          </Button>
        </div>

        <div className="h-8 w-px bg-neutral-200" />

        <div className="flex items-center gap-4">
          <div className="size-10 text-white font-medium flex items-center justify-center rounded-full bg-orange-700">
            FT
          </div>
          <span className="text-sm font-medium">Fulano de tal</span>
        </div>
      </div>
    </header>
  )
}
