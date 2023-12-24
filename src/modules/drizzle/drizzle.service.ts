import type {
  PaginationMetaResult,
  PaginationResult
} from '@/shared/interfaces/paginator.interface'
import type { PgTableWithColumns } from 'drizzle-orm/pg-core'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { DefaultLogger, LogWriter } from 'drizzle-orm'
import { type SQL, sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import schema from './export-all-schema'
import { type DrizzleDB } from './types'
import { DATABASE_URL } from '@/constants'
import { PagerDto } from '@/shared/dtos/pager.dto'
import { createLogger } from '@/utils/logger'

const logger = createLogger('drizzle')

class NestLogWriter implements LogWriter {
  write(message: string) {
    logger.log(message)
  }
}

export function queryPageMeta(query: {
  total: number
  page: number
  size: number
}): PaginationMetaResult {
  const { total, page, size } = query
  const totalPage = Math.ceil(total / size)
  const hasNextPage = page < totalPage
  const hasPrevPage = page > 1
  return { hasNextPage, hasPrevPage, total, totalPage }
}

@Injectable()
export class DrizzleService implements OnModuleInit {
  public drizzle: DrizzleDB

  constructor() {
    const client = new Client({
      connectionString: DATABASE_URL
    })
    // await client.connect()
    this.drizzle = drizzle(client, {
      schema,
      logger: new DefaultLogger({
        writer: new NestLogWriter()
      })
    })
  }

  async queryPagination<T extends PgTableWithColumns<any>>(
    data: PagerDto & { where: SQL; from: T }
  ): Promise<PaginationResult<T['$inferSelect']>> {
    const { page, size, where, from } = data

    const totalRecord = await this.drizzle
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

    const list = await this.drizzle
      .select()
      .from(from)
      .limit(size)
      .offset((page - 1) * size)
      .where(where)

    return {
      data: list,
      total,
      ...queryPageMeta({
        total,
        page,
        size
      })
    }
  }

  onModuleInit() {}
}
