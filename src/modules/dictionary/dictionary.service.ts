import { Injectable } from '@nestjs/common'
import { Dictionary, Prisma } from '@prisma/client'
import { IDictionaryQueryResult } from './providers/provider.interface'
import { stripWord } from './providers/utils'
import { YouDaoDictionaryService } from './providers/youdao.service'
import { PrismaService } from '../common/prisma.service'

@Injectable()
export class DictionaryService {
  constructor(
    private prismaService: PrismaService,
    private youdaoDictionaryService: YouDaoDictionaryService
  ) {}

  async query(word: string): Promise<IDictionaryQueryResult> {
    const localResult = await this.prismaService.dictionary.findUnique({
      where: { word },
      include: {
        forms: true,
        translates: true
      }
    })
    console.log(
      '🚀 ~ file: dictionary.service.ts:23 ~ DictionaryService ~ query ~ localResult:',
      localResult
    )
    if (localResult) {
      return localResult
    }

    const result = await this.youdaoDictionaryService.query(word)
    const { forms, translates, ...rest } = result
    this.writeDictionary({
      word,
      sw: stripWord(word),
      ...rest,
      translates: {
        createMany: {
          data: translates.map((item) => ({ ...item, word }))
        }
      },
      forms: {
        createMany: {
          data: forms.map((item) => ({ ...item, word }))
        }
      }
    })
    return result
  }

  async writeDictionary(data: Prisma.DictionaryCreateInput) {
    const { word } = data
    const result = await this.prismaService.dictionary.findUnique({
      where: { word }
    })
    console.log(
      '🚀 ~ file: dictionary.service.ts:56 ~ DictionaryService ~ writeDictionary ~ result:',
      result
    )

    if (!result) {
      console.log(
        '🚀 ~ file: dictionary.service.ts:62 ~ DictionaryService ~ writeDictionary ~ result:',
        result
      )
      const res = await this.prismaService.dictionary.create({
        data
      })
      console.log(
        '🚀 ~ file: dictionary.service.ts:66 ~ DictionaryService ~ writeDictionary ~ res:',
        res
      )
    }
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
