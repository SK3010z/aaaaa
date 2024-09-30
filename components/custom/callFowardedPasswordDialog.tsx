import { useQueueManager } from '@/contexts/queueManagerContext'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

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
  const [position, setPosition] = useState('')
  const [local, setLocal] = useState('')
  const { callPassword } = useQueueManager()
  const [passwords] = useQueueStore((state) => [state.passwords])
  const password = useMemo(
    () => passwords.find((pass) => pass.id === passwordId),
    [passwordId, passwords],
  )

  function handleCall() {
    callPassword(passwordId, true, { deskCaller: local, location: position })
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setLocal('')
      setPosition('')
    }
    onOpenChange(open)
  }

  useEffect(() => {
    if (!password && passwordId) {
      onOpenChange(false)
    }
  }, [onOpenChange, password, passwordId])

  useEffect(() => {
    setLocal(password?.deskCaller || '')
    setPosition(password?.location || '')
  }, [password])

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
          <Button onClick={handleCall} disabled={!position || !local}>
            Chamar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
