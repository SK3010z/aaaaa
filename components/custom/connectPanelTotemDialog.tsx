'use client'
import axios from 'axios'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { Info } from 'lucide-react'
import { useSession } from 'next-auth/react'
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
} from '../ui/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  connectingId: string
}

export function ConnectPanelTotemDialog({
  connectingId,
  onOpenChange,
  open,
}: Props) {
  const [value, setValue] = useState('')
  const { data: session } = useSession()

  function handleConnect() {
    toast
      .promise(
        axios.put(
          `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/panel/v1/api/connection/panel`,
          { code: value, panelId: connectingId },
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        ),
        {
          error: 'Código inválido ou expirado!',
          success: 'Painel/Totem conectado',
          pending: 'Conectando',
        },
      )
      .then(() => {
        onOpenChange(false)
      })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 w-1/2">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>Conectar TOTEM/Painel</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="bg-blue-600/10 text-blue-600 flex items-center gap-2 rounded-md px-4 py-3 mb-6">
            <div className="bloc">
              <Info />
            </div>
            <span className="text-sm">
              <strong className="font-medium">ATENÇÃO:</strong> Informe, no
              campo abaixo, o código apresentado na tela de conexão do painel ou
              TOTEM
            </span>
          </div>

          <label htmlFor="" className="mb-4 font-medium text-neutral-900 flex">
            Código
          </label>
          <InputOTP
            maxLength={6}
            value={value}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onChange={(e) => setValue(e.toLocaleUpperCase())}
          >
            <InputOTPGroup>
              <InputOTPSlot className="size-14" index={0} />
              <InputOTPSlot className="size-14" index={1} />
              <InputOTPSlot className="size-14" index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot className="size-14" index={3} />
              <InputOTPSlot className="size-14" index={4} />
              <InputOTPSlot className="size-14" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <DialogFooter className="border-t p-6">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleConnect} disabled={value.length < 6}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
