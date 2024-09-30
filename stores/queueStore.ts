import { ReceptionQueuePassword } from '@/core/models/model/receptionQueuePassword'
import { create } from 'zustand'

type QueueStoreData = {
  passwords: ReceptionQueuePassword[]
  actions: {
    setPasswords: (passwords: ReceptionQueuePassword[]) => void
  }
}

export const useQueueStore = create<QueueStoreData>((set) => ({
  passwords: [],
  actions: {
    setPasswords(passwords) {
      set({ passwords })
    },
  },
}))
