'use client'

import { useApi } from "@/core/hooks/useApi"
import { passwordQueueTypeResponse } from "@/core/models/httpResponses/passwordQueueTypeResponse"
import { useCallFiltersStore } from "@/stores/callFiltersStore"
import { useQuery } from "@tanstack/react-query"
import { SlidersHorizontal } from "lucide-react"
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { MultiSelect } from "../ui/multiSelect"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"


export const CallFiltersForm: React.FC = () => {
  const session = useSession()
  const { api } = useApi()
  const [ 
    selectedService,
    setSelectedService,
  ] = useCallFiltersStore((state) => [
    state.selectedService, 
    state.actions.setSelectedService
  ])

  async function getPasswordQueueTypes() {
    const result = await api.get<passwordQueueTypeResponse>('service-password/panel')
    return result.data.servicePasswords
  }

  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryFn: getPasswordQueueTypes,
    queryKey: ['@saudehd-password-queue-avaliable-types']
  }) 

  function handleFilter(field: string, value: any) {
    if(field === 'service') {
      setSelectedService(value)
    } 
    
  }

   
  return (
    <Sheet>
      <SheetTrigger asChild> 
          <SlidersHorizontal  />  
      </SheetTrigger>
      <SheetContent className="bg-white flex flex-col p-0">
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
                <Select>
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent> 
                      {['1','2','3','4'].map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
             </div>
          </div>
          <div className="grid grid-cols-1 items-center gap-4  px-4">  
            <div> 
                <label htmlFor="">Serviço</label>
                <MultiSelect 
                  isMulti 
                  onChange={(value) => {
                   handleFilter('service', value)
                  }}
                  options={services?.map((service) => ({ value: service.id, label: service.description }))}
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
          <div className="grid grid-cols-3 items-center gap-4  px-4"> 
             <Button type="submit" size="sm" className="bg-white text-primary border border-neutral-200">Limpar filtro</Button> 
             <Button type="submit" size="sm" className="bg-white text-primary border border-neutral-200">Limpar filtro</Button> 
             <Button type="submit" size="sm" className="bg-white text-primary border border-neutral-200">Limpar filtro</Button> 
          </div>
          <div className="grid grid-cols-1 items-center gap-4 px-4">
              <Separator className="my-4" /> 
          </div>
          <div className="grid grid-cols-1 items-center gap-4  px-4">
              <label htmlFor="">Status</label>
          </div>
          <div className="grid grid-cols-3 items-center gap-4  px-4"> 
             <Button type="submit" size="sm" className="bg-white text-primary border border-neutral-200">Limpar filtro</Button> 
             <Button type="submit" size="sm" className="bg-white text-primary border border-neutral-200">Limpar filtro</Button> 
             <Button type="submit" size="sm" className="bg-white text-primary border border-neutral-200">Limpar filtro</Button> 
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
              <Separator className="my-4" /> 
          </div>
          <div className="grid grid-cols-1 items-center gap-4 px-4">
              <label htmlFor="">Ordenar por</label>
          </div>
          <div className="grid grid-cols-3 items-center gap-4 px-4"> 
             <Button type="submit" size="sm" className="bg-white text-primary border border-neutral-200">Limpar filtro</Button> 
             <Button type="submit" size="sm" className="bg-white text-primary border border-neutral-200">Limpar filtro</Button> 
          </div>
        </div>
        <SheetFooter className="flex !justify-between mt-auto pb-4 px-4">
          <SheetClose asChild>
             <Button type="button" size="sm" className="bg-white text-primary border border-neutral-200">Limpar filtro</Button> 
          </SheetClose>
          <SheetClose asChild>
             <Button type="submit" size="sm" >Filtrar</Button> 
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
