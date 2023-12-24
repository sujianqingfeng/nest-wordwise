import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { PagerDto } from '@/shared/dtos/pager.dto'

const CreateWordSchema = z.object({
  word: z.string()
})

export class CreateWordDto extends createZodDto(CreateWordSchema) {}

export class QueryWordListDto extends PagerDto {}

// collected
export class QueryCollectedWordDto extends createZodDto(CreateWordSchema) {
  word: string
}

export class QueryCollectedResultDto {
  isCollected: boolean
}

export interface CalendarDto {
  [key: string]: {
    count: number
  }
}
