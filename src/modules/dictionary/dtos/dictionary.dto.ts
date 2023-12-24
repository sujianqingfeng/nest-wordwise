import type { IDictionaryQueryResult } from '../providers/provider.interface'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { createDtoByType } from '@/utils/dto'
export class DictQueryResultDto extends createDtoByType<IDictionaryQueryResult>() {}

const QueryDictSchema = z.object({
  word: z.string()
})

export class DictQueryDto extends createZodDto(QueryDictSchema) {}
