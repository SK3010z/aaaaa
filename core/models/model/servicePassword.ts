export interface ServicePassword {
  id: string
  active: boolean
  weight: number
  acronym: string
  priority: boolean
  created_at: string
  contract_id: string
  description: string
  call_in_panel: boolean
  super_priority: boolean
  panelservicepasswordid: string
  superPriority: boolean
  callInPanel: boolean
  index: number
  observation?: string
  serviceClassificationId?: string
  showInTotem?: boolean
}
