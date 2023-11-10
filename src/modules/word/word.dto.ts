import { QueryPageDto } from '@/utils/dto'
import { IsNotEmpty,IsNumber } from 'class-validator'

export class CreateWordDto {
  @IsNotEmpty()
  word: string
}

export class QueryWordListDto extends QueryPageDto {
}
