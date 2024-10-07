'use client'
import { socketEvents } from '@/core/constants/socketEvents'
import { useSocketIo } from '@/core/hooks/useSocketIo'
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
  useMemo,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import { io as socket } from 'socket.io-client'

export type QueueManagerContextData = {
  callPassword: (
    passwordId: string,
    fowarded?: boolean,
    location?: { deskCaller: string; location: string },
  ) => void
  requestPasswordQueue: () => void
  startPassword: (passwordId: string, type: string) => void
  updatePassword: (data: Partial<ReceptionQueuePassword>) => void
  dismissPassword: (passwordId: string, reason: string) => void
  confirmPassword: (passwordId: string) => void
  callPasswordId: string
  setCallPasswordId: (callPasswordId: string) => void
  summaryPassword: () => void
  summaryPasswordData: {
    lastPassword: string
    totalCalls: number
  }
  searchPassword: string
  setSearchPassword: (searchPassword: string) => void
}

const QueueManagerContext = createContext({} as QueueManagerContextData)

export function QueueManagerProvider({ children }: PropsWithChildren) {
  const [callPasswordId, setCallPasswordId] = useState('')
  const [summaryPasswordData, setSummaryPasswordData] = useState({
    lastPassword: '',
    totalCalls: 0,
  })
  const [searchPassword, setSearchPassword] = useState('')
  const [passwords, setPasswords, addPassword, removePassword, updatePass] =
    useQueueStore((state) => [
      state.passwords,
      state.actions.setPasswords,
      state.actions.addPassword,
      state.actions.removePassword,
      state.actions.updatePassword,
    ])
  const [selectedPanel, selectedLocal, selectedPosition, storedPanels] =
    usePanelStore((state) => [
      state.selectedPanel,
      state.selectedLocal,
      state.selectedPosition,
      state.panels,
    ])
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

  function callPassword(
    passwordId: string,
    fowarded?: boolean,
    location?: { deskCaller: string; location?: string },
  ) {
    if (!selectedLocal) {
      return toast.warn('Selecione um local para chamar a senha')
    }
    if (!selectedPanel) {
      return toast.warn('Selecione um painel para chamar a senha')
    }
    const password = passwords.find((pass) => pass.id === passwordId)

    if (
      fowarded &&
      !location &&
      (password?.deskCaller !== selectedLocal?.value ||
        password?.location !== selectedPosition?.value)
    ) {
      return setCallPasswordId(passwordId)
    }

    const locationSelect = storedPanels.find(
      (panel) => panel.id === selectedPanel?.value,
    )

    io.emit(socketEvents.reception.CALL_PASSWORD, {
      token: session?.user.token,
      id: passwordId,
      customText:
        locationSelect?.callConfig === 'notCallName'
          ? ''
          : password?.customTextCall || '',
      location: {
        deskCaller: location?.deskCaller || selectedLocal?.value,
        location: location?.location || selectedPosition?.value,
        panelsToCall: selectedPanel ? [selectedPanel?.value] : [],
      },
    })
    toast.info(`Chamando senha: ${password?.password}`)
    setCallPasswordId('')
    summaryPassword()
  }

  function startPassword(passwordId: string, type: string) {
    io.emit(socketEvents.reception.START_PASSWORD, {
      token: session?.user.token,
      type,
      id: passwordId,
    })
  }

  function updatePassword(data: Partial<ReceptionQueuePassword>) {
    if (data.id) {
      updatePass(data.id, data)
    }
    io.emit(socketEvents.reception.UPDATE_PASSWORD, {
      ...data,
      token: session?.user.token,
    })
  }

  const onPasswordDismissed = useCallback(
    ({ passwordId }: { passwordId: string }) => {
      removePassword(passwordId)
    },
    [removePassword],
  )

  const onPasswordStarted = useCallback(
    (payload: ReceptionQueuePassword) => {
      updatePass(payload.id, payload)
    },
    [updatePass],
  )

  const onPasswordSummary = useCallback(
    (payload: { lastPassword: string; totalCalls: number }) => {
      setSummaryPasswordData(payload)
    },
    [setSummaryPasswordData],
  )

  function summaryPassword() {
    io.emit(socketEvents.reception.SUMMARY_PASSWORD, {
      token: session?.user.token,
    })
  }

  const onPasswordGenerated = useCallback(
    (data: ReceptionQueuePassword) => {
      addPassword(data)
    },
    [addPassword],
  )

  useSocketIo({
    emitOnConnect: [
      {
        event: socketEvents.reception.RECEPTION_CONNECTED,
        payload: {
          token: session?.user.token,
        },
      },
      {
        event: socketEvents.reception.SUMMARY_PASSWORD_REQUEST,
        payload: {
          token: session?.user.token,
        },
      },
    ],
    listeners: [
      {
        event: socketEvents.reception.PASSWORD_QUEUE_RECEPTION,
        handler: onPasswrodsSended,
      },
      {
        event: socketEvents.reception.PASSWORD_UPDATED,
        handler: onPasswordUpdated,
      },
      {
        event: socketEvents.reception.PASSWORD_DISMISSED,
        handler: onPasswordDismissed,
      },
      {
        event: socketEvents.reception.PASSWORD_CONFIRMED,
        handler: onPasswordDismissed,
      },
      {
        event: socketEvents.reception.PASSWORD_STARTED,
        handler: onPasswordStarted,
      },
      {
        event: socketEvents.reception.PASSWORD_SUMMARY,
        handler: onPasswordSummary,
      },
      {
        event: socketEvents.reception.PASSWORD_GENERATED,
        handler: onPasswordGenerated,
      },
    ],
  })

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

  function requestPasswordQueue() {
    io.emit(socketEvents.reception.RECEPTION_CONNECTED, {
      token: session?.user.token,
    })
  }

  return (
    <QueueManagerContext.Provider
      value={{
        callPassword,
        updatePassword,
        dismissPassword,
        confirmPassword,
        callPasswordId,
        setCallPasswordId,
        startPassword,
        summaryPassword,
        summaryPasswordData,
        setSearchPassword,
        searchPassword,
        requestPasswordQueue,
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
