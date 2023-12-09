import type { DrizzleDB, UserInsert } from '../drizzle/types'
import { Inject, Injectable } from '@nestjs/common'
import { eq, or } from 'drizzle-orm'
import { type Request } from 'express'
import { DrizzleProvider } from '../drizzle/drizzle.provider'
import { users } from '../drizzle/schema'
import { ProfileService } from '../profile/profile.service'

@Injectable()
export class UserService {
  constructor(
    private profileService: ProfileService,
    @Inject(DrizzleProvider) private drizzleDB: DrizzleDB
  ) {}

  profile(req: Request) {
    // return this.profileService.profile({ userId: req.user.id })
  }

  _createUserWhere(where: { id?: number; email?: string }) {
    const { id, email } = where
    return or(eq(users.id, id), eq(users.email, email))
  }

  user(where: { id?: number; email?: string }) {
    return this.drizzleDB.query.users.findFirst({
      where: this._createUserWhere(where)
    })
  }

  async createUser(user: UserInsert) {
    return await this.drizzleDB.insert(users).values(user).returning()
  }

  updateUser(user: UserInsert, where: { id?: number; email?: string }) {
    return this.drizzleDB
      .update(users)
      .set(user)
      .where(this._createUserWhere(where))
      .returning()
  }

  upsert(user: UserInsert) {
    return this.drizzleDB
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
