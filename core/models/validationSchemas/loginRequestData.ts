import { z } from 'zod'

export const loginRequestDataResolver = z.object({
  username: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve conter ao menos 6 caracteres' }),
})

export type LoginRequestData = z.infer<typeof loginRequestDataResolver>
