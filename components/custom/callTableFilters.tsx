'use client'
import { Megaphone, RefreshCcw, Search, SlidersHorizontal } from 'lucide-react'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { NewPasswordDialog } from './newPasswordDialog'

export function CallTableFilters() {
  function handleCallNextPassword() {
    toast.info(<span className="font-medium">Chamando senha Serviço-0001</span>)
  }

  return (
    <div className="flex items-center justify-between p-6">
      <div className="relative flex items-center">
        <Input className="h-10 pl-10 min-w-[20rem]" placeholder="pesquisar" />
        <Search className="size-4 absolute left-4" />
      </div>

      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="size-9 p-0">
              <RefreshCcw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Atualizar</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="size-9 p-0">
              <SlidersHorizontal />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Filtrar</span>
          </TooltipContent>
        </Tooltip>

        <div className="h-6 w-px bg-neutral-300" />

        <NewPasswordDialog />
        <Button onClick={handleCallNextPassword}>
          <Megaphone />
          <span>Chamar próxima senha</span>
        </Button>
      </div>
    </div>
  )
}
