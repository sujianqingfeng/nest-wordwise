import { type Dictionary } from '@prisma/client'
import { createDto } from '@/utils/dto'
export class DictQueryResultDto extends createDto<Dictionary>() {
  isCollected: boolean
}