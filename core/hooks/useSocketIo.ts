import { useEffect, useMemo } from 'react'
import { io as socket } from 'socket.io-client'
interface Options {
  listeners: Array<{
    event: string
    handler(data: unknown): void
    watchListener?: boolean
  }>
  emitOnConnect: { event: string; payload: unknown }
}

export function useSocketIo({ listeners, emitOnConnect }: Options) {
  const io = useMemo(
    () =>
      socket(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
        path: '/panel/v1/ws/',
      }),
    [],
  )

  useEffect(() => {
    if (emitOnConnect) {
      io.on('connect', () => {
        io.emit(emitOnConnect.event, emitOnConnect.payload)
      })
    }
    listeners.forEach((listener) => {
      io.on(listener.event, listener.handler)
    })

    io.on('debug', console.debug)
    io.on('warn', console.warn)
    io.on('error', console.error)
    return () => {
      io.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { io }
}
