import type { QueryPageResult } from 'types'
import { Injectable } from '@nestjs/common'
import { Prisma, Word } from '@prisma/client'
import { CalendarDto } from './word.interface'
import { PrismaService } from '../common/prisma.service'

@Injectable()
export class WordService {
  constructor(private prismaService: PrismaService) {}

  async words(params: {
    skip: number
    take: number
    cursor?: Prisma.WordWhereUniqueInput
    where?: Prisma.WordWhereInput
    orderBy?: Prisma.WordOrderByWithRelationInput
  }): Promise<QueryPageResult<Word>> {
    const [list, total] = await Promise.all([
      this.prismaService.word.findMany(params),
      this.prismaService.word.count({ where: params.where })
    ])

    const meta = this.prismaService.queryPageMeta({
      total,
      skip: params.skip,
      take: params.take
    })

    return {
      list,
      ...meta
    }
  }

  allWords(where?: Prisma.WordWhereInput) {
    return this.prismaService.word.findMany({ where })
  }

  find(where: Prisma.WordWhereUniqueInput) {
    return this.prismaService.word.findUnique({ where })
  }

  async groupByCreatedAt(where?: Prisma.WordWhereInput) {
    const words = await this.prismaService.word.findMany({ where })

    const map = new Map<string, number>()
    words.forEach((item) => {
      const date = item.createdAt.toISOString().slice(0, 10)
      if (map.has(date)) {
        map.set(date, map.get(date) + 1)
      } else {
        map.set(date, 1)
      }
    })

    const result: CalendarDto = {}
    for (const [key, value] of map) {
      result[key] = { count: value }
    }
    return result
  }

  async createWord(data: Prisma.WordUncheckedCreateInput): Promise<Word> {
    const { word } = data
    const first = await this.prismaService.dictionaryTranslate.findFirst({
      where: { word }
    })
    return this.prismaService.word.create({
      data: { ...data, simpleTranslate: first.translate }
    })
  }

  deleteWord(userId: string, word: string) {
    return this.prismaService.word.delete({ where: { word, userId } })
  }
}
