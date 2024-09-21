import loginBg from '@/assets/images/login-bg.png'
import logo from '@/assets/svg/logo-colored-text-white.svg'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 right-0">
        <Image fill alt="A doctor" src={loginBg.src} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 right-0 bg-slate-900/40 flex flex-col lg:grid grid-cols-2 z-10">
        <div className="flex items-center justify-center">
          <Image alt="Logo" src={logo} draggable={false} />
        </div>

        <div className="flex items-center">
          <div className="bg-white py-16 min-w-[36rem] px-10 h-fit rounded-lg">
            <div className="flex flex-col gap-6 mb-16">
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
              />
              <Input
                id="login-password-input"
                placeholder="Entre com sua senha"
                label="Senha"
                type="password"
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
                variant="link"
                className="leading-none text-neutral-950 text-sm"
              >
                Esqueceu sua senha?
              </Button>
            </div>

            <div className="flex flex-col gap-4 mb-4">
              <Button>Entrar</Button>
              <Button variant="outline">Criar conta</Button>
            </div>

            <span className="text-sm leading-none">
              Problemas com o acesso?{' '}
              <strong className="text-primary font-medium">
                Solicite ajuda
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
