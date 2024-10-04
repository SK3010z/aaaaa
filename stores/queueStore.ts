import { ReceptionQueuePassword } from '@/core/models/model/receptionQueuePassword'
import { produce } from 'immer'
import { create } from 'zustand'

type QueueStoreData = {
  passwords: ReceptionQueuePassword[]
  actions: {
    addPassword: (password: ReceptionQueuePassword) => void
    setPasswords: (passwords: ReceptionQueuePassword[]) => void
    removePassword: (passwordId: string) => void
    updatePassword: (
      passwordId: string,
      data: Partial<ReceptionQueuePassword>,
    ) => void
  }
}

export const useQueueStore = create<QueueStoreData>((set) => ({
  passwords: [],
  actions: {
    setPasswords(passwords) {
      set({ passwords })
    },
    addPassword(password) {
      set((state) => ({ passwords: [...state.passwords, password] }))
    },
    removePassword(passwordId) {
      set((state) => ({
        passwords: state.passwords.filter(
          (password) => password.id !== passwordId,
        ),
      }))
    },
    updatePassword(passwordId, data) {
      set(({ passwords }) => {
        const passIdx = passwords.findIndex((pwd) => pwd.id === passwordId)
        if (passIdx >= 0) {
          const newPasswords = produce(passwords, (draft) => {
            draft[passIdx] = { ...draft[passIdx], ...data }
          })
          return { passwords: newPasswords }
        }
        return { passwords }
      })
    },
  },
}))
