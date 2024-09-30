import { Panel } from '@/core/models/model/panel'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type PanelStore = {
  panels: Panel[]
  selectedPanel: Panel | null
  selectedLocal: string
  selectedPosition: string
  actions: {
    setPanels: (panels: Panel[]) => void
    setSelectedPanel: (panel: Panel | null) => void
    setSelectedLocal: (selectedLocal: string) => void
    setSelectedPosition: (selectedPosition: string) => void
  }
}

export const usePanelStore = create(
  persist<PanelStore>(
    (set) => ({
      panels: [],
      selectedPanel: null,
      selectedLocal: '',
      selectedPosition: '',
      actions: {
        setPanels(panels) {
          set({ panels })
        },
        setSelectedPanel(panel) {
          set({
            selectedPanel: panel,
          })
        },
        setSelectedLocal(selectedLocal) {
          set({ selectedLocal })
        },
        setSelectedPosition(selectedPosition) {
          set({ selectedPosition })
        },
      },
    }),
    {
      name: '@4filas-storage-panel-data',
      storage: createJSONStorage(() => localStorage),
      partialize: (storage) =>
        ({
          selectedPosition: storage.selectedPosition,
          selectedLocal: storage.selectedLocal,
          selectedPanel: storage.selectedPanel,
        }) as PanelStore,
    },
  ),
)
