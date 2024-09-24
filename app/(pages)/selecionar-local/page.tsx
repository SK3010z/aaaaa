'use client'
import { Button } from '@/components/ui/button'
import { Contract } from '@/core/models/model/contract'
import { ServiceLocation } from '@/core/models/model/serviceLocation'
import { getFirstAndSecondName } from '@/core/utils/getFirstAndSecondName'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SelecionarLocalPage() {
  const { data, update } = useSession()
  const { replace } = useRouter()

  async function handleSignOut() {
    await signOut({ redirect: false })
    replace('/')
  }

  async function handleUpdateSession(
    contract: Contract,
    serviceLocation: ServiceLocation,
  ) {
    await update({
      selectedContract: contract,
      selectedServiceLocation: serviceLocation,
    })
    replace('/lista-de-chamadas')
  }

  return (
    <div className="flex flex-col flex-1 h-screen w-screen overflow-y-auto bg-screen-background px-8 py-6">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-medium  leading-relaxed">
          Bem vindo{' '}
          <strong className="capitalize font-medium text-primary">
            {getFirstAndSecondName(data?.user.name).toLowerCase()}
          </strong>
          , <br />
          Onde você está atendendo?
        </h1>
        <Button onClick={handleSignOut}>
          <LogOut />
          <span>Sair</span>
        </Button>
      </div>
      <ul className="flex flex-col gap-10">
        {data?.user.access.map((contract) => (
          <li key={contract.id}>
            <div className="flex items-center gap-4">
              <h2 className="mb-6 font-medium text-lg">{contract.name}</h2>
            </div>
            <ul className="grid grid-cols-[repeat(auto-fit,_minmax(20rem,30rem))] gap-6">
              {contract.service_locations.map((location) => (
                <li key={location.id}>
                  <Button
                    variant="custom"
                    className="bg-white rounded-md border shadow-sm px-4 py-6 w-full"
                    onClick={() => handleUpdateSession(contract, location)}
                  >
                    <span>{location.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
