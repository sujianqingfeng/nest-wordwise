import type { UserInsert } from '../drizzle/types'
import { Injectable } from '@nestjs/common'
import { MD5 } from 'crypto-js'
import { eq, or } from 'drizzle-orm'
import { ChangePwdDto } from './dtos/user.dto'
import { DrizzleService } from '../drizzle/drizzle.service'
import { users } from '../drizzle/schema'
import { BusinessException } from '@/exceptions/business.exception'

@Injectable()
export class UserService {
  constructor(private drizzleService: DrizzleService) {}

  _createUserWhere(where: { id?: string; email?: string }) {
    const { id, email } = where
    return or(eq(users.id, id), eq(users.email, email))
  }

  user(where: { id?: string; email?: string }) {
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

  updateUser(user: UserInsert, where: { id?: string; email?: string }) {
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

  async changePwd(userId: string, { password, newPassword }: ChangePwdDto) {
    const user = await this.drizzleService.drizzle.query.users.findFirst({
      where: eq(users.id, userId)
    })

    if (user.password && user.password !== MD5(password).toString()) {
      throw new BusinessException('Password incorrect')
    }

    const p = MD5(newPassword).toString()

    return this.drizzleService.drizzle
      .update(users)
      .set({ password: p })
      .where(eq(users.id, userId))
      .returning()
  }
}
