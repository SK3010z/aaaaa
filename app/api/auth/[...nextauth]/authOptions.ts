import { authenticate } from '@/services/authService'
import { AxiosError } from 'axios'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Usuário', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const res = await authenticate({
            username: credentials?.username as string,
            password: credentials?.password as string,
          })

          console.log('==> ', JSON.stringify(res))

          if (!res || !res.user) {
            throw new Error('Serviço temporáriamente indisponível')
          }

          const data = {
            user: {
              ...res.user,
              token: res.token,
            },
            id: res.user.id,
            apiToken: res.token,
          }

          return data
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            throw new Error(
              error?.response?.data?.message?.join(' ') ||
                'Usuário e/ou senha invalido(s)',
            )
          }
          throw new Error('Usuário e/ou senha invalido(s)')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      const data = { ...token, ...user, session }
      return data
    },

    async session({ session, token }) {
      session.user = token?.user as never

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
}
