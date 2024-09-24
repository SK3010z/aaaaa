/* eslint-disable @typescript-eslint/no-explicit-any */
import { authenticate, findAcess } from '@/services/authService'
import { AxiosError } from 'axios'
import jwt from 'jsonwebtoken'
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

          if (!res || !res.user) {
            throw new Error('Serviço temporáriamente indisponível')
          }

          const access = await findAcess(res.token)

          if (!access || access.length === 0) {
            throw new Error('Usuário e/ou senha invalido(s)')
          }

          const hasSingleContractAndLocation =
            access.length === 1 && access[0].service_locations.length === 1
          const callBackUrl = hasSingleContractAndLocation
            ? 'lista-de-chamadas'
            : 'selecionar-local'

          const data = {
            user: {
              access,
              name: res.user.person_name,
              token: res.token,
              callBackUrl,
              selectedContract: hasSingleContractAndLocation ? access[0] : null,
              selectedServiceLoation: hasSingleContractAndLocation
                ? access[0].service_locations[0]
                : null,
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
    async jwt({ token, user, session, trigger }) {
      const data = { ...token, ...user, session }
      if (trigger === 'update') {
        const newToken = jwt.sign(
          {
            sub: token.id,
            contractId: session.selectedContract?.id,
            serviceLocationId: session.selectedServiceLocation?.id,
            contract_id: session.selectedContract?.id,
            service_location_id: session.selectedServiceLocation?.id,
          },
          process.env.API_SECRET || '',
          { expiresIn: '8h' },
        )
        console.log('==> ', newToken)

        Object.assign(data, {
          ...data,
          user: {
            ...(data as unknown as any).user,
            ...session,
            token: newToken,
          },
        })
      }

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
