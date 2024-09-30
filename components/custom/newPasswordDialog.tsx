'use client'

import { DialogClose } from '@radix-ui/react-dialog'
import { Plus, Search, User } from 'lucide-react'
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
import { TableInput } from './tableInput'

export function NewPasswordDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="custom">
          <Plus />
          <span>Nova senha</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[80vw] xl:w-[70vw] p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>Nova senha</DialogTitle>
        </DialogHeader>
        <div>
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
                <TableHead>Detalhes da senha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Servico 001</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      className="h-6 bg-blue-600/10 text-blue-600 hover:bg-blue-600/20"
                      variant="custom"
                    >
                      <User className="mr-2 !size-4" />
                      Normal
                    </Button>
                    <Button
                      className="h-6 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
                      variant="custom"
                    >
                      <User className="mr-2 !size-4" />
                      Prioridade
                    </Button>
                    <Button
                      className="h-6 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      variant="custom"
                    >
                      <User className="mr-2 !size-4" />
                      Super prioridade
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TableInput placeholder="Adicionar nome" className="pl-10">
                      <Plus className="size-4 absolute left-4" />
                    </TableInput>
                    <TableInput placeholder="Observação" className="pl-10">
                      <Plus className="size-4 absolute left-4" />
                    </TableInput>
                    <TableInput placeholder="Hora marcada" className="pl-10">
                      <Plus className="size-4 absolute left-4" />
                    </TableInput>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <DialogFooter className="p-6 border-t">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
