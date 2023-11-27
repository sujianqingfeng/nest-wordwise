import type { QueryPageResult } from 'types'
import { Injectable } from '@nestjs/common'
import { Prisma, Word } from '@prisma/client'
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
