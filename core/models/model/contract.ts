import { ServiceLocation } from './serviceLocation'

export interface Contract {
  id: string
  name: string
  service_locations: ServiceLocation[]
}
