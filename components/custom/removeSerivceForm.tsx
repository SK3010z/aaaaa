'use client'

import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

export const RemoveServiceForm: React.FC<{
  id: string
  description: string
}> = (data) => {
  const { handleRemoveService, panelId } = usePanelAndTotem()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar classificação</AlertDialogTitle>
          <AlertDialogDescription>
            Deseja realmente apagar a classificação{' '}
            <span className="text-primary">{data.description}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-between">
          <AlertDialogCancel asChild>
            <Button
              type="button"
              className="bg-neutral-50 text-primary border hover:bg-neutral-100"
            >
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => handleRemoveService(panelId, data.id)}>
              Confirmar
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
