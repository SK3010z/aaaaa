import { AddPanelForm } from "@/components/custom/addPanelForm";

export default function NewPanelAndTotemPage() {
  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-xl leading-none font-medium pt-6 px-8">
        Novo Painel de chamadas
      </h1>  
      <AddPanelForm />
    </div>
  )
}
