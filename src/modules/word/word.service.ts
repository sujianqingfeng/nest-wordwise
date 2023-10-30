import { Injectable } from '@nestjs/common'
import { Prisma, Word } from '@prisma/client'
import { PrismaService } from '../common/prisma.service'

@Injectable()
export class WordService {

  constructor(
    private readonly prisma: PrismaService
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

  createWord(data: Prisma.WordUncheckedCreateInput ): Promise<Word> {
    return this.prisma.word.create({ data })
  }
}
