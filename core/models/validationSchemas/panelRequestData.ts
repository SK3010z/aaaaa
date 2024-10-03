import { z } from 'zod'

export const panelRequestDataResolver = z.object({
  locationId: z.string({
    message: 'Campo obrigatório',
  }),
  layout: z.string({
    message: 'Campo obrigatório',
  }),
  callConfig: z.string({
    message: 'Campo obrigatório',
  }),
  description: z.string().min(1, { message: 'A descrição deve ser informada' }),
  videoUrl: z.string().optional(),
  qrUrl: z.string().optional(),
  qrTitle: z.string().optional(),
  theme: z.string().min(1, { message: 'O Tema deve ser informado' }),
})

export const editPanelRequestDataResolver = z.object({
  layout: z.string({
    message: 'Campo obrigatório',
  }),
  callConfig: z.string({
    message: 'Campo obrigatório',
  }),
  description: z.string().min(1, { message: 'A descrição deve ser informada' }),
  videoUrl: z.string().optional(),
  qrUrl: z.string().optional(),
  qrTitle: z.string().optional(),
  theme: z.string().min(1, { message: 'O Tema deve ser informado' }),
  active: z.string().optional(),
  videoProvider: z.string().optional(),
})

export type editPanelRequestData = z.infer<typeof editPanelRequestDataResolver>

export type PanelRequestData = z.infer<typeof panelRequestDataResolver>
