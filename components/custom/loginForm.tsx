'use client'
import logo from '@/assets/svg/logo-colored-text-black.svg'
import {
  LoginRequestData,
  loginRequestDataResolver,
} from '@/core/models/validationSchemas/loginRequestData'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Spinner } from '../ui/spinner'

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginRequestData>({
    resolver: zodResolver(loginRequestDataResolver),
  })
  const session = useSession()
  const { replace } = useRouter()

  async function onSubmit(data: LoginRequestData) {
    try {
      setLoading(true)

      const result = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/lista-de-chamadas',
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      toast.success('Login realizado com sucesso!')
      // router.push(`/lista-de-chamadas`)
    } catch (error) {
      console.log('==> ERROR', error)

      if (error instanceof AxiosError && error.response?.data.message) {
        const messages = error.response?.data.message as string[]
        messages.forEach((message) => {
          toast.error(message)
        })
      } else {
        let message =
          'Erro ao fazer login. Verifique suas credenciais e tente novamente.'
        if (error instanceof Error) {
          message = error.message
        }
        toast.error(message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session.status === 'authenticated' && session.data.user?.callBackUrl) {
      replace(session.data?.user?.callBackUrl)
    }
  }, [replace, session.data, session.status])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white min-w-full lg:min-w-[36rem] py-6 px-6 h-fit rounded-lg lg:py-16 lg:px-10"
    >
      <div className="flex flex-col gap-6 mb-16">
        <div className="flex items-center justify-start lg:hidden">
          <Image alt="Logo" src={logo} draggable={false} />
        </div>
        <h1 className="text-4xl font-medium leading-none text-neutral-950">
          Fazer login
        </h1>
        <p className="text-base leading-none text-neutral-500">
          Novo usuário?
          <strong className="text-primary font-medium ml-2">
            Entre em contato
          </strong>
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <Input
          id="login-username-input"
          placeholder="Entre com seu login"
          label="Usuário"
          error={errors?.username?.message}
          {...register('username')}
        />
        <Input
          id="login-password-input"
          placeholder="Entre com sua senha"
          label="Senha"
          type="password"
          error={errors?.password?.message}
          {...register('password')}
        />
      </div>

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Checkbox id="checkbox-remember-me" />
          <label
            className="leading-none text-sm text-neutral-950"
            htmlFor="checkbox-remember-me"
          >
            Lembrar- me
          </label>
        </div>
        <Button
          type="button"
          variant="link"
          className="leading-none text-neutral-950 text-sm"
        >
          Esqueceu sua senha?
        </Button>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <Button
          className="flex items-center gap-2"
          type="submit"
          disabled={loading}
        >
          Entrar
          {loading && <Spinner className="size-4" />}
        </Button>
        <Button type="button" variant="outline">
          Criar conta
        </Button>
      </div>

      <span className="flex text-sm justify-center gap-1 leading-none lg:justify-start">
        Problemas com o acesso?{' '}
        <strong className="text-primary font-medium">Solicite ajuda</strong>
      </span>
    </form>
  )
}
