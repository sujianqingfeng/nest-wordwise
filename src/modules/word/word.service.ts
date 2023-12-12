import type { DrizzleDB, Word, WordInsert } from '../drizzle/types'
import type { QueryPageResult } from 'types'
import { Inject, Injectable } from '@nestjs/common'
import { subYears } from 'date-fns'
import { and, eq, gt, lte, sql } from 'drizzle-orm'
// import { CalendarDto } from './word.dto'
import { DrizzleProvider } from '../drizzle/drizzle.provider'
import schema from '../drizzle/export-all-schema'
import { QueryPageDto, queryPageMeta } from '@/utils/page'

type PersonWordWhere = { word: string; userId: number }
@Injectable()
export class WordService {
  constructor(@Inject(DrizzleProvider) private drizzleDB: DrizzleDB) {}

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

    // TODO: extract to a function

    // const total = await this.drizzleDB
    //   .select({
    //     total: count()
    //   })
    //   .from(schema.words)
    //   .groupBy(schema.users.id)
    //   .where(this._createUserWhere(userId))

    const list = await this.drizzleDB
      .select()
      .from(schema.words)
      .limit(limit)
      .offset(offset)
      .where(this._createUserWhere(userId))

    // const [list, total] = await Promise.all([
    //   this.prismaService.word.findMany(params),
    //   this.prismaService.word.count({ where: params.where })
    // ])

    const meta = queryPageMeta({
      total: 100,
      limit,
      offset
    })

    return {
      list,
      ...meta
    }
  }

  async groupByCreatedAt(userId: number) {
    const now = new Date()
    const beforeAYear = subYears(now, 1)

    const words = await this.drizzleDB
      .select({
        count: sql`COUNT(${schema.words.id})`,
        date: sql`DATE(${schema.words.createAt})`
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

    console.log(
      '🚀 ~ file: word.service.ts:112 ~ WordService ~ groupByCreatedAt ~ words:',
      words
    )

    return {}

    // const words = await this.prismaService.word.findMany({ where })

    // const map = new Map<string, number>()
    // words.forEach((item) => {
    //   const date = item.createdAt.toISOString().slice(0, 10)
    //   if (map.has(date)) {
    //     map.set(date, map.get(date) + 1)
    //   } else {
    //     map.set(date, 1)
    //   }
    // })

    // const result: CalendarDto = {}
    // for (const [key, value] of map) {
    //   result[key] = { count: value }
    // }
    // return result
  }
}
