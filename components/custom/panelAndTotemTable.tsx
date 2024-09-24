import { EllipsisVertical, Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Switch } from '../ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { PanelAndTotemTableFilters } from './panelAndTotemTableFilters'

export function PanelAndTotemTable() {
  return (
    <div className="px-8 pb-6 flex flex-col flex-1 py-6">
      <div className="bg-white border rounded flex-col flex-1">
        <PanelAndTotemTableFilters /> 
        <div className="h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Unidade/Filial</TableHead>
                <TableHead>Qtd. de serviços</TableHead>
                <TableHead>Modelo do painel</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((item) => (
                <TableRow key={item}>
                  <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>   
                            <Button variant="ghost" className="size-9 p-0"> 
                              <EllipsisVertical className='size-5' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent> 
                          <DropdownMenuItem>
                            <div className='flex gap-2 py-1'>
                              <Pencil />
                              Editar totem/painel
                            </div> 
                          </DropdownMenuItem> 
                        </DropdownMenuContent>
                      </DropdownMenu>  
                  </TableCell>
                  <TableCell>Nome painel</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                     clinica teste 1 
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center">
                      11
                    </div>
                  </TableCell>
                  <TableCell>Padrão</TableCell>
                  <TableCell> 
                     <Switch  
                      className='data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary/40'
                      thumbClassName='data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral-500'/>
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
