import { Injectable } from '@nestjs/common'
import { Dictionary, Prisma } from '@prisma/client'
import { PrismaService } from '../common/prisma.service'

@Injectable()
export class DictionaryService {
  constructor(private prismaService: PrismaService) {}

  word(where: Prisma.DictionaryWhereUniqueInput) {
    return this.prismaService.dictionary.findUnique({
      where
    })
  }

  words(params: {
    skip?: number
    take?: number
    cursor?: Prisma.DictionaryWhereUniqueInput
    where?: Prisma.DictionaryWhereInput
    orderBy?: Prisma.DictionaryOrderByWithRelationInput
  }): Promise<Dictionary[]> {
    return this.prismaService.dictionary.findMany(params)
  }
}
