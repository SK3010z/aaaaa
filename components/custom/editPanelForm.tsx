'use client'

import { listOnePanelResponse } from '@/core/models/httpResponses/listOnePanelResponse'
import {
  PanelRequestData,
  panelRequestDataResolver,
} from '@/core/models/validationSchemas/panelRequestData'
import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { IndividualColorPicker } from './individualColorPicker'

export const EditPanelForm: React.FC<{
  panel?: listOnePanelResponse | null
}> = (data) => {
  const { panelLayouts, passwordCallConfigurations, panelId, updatePanel } =
    usePanelAndTotem()
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<PanelRequestData>({
    resolver: zodResolver(panelRequestDataResolver),
  })

  async function onSubmit(data: PanelRequestData) {
    try {
      updatePanel(panelId, data)
    } catch (error) {
      console.log('error')
    } finally {
      console.log('finally')
    }
  }
  const session = useSession()

  const locationsSelect = session.data?.user.access.find(
    (item) => item.id === session.data?.user?.selectedContract?.id,
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-4 p-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-text">
            Empresa
          </label>
          <Controller
            name="locationId"
            control={control}
            defaultValue={data.panel?.locationId}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {locationsSelect?.service_locations.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <label htmlFor="name" className="text-sm font-medium text-text">
            Modelo do Painel
          </label>
          <Controller
            name="layout"
            control={control}
            defaultValue={data.panel?.layout}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {panelLayouts?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <label htmlFor="name" className="text-sm font-medium text-text">
            Configuração de chamada
          </label>
          <Controller
            name="callConfig"
            control={control}
            defaultValue={(data.panel?.callConfig)??'name'}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {passwordCallConfigurations?.map((item) => (
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
      <div className="flex flex-wrap gap-4 p-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-text">
            Nome
          </label>
          <Input
            id="name"
            placeholder="Nome"
            defaultValue={data.panel?.description}
            error={errors?.description?.message}
            {...register('description')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <h3>Configuração de mídia</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="items-center w-auto">
            <label htmlFor="name" className="text-sm font-medium text-text">
              Provedor de video
            </label>
            <Select disabled={true}>
              <SelectTrigger>
                <SelectValue placeholder="Youtube" />
              </SelectTrigger>
            </Select>
          </div>

          <div className="items-center w-auto">
            <label htmlFor="videoUrl" className="text-sm font-medium text-text">
              Link do video
            </label>
            <Input
              id="videoUrl"
              placeholder="URL do video"
              defaultValue={data.panel?.videoUrl}
              {...register('videoUrl')}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="items-center">
            <label htmlFor="qrTitle" className="text-sm font-medium text-text">
              Título do QRCode
            </label>
            <Input
              id="qrTitle"
              placeholder="URL do video"
              defaultValue={data.panel?.qrTitle}
              {...register('qrTitle')}
            />
          </div>
          <div>
            <label htmlFor="qrUrl" className="text-sm font-medium text-text">
              Link do QRCode
            </label>
            <Input
              id="qrUrl"
              placeholder="URL do video"
              defaultValue={data.panel?.qrUrl}
              {...register('qrUrl')}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-wrap p-6">
        <label htmlFor="">Tema do Painel</label>
        <Controller
          control={control}
          name="theme"
          defaultValue={data.panel?.theme}
          render={({ field }) => (
            <RadioGroup className="flex gap-4 ml-[-10px]">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  asChild
                  key={0}
                  className="bg-cyan-300"
                  value="oceanBlue"
                  id="oceanBlue"
                />
                <IndividualColorPicker
                  isChecked={field.value === 'oceanBlue'}
                  pickerColorClassName="bg-cyan-300"
                  onClick={() => {
                    field.onChange('oceanBlue')
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  asChild
                  key={1}
                  className="bg-yellow-500"
                  value="orange"
                  id="bg-yellow-500"
                />
                <IndividualColorPicker
                  isChecked={field.value === 'orange'}
                  pickerColorClassName="bg-yellow-500"
                  onClick={() => {
                    field.onChange('orange')
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  asChild
                  key={2}
                  className="bg-primary"
                  value="yellow"
                  id="bg-primary"
                />
                <IndividualColorPicker
                  isChecked={field.value === 'yellow'}
                  pickerColorClassName="bg-primary"
                  onClick={() => {
                    field.onChange('yellow')
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  asChild
                  key={3}
                  className="bg-blue-500"
                  value="darkBlue"
                  id="bg-blue-500"
                />
                <IndividualColorPicker
                  isChecked={field.value === 'darkBlue'}
                  pickerColorClassName="bg-blue-500"
                  onClick={() => {
                    field.onChange('darkBlue')
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  asChild
                  key={4}
                  className="bg-green-500"
                  value="green"
                  id="bg-green-500"
                />
                <IndividualColorPicker
                  isChecked={field.value === 'green'}
                  pickerColorClassName="bg-green-500"
                  onClick={() => {
                    field.onChange('green')
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  asChild
                  key={5}
                  className="bg-purple-500"
                  value="purple"
                  id="bg-purple-500"
                />
                <IndividualColorPicker
                  isChecked={field.value === 'purple'}
                  pickerColorClassName="bg-purple-500"
                  onClick={() => {
                    field.onChange('purple')
                  }}
                />
              </div>
            </RadioGroup>
          )}
        />
      </div>
      <div className="flex justify-start p-4">
        <div>
          <Button type="submit" className="size-sm">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  )
}
