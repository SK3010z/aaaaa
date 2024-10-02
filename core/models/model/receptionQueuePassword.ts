export interface ReceptionQueuePassword {
  id: string
  createdAt: Date
  password: string
  priority: boolean
  superPriority: boolean
  passwordId: string
  customTextCall?: string
  observation?: string
  fowarded?: boolean
  scheduledTime?: string
  deskCaller?: string
  location?: string
  started?: boolean
  startedAt?: Date
  closed?: boolean
}
