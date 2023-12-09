import type { DrizzleDB, ProfileInsert } from '../drizzle/types'
import { Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleProvider } from '../drizzle/drizzle.provider'
import schema from '../drizzle/export-all-schema'

@Injectable()
export class ProfileService {
  constructor(@Inject(DrizzleProvider) private drizzleDB: DrizzleDB) {}

  profile(useId: number) {
    return this.drizzleDB.query.profiles.findFirst({
      where: eq(schema.profiles.userId, useId)
    })
  }

  createProfile(profile: ProfileInsert) {
    return this.drizzleDB.insert(schema.profiles).values(profile).returning()
  }

  updateProfile(useId: number, profile: ProfileInsert) {
    return this.drizzleDB
      .update(schema.profiles)
      .set(profile)
      .where(eq(schema.profiles.userId, useId))
      .returning()
  }
}
