'use client'
import { useQueueManager } from '@/contexts/queueManagerContext'
import { ReceptionQueuePassword } from '@/core/models/model/receptionQueuePassword'
import { formatTimeMask } from '@/core/utils/formatTimeMask'
import { useCallFiltersStore } from '@/stores/callFiltersStore'
import { useQueueStore } from '@/stores/queueStore'
import { produce } from 'immer'
import {
  CheckCircle,
  ClipboardList,
  EllipsisVertical,
  Megaphone,
  Plus,
  Trash,
  User,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { CallTableFilters } from './callTableFilters'
import { ConfirmPasswordDialog } from './confirmPasswordDialog'
import { FowardPasswordDialog } from './fowardPasswordDialog'
import { RemovePasswordDialog } from './removePasswordDialog'
import { TableInput } from './tableInput'

export function CallTable() {
  const { callPassword, updatePassword } = useQueueManager()
  const [passwordForDeleteId, setPasswordForDeleteId] = useState('')
  const [passwordForConfirmId, setPasswordForConfirmId] = useState('')
  const [passwords, setPasswords] = useQueueStore((state) => [
    state.passwords,
    state.actions.setPasswords,
  ])
  
  const [selectedService] = useCallFiltersStore(
    (state) => [state.selectedService],
  )
 
  const filteredPasswords = useMemo(() => {
    if (!passwords) return null

    const pwds = (selectedService.length === 0) ? passwords : passwords.filter(password => selectedService.some(service => service.value === password.passwordId))
     
    const sortedPwds = pwds.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    })

    const superPriorityPwds = sortedPwds.filter(currentPassword => currentPassword?.superPriority).sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    })

    const priorityPwds = sortedPwds.filter(currentPassword => currentPassword?.priority === true).sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    })

    return [...superPriorityPwds, ...priorityPwds, ...sortedPwds.filter(pwd => !pwd?.superPriority && !pwd?.priority)]
  }, [selectedService, passwords])


  function onPasswordChange(
    field: keyof ReceptionQueuePassword,
    value: string | never,
    index: number,
  ) {
    const organizedPasswords = produce(passwords, (draft) => {
      const password = draft[index]
      password[field] = value as never
    })
    setPasswords(organizedPasswords)
  }

  function handleInputBlur(
    field: 'customTextCall' | 'observation' | 'scheduledTime',
    value: string,
    id: string,
  ) {
    const obj = { [field]: value, id }
    updatePassword(obj)
  } 

  return (
    <div className="px-8 pb-6 flex flex-col flex-1">
      <div className="bg-white border rounded flex-col flex-1">
        <CallTableFilters />

        <div className="flex flex-col max-h-[calc(100dvh_-_26rem)] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Senhas</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead>Prioridade</TableHead>
                {/* <TableHead>Tempo</TableHead> */}
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPasswords?.map((password, index) => (
                <TableRow key={password.id}>
                  <TableCell>
                    <DropdownMenu modal>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-9 p-0">
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className="gap-4">
                          <ClipboardList className="size-4" />
                          <span className="text-sm">
                            Histórico de atividades
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-4"
                          onClick={() => setPasswordForConfirmId(password.id)}
                        >
                          <CheckCircle className="size-4" />
                          <span className="text-sm">Confirmar chamada</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500 hover:text-red-600 gap-4"
                          onClick={() => setPasswordForDeleteId(password.id)}
                        >
                          <Trash className="size-4" />
                          <span className="text-sm">Remover</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>{password.password}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <TableInput
                        className="pl-8"
                        type="text"
                        placeholder="Adicionar nome"
                        onChange={(e) =>
                          onPasswordChange(
                            'customTextCall',
                            e.target.value,
                            index,
                          )
                        }
                        value={password.customTextCall || ''}
                        onBlur={() =>
                          handleInputBlur(
                            'customTextCall',
                            password.customTextCall as string,
                            password.id,
                          )
                        }
                      >
                        <Plus className="absolute left-2 size-4" />
                      </TableInput>
                      <TableInput
                        className="pl-8"
                        type="text"
                        placeholder="Observação"
                        onChange={(e) =>
                          onPasswordChange('observation', e.target.value, index)
                        }
                        value={password.observation || ''}
                        onBlur={() =>
                          handleInputBlur(
                            'observation',
                            password.observation as string,
                            password.id,
                          )
                        }
                      >
                        <Plus className="absolute left-2 size-4" />
                      </TableInput>
                      <TableInput
                        type="text"
                        className="pl-8"
                        placeholder="Hora marcada"
                        onChange={(e) => {
                          e.target.value = formatTimeMask(e.target.value)
                          onPasswordChange(
                            'scheduledTime',
                            e.target.value,
                            index,
                          )
                        }}
                        value={password.scheduledTime || ''}
                        onBlur={() =>
                          handleInputBlur(
                            'scheduledTime',
                            password.scheduledTime as string,
                            password.id,
                          )
                        }
                      >
                        <Plus className="absolute left-2 size-4" />
                      </TableInput>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Tooltip>
                        <TooltipTrigger>
                          <User
                            data-priority={
                              password.priority
                                ? 'priority'
                                : password.superPriority
                                  ? 'superPriority'
                                  : ''
                            }
                            className="text-blue-700 data-[priority=priority]:text-yellow-700 data-[priority=superPriority]:text-red-500"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>
                            {password.priority
                              ? 'Prioridade'
                              : password.superPriority
                                ? 'Super prioridade (+80 anos)'
                                : 'Prioridade normal'}
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>

                  {/* <TableCell>00:00:00</TableCell> */}

                  <TableCell>
                    <div className="flex gap-4">
                      <Button
                        className="h-6"
                        variant="custom"
                        onClick={() =>
                          callPassword(password.id, password.fowarded)
                        }
                      >
                        <Megaphone className="mr-2 !size-4" />
                        Chamar
                      </Button>
                      {/* <Button
                        className="h-6 bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        variant="custom"
                      >
                        <CheckCircle className="mr-2 !size-4" />
                        Iniciar
                      </Button> */}
                      <FowardPasswordDialog />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <RemovePasswordDialog
        open={!!passwordForDeleteId}
        onOpenChange={() => setPasswordForDeleteId('')}
        dismissPasswordId={passwordForDeleteId}
      />

      <ConfirmPasswordDialog
        open={!!passwordForConfirmId}
        onOpenChange={() => setPasswordForConfirmId('')}
        confirmPasswordId={passwordForConfirmId}
      />
    </div>
  )
}
