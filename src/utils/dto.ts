import { Type } from 'class-transformer'
import { IsNumber} from 'class-validator'

export function createDto<T>() {
  class EmptyDto {}
  return EmptyDto as { new (): T }
}


/**
 * query page dto 
 */
export class QueryPageDto {
  @IsNumber()
  @Type(() => Number)
  skip: number = 1
  @IsNumber()
  take: number = 10
}
