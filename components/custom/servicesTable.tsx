'use client'
import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Switch } from '../ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { EditServiceForm } from './editServiceForm'
import { RemoveServiceForm } from './removeSerivceForm'

export const ServicesTable: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { panel, handleUpdateService, handleConnectServiceToPanel } =
    usePanelAndTotem()

  function onClassificationChange(
    serviceClassificationId: string,
    serviceId: string,
  ) {
    handleUpdateService(
      'serviceClassificationId',
      serviceClassificationId,
      serviceId,
    )
  }
  return (
    <div className="px-6 pb-6 flex flex-col flex-1 py-4">
      <div className="bg-white border rounded flex-col flex-1">
        <div className="h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Ordem</TableHead>
                <TableHead>Editar</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Sigla</TableHead>
                <TableHead>peso</TableHead>
                <TableHead>classificação</TableHead>
                <TableHead>prioridade</TableHead>
                <TableHead>super prioridade</TableHead>
                <TableHead>mostrar no totem</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {panel?.servicePasswords?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="flex justify-center">
                    <div>
                      {index > 0 && item.index > 0 && (
                        <ChevronUp
                          onClick={() =>
                            handleUpdateService('index', index - 1, item.id)
                          }
                          className="cursor-pointer"
                        />
                      )}
                      <ChevronDown
                        onClick={() =>
                          handleUpdateService('index', index + 1, item.id)
                        }
                        className="cursor-pointer"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{index} </TableCell>
                  <TableCell className="flex justify-center">
                    <EditServiceForm id={item.id} />
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.acronym}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell className="flex justify-center">
                    <Select
                      defaultValue={item.serviceClassificationId ?? ''}
                      onValueChange={(value) =>
                        onClassificationChange(value, item.id)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {panel?.serviceClassifications?.map(
                            (classification) => (
                              <SelectItem
                                key={classification.id}
                                value={classification.id}
                              >
                                {classification.description}
                              </SelectItem>
                            ),
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Switch
                      defaultChecked={item.priority}
                      className="data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary/40"
                      thumbClassName="data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral-500"
                      onClick={(e) => {
                        handleUpdateService(
                          'priority',
                          !(e.currentTarget.dataset.state === 'checked'),
                          item.id,
                        )
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      defaultChecked={item.superPriority}
                      className="data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary/40"
                      thumbClassName="data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral-500"
                      onClick={(e) => {
                        handleUpdateService(
                          'superPriority',
                          !(e.currentTarget.dataset.state === 'checked'),
                          item.id,
                        )
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      defaultChecked={item.showInTotem}
                      className="data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary/40"
                      thumbClassName="data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral-500"
                      onClick={(e) => {
                        handleConnectServiceToPanel(
                          id,
                          item.id,
                          !(e.currentTarget.dataset.state === 'checked'),
                        )
                      }}
                    />
                  </TableCell>
                  <TableCell className="flex justify-center items-center">
                    <RemoveServiceForm
                      id={item.id}
                      description={item.description}
                    />
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
