'use client'
import { paramsApi } from '@/lib/api'
import { AxiosError, AxiosInstance } from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export function useApi(api: AxiosInstance = paramsApi) {
  const session = useSession()
  const token = session.data?.user.token
  const { replace } = useRouter()

  const controllers: AbortController[] = []

  api.interceptors.request.use((config) => {
    const controller = new AbortController()
    if (!config.signal) {
      config.signal = controller.signal
      controllers.push(controller)
    }

    return config
  })

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status
        if (statusCode === 401) {
          toast.error('Sua sessão expirou!')
          await signOut({
            redirect: false,
          })
          replace('/')
        }
      }
      throw error
    },
  )

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  if (session.status === 'authenticated') {
    api.defaults.headers.common = headers
  } else {
    api.defaults.headers.common = {}
  }

  return {
    api,
  }
}
