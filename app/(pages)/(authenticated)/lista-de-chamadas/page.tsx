import { CallTable } from '@/components/custom/callTable'
import { HomeCards } from '@/components/custom/homeCards'

export default function ListaDeChamadasPage() {
  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-xl leading-none font-medium pt-6 px-8">
        Painel de chamadas
      </h1>
      <HomeCards />
      <CallTable />
    </div>
  )
}
