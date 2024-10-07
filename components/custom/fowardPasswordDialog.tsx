import { useQueueManager } from '@/contexts/queueManagerContext'
import { usePanelStore } from '@/stores/panelStore'
import { Forward, Info } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { CreatableSelect } from './creatableSelect'

type Props = {
  passwordId: string
}

type Option = {
  label: string
  value: string
}

export function FowardPasswordDialog({ passwordId }: Props) {
  const [position, setPosition] = useState<Option | null>()
  const [local, setLocal] = useState<Option | null>()
  const { updatePassword } = useQueueManager()
  const [open, setOpen] = useState(false)
  const [locals, positions, addLocal, addPosition] = usePanelStore((store) => [
    store.locals,
    store.positions,
    store.actions.addLocal,
    store.actions.addPosition,
  ])

  function handleFoward() {
    if (!open) {
      setLocal(null)
      setPosition(null)
    }

    updatePassword({
      id: passwordId,
      deskCaller: local?.value,
      location: position?.value,
      fowarded: true,
    })
    setOpen(false)
    toast.success('Senha encaminhada')
  }

  function handleOpenChange(open: boolean) {
    setOpen(open)
    if (!open) {
      setLocal(null)
      setPosition(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="h-6 bg-green-500/10 text-green-500 hover:bg-green-500/20"
          variant="custom"
        >
          <Forward className="mr-2 !size-4" />
          Encaminhar
        </Button>
      </DialogTrigger>
      <DialogContent className="w-2/5 p-0">
        <DialogHeader className="border-b p-6">
          <DialogTitle>Encaminhar</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col p-6">
          <div className="bg-primary/10 text-primary flex items-center gap-2 rounded-md px-4 py-3 mb-6">
            <Info />
            <span className="text-sm">
              <strong className="font-medium">ATENÇÃO:</strong> Ao encaminhar
              uma pessoa, ela será automaticamente removida da sua lista.
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
          <Button onClick={handleFoward} disabled={!local}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
