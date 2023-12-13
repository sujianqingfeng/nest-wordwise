import type { IDictionaryQueryResult } from './providers/provider.interface'
import { IsNotEmpty } from 'class-validator'
import { createDtoByType } from '@/utils/dto'
export class DictQueryResultDto extends createDtoByType<IDictionaryQueryResult>() {}

export class DictQueryDto {
  @IsNotEmpty()
  word: string
}
