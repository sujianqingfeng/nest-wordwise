import type { Profile, ProfileInsert } from '../drizzle/types'
import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { UpdateTranslationDto } from './dtos/profile.dto'
import { DrizzleService } from '../drizzle/drizzle.service'
import schema from '../drizzle/export-all-schema'
import { TranslatorService } from '../translator/translator.service'
import { BusinessException } from '@/exceptions/business.exception'

@Injectable()
export class ProfileService {
  constructor(
    private translatorService: TranslatorService,
    private drizzleService: DrizzleService
  ) {}

  profile(useId: string) {
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

  updateProfile(useId: string, profile: ProfileInsert) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, userId, createAt, ...rest } = profile
    return this.drizzleService.drizzle
      .update(schema.profiles)
      .set(rest)
      .where(eq(schema.profiles.userId, useId))
      .returning()
  }

  async updateTranslation(useId: string, profile: UpdateTranslationDto) {
    try {
      const { result } = await this.translatorService.translate(
        'hello',
        profile as Profile
      )
      if (!result) {
        throw new Error('profile may not be set correctly')
      }
      return this.drizzleService.drizzle
        .update(schema.profiles)
        .set(profile)
        .where(eq(schema.profiles.userId, useId))
        .returning()
    } catch (error) {
      throw new BusinessException(error.message)
    }
  }
}
