'use client'
import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { Separator } from '../ui/separator'
import { AddClassificationForm } from './addClassificationForm'
import { AddServiceForm } from './addServiceForm'
import { ClassificationsTable } from './classificationsTable'
import { EditPanelForm } from './editPanelForm'
import { ServicesTable } from './servicesTable'

export const PanelAndTotemForm: React.FC = (data) => {
  const { panel } = usePanelAndTotem();  
 
  return (
    <div className="px-8 pb-6 flex flex-col flex-1 py-6">
      <div className="bg-white border rounded flex-col flex-1 max-h-[80vh] overflow-y-auto">
          <EditPanelForm panel={panel} /> 
         
          <div>
              <Separator />
          </div> 

          <div className="flex w-full">
            <div className="flex w-full p-6 items-center justify-between">
                <div>
                    Classificações
                </div> 
                <AddClassificationForm />
            </div>
          </div>

          <ClassificationsTable /> 

          <div className="flex w-full">
            <div className="flex w-full p-6 items-center justify-between">
                <div>
                  Serviços
                </div>
                <AddServiceForm /> 
            </div>
          </div>

          <ServicesTable />

          <div>
              <Separator />
          </div>
      </div>
      </div>
  )
}
