export interface Service {
  label: string
  value: string
}
export interface callFilters {
  service: Service
}

export type fieldFilter =
  | 'local'
  | 'position'
  | 'service'
  | 'priority'
  | 'status'
  | 'order'
