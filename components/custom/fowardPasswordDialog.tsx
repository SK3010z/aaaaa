import { Forward, Info } from 'lucide-react'
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

export function FowardPasswordDialog() {
  return (
    <Dialog>
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sala">Sala</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <span>Posição</span>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sala">Sala</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="border-t p-6">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
