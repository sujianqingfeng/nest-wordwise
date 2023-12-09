import { IsNotEmpty } from 'class-validator'
import { QueryPageDto } from '@/utils/page'

export class CreateWordDto {
  @IsNotEmpty()
  word: string
}

export class QueryWordListDto extends QueryPageDto {}

// collected
export class QueryCollectedWordDto {
  @IsNotEmpty()
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
