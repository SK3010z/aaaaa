'use client'

import { useApi } from '@/core/hooks/useApi'
import { listOnePanelResponse } from '@/core/models/httpResponses/listOnePanelResponse'
import { ListPanelResponse } from '@/core/models/httpResponses/listPanelResponse'
import { ClassificationRequestData } from '@/core/models/validationSchemas/classificationRequestData'
import {
  editPanelRequestData,
  PanelRequestData,
} from '@/core/models/validationSchemas/panelRequestData'
import {
  EditServiceRequestData,
  ServiceRequestData,
} from '@/core/models/validationSchemas/serviceRequestData'
import { paramsV2Api } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

interface PanelAndTotemStoreData {
  handleSearch: (name?: string) => void
  panels?: ListPanelResponse
  handleActivePannel: (id: string, checked: boolean) => void
  handleUpdateService: (
    control: string,
    value: string | number | boolean,
    id: string,
  ) => void
  handleUpdateClassification: (
    control: string,
    value: string | number | boolean,
    id: string,
  ) => void
  handleConnectServiceToPanel: (
    panelId: string,
    serviceId: string,
    active: boolean,
  ) => void
  createClassification: (data: ClassificationRequestData) => void
  handleRemoveClassification: (id: string) => void
  handleRemoveService: (panelId: string, id: string) => void
  createServicePasswordWithPanel: (
    panelId: string,
    data: ServiceRequestData,
  ) => void
  updateServicePassword: (id: string, data: EditServiceRequestData) => void
  findServicePasswordById: (id: string) => Promise<EditServiceRequestData>
  updatePanel: (id: string, data: PanelRequestData) => void
  addPanel: (data: editPanelRequestData) => void
  setId: (id: string) => void
  colors?: {
    id: number
    colorClass: string
    value: string
  }[]
  serviceActive: {
    value: boolean
    label: string
  }[]
  panel?: listOnePanelResponse | null
  servicePasswordWeight: {
    value: string
    label: string
  }[]
  panelId: string
  panelLayouts: {
    value: string
    label: string
  }[]
  passwordCallConfigurations: {
    value: string
    label: string
  }[]
}

const PanelAndTotemStore = createContext({} as PanelAndTotemStoreData)

