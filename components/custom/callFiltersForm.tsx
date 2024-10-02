'use client'

import { useApi } from '@/core/hooks/useApi'
import { passwordQueueTypeResponse } from '@/core/models/httpResponses/passwordQueueTypeResponse'
import { fieldFilter, Service } from '@/core/models/model/callFilter'
import { useCallFiltersStore } from '@/stores/callFiltersStore'
import { useQuery } from '@tanstack/react-query'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { MultiSelect } from '../ui/multiSelect'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Separator } from '../ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

export const CallFiltersForm: React.FC = () => {
  const { api } = useApi()
  const [
    selectedService,
    selectedLocal,
    selectedPosition,
    selectedPriority,
    selectedStatus,
    selectedOrder,
    setSelectedService,
    setSelectedLocal,
    setSelectedPosition,
    setSelectedPriority,
    setSelectedStatus,
    setSelectedOrder,
  ] = useCallFiltersStore((state) => [
    state.selectedService,
    state.selectedLocal,
    state.selectedPosition,
    state.selectedPriority,
    state.selectedStatus,
    state.selectedOrder,
    state.actions.setSelectedService,
    state.actions.setSelectedLocal,
    state.actions.setSelectedPosition,
    state.actions.setSelectedPriority,
    state.actions.setSelectedStatus,
    state.actions.setSelectedOrder,
  ])

  async function getPasswordQueueTypes() {
    const result = await api.get<passwordQueueTypeResponse>(
      'service-password/panel',
    )
    return result.data.servicePasswords
  }

  const { data: services } = useQuery({
    queryFn: getPasswordQueueTypes,
    queryKey: ['@saudehd-password-queue-avaliable-types'],
  })

  function handleFilter(field: fieldFilter, value: string | Service[]) {
    if (field === 'local') {
      if (selectedLocal === value) {
        setSelectedLocal('')
        return
      }
      setSelectedLocal(value as string)
    }
    if (field === 'position') {
      if (selectedPosition === value) {
        setSelectedPosition('')
        return
      }
      setSelectedPosition(value as string)
    }
    if (field === 'service') {
      if (selectedService === value) {
        setSelectedService([])
        return
      }
      setSelectedService(value as Service[])
    }
    if (field === 'priority') {
      if (selectedPriority.includes(value as string)) {
        setSelectedPriority(selectedPriority.filter((item) => item !== value))
        return
      }
      setSelectedPriority([...selectedPriority, value as string])
    }
    if (field === 'status') {
      if (selectedStatus.includes(value as string)) {
        setSelectedStatus(selectedStatus.filter((item) => item !== value))
        return
      }
      setSelectedStatus([...selectedStatus, value as string])
    }
    if (field === 'order') {
      if (selectedOrder === value) {
        setSelectedOrder('')
        return
      }
      setSelectedOrder(value as string)
    }
  }

  const priority = [
    { label: 'Normal', value: 'normal' },
    { label: 'Prioridade', value: 'priority' },
    { label: 'Super Prioridade', value: 'superPriority' },
  ]

  const status = [
    { label: 'Encaminhado', value: 'forwarded' },
    { label: 'Encerrado', value: 'closed' },
    { label: 'Iniciou', value: 'started' },
  ]

  const order = [
    { label: 'Tempo de espera', value: 'waitTime' },
    { label: 'Horário', value: 'hour' },
  ]

  function clearFilters() {
    setSelectedLocal('')
    setSelectedPosition('')
    setSelectedService([])
    setSelectedPriority([])
    setSelectedStatus([])
    setSelectedOrder('')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <SlidersHorizontal />
      </SheetTrigger>
      <SheetContent className="bg-white flex flex-col p-0 !max-w-[35rem] overflow-auto">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>FIltro de listagem</SheetTitle>
          <SheetDescription>
            Encontre facilmente selecionando as informações desejadas
          </SheetDescription>
        </SheetHeader>
        <Separator className="mt-4" />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4 px-4">
            <label htmlFor="">Encaminhadas</label>
          </div>
          <div className="grid grid-cols-2 items-center gap-4 px-4">
            <div>
              <label htmlFor="">Local</label>
              <Select
                onValueChange={(e) => handleFilter('local', e)}
                defaultValue={selectedLocal}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consultorio">Consultorio</SelectItem>
                  <SelectItem value="Guiche">Guiche</SelectItem>
                  <SelectItem value="Sala">Sala</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="">Posição</label>
              <Select
                onValueChange={(e) => handleFilter('position', e)}
                defaultValue={selectedPosition}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {['1', '2', '3', '4'].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 items-center gap-4  px-4">
            <div>
              <label htmlFor="">Serviço</label>
              <MultiSelect
                key={services?.length}
                isMulti
                onChange={(value) =>
                  handleFilter('service', value as Service[])
                }
                options={services?.map((service) => ({
                  value: service.id,
                  label: service.description,
                }))}
                defaultValue={selectedService}
                isClearable
                selectAllButtonVisible={false}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Separator className="my-4" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4 px-4">
            <label htmlFor="">Prioridade</label>
          </div>
          <div className="flex grid-cols-3 items-center gap-4  px-4">
            {priority.map((item) => (
              <Button
                data-selected={selectedPriority.includes(item.value)}
                type="submit"
                size="sm"
                className="bg-white text-primary border border-neutral-200 hover:bg-neutral-50 data-[selected=true]:bg-primary data-[selected=true]:text-white"
                key={item.value}
                onClick={() => handleFilter('priority', item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 items-center gap-4 px-4">
            <Separator className="my-4" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4  px-4">
            <label htmlFor="">Status</label>
          </div>
          <div className="flex grid-cols-3 items-center gap-4  px-4">
            {status.map((item) => (
              <Button
                data-selected={selectedStatus.includes(item.value)}
                type="submit"
                size="sm"
                className="bg-white text-primary border border-neutral-200 hover:bg-neutral-50 data-[selected=true]:bg-primary data-[selected=true]:text-white"
                key={item.value}
                onClick={() => handleFilter('status', item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Separator className="my-4" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4 px-4">
            <label htmlFor="">Ordenar por</label>
          </div>
          <div className="flex grid-cols-3 items-center gap-4 px-4">
            {order.map((item) => (
              <Button
                data-selected={item.value === selectedOrder}
                type="submit"
                size="sm"
                className="bg-white text-primary border border-neutral-200 hover:bg-neutral-50 data-[selected=true]:bg-primary data-[selected=true]:text-white"
                key={item.value}
                onClick={() => handleFilter('order', item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <SheetFooter className="flex !justify-between mt-auto pb-4 px-4">
          <SheetClose asChild>
            <Button
              type="button"
              size="sm"
              className="bg-white text-primary border border-neutral-200 hover:bg-neutral-50"
              onClick={() => clearFilters()}
            >
              Limpar filtro
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit" size="sm">
              Filtrar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
