import { IsNotEmpty } from 'class-validator'

export class CreateWordDto {
  @IsNotEmpty()
    word: string
}