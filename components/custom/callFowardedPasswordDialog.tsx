import { useQueueManager } from '@/contexts/queueManagerContext'
import { usePanelStore } from '@/stores/panelStore'
import { useQueueStore } from '@/stores/queueStore'
import { Info } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { CreatableSelect } from './creatableSelect'

type Option = {
  label: string
  value: string
}

type Props = {
  passwordId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CallFowardedPasswordDialog({
  passwordId,
  onOpenChange,
  open,
}: Props) {
  const [position, setPosition] = useState<Option | null>(null)
  const [local, setLocal] = useState<Option | null>(null)
  const { callPassword } = useQueueManager()
  const [passwords] = useQueueStore((state) => [state.passwords])
  const [locals, positions, addLocal, addPosition] = usePanelStore((state) => [
    state.locals,
    state.positions,
    state.actions.addLocal,
    state.actions.addPosition,
  ])
  const password = useMemo(
    () => passwords.find((pass) => pass.id === passwordId),
    [passwordId, passwords],
  )

  function handleCall() {
    callPassword(passwordId, true, {
      deskCaller: local?.value || '',
      location: position?.value || '',
    })
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setLocal(null)
      setPosition(null)
    }
    onOpenChange(open)
  }

  useEffect(() => {
    if (!password && passwordId) {
      onOpenChange(false)
    }
  }, [onOpenChange, password, passwordId])

  useEffect(() => {
    setLocal(
      locals.find((local) => local.value === password?.deskCaller) || null,
    )
    setPosition(
      positions.find((position) => position.value === password?.location) ||
        null,
    )
  }, [locals, password, positions])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-2/5 p-0">
        <DialogHeader className="border-b p-6">
          <DialogTitle>
            Chamar senha -{' '}
            <span className="bg-primary/10 rounded py-1 px-4 text-primary">
              {password?.password}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col p-6">
          <div className="bg-blue-600/10 text-blue-600 flex items-center gap-2 rounded-md px-4 py-3 mb-6">
            <div className="bloc">
              <Info />
            </div>
            <span className="text-sm">
              <strong className="font-medium">ATENÇÃO:</strong> Esta senha foi
              encaminhada para uma posição de trabalho diferente da sua posição
              atual, é necessário selecionar para onde a senha deve ser chamada
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex-col w-full">
              <CreatableSelect
                label="Local"
                value={local}
                onChange={setLocal}
                tabIndex={-1}
                options={locals}
                onCreateOption={(option) =>
                  addLocal({ label: option, value: option })
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <CreatableSelect
                label="Posição"
                value={position}
                onChange={setPosition}
                tabIndex={-1}
                createOptionPosition="first"
                options={positions}
                onCreateOption={(option) =>
                  addPosition({ label: option, value: option })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter className="border-t p-6">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleCall} disabled={!position || !local}>
            Chamar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
