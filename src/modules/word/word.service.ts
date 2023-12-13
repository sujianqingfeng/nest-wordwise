import type { DrizzleDB, Word, WordInsert } from '../drizzle/types'
import type { QueryPageResult } from 'types'
import { Inject, Injectable } from '@nestjs/common'
import { subYears } from 'date-fns'
import { and, eq, gt, lte, sql } from 'drizzle-orm'
import { CalendarDto } from './word.dto'
import {
  DrizzleHelperProvider,
  DrizzleProvider,
  schema,
  type PageHelper
} from '../drizzle/drizzle.provider'
import { QueryPageDto } from '@/utils/page'

type PersonWordWhere = { word: string; userId: number }
@Injectable()
export class WordService {
  constructor(
    @Inject(DrizzleProvider) private drizzleDB: DrizzleDB,
    @Inject(DrizzleHelperProvider) private drizzleDBHelper: PageHelper
  ) {}

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
    return this.drizzleDB.query.words.findMany({
      where: this._createUserWhere(where.userId)
    })
  }

  word(where: PersonWordWhere) {
    return this.drizzleDB.query.words.findFirst({
      where: this._createUserWordWhere(where)
    })
  }

  deleteWord(where: PersonWordWhere) {
    return this.drizzleDB
      .delete(schema.words)
      .where(this._createUserWordWhere(where))
  }

  async createWord(data: WordInsert): Promise<Word> {
    const { word } = data

    const firstTranslation =
      await this.drizzleDB.query.dictionaryTranslates.findFirst({
        where: this._createWordWhere(word)
      })

    const result = await this.drizzleDB
      .insert(schema.words)
      .values({
        ...data,
        simpleTranslate: firstTranslation.translate
      })
      .returning()

    return result[0]
  }

  async words(
    params: QueryPageDto & { userId: number }
  ): Promise<QueryPageResult<Word>> {
    const { userId, limit, offset } = params

    const result = await this.drizzleDBHelper.queryPageList({
      where: this._createUserWhere(userId),
      limit,
      offset,
      from: schema.words
    })

    return result
  }

  async groupByCreatedAt(userId: number) {
    const now = new Date()
    const beforeAYear = subYears(now, 1)

    const dateCounts = await this.drizzleDB
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
