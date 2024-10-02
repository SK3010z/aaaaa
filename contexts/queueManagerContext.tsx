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
}

const QueueManagerContext = createContext({} as QueueManagerContextData)

export function QueueManagerProvider({ children }: PropsWithChildren) {
  const [callPasswordId, setCallPasswordId] = useState('')
  const [summaryPasswordData, setSummaryPasswordData] = useState({
    lastPassword: '',
    totalCalls: 0,
  })
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

    io.emit(socketEvents.reception.CALL_PASSWORD, {
      token: session?.user.token,
      id: passwordId,
      customText: password?.customTextCall || '',
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

  const onPasswordStarted = useCallback(
    (payload: ReceptionQueuePassword) => {
      const passwordIndex = passwords.findIndex(
        (pass) => pass.id === payload.id,
      )
      const updatedPasswords = [...passwords]
      updatedPasswords[passwordIndex] = {
        ...updatedPasswords[passwordIndex],
        ...payload,
      }
      setPasswords(updatedPasswords)
    },
    [passwords, setPasswords],
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
    io.on(socketEvents.reception.PASSWORD_STARTED, onPasswordStarted)
    io.on(socketEvents.reception.PASSWORD_SUMMARY, onPasswordSummary)

    return () => {
      console.log('Socket update')
    }
  }, [
    io,
    onPasswordUpdated,
    session,
    onPasswrodsSended,
    onPasswordDismissed,
    onPasswordStarted,
    onPasswordSummary,
  ])

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
        callPasswordId,
        setCallPasswordId,
        startPassword,
        summaryPassword,
        summaryPasswordData,
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
