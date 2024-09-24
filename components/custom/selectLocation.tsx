import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Separator } from '../ui/separator'

export function SelectLocation() {
  const [popoverOpen, setPopoverOpen] = useState(false)
  return (
    <Popover open={popoverOpen}>
      <PopoverTrigger onClick={() => setPopoverOpen(!popoverOpen)}>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <div className="size-10 text-white font-medium flex items-center justify-center rounded-full bg-orange-700">
              FT
            </div>
            <span className="absolute bottom-0 right-0 top-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex flex-col text-left">
            <div>
              <span className="text-sm font-medium">Fulano de tal</span>
            </div>
            <div>
              <span className="text-sm font-medium text-neutral-500">
                Unidade 2 - Consultorio 1
              </span>
            </div>
          </div>
          <span className="text-sm font-medium">
            {popoverOpen ? (
              <ChevronUp size={14} className="text-neutral-500" />
            ) : (
              <ChevronDown size={14} className="text-neutral-500" />
            )}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-4 flex justify-between">
          <div>
            <span className="text-sm font-medium">Local de atendimento</span>
          </div>
          <div className="cursor-pointer">
            <X
              onClick={() => setPopoverOpen(!popoverOpen)}
              size={15}
              className="text-gray-300"
            />
          </div>
        </div>
        <div>
          <Separator />
        </div>
        <div className="p-4">
          <span className="text-sm font-medium">Painel</span>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecinar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Painel 1</SelectItem>
              <SelectItem value="dark">Painel 2</SelectItem>
              <SelectItem value="system">Painel 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 p-4">
          <div className="flex-col">
            <span className="text-sm font-medium">Local</span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecinar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Consultorio</SelectItem>
                <SelectItem value="dark">Guiche</SelectItem>
                <SelectItem value="system">Sala de Exames</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-col">
            <span className="text-sm font-medium">Número</span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecinar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">1</SelectItem>
                <SelectItem value="dark">2</SelectItem>
                <SelectItem value="system">3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-3 justify-end p-4">
          <Button
            size={'sm'}
            className="bg-neutral-200 text-primary border hover:bg-neutral-300"
            onClick={() => setPopoverOpen(!popoverOpen)}
          >
            Cancelar
          </Button>
          <Button size={'sm'}>Confirmar</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
