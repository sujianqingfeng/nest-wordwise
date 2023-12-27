import type { ProfileInsert } from '../drizzle/types'
import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '../drizzle/drizzle.service'
import schema from '../drizzle/export-all-schema'

@Injectable()
export class ProfileService {
  constructor(private drizzleService: DrizzleService) {}

  profile(useId: number) {
    return this.drizzleService.drizzle.query.profiles.findFirst({
      where: eq(schema.profiles.userId, useId)
    })
  }

  createProfile(profile: ProfileInsert) {
    return this.drizzleService.drizzle
      .insert(schema.profiles)
      .values(profile)
      .returning()
  }

  updateProfile(useId: number, profile: ProfileInsert) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, userId, createAt, ...rest } = profile
    return this.drizzleService.drizzle
      .update(schema.profiles)
      .set(rest)
      .where(eq(schema.profiles.userId, useId))
      .returning()
  }

  updateTranslation(useId: number) {}
}
