'use client'
import { usePanelAndTotem } from '@/stores/panelAndTotemStore'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Switch } from '../ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { RemoveClassificationForm } from './removeClassificationForm'

export const ClassificationsTable: React.FC = () => { 
  const { panel, handleUpdateClassification } = usePanelAndTotem();
 
 
  return (
    <div className="px-6 pb-6 flex flex-col flex-1 py-4">
      <div className="bg-white border rounded flex-col flex-1">
        <div className="h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Ordem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Ativo</TableHead> 
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {panel?.serviceClassifications?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className='flex justify-center'>    
                      <div>
                        {index > 0 && item.index > 0 &&
                        <ChevronUp
                          onClick={() => handleUpdateClassification('index', index - 1, item.id)}
                          className='cursor-pointer'
                        />
                      }
                        <ChevronDown
                          onClick={() => handleUpdateClassification('index', index + 1, item.id)}
                          className='cursor-pointer'
                        />
                      </div>
                  </TableCell>
                  <TableCell>{index} </TableCell>
                  <TableCell>{item.description}</TableCell> 
                  <TableCell>
                    <Switch
                      defaultChecked={item.active}
                      className="data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary/40"
                      thumbClassName="data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral-500"
                      onClick={(e) => {
                        handleUpdateClassification('active', !(e.currentTarget.dataset.state === 'checked'), item.id)
                      }}
                    /> 
                  </TableCell> 
                  <TableCell  className='flex justify-center items-center' > 
                    <RemoveClassificationForm id={item.id} description={item.description} />
                  </TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
