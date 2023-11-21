import type { IDictionaryQueryResult } from './providers/provider.interface'
import { createDto } from '@/utils/dto'
export class DictQueryResultWithUserDataDto extends createDto<IDictionaryQueryResult>() {
  isCollected: boolean
}
