import type { QueryPageMetaResult } from 'types'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

/**
 * query page dto
 */
export class QueryPageDto {
  @IsNumber()
  @Type(() => Number)
  offset: number = 1
  @IsNumber()
  limit: number = 10
}

export function queryPageMeta(query: {
  total: number
  offset: number
  limit: number
}): QueryPageMetaResult {
  const { total, offset, limit } = query
  const totalPages = Math.ceil(total / limit)
  const isLast = offset >= totalPages
  return { isLast, total, totalPages }
}
