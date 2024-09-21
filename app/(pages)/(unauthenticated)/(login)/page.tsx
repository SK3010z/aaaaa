import loginBg from '@/assets/images/login-bg.png'
import logo from '@/assets/svg/logo-colored-text-white.svg'
import { LoginForm } from '@/components/custom/loginForm'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="h-[100dvh] w-screen overflow-hidden">
      <div className="hidden absolute left-0 top-0 bottom-0 right-0 lg:flex">
        <Image fill alt="A doctor" src={loginBg.src} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 right-0 bg-background flex flex-col lg:grid grid-cols-2 z-10 lg:bg-slate-900/40">
        <div className="hidden items-center justify-center lg:flex">
          <Image alt="Logo" src={logo} draggable={false} />
        </div>

        <div className="flex items-center min-w-screen">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
