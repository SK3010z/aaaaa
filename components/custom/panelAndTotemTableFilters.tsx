'use client'
import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { Plus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function PanelAndTotemTableFilters() {
  const { handleSearch } = usePanelAndTotem()
  const { replace } = useRouter()

  return (
    <div className="flex items-center justify-between p-6">
      <div className="relative flex items-center">
        <Input
          className="h-10 pl-10 min-w-[20rem]"
          placeholder="pesquisar"
          onInputCapture={(e) => {
            handleSearch(e.currentTarget.value)
          }}
        />
        <Search className="size-4 absolute left-4" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="custom" onClick={() => replace(`/new-painel-e-totem`)}>
          <Plus />
          <span>Cadastrar novo</span>
        </Button>
      </div>
    </div>
  )
}
