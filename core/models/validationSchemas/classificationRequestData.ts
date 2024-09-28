import { z } from 'zod'

export const classificationRequestDataResolver = z.object({
  name: z.string().min(1, { message: 'O nome deve conter ao menos 1 caractere' }),
  active: z.string()
})

export type ClassificationRequestData = z.infer<typeof classificationRequestDataResolver>
