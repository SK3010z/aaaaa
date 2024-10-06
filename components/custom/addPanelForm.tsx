'use client'

import {
  editPanelRequestData,
  editPanelRequestDataResolver,
} from '@/core/models/validationSchemas/panelRequestData'
import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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

export const AddPanelForm: React.FC = () => {
  const { panelLayouts, passwordCallConfigurations, addPanel, serviceActive, qacodeTotemConfigurations } =
    usePanelAndTotem()
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<editPanelRequestData>({
    resolver: zodResolver(editPanelRequestDataResolver),
  })
  const { replace } = useRouter()

  async function onSubmit(data: editPanelRequestData) {
    try {
      addPanel(data)
      replace(`/lista-de-painel-e-totem`)
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
    <div className="px-8 pb-6 flex flex-col flex-1 py-6">
      <div className="bg-white border rounded flex-col flex-1 max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-4 p-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-text">
                Empresa
              </label>
              <Select name="locationId">
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
            </div>

            <div>
              <label htmlFor="name" className="text-sm font-medium text-text">
                Modelo do Painel
              </label>
              <Controller
                name="layout"
                control={control}
                render={({ field }) => (
                  <>
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
                    <span className="text-red-500 text-sm">
                      {errors?.layout?.message?.toString()}
                    </span>
                  </>
                )}
              />
            </div>

            <div>
              <label htmlFor="name" className="text-sm font-medium text-text">
                Ativo
              </label>
              <Controller
                name="active"
                defaultValue="true"
                control={control}
                render={({ field }) => (
                  <>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceActive?.map((item) => (
                          <SelectItem
                            key={item.value.toString()}
                            value={item.value.toString()}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-red-500 text-sm">
                      {errors?.active?.message?.toString()}
                    </span>
                  </>
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
                render={({ field }) => (
                  <>
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
                    <span className="text-red-500 text-sm">
                      {errors?.callConfig?.message?.toString()}
                    </span>
                  </>
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
                error={errors?.description?.message?.toString()}
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
                <Controller
                  name="videoProvider"
                  control={control}
                  defaultValue="YT"
                  render={({ field }) => (
                    <Select value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Youtube" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YT">Youtube</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="items-center w-auto">
                <label
                  htmlFor="videoUrl"
                  className="text-sm font-medium text-text"
                >
                  Link do video
                </label>
                <Input
                  id="videoUrl"
                  placeholder="URL do video"
                  error={errors?.videoUrl?.message?.toString()}
                  {...register('videoUrl')}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="items-center">
                <label
                  htmlFor="qrTitle"
                  className="text-sm font-medium text-text"
                >
                  Título do QRCode
                </label>
                <Input
                  id="qrTitle"
                  placeholder="URL do video"
                  error={errors?.qrTitle?.message?.toString()}
                  {...register('qrTitle')}
                />
              </div>
              <div>
                <label
                  htmlFor="qrUrl"
                  className="text-sm font-medium text-text"
                >
                  Link do QRCode
                </label>
                <Input
                  id="qrUrl"
                  placeholder="URL do video"
                  error={errors?.qrUrl?.message?.toString()}
                  {...register('qrUrl')}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <h3>Configuração do Totem</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="items-center w-auto">
                <label htmlFor="name" className="text-sm font-medium text-text">
                  Modelo do QRCode Impresso
                </label>
                <Controller
                  name="qrcodeTotemConfig"
                  control={control}
                  defaultValue="showQRCode"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {qacodeTotemConfigurations.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))} 
                      </SelectContent>
                  </Select>
                  )}
                /> 
              </div> 
              <div data-show={watch('qrcodeTotemConfig') === 'QRCodeLink'} className="items-center w-auto data-[show=false]:hidden">
                <label htmlFor="name" className="text-sm font-medium text-text">
                  Link do QRCode
                </label>
                <Input
                  id="qrcodeLinkTotem"
                  placeholder="Url" 
                  error={errors?.qrcodeLinkTotem?.message}
                  {...register('qrcodeLinkTotem')}
                />
              </div> 
            </div> 
          </div>

          <div className="flex flex-col gap-4 flex-wrap p-6">
            <label htmlFor="">Tema do Painel</label>
            <Controller
              control={control}
              name="theme"
              defaultValue="darkBlue"
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
      </div>
    </div>
  )
}
