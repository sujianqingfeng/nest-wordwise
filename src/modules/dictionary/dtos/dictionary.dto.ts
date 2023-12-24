import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const QueryDictSchema = z.object({
  word: z.string()
})

export class DictQueryDto extends createZodDto(QueryDictSchema) {}
