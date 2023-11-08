import { IsNotEmpty } from 'class-validator'

export class CreateWordDto {
  @IsNotEmpty()
  word: string
}

export class QueryWordListDto {
  skip?: number
  take?: number
}
