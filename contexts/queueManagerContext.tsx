'use client'
import { socketEvents } from '@/core/constants/socketEvents'
import { DismissPasswordDto } from '@/core/models/dto/dismissPasswordDto'
import { ReceptionQueuePassword } from '@/core/models/model/receptionQueuePassword'
import { usePanelStore } from '@/stores/panelStore'
import { useQueueStore } from '@/stores/queueStore'
import { produce } from 'immer'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { toast } from 'react-toastify'
import { io as socket } from 'socket.io-client'

export type QueueManagerContextData = {
  callPassword: (passwordId: string, fowarded?: boolean) => void
  updatePassword: (data: Partial<ReceptionQueuePassword>) => void
  dismissPassword: (passwordId: string, reason: string) => void
  confirmPassword: (passwordId: string) => void
}

const QueueManagerContext = createContext({} as QueueManagerContextData)

export function QueueManagerProvider({ children }: PropsWithChildren) {
  const [passwords, setPasswords] = useQueueStore((state) => [
    state.passwords,
    state.actions.setPasswords,
  ])
  const [selectedPanel, selectedLocal, selectedPosition] = usePanelStore(
    (state) => [
      state.selectedPanel,
      state.selectedLocal,
      state.selectedPosition,
    ],
  )
  const { data: session } = useSession()

  const onPasswrodsSended = useCallback(
    (payload: ReceptionQueuePassword[]) => {
      setPasswords(payload)
    },
    [setPasswords],
  )

  const onPasswordUpdated = useCallback(
    (payload: ReceptionQueuePassword) => {
      const passwordIndex = passwords.findIndex(
        (pass) => pass.id === payload.id,
      )
      if (passwordIndex >= 0) {
        const newPasswords = produce(passwords, (draft) => {
          draft[passwordIndex] = payload
        })
        setPasswords(newPasswords)
      }
    },
    [passwords, setPasswords],
  )

  const io = useMemo(
    () =>
      socket(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
        path: '/panel/v1/ws/',
      }),
    [],
  )

  function callPassword(passwordId: string, fowarded?: boolean) {
    if (!selectedLocal) {
      return toast.warn('Selecione um local para chamar a senha')
    }
    if (!selectedPanel) {
      return toast.warn('Selecione um painel para chamar a senha')
    }
    if (fowarded) {
      return toast.info('ABRIR MODAL [ENCAMINHAMENTO]')
    }
    const password = passwords.find((pass) => pass.id === passwordId)

    io.emit(socketEvents.reception.CALL_PASSWORD, {
      token: session?.user.token,
      id: passwordId,
      customText: password?.customTextCall || '',
      location: {
        deskCaller: selectedLocal,
        location: selectedPosition,
        panelsToCall: selectedPanel ? [selectedPanel?.id] : [],
      },
    })
  }

  function updatePassword(data: Partial<ReceptionQueuePassword>) {
    io.emit(socketEvents.reception.UPDATE_PASSWORD, {
      ...data,
      token: session?.user.token,
    })
  }

  const onPasswordDismissed = useCallback(
    ({ passwordId }: { passwordId: string }) => {
      setPasswords(passwords.filter((password) => password.id !== passwordId))
    },
    [passwords, setPasswords],
  )

  useEffect(() => {
    io.on('connect', () => {
      console.log('Socket connected')
      io.emit(socketEvents.reception.RECEPTION_CONNECTED, {
        token: session?.user.token,
      })
    })
    io.on(socketEvents.reception.PASSWORD_QUEUE_RECEPTION, onPasswrodsSended)
    io.on(socketEvents.reception.PASSWORD_UPDATED, onPasswordUpdated)
    io.on(socketEvents.reception.PASSWORD_DISMISSED, onPasswordDismissed)
    io.on(socketEvents.reception.PASSWORD_CONFIRMED, onPasswordDismissed)

    return () => {
      console.log('Socket update')
    }
  }, [io, onPasswordUpdated, session, onPasswrodsSended, onPasswordDismissed])

  function dismissPassword(passwordId: string, reason: string) {
    const data: DismissPasswordDto = {
      passwordId,
      token: session?.user.token as string,
      dismissReason: reason,
    }
    setPasswords(passwords.filter((password) => password.id !== passwordId))
    io.emit(socketEvents.reception.DISMISS_PASSWORD, data)
  }

  function confirmPassword(passwordId: string) {
    const data: DismissPasswordDto = {
      passwordId,
      token: session?.user.token as string,
    }
    setPasswords(passwords.filter((password) => password.id !== passwordId))
    io.emit(socketEvents.reception.CONFIRM_PASSWORD, data)
  }

  return (
    <QueueManagerContext.Provider
      value={{
        callPassword,
        updatePassword,
        dismissPassword,
        confirmPassword,
      }}
    >
      {children}
    </QueueManagerContext.Provider>
  )
}

export function useQueueManager() {
  const used = useContext(QueueManagerContext)
  if (!used) {
    throw new Error(
      'useQueueManager must be used inside a QueueManagerProvider',
    )
  }
  return used
}
