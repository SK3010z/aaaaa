import { Contract } from './contract'
import { ServiceLocation } from './serviceLocation'

export interface SessionData {
  name: string
  token: string
  selectedContract: Contract | null
  selectedServiceLocation: ServiceLocation | null
  access: Contract[]
  callBackUrl: string
}
