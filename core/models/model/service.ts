export interface Service {
  id: string
  acronym: string
  description: string
  contract_id: string
  call_in_panel: boolean
  priority: boolean
  super_priority: boolean
  weight: number
  active: boolean
  created_at: string
  observation?: string
  index: number
  service_classification_id?: string
}
