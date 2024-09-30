export interface TotemItemData {
  priority: boolean
  super_priority: boolean
  id: string
  description: string
  acronym: string
  panelservicepasswordid: string
}

export interface ServiceClassification {
  id: string
  index: number
  active: boolean
  created_at: string
  contract_id: string
  description: string
  servicepasswords: TotemItemData[]
}
