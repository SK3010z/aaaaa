import { Service } from '@/core/models/model/callFilter'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type CallFiltersStore = {
  selectedService: Service[] 
  actions: {
    setSelectedService: (selectedService: Service[]) => void
  }
}

export const useCallFiltersStore = create(
  persist<CallFiltersStore>(
    (set) => ({ 
      selectedService: [], 
      actions: {
        setSelectedService(selectedService) {
          set({
            selectedService: selectedService,
          })
        }
      },
    }),
    {
      name: '@4filas-storage-callFilters-data',
      storage: createJSONStorage(() => localStorage),
      partialize: (storage) =>
        ({
          selectedService: storage.selectedService, 
        }) as CallFiltersStore,
    },
  ),
)
