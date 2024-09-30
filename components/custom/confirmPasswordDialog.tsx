import { useQueueManager } from '@/contexts/queueManagerContext'
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

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  confirmPasswordId: string
}

export function ConfirmPasswordDialog({
  onOpenChange,
  open,
  confirmPasswordId,
}: Props) {
  const { confirmPassword } = useQueueManager()

  function handleOpenChange(open: boolean) {
    onOpenChange(open)
  }

  function handleConfirmPassword() {
    confirmPassword(confirmPasswordId)
    toast.success('Senha confirmada')
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[35vw]">
        <DialogHeader className="mb-8">
          <DialogTitle>Tem certeza que deseja confirmar a senha?</DialogTitle>
        </DialogHeader>
        <div>
          <span className="flex text-base text-neutral-500 mb-4">
            Ao confirmar, a senha não estará mais disponível na fila
          </span>
        </div>
        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="button" onClick={handleConfirmPassword}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
