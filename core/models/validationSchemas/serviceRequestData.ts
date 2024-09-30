import { z } from 'zod'

export const ServiceRequestDataResolver = z.object({
  name: z
    .string()
    .min(1, { message: 'O nome deve conter ao menos 1 caractere' }),
  active: z.string(),
  acronym: z
    .string()
    .min(1, { message: 'A sigla deve conter ao menos 1 caractere' }),
  superPriority: z.string().optional(),
  priority: z.string().optional(),
  observation: z.string().optional(),
  description: z.string().optional(),
  weight: z.string().optional(),
})

export const EditServiceRequestDataResolver = z.object({
  id: z.string().optional(),
  description: z
    .string()
    .min(1, { message: 'O nome deve conter ao menos 1 caractere' }),
  acronym: z
    .string()
    .min(1, { message: 'A sigla deve conter ao menos 1 caractere' }),
  weight: z.string().optional(),
  observation: z.string().optional(),
})

export type ServiceRequestData = z.infer<typeof ServiceRequestDataResolver>
export type EditServiceRequestData = z.infer<
  typeof EditServiceRequestDataResolver
>
