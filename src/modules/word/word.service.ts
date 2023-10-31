import { Injectable } from '@nestjs/common'
import { Prisma, Word } from '@prisma/client'
import { PrismaService } from '../common/prisma.service'

@Injectable()
export class WordService {

  constructor(
    private prisma: PrismaService
  ) {}

  words(params: { 
    skip?: number;
    take?: number;
    cursor?: Prisma.WordWhereUniqueInput;
    where?: Prisma.WordWhereInput;
    orderBy?: Prisma.WordOrderByWithRelationInput; 
  }): Promise<Word[]> {
    return this.prisma.word.findMany(params)
  }

  find(where: Prisma.WordWhereUniqueInput) {
    return this.prisma.word.findUnique({ where })
  }

  createWord(data: Prisma.WordUncheckedCreateInput ): Promise<Word> {
    return this.prisma.word.create({ data })
  }

  deleteWord(userId: string, word: string) {
    return this.prisma.word.delete({ where: { word, userId } })
  }
}
