'use client'
import { useQueueManager } from '@/contexts/queueManagerContext'
import { useQueueStore } from '@/stores/queueStore'
import { Megaphone, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { CallFiltersForm } from './callFiltersForm'
import { NewPasswordDialog } from './newPasswordDialog'

export function CallTableFilters() {
  const { callPassword, setSearchPassword } = useQueueManager()
  const [passwords] = useQueueStore((state) => [state.passwords])
  function handleCallNextPassword() {
    const nextPassword = passwords[0]
    if (nextPassword) {
      callPassword(nextPassword.id, nextPassword.fowarded)
    }
  }

  return (
    <div className="flex items-center justify-between p-6">
      <div className="relative flex items-center">
        <Input
          className="h-10 pl-10 min-w-[20rem]"
          placeholder="pesquisar"
          onInputCapture={(e) => {
            setSearchPassword(e.currentTarget.value)
          }}
        />
        <Search className="size-4 absolute left-4" />
      </div>

      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <CallFiltersForm />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span>Filtrar</span>
          </TooltipContent>
        </Tooltip>

        <div className="h-6 w-px bg-neutral-300" />

        <NewPasswordDialog />
        <Button
          onClick={handleCallNextPassword}
          disabled={passwords.length === 0}
        >
          <Megaphone />
          <span>Chamar próxima senha</span>
        </Button>
      </div>
    </div>
  )
}
