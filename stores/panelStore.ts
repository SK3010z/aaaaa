import { MOCK_LOCALS, MOCK_POSITIONS } from '@/core/mock/positions'
import { Panel } from '@/core/models/model/panel'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type Option = {
  label: string
  value: string
}

type PanelStore = {
  panels: Panel[]
  selectedPanel: Option | null
  locals: Option[]
  positions: Option[]
  selectedLocal: Option | null
  selectedPosition: Option | null
  actions: {
    setPanels: (panels: Panel[]) => void
    setSelectedPanel: (panel: Option | null) => void
    setSelectedLocal: (selectedLocal: Option | null) => void
    setSelectedPosition: (selectedPosition: Option | null) => void
    addLocal: (option: Option) => void
    addPosition: (position: Option) => void
    removeLocal: (value: string) => void
    removePosition: (value: string) => void
  }
}

export const usePanelStore = create(
  persist<PanelStore>(
    (set) => ({
      panels: [],
      selectedPanel: null,
      selectedLocal: null,
      selectedPosition: null,
      locals: MOCK_LOCALS.map((local) => ({
        label: local,
        value: local,
      })),
      positions: MOCK_POSITIONS.map((position) => ({
        label: position,
        value: position,
      })),
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
        addLocal(option) {
          set((state) => ({
            locals: [option, ...state.locals],
            selectedLocal: option,
          }))
        },
        addPosition(position) {
          set((state) => ({
            positions: [position, ...state.positions],
            selectedPosition: position,
          }))
        },
        removeLocal(value) {
          set((state) => ({
            locals: state.locals.filter((local) => local.value !== value),
          }))
        },
        removePosition(value) {
          set((state) => ({
            positions: state.locals.filter(
              (position) => position.value !== value,
            ),
          }))
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
          locals: storage.locals,
          positions: storage.positions,
        }) as PanelStore,
    },
  ),
)
