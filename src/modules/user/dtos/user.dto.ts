import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const ChangePwdSchema = z
  .object({
    password: z.string().optional(),
    newPassword: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20)
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'new and confirm not equal'
  })

export class ChangePwdDto extends createZodDto(ChangePwdSchema) {}
