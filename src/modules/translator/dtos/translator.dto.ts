import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const TranslateTextSchema = z.object({
  text: z.string()
})

export class TranslateTextDto extends createZodDto(TranslateTextSchema) {}
