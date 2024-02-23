import { Injectable } from '@nestjs/common'
import { and, eq } from 'drizzle-orm'
import { CreateReadLaterDto } from './dtos/read-later.dto'
import { DrizzleService } from '../drizzle/drizzle.service'
import schema from '../drizzle/export-all-schema'
import { PagerDto } from '@/shared/dtos/pager.dto'

@Injectable()
export class ReadLaterService {
  constructor(private drizzleService: DrizzleService) {}

  _createUserWhere(userId: string) {
    return eq(schema.readLater.userId, userId)
  }

  _createReadLaterIdWhere(id: string) {
    return eq(schema.readLater.id, id)
  }

  create(userId: string, value: CreateReadLaterDto) {
    const values = {
      userId,
      ...value
    }
    return this.drizzleService.drizzle
      .insert(schema.readLater)
      .values(values)
      .returning()
  }

  delete(where: { id: string; userId: string }) {
    return this.drizzleService.drizzle
      .delete(schema.readLater)
      .where(
        and(
          this._createUserWhere(where.userId),
          this._createReadLaterIdWhere(where.id)
        )
      )
  }

  list(params: PagerDto & { userId: string }) {
    const { page, size, userId } = params
    return this.drizzleService.queryPagination({
      from: schema.readLater,
      page,
      size,
      where: this._createUserWhere(userId)
    })
  }

  detail(where: { id: string; userId: string }) {
    return this.drizzleService.drizzle.query.readLater.findFirst({
      where: and(
        this._createUserWhere(where.userId),
        this._createReadLaterIdWhere(where.id)
      )
    })
  }
}
