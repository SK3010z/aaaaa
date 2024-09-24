'use client'
import {
  Plus
} from 'lucide-react'
import { Button } from '../ui/button'

export function PanelAndTotemTableFilters() { 
  return (
    <div className="flex items-center justify-end p-6"> 
      <div className="flex items-center gap-4">  
        <Button variant="custom">
          <Plus />
          <span>Cadastrar novo</span>
        </Button> 
      </div>
    </div>
  )
}
