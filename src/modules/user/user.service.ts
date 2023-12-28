import type { UserInsert } from '../drizzle/types'
import { Injectable } from '@nestjs/common'
import { eq, or } from 'drizzle-orm'
import { DrizzleService } from '../drizzle/drizzle.service'
import { users } from '../drizzle/schema'

@Injectable()
export class UserService {
  constructor(private drizzleService: DrizzleService) {}

  _createUserWhere(where: { id?: number; email?: string }) {
    const { id, email } = where
    return or(eq(users.id, id), eq(users.email, email))
  }

  user(where: { id?: number; email?: string }) {
    return this.drizzleService.drizzle.query.users.findFirst({
      where: this._createUserWhere(where)
    })
  }

  async createUser(user: UserInsert) {
    return await this.drizzleService.drizzle
      .insert(users)
      .values(user)
      .returning()
  }

  updateUser(user: UserInsert, where: { id?: number; email?: string }) {
    return this.drizzleService.drizzle
      .update(users)
      .set(user)
      .where(this._createUserWhere(where))
      .returning()
  }

  upsert(user: UserInsert) {
    return this.drizzleService.drizzle
      .insert(users)
      .values(user)
      .onConflictDoUpdate({
        target: users.email,
        set: {
          avatar: user.avatar,
          name: user.name
        }
      })
      .returning()
  }
}
