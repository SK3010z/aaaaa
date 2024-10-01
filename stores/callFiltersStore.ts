import { Service } from '@/core/models/model/callFilter'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type CallFiltersStore = {
  selectedService: Service[]
  selectedLocal: string
  selectedPosition: string
  selectedPriority: string[]
  selectedStatus: string[]
  selectedOrder: string
  actions: {
    setSelectedService: (selectedService: Service[]) => void
    setSelectedLocal: (selectedLocal: string) => void
    setSelectedPosition: (selectedPosition: string) => void
    setSelectedPriority: (selectedPriority: string[]) => void
    setSelectedStatus: (selectedStatus: string[]) => void
    setSelectedOrder: (selectedOrder: string) => void
  }
}

export const useCallFiltersStore = create(
  persist<CallFiltersStore>(
    (set) => ({
      selectedService: [],
      selectedLocal: '',
      selectedPosition: '',
      selectedPriority: [],
      selectedStatus: [],
      selectedOrder: '',
      actions: {
        setSelectedService(selectedService) {
          set({
            selectedService,
          })
        },
        setSelectedLocal(selectedLocal) {
          set({ selectedLocal })
        },
        setSelectedPosition(selectedPosition) {
          set({ selectedPosition })
        },
        setSelectedPriority(selectedPriority) {
          set({ selectedPriority })
        },
        setSelectedStatus(selectedStatus) {
          set({ selectedStatus })
        },
        setSelectedOrder(selectedOrder) {
          set({ selectedOrder })
        },
      },
    }),
    {
      name: '@4filas-storage-callFilters-data',
      storage: createJSONStorage(() => localStorage),
      partialize: (storage) =>
        ({
          selectedService: storage.selectedService,
          selectedLocal: storage.selectedLocal,
          selectedPosition: storage.selectedPosition,
          selectedPriority: storage.selectedPriority,
          selectedStatus: storage.selectedStatus,
          selectedOrder: storage.selectedOrder,
        }) as CallFiltersStore,
    },
  ),
)
