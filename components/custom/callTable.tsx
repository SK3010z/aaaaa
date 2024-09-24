import {
  CheckCircle,
  EllipsisVertical,
  Forward,
  Megaphone,
  Plus,
  User,
} from 'lucide-react'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { CallTableFilters } from './callTableFilters'
import { TableInput } from './tableInput'

export function CallTable() {
  return (
    <div className="px-8 pb-6 flex flex-col flex-1">
      <div className="bg-white border rounded flex-col flex-1">
        <CallTableFilters />

        <div className="h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Fila de senhas</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Tempo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((item) => (
                <TableRow key={item}>
                  <TableCell>
                    <Button variant="ghost" className="size-9 p-0">
                      <EllipsisVertical />
                    </Button>
                  </TableCell>
                  <TableCell>F001-Serviço</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <TableInput
                        className="pl-8"
                        type="text"
                        placeholder="Adicionar nome"
                      >
                        <Plus className="absolute left-2 size-4" />
                      </TableInput>
                      <TableInput
                        className="pl-8"
                        type="text"
                        placeholder="Observação"
                      >
                        <Plus className="absolute left-2 size-4" />
                      </TableInput>
                      <TableInput
                        className="pl-8"
                        type="text"
                        placeholder="Hora marcada"
                      >
                        <Plus className="absolute left-2 size-4" />
                      </TableInput>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center">
                      <User className="text-red-800" />
                    </div>
                  </TableCell>
                  <TableCell>00:00:00</TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <Button className="h-6" variant="custom">
                        <Megaphone className="mr-2 !size-4" />
                        Chamar
                      </Button>
                      <Button
                        className="h-6 bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        variant="custom"
                      >
                        <CheckCircle className="mr-2 !size-4" />
                        Iniciar
                      </Button>
                      <Button
                        className="h-6 bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        variant="custom"
                      >
                        <Forward className="mr-2 !size-4" />
                        Encaminhar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
