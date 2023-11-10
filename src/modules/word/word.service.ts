import type { QueryPageResult } from 'types'
import { Injectable } from '@nestjs/common'
import { Prisma, Word } from '@prisma/client'
import { PrismaService } from '../common/prisma.service'

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}

  async words(params: {
    skip: number
    take: number
    cursor?: Prisma.WordWhereUniqueInput
    where?: Prisma.WordWhereInput
    orderBy?: Prisma.WordOrderByWithRelationInput
  }): Promise<QueryPageResult<Word>> {
    const [list, total] = await Promise.all([
      this.prisma.word.findMany(params),
      this.prisma.word.count({ where: params.where })
    ])

    const meta = this.prisma.queryPageMeta({
      total,
      skip: params.skip,
      take: params.take
    })

    return {
      list,
      ...meta
    }
  }

  find(where: Prisma.WordWhereUniqueInput) {
    return this.prisma.word.findUnique({ where })
  }

  createWord(data: Prisma.WordUncheckedCreateInput): Promise<Word> {
    return this.prisma.word.create({ data })
  }

  deleteWord(userId: string, word: string) {
    return this.prisma.word.delete({ where: { word, userId } })
  }
}
