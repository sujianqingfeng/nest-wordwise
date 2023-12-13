import type { QueryPageMetaResult } from 'types'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'
import { type SQL, sql } from 'drizzle-orm'
import schema from '@/modules/drizzle/export-all-schema'
import { DrizzleDB } from '@/modules/drizzle/types'

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

export function createPageHelper(drizzleDB: DrizzleDB) {
  const queryPageList = async (
    data: QueryPageDto & { where: SQL; from: typeof schema.words }
  ) => {
    const { limit, offset, where, from } = data

    const totalRecord = await drizzleDB
      .select({
        count: sql<number>`COUNT(${from.id})`.mapWith(Number)
      })
      .from(from)
      .groupBy(from.id)
      .where(where)

    let total = 0
    if (totalRecord.length) {
      total = totalRecord[0].count
    }

    const list = await drizzleDB
      .select()
      .from(from)
      .limit(limit)
      .offset(offset - 1)
      .where(where)

    return {
      list,
      total,
      ...queryPageMeta({
        total,
        limit,
        offset
      })
    }
  }

  return {
    queryPageList
  }
}
