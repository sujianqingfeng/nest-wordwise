import { IsNotEmpty } from 'class-validator'
import { QueryPageDto } from '@/utils/dto'

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
