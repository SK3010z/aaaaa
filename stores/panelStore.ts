import { Panel } from '@/core/models/model/panel'
import { create } from 'zustand'

type PanelStore = {
  panels: Panel[]
  selectedPanel: Panel | null
  actions: {
    setPanels: (panels: Panel[]) => void
    setSelectedPanel: (panel: Panel | null) => void
  }
}

export const usePanelStore = create<PanelStore>((set) => ({
  panels: [],
  selectedPanel: null,
  actions: {
    setPanels(panels) {
      set({ panels })
    },
    setSelectedPanel(panel) {
      set({
        selectedPanel: panel,
      })
    },
  },
}))
