'use client'

import { ServiceRequestData, ServiceRequestDataResolver } from '@/core/models/validationSchemas/serviceRequestData'
import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export const AddServiceForm: React.FC = () => {
  const { serviceActive, servicePasswordWeight, createServicePasswordWithPanel, panelId } = usePanelAndTotem();  
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    handleSubmit,
    register, 
    control,
    reset,
    formState: { errors },
  } = useForm<ServiceRequestData>({
    resolver: zodResolver(ServiceRequestDataResolver),
  })
  
  async function onServiceSubmit(data: ServiceRequestData) {
    try {
      setLoading(true) 
      createServicePasswordWithPanel(panelId, data) 
      reset(
        {
          name: '',
          acronym: '',
          weight: '1',
          active: 'true',
          priority: 'false',
          superPriority: 'false',
          observation: ''
        }
      )  
    } catch (error) { 
      toast.error('Erro ao cadastrar classificação')
    } finally {
      setIsDialogOpen(false)
      setLoading(false)
    }
  }

  return (  
    <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button >Adicionar novo +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-white" >
        <DialogHeader>
          <DialogTitle>Cadastrar serviço</DialogTitle> 
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
             <form onSubmit={handleSubmit(onServiceSubmit)} className="space-y-8">
               <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-2"> 
                        <Input
                          id="name"
                          placeholder="Nome"
                          label="Nome"
                          type="name"
                          error={errors?.name?.message}
                          {...register('name')}
                        />
                         <Input
                          id="acronym"
                          placeholder="Sigla"
                          label="Sigla"
                          type="acronym"
                          error={errors?.acronym?.message}
                          {...register('acronym')}
                        />
                    </div>  
                    <div className="grid grid-cols-1 gap-2">
                        <div className='flex flex-col gap-2'> 
                          <label>Peso</label>
                          <Controller
                              name='weight'
                              control={control}
                              defaultValue="1"
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
                                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem> 
                                    ))}
                                  </SelectContent>
                                </Select>
                           )}
                           />
                        </div> 
                    </div>  

                    <div className="grid grid-cols-1 gap-2">
                        <div className='flex flex-col gap-2'> 
                          <label>Super Prioridade</label>  
                          <Controller
                              name='superPriority'
                              control={control}
                              defaultValue="false"
                              render={({ field }) => (
                                <Select 
                                value={field.value?.toString() || ''}
                                onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                      {serviceActive.map((item) => (
                                        <SelectItem key={(item.value).toString()} value={(item.value).toString()}>{item.label}</SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select> 
                              )}
                            />
                        </div> 
                    </div>   
                    <div className="grid grid-cols-2 gap-2">
                        <div> 
                            <label htmlFor="active">Ativo</label> 
                            <Controller 
                              name='active'
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
                                      <SelectItem  value={item.value?.toString() || ''}>
                                        {item.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                        </div>
                        <div> 
                            <label htmlFor="priority">Prioridade</label> 
                            <Controller
                              name='priority'
                              control={control}
                              defaultValue="false"
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
                                      <SelectItem  value={item.value?.toString() || ''}>
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
                        error={errors?.observation?.message}
                        {...register('observation')}
                      />
                    </div> 
                </div>  
                <div className='flex justify-between'>
                    <Button type='button' className="bg-neutral-50 text-primary border hover:bg-neutral-100" >Cancelar</Button>
                    <Button type="submit" >Cadastrar</Button>
                </div>
              </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
   
  )
}
