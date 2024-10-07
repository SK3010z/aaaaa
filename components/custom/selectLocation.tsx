'use client'
import { useQueueManager } from '@/contexts/queueManagerContext'
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
import { Separator } from '../ui/separator'
import { CloseButton } from './closeButton'
import { CreatableSelect } from './creatableSelect'

export function SelectLocation() {
  const { data } = useSession()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const session = useSession()
  const { api } = useApi()
  const { updateUser } = useQueueManager()
  const [
    storedPanels,
    selectedPanel,
    selectedLocal,
    selectedPosition,
    locals,
    positions,
    setSelectedPanel,
    setPanels,
    setSelectedLocal,
    setSelectedPosition,
    addLocal,
    addPosition,
  ] = usePanelStore((state) => [
    state.panels,
    state.selectedPanel,
    state.selectedLocal,
    state.selectedPosition,
    state.locals,
    state.positions,
    state.actions.setSelectedPanel,
    state.actions.setPanels,
    state.actions.setSelectedLocal,
    state.actions.setSelectedPosition,
    state.actions.addLocal,
    state.actions.addPosition,
  ])

  async function fetchPanels() {
    const result = await api.get<ListPanelResponse>('panel')
    setPanels(result.data)
    return result.data
  }

  useQuery({
    queryFn: fetchPanels,
    queryKey: ['@4senhas-panels-list'],
  })

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger className="group w-96">
        <div className="flex items-center justify-between w-full gap-4 pr-2">
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
              <span className="text-sm font-medium text-neutral-500 truncate">
                {session.data?.user.selectedServiceLocation?.name} -{' '}
                {selectedLocal?.value} {selectedPosition?.value}
              </span>
            </div>
          </div>
          <div className="block">
            <ChevronDown className="text-neutral-500 size-4 group-data-[state=open]:rotate-180 transition-transform" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 mr-2 w-96" sideOffset={8}>
        <div className="p-4 flex justify-between">
          <div>
            <span className="text-sm font-medium">Local de atendimento</span>
          </div>
          <CloseButton onClick={() => setPopoverOpen(false)} />
        </div>
        <div>
          <Separator />
        </div>
        <div className="flex p-4 w-full">
          <CreatableSelect
            label="Painel"
            options={storedPanels?.map((panel) => ({
              label: panel.description,
              value: panel.id,
            }))}
            value={selectedPanel}
            onChange={setSelectedPanel}
            isSearchable={false}
            tabIndex={-1}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 w-full">
          <div className="flex-col w-full">
            <CreatableSelect
              label="Local"
              value={selectedLocal}
              onChange={(option) => {
                updateUser({ deskCaller: option?.value })
                setSelectedLocal(option)
              }}
              tabIndex={-1}
              options={locals}
              onCreateOption={(option) =>
                addLocal({ label: option, value: option })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <CreatableSelect
              label="Posição"
              value={selectedPosition}
              onChange={(option) => {
                updateUser({ location: option?.value })
                setSelectedPosition(option)
              }}
              tabIndex={-1}
              createOptionPosition="first"
              options={positions}
              onCreateOption={(option) =>
                addPosition({ label: option, value: option })
              }
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end p-4">
          <Button
            size="sm"
            className="bg-neutral-50 text-primary border hover:bg-neutral-100"
            onClick={() => setPopoverOpen(!popoverOpen)}
          >
            Cancelar
          </Button>
          <Button onClick={() => setPopoverOpen(!popoverOpen)} size="sm">
            Confirmar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