export const PanelAndTotemProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { api } = useApi()
  const [panels, setPanels] = useState<ListPanelResponse>([])
  const session = useSession()
  const [panel, setPanel] = useState<listOnePanelResponse | null>(null)
  const [id, setId] = useState<string>('')

  const colors = [
    {
      id: 0,
      colorClass: 'bg-cyan-500',
      value: 'oceanBlue',
    },
    {
      id: 1,
      colorClass: 'bg-yellow-500',
      value: 'yellow',
    },
    {
      id: 2,
      colorClass: 'bg-primary',
      value: 'orange',
    },
    {
      id: 3,
      colorClass: 'bg-blue-500',
      value: 'darkBlue',
    },
    {
      id: 4,
      colorClass: 'bg-green-500',
      value: 'green',
    },
    {
      id: 5,
      colorClass: 'bg-purple-500',
      value: 'purple',
    },
  ]
  const panelLayouts = [
    { value: 'standart', label: 'Padrão' },
    { value: 'withMedia', label: 'Com mídia' },
    { value: 'withMediaNextCalls', label: 'Com mídia - Próximas Chamadas' },
  ]

  const serviceActive = [
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' },
  ]

  const servicePasswordWeight = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ]

  const passwordCallConfigurations = [ 
    { value: 'name', label: 'Chamar Nome' }, 
    { value: 'notCallName', label: 'Não chamar nome' }, 
  ]

  const fetchPanels = useCallback(
    async ({ name = '' }: { name: string }) => {
      try {
        try {
          const response = await api.get<ListPanelResponse>('panel', {
            params: { name },
          })
          return setPanels(response.data)
        } catch (err) {
          console.log(err)
        }
      } finally {
        console.log('finally')
      }
    },
    [setPanels, api],
  )

  const handleSearch = useCallback(
    (name?: string) => {
      if (name)
        fetchPanels({
          name,
        })
      else
        fetchPanels({
          name: '',
        })
    },
    [fetchPanels],
  )

  const fecthPanel = useCallback(async () => {
    if (!id) return
    const result = await paramsV2Api.get<listOnePanelResponse>(`panel/${id}`, {
      headers: { Authorization: `Bearer ${session.data?.user.token}` },
    })
    setPanel(result.data)
  }, [id, session])

  async function handleActivePannel(id: string, checked: boolean) {
    try {
      await paramsV2Api.put(
        `panel/${id}`,
        { active: checked },
        {
          headers: { Authorization: `Bearer ${session.data?.user.token}` },
        },
      )
      toast.success('Painel atualizado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }
  const queryClient = useQueryClient()

  async function handleUpdateService(
    control: string,
    value: string | number | boolean,
    id: string,
  ) {
    try {
      await api.patch(
        `service-password/${id}`,
        { [control]: value },
        {
          headers: { Authorization: `Bearer ${session.data?.user.token}` },
        },
      )
      fecthPanel(); 
      toast.success('Serviço atualizado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdateClassification(
    control: string,
    value: string | number | boolean,
    id: string,
  ) {
    try {
      await api.patch(
        `service-classification/${id}`,
        { [control]: value },
        {
          headers: { Authorization: `Bearer ${session.data?.user.token}` },
        },
      )
      fecthPanel(); 
      toast.success('Classificações atualizado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  async function handleConnectServiceToPanel(
    panelId: string,
    serviceId: string,
    active: boolean,
  ) {
    try {
      if (active) {
        await paramsV2Api.post(
          `panel/${panelId}/service-password/${serviceId}/add`,
          {},
          {
            headers: { Authorization: `Bearer ${session.data?.user.token}` },
          },
        )
        toast.success('Serviço conectado ao painel com sucesso')
      } else {
        await paramsV2Api.delete(
          `panel/${panelId}/service-password/${serviceId}/remove`,
          {
            headers: { Authorization: `Bearer ${session.data?.user.token}` },
          },
        )
        fecthPanel(); 
        toast.success('Serviço desconectado ao painel com sucesso')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function createClassification(data: ClassificationRequestData) {
    try {
      console.log('teste', data)
      await api.post(
        `service-classification`,
        { description: data.name, active: data.active === 'true' },
        {
          headers: { Authorization: `Bearer ${session.data?.user.token}` },
        },
      )
      fecthPanel(); 
      toast.success('Classificação criada com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveClassification(id: string) {
    try {
      await api.delete(`service-classification/${id}`, {
        headers: { Authorization: `Bearer ${session.data?.user.token}` },
      })
      fecthPanel(); 
      toast.success('Classificação removida com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveService(panelId: string, id: string) {
    try {
      await api.patch(
        `service-password/${id}`,
        {
          active: false,
        },
        {
          headers: { Authorization: `Bearer ${session.data?.user.token}` },
        },
      )
      fecthPanel(); 
      toast.success('Serviço removido com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  async function createServicePasswordWithPanel(
    panelId: string,
    data: ServiceRequestData,
  ) {
    try {
      await api.post(
        `service-password/panel/${panelId}`,
        {
          description: data.name,
          acronym: data.acronym,
          active: data.active === 'true',
          weight: parseInt(data.weight ?? '1'),
          observation: data.observation,
          priority: data.priority === 'true',
          superPriority: data.superPriority === 'true',
        },
        {
          headers: { Authorization: `Bearer ${session.data?.user.token}` },
        },
      )
      fecthPanel(); 
      toast.success('Serviço criado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  async function findServicePasswordById(
    id: string,
  ): Promise<EditServiceRequestData> {
    try {
      const response = await api.get(`service-password/${id}`, {
        headers: { Authorization: `Bearer ${session.data?.user.token}` },
      })
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function updateServicePassword(
    id: string,
    data: EditServiceRequestData,
  ) {
    try {
      await api.patch(
        `service-password/${id}`,
        {
          description: data.description,
          acronym: data.acronym,
          weight: parseInt(data.weight ?? '1'),
          observation: data.observation,
        },
        {
          headers: { Authorization: `Bearer ${session.data?.user.token}` },
        },
      )
      fecthPanel(); 
      toast.success('Serviço atualizado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  async function updatePanel(id: string, data: PanelRequestData) {
    try {
      await paramsV2Api.put(`panel/${id}`, data, {
        headers: { Authorization: `Bearer ${session.data?.user.token}` },
      })
      fecthPanel(); 
      toast.success('Serviço atualizado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  async function addPanel(data: editPanelRequestData) {
    try {
      await api.post(`panel`, data, {
        headers: { Authorization: `Bearer ${session.data?.user.token}` },
      })
      fecthPanel(); 
      toast.success('Painel cadastrado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPanels({
      name: '',
    })
  }, [fetchPanels])

  useEffect(() => {
    fecthPanel()
  }, [fecthPanel])

  return (
    <PanelAndTotemStore.Provider
      value={{
        setId,
        handleSearch,
        panels,
        panel,
        handleActivePannel,
        handleUpdateService,
        handleUpdateClassification,
        handleConnectServiceToPanel,
        colors,
        serviceActive,
        createClassification,
        handleRemoveClassification,
        handleRemoveService,
        servicePasswordWeight,
        createServicePasswordWithPanel,
        panelId: id,
        findServicePasswordById,
        updateServicePassword,
        panelLayouts,
        passwordCallConfigurations,
        updatePanel,
        addPanel,
      }}
    >
      {children}
    </PanelAndTotemStore.Provider>
  )
}

export const usePanelAndTotem = () => useContext(PanelAndTotemStore)
