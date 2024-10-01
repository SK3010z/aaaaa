'use client'
import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { EllipsisVertical, MonitorCog, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Switch } from '../ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { ConnectPanelTotemDialog } from './connectPanelTotemDialog'
import { PanelAndTotemTableFilters } from './panelAndTotemTableFilters'

export const PanelAndTotemTable: React.FC = () => {
  const { panels, handleActivePannel } = usePanelAndTotem()
  const { replace } = useRouter()
  const [connectModalOpen, setConnectModalOpen] = useState('')

  function layoutName(layout: string) {
    const mapper = {
      withMediaNextCalls: 'Com mídia - Próximas chamadas',
      withMedia: 'Com mídia',
    } as {
      [key: string]: string
    }
    return mapper[layout] || 'Padrão'
  }

  return (
    <div className="px-8 pb-6 flex flex-col flex-1 py-6">
      <div className="bg-white border rounded flex-col flex-1">
        <PanelAndTotemTableFilters />
        <div className="h-full overflow-auto">
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
              {panels?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-9 p-0">
                          <EllipsisVertical className="size-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            replace(`/edit-painel-e-totem/${item.id}`)
                          }
                        >
                          <div className="flex items-center gap-2 py-1">
                            <Pencil className="size-4" />
                            Editar totem/painel
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setConnectModalOpen(item.id)}
                        >
                          <div className="flex items-center gap-2 py-1">
                            <MonitorCog className="size-4" />
                            Conectar Totem/Painel
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {item.servicePasswordCount}
                    </div>
                  </TableCell>
                  <TableCell>{layoutName(item.layout)}</TableCell>
                  <TableCell>
                    <Switch
                      defaultChecked={item.active}
                      className="data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary/40"
                      thumbClassName="data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral-500"
                      onClick={(e) => {
                        handleActivePannel(
                          item.id,
                          !(e.currentTarget.dataset.state === 'checked'),
                        )
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <ConnectPanelTotemDialog
        open={!!connectModalOpen}
        onOpenChange={() => setConnectModalOpen('')}
        connectingId={connectModalOpen}
      />
    </div>
  )
}
