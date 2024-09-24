'use client'
import { useApi } from '@/core/hooks/useApi'
import { ListPanelResponse } from '@/core/models/httpResponses/listPanelResponse'
import { getFirstAndSecondName } from '@/core/utils/getFirstAndSecondName'
import { getInitials } from '@/core/utils/getInitials'
import { usePanelStore } from '@/stores/panelStore'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { useSession } from 'next-auth/react'
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
import { CloseButton } from './closeButton'

export function SelectLocation() {
  const { data } = useSession()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const session = useSession()
  const { api } = useApi()
  const [storedPanels, selectedPanel, setSelectedPanel, setPanels] =
    usePanelStore((state) => [
      state.panels,
      state.selectedPanel,
      state.actions.setSelectedPanel,
      state.actions.setPanels,
    ])

  async function fetchPanels() {
    const result = await api.get<ListPanelResponse>('panel')
    setPanels(result.data)
    return result.data
  }

  const { data: panels } = useQuery({
    queryFn: fetchPanels,
    queryKey: ['@4senhas-panels-list'],
  })

  function onPanelChange(panelId: string) {
    const panel = storedPanels.find((panel) => panel.id === panelId)
    if (panel) {
      setSelectedPanel(panel)
    }
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger className="group">
        <div className="flex items-center gap-4 pr-2">
          <div className="relative flex items-center">
            <div className="size-10 text-white font-medium flex items-center justify-center rounded-full bg-orange-700">
              {getInitials(data?.user.name).toUpperCase()}
            </div>
            <span className="absolute bottom-0 right-0 top-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex flex-col text-left">
            <div>
              <span className="text-sm font-medium">
                {getFirstAndSecondName(data?.user.name)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-neutral-500">
                {session.data?.user.selectedServiceLocation?.name} - Consultorio
                1
              </span>
            </div>
          </div>
          <ChevronDown className="text-neutral-500 size-4 group-data-[state=open]:rotate-180 transition-transform" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 mr-2" sideOffset={8}>
        <div className="p-4 flex justify-between">
          <div>
            <span className="text-sm font-medium">Local de atendimento</span>
          </div>
          <CloseButton onClick={() => setPopoverOpen(false)} />
        </div>
        <div>
          <Separator />
        </div>
        <div className="p-4">
          <span className="text-sm font-medium">Painel</span>
          <Select value={selectedPanel?.id} onValueChange={onPanelChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecinar" />
            </SelectTrigger>
            <SelectContent>
              {panels?.map((panel, index) => (
                <SelectItem key={panel.id} value={panel.id}>
                  {panel.description || `Painel ${index + 1}`}
                </SelectItem>
              ))}
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
            className="bg-neutral-50 text-primary border hover:bg-neutral-100"
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
