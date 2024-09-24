import logo from '@/assets/svg/logo-colored-text-white.svg'
import {
  Bell,
  LayoutGrid,
  LayoutList,
  List,
  LogOut,
  Monitor,
  Settings,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
export function NavBar() {
  return (
    <nav className="w-[17.5rem] bg-gradient-to-b from-[#242424] to-[#191919] text-neutral-50 shadow-md">
      <div className="p-6">
        <Image src={logo} alt="Logo" width={112} height={25} />
      </div>

      <section className="p-6">
        <h2 className="mb-6 text-xs font-medium leading-none">Menu</h2>
        <ul className="flex flex-col gap-3">
          <li>
            <Button
              variant="ghost"
              className="rounded-sm w-full flex justify-start gap-4"
              asChild
            >
              <Link href="/">
                <LayoutGrid className="size-4" />
                <span>Início</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="rounded-sm w-full flex justify-start gap-4"
              asChild
            >
              <Link href="/">
                <List className="size-4" />
                <span>Painel de chamadas</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="rounded-sm w-full flex justify-start gap-4"
              asChild
            >
              <Link href="/">
                <Monitor className="size-4" />
                <span>Painel de atendimento</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="rounded-sm w-full flex justify-start gap-4"
              asChild
            >
              <Link href="/">
                <LayoutList className="size-4" />
                <span>Parametrizador</span>
              </Link>
            </Button>
          </li>
        </ul>
      </section>

      <div className="flex px-4">
        <div className="w-full h-px bg-neutral-100 my-8" />
      </div>

      <section className="p-6">
        <h2 className="mb-6 text-xs font-medium leading-none">Outros</h2>
        <ul className="flex flex-col gap-3">
          <li>
            <Button
              variant="ghost"
              className="rounded-sm w-full flex justify-start gap-4"
              asChild
            >
              <Link href="/">
                <Bell className="size-4" />
                <span>Notificações</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="rounded-sm w-full flex justify-start gap-4"
              asChild
            >
              <Link href="/">
                <Settings className="size-4" />
                <span>Configurações</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="rounded-sm w-full flex justify-start gap-4"
              asChild
            >
              <Link href="/">
                <LogOut className="size-4" />
                <span>Sair</span>
              </Link>
            </Button>
          </li>
        </ul>
      </section>
    </nav>
  )
}
