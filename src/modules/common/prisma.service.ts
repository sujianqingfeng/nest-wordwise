import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  queryPageMeta(query: { total: number; skip: number; take: number }) {
    const { total, skip, take } = query
    const totalPages = Math.ceil(total / take)
    const isLast = skip >= totalPages
    return { isLast, total }
  }
}
