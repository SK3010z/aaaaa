'use client'

import {
  EditServiceRequestData,
  EditServiceRequestDataResolver,
} from '@/core/models/validationSchemas/serviceRequestData'
import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bolt } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export const EditServiceForm: React.FC<{ id: string }> = (data) => {
  const {
    servicePasswordWeight,
    findServicePasswordById,
    updateServicePassword,
  } = usePanelAndTotem()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [serviceData, setServiceData] = useState<EditServiceRequestData>()
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<EditServiceRequestData>({
    resolver: zodResolver(EditServiceRequestDataResolver),
  })

  async function onServiceSubmit(data: EditServiceRequestData) {
    try {
      if (!serviceData || !serviceData.id) return
      updateServicePassword(serviceData.id, data)
    } catch (error) {
      toast.error('Erro ao cadastrar classificação')
    } finally {
      setIsDialogOpen(false)
    }
  }

  const fetchData = useCallback(async () => {
    const service = await findServicePasswordById(data.id)
    setServiceData(service)
  }, [data, findServicePasswordById])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Bolt className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-white">
        <DialogHeader>
          <DialogTitle>Editar serviço</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <form
              onSubmit={handleSubmit(onServiceSubmit)}
              className="space-y-8"
            >
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    defaultValue={serviceData?.description}
                    id="name"
                    placeholder="Nome"
                    label="Nome"
                    type="name"
                    error={errors?.description?.message}
                    {...register('description')}
                  />
                  <Input
                    defaultValue={serviceData?.acronym}
                    id="acronym"
                    placeholder="Sigla"
                    label="Sigla"
                    type="acronym"
                    error={errors?.acronym?.message}
                    {...register('acronym')}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex flex-col gap-2">
                    <label>Peso</label>
                    <Controller
                      name="weight"
                      control={control}
                      defaultValue={`${serviceData?.weight}`}
                      render={({ field }) => (
                        <Select
                          value={field.value?.toString() || ''}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {servicePasswordWeight?.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Input
                    id="observation"
                    placeholder="Observação"
                    label="Observação"
                    type="observation"
                    defaultValue={serviceData?.observation}
                    error={errors?.observation?.message}
                    {...register('observation')}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="bg-neutral-50 text-primary border hover:bg-neutral-100"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit">Cadastrar</Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
