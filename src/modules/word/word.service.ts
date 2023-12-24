import type { Word, WordInsert } from '../drizzle/types'
import { Injectable } from '@nestjs/common'
import { subYears } from 'date-fns'
import { and, eq, gt, lte, sql } from 'drizzle-orm'
import { CalendarDto } from './dtos/word.dto'
import { DrizzleService } from '../drizzle/drizzle.service'
import schema from '../drizzle/export-all-schema'
import { PagerDto } from '@/shared/dtos/pager.dto'
import { PaginationResult } from '@/shared/interfaces/paginator.interface'

type PersonWordWhere = { word: string; userId: number }
@Injectable()
export class WordService {
  constructor(private drizzleService: DrizzleService) {}

  _createUserWordWhere(where: PersonWordWhere) {
    return and(
      this._createWordWhere(where.word),
      this._createUserWhere(where.userId)
    )
  }

  _createUserWhere(userId: number) {
    return eq(schema.words.userId, userId)
  }

  _createWordWhere(word: string) {
    return eq(schema.words.word, word)
  }

  allWords(where: { userId: number }) {
    return this.drizzleService.drizzle.query.words.findMany({
      where: this._createUserWhere(where.userId)
    })
  }

  word(where: PersonWordWhere) {
    return this.drizzleService.drizzle.query.words.findFirst({
      where: this._createUserWordWhere(where)
    })
  }

  deleteWord(where: PersonWordWhere) {
    return this.drizzleService.drizzle
      .delete(schema.words)
      .where(this._createUserWordWhere(where))
  }

  async createWord(data: WordInsert): Promise<Word> {
    const { word } = data

    const firstTranslation =
      await this.drizzleService.drizzle.query.dictionaryTranslates.findFirst({
        where: this._createWordWhere(word)
      })

    const result = await this.drizzleService.drizzle
      .insert(schema.words)
      .values({
        ...data,
        simpleTranslation: firstTranslation.translation
      })
      .returning()

    return result[0]
  }

  async words(
    params: PagerDto & { userId: number }
  ): Promise<PaginationResult<Word>> {
    const { userId, page, size } = params

    const result = await this.drizzleService.queryPagination({
      from: schema.words,
      page,
      size,
      where: this._createUserWhere(userId)
    })

    return result
  }

  async groupByCreatedAt(userId: number) {
    const now = new Date()
    const beforeAYear = subYears(now, 1)

    const dateCounts = await this.drizzleService.drizzle
      .select({
        count: sql<number>`COUNT(${schema.words.id})`.mapWith(Number),
        date: sql<string>`DATE(${schema.words.createAt})`
      })
      .from(schema.words)
      .where(
        and(
          this._createUserWhere(userId),
          gt(schema.words.createAt, beforeAYear),
          lte(schema.words.createAt, now)
        )
      )
      .groupBy(sql`DATE(${schema.words.createAt})`)

    const result: CalendarDto = {}
    for (const dateCount of dateCounts) {
      result[dateCount.date] = { count: dateCount.count }
    }
    return result
  }
}
