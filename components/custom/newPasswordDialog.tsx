'use client'

import { EmittedPassword } from '@/core/models/httpResponses/emmitedPassword'
import { Service } from '@/core/models/model/service'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { format } from 'date-fns'
import { Plus, Search, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

export function NewPasswordDialog() {
  const [emittedPassword, setEmmitedPassword] = useState<
    EmittedPassword | undefined
  >()
  const [handler, setHandler] = useState<
    { passwordId: string; priorityHandler: string } | undefined
  >(undefined)
  const { data: session } = useSession()
  async function fetchServicePasswords() {
    const result = await axios.get<Service[]>(
      `${process.env.NEXT_PUBLIC_PARAMS_API_URL}/service-password/contract/active`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    )
    return result.data
  }

  const { data: services } = useQuery({
    queryKey: ['@4filas-service-passwords'],
    queryFn: fetchServicePasswords,
  })

  function handleSelect(passwordId: string, priorityHandler: string) {
    const currentHandlerEquals =
      handler?.passwordId === passwordId &&
      handler.priorityHandler === priorityHandler

    setHandler(
      currentHandlerEquals ? undefined : { passwordId, priorityHandler },
    )
  }

  async function handleEmitNewPassword() {
    const result = await toast.promise(
      axios.post<EmittedPassword>(
        `${process.env.NEXT_PUBLIC_PARAMS_API_URL}/service-password-call/${handler?.passwordId}`,
        {
          priority: handler?.priorityHandler === 'PRIORITY',
          superPriority: handler?.priorityHandler === 'SUPER',
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      ),
      {
        error: 'Falha ao gerar senha',
        success: 'Senha gerada',
        pending: 'Gerando senha',
      },
    )
    setEmmitedPassword(result.data)
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setEmmitedPassword(undefined)
          setHandler(undefined)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="custom">
          <Plus />
          <span>Nova senha</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[80vw] xl:w-[70vw] h-[90vh] overflow-y-auto p-0 flex flex-col">
        <DialogHeader className="p-6 border-b h-fit">
          <DialogTitle>
            {emittedPassword ? 'Senha gerada com sucesso' : 'Nova senha'}
          </DialogTitle>
        </DialogHeader>
        {emittedPassword ? (
          <div className="flex items-center justify-center flex-1">
            <div className="border rounded text-center p-10">
              <h1 className="text-primary font-medium text-[4rem]">
                {emittedPassword.password}
              </h1>
              <h2 className="text-primary text-[2.25rem]">
                {emittedPassword.priority
                  ? 'Prioridade'
                  : emittedPassword.superPriority
                    ? 'Super prioridade'
                    : 'Normal'}
              </h2>
              <div className="flex items-center justify-between gap-4 mt-4 mb-1 text-sm">
                <span>
                  <span className="font-medium">Data:</span>{' '}
                  {format(new Date(), 'dd/MM/yyyy')}
                </span>
                <span>
                  <span className="font-medium">Hora:</span>{' '}
                  {format(new Date(), 'hh:mm')}
                </span>
              </div>
              <span className="text-sm font-medium">saudehd.com.br</span>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <div className="px-6 w-full">
              <div className="relative flex items-center">
                <Input
                  placeholder="Serviço"
                  className="w-full my-6 pl-10 min-w-[22rem]"
                />
                <Search className="size-4 absolute left-4 text-neutral-500" />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Prioridade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services?.map((service) => (
                  <TableRow
                    key={service.id}
                    data-selected={service.id === handler?.passwordId}
                    className="data-[selected=true]:bg-primary/10 data-[selected=true]:border data-[selected=true]:border-primary"
                  >
                    <TableCell>{service.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleSelect(service.id, 'NORMAL')}
                          data-selected={
                            service.id === handler?.passwordId &&
                            handler.priorityHandler === 'NORMAL'
                          }
                          className="h-6 bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 data-[selected=true]:bg-blue-600 data-[selected=true]:text-white"
                          variant="custom"
                        >
                          <User className="mr-2 !size-4" />
                          Normal
                        </Button>
                        <Button
                          data-selected={
                            service.id === handler?.passwordId &&
                            handler.priorityHandler === 'PRIORITY'
                          }
                          className="h-6 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 data-[selected=true]:bg-orange-500 data-[selected=true]:text-white"
                          variant="custom"
                          onClick={() => handleSelect(service.id, 'PRIORITY')}
                        >
                          <User className="mr-2 !size-4" />
                          Prioridade
                        </Button>
                        <Button
                          data-selected={
                            service.id === handler?.passwordId &&
                            handler.priorityHandler === 'SUPER'
                          }
                          className="h-6 data-[selected=true]:bg-red-500 data-[selected=true]:text-white hover:bg-red-500/20"
                          variant="custom"
                          onClick={() => handleSelect(service.id, 'SUPER')}
                        >
                          <User className="mr-2 !size-4" />
                          Super prioridade
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <DialogFooter className="p-6 border-t sticky bottom-0 bg-white">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          {!emittedPassword && (
            <Button onClick={handleEmitNewPassword} disabled={!handler}>
              Confirmar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
