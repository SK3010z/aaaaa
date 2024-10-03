export interface Panel {
  id: string
  locationId: string
  description: string
  videoUrl: string
  qrTitle: string
  qrUrl: string
  passwordCallConfiguration: string
  callConfig?: string
  layout: string
  theme: string
  active: boolean
  createdBy: string
  createdAt: string
  logoUri: string
  name: string
  servicePasswordCount: string
}
