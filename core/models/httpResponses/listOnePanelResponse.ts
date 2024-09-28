import { ServiceClassification } from "../model/serviceClassification"
import { ServicePassword } from "../model/servicePassword"
 
export interface listOnePanelResponse {
    id: string
    locationId: string
    description: string
    videoUrl: string
    qrTitle: string
    qrUrl: string
    passwordCallConfiguration: string
    layout: string
    theme: string
    active: boolean
    createdBy: string
    createdAt: string
    logoUri: string
    name: string
    servicePasswordCount: string
    contract_id: string
    serviceClassifications: ServiceClassification[]
    servicePasswords: ServicePassword[]
  } 
