import 'next-auth'
import { SessionData } from './core/models/model/sessionData'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: SessionData
  }
}
