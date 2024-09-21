import logo from '@/assets/svg/logo-colored-text-white.svg'
import Image from 'next/image'

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-screen h-screen bg-neutral-900">
      <div className="animate-pulse">
        <Image
          src={logo}
          width={200}
          height={40}
          alt="Logo"
          className="h-auto max-w-full"
        />
      </div>
      <h2 className="text-base text-neutral-50">Carregando...</h2>
    </div>
  )
}
