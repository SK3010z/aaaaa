import { useQueueManager } from '@/contexts/queueManagerContext'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  dismissPasswordId: string
}

export function RemovePasswordDialog({
  onOpenChange,
  open,
  dismissPasswordId,
}: Props) {
  const { dismissPassword } = useQueueManager()
  const reasons = useMemo(() => {
    return ['Não compareceu', 'Duplicidade', 'Desistiu', 'Outro']
  }, [])
  const [selectedReason, setSelectedReason] = useState('')

  function handleOpenChange(open: boolean) {
    if (!open) {
      setSelectedReason('')
    }
    onOpenChange(open)
  }

  function handleDismissPassword() {
    dismissPassword(dismissPasswordId, selectedReason)
    toast.success('Senha removida da fila')
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[35vw]">
        <DialogHeader className="mb-8">
          <DialogTitle>Tem certeza que deseja remover da lista?</DialogTitle>
        </DialogHeader>
        <div>
          <span className="flex text-base text-neutral-500 mb-4">
            Selecione o motivo:
          </span>
          <ToggleGroup
            type="single"
            className="flex items-center flex-wrap gap-2"
            value={selectedReason}
            onValueChange={setSelectedReason}
          >
            {reasons.map((reason) => (
              <ToggleGroupItem
                className="bg-primary/10 px-4 py-2 rounded-full border-primary border text-primary hover:bg-primary/15 hover:text-primary data-[state=on]:bg-primary data-[state=on]:text-white"
                key={reason}
                value={reason}
              >
                {reason}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleDismissPassword}
            disabled={!selectedReason}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
