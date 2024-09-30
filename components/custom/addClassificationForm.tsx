'use client'

import {
  ClassificationRequestData,
  classificationRequestDataResolver,
} from '@/core/models/validationSchemas/classificationRequestData'
import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import {
  Dialog,
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

export const AddClassificationForm: React.FC = () => {
  const { serviceActive, createClassification } = usePanelAndTotem()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<ClassificationRequestData>({
    resolver: zodResolver(classificationRequestDataResolver),
  })

  async function onClassificationSubmit(data: ClassificationRequestData) {
    try {
      createClassification(data)
      reset({
        name: '',
        active: 'true',
      })
    } catch (error) {
      toast.error('Erro ao cadastrar classificação')
    } finally {
      setIsDialogOpen(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar novo +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Cadastrar classificação</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <form
              onSubmit={handleSubmit(onClassificationSubmit)}
              className="space-y-8"
            >
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 gap-2">
                  <Input
                    id="name"
                    placeholder="Nome"
                    label="Nome"
                    type="name"
                    error={errors?.name?.message}
                    {...register('name')}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="active">Ativo</label>
                  <Controller
                    name="active"
                    control={control}
                    defaultValue={'true'}
                    render={({ field }) => (
                      <Select
                        value={field.value?.toString() || ''}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceActive?.map((item) => (
                            <SelectItem
                              key={item.value?.toString()}
                              value={item.value?.toString() || ''}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  className="bg-neutral-50 text-primary border hover:bg-neutral-100"
                >
                  Cancelar
                </Button>
                <Button type="submit">Cadastrar</Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
