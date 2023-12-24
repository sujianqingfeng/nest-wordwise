import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { PagerDto } from '@/shared/dtos/pager.dto'

const CreateWordSchema = z.object({
  word: z.string()
})

const WordDto = createZodDto(CreateWordSchema)

export class CreateWordDto extends WordDto {}

export class QueryWordListDto extends PagerDto {}

// collected
export class QueryCollectedWordDto extends WordDto {}

export interface CalendarDto {
  [key: string]: {
    count: number
  }
}
