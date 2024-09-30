import { PanelAndTotemTable } from '@/components/custom/panelAndTotemTable'

export default function ListaDePainelETotemPage() {
  return (
    <div className="flex flex-col flex-1">
      <div className="pt-6 px-8">
        <h1 className="text-xl leading-none font-medium">Paineis e totem</h1>
        <span className="text-neutral-400 text-sm">
          A partir desta sessão é permitido cadastrar e editar o Totem / Painel
          de atendimento
        </span>
      </div>
      <PanelAndTotemTable />
    </div>
  )
}
