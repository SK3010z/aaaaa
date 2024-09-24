import { AccessResponse } from '@/core/models/httpResponses/accessResponse'
import { LoginResponse } from '@/core/models/httpResponses/loginResponse'
import { LoginRequestData } from '@/core/models/validationSchemas/loginRequestData'
import { authApi } from '@/lib/api'

export async function authenticate(data: LoginRequestData) {
  const result = await authApi.post<LoginResponse>('auth/login', data)
  return result.data
}

export async function findAcess(token: string) {
  const result = await authApi.get<AccessResponse>('auth/access', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return result.data
}
