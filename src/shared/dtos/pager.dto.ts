import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const PagerSchema = z.object({
  size: z.coerce.number().min(1).max(50).default(10).optional(),
  page: z.coerce.number().min(1).default(1).optional()
})

/**
 * query page dto
 */
export class PagerDto extends createZodDto(PagerSchema) {}
