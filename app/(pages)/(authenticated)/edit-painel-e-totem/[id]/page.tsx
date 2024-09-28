"use client"
import { PanelAndTotemForm } from "@/components/custom/panelAndTotemForm";
import { Skeleton } from "@/components/ui/skeleton";
import { usePanelAndTotem } from "@/stores/panelAndTotemStore";
import { useParams } from "next/navigation";

export default function EditPanelAndTotemPage() {
  const {id} = useParams<{ id: string }>();  
  const {  panel, setId } = usePanelAndTotem();  
  setId(id);
  
  return ( 
    <div className="flex flex-col flex-1">
      <h1 className="text-xl leading-none font-medium pt-6 px-8">
        Editar Painel de Chamadas
      </h1>  
     
      {panel ? (
        <PanelAndTotemForm/> 
      ) : (
        <div className="px-8 py-6"> 
            <div className="flex flex-col space-y-3 bg-white px-8 pb-6 py-6 pt-6">
            
              <div className="flex gap-4">
                <Skeleton className="h-6 w-[220px]" />
                <Skeleton className="h-6 w-[220px]" /> 
                <Skeleton className="h-6 w-[220px]" /> 
              </div> 
              <div className="space-y-4">
                <Skeleton className="h-6 w-[220px]" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-6 w-[220px]" />
                <Skeleton className="h-6 w-[220px]" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-6 w-[220px]" />
                <Skeleton className="h-6 w-[220px]" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-[220px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
            </div> 
        </div>
      )}
    </div>  
  );
}
