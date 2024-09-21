import { LoginResponse } from '@/core/models/httpResponses/loginResponse'
import { LoginRequestData } from '@/core/models/validationSchemas/loginRequestData'
import { authApi } from '@/lib/api'

export async function authenticate(data: LoginRequestData) {
  const result = await authApi.post<LoginResponse>('auth/login', data)
  return result.data
}
