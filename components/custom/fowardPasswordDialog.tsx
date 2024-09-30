import { useQueueManager } from '@/contexts/queueManagerContext'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type Props = {
  passwordId: string
}

export function FowardPasswordDialog({ passwordId }: Props) {
  const [position, setPosition] = useState('')
  const [local, setLocal] = useState('')
  const { updatePassword } = useQueueManager()
  const [open, setOpen] = useState(false)

  function handleFoward() {
    if (!open) {
      setLocal('')
      setPosition('')
    }

    updatePassword({
      id: passwordId,
      deskCaller: local,
      location: position,
      fowarded: true,
    })
    setOpen(false)
    toast.success('Senha encaminhada')
  }

  function handleOpenChange(open: boolean) {
    setOpen(open)
    if (!open) {
      setLocal('')
      setPosition('')
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

          <div className="flex items-center gap-4 w-full">
            <div className="w-full">
              <span>Local</span>
              <Select value={local} onValueChange={setLocal}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Guichê">Guichê</SelectItem>
                  <SelectItem value="Sala">Sala</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <span>Posição</span>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">01</SelectItem>
                  <SelectItem value="02">02</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="border-t p-6">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleFoward} disabled={!position || !local}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
