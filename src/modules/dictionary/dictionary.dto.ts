import type { IDictionaryQueryResult } from './providers/provider.interface'
import { IsNotEmpty } from 'class-validator'
import { createDto } from '@/utils/dto'
export class DictQueryResultDto extends createDto<IDictionaryQueryResult>() {}

export class DictQueryDto {
  @IsNotEmpty()
  word: string
}
