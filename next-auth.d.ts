import { LoginResponse } from '@/core/httpResponses/loginResponse'
import 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: LoginResponse & {
      token: string
      username: string
    }
  }
}
