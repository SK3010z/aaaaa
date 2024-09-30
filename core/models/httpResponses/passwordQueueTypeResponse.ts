export interface passwordQueueType { 
  acronym: string
  id: string
  description: string 
}

export interface passwordQueueTypeResponse { 
  servicePasswords: passwordQueueType[]
}