import { Injectable } from '@nestjs/common'
import { and, eq } from 'drizzle-orm'
import { CreateReadLaterDto } from './dtos/read-later.dto'
import { DrizzleService } from '../drizzle/drizzle.service'
import schema from '../drizzle/export-all-schema'

@Injectable()
export class ReadLaterService {
  constructor(private drizzleService: DrizzleService) {}

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
          eq(schema.readLater.userId, where.userId),
          eq(schema.readLater.id, where.id)
        )
      )
  }
}
